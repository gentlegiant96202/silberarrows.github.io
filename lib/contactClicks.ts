import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { isBotUserAgent, ipPrefix, summarizeUserAgent } from "@/lib/adVisitLog";
import { getClientIpFamilies } from "@/lib/meta-capi";

/**
 * Sitewide Call / WhatsApp tap log (`contact_clicks`).
 *
 * Written by /api/contact-click for every tap that also (when configured)
 * goes to Meta CAPI as a Contact event. Read by /ads/contacts.
 */

export interface ContactClickInsert {
  event_id: string;
  kind: "phone" | "whatsapp";
  ip: string | null;
  ip_v4: string | null;
  ip_v6: string | null;
  ip_prefix: string | null;
  ua: string | null;
  ua_summary: string | null;
  ua_bot: boolean;
  country: string | null;
  region: string | null;
  city: string | null;
  path: string | null;
  page_url: string | null;
  referrer: string | null;
  offer: string | null;
  offer_name: string | null;
  intent: string | null;
  visit_id: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  fbp: string | null;
  fbc: string | null;
  capi_sent: boolean;
  env: Record<string, unknown> | null;
}

export interface ContactClickRow extends ContactClickInsert {
  id: string;
  created_at: string;
}

export interface ContactClicksResult {
  configured: boolean;
  error: string | null;
  rows: ContactClickRow[];
  days: number;
  since: string;
}

const ROW_LIMIT = 5000;
const GCC = new Set(["AE", "SA", "QA", "BH", "OM", "KW"]);

export async function insertContactClick(row: ContactClickInsert): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error("[contact-click] supabase admin not configured");
      return;
    }
    const { error } = await supabase.from("contact_clicks").upsert(row, {
      onConflict: "event_id",
      ignoreDuplicates: true,
    });
    if (error) {
      console.error("[contact-click] insert failed:", error.message);
    }
  } catch (err) {
    console.error("[contact-click] insert error:", err);
  }
}

export async function getContactClicks(days: number): Promise<ContactClicksResult> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { configured: false, error: null, rows: [], days, since };
  }
  const { data, error } = await supabase
    .from("contact_clicks")
    .select("*")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(ROW_LIMIT);
  if (error) {
    return { configured: true, error: error.message, rows: [], days, since };
  }
  return {
    configured: true,
    error: null,
    rows: (data ?? []) as ContactClickRow[],
    days,
    since,
  };
}

function clean(value: string | null | undefined, max: number): string | null {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;
  return v.length > max ? v.slice(0, max) : v;
}

function decodeGeo(value: string | null): string | null {
  if (!value) return null;
  try {
    return clean(decodeURIComponent(value), 80);
  } catch {
    return clean(value, 80);
  }
}

function pathFromUrl(url: string | null, fallback: string | null): string | null {
  if (fallback) return fallback.slice(0, 512);
  if (!url) return null;
  try {
    return new URL(url).pathname.slice(0, 512);
  } catch {
    return fallback;
  }
}

function queryParam(url: string | null, key: string, max: number): string | null {
  if (!url) return null;
  try {
    return clean(new URL(url).searchParams.get(key), max);
  } catch {
    return null;
  }
}

function fbclidFromFbc(fbc: string | null): string | null {
  if (!fbc) return null;
  const parts = fbc.split(".");
  if (parts.length < 4) return null;
  return clean(parts.slice(3).join("."), 256);
}

const ENV_KEYS = [
  "vw",
  "vh",
  "sw",
  "sh",
  "dpr",
  "lang",
  "langs",
  "tz",
  "tzOffset",
  "touch",
  "webdriver",
  "cores",
  "memory",
  "connection",
  "cookies",
  "referrer",
] as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanClientEnv(value: unknown): Record<string, unknown> {
  if (!isPlainObject(value)) return {};
  const out: Record<string, unknown> = {};
  for (const key of ENV_KEYS) {
    if (!(key in value)) continue;
    const v = value[key];
    if (v === null || v === undefined) {
      out[key] = null;
      continue;
    }
    if (key === "langs" && Array.isArray(v)) {
      out[key] = v
        .filter((item): item is string => typeof item === "string")
        .slice(0, 4)
        .map((item) => item.slice(0, 16));
      continue;
    }
    if (key === "referrer" && typeof v === "string") {
      out[key] = v.slice(0, 1024);
      continue;
    }
    if (key === "lang" && typeof v === "string") {
      out[key] = v.slice(0, 32);
      continue;
    }
    if (key === "tz" && typeof v === "string") {
      out[key] = v.slice(0, 64);
      continue;
    }
    if (key === "connection" && typeof v === "string") {
      out[key] = v.slice(0, 16);
      continue;
    }
    if (
      typeof v === "number" ||
      typeof v === "boolean" ||
      typeof v === "string"
    ) {
      out[key] = v;
    }
  }
  return out;
}

