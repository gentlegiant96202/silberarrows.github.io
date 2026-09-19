import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { OfferSchema } from "@/components/OfferSchema";
import { OfferViewTracker } from "@/components/offers/OfferViewTracker";
import { ImportWelcomeOffer } from "@/components/offers/import-welcome/ImportWelcomeOffer";
import { TenPlusOffer } from "@/components/offers/ten-plus/TenPlusOffer";
import { WarrantyExpiredOffer } from "@/components/offers/warranty-expired/WarrantyExpiredOffer";
import {
  getActiveOffers,
  getOfferBySlug,
  offerLeadContext,
  offerPath,
  OFFERS_PATH,
  type Offer,
} from "@/lib/offers";
import { absoluteUrl, defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Offer body registry: slug → section composition. Offer *metadata* (title,
 * SEO, image, tracking id) lives in lib/offers.ts; the page layout for each
 * offer is bespoke, so it is a component keyed by slug here — the same way
 * /lp/[slug] branches on intent.
 */
const OFFER_BODIES: Record<string, ComponentType<{ offer: Offer }>> = {
  "mercedes-benz-over-10-years-old-service-dubai": TenPlusOffer,
  "mercedes-benz-warranty-expired-service-contract-dubai": WarrantyExpiredOffer,
  "mercedes-benz-imported-welcome-programme-dubai": ImportWelcomeOffer,
};

export function generateStaticParams() {
  return getActiveOffers().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);
  if (!offer) return { title: "Offer Not Found" };

  const canonical = `${site.url}${offerPath(offer)}`;
  return {
    title: offer.metaTitle,
    description: offer.metaDescription,
    keywords: offer.keywords,
    alternates: { canonical },
    openGraph: {
      title: offer.metaTitle,
      description: offer.metaDescription,
      url: canonical,
      // Default OG until an offer-specific 1200×630 is supplied.
      images: [
        {
          ...defaultOgImage,
          url: absoluteUrl(defaultOgImage.url),
          alt: offer.image.alt,
        },
      ],
    },
  };
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);
  const Body = offer ? OFFER_BODIES[offer.slug] : undefined;
  if (!offer || !Body) return notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Offers", href: OFFERS_PATH },
          { name: offer.shortTitle, href: offerPath(offer) },
        ]}
      />
      <OfferSchema offer={offer} />
      <OfferViewTracker context={offerLeadContext(offer)} />
      <Body offer={offer} />
      <Contact />
    </>
  );
}
