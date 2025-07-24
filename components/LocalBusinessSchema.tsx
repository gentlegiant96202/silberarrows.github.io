import React from 'react';

export default function LocalBusinessSchema() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveServiceCenter",
    "name": "SilberArrows",
    "alternateName": "SilberArrows Mercedes-Benz Service",
    "description": "Dubai's trusted independent Mercedes-Benz specialists since 2011. Expert maintenance, repair & diagnostics at Al Quoz with genuine parts and factory standards.",
    "url": "https://silberarrows.ae",
    "logo": "https://silberarrows.ae/assets/icons/logo.svg",
    "image": "https://silberarrows.ae/assets/images/al-manara-location.webp",
    "telephone": "+971-4-380-5515",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Manara Street",
      "addressLocality": "Al Quoz",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.1459942",
      "longitude": "55.2304157"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "00:00"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "25.1459942",
        "longitude": "55.2304157"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mercedes-Benz Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mercedes-Benz Scheduled Maintenance",
            "description": "Service A & B maintenance following official Mercedes-Benz schedules"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Mercedes-Benz Diagnostics",
            "description": "Professional XENTRY diagnosis and computer diagnostics"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Mercedes-Benz Brake Service",
            "description": "Brake pad replacement, disc service and brake system maintenance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mercedes-Benz Air Conditioning Service", 
            "description": "A/C repair, gas refill and climate control service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mercedes-Benz Engine Service",
            "description": "Engine repair, diagnostics and maintenance services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mercedes-Benz Suspension Repair",
            "description": "Shock absorber replacement and suspension system service"
          }
        }
      ]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Mercedes-Benz Service Contracts",
        "description": "Comprehensive maintenance plans for all Mercedes-Benz models"
      }
    ],
    "brand": {
      "@type": "Brand",
      "name": "Mercedes-Benz"
    },
    "additionalType": "https://schema.org/CarRepair",
    "sameAs": [
      "https://wa.me/97143805515"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessSchema, null, 2)
      }}
    />
  );
} 