function mergeEnv(client: unknown, headers: Headers): Record<string, unknown> | null {
  const env = cleanClientEnv(client);
  const chUa = clean(headers.get("sec-ch-ua"), 256);
  const chMobile = clean(headers.get("sec-ch-ua-mobile"), 16);
  const chPlatform = clean(headers.get("sec-ch-ua-platform"), 64);
  const acceptLang = clean(headers.get("accept-language"), 128);
  if (chUa) env.secChUa = chUa;
  if (chMobile) env.secChUaMobile = chMobile;
  if (chPlatform) env.secChUaPlatform = chPlatform;
  if (acceptLang) env.acceptLanguage = acceptLang;
  return Object.keys(env).length > 0 ? env : null;
}

export function buildContactClickRow(input: {
  eventId: string;
  kind: "phone" | "whatsapp";
  headers: Headers;
  body: Record<string, unknown>;
  pageUrl: string | null;
  capiSent: boolean;
}): ContactClickInsert {
  const { headers, body, pageUrl } = input;
  const families = getClientIpFamilies(headers);
  const ua = clean(headers.get("user-agent"), 512);
  const fbc = clean(typeof body.fbc === "string" ? body.fbc : null, 512);
  const fbclid =
    clean(typeof body.fbclid === "string" ? body.fbclid : null, 256) ||
    queryParam(pageUrl, "fbclid", 256) ||
    fbclidFromFbc(fbc);

  return {
    event_id: input.eventId,
    kind: input.kind,
    ip: families.preferred,
    ip_v4: families.v4,
    ip_v6: families.v6,
    ip_prefix: ipPrefix(families.preferred),
    ua,
    ua_summary: summarizeUserAgent(ua),
    ua_bot: isBotUserAgent(ua),
    country: clean(headers.get("x-vercel-ip-country"), 8),
    region: decodeGeo(headers.get("x-vercel-ip-country-region")),
    city: decodeGeo(headers.get("x-vercel-ip-city")),
    path: pathFromUrl(
      pageUrl,
      clean(typeof body.source === "string" ? body.source : null, 512)
    ),
    page_url: pageUrl,
    referrer:
      clean(typeof body.referrer === "string" ? body.referrer : null, 1024) ||
      clean(headers.get("referer"), 1024),
    offer: clean(typeof body.offer === "string" ? body.offer : null, 128),
    offer_name: clean(typeof body.offerName === "string" ? body.offerName : null, 256),
    intent: clean(typeof body.intent === "string" ? body.intent : null, 64),
    visit_id: clean(typeof body.visitId === "string" ? body.visitId : null, 128),
    gclid:
      clean(typeof body.gclid === "string" ? body.gclid : null, 256) ||
      queryParam(pageUrl, "gclid", 256),
    gbraid:
      clean(typeof body.gbraid === "string" ? body.gbraid : null, 256) ||
      queryParam(pageUrl, "gbraid", 256),
    wbraid:
      clean(typeof body.wbraid === "string" ? body.wbraid : null, 256) ||
      queryParam(pageUrl, "wbraid", 256),
    fbclid,
    utm_source:
      clean(typeof body.utm_source === "string" ? body.utm_source : null, 64) ||
      queryParam(pageUrl, "utm_source", 64),
    utm_medium:
      clean(typeof body.utm_medium === "string" ? body.utm_medium : null, 64) ||
      queryParam(pageUrl, "utm_medium", 64),
    utm_campaign:
      clean(typeof body.utm_campaign === "string" ? body.utm_campaign : null, 128) ||
      queryParam(pageUrl, "utm_campaign", 128),
    fbp: clean(typeof body.fbp === "string" ? body.fbp : null, 256),
    fbc,
    capi_sent: input.capiSent,
    env: mergeEnv(body.env, headers),
  };
}

/* ── row predicates ─────────────────────────────────────────────────── */

export function isWebdriver(r: ContactClickRow): boolean {
  return r.env?.webdriver === true;
}

export function hasGoogleClick(r: ContactClickRow): boolean {
  return Boolean(r.gclid || r.gbraid || r.wbraid);
}

export function hasMetaClick(r: ContactClickRow): boolean {
  return Boolean(r.fbclid || r.fbc);
}

export function timezoneMismatch(r: ContactClickRow): boolean {
  const country = r.country?.toUpperCase() ?? "";
  const tz = typeof r.env?.tz === "string" ? r.env.tz : "";
  if (!country || !tz) return false;
  if (GCC.has(country) && !tz.startsWith("Asia/")) return true;
  return false;
}

