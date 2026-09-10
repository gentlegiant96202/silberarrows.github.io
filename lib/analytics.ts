/**
 * Offer-aware analytics (browser side).
 *
 * Three destinations, all already installed in the root layout:
 *   - GA4 (`gtag`) — recommended `view_promotion` / `select_promotion` events
 *     so offers show up natively in GA4 promotion reports and can be imported
 *     into Google Ads as conversions if wanted.
 *   - GTM — a plain `dataLayer.push({ event })` for custom triggers. gtag()
 *     calls land in the same array as `arguments` objects, which GTM does not
 *     expose as custom events, hence the separate push.
 *   - Meta Pixel — standard `ViewContent` with `content_ids` so the offer can
 *     seed retargeting audiences. Browser-only for now (no CAPI twin), which
 *     is fine for an upper-funnel event.
 *
 * `Contact` (Call / WhatsApp) and `Lead` (form) are fired elsewhere
 * (`lib/meta-pixel.ts`, thank-you page) and simply carry the same
 * `LeadContext` so every downstream event shares one offer identifier.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Where a conversion came from. Attached to modal opens, Call / WhatsApp
 * clicks and form leads so Supabase, Meta and Google all see the same offer.
 */
export type LeadContext = {
  /** Offer slug (stable identifier, see lib/offers.ts). */
  offer: string;
  /** Human-readable offer title for reports / CRM. */
  offerName: string;
  /** Optional finer intent, e.g. "servicecare-premium" or "hero". */
  intent?: string;
};

export type OfferCtaKind = "modal" | "whatsapp" | "phone" | "link";

function gtagEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", name, params);
    } catch {
      /* analytics must never break the page */
    }
  }
}

function dataLayerPush(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    /* ignore */
  }
}

function fbqTrack(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", event, params);
    } catch {
      /* ignore */
    }
  }
}

/** Offer detail page viewed. Fire once per page load. */
export function trackOfferView(ctx: LeadContext): void {
  gtagEvent("view_promotion", {
    promotion_id: ctx.offer,
    promotion_name: ctx.offerName,
  });
  dataLayerPush({
    event: "offer_view",
    offer_id: ctx.offer,
    offer_name: ctx.offerName,
  });
  fbqTrack("ViewContent", {
    content_name: ctx.offerName,
    content_category: "offer",
    content_ids: [ctx.offer],
    content_type: "product",
  });
}

/**
 * A CTA on an offer was used (modal opened, WhatsApp / Call clicked, or an
 * internal link followed). `creative_slot` carries the intent so reports can
 * separate hero vs. tier vs. closing CTAs.
 */
export function trackOfferSelect(ctx: LeadContext, kind: OfferCtaKind): void {
  const slot = ctx.intent ? `${ctx.intent}:${kind}` : kind;
  gtagEvent("select_promotion", {
    promotion_id: ctx.offer,
    promotion_name: ctx.offerName,
    creative_slot: slot,
  });
  dataLayerPush({
    event: "offer_cta_click",
    offer_id: ctx.offer,
    offer_name: ctx.offerName,
    cta_kind: kind,
    cta_intent: ctx.intent ?? null,
  });
}

/** Meta `custom_data` fragment shared by Contact / Lead events for an offer. */
export function offerCustomData(
  ctx: LeadContext | null | undefined
): Record<string, string | string[]> {
  if (!ctx) return {};
  return {
    content_ids: [ctx.offer],
    offer: ctx.offer,
    offer_name: ctx.offerName,
    ...(ctx.intent ? { offer_intent: ctx.intent } : {}),
  };
}

export {};
