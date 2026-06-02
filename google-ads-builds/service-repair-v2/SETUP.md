# SilberArrows | Service & Repair v2 — Build & Launch Guide (FINAL)

Account: **612-539-2209** · Landing page: **https://mercedes-benz.silberarrows.com/**

A cleaned-up Search campaign built on the learnings from auditing your previous campaigns, with
**brand-new conversion tracking** wired into the site. Work top to bottom.

Files in this folder:
- `keywords.csv` — 3 ad groups + keywords (Phrase + Exact)
- `negative-keywords.csv` — campaign negative list (incl. brand terms)
- `responsive-search-ads.csv` — 3 RSAs (one per ad group)

---

## Where conversion tracking stands now

The old setup was broken: the **server-side "Google Ads API Submit Lead Form"** upload was failing
(0% success, NEEDS_ATTENTION) **and** Google blocks that API upload path on **2026-06-15**. So we
replaced it with durable **client-side `gtag` conversions** built into the site.

**Three website conversion actions now fire from the site (LIVE):**

| Conversion action | Fires when | Role |
|---|---|---|
| **Web Form Lead (gtag)** | form submit → `/thank-you/service` | **PRIMARY** (drives bidding) |
| **Contact WhatsApp** | WhatsApp button click (site-wide) | Secondary |
| **Contact Call** | phone button click (site-wide) | Secondary |

Conversion ID `AW-949637091`. These are wired in code via env vars (see below).

---

## STEP 1 — Deploy & verify the tracking

1. **Deploy** the site (the gtag tracking is committed). Add these to **Vercel → Settings → Environment
   Variables** (production), then redeploy:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-949637091
   NEXT_PUBLIC_GADS_LEAD_LABEL=9TwqCOjkjrccEOOf6cQD        # Web Form Lead (gtag)
   NEXT_PUBLIC_GADS_WHATSAPP_LABEL=FfF-CO3vjrccEOOf6cQD     # Contact WhatsApp
   NEXT_PUBLIC_GADS_PHONE_LABEL=CG1HCOrvjrccEOOf6cQD        # Contact Call
   ```
   (Already in `.env.local` for local dev. If unset, tracking safely no-ops.)
2. **Verify** with Chrome's **Google Tag Assistant**: submit a test form (lands on thank-you → the
   `AW-949637091` Lead conversion fires **exactly once**), then click WhatsApp + Call (those fire).
3. Conversions show as "Recording" in Google Ads within a few hours.

---

## STEP 2 — Set primary / secondary in Google Ads

**Tools → Conversions → Summary**, then:

- **PRIMARY:** `Web Form Lead (gtag)` — the only action that optimizes bidding.
- **SECONDARY:** `Contact WhatsApp`, `Contact Call` (tracked, not used for bidding yet).
- **PAUSE / REMOVE / DEMOTE (kill duplicates & dead actions):**
  - `Google Ads API Submit Lead Form` — broken + deprecated; retire it.
  - Old codeless `Submit lead form (mercedes-benz.silberarrows.com/) (1)` — demote to Secondary or
    remove so it doesn't double-count the new gtag lead.
  - All `SilberArrows 2023 (web) …` and Maps/`Local actions …` micro-events — Secondary (noise).

> Once the legacy upload is confirmed off (Step 6) and the new Lead conversion is recording, you have
> **one clean count per lead**. Tell me when done and I'll re-pull the breakdown via the MCP to confirm.

---

## STEP 3 — Create the campaign shell

New campaign → Objective **Leads** → type **Search**.

| Setting | Value |
|---|---|
| Campaign name | `SilberArrows \| Service & Repair v2` |
| Networks | **Search only** — UNCHECK Search Partners AND Display |
| Locations | **Dubai** (Presence: people in your locations) |
| Languages | English + Arabic |
| Budget | **AED 500/day floor, AED 700/day preferred.** Hold it steady for the whole learning month — don't start/stop. Scale only after bidding is stable. |
| Bidding | **Maximize Conversions** — **NO Target CPA yet** (see Step 5) |
| Conversion goal | **Custom goal** containing ONLY `Web Form Lead (gtag)` (see note below) |
| Ad rotation | Optimize (default) |

If Google nudges you toward Display, Search Partners, or Performance Max — **decline.**

> **Conversion-goals screen (after choosing "Leads"):** do NOT bundle all three actions.
> Whatever you attach here is what Smart Bidding optimizes toward.
> 1. Choose **"Use a custom goal"** → create `SilberArrows – Web Form Lead`.
> 2. Put **ONLY** `Web Form Lead (gtag)` in it. Select that goal for the campaign.
> 3. Leave **Contact WhatsApp + Contact Call as Secondary** (account level) — recorded for
>    reporting, but they don't drive bidding.
> 4. At the 2–3 week checkpoint, if form volume is too thin, add WhatsApp/Call into the goal to
>    give Smart Bidding more signal.

---

## STEP 4 — Import keywords, negatives & ads (Google Ads Editor)

1. Download **Google Ads Editor**, sign in, download account `612-539-2209`.
2. **Account → Import → From file** → import `keywords.csv`, then `responsive-search-ads.csv`.
3. **Negatives:** Shared library → **Negative keyword lists** → create "SilberArrows Service –
   Negatives" → paste `negative-keywords.csv` → apply to the campaign.
4. Review → **Post**.

### Structure & Final URLs (keyword-matched landing pages)
Each ad group points to a landing page whose H1/title matches the keyword intent (better message
match → higher Quality Score, lower CPC). URLs are set per ad group in `keywords.csv` and
`responsive-search-ads.csv`.

| Ad group | Intent / value | Final URL |
|---|---|---|
| **Service & Maintenance** | service (≈ AED 2k/job) | `/lp/mercedes-service` |
| **Repair & Diagnostics** | repair (≈ AED 20k/job — the one to fund) | `/lp/mercedes-repair` |
| **Mercedes Specialist Al Quoz** | local/specialist (historically cheapest leads) | `/lp/mercedes-service-center` |
| **Arabic – Service & Repair** | Arabic service/workshop terms | `/` (homepage — no Arabic LP yet) |

(Full domain: `https://mercedes-benz.silberarrows.com` + path above. The `/lp/*` pages are noindex,
ad-only landing pages with matching titles.) Pair the Arabic group with the Arabic RSA for relevance;
build a dedicated Arabic LP later if that group gets volume.

