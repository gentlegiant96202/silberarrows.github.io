import type { Metadata } from "next";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Contact } from "@/components/sections/Contact";
import { CTAButton } from "@/components/CTAButton";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";
import type { FAQ } from "@/lib/services";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import { preserveBrandWrap } from "@/lib/utils";

const canonical = `${site.url}/services`;

const title = "Mercedes Repair Dubai | Independent Specialist | SilberArrows";
const description =
  "Mercedes-Benz repair in Dubai by independent specialists in Al Quoz: XENTRY diagnostics, genuine parts, AED 395/hr labour and a 12-month parts & labour warranty.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "Mercedes repair Dubai, Mercedes-Benz repair Dubai, Mercedes repair center Dubai, Mercedes garage Dubai, independent Mercedes specialist Dubai, Mercedes repair Al Quoz",
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    images: [defaultOgImage],
  },
};

const repairAreas: { href: string; name: string; detail: string }[] = [
  {
    href: "/services/engine-repair",
    name: "Mercedes-Benz engine repair",
    detail:
      "Oil leaks, timing chains and tensioners, head gaskets, turbochargers and full rebuilds.",
  },
  {
    href: "/services/suspension-repair",
    name: "Mercedes-Benz suspension & AIRMATIC repair",
    detail:
      "Air struts, compressors, valve blocks, ABC systems, shocks, control arms and steering racks.",
  },
  {
    href: "/services/diagnostics",
    name: "Mercedes-Benz electrical diagnostics",
    detail:
      "Warning lights, ECU and control-module faults, sensors, wiring, coding and software updates.",
  },
  {
    href: "/services/brake-service",
    name: "Mercedes-Benz brake repair",
    detail:
      "Pads, discs, callipers, fluid and electronic brake systems, including AMG brake packages.",
  },
  {
    href: "/services/air-conditioning",
    name: "Mercedes-Benz AC repair",
    detail:
      "Leak detection, compressor and condenser faults, and R134a or R1234yf regas.",
  },
  {
    href: "/services/battery-service",
    name: "Mercedes-Benz battery & charging faults",
    detail:
      "Battery replacement with ECU registration, plus alternator and charging-system checks.",
  },
];

const repairSteps: { name: string; detail: string }[] = [
  {
    name: "Free collection & delivery",
    detail:
      "We collect your car from home or work anywhere in Dubai and deliver it back when the repair is done, at no charge. You can also drop it at our Al Quoz workshop.",
  },
  {
    name: "XENTRY diagnosis",
    detail:
      "Technicians read every control unit on XENTRY, the official Mercedes-Benz diagnostic platform, then confirm the fault with guided tests rather than guessing from a code.",
  },
  {
    name: "Clear quote",
    detail:
      "We explain what we found and quote the repair at our published AED 395/hour labour rate before any work begins.",
  },
  {
    name: "Repair with genuine parts",
    detail:
      "Factory-trained technicians repair the car to Mercedes-Benz procedures using genuine parts and approved fluids.",
  },
  {
    name: "Test & handover",
    detail:
      "A road test and final XENTRY check confirm the fix, then we return the car with a technician report.",
  },
];

const reasons: string[] = [
  "Mercedes-Benz only, every day, since 2011",
  "XENTRY diagnostics, the official Mercedes-Benz platform",
  "Genuine Mercedes-Benz parts and approved fluids",
  "Published labour rate of AED 395/hour",
  "12-month warranty on parts and labour",
  "Free collection and delivery across Dubai",
];

const modelGroups: string[] = [
  "A-Class, C-Class, CLA & CLE",
  "E-Class & CLS",
  "S-Class & Maybach",
  "GLA, GLB, GLC & GLK",
  "GLE, ML, GLS & GL",
  "G-Class",
  "SL, SLK & SLC",
  "AMG GT & SLS",
  "V-Class",
  "Mercedes-EQ electric models",
  "SLR McLaren",
  "Classic Mercedes-Benz",
];

