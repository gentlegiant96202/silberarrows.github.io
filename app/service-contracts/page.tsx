import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCareCalculator } from "@/components/sections/ServiceCareCalculator";
import { WarrantyCalculator } from "@/components/sections/WarrantyCalculator";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/service-contracts`;

export const metadata: Metadata = {
  title:
    "Mercedes-Benz Service Contracts & Extended Warranty Dubai | SilberArrows",
  description:
    "Mercedes-Benz service contracts and extended warranty in Dubai. Pick your model for instant ServiceCare and warranty pricing across all models.",
  keywords:
    "Mercedes service contracts Dubai, Mercedes extended warranty Dubai, Mercedes maintenance plans, Mercedes service packages Dubai, ServiceCare, C-Class maintenance contract, E-Class service Dubai",
  alternates: { canonical },
  openGraph: {
    title:
      "Mercedes-Benz Service Contracts & Extended Warranty Dubai | SilberArrows",
    description:
      "Mercedes-Benz service contracts and extended warranty in Dubai. Pick your model for instant ServiceCare and warranty pricing.",
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
          { name: "Service Contracts & Warranty", href: "/service-contracts" },
        ]}
      />
      <PageHero
        title="Service Contracts & Extended Warranty"
        intro="Peace of mind, guaranteed. Prepaid maintenance and extended warranty cover designed to keep your Mercedes-Benz in peak condition. Choose your model to see instant pricing."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Contracts & Warranty" },
        ]}
      />
      <ServiceCareCalculator className="pt-0 md:pt-0 border-t-0" />
      <WarrantyCalculator />
      <Contact />
    </>
  );
}
