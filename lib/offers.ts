/**
 * Offers catalogue.
 *
 * Pure data — no React — so it can be imported by pages, the sitemap, the
 * lead API and the analytics helpers alike. Each offer has a long, descriptive
 * SEO slug; `slug` is the only identifier that travels with leads and
 * conversion events (`offer` column in Supabase, `content_ids` on Meta,
 * `promotion_id` on GA4), so treat it as stable once an offer is live.
 *
 * The per-offer page body lives in `components/offers/<slug-key>/` and is
 * registered in `app/offers/[slug]/page.tsx`.
 */

import type { LeadContext } from "@/lib/analytics";
import { getServiceCareStartingPrices } from "@/lib/serviceWarrantyPricing";

export const OFFERS_PATH = "/offers";

const WHATSAPP_NUMBER = "97143805515";

export type OfferImage = {
  src: string;
  alt: string;
  /**
   * The creative is already graded dark for copy to sit on. The hero then
   * skips its `.hero-photo` brightness filter and uses a lighter scrim so the
   * image isn't crushed to black.
   */
  toned?: boolean;
  /** CSS `object-position` for the hero crop. Default "center". */
  position?: string;
};

export type Offer = {
  /** URL segment under /offers. Long-form, keyword-rich. */
  slug: string;
  /** Short label used on cards, breadcrumbs and in the lead context. */
  shortTitle: string;
  /** Page H1. */
  title: string;
  /**
   * Optional H1 / card title as stacked lines (matches a two-line creative).
   * Falls back to wrapping `title` when omitted.
   */
  titleLines?: string[];
  /** Eyebrow above the H1. */
  tagline: string;
  /** One-line hook under the H1. */
  intro: string;
  /** Card summary on the /offers index. */
  summary: string;
  /** Bullet points for the index card. */
  highlights: string[];
  /** Optional chip on the card / hero (e.g. "New"). */
  badge?: string;
  /** Hero + card image. Placeholder until the final creative is supplied. */
  image: OfferImage;
  /** Card thumbnail; falls back to `image` when omitted. */
  cardImage?: OfferImage;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  /**
   * Structured-data hints for the `Offer` JSON-LD on the offer page. Either
   * a lowest "from" price in AED or a percentage discount; both optional.
   */
  schema?: {
    priceFrom?: number;
    discountPercent?: number;
    /** Overrides the default "% off labour and parts" JSON-LD wording. */
    discountDescription?: string;
  };
  /** Inactive offers 404 and drop out of the index + sitemap. */
  active: boolean;
};

