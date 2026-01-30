import React from 'react';

interface ServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceSlug: string;
  category?: string;
}

export default function ServiceSchema({ 
  serviceName, 
  serviceDescription, 
  serviceSlug,
  category = "AutomotiveService"
}: ServiceSchemaProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "url": `https://mercedes-benz.silberarrows.com/services/${serviceSlug}`,
    "category": category,
    "provider": {
      "@type": "AutomotiveServiceCenter",
      "name": "SilberArrows",
      "telephone": "+971-4-380-5515",
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
      }
    },
    "serviceType": "Mercedes-Benz Service",
    "areaServed": {
      "@type": "City",
      "name": "Dubai",
      "containedInPlace": {
        "@type": "Country",
        "name": "United Arab Emirates"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "Mercedes-Benz"
    },
    "offers": {
      "@type": "Offer",
      "name": serviceName,
      "description": serviceDescription,
      "priceCurrency": "AED",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "AED",
        "eligibleRegion": {
          "@type": "Country",
          "name": "United Arab Emirates"
        }
      },
      "seller": {
        "@type": "AutomotiveServiceCenter",
        "name": "SilberArrows",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressCountry": "AE"
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema, null, 2)
      }}
    />
  );
} 