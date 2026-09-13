# Ads dashboard — data & workflow

The password-protected `/ads` page renders **manual snapshots** of the Google Ads
account, pulled via the Google Ads MCP. The MCP only runs locally inside an agent
session, so the deployed site never calls Google directly — it reads snapshots
from the Supabase `ads_snapshots` table.

## One-time setup

1. **Create the table** — run `supabase/migrations/0001_ads_snapshots.sql` in the
   Supabase SQL editor (the project behind `NEXT_PUBLIC_SUPABASE_URL`).
2. **Add two env vars** to `.env.local` *and* Vercel (production), then redeploy:
   ```
   ADS_DASHBOARD_PASSWORD=<choose a shared password>
   SUPABASE_SERVICE_ROLE_KEY=<service_role key from Supabase → Project settings → API>
   ```
   - `ADS_DASHBOARD_PASSWORD` gates the page (cookie login).
   - `SUPABASE_SERVICE_ROLE_KEY` is server-only; it's how the page reads and the
     script writes. RLS is on with no policies, so this key is the only way in.

## Each tracking session (weekly during the learning phase, then biweekly)

1. Ask the agent: **“pull the latest ads numbers.”** It queries the MCP and writes
   a new `data/ads/<YYYY-MM-DD>.json` (same shape as `2026-06-02.json`), including
   a fresh `actions` checklist.
   - **Date ranges must include today.** The Ads API's `LAST_7_DAYS` /
     `LAST_30_DAYS` presets *exclude* today, which undercounts impressions on a
     freshly launched campaign. Use `segments.date BETWEEN '<start>' AND '<today>'`
     (or add `DURING TODAY` to the range) so the numbers match the Google UI.
2. Push it to Supabase:
   ```
   node scripts/ads-snapshot.mjs data/ads/<YYYY-MM-DD>.json
   ```
3. The dashboard updates live — it always shows the latest snapshot and the deltas
   vs the previous one. No redeploy needed (only env/code changes require one).

## Snapshot file shape

```jsonc
{
  "snapshot_date": "2026-06-09",
  "range_label": "Week 1 · last 7 days",
  "data": {
    "account": { "customerId": "6125392209", "currency": "AED" },
    "range": { "label": "..." },
    "campaigns": [ /* per-campaign KPIs incl. impression share */ ],
    "conversionsByAction": [ /* Web Form Lead / WhatsApp / Call */ ],
    "adGroups": [ /* cost + leads + CPL per ad group */ ],
    "keywords": [ /* cost / clicks / leads / quality score */ ],
    "searchTerms": [ /* term + suggestion: harvest | negative | watch */ ],
    "assets": [ /* RSA headline/description grades: LOW | GOOD | BEST */ ],
    "dailyTrend": [ /* { date, cost, conversions, clicks } */ ],
    "actions": [ "what to do before the next pull" ],
    "notes": "free-text summary"
  }
}
```

## Paid-visit log (`/ads/visits`) — click quality & fraud

Independent of the snapshots. Every page request that arrives with a Google
click id is logged **live** to the Supabase `ad_visits` table, and the browser
reports engagement back. Nothing here calls Google.

- **Setup:** run `supabase/migrations/0003_ad_visits.sql` once in the SQL editor.
  Uses the same `SUPABASE_SERVICE_ROLE_KEY` as above — no new env vars.
- **Request half** — `middleware.ts` (edge): IP, /24 prefix, user agent (+ bot
  flag), Vercel geo city, landing path, referrer, gclid/gbraid/wbraid, and the
  ValueTrack fields from the account-level **final URL suffix** set in Google Ads:
  ```
  utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}
  &sa_ag={adgroupid}&sa_mt={matchtype}&sa_dev={device}&sa_net={network}
  &sa_cr={creative}&sa_tgt={targetid}&sa_loc={loc_physical_ms}&sa_li={loc_interest_ms}
  ```
  Sets a `_sa_visit` cookie (12 h). Insert runs in `waitUntil` — zero latency.
- **Engagement half** — `components/AdVisitTracker.tsx` beacons active time
  (tab visible only), max scroll, pages, clicks, Call / WhatsApp taps and form
  leads to `/api/ad-visit`, which merges via the `ad_visit_ping()` SQL function
  (greatest-wins, so beacon order never matters).
- **Definitions:** *engaged* = ≥10 s active or ≥2 pages or a contact (GA4 rule);
  *bounce* = not engaged; *no JS* = never pinged (bot, blocker, or left in <1 s).
  Bot UAs (incl. AdsBot-Google) are excluded from all engagement numbers.
- **Suspicious IP** = score ≥ 4 with ≥ 3 visits; the page renders a ready-to-paste
  list for Google Ads → Campaign settings → IP exclusions (max 500 / campaign).
  Many distinct UAs on one IP *with* real contacts is a carrier NAT, and the
  score discounts it.
- **Retention:** IPs are stored in the clear on purpose. Purge monthly:
  `delete from public.ad_visits where created_at < now() - interval '90 days';`

Account: `612-539-2209` (customer id `6125392209`). Live campaigns:
`SilberArrows | Service Department MCP` and `Branded | SilberArrows | MCP`.
Brand and Service are always reported separately — never blended.
