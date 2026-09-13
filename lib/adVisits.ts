import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Server-side reading + aggregation for the paid-click visit log
 * (`ad_visits`, written by middleware.ts and /api/ad-visit).
 *
 * Definitions used throughout /ads/visits:
 *
 *   contact   — Call tap, WhatsApp tap or form lead during the visit
 *   engaged   — browser pinged AND (≥10 s active OR ≥2 pages OR contact);
 *               this is GA4's "engaged session" rule
 *   bounce    — not engaged. A visit that never ran JavaScript is a bounce
 *               too (and flagged separately as "no JS")
 *   bot       — user agent matches a crawler / headless / script pattern.
 *               Bots are excluded from every engagement number and listed
 *               on their own, because AdsBot-Google fetching the landing
 *               page for quality score is normal and should not look like
 *               fraud.
 */

export interface AdVisitRow {
  id: string;
  visit_id: string;
  created_at: string;
  ip: string | null;
  ip_prefix: string | null;
  ua: string | null;
  ua_summary: string | null;
  ua_bot: boolean;
  country: string | null;
  region: string | null;
  city: string | null;
  landing_path: string | null;
  landing_url: string | null;
  referrer: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  campaign_id: string | null;
  adgroup_id: string | null;
  keyword: string | null;
  match_type: string | null;
  device: string | null;
  network: string | null;
  creative_id: string | null;
  target_id: string | null;
  loc_physical: string | null;
  loc_interest: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  js_seen: boolean;
  first_ping_at: string | null;
  last_seen_at: string | null;
  active_ms: number;
  max_scroll_pct: number;
  page_views: number;
  pages: string[] | null;
  clicks: number;
  contact_phone: boolean;
  contact_whatsapp: boolean;
  lead_form: boolean;
  env: Record<string, unknown> | null;
}

export interface AdVisitsResult {
  configured: boolean;
  error: string | null;
  rows: AdVisitRow[];
  days: number;
  since: string;
}

const ROW_LIMIT = 5000;

export async function getAdVisits(days: number): Promise<AdVisitsResult> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { configured: false, error: null, rows: [], days, since };
  }
  const { data, error } = await supabase
    .from("ad_visits")
    .select("*")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(ROW_LIMIT);
  if (error) {
    return { configured: true, error: error.message, rows: [], days, since };
  }
  return { configured: true, error: null, rows: (data ?? []) as AdVisitRow[], days, since };
}

/* ── row predicates ─────────────────────────────────────────────────── */

export const ENGAGED_ACTIVE_MS = 10_000;

export function hasContact(r: AdVisitRow): boolean {
  return r.contact_phone || r.contact_whatsapp || r.lead_form;
}

export function isEngaged(r: AdVisitRow): boolean {
  if (!r.js_seen) return false;
  return r.active_ms >= ENGAGED_ACTIVE_MS || r.page_views >= 2 || hasContact(r);
}

export function isWebdriver(r: AdVisitRow): boolean {
  return r.env?.webdriver === true;
}

/* ── small stats helpers ────────────────────────────────────────────── */

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function ratio(num: number, den: number): number | null {
  return den > 0 ? num / den : null;
}

