import { site } from "@/lib/site";

const baseUrl = site.url;

export type ArticleSchemaAuthor = {
  name: string;
  role?: string;
  cert?: string;
  image?: string;
};

type ArticleSchemaProps = {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author: ArticleSchemaAuthor;
  reviewer?: ArticleSchemaAuthor;
  articleSection?: string;
  keywords?: string;
};

function personRef(p: ArticleSchemaAuthor) {
  return {
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    image: p.image ? `${baseUrl}${p.image}` : undefined,
    worksFor: { "@id": `${baseUrl}/#business` },
    hasCredential: p.cert
      ? {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Certification",
          name: p.cert,
        }
      : undefined,
  };
}

export function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished = "2024-01-15T00:00:00.000Z",
  dateModified,
  author,
  reviewer,
  articleSection = "Mercedes-Benz Service",
  keywords,
}: ArticleSchemaProps) {
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${fullUrl}#article`,
    headline,
    description,
    url: fullUrl,
    image: image ? `${baseUrl}${image}` : undefined,
    datePublished,
    dateModified: dateModified ?? new Date().toISOString(),
    author: personRef(author),
    reviewedBy: reviewer ? personRef(reviewer) : undefined,
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "SilberArrows",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.svg`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    inLanguage: "en-AE",
    isAccessibleForFree: true,
    articleSection,
    keywords,
    about: { "@id": `${baseUrl}/#business` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
