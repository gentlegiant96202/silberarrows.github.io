import { NextRequest, NextResponse } from "next/server";
import {
  buildBrowserUserData,
  buildEventPayload,
  buildOfferCustomData,
  getClientIp,
  isMetaCapiConfigured,
  sendMetaEvent,
} from "@/lib/meta-capi";
import { buildContactClickRow, insertContactClick } from "@/lib/contactClicks";

/**
 * Server half of Call / WhatsApp click tracking.
 *
 * The browser fires `fbq('track', 'Contact', …, { eventID })` and beacons the
 * same `eventId` here. We:
 *
 *   1. Persist every tap to `contact_clicks` (IP, UA, geo, env, click ids)
 *      so /ads/contacts can review bots vs real people.
 *   2. Forward a matching `Contact` event to the Meta Conversions API when
 *      credentials are set, so Meta deduplicates the pair and still counts
 *      the click when the Pixel was blocked.
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
  const eventTime = Math.floor(Date.now() / 1000);

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

  let sent = false;
  if (isMetaCapiConfigured()) {
    const userData = buildBrowserUserData({
      clientIp: getClientIp(request.headers),
      clientUserAgent: request.headers.get("user-agent") || null,
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

    sent = await sendMetaEvent(payload);
  }

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
