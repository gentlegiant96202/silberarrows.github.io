import { NextRequest, NextResponse } from "next/server";
import {
  buildBrowserUserData,
  buildEventPayload,
  buildOfferCustomData,
  getClientIp,
  isMetaCapiConfigured,
  sendMetaEvent,
} from "@/lib/meta-capi";
import {
  buildOpenAIUser,
  isOpenAICapiConfigured,
  sendOpenAILead,
} from "@/lib/openai-capi";
import { buildContactClickRow, insertContactClick } from "@/lib/contactClicks";

/**
 * Server half of Call / WhatsApp click tracking.
 *
 * The browser fires `fbq('track', 'Contact', …, { eventID })` and
 * `oaiq('measure', 'lead_created', …, { event_id })` with one shared id and
 * beacons that `eventId` here. We:
 *
 *   1. Persist every tap to `contact_clicks` (IP, UA, geo, env, click ids)
 *      so /ads/contacts can review bots vs real people.
 *   2. Forward a matching `Contact` event to the Meta Conversions API when
 *      credentials are set, so Meta deduplicates the pair and still counts
 *      the click when the Pixel was blocked.
 *   3. Forward a matching `lead_created` event to the OpenAI Conversions API
 *      when its key is set, for the same reason.
 *
 * Logging is independent of CAPI — a missing token must not drop the row.
 */

const KINDS = new Set(["phone", "whatsapp"]);

/** Trim + cap a free-text value; returns null when empty or not a string. */
function cleanStr(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return null;
  return v.length > max ? v.slice(0, max) : v;
}

function cleanUrl(value: unknown): string | null {
  const v = cleanStr(value, 2048);
  if (!v) return null;
  return /^https?:\/\//i.test(v) ? v : null;
}

export async function POST(request: NextRequest) {
  const eventTimeMs = Date.now();
  const eventTime = Math.floor(eventTimeMs / 1000);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const kind = cleanStr(body.kind, 16);
  if (!kind || !KINDS.has(kind)) {
    return NextResponse.json(
      { success: false, error: "kind must be 'phone' or 'whatsapp'" },
      { status: 400 }
    );
  }

  const eventId =
    cleanStr(body.eventId, 128) ||
    `contact-${eventTime}-${Math.random().toString(36).slice(2)}`;
  const eventSourceUrl = cleanUrl(body.eventSourceUrl);
  const clientIp = getClientIp(request.headers);
  const clientUserAgent = request.headers.get("user-agent") || null;

  const metaSend = (async () => {
    if (!isMetaCapiConfigured()) return false;

    const userData = buildBrowserUserData({
      clientIp,
      clientUserAgent,
      fbp: cleanStr(body.fbp, 256),
      fbc: cleanStr(body.fbc, 512),
    });

    const payload = buildEventPayload({
      eventName: "Contact",
      eventId,
      eventTime,
      eventSourceUrl,
      userData,
      customData: {
        content_name: kind === "whatsapp" ? "WhatsApp" : "Phone",
        content_category: "contact_click",
        ...buildOfferCustomData({
          offer: cleanStr(body.offer, 128),
          offerName: cleanStr(body.offerName, 256),
          intent: cleanStr(body.intent, 64),
        }),
      },
    });

    return sendMetaEvent(payload);
  })();

  const openaiSend = isOpenAICapiConfigured()
    ? sendOpenAILead({
        eventId,
        timestampMs: eventTimeMs,
        sourceUrl: eventSourceUrl,
        oppref: cleanStr(body.oppref, 1024),
        user: buildOpenAIUser({
          clientIp,
          clientUserAgent,
          obref: cleanStr(body.obref, 256),
        }),
      })
    : Promise.resolve(false);

  const [sent] = await Promise.all([metaSend, openaiSend]);

  await insertContactClick(
    buildContactClickRow({
      eventId,
      kind: kind as "phone" | "whatsapp",
      headers: request.headers,
      body,
      pageUrl: eventSourceUrl,
      capiSent: sent,
    })
  );

  return NextResponse.json({ success: true, sent });
}
