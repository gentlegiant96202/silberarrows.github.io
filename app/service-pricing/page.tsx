import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PricingTable } from "@/components/PricingTable";
import { pricing } from "@/lib/content";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/service-pricing`;

export const metadata: Metadata = {
  title: "Mercedes-Benz Service Pricing Dubai | SilberArrows",
  description:
    "Transparent Mercedes-Benz service pricing in Dubai. Minor and Major service packages for all models. AED 375/hour labour rate.",
  keywords:
    "Mercedes service pricing Dubai, Mercedes service cost, Mercedes minor service price, Mercedes major service cost, Mercedes maintenance pricing Dubai",
  alternates: { canonical },
  openGraph: {
    title: "Mercedes-Benz Service Pricing Dubai | SilberArrows",
    description:
      "Transparent Mercedes-Benz service pricing in Dubai. Competitive rates for all models.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function ServicePricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Service Pricing", href: "/service-pricing" },
        ]}
      />
      <PageHero
        title="Service Pricing"
        intro={pricing.intro}
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[{ label: "Home", href: "/" }, { label: "Service Pricing" }]}
      />

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-400)]">
              Book Your Service
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-silver-shine">
              Transparent, all-inclusive pricing
            </h2>
            <p className="mt-4 text-base text-[color:var(--color-silver-400)]">
              Our service pricing is packaged to include parts and labour.
            </p>
          </div>

          <PricingTable className="mt-12" rows={pricing.rows} striped />

          <div className="mt-10">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-silver-300)]">
              Mercedes EQ
            </h3>
            <PricingTable className="mt-4" rows={pricing.eq} />
          </div>

          <ul className="mt-10 space-y-2 text-xs text-[color:var(--color-silver-500)]">
            {pricing.notes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[color:var(--color-silver-700)]">
                  &middot;
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl glass-card ring-silver p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-silver-shine">
              Ready to Book?
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-silver-400)] max-w-xl mx-auto">
              Speak directly with a service advisor for an exact quote tailored
              to your model.
            </p>
            <div className="mt-7 flex justify-center">
              <CTAButton label="Call or WhatsApp Us" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
