# SilberArrows | Service & Repair v2 — Build & Launch Guide

Account: **612-539-2209** · Landing page: **https://mercedes-benz.silberarrows.com/** (your server-side tracked page)

This folder contains everything to launch a cleaned-up Search campaign built on the learnings from
auditing your two previous campaigns. Do **Step 1 (conversion cleanup) first** — the new campaign
should learn on a clean signal.

Files:
- `keywords.csv` — ad groups + keywords + match types (Google Ads Editor import)
- `negative-keywords.csv` — campaign negative list
- `responsive-search-ads.csv` — 3 RSAs (one per ad group), Editor import

---

## STEP 1 — Clean up conversions (do this first, ~10 min)

Go to **Tools → Measurement → Conversions → Summary**.

> ## ⚠️ CRITICAL: your server-side upload is broken AND being deprecated
> The API diagnostics show **`Google Ads API Submit Lead Form` = NEEDS_ATTENTION, 0% success rate,
> 100% error, last upload 2026-05-19**. On top of that, **Google blocks Google Ads API offline
> conversion uploads on June 15, 2026** (migrating to the Data Manager API). So this action is NOT a
> reliable primary conversion right now. Do **not** build the campaign on it. See "Conversion fix"
> below.

### Keep as PRIMARY (the one that actually fires)
| Conversion action | Why |
|---|---|
| **Submit lead form (mercedes-benz.silberarrows.com/) (1)** | The website (client-side) form-submit action that IS currently recording (~200 in last 90 days). Not affected by the June 15 API-upload block. |

> Phone calls and WhatsApp aren't tracked on this landing page, so the web form is your only lead
> signal. Use the **working website action** above as primary — NOT the broken server-side upload.

### Conversion fix (do before/with launch)
- **Short term:** make the working **website form-submit** action your primary lead conversion (above). This keeps the new campaign optimizing on a live signal.
- **Server-side action:** it's failing (0% success) and the API upload path is deprecated June 15. Either retire it, or — if you want server-side reliability — re-implement it as a **standard website conversion via the Google tag / GTM** (fires on the form thank-you page, ideally with **Enhanced Conversions for leads**). A website form-submit does **not** need offline conversion import at all.
- **Reserve offline import (Data Manager API) for later** — only when you start sending *real job value* back (a closed repair/service invoice). That's the genuinely-offline use case and powers the value-based bidding in Step 5.

### Set to SECONDARY (tracked but NOT used for bidding)
- `Phone_Call_Mercedes-Benz` and `Whatsapp_click_Mercedes-Benz` (legacy actions — not tracked on this landing page, so keep them out of bidding)
- `Local actions - Other engagements`, `Local actions - Directions`, `Local actions - Website visits`, `Local actions - Menu views` (these are Google Business Profile / Maps — noise for lead-gen)
- `Store visits`
- `Conversation started`
- All `SilberArrows 2023 (web) ...` GA4 micro-events (page_view, session_start, first_visit, service_callheader, whatsapp_header_cta, etc.)
- `Mercedes-Benz.silberarrows.com (web) prize_claim`