export const offers: Offer[] = [
  {
    slug: "mercedes-benz-over-10-years-old-service-dubai",
    shortTitle: "10+ Preferential Pricing",
    title: "Is your Mercedes-Benz over 10 years old?",
    titleLines: ["Is your Mercedes-Benz", "over 10 years old?"],
    tagline: "Independent Mercedes-Benz Specialists",
    intro: "Because age should never mean compromising on care.",
    summary:
      "Preferential 10+ pricing on specialist Mercedes-Benz care. 25% off labour and 25% off GenuineParts for vehicles aged 10 years and over — the same specialist standard, without compromising as the car gets older.",
    highlights: [
      "25% off labour",
      "25% off Mercedes-Benz GenuineParts",
      "Factory-trained technicians & XENTRY",
      "Preferential 10+ pricing",
    ],
    image: {
      src: "/assets/images/offers/ten-plus.jpg",
      alt: "White Mercedes-Benz with its bonnet open on an open expanse, a SilberArrows technician standing beside it with a diagnostic tablet.",
      position: "center 52%",
    },
    metaTitle:
      "Mercedes 10+ Years Old? 25% Off Dubai | SilberArrows",
    metaDescription:
      "Mercedes-Benz over 10 years old? Get 25% off labour and 25% off Mercedes-Benz GenuineParts at SilberArrows in Al Quoz, Dubai. Book your 10+ inspection.",
    keywords:
      "Mercedes 10 years old Dubai, Mercedes 10+ service Dubai, Mercedes labour discount Dubai, Mercedes GenuineParts discount, older Mercedes specialist Dubai, Mercedes 10 year service Al Quoz, SilberArrows 10 plus offer",
    schema: { discountPercent: 25 },
    active: true,
  },
  {
    slug: "mercedes-benz-warranty-expired-service-contract-dubai",
    shortTitle: "Warranty & Service Contract Expired",
    title: "Mercedes-Benz warranty and service contract expired?",
    tagline: "Independent Mercedes-Benz Specialists",
    intro:
      "The warranty may end. Specialist Mercedes-Benz care shouldn't.",
    summary:
      "Out of manufacturer cover? Keep your Mercedes-Benz in specialist hands with prepaid ServiceCare plans and a Certified Warranty that picks up where the factory left off.",
    highlights: [
      "ServiceCare Plans from AED 2,700",
      "Certified Warranty from AED 3,959",
      "XENTRY Diagnostics & Mercedes-Benz GenuineParts",
      "Factory-trained technicians",
    ],
    image: {
      src: "/assets/images/offers/warranty-expired.jpg",
      alt: "Black Mercedes-Benz in a darkened workshop with two SilberArrows technicians at a diagnostics station behind it.",
      toned: true,
      position: "center 45%",
    },
    metaTitle:
      "Mercedes Warranty Expired? Cover in Dubai | SilberArrows",
    metaDescription:
      "Mercedes-Benz warranty expired? ServiceCare plans from AED 2,700 and Certified Warranty from AED 3,959 from independent specialists in Al Quoz, Dubai.",
    keywords:
      "Mercedes warranty expired Dubai, Mercedes-Benz extended warranty Dubai, Mercedes service contract expired, Mercedes ServiceCare plan Dubai, certified warranty Mercedes Dubai, Mercedes out of warranty service Dubai, independent Mercedes specialist Al Quoz",
    schema: { priceFrom: getServiceCareStartingPrices().standard },
    active: true,
  },
  {
    slug: "mercedes-benz-imported-welcome-programme-dubai",
    shortTitle: "Imported Welcome Programme",
    title: "Is your Mercedes-Benz an import?",
    titleLines: ["Is your Mercedes-Benz", "an import?"],
    tagline: "Imported Mercedes-Benz Welcome Programme",
    intro: "Wherever it came from, it belongs in specialist hands.",
    summary:
      "Imported Mercedes-Benz vehicles receive a complimentary health check and 20% off Servicing, ServiceCare Plans and Certified Warranty on their first visit — the same SilberArrows standard, wherever its origin.",
    highlights: [
      "Complimentary health check",
      "20% off Servicing",
      "20% off ServiceCare Plans",
      "20% off Certified Warranty",
    ],
    badge: "New",
    image: {
      src: "/assets/images/offers/import-welcome.jpg",
      alt: "A dark Mercedes-Benz E-Class at night outside the SilberArrows workshop in Al Quoz, Dubai, cherry blossom overhead and path lights in the foreground.",
      toned: true,
      position: "center 46%",
    },
    metaTitle:
      "Imported Mercedes? Free Health Check Dubai | SilberArrows",
    metaDescription:
      "Imported Mercedes-Benz? Get a complimentary health check and 20% off servicing, ServiceCare plans and Certified Warranty on your first visit in Al Quoz, Dubai.",
    keywords:
      "imported Mercedes-Benz Dubai, parallel import Mercedes service Dubai, grey import Mercedes specialist Dubai, imported Mercedes health check, Mercedes import servicing Al Quoz, SilberArrows welcome programme, imported Mercedes warranty Dubai",
    schema: {
      discountPercent: 20,
      discountDescription:
        "Complimentary health check and 20% off Servicing, ServiceCare Plans and Certified Warranty on the first visit",
    },
    active: true,
  },
];

export function getActiveOffers(): Offer[] {
  return offers.filter((o) => o.active);
}

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.slug === slug && o.active);
}

export function offerPath(offer: Pick<Offer, "slug">): string {
  return `${OFFERS_PATH}/${offer.slug}`;
}

/** Anchor id of the inline lead form on every offer page. */
export const OFFER_FORM_ID = "enquire";

/** The active offer whose detail page `pathname` is, if any. */
export function getOfferByPath(
  pathname: string | null | undefined
): Offer | undefined {
  const prefix = `${OFFERS_PATH}/`;
  if (!pathname?.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length).split("/")[0];
  return slug ? getOfferBySlug(slug) : undefined;
}

/**
 * Offer detail pages are form-only: no Call / WhatsApp links anywhere in the
 * page chrome, so paid traffic can only convert through the Meta `Lead` form.
 */
export function isOfferDetailPath(pathname: string | null | undefined): boolean {
  return getOfferByPath(pathname) !== undefined;
}

/**
 * Lead / analytics context for an offer. `intent` names the CTA location
 * (hero, servicecare-premium, closing…) so reports can compare placements.
 */
export function offerLeadContext(
  offer: Pick<Offer, "slug" | "shortTitle">,
  intent?: string
): LeadContext {
  return {
    offer: offer.slug,
    offerName: offer.shortTitle,
    ...(intent ? { intent } : {}),
  };
}

/** wa.me link with a message that names the offer being enquired about. */
export function offerWhatsAppHref(context: LeadContext): string {
  const text = `Hi Team SilberArrows! I'm enquiring about your offer: ${context.offerName}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