const repairFaqs: FAQ[] = [
  {
    question: "How much does Mercedes-Benz repair cost in Dubai?",
    answer:
      "Labour is charged at a published rate of AED 395 per hour (Classic, Maybach and SLR McLaren work is quoted separately), plus genuine parts. Because every fault is different, we diagnose the car on XENTRY first and quote the repair before any work begins. Prices exclude VAT.",
  },
  {
    question: "Which Mercedes-Benz models do you repair?",
    answer:
      "The full Mercedes-Benz passenger range: everyday models from the A-Class to the S-Class, SUVs from the GLA to the G-Class, AMG, Maybach, Mercedes-EQ electric models, classic Mercedes-Benz and the SLR McLaren.",
  },
  {
    question: "Do you use genuine Mercedes-Benz parts for repairs?",
    answer:
      "Yes. Repairs use genuine Mercedes-Benz parts and approved fluids, fitted to Mercedes-Benz repair procedures by factory-trained technicians.",
  },
  {
    question: "Is there a warranty on repair work?",
    answer:
      "Yes. All repair, servicing and maintenance work is covered by a 12-month warranty on parts and labour. Terms and conditions apply.",
  },
  {
    question: "Can you collect my car for repair?",
    answer:
      "Yes. We offer complimentary collection and delivery across Dubai, so you don't need to bring the car to Al Quoz yourself.",
  },
  {
    question: "How do you find the cause of a fault?",
    answer:
      "We start with a full XENTRY scan of every control unit, then follow Mercedes-Benz guided test procedures to confirm the faulty component before recommending a repair, so you only pay to fix what is actually wrong.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <FAQSchema items={repairFaqs} />
      <PageHero
        title="Mercedes-Benz Repair in Dubai"
        intro={`Independent Mercedes-Benz repair specialists in Al Quoz since ${site.established}. Every fault diagnosed on XENTRY, fixed with genuine parts and covered by a 12-month parts and labour warranty.`}
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="pb-16 md:pb-24" aria-labelledby="repair-areas">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-shine">
              What We Repair
            </p>
            <h2
              id="repair-areas"
              className="text-display text-title mt-5 font-normal text-cream"
            >
              {preserveBrandWrap("Mercedes-Benz repairs, diagnosed properly")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--color-silver-300)]">
              {preserveBrandWrap(
                `From a warning light to a full engine rebuild, our Al Quoz workshop repairs Mercedes-Benz cars and nothing else. That focus means our technicians see the same faults again and again across every model, and fix them right the first time. Rated ${site.reviews.rating} from ${site.reviews.count} Google reviews.`
              )}
            </p>
            <div className="mt-7">
              <CTAButton label="Get a Free Quote" />
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {repairAreas.map((area) => (
              <li key={area.href}>
                <Link
                  href={area.href}
                  className="group block h-full rounded-2xl glass-card ring-silver p-6 transition hover:bg-white/[0.04]"
                >
                  <h3 className="text-base font-semibold text-white">
                    {preserveBrandWrap(area.name)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-silver-400)]">
                    {area.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-band py-20 md:py-28" aria-labelledby="repair-process">
        <div className="container-page">
          <SectionHeader
            eyebrow="How It Works"
            title="How a Mercedes-Benz repair works with us"
            intro="One process for every repair, from a sensor fault to an engine overhaul."
          />
          <ol className="mx-auto mt-12 grid max-w-4xl gap-3">
            {repairSteps.map((step, i) => (
              <li
                key={step.name}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="chrome-badge inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{step.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                    {preserveBrandWrap(step.detail)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band py-20 md:py-28" aria-labelledby="why-independent">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-2xl glass-card ring-silver p-7 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
              Why SilberArrows
            </p>
            <h2
              id="why-independent"
              className="text-display text-title mt-3 font-normal text-cream"
            >
              {preserveBrandWrap("An independent Mercedes-Benz repair centre")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-silver-400)]">
              {preserveBrandWrap(
                "Dealer-level diagnostics and genuine parts, with a published labour rate and a more personal service. See our "
              )}
              <Link href="/service-pricing" className="text-white underline underline-offset-4 hover:text-[color:var(--color-platinum)]">
                Mercedes-Benz service pricing
              </Link>
              .
            </p>
            <ul className="mt-6 grid gap-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="silver-tick mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  {preserveBrandWrap(r)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl glass-card ring-silver p-7 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
              Models We Repair
            </p>
            <h2 className="text-display text-title mt-3 font-normal text-cream">
              {preserveBrandWrap("Every Mercedes-Benz, from A-Class to SLR")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-silver-400)]">
              {preserveBrandWrap(
                "Current, older and classic Mercedes-Benz passenger cars, including AMG and Mercedes-EQ."
              )}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {modelGroups.map((m) => (
                <li
                  key={m}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[color:var(--color-silver-200)]"
                >
                  {preserveBrandWrap(m)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Services />

      <section className="section-band py-20 md:py-28" aria-labelledby="repair-faqs">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-400)]">
              Frequently Asked Questions
            </p>
            <h2
              id="repair-faqs"
              className="text-display text-title mt-3 font-normal text-cream"
            >
              {preserveBrandWrap("Mercedes-Benz Repair Dubai FAQs")}
            </h2>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {repairFaqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="text-base font-normal leading-snug text-white md:text-lg">
                      {faq.question}
                    </span>
                    <span className="silver-tick mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition duration-300 group-open:rotate-45">
                      <Plus size={14} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-silver-300)] md:text-[0.9375rem]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
