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

Account: `612-539-2209` (customer id `6125392209`). Live campaigns:
`SilberArrows | Service Department MCP` and `Branded | SilberArrows | MCP`.
Brand and Service are always reported separately — never blended.
