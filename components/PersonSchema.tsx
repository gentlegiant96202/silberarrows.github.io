import { site } from "@/lib/site";

export type Person = {
  name: string;
  role: string;
  cert?: string;
  bio?: string;
  image?: string;
};

type PersonSchemaProps = {
  people: Person[];
};

const baseUrl = site.url;

export function PersonSchema({ people }: PersonSchemaProps) {
  if (!people.length) return null;

  const schemas = people.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person-${slugify(p.name)}`,
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    image: p.image ? `${baseUrl}${p.image}` : undefined,
    worksFor: { "@id": `${baseUrl}/#business` },
    knowsAbout: [
      "Mercedes-Benz Service",
      "Mercedes-Benz Repair",
      "Mercedes-Benz Diagnostics",
      "XENTRY Diagnosis",
    ],
    hasCredential: p.cert
      ? {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Certification",
          name: p.cert,
        }
      : undefined,
  }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
