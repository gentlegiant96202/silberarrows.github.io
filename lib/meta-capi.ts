import crypto from "crypto";

/**
 * Meta Conversions API (server-side) helpers.
 *
 * Two event types are sent from this site, both deduplicated against their
 * browser Pixel counterparts via a shared `event_id`:
 *
 *   - `Lead`    — quote form submitted        (/api/lead)
 *   - `Contact` — Call / WhatsApp link clicked (/api/contact-click)
 */

export type MetaEventName = "Lead" | "Contact";

export const META_GRAPH_VERSION = "v21.0";

export function sha256Hash(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return "";
  return crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
}

const COUNTRY_CODE_MAP: Record<string, string> = {
  "971": "ae",
  "44": "gb",
  "1": "us",
  "91": "in",
  "49": "de",
  "33": "fr",
  "61": "au",
  "966": "sa",
  "974": "qa",
  "973": "bh",
  "968": "om",
  "965": "kw",
  "20": "eg",
  "27": "za",
  "234": "ng",
  "254": "ke",
};

export function countryCodeToIso(countryCode: string): string {
  const digits = (countryCode || "").replace(/\D/g, "");
  return COUNTRY_CODE_MAP[digits] || "";
}

/**
 * Visitor IP for CAPI `client_ip_address`.
 *
 * Meta's Pixel sees the IP the browser used to reach Facebook (often IPv6).
 * CAPI must send the IP the browser used to reach *us*. When both families
 * appear on client-facing hops we prefer IPv6 — Meta's documented preference
 * for IPv6-enabled users, and the fix for the Events Manager diagnostic
 * "Update to IPv6 for Contact events". Later X-Forwarded-For hops are
 * proxies (Vercel) and are never used.
 */
export function getClientIp(headers: Headers): string | null {
  return getClientIpFamilies(headers).preferred;
}

/**
 * Same header scan as `getClientIp`, but keeps both families when Vercel
 * (or a proxy) surfaces IPv4 on one hop and IPv6 on another. Used by the
 * contact-click log so we can cluster bots that rotate a single family.
 */
export function getClientIpFamilies(headers: Headers): {
  preferred: string | null;
  v4: string | null;
  v6: string | null;
} {
  const candidates: string[] = [];
  for (const name of CLIENT_IP_HEADERS) {
    const ip = leftmostIp(headers.get(name));
    if (ip && !candidates.includes(ip)) candidates.push(ip);
  }

  const usable = candidates.filter((ip) => !isPrivateOrReservedIp(ip));
  const pool = usable.length > 0 ? usable : candidates;
  const preferred = pool.find(isPublicIPv6) ?? pool[0] ?? null;

  let v4: string | null = null;
  let v6: string | null = null;
  for (const ip of pool) {
    const dotted = ipv4Form(ip);
    if (dotted && !v4) v4 = dotted;
    if (isPublicIPv6(ip) && !v6) v6 = ip;
  }

  return { preferred, v4, v6 };
}

const CLIENT_IP_HEADERS = [
  "x-forwarded-for",
  "x-vercel-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
  "true-client-ip",
] as const;

function leftmostIp(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(",")[0].trim().replace(/^\[|\]$/g, "");
  return first || null;
}

function isIPv4MappedIPv6(ip: string): boolean {
  return /^::ffff:/i.test(ip);
}

function ipv4Form(ip: string): string | null {
  if (isIPv4MappedIPv6(ip)) {
    const v4 = ip.replace(/^::ffff:/i, "");
    return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(v4) ? v4 : null;
  }
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(ip) ? ip : null;
}

function isPublicIPv6(ip: string): boolean {
  return ip.includes(":") && !isIPv4MappedIPv6(ip);
}

