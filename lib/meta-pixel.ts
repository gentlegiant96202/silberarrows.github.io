/**
 * Meta Pixel (browser) helpers.
 *
 * The Pixel itself is installed in the root layout. This module fires the
 * browser side of events that are *also* sent server-side via the
 * Conversions API, sharing one `eventID` so Meta deduplicates them.
 */

import { offerCustomData, type LeadContext } from "@/lib/analytics";

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
 * When an offer `context` is given, both halves carry `content_ids` and the
 * offer slug so the click can be attributed to that offer in Events Manager.
 *
 * Returns the event id so callers can correlate if needed.
 */
export function trackMetaContact(
  kind: ContactKind,
  context?: LeadContext | null
): string | null {
  if (typeof window === "undefined") return null;

  const eventId = newEventId("contact");
  const customData = {
    content_name: kind === "whatsapp" ? "WhatsApp" : "Phone",
    content_category: "contact_click",
    ...offerCustomData(context),
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
  const extra = collectContactContext();

  postSurvivingNavigation(
    CONTACT_CLICK_ENDPOINT,
    JSON.stringify({
      kind,
      eventId,
      ...(fbp && { fbp }),
      ...(fbc && { fbc }),
      ...(context && {
        offer: context.offer,
        offerName: context.offerName,
        ...(context.intent && { intent: context.intent }),
      }),
      eventSourceUrl: window.location.href,
      source: window.location.pathname,
      ...extra,
    })
  );

  return eventId;
}

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string };
};

/** First-party click ids, visit cookie, referrer, and bot-detection env. */
function collectContactContext(): Record<string, unknown> {
  const query = (() => {
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return null;
    }
  })();

  const fromQueryOrCookie = (name: string): string | null => {
    const fromQuery = query?.get(name);
    if (fromQuery) return fromQuery;
    return getCookie(`_${name}`);
  };

  const gclid = fromQueryOrCookie("gclid");
  const gbraid = fromQueryOrCookie("gbraid");
  const wbraid = fromQueryOrCookie("wbraid");
  const fbclid =
    query?.get("fbclid") ||
    (() => {
      const fbc = getFbc();
      if (!fbc) return null;
      const parts = fbc.split(".");
      return parts.length >= 4 ? parts.slice(3).join(".") : null;
    })();
  const visitId = getCookie("_sa_visit");
  const referrer = document.referrer || null;

  const nav = navigator as NavigatorExtras;
  let tz: string | null = null;
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    /* ignore */
  }

  return {
    ...(referrer && { referrer }),
    ...(visitId && { visitId }),
    ...(gclid && { gclid }),
    ...(gbraid && { gbraid }),
    ...(wbraid && { wbraid }),
    ...(fbclid && { fbclid }),
    ...(query?.get("utm_source") && { utm_source: query.get("utm_source") }),
    ...(query?.get("utm_medium") && { utm_medium: query.get("utm_medium") }),
    ...(query?.get("utm_campaign") && { utm_campaign: query.get("utm_campaign") }),
    env: {
      vw: window.innerWidth,
      vh: window.innerHeight,
      sw: window.screen?.width ?? null,
      sh: window.screen?.height ?? null,
      dpr: window.devicePixelRatio ?? null,
      lang: navigator.language ?? null,
      langs: Array.isArray(navigator.languages) ? navigator.languages.slice(0, 4) : null,
      tz,
      tzOffset: new Date().getTimezoneOffset(),
      touch: "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0,
      webdriver: navigator.webdriver === true,
      cores: navigator.hardwareConcurrency ?? null,
      memory: nav.deviceMemory ?? null,
      connection: nav.connection?.effectiveType ?? null,
      cookies: navigator.cookieEnabled,
      referrer,
    },
  };
}

export {};
