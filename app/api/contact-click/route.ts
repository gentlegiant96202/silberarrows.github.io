import { NextRequest, NextResponse } from "next/server";
import {
  buildBrowserUserData,
  buildEventPayload,
  getClientIp,
  isMetaCapiConfigured,
  sendMetaEvent,
} from "@/lib/meta-capi";

/**
 * Server half of Call / WhatsApp click tracking.
 *
 * The browser fires `fbq('track', 'Contact', …, { eventID })` and beacons the
 * same `eventId` here; we forward a matching `Contact` event to the Meta
 * Conversions API so Meta deduplicates the pair and still counts the click
 * when the Pixel was blocked or hadn't loaded. Mirrors how /api/lead sends
 * the form `Lead`.
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

  // Nothing to do without CAPI credentials — still a successful no-op so the
  // client never sees an error for tracking.
  if (!isMetaCapiConfigured()) {
    return NextResponse.json({ success: true, sent: false });
  }

  const eventId =
    cleanStr(body.eventId, 128) ||
    `contact-${eventTime}-${Math.random().toString(36).slice(2)}`;

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
    eventSourceUrl: cleanUrl(body.eventSourceUrl),
    userData,
    customData: {
      content_name: kind === "whatsapp" ? "WhatsApp" : "Phone",
      content_category: "contact_click",
    },
  });

  const sent = await sendMetaEvent(payload);
  return NextResponse.json({ success: true, sent });
}