### PAUSE / REMOVE
- `Google Ads API Submit Lead Form` — broken (0% success) and deprecated June 15. Retire it once the website conversion is confirmed primary (don't leave a dead action as a goal).
- Older duplicate `Submit lead form (mercedes-benz.silberarrows.com/)` (already Removed) — leave removed.
- Any duplicate GA4 form/phone/whatsapp actions that overlap the ones you keep — keep ONE source per action type to avoid double-counting.

**Result:** one clean count per lead, bidding optimizes toward real enquiries, and your reported
conversions stop being inflated.

> I can verify this afterward via the (read-only) MCP — just tell me when you've done it and I'll
> re-pull the conversion-action breakdown to confirm there's no more double-counting.

---

## STEP 1B — In-code Google Ads conversion tracking (IMPLEMENTED)

The site now fires Google Ads conversions client-side via `gtag` (durable; not affected by the
June 15 API-upload block). You just need to create the conversion actions in Google Ads and paste
the IDs into env vars.

**What was added to the codebase:**
- `lib/gtag.ts` — fires `gtag('event','conversion', {send_to: 'AW-…/label'})`; reads IDs from env; waits for `gtag` to load before firing the lead conversion.
- `components/GoogleAdsLeadConversion.tsx` — fires the **lead** conversion once on the thank-you page.
- `components/ContactLink.tsx` — `<a>` wrapper that fires a **WhatsApp** or **phone** conversion on click.
- `app/layout.tsx` — adds `gtag('config', 'AW-…')` alongside the existing GA4 config.
- Lead fires on **`/thank-you/service`** (after a real submit). WhatsApp/phone fire on click in the **Contact modal** and the **thank-you page**.

### Create 3 conversion actions in Google Ads
**Tools → Conversions → + New → Website** (NOT "Import"). Create:

| Name | Category | Count | Notes |
|---|---|---|---|
| **Lead Form Submit** | Submit lead form | One | This is your **Primary** (replaces the broken server-side action) |
| **WhatsApp Click** | Contact | One | Secondary |
| **Phone Click** | Contact | One | Secondary |

When Google shows the tag, you only need the **`send_to`** value, e.g. `AW-123456789/AbC-D_efGh12`.
The `AW-123456789` part is the same for all three (your account's Ads ID); the part **after the slash**
is each action's unique **label**.

### Set these env vars (Vercel / `.env`) — LIVE VALUES
```
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-949637091
NEXT_PUBLIC_GADS_LEAD_LABEL=9TwqCOjkjrccEOOf6cQD       # Web Form Lead (gtag)
NEXT_PUBLIC_GADS_WHATSAPP_LABEL=FfF-CO3vjrccEOOf6cQD    # Contact Whatsapp
NEXT_PUBLIC_GADS_PHONE_LABEL=CG1HCOrvjrccEOOf6cQD       # Contact Call
```
Already set in `.env.local`. **Also add all four to Vercel → Settings → Environment Variables** for
production. If these are unset, the tracking safely no-ops (nothing breaks). After deploying, use the
**Google Tag Assistant** / **Google Ads "Diagnostics"** to confirm each conversion fires.

### Retire the legacy server-side upload
`/api/lead` still calls `uploadClickConversion` (the deprecated offline import) when
`GOOGLE_ADS_CUSTOMER_ID` + `GOOGLE_ADS_DEVELOPER_TOKEN` are set. Once the website **Lead Form Submit**
conversion is confirmed working, **unset those two env vars** so you don't double-count or depend on the
soon-blocked API path. Keep the Google Ads API creds only when you later wire **Data Manager API** for
real job-value uploads (Step 5).

---

## STEP 2 — Create the campaign shell (in Google Ads UI)

New campaign → Objective: **Leads** → **Search**.

| Setting | Value |
|---|---|
| Campaign name | `SilberArrows \| Service & Repair v2` |
| Networks | **Search only** — UNCHECK Search Partners AND Display Network |
| Locations | **Dubai** (target *Presence: people in your locations*, not "interest") |
| Languages | English + Arabic |
| Budget | **AED 500/day** (start here; scale to 800 once efficient) |
| Bidding | **Maximize Conversions** (add Target CPA in Step 4) |
| Conversion goals | Set to the single PRIMARY action from Step 1 (form submit only) |
| Ad rotation | Optimize (default) |

---

## STEP 3 — Import keywords, negatives & ads (Google Ads Editor)

1. Download **Google Ads Editor** (free) and sign in → download account `612-539-2209`.
2. Create the campaign shell from Step 2 first (or let import create it).
3. **Account → Import → From file** → import `keywords.csv`, then `responsive-search-ads.csv`.
   Editor maps columns by header name.
4. **Negatives:** Tools → Shared library → **Negative keyword lists** → create "SilberArrows Service – Negatives" → paste the terms from `negative-keywords.csv` → apply the list to the campaign.
5. Review everything in Editor, then **Post**. Campaign will go live (or set status Paused first if you want a final check).

### Structure being created
- **Ad group: Service & Maintenance** — service/maintenance intent (value ≈ AED 2k/job)
- **Ad group: Repair & Diagnostics** — repair intent (value ≈ AED 20k/job — fund this)
- **Ad group: Mercedes Specialist Al Quoz** — local/specialist terms (your historically *cheapest* leads, ~AED 130/lead)

All keywords are **Phrase + Exact** (no Broad at launch — Broad is what fed the wasted spend before).
Once Target CPA is stable you can test Broad in the Specialist ad group only, where it worked well historically.

---

## STEP 4 — Bidding guardrail (avoid the CPC runaway)

Your previous campaigns died because **Maximize Conversions had no cap** and CPC ran from ~AED 18 to
AED 50–124. Don't repeat it:

**Important — form-only economics:** because the *only* conversion is the web form (calls/WhatsApp
aren't tracked here), your true cost-per-lead is high (~AED 700+ historically) and volume is modest
(~20–25 leads/month). Set targets against that reality — a tCPA of AED 250–400 would starve the
campaign and stall learning.

1. **Days 1–21:** run Maximize Conversions (NO tCPA). Let it gather ~15–30 form leads so Smart
   Bidding has data. With one low-volume conversion action, give it longer than usual.
2. **Then add a Target CPA** starting around **AED 650–700** (a loose guardrail near your historical
   form CPA — not a stretch goal).
3. **Tighten** by ~10% every 2–3 weeks toward **AED 450–550** only as long as lead volume holds.
4. Watch **Avg CPC weekly** — if it jumps >50% with flat conversions, tighten tCPA immediately.
5. If volume is too thin for stable bidding, either raise budget slightly, broaden to Phrase-only,
   or (better) start tracking calls/WhatsApp so the algorithm has more signal.

---

## STEP 5 — The value upgrade (the real win, once tracking is clean)

You can't tell repair vs service at the moment a lead comes in, so for now keep simple lead counting.
The high-leverage move, when you're ready:

- Use your **server-side API** (already working) to **send the real job value back** to Google when a
  lead becomes a paying job (offline conversion import with value).
- Then switch bidding to **Maximize Conversion Value → Target ROAS**. Google will automatically bid
  more for repair clicks because they're worth ~10× a service — solving the "repair looks expensive"
  problem for good.

---

## Claims to VERIFY before publishing the ads

The RSAs use a few claims — confirm these are true or edit `responsive-search-ads.csv`:
- "Factory-Trained Techs" / "Genuine Parts" / "Warranty Protected"
- "Free Diagnostic Check" (Repair ad group) — only if you actually offer it
- "Same-Day Diagnostics"
- "Save vs Main Dealer" / "Dealer Quality, Less Cost"

Also consider adding (strong performers for a workshop): **call extension**, **location extension**
(Al Quoz), **sitelinks** (Book a Service, Repairs, Contact), and a **lead form extension**.

---

## Brand note
Add `silber arrows` / `silver arrows` as **negatives** here (so generic budget isn't spent on brand),
and run a separate small **Brand campaign** if you want to defend your name cheaply.
