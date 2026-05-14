import { site } from "@/lib/site";

const baseUrl = site.url;

export function LocalBusinessSchema() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${baseUrl}/#business`,
    additionalType: [
      "https://schema.org/AutomotiveServiceCenter",
      "https://schema.org/CarRepair",
    ],
    name: "SilberArrows",
    legalName: "SilberArrows Mercedes-Benz Service",
    alternateName: [
      "SilberArrows Mercedes-Benz Service",
      "SilberArrows Dubai",
      "Silber Arrows",
    ],
    description:
      "Dubai's trusted independent Mercedes-Benz specialists since 2011. Expert maintenance, repair and diagnostics at Al Quoz with genuine parts and factory standards.",
    slogan: "Exclusive Automotive Excellence",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    image: [
      `${baseUrl}/assets/images/al-manara-location.webp`,
      `${baseUrl}/assets/images/hero-bg-silver-optimized.webp`,
      `${baseUrl}/assets/images/ENGINE.webp`,
    ],
    telephone: "+971-4-380-5515",
    email: "info@silberarrows.com",
    priceRange: "AED 375 - AED 7,080",
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer",
    foundingDate: "2011",
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
      latitude: 25.1459942,
      longitude: 55.2304157,
    },
    hasMap: `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
        "@id": "https://www.wikidata.org/wiki/Q612",
      },
      { "@type": "City", name: "Sharjah" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.reviews.rating,
      reviewCount: site.reviews.count,
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mercedes-Benz Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Scheduled Maintenance (Service A & B)",
            description:
              "Service A and Service B maintenance following official Mercedes-Benz schedules with genuine parts.",
            url: `${baseUrl}/services/scheduled-maintenance`,
          },
          priceCurrency: "AED",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "AED",
            minPrice: 972,
            maxPrice: 3600,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Brake Service",
            description:
              "Brake pad replacement, disc service and brake system maintenance using genuine parts.",
            url: `${baseUrl}/services/brake-service`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Diagnostics",
            description:
              "Professional XENTRY Diagnosis and computer diagnostics for all Mercedes-Benz models.",
            url: `${baseUrl}/services/diagnostics`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Air Conditioning Service",
            description:
              "A/C repair, refrigerant refill (R134a and R1234yf) and climate control service.",
            url: `${baseUrl}/services/air-conditioning`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Engine Repair & Overhaul",
            description:
              "Engine repair, diagnostics and overhaul using factory repair methods and genuine parts.",
            url: `${baseUrl}/services/engine-repair`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Suspension Repair",
            description:
              "Shock absorber, AIRMATIC and Active Body Control suspension repair and service.",
            url: `${baseUrl}/services/suspension-repair`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Battery Service",
            description:
              "Battery testing and replacement with ECU registration.",
            url: `${baseUrl}/services/battery-service`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Wheel Alignment",
            description:
              "Hunter 3D laser four-wheel alignment with steering angle sensor calibration.",
            url: `${baseUrl}/services/wheel-alignment`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Tyre Replacement",
            description:
              "Tyre fitting, balancing and TPMS sensor calibration for all Mercedes-Benz models.",
            url: `${baseUrl}/services/tyre-replacement`,
          },
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mercedes-Benz Detailing",
            description:
              "Professional interior and exterior detailing including ceramic coating options.",
            url: `${baseUrl}/services/detailing`,
          },
          priceCurrency: "AED",
        },
      ],
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Standard Service Contract",
        description:
          "2 Year / 30,000 km Mercedes-Benz maintenance contract including Service A, Service B and brake fluid replacement.",
        price: "2700",
        priceCurrency: "AED",
        url: `${baseUrl}/service-contracts`,
      },
      {
        "@type": "Offer",
        name: "Premium Service Contract",
        description:
          "4 Year / 60,000 km comprehensive Mercedes-Benz maintenance contract including transmission, coolant and spark plug service.",
        price: "5800",
        priceCurrency: "AED",
        url: `${baseUrl}/service-contracts`,
      },
    ],
    brand: { "@type": "Brand", name: "Mercedes-Benz" },
    knowsAbout: [
      "Mercedes-Benz Maintenance",
      "Mercedes-Benz Repair",
      "Mercedes-Benz Diagnostics",
      "XENTRY Diagnosis",
      "AIRMATIC Suspension",
      "Mercedes-Benz Service A",
      "Mercedes-Benz Service B",
      "AMG Service",
      "Maybach Service",
      "Mercedes EQ Service",
    ],
    sameAs: [
      "https://www.google.com/maps?cid=0",
      "https://wa.me/97143805515",
      site.reviews.url,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  );
}
