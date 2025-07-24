import React from 'react';

export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SilberArrows",
    "alternateName": "SilberArrows Mercedes-Benz Service",
    "description": "Independent Mercedes-Benz service center in Dubai specializing in expert maintenance, repair, and diagnostics since 2011.",
    "url": "https://mercedes-benz.silberarrows.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mercedes-benz.silberarrows.com/assets/icons/logo.svg",
      "width": "200",
      "height": "60"
    },
    "image": "https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp",
    "telephone": "+971-4-380-5515",
    "email": "info@silberarrows.ae",
    "address": {
      "@type": "PostalAddress", 
      "streetAddress": "Al Manara Street",
      "addressLocality": "Al Quoz",
      "addressRegion": "Dubai",
      "postalCode": "",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.1459942",
      "longitude": "55.2304157"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+971-4-380-5515",
        "contactType": "customer service",
        "availableLanguage": ["English", "Arabic"],
        "hoursAvailable": {
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
        }
      },
      {
        "@type": "ContactPoint",
        "url": "https://wa.me/97143805515",
        "contactType": "customer service",
        "availableLanguage": ["English", "Arabic"]
      }
    ],
    "foundingDate": "2011",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "10"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "25.1459942",
        "longitude": "55.2304157"
      },
      "geoRadius": "50000"
    },
    "knowsAbout": [
      "Mercedes-Benz Maintenance",
      "Mercedes-Benz Repair", 
      "Mercedes-Benz Diagnostics",
      "XENTRY Diagnosis",
      "Mercedes-Benz Service",
      "Automotive Service"
    ],
    "sameAs": [
      "https://wa.me/97143805515"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema, null, 2)
      }}
    />
  );
} 