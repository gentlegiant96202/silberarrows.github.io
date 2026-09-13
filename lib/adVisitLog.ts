/**
 * Paid-click visit logging — edge-safe half.
 *
 * Imported by `middleware.ts` (edge runtime), so this file must not pull in
 * Node built-ins or the Supabase client. It turns an incoming request into an
 * `ad_visits` row and posts it to Supabase's REST endpoint with the service
 * role key. The browser-side engagement half lives in
 * `components/AdVisitTracker.tsx` + `app/api/ad-visit/route.ts`.
 */

export const AD_VISIT_COOKIE = "_sa_visit";
/** How long the browser keeps reporting engagement against one landing. */
export const AD_VISIT_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 h

/**
 * Query-string keys written by the Google Ads account-level final URL suffix:
 *   utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}
 *   &sa_ag={adgroupid}&sa_mt={matchtype}&sa_dev={device}&sa_net={network}
 *   &sa_cr={creative}&sa_tgt={targetid}&sa_loc={loc_physical_ms}&sa_li={loc_interest_ms}
 */
const VALUETRACK: Record<string, string> = {
  utm_campaign: "campaign_id",
  utm_term: "keyword",
  sa_ag: "adgroup_id",
  sa_mt: "match_type",
  sa_dev: "device",
  sa_net: "network",
  sa_cr: "creative_id",
  sa_tgt: "target_id",
  sa_loc: "loc_physical",
  sa_li: "loc_interest",
};

const BOT_UA =
  /bot|crawl|spider|slurp|headless|phantom|selenium|puppeteer|playwright|lighthouse|pagespeed|pingdom|uptime|monitor|python|curl\/|wget|httpclient|okhttp|java\/|go-http|libwww|scrapy|facebookexternalhit|adsbot|mediapartners|apis-google|google-read-aloud|feedfetcher|bingpreview|semrush|ahrefs|mj12|dotbot|petalbot|bytespider/i;

/** Detects a paid Google click on the request URL. */
export function isPaidGoogleVisit(sp: URLSearchParams): boolean {
  if (sp.get("gclid") || sp.get("gbraid") || sp.get("wbraid")) return true;
  return sp.get("utm_source") === "google" && sp.get("utm_medium") === "cpc";
}

export function isBotUserAgent(ua: string | null): boolean {
  if (!ua) return true; // no UA at all is never a real browser
  return BOT_UA.test(ua);
}

/** "iOS · Safari", "Android · Chrome", "Windows · Edge", "Android · Instagram" … */
export function summarizeUserAgent(ua: string | null): string | null {
  if (!ua) return null;
  const os = /iPhone|iPad|iPod/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Windows/.test(ua)
        ? "Windows"
        : /Macintosh|Mac OS X/.test(ua)
          ? "macOS"
          : /CrOS/.test(ua)
            ? "ChromeOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Other";
  const browser = /Instagram/.test(ua)
    ? "Instagram"
    : /FBAN|FBAV|FB_IAB/.test(ua)
      ? "Facebook"
      : /Snapchat/.test(ua)
        ? "Snapchat"
        : /TikTok|musical_ly/.test(ua)
          ? "TikTok"
          : /EdgA?\//.test(ua)
            ? "Edge"
            : /SamsungBrowser/.test(ua)
              ? "Samsung"
              : /OPR\/|Opera/.test(ua)
                ? "Opera"
                : /Firefox|FxiOS/.test(ua)
                  ? "Firefox"
                  : /CriOS|Chrome\//.test(ua)
                    ? "Chrome"
                    : /Safari\//.test(ua)
                      ? "Safari"
                      : "Other";
  return `${os} · ${browser}`;
}

/** First hop of x-forwarded-for, else x-real-ip. */
export function clientIpFromHeaders(headers: Headers): string | null {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0].trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") || null;
}

/** /24 for IPv4, first 3 hextets (/48) for IPv6 — a sensible "same network" bucket. */
export function ipPrefix(ip: string | null): string | null {
  if (!ip) return null;
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return parts.slice(0, 3).join(":") + "::/48";
  }
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  return `${parts[0]}.${parts[1]}.${parts[2]}.0/24`;
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

export interface AdVisitRequestRow {
  visit_id: string;
  ip: string | null;
  ip_prefix: string | null;
  ua: string | null;
  ua_summary: string | null;
  ua_bot: boolean;
  country: string | null;
  region: string | null;
  city: string | null;
  landing_path: string;
  landing_url: string;
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
}

/** Build the request half of an `ad_visits` row from an incoming page request. */
export function buildAdVisitRow(input: {
  visitId: string;
  url: URL;
  headers: Headers;
}): AdVisitRequestRow {
  const { url, headers } = input;
  const sp = url.searchParams;
  const ua = clean(headers.get("user-agent"), 512);
  const ip = clientIpFromHeaders(headers);

  const row: AdVisitRequestRow = {
    visit_id: input.visitId,
    ip,
    ip_prefix: ipPrefix(ip),
    ua,
    ua_summary: summarizeUserAgent(ua),
    ua_bot: isBotUserAgent(ua),
    // Vercel edge geo headers (city arrives URL-encoded).
    country: clean(headers.get("x-vercel-ip-country"), 8),
    region: decodeGeo(headers.get("x-vercel-ip-country-region")),
    city: decodeGeo(headers.get("x-vercel-ip-city")),
    landing_path: url.pathname.slice(0, 512),
    landing_url: url.toString().slice(0, 2048),
    referrer: clean(headers.get("referer"), 1024),
    gclid: clean(sp.get("gclid"), 256),
    gbraid: clean(sp.get("gbraid"), 256),
    wbraid: clean(sp.get("wbraid"), 256),
    campaign_id: null,
    adgroup_id: null,
    keyword: null,
    match_type: null,
    device: null,
    network: null,
    creative_id: null,
    target_id: null,
    loc_physical: null,
    loc_interest: null,
    utm_source: clean(sp.get("utm_source"), 64),
    utm_medium: clean(sp.get("utm_medium"), 64),
    utm_campaign: clean(sp.get("utm_campaign"), 128),
  };

  for (const [param, column] of Object.entries(VALUETRACK)) {
    const v = clean(sp.get(param), 256);
    if (!v) continue;
    // ValueTrack leaves the literal "{keyword}" in place when it can't
    // substitute (e.g. a test click from the UI) — treat that as empty.
    if (/^\{.*\}$/.test(v)) continue;
    (row as unknown as Record<string, string | boolean | null>)[column] = v;
  }

  return row;
}

/**
 * Insert the row via PostgREST. Returns a promise the caller should hand to
 * `event.waitUntil()` so the page response is never delayed. Never throws.
 */
export async function postAdVisitRow(
  row: AdVisitRequestRow,
  env: { supabaseUrl: string; serviceRoleKey: string },
): Promise<void> {
  try {
    const res = await fetch(`${env.supabaseUrl}/rest/v1/ad_visits`, {
      method: "POST",
      headers: {
        apikey: env.serviceRoleKey,
        Authorization: `Bearer ${env.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("[ad-visit] insert failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[ad-visit] insert error:", err);
  }
}
