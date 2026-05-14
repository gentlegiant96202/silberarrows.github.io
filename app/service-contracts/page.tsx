import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Contracts } from "@/components/sections/Contracts";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/service-contracts`;

export const metadata: Metadata = {
  title:
    "Mercedes-Benz Service Contracts Dubai | SilberArrows Maintenance Plans",
  description:
    "Affordable Mercedes-Benz service contracts in Dubai. Maintenance plans for all models. Save with SilberArrows packages.",
  keywords:
    "Mercedes service contracts Dubai, Mercedes maintenance plans, Mercedes service packages Dubai, A-Class service plan, C-Class maintenance contract, E-Class service Dubai",
  alternates: { canonical },
  openGraph: {
    title:
      "Mercedes-Benz Service Contracts Dubai | SilberArrows Maintenance Plans",
    description:
      "Affordable Mercedes-Benz service contracts and maintenance plans in Dubai. Save money with professional service packages.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function ServiceContractsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Service Contracts", href: "/service-contracts" },
        ]}
      />
      <PageHero
        title="Service Contracts"
        intro="Peace of mind, guaranteed. Maintenance packages designed to keep your Mercedes-Benz in peak condition."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Contracts" },
        ]}
      />
      <Contracts />
      <Contact />
    </>
  );
}
