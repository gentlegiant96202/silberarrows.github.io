# Keyword Expansion — what to add, where, and at what match type

**Source:** real search terms that triggered your ads over the last 12 months
(pulled from the account via the Google Ads MCP, June 2026). Clicks/impressions
are hard data; conversion counts are *directional* (old tracking was broken), so
treat them as "this drove real interest," not exact lead counts.

**Only NEW keywords are listed** — anything already in your `keywords.csv` /
`negative-keywords.csv` is intentionally left out.

**Match-type notation (matches your CSV format):**
- `"keyword"` = **Phrase** match
- `[keyword]` = **Exact** match

Add these to the **live** campaigns (`SilberArrows | Service Department MCP` and
`Branded | SilberArrows | MCP`). Easiest path: Google Ads Editor → select the ad
group → add keywords → paste → Post. Or do it in the UI per ad group.

---

## 1. Service campaign — keywords to ADD

### → Ad group: **Service & Maintenance**
Landing page: `/lp/mercedes-service`

| Add | Match | Why |
|---|---|---|
| `"mercedes service dubai"` + `[mercedes service dubai]` | Phrase + Exact | High volume, repeatedly converted. Core term. |
| `"mercedes benz service"` | Phrase | Branded-service intent, converted. |
| `"mercedes benz service dubai"` | Phrase | Same, localized. |
| `"mercedes service booking"` | Phrase | **Booking intent — hottest.** Add to goal-focused group. |
| `"mercedes service appointment"` | Phrase | Booking intent. |

### → Ad group: **Mercedes Specialist Al Quoz**
Landing page: `/lp/mercedes-service-center`

| Add | Match | Why |
|---|---|---|
| `"mercedes al quoz"` | Phrase | Local intent, converted. |
| `"best mercedes garage in dubai"` | Phrase | High-intent comparison search. |
| `"al quoz mercedes workshop"` | Phrase | Local workshop intent. |
| `"mercedes service center"` ⚠️ | **Phrase only** | See "Dealer-enquiry watch" below. |
| `"mercedes service center dubai"` ⚠️ | **Phrase only** | Strongest non-brand converter, but mixed intent. |
| `"mercedes benz service center"` ⚠️ | **Phrase only** | Same caution. |
| `"mercedes service centre dubai"` ⚠️ | **Phrase only** | British "centre" spelling — separate term. |

> ⚠️ **Dealer-enquiry watch.** `…service center` searches sometimes mean the
> *authorised dealer* (Gargash/EMC), not an independent specialist — those leads
> ask for warranty/dealer work and waste your time. We mitigate three ways:
> 1. **Phrase match only** (no Exact, no Broad) on these four.
> 2. **Lean on the "Independent Specialist / Save vs Main Dealer / Dealer
>    Quality, Less Cost" RSA headlines** so dealer-loyal searchers self-select out.
> 3. **Watch close-rate** in the `/ads` dashboard. If these leads keep asking for
>    dealer/warranty service, demote the term to a negative.

### → Repair & Diagnostics / Arabic
No new additions from the data — your current lists already cover the demand.

---

## 2. Service campaign — NEGATIVES to ADD

Your negative list already blocks most dealer/wrong-intent terms. These appeared
in real searches and are **not yet** on the list:

| Add as negative | Match | Blocks |
|---|---|---|
| `"g wagon"` | Phrase | Car-buying ("g wagon price dubai"), not service. |
| `"g class"` | Phrase | Same. |
| `price` | Broad/Phrase | Price-shoppers / car buyers (you have "price list" + "for sale" but not bare `price`). |
| `deira` | Phrase | Wrong location ("mercedes deira"). |
| `"sheikh zayed road"` | Phrase | Wants a center *on SZR* — different location. *(Optional — drop if you'd take SZR-area customers.)* |
| `lezof` | Phrase | Competitor workshop. |
| `dynatrade` | Phrase | Competitor. |
| `authorised` | Phrase | Dealer-intent. |
| `authorized` | Phrase | Dealer-intent (US spelling). |
| `emc` | Phrase | Dealer brand (Emirates Motor Company). |
| `"emirates motor"` | Phrase | Dealer brand. |

> Already covered, no action needed: `gargash`, `al maraghi`, `astana`, `dealer`,
> `dealership`, `agency`, `official service`, `main dealer`, `under warranty`,
> `recall`, `customer service`, `contact number`, `call center`, `toll free`,
> `showroom`, `spare parts`, `parts`, `abu dhabi`, `sharjah`, `ajman`, `silu`,
> `orange auto`, `mercedes r us`, and the Arabic equivalents.

---

## 3. Brand campaign — no changes needed

Every brand variant that showed up in real searches (`silber arrows`,
`silver arrows dubai`, `silver arrow mercedes`, `silberarrows dubai`,
`silberarrow dubai`) is **already** in `Brand – Core` or `Brand – Variants &
Misspellings`. Brand is your strongest converter — leave it as is.

---

## 4. Decision needed from you — competitor conquesting

Real searches hit competitor names (`al maraghi`, `astana`, `dynatrade`,
`lezof`). They're currently being / will be negatived out. **Alternative:** run a
small, separate "Conquesting" ad group that *bids on* these names with copy like
"Independent Mercedes Specialist — Dealer Quality, Less Cost." Higher CPC, lower
conversion, but steals competitor demand. Tell me if you want to test it; until
then they stay as negatives.

---

## How this stays current
Once the new campaigns log their own search terms (a week or two of spend), ask
me to **"pull the latest ads numbers"** — the `/ads` dashboard's *Search terms →
actions* section will then surface fresh harvest/negative suggestions
automatically, and I'll update this file.
