import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { services } from "@/lib/services";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/services`;

export const metadata: Metadata = {
  title: "Mercedes-Benz Services Dubai | SilberArrows Al Quoz",
  description:
    "Complete Mercedes-Benz services in Dubai: maintenance, diagnostics, brakes, A/C, engine & suspension. Expert specialists at Al Quoz.",
  keywords:
    "Mercedes-Benz services Dubai, Mercedes maintenance Dubai, Mercedes diagnostics, Mercedes brake service Dubai, Mercedes A/C repair, engine service Al Quoz, suspension repair",
  alternates: { canonical },
  openGraph: {
    title: "Mercedes-Benz Services Dubai | SilberArrows Al Quoz",
    description:
      "Complete Mercedes-Benz services in Dubai - maintenance, diagnostics, repairs by expert specialists.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <PageHero
        title="Mercedes-Benz Services in Dubai"
        intro="Complete service and repair across all Mercedes-Benz models. Genuine parts, factory-trained technicians, XENTRY diagnostics."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Services className="pt-0 md:pt-0 border-t-0" />
      <Contact />
      <nav aria-label="All Mercedes-Benz Services" className="sr-only">
        <ul>
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>{s.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
