import { offerPath, OFFERS_PATH, type Offer } from "@/lib/offers";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

const baseUrl = site.url;

function offerNode(offer: Offer) {
  const url = `${baseUrl}${offerPath(offer)}`;
  const { priceFrom, discountPercent } = offer.schema ?? {};

  return {
    "@type": "Offer",
    "@id": `${url}#offer`,
    name: offer.title,
    description: offer.metaDescription,
    url,
    image: absoluteUrl(offer.image.src),
    category: "Automotive Service",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "City", name: "Dubai" },
    eligibleRegion: { "@type": "Country", name: "AE" },
    offeredBy: { "@id": `${baseUrl}/#business` },
    itemOffered: {
      "@type": "Service",
      name: offer.shortTitle,
      serviceType: "Mercedes-Benz maintenance and protection",
      provider: { "@id": `${baseUrl}/#business` },
    },
    // Lowest "from" price when the offer has one; otherwise describe the
    // discount so the node still carries a price specification.
    ...(priceFrom !== undefined
      ? {
          priceCurrency: "AED",
          price: String(priceFrom),
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "AED",
            minPrice: String(priceFrom),
            valueAddedTaxIncluded: false,
          },
        }
      : discountPercent !== undefined
        ? {
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "AED",
              description: `${discountPercent}% off labour and Mercedes-Benz GenuineParts`,
            },
          }
        : {}),
  };
}

/** `Offer` JSON-LD for a single offer page. */
export function OfferSchema({ offer }: { offer: Offer }) {
  const schema = { "@context": "https://schema.org", ...offerNode(offer) };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** `OfferCatalog` JSON-LD for the /offers index. */
export function OfferCatalogSchema({ offers }: { offers: Offer[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${baseUrl}${OFFERS_PATH}#catalog`,
    name: "SilberArrows Mercedes-Benz Offers",
    url: `${baseUrl}${OFFERS_PATH}`,
    numberOfItems: offers.length,
    itemListElement: offers.map((offer, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: offerNode(offer),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
