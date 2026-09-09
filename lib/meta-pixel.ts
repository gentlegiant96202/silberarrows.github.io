/**
 * Meta Pixel (browser) helpers.
 *
 * The Pixel itself is installed in the root layout. This module fires the
 * browser side of events that are *also* sent server-side via the
 * Conversions API, sharing one `eventID` so Meta deduplicates them.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type ContactKind = "whatsapp" | "phone";

export const CONTACT_CLICK_ENDPOINT = "/api/contact-click";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

/** UUID shared between the browser Pixel event and the CAPI event. */
export function newEventId(prefix = "evt"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getFbp(): string | null {
  return getCookie("_fbp");
}

/**
 * `_fbc` is written by fbevents.js when the landing URL carries `?fbclid=`.
 * The library loads lazily, so a fast click can beat it — in that case build
 * the value ourselves in Meta's documented `fb.1.<ms>.<fbclid>` format.
 */
export function getFbc(): string | null {
  const cookie = getCookie("_fbc");
  if (cookie) return cookie;
  if (typeof window === "undefined") return null;
  try {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (!fbclid) return null;
    return `fb.1.${Date.now()}.${fbclid}`;
  } catch {
    return null;
  }
}

/**
 * Deliver a JSON body to a same-origin endpoint in a way that survives the
 * navigation that starts right after a tel: / wa.me click.
 */
function postSurvivingNavigation(url: string, body: string): void {
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    } catch {
      /* fall through to fetch */
    }
  }
  try {
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    /* tracking must never break the click */
  }
}

/**
 * Track a Call / WhatsApp click as a Meta `Contact` event.
 *
 *  1. Browser: `fbq('track', 'Contact', …, { eventID })` when the Pixel has
 *     loaded. If it hasn't yet, the server event alone still counts.
 *  2. Server: beacon to /api/contact-click, which sends the same event
 *     (same event_id) through the Conversions API with IP / UA / fbp / fbc.
 *
 * Returns the event id so callers can correlate if needed.
 */
export function trackMetaContact(kind: ContactKind): string | null {
  if (typeof window === "undefined") return null;

  const eventId = newEventId("contact");
  const customData = {
    content_name: kind === "whatsapp" ? "WhatsApp" : "Phone",
    content_category: "contact_click",
  };

  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "Contact", customData, { eventID: eventId });
    } catch {
      /* never block the click on Pixel errors */
    }
  }

  const fbp = getFbp();
  const fbc = getFbc();

  postSurvivingNavigation(
    CONTACT_CLICK_ENDPOINT,
    JSON.stringify({
      kind,
      eventId,
      ...(fbp && { fbp }),
      ...(fbc && { fbc }),
      eventSourceUrl: window.location.href,
      source: window.location.pathname,
    })
  );

  return eventId;
}

export {};