All **Phrase + Exact** — no Broad at launch (Broad fed the old wasted spend). Test Broad later, only
in the Specialist ad group, once bidding is stable.

---

## STEP 5 — Bidding: let the clean campaign set its own target (fresh start)

**Do NOT inherit the old ~AED 700 CPL** — that number came from broken tracking, no bid cap, and
broad-match waste. The fresh-start way:

1. **Weeks 1–3:** run **Maximize Conversions, no tCPA.** Don't touch budget or bidding — changes reset
   learning. Let it gather ~15–30 leads on the clean tracking.
2. **Read the *achieved* CPA** the campaign actually produces. That — not history — is your baseline.
3. **Then** set Target CPA ~10–15% above that achieved CPA as a guardrail.
4. **Steer it toward an affordability ceiling from your own economics**, not the old campaign:
   ```
   Max CPL = avg job value (≈ AED 5,000) × gross margin % × lead→job close rate
   ```
   (Confirm your margin % and close rate and we'll set the real ceiling.)
5. Tighten **≤10–15% every 2–3 weeks**; never cut >15% at once (Google throttles delivery).
6. Watch **Avg CPC weekly** — if it jumps >50% with flat conversions, tighten immediately.

**Volume lever:** form-only volume is what makes tCPA risky. You now track **WhatsApp + phone clicks**
too — at the 2–3 week mark, if volume is thin, promote them to bidding signals (or go value-based,
Step 6). That 2–3× the signal → faster learning and a more stable target.

---

## STEP 6 — Turn off the legacy upload, then plan the value upgrade

- **Now:** the legacy server-side offline upload in `/api/lead` is **off by default** (gated behind
  `GOOGLE_ADS_OFFLINE_UPLOAD_ENABLED`, which is unset). Nothing to do unless you previously forced it on.
- **The real win (later):** when a lead becomes a paying job, send the **real invoice value** back to
  Google and switch to **Maximize Conversion Value → Target ROAS**. Google then bids up for the
  searches that produce AED 20k repairs vs AED 2k services.
  - This uses the **Data Manager API** (the legacy Google Ads API offline import is blocked 2026-06-15).
  - **Prerequisite:** persist the **`gclid`** with each lead (the form captures it, but the DB insert
    currently stores only name + phone). Tell me when you want this and I'll wire it.

---

## Claims to VERIFY before publishing the ads

Confirm these RSA claims are true or edit `responsive-search-ads.csv`:
- "Factory-Trained Techs" / "Genuine Parts" / "Warranty Protected"
- "Free Diagnostic Check" / "Same-Day Diagnostics" (only if you offer them)
- "Save vs Main Dealer" / "Dealer Quality, Less Cost"

Also add assets: **call**, **location** (Al Quoz), **sitelinks** (Book a Service, Repairs, Contact),
and a **lead form** extension.

---

## Brand campaign
Your name is handled by a **separate** campaign — see `../brand-silberarrows/SETUP.md`. Brand terms
(`silberarrows`, `silber arrows`, `silver arrows`, `silberarrow`) are already negatives here so the two
don't compete. Keep budgets separate; don't judge this campaign by Brand's cheaper numbers.

---

## Account hygiene (not blocking launch — clean up later)
From the tag audit:
- A **second, dormant Ads account `3306238944`** (PMax + Leasing, both paused) piggy-backs on this site
  via a shared Google tag (`AW-16841523916`) and a shared GA4 link → historically double-counted.
  Remove that destination / GA4 link when convenient.
- **One GA4 property (`G-GK0X6327FK`) is installed across multiple sites** (.com, .co.uk, and a
  **staging site** `augustus.inventivecloud.co.uk`). Get the tag off staging so test traffic stops
  polluting data; consider per-site GA4 later.
- None of this affects the new campaign's conversions, which fire only from this site's code.
