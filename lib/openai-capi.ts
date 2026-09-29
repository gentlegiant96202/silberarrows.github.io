import crypto from "crypto";
import { countryCodeToIso } from "@/lib/meta-capi";
import { OPENAI_LEAD_EVENT, OPENAI_PIXEL_ID } from "@/lib/openai-pixel";
import { site } from "@/lib/site";

/**
 * OpenAI (ChatGPT Ads) Conversions API — server-side helpers.
 *
 * Sent from:
 *   - /api/lead          — quote form submitted (hashed phone + name)
 *   - /api/contact-click — Call / WhatsApp tapped (browser signals only)
 *
 * Both are the standard `lead_created` event, deduplicated against the
 * browser Pixel via a shared event id (API `id` = Pixel `event_id`).
 */

const OPENAI_EVENTS_URL = "https://bzr.openai.com/v1/events";

export function isOpenAICapiConfigured(): boolean {
  return Boolean(process.env.OPENAI_CONVERSIONS_API_KEY);
}

function sha256Hex(normalized: string): string {
  return crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
}

/** Country calling code kept; `+` and leading zeroes removed; 8–15 digits. */
function normalizePhone(fullPhone: string): string | null {
  const digits = fullPhone.replace(/\D/g, "").replace(/^0+/, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

/** Lowercase, whitespace and ASCII punctuation removed, non-ASCII preserved. */
function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[!-/:-@[-`{-~]/g, "");
}

export interface OpenAIUserInput {
  clientIp: string | null;
  clientUserAgent: string | null;
  obref: string | null;
  /** Form leads only. */
  name?: string;
  fullPhone?: string;
  countryCode?: string;
}

export function buildOpenAIUser(
  input: OpenAIUserInput
): Record<string, string | string[]> {
  const user: Record<string, string | string[]> = {};

  if (input.obref) user.obref = input.obref;
  if (input.clientIp) user.ip_address = input.clientIp;
  if (input.clientUserAgent) user.user_agent = input.clientUserAgent;

  if (input.fullPhone) {
    const phone = normalizePhone(input.fullPhone);
    if (phone) user.phone_numbers_sha256 = [sha256Hex(phone)];
  }

  if (input.name) {
    const parts = input.name.trim().split(/\s+/);
    const firstName = normalizeName(parts[0] || "");
    const lastName = normalizeName(parts.slice(1).join(" "));
    if (firstName) user.first_names_sha256 = [sha256Hex(firstName)];
    if (lastName) user.last_names_sha256 = [sha256Hex(lastName)];
  }

  if (input.countryCode) {
    const iso = countryCodeToIso(input.countryCode);
    if (iso) user.countries = [iso.toUpperCase()];
  }

  return user;
}

export interface SendOpenAILeadOptions {
  eventId: string;
  timestampMs: number;
  sourceUrl: string | null;
  oppref: string | null;
  user: Record<string, string | string[]>;
}

/**
 * POST one `lead_created` event. Never throws — the visitor's request must
 * succeed regardless. Returns false when not configured or the send failed.
 *
 * Set OPENAI_CAPI_VALIDATE_ONLY=true to have OpenAI validate events without
 * saving them while testing.
 */
export async function sendOpenAILead(
  options: SendOpenAILeadOptions
): Promise<boolean> {
  const apiKey = process.env.OPENAI_CONVERSIONS_API_KEY;
  if (!apiKey) return false;

  const pixelId = process.env.OPENAI_PIXEL_ID || OPENAI_PIXEL_ID;

  const event: Record<string, unknown> = {
    id: options.eventId,
    type: OPENAI_LEAD_EVENT,
    timestamp_ms: options.timestampMs,
    source_url: options.sourceUrl || site.url,
    action_source: "web",
    data: { type: "customer_action" },
  };
  if (options.oppref) event.oppref = options.oppref;
  if (Object.keys(options.user).length > 0) event.user = options.user;

  const body = {
    validate_only: process.env.OPENAI_CAPI_VALIDATE_ONLY === "true",
    events: [event],
  };

  try {
    const res = await fetch(
      `${OPENAI_EVENTS_URL}?pid=${encodeURIComponent(pixelId)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      console.error("[OpenAI CAPI] error:", res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[OpenAI CAPI] request failed:", err);
    return false;
  }
}
