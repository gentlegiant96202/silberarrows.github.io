import { googleBusiness, site } from "@/lib/site";

type ServiceSchemaProps = {
  serviceName: string;
  serviceDescription: string;
  serviceSlug: string;
  category?: string;
  image?: string;
  /** AED excluding VAT. */
  price?: number;
};

const baseUrl = site.url;

export function ServiceSchema({
  serviceName,
  serviceDescription,
  serviceSlug,
  category = "AutomotiveService",
  image,
  price,
}: ServiceSchemaProps) {
  const url = `${baseUrl}/services/${serviceSlug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: serviceName,
    description: serviceDescription,
    url,
    image: image ? `${baseUrl}${image}` : undefined,
    category,
    serviceType: "Mercedes-Benz Service",
    provider: {
      "@type": "AutomotiveBusiness",
      "@id": `${baseUrl}/#business`,
      name: googleBusiness.name,
      telephone: "+971-4-380-5515",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Al Manara Street",
        addressLocality: "Al Quoz",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: site.reviews.rating,
        reviewCount: site.reviews.count,
        bestRating: "5",
        worstRating: "1",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Dubai",
      containedInPlace: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
    brand: { "@type": "Brand", name: "Mercedes-Benz" },
    offers: {
      "@type": "Offer",
      name: serviceName,
      description: serviceDescription,
      priceCurrency: "AED",
      ...(price != null && {
        price: String(price),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(price),
          priceCurrency: "AED",
          valueAddedTaxIncluded: false,
        },
      }),
      availability: "https://schema.org/InStock",
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      seller: {
        "@type": "AutomotiveBusiness",
        "@id": `${baseUrl}/#business`,
        name: googleBusiness.name,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
}