function isPrivateOrReservedIp(ip: string): boolean {
  if (isIPv4MappedIPv6(ip) || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(ip)) {
    const v4 = isIPv4MappedIPv6(ip) ? ip.replace(/^::ffff:/i, "") : ip;
    const [a, b] = v4.split(".").map((n) => Number(n));
    if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (lower.startsWith("fe80:")) return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  return false;
}

export function isMetaCapiConfigured(): boolean {
  return Boolean(
    process.env.META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN
  );
}

/* ── user_data builders ─────────────────────────────────────────────── */

export interface BrowserUserData {
  clientIp: string | null;
  clientUserAgent: string | null;
  fbp: string | null;
  fbc: string | null;
}

/**
 * Non-PII browser signals. This is everything we know about an anonymous
 * visitor who clicked Call / WhatsApp, and it is also the base of the Lead
 * user_data. `client_user_agent` is required by Meta for `website` events.
 */
export function buildBrowserUserData(
  data: BrowserUserData
): Record<string, string> {
  const userData: Record<string, string> = {};

  if (data.clientIp) {
    userData.client_ip_address = data.clientIp;
  }
  if (data.clientUserAgent) {
    userData.client_user_agent = data.clientUserAgent;
  }
  if (data.fbp) {
    userData.fbp = data.fbp;
  }
  if (data.fbc) {
    userData.fbc = data.fbc;
  }

  return userData;
}

export interface LeadEventUserData extends BrowserUserData {
  name: string;
  fullPhone: string;
  countryCode: string;
}

export function buildLeadUserData(
  data: LeadEventUserData
): Record<string, string> {
  const countryIso = countryCodeToIso(data.countryCode);
  const phoneNormalized = data.fullPhone.replace(/\D/g, "");
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ").trim();

  const userData = buildBrowserUserData(data);

  if (phoneNormalized) {
    userData.ph = sha256Hash(phoneNormalized);
  }
  if (firstName) {
    userData.fn = sha256Hash(firstName);
  }
  if (lastName) {
    userData.ln = sha256Hash(lastName);
  }
  if (countryIso) {
    userData.country = sha256Hash(countryIso);
  }

  return userData;
}

/* ── payload builders ───────────────────────────────────────────────── */

/** Meta `custom_data`. `content_ids` is an array; everything else scalar. */
export type MetaCustomData = Record<string, string | number | string[]>;

export interface BuildEventPayloadOptions {
  eventName: MetaEventName;
  eventId: string;
  eventTime: number;
  eventSourceUrl: string | null;
  userData: Record<string, string>;
  customData?: MetaCustomData;
}

/**
 * Offer attribution fragment for `custom_data`, mirroring the browser-side
 * `offerCustomData()` in lib/analytics.ts so Pixel and CAPI halves match.
 */
export function buildOfferCustomData(input: {
  offer: string | null;
  offerName: string | null;
  intent: string | null;
}): MetaCustomData {
  if (!input.offer) return {};
  const data: MetaCustomData = {
    content_ids: [input.offer],
    offer: input.offer,
  };
  if (input.offerName) data.offer_name = input.offerName;
  if (input.intent) data.offer_intent = input.intent;
  return data;
}

export function buildEventPayload(
  options: BuildEventPayloadOptions
): Record<string, unknown> {
  const testCode = process.env.META_TEST_EVENT_CODE;
  const event: Record<string, unknown> = {
    event_name: options.eventName,
    event_time: options.eventTime,
    event_source_url:
      options.eventSourceUrl || "https://mercedes-benz.silberarrows.com",
    action_source: "website",
    event_id: options.eventId,
    user_data: options.userData,
  };
  if (options.customData && Object.keys(options.customData).length > 0) {
    event.custom_data = options.customData;
  }
  const payload: Record<string, unknown> = { data: [event] };
  if (testCode) {
    payload.test_event_code = testCode;
  }
  return payload;
}

export type BuildLeadPayloadOptions = Omit<BuildEventPayloadOptions, "eventName">;

export function buildLeadPayload(
  options: BuildLeadPayloadOptions
): Record<string, unknown> {
  return buildEventPayload({ ...options, eventName: "Lead" });
}

/* ── sender ─────────────────────────────────────────────────────────── */

/**
 * POST a prepared payload to the Conversions API. Never throws — failures
 * are logged so the calling request (lead / click) always succeeds for the
 * visitor. Returns false when CAPI is not configured or the send failed.
 */
export async function sendMetaEvent(
  payload: Record<string, unknown>
): Promise<boolean> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return false;

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[CAPI] Meta error:", res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[CAPI] Request failed:", err);
    return false;
  }
}
