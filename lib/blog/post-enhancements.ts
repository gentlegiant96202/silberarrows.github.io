/**
 * Per-post additions for high-traffic blog posts, keyed by slug: search
 * snippet copy and a "related service" callout that links the post into the
 * money pages it supports.
 *
 * `seoTitle` / `seoDescription` take precedence over the portal's
 * `seo_title` / `seo_description`, so edits to those fields in the portal
 * are ignored for these slugs until the override here is removed.
 */

export type PostServiceLink = { href: string; label: string; sub: string };

export type PostEnhancement = {
  seoTitle?: string;
  seoDescription?: string;
  callout: {
    heading: string;
    body: string;
    links: PostServiceLink[];
  };
};

export const postEnhancements: Record<string, PostEnhancement> = {
  "mercedes-benz-service-a-costs-in-dubai-a-detailed-breakdown": {
    seoTitle: "Mercedes Service A Cost in Dubai: Prices & What's Included",
    seoDescription:
      "What Mercedes-Benz Service A includes, why dealers in Dubai often charge AED 2,000+, and why a C-Class costs AED 1,000–1,200 at a specialist.",
    callout: {
      heading: "Book your Mercedes-Benz Service A",
      body: "Service A (our Minor Service) is packaged with genuine parts, approved oil and labour, from AED 972 ex VAT. A C-Class is AED 1,188. Every service comes with a 12-month parts and labour warranty and free collection and delivery across Dubai.",
      links: [
        {
          href: "/services/scheduled-maintenance",
          label: "Mercedes-Benz Service A & B",
          sub: "What each service includes, side by side",
        },
        {
          href: "/service-pricing",
          label: "Service A & B prices by model",
          sub: "Minor and Major service prices for every model",
        },
      ],
    },
  },
  "mercedes-benz-w223-suspension-problems-in-dubai-real-repair-costs-explained": {
    seoDescription:
      "Common W223 S-Class suspension faults in Dubai, from lowering overnight to compressor failure, with typical AIRMATIC strut, compressor and valve block repair costs.",
    callout: {
      heading: "S-Class sitting low or showing a suspension warning?",
      body: "We diagnose AIRMATIC and ABC suspension faults on XENTRY to find the root cause, then repair with genuine Mercedes-Benz parts under a 12-month parts and labour warranty.",
      links: [
        {
          href: "/services/suspension-repair",
          label: "Mercedes-Benz suspension & AIRMATIC repair",
          sub: "Air struts, compressors, valve blocks and ride height faults",
        },
        {
          href: "/services/diagnostics",
          label: "Mercedes-Benz diagnostics",
          sub: "XENTRY fault finding for warning messages",
        },
      ],
    },
  },
  "understanding-mercedes-benz-brake-service-costs-in-dubai": {
    callout: {
      heading: "Book a Mercedes-Benz brake service",
      body: "Pads, discs, sensors and fluid replaced with genuine Mercedes-Benz parts, with discs measured against factory wear limits. Covered by a 12-month parts and labour warranty.",
      links: [
        {
          href: "/services/brake-service",
          label: "Mercedes-Benz brake service & repair",
          sub: "Pads, discs, fluid and AMG brake systems",
        },
        {
          href: "/services",
          label: "Mercedes-Benz repair in Dubai",
          sub: "Every repair we carry out at our Al Quoz workshop",
        },
      ],
    },
  },
  "mercedes-benz-dealership-vs-independent-specialist-which-should-you-choose": {
    callout: {
      heading: "Moving from the dealer to a specialist?",
      body: "SilberArrows services and repairs Mercedes-Benz only, with genuine parts, XENTRY diagnostics, a published AED 395/hour labour rate and free collection and delivery across Dubai.",
      links: [
        {
          href: "/services",
          label: "Mercedes-Benz repair in Dubai",
          sub: "How a repair works with us, and the models we cover",
        },
        {
          href: "/services/scheduled-maintenance",
          label: "Mercedes-Benz Service A & B",
          sub: "Factory-schedule servicing with genuine parts",
        },
      ],
    },
  },
};