export function missingClientHints(r: ContactClickRow): boolean {
  const ua = r.ua ?? "";
  if (!/Chrome\//.test(ua) || /EdgA?\//.test(ua)) return false;
  return typeof r.env?.secChUa !== "string";
}

export function touchMismatch(r: ContactClickRow): boolean {
  const ua = r.ua ?? "";
  const mobile = /iPhone|iPad|Android/.test(ua);
  return mobile && r.env?.touch === false;
}

/* ── summary ────────────────────────────────────────────────────────── */

function ratio(num: number, den: number): number | null {
  return den > 0 ? num / den : null;
}

export interface ContactClicksSummary {
  taps: number;
  human: number;
  bots: number;
  phone: number;
  whatsapp: number;
  uniqueIps: number;
  webdriver: number;
  repeatIpTaps: number;
  repeatIpRate: number | null;
  google: number;
  meta: number;
  offers: number;
  capiSent: number;
  capiRate: number | null;
  tzMismatch: number;
  noCookies: number;
}

export function summarize(rows: ContactClickRow[]): ContactClicksSummary {
  const human = rows.filter((r) => !r.ua_bot);
  const ipCounts = new Map<string, number>();
  for (const r of human) if (r.ip) ipCounts.set(r.ip, (ipCounts.get(r.ip) ?? 0) + 1);
  const repeatIpTaps = human.filter((r) => r.ip && (ipCounts.get(r.ip) ?? 0) >= 3).length;

  return {
    taps: rows.length,
    human: human.length,
    bots: rows.length - human.length,
    phone: human.filter((r) => r.kind === "phone").length,
    whatsapp: human.filter((r) => r.kind === "whatsapp").length,
    uniqueIps: new Set(human.map((r) => r.ip).filter(Boolean)).size,
    webdriver: human.filter(isWebdriver).length,
    repeatIpTaps,
    repeatIpRate: ratio(repeatIpTaps, human.length),
    google: human.filter(hasGoogleClick).length,
    meta: human.filter(hasMetaClick).length,
    offers: human.filter((r) => r.offer).length,
    capiSent: rows.filter((r) => r.capi_sent).length,
    capiRate: ratio(rows.filter((r) => r.capi_sent).length, rows.length),
    tzMismatch: human.filter(timezoneMismatch).length,
    noCookies: human.filter((r) => r.env?.cookies === false).length,
  };
}

export interface GroupStats {
  key: string;
  taps: number;
  human: number;
  bots: number;
  phone: number;
  whatsapp: number;
  ips: number;
  webdriver: number;
  flagged: number;
}

export function groupBy(
  rows: ContactClickRow[],
  keyOf: (r: ContactClickRow) => string | null,
  fallback = "(unknown)"
): GroupStats[] {
  const buckets = new Map<string, ContactClickRow[]>();
  for (const r of rows) {
    const k = keyOf(r) ?? fallback;
    const arr = buckets.get(k);
    if (arr) arr.push(r);
    else buckets.set(k, [r]);
  }
  const out: GroupStats[] = [];
  for (const [key, list] of buckets) {
    const human = list.filter((r) => !r.ua_bot);
    out.push({
      key,
      taps: list.length,
      human: human.length,
      bots: list.length - human.length,
      phone: human.filter((r) => r.kind === "phone").length,
      whatsapp: human.filter((r) => r.kind === "whatsapp").length,
      ips: new Set(human.map((r) => r.ip).filter(Boolean)).size,
      webdriver: human.filter(isWebdriver).length,
      flagged: list.filter((r) => rowScore(r).score >= 3).length,
    });
  }
  return out.sort((a, b) => b.taps - a.taps);
}

export function byHourDubai(
  rows: ContactClickRow[]
): { hour: number; taps: number; bots: number; flagged: number }[] {
  const out = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    taps: 0,
    bots: 0,
    flagged: 0,
  }));
  for (const r of rows) {
    const h = (new Date(r.created_at).getUTCHours() + 4) % 24;
    out[h].taps += 1;
    if (r.ua_bot) out[h].bots += 1;
    if (rowScore(r).score >= 3) out[h].flagged += 1;
  }
  return out;
}

export function byDayDubai(
  rows: ContactClickRow[]
): { day: string; taps: number; human: number; bots: number; phone: number; whatsapp: number }[] {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const buckets = new Map<string, ContactClickRow[]>();
  for (const r of rows) {
    const day = fmt.format(new Date(r.created_at));
    const arr = buckets.get(day);
    if (arr) arr.push(r);
    else buckets.set(day, [r]);
  }
  return [...buckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([day, list]) => ({
      day,
      taps: list.length,
      human: list.filter((r) => !r.ua_bot).length,
      bots: list.filter((r) => r.ua_bot).length,
      phone: list.filter((r) => !r.ua_bot && r.kind === "phone").length,
      whatsapp: list.filter((r) => !r.ua_bot && r.kind === "whatsapp").length,
    }));
}

/* ── suspicion ──────────────────────────────────────────────────────── */

export interface RowScore {
  score: number;
  reasons: string[];
  suspicious: boolean;
}

export function rowScore(r: ContactClickRow): RowScore {
  let score = 0;
  const reasons: string[] = [];

  if (!r.ua) {
    score += 3;
    reasons.push("no user agent");
  } else if (r.ua_bot) {
    score += 3;
    reasons.push("bot / headless UA");
  }
  if (isWebdriver(r)) {
    score += 3;
    reasons.push("navigator.webdriver");
  }
  if (r.env?.cookies === false) {
    score += 1;
    reasons.push("cookies disabled");
  }
  if (timezoneMismatch(r)) {
    score += 2;
    reasons.push(`tz ${String(r.env?.tz)} vs ${r.country}`);
  }
  if (touchMismatch(r)) {
    score += 1;
    reasons.push("mobile UA without touch");
  }
  if (missingClientHints(r)) {
    score += 1;
    reasons.push("Chrome without Client Hints");
  }
  if (r.env && (r.env.vw === 0 || r.env.vh === 0)) {
    score += 2;
    reasons.push("zero viewport");
  }

  return { score, reasons, suspicious: score >= 3 };
}

export interface IpStats {
  ip: string;
  prefix: string | null;
  taps: number;
  phone: number;
  whatsapp: number;
  bots: number;
  webdriver: number;
  uaCount: number;
  uaSummary: string | null;
  city: string | null;
  country: string | null;
  paths: string[];
  google: number;
  meta: number;
  firstSeen: string;
  lastSeen: string;
  burst: boolean;
  score: number;
  reasons: string[];
  suspicious: boolean;
}

export function repeatIps(rows: ContactClickRow[], minTaps = 2): IpStats[] {
  const byIp = new Map<string, ContactClickRow[]>();
  for (const r of rows) {
    if (!r.ip) continue;
    const arr = byIp.get(r.ip);
    if (arr) arr.push(r);
    else byIp.set(r.ip, [r]);
  }

  const out: IpStats[] = [];
  for (const [ip, list] of byIp) {
    if (list.length < minTaps) continue;
    const sorted = [...list].sort((a, b) => a.created_at.localeCompare(b.created_at));
    const bots = list.filter((r) => r.ua_bot).length;
    const webdriver = list.filter(isWebdriver).length;
    const uaCount = new Set(list.map((r) => r.ua).filter(Boolean)).size;
    const pathCounts = new Map<string, number>();
    for (const r of list) if (r.path) pathCounts.set(r.path, (pathCounts.get(r.path) ?? 0) + 1);
    const paths = [...pathCounts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);

    let burst = false;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].created_at).getTime();
      const next = new Date(sorted[i].created_at).getTime();
      if (next - prev <= 15_000) {
        burst = true;
        break;
      }
    }

    let score = 0;
    const reasons: string[] = [];
    if (list.length >= 8) {
      score += 3;
      reasons.push(`${list.length} taps`);
    } else if (list.length >= 4) {
      score += 2;
      reasons.push(`${list.length} taps`);
    } else if (list.length >= 2) {
      score += 1;
      reasons.push(`${list.length} taps`);
    }
    if (bots > 0) {
      score += 2;
      reasons.push(`${bots} bot UA`);
    }
    if (webdriver > 0) {
      score += 2;
      reasons.push("webdriver");
    }
    if (burst) {
      score += 2;
      reasons.push("burst under 15s");
    }
    if (list.filter((r) => rowScore(r).score >= 3).length >= 2) {
      score += 1;
      reasons.push("multiple flagged taps");
    }
    if (uaCount >= 3 && bots === 0 && webdriver === 0) {
      score -= 2;
      reasons.push("many devices → shared network");
    }

    out.push({
      ip,
      prefix: list[0].ip_prefix,
      taps: list.length,
      phone: list.filter((r) => r.kind === "phone").length,
      whatsapp: list.filter((r) => r.kind === "whatsapp").length,
      bots,
      webdriver,
      uaCount,
      uaSummary: list.find((r) => r.ua_summary)?.ua_summary ?? null,
      city: list.find((r) => r.city)?.city ?? null,
      country: list.find((r) => r.country)?.country ?? null,
      paths,
      google: list.filter(hasGoogleClick).length,
      meta: list.filter(hasMetaClick).length,
      firstSeen: sorted[0].created_at,
      lastSeen: sorted[sorted.length - 1].created_at,
      burst,
      score,
      reasons,
      suspicious: score >= 4 && list.length >= 3,
    });
  }

  return out.sort((a, b) => b.score - a.score || b.taps - a.taps);
}
