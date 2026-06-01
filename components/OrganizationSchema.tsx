import { site } from "@/lib/site";

const baseUrl = site.url;

export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "SilberArrows",
    legalName: "SilberArrows Mercedes-Benz Service",
    alternateName: ["SilberArrows Mercedes-Benz Service", "Silber Arrows"],
    description:
      "Independent Mercedes-Benz service center in Dubai specializing in expert maintenance, repair and diagnostics since 2011.",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/icons/silberarrows-logo-square.png`,
      width: 512,
      height: 512,
    },
    image: [
      `${baseUrl}/assets/images/al-manara-location.webp`,
      `${baseUrl}/assets/images/hero-bg-silver-optimized.webp`,
    ],
    telephone: "+971-4-380-5515",
    email: "info@silberarrows.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Manara Street",
      addressLocality: "Al Quoz",
      addressRegion: "Dubai",
      postalCode: "00000",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971-4-380-5515",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
        areaServed: "AE",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        url: "https://wa.me/97143805515",
        contactType: "customer service",
        availableLanguage: ["English", "Arabic"],
        areaServed: "AE",
      },
    ],
    foundingDate: "2011",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    areaServed: {
      "@type": "City",
      name: "Dubai",
      "@id": "https://www.wikidata.org/wiki/Q612",
    },
    knowsAbout: [
      "Mercedes-Benz Maintenance",
      "Mercedes-Benz Repair",
      "Mercedes-Benz Diagnostics",
      "XENTRY Diagnosis",
      "Mercedes-Benz Service",
      "Automotive Service",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.reviews.rating,
      reviewCount: site.reviews.count,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: ["https://wa.me/97143805515", site.reviews.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
