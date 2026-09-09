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

/** First hop of x-forwarded-for, else x-real-ip, else null. */
export function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || null;
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

export interface BuildEventPayloadOptions {
  eventName: MetaEventName;
  eventId: string;
  eventTime: number;
  eventSourceUrl: string | null;
  userData: Record<string, string>;
  customData?: Record<string, string | number>;
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