export function fmtDuration(ms: number | null): string {
  if (ms === null || Number.isNaN(ms)) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m < 60) return rem ? `${m}m ${rem}s` : `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

/* ── summary ────────────────────────────────────────────────────────── */

export interface AdVisitsSummary {
  visits: number;           // all rows incl. bots
  human: number;            // rows with a non-bot UA
  bots: number;
  uniqueClickIds: number;   // distinct gclid/gbraid/wbraid among human rows
  noJs: number;             // human rows that never pinged
  noJsRate: number | null;
  engaged: number;
  bounceRate: number | null;
  medianActiveMs: number | null; // among pinged human rows
  meanActiveMs: number | null;
  medianScroll: number | null;
  meanPageViews: number | null;
  contacts: number;
  contactRate: number | null;
  phone: number;
  whatsapp: number;
  leads: number;
  webdriver: number;
  repeatIpVisits: number;    // human visits from IPs seen ≥ 3 times
  repeatIpRate: number | null;
}

export function summarize(rows: AdVisitRow[]): AdVisitsSummary {
  const human = rows.filter((r) => !r.ua_bot);
  const pinged = human.filter((r) => r.js_seen);
  const clickIds = new Set<string>();
  for (const r of human) {
    const id = r.gclid || r.gbraid || r.wbraid;
    if (id) clickIds.add(id);
  }
  const ipCounts = new Map<string, number>();
  for (const r of human) if (r.ip) ipCounts.set(r.ip, (ipCounts.get(r.ip) ?? 0) + 1);
  const repeatIpVisits = human.filter((r) => r.ip && (ipCounts.get(r.ip) ?? 0) >= 3).length;

  const engaged = human.filter(isEngaged).length;
  const contacts = human.filter(hasContact).length;

  return {
    visits: rows.length,
    human: human.length,
    bots: rows.length - human.length,
    uniqueClickIds: clickIds.size,
    noJs: human.length - pinged.length,
    noJsRate: ratio(human.length - pinged.length, human.length),
    engaged,
    bounceRate: ratio(human.length - engaged, human.length),
    medianActiveMs: median(pinged.map((r) => r.active_ms)),
    meanActiveMs: mean(pinged.map((r) => r.active_ms)),
    medianScroll: median(pinged.map((r) => r.max_scroll_pct)),
    meanPageViews: mean(pinged.map((r) => Math.max(1, r.page_views))),
    contacts,
    contactRate: ratio(contacts, human.length),
    phone: human.filter((r) => r.contact_phone).length,
    whatsapp: human.filter((r) => r.contact_whatsapp).length,
    leads: human.filter((r) => r.lead_form).length,
    webdriver: human.filter(isWebdriver).length,
    repeatIpVisits,
    repeatIpRate: ratio(repeatIpVisits, human.length),
  };
}

/* ── group breakdowns ───────────────────────────────────────────────── */

export interface GroupStats {
  key: string;
  visits: number;
  ips: number;
  noJs: number;
  bounceRate: number | null;
  medianActiveMs: number | null;
  medianScroll: number | null;
  contacts: number;
  contactRate: number | null;
}

export function groupBy(
  rows: AdVisitRow[],
  keyOf: (r: AdVisitRow) => string | null,
  fallback = "(unknown)",
): GroupStats[] {
  const buckets = new Map<string, AdVisitRow[]>();
  for (const r of rows) {
    if (r.ua_bot) continue;
    const k = keyOf(r) ?? fallback;
    const arr = buckets.get(k);
    if (arr) arr.push(r);
    else buckets.set(k, [r]);
  }
  const out: GroupStats[] = [];
  for (const [key, list] of buckets) {
    const pinged = list.filter((r) => r.js_seen);
    const engaged = list.filter(isEngaged).length;
    const contacts = list.filter(hasContact).length;
    out.push({
      key,
      visits: list.length,
      ips: new Set(list.map((r) => r.ip).filter(Boolean)).size,
      noJs: list.length - pinged.length,
      bounceRate: ratio(list.length - engaged, list.length),
      medianActiveMs: median(pinged.map((r) => r.active_ms)),
      medianScroll: median(pinged.map((r) => r.max_scroll_pct)),
      contacts,
      contactRate: ratio(contacts, list.length),
    });
  }
  return out.sort((a, b) => b.visits - a.visits);
}

/** Visits and contacts per hour of day, Dubai time (UTC+4). */
export function byHourDubai(rows: AdVisitRow[]): { hour: number; visits: number; contacts: number; bounced: number }[] {
  const out = Array.from({ length: 24 }, (_, hour) => ({ hour, visits: 0, contacts: 0, bounced: 0 }));
  for (const r of rows) {
    if (r.ua_bot) continue;
    const h = (new Date(r.created_at).getUTCHours() + 4) % 24;
    out[h].visits += 1;
    if (hasContact(r)) out[h].contacts += 1;
    if (!isEngaged(r)) out[h].bounced += 1;
  }
  return out;
}

export const DEVICE_LABEL: Record<string, string> = { m: "Mobile", t: "Tablet", c: "Desktop" };
export const MATCH_LABEL: Record<string, string> = { e: "exact", p: "phrase", b: "broad" };
export const NETWORK_LABEL: Record<string, string> = { g: "Search", s: "Partners", d: "Display" };

/* ── repeat IPs / suspicion ─────────────────────────────────────────── */

export interface IpStats {
  ip: string;
  prefix: string | null;
  visits: number;
  clickIds: number;      // distinct gclids — 1 gclid hit 5× is a refresh, 5 gclids is 5 paid clicks
  keywords: string[];    // distinct, most frequent first
  uaCount: number;       // distinct UA strings — many UAs on one IP = carrier NAT / office, not one person
  uaSummary: string | null;
  city: string | null;
  noJs: number;
  webdriver: number;
  medianActiveMs: number | null;
  contacts: number;
  firstSeen: string;
  lastSeen: string;
  score: number;
  reasons: string[];
  suspicious: boolean;
}

/**
 * Score each IP with ≥ 2 human visits. The bar for "suspicious" is
 * deliberately high (score ≥ 4 and ≥ 3 visits): Etisalat / du mobile users
 * share IPs, so volume alone proves nothing — it has to combine with the
 * absence of engagement.
 */
export function repeatIps(rows: AdVisitRow[], minVisits = 2): IpStats[] {
  const byIp = new Map<string, AdVisitRow[]>();
  for (const r of rows) {
    if (r.ua_bot || !r.ip) continue;
    const arr = byIp.get(r.ip);
    if (arr) arr.push(r);
    else byIp.set(r.ip, [r]);
  }

  const out: IpStats[] = [];
  for (const [ip, list] of byIp) {
    if (list.length < minVisits) continue;
    const sorted = [...list].sort((a, b) => a.created_at.localeCompare(b.created_at));
    const pinged = list.filter((r) => r.js_seen);
    const noJs = list.length - pinged.length;
    const contacts = list.filter(hasContact).length;
    const webdriver = list.filter(isWebdriver).length;
    const clickIds = new Set(list.map((r) => r.gclid || r.gbraid || r.wbraid).filter(Boolean)).size;
    const uaCount = new Set(list.map((r) => r.ua).filter(Boolean)).size;
    const kwCounts = new Map<string, number>();
    for (const r of list) if (r.keyword) kwCounts.set(r.keyword, (kwCounts.get(r.keyword) ?? 0) + 1);
    const keywords = [...kwCounts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
    const medianActiveMs = median(pinged.map((r) => r.active_ms));

    let score = 0;
    const reasons: string[] = [];
    if (list.length >= 5) { score += 2; reasons.push(`${list.length} visits`); }
    else if (list.length >= 3) { score += 1; reasons.push(`${list.length} visits`); }
    if (clickIds >= 3) { score += 1; reasons.push(`${clickIds} separate paid clicks`); }
    if (noJs / list.length >= 0.5) { score += 2; reasons.push(`${noJs}/${list.length} never ran JS`); }
    if (medianActiveMs !== null && medianActiveMs < 5_000) { score += 1; reasons.push(`median ${fmtDuration(medianActiveMs)} on page`); }
    if (contacts === 0) { score += 1; reasons.push("no contact"); }
    if (webdriver > 0) { score += 2; reasons.push("automated browser (webdriver)"); }
    if (keywords.length >= 3) { score += 1; reasons.push(`${keywords.length} different keywords`); }
    if (uaCount >= 3 && contacts > 0) { score -= 2; reasons.push("many devices + real contact → shared network"); }

    out.push({
      ip,
      prefix: list[0].ip_prefix,
      visits: list.length,
      clickIds,
      keywords,
      uaCount,
      uaSummary: list[0].ua_summary,
      city: list.find((r) => r.city)?.city ?? null,
      noJs,
      webdriver,
      medianActiveMs,
      contacts,
      firstSeen: sorted[0].created_at,
      lastSeen: sorted[sorted.length - 1].created_at,
      score,
      reasons,
      suspicious: score >= 4 && list.length >= 3,
    });
  }

  return out.sort((a, b) => b.score - a.score || b.visits - a.visits);
}
