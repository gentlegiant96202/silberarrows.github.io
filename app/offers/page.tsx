import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { OfferCatalogSchema } from "@/components/OfferSchema";
import { OfferCard } from "@/components/offers/OfferCard";
import { getActiveOffers, OFFERS_PATH } from "@/lib/offers";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}${OFFERS_PATH}`;

export const metadata: Metadata = {
  title: "Mercedes-Benz Service Offers Dubai | SilberArrows",
  description:
    "Current Mercedes-Benz offers from SilberArrows, Dubai's independent Mercedes-Benz specialists in Al Quoz: 25% off labour and parts for 10+ vehicles, ServiceCare plans, Certified Warranty and more.",
  keywords:
    "Mercedes-Benz offers Dubai, Mercedes 10+ service offer, Mercedes labour discount Dubai, Mercedes warranty offer Dubai, Mercedes service contract offer, SilberArrows offers, Mercedes deals Al Quoz",
  alternates: { canonical },
  openGraph: {
    title: "Mercedes-Benz Service Offers Dubai | SilberArrows",
    description:
      "Current Mercedes-Benz offers from Dubai's independent Mercedes-Benz specialists: 10+ preferential pricing, ServiceCare plans, Certified Warranty and more.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function OffersPage() {
  const offers = getActiveOffers();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Offers", href: OFFERS_PATH },
        ]}
      />
      <OfferCatalogSchema offers={offers} />
      <PageHero
        title="Mercedes-Benz Offers in Dubai"
        intro="Current offers from Dubai's independent Mercedes-Benz specialists. 10+ preferential pricing, prepaid servicing and extended protection, all under one roof in Al Quoz."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />

      <section
        className="relative py-14 md:py-20"
        aria-labelledby="offers-heading"
      >
        <div className="container-page">
          <h2 id="offers-heading" className="sr-only">
            Current offers
          </h2>

          {offers.length === 0 ? (
            <p className="surface rounded-3xl p-8 text-center text-sm text-[color:var(--color-silver-400)]">
              No offers are running right now. Check back soon or speak to us
              about ServiceCare plans and Certified Warranty.
            </p>
          ) : (
            <div className="grid gap-5 lg:gap-6">
              {/* First offer takes the full row; the rest pair up. */}
              <OfferCard offer={offers[0]} index={0} featured />
              {offers.length === 2 ? (
                <OfferCard offer={offers[1]} index={1} />
              ) : (
                offers.length > 2 && (
                  <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                    {offers.slice(1).map((offer, i) => (
                      <OfferCard key={offer.slug} offer={offer} index={i + 1} />
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      <Contact />
    </>
  );
}
