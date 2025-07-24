import React from 'react';

interface ReviewSchemaProps {
  reviews?: Array<{
    author: string;
    rating: number;
    reviewText: string;
    datePublished: string;
  }>;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

export default function ReviewSchema({ reviews = [], aggregateRating }: ReviewSchemaProps) {
  // If no reviews provided, return null (component won't render)
  if (reviews.length === 0 && !aggregateRating) {
    return null;
  }

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveServiceCenter",
    "name": "SilberArrows",
    "url": "https://silberarrows.ae",
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": aggregateRating.bestRating || 5,
        "worstRating": aggregateRating.worstRating || 1
      }
    }),
    ...(reviews.length > 0 && {
      "review": reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5",
          "worstRating": "1"
        },
        "reviewBody": review.reviewText,
        "datePublished": review.datePublished,
        "publisher": {
          "@type": "Organization",
          "name": "SilberArrows"
        }
      }))
    })
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

// Example usage (for future reference):
// <ReviewSchema 
//   aggregateRating={{
//     ratingValue: 4.8,
//     reviewCount: 47,
//     bestRating: 5,
//     worstRating: 1
//   }}
//   reviews={[
//     {
//       author: "Ahmed Al Rashid",
//       rating: 5,
//       reviewText: "Excellent Mercedes service! Professional team and genuine parts used.",
//       datePublished: "2024-01-15"
//     },
//     {
//       author: "Sarah Mohammed", 
//       rating: 5,
//       reviewText: "Best independent Mercedes service in Dubai. Highly recommended!",
//       datePublished: "2024-01-10"
//     }
//   ]}
// /> 