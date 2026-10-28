import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, MapPin, Plus } from "lucide-react";
import { HeroActions } from "@/components/sections/HeroActions";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { BrandText } from "@/components/BrandText";
import { CTAButton } from "@/components/CTAButton";
import { PpiReel } from "@/components/ppi/PpiReel";
import {
  ppiClosing,
  ppiCoverage,
  ppiFaqs,
  ppiFindings,
  ppiImports,
  ppiIntro,
  ppiPricing,
  ppiReel,
  ppiRta,
  ppiSteps,
  ppiWhy,
  ppiWhyUs,
} from "@/lib/pre-purchase-inspection";
import type { team } from "@/lib/content";
import { cn, preserveBrandWrap } from "@/lib/utils";

type TeamMember = (typeof team)[number];

const EYEBROW =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-shine";
const BODY =
  "text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-[1.0625rem]";
const LINK =
  "text-white underline underline-offset-4 transition hover:text-[color:var(--color-platinum)]";

const tierTone = {
  immediate: "bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.7)]",
  upcoming: "bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.6)]",
  monitor: "silver-dot",
} as const;

function Price({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-silver-500)]">
        {preserveBrandWrap(label)}
      </p>
      <p className="mt-1.5 text-sm leading-snug text-cream md:text-[0.9375rem]">
        {preserveBrandWrap(value)}
      </p>
    </div>
  );
}

function RelatedReading({ href, label }: { href: string; label: string }) {
  return (
    <p className="mt-6 text-sm text-[color:var(--color-silver-400)]">
      Related reading:{" "}
      <Link href={href} className={LINK}>
        {label}
      </Link>
    </p>
  );
}

function Tick() {
  return (
    <span className="silver-tick mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
      <Check size={12} strokeWidth={2.5} />
    </span>
  );
}

export function PrePurchaseInspection({
  heading,
  reviewer,
}: {
  heading: string;
  reviewer: TeamMember;
}) {
  const cta = preserveBrandWrap(ppiIntro.cta);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-clip border-b border-white/[0.06]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/images/pre-purchase-inspection.webp"
            alt=""
            fill
            priority
            quality={60}
            sizes="100vw"
            className="object-cover object-[50%_30%] opacity-40"
          />
          <div className="hero-scrim absolute inset-0" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-ink-950)] to-transparent" />
        </div>

        <div className="container-page grid gap-12 pt-8 pb-14 md:pt-14 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24">
          <div className="min-w-0 lg:col-span-7">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1.5 text-xs text-[color:var(--color-silver-500)]"
            >
              <Link href="/" className="uppercase tracking-[0.16em] transition hover:text-white">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link
                href="/services"
                className="uppercase tracking-[0.16em] transition hover:text-white"
              >
                Services
              </Link>
              <ChevronRight size={12} />
              <span className="uppercase tracking-[0.16em] text-[color:var(--color-silver-300)]">
                {preserveBrandWrap("Pre-Purchase Inspections")}
              </span>
            </nav>

            <h1 className="text-display anim-rise text-[2.5rem] font-normal leading-[1.06] text-cream sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              <BrandText text={heading} />
            </h1>
            <p className="anim-rise mt-5 font-display text-xl text-silver-shine md:text-2xl">
              <BrandText text={ppiIntro.tagline} />
            </p>

            <div className="anim-rise mt-6 max-w-2xl space-y-4">
              {ppiIntro.paragraphs.map((p) => (
                <p key={p} className="text-base leading-relaxed text-cream/85 md:text-[1.0625rem]">
                  {preserveBrandWrap(p)}
                </p>
              ))}
            </div>

            <div className="anim-rise mt-8 grid max-w-2xl gap-5 border-y border-white/10 py-5 sm:grid-cols-[auto_1fr] sm:gap-8">
              <div className="min-w-0">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-silver-500)]">
                  {ppiIntro.price.label}
                </p>
                <p className="mt-1.5 font-display text-2xl leading-tight text-cream md:text-3xl">
                  {ppiIntro.price.value}
                </p>
              </div>
              <div className="min-w-0 sm:border-l sm:border-white/10 sm:pl-8">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-silver-500)]">
                  {ppiIntro.credit.label}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-cream/90 md:text-[0.9375rem]">
                  <span className="font-bold text-whatsapp">AED 500</span>
                  {ppiIntro.credit.value.replace(/^AED 500/, "")}
                </p>
              </div>
            </div>

            <HeroActions label={cta} />
          </div>

          <div className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:col-span-5 lg:mr-0 lg:max-w-[24rem]">
            <PpiReel
              src={ppiReel.src}
              poster={ppiReel.poster}
              label="SilberArrows Mercedes-Benz Pre-Purchase Inspection: mechanical and electrical checks, bodywork, odometer, tyres and brakes, underbody, interior, road test and the Technical Inspection Report."
            />
          </div>
        </div>
      </section>

      {/* ── Why it matters ─────────────────────────────────────────────── */}
      <section className="section-band border-t-0 py-20 md:py-28" aria-labelledby="ppi-why">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 id="ppi-why" className="text-display text-title font-normal text-cream">
                <BrandText text={ppiWhy.title} />
              </h2>
            </div>
          </div>
          <div className="reveal space-y-6 lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-10">
            {ppiWhy.paragraphs.map((p, i) => (
              <p
                key={p}
                className={cn(
                  BODY,
                  i === 0 && "text-lg text-cream/90 md:text-xl md:leading-relaxed"
                )}
              >
                {preserveBrandWrap(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What the inspection covers ─────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-covers">
        <div className="container-page">
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:gap-10">
            <h2
              id="ppi-covers"
              className="text-display text-title font-normal text-cream lg:col-span-5"
            >
              <BrandText text={ppiCoverage.title} />
            </h2>
            <div className="space-y-4 lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-10">
              {ppiCoverage.paragraphs.map((p) => (
                <p key={p} className={BODY}>
                  {preserveBrandWrap(p)}
                </p>
              ))}
            </div>
          </div>

          <nav
            aria-label="Inspection areas"
            className="reveal mt-10 flex flex-wrap gap-2 md:mt-12"
          >
            {ppiCoverage.areas.map((area, i) => (
              <a
                key={area.id}
                href={`#${area.id}`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-[color:var(--color-silver-300)] transition hover:border-white/25 hover:text-white"
              >
                <span className="tabular-nums text-[color:var(--color-silver-500)] group-hover:text-[color:var(--color-silver-300)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {preserveBrandWrap(area.title)}
              </a>
            ))}
          </nav>

          <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
            {ppiCoverage.areas.map((area, i) => (
              <article
                key={area.id}
                id={area.id}
                aria-labelledby={`${area.id}-title`}
                className="reveal grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:items-center lg:gap-14"
              >
                <div
                  className={cn(
                    "lg:col-span-5",
                    i % 2 === 1 && "lg:order-2 lg:col-start-8"
                  )}
                >
                  <div className="ring-silver relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0a0a0a] sm:aspect-[16/10] lg:aspect-[4/5]">
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={cn(
                    "min-w-0 lg:col-span-7",
                    i % 2 === 1 && "lg:order-1 lg:col-start-1"
                  )}
                >
                  <span aria-hidden className="index-num block text-5xl md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    id={`${area.id}-title`}
                    className="text-display mt-3 text-2xl font-normal text-cream md:text-[2rem]"
                  >
                    <BrandText text={area.title} />
                  </h3>

                  {area.lead?.map((p) => (
                    <p key={p} className={cn(BODY, "mt-5")}>
                      {preserveBrandWrap(p)}
                    </p>
                  ))}

                  {area.items?.length ? (
                    <ul className="mt-6 grid gap-3">
                      {area.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/90"
                        >
                          <Tick />
                          {preserveBrandWrap(item)}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {area.notes?.map((p) => (
                    <p
                      key={p}
                      className="mt-5 text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-[0.9375rem]"
                    >
                      {preserveBrandWrap(p)}
                    </p>
                  ))}

                  {area.reading && <RelatedReading {...area.reading} />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── When problems are found ────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-findings">
        <div className="container-page">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 id="ppi-findings" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiFindings.title} />
            </h2>
            <p className={cn(BODY, "mt-5")}>{preserveBrandWrap(ppiFindings.intro)}</p>
          </div>

          <ul className="reveal mt-12 grid gap-4 md:grid-cols-3">
            {ppiFindings.tiers.map((tier) => (
              <li key={tier.label} className="surface rounded-2xl p-6 md:p-7">
                <span
                  aria-hidden
                  className={cn("block h-2.5 w-2.5 rounded-full", tierTone[tier.tone])}
                />
                <p className="mt-5 text-lg text-white">{tier.label}:</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                  {preserveBrandWrap(tier.text)}
                </p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="space-y-5 lg:col-span-6">
              {ppiFindings.paragraphs.map((p) => (
                <p key={p} className={BODY}>
                  {preserveBrandWrap(p)}
                </p>
              ))}
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#0a0a0a] p-4 sm:p-6">
                <div className="relative aspect-[1245/743]">
                  <Image
                    src="/assets/images/ppi/report-and-credit-v2.webp"
                    alt="SilberArrows Technical Inspection Report and AED 500 repair credit card."
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PPI vs RTA test ────────────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-rta">
        <div className="container-page">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 id="ppi-rta" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiRta.title} />
            </h2>
            <p className={cn(BODY, "mt-5")}>{preserveBrandWrap(ppiRta.intro)}</p>
          </div>

          <div className="reveal mx-auto mt-12 max-w-5xl">
            <div className="hidden overflow-hidden rounded-2xl border border-white/10 md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white/[0.04]">
                    {ppiRta.headers.map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={cn(
                          "px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em]",
                          i === 1 ? "text-white" : "text-[color:var(--color-silver-400)]"
                        )}
                      >
                        {preserveBrandWrap(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ppiRta.rows.map((row) => (
                    <tr key={row.aspect} className="border-t border-white/[0.06] align-top">
                      <th
                        scope="row"
                        className="w-[18%] px-6 py-5 font-normal text-[color:var(--color-silver-400)]"
                      >
                        {row.aspect}
                      </th>
                      <td className="w-[41%] bg-white/[0.025] px-6 py-5 leading-relaxed text-white">
                        {preserveBrandWrap(row.ppi)}
                      </td>
                      <td className="w-[41%] px-6 py-5 leading-relaxed text-[color:var(--color-silver-300)]">
                        {row.rta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="grid gap-3 md:hidden">
              {ppiRta.rows.map((row) => (
                <div key={row.aspect} className="surface rounded-2xl p-5">
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-silver-400)]">
                    {row.aspect}
                  </dt>
                  <dd className="mt-3">
                    <p className="text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                      {preserveBrandWrap(ppiRta.headers[1])}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white">
                      {preserveBrandWrap(row.ppi)}
                    </p>
                    <p className="mt-4 text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                      {ppiRta.headers[2]}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                      {row.rta}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {ppiRta.notes.map((p) => (
                <p
                  key={p}
                  className="text-sm leading-relaxed text-[color:var(--color-silver-400)]"
                >
                  {preserveBrandWrap(p)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GCC and imported vehicles ──────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-imports">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <h2 id="ppi-imports" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiImports.title} />
            </h2>
          </div>
          <div className="reveal space-y-5 lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-10">
            {ppiImports.paragraphs.map((p) => (
              <p key={p} className={BODY}>
                {preserveBrandWrap(p)}
              </p>
            ))}
            <RelatedReading {...ppiImports.reading} />
          </div>
        </div>
      </section>

      {/* ── How to arrange ─────────────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-steps">
        <div className="container-page">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 id="ppi-steps" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiSteps.title} />
            </h2>
          </div>

          <ol className="reveal mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ppiSteps.steps.map((step, i) => (
              <li key={step.lead} className="surface flex flex-col rounded-2xl p-6">
                <span className="chrome-badge inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                  <strong className="block pb-1 text-base font-semibold text-white">
                    {step.lead}
                  </strong>
                  {preserveBrandWrap(step.text)}
                </p>
              </li>
            ))}
          </ol>

          <div className="reveal mx-auto mt-6 flex max-w-6xl items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <span className="silver-tick inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
              <MapPin size={16} />
            </span>
            <p className="text-sm leading-relaxed text-[color:var(--color-silver-300)] md:text-[0.9375rem]">
              {preserveBrandWrap(ppiSteps.location)}
            </p>
          </div>
        </div>
      </section>

      {/* ── Price and repair credit ────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-price">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="reveal lg:col-span-6">
            <h2 id="ppi-price" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiPricing.title} />
            </h2>
            <div className="mt-6 space-y-4">
              {ppiPricing.paragraphs.map((p) => (
                <p key={p} className={BODY}>
                  {preserveBrandWrap(p)}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal lg:col-span-6">
            <div className="ring-chrome relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-7 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(212,212,216,0.22), transparent 65%)",
                }}
              />
              <p className={EYEBROW}>{preserveBrandWrap(ppiClosing.price.label)}</p>
              <p className="mt-4 flex items-baseline gap-3 font-display text-cream">
                <span className="text-6xl leading-none tracking-[-0.03em] md:text-7xl">
                  AED 1,500
                </span>
                <span className="text-base text-[color:var(--color-silver-400)]">plus VAT</span>
              </p>
              <div className="mt-8 flex items-start gap-4 border-t border-white/10 pt-6">
                <span className="font-display text-3xl leading-none text-whatsapp md:text-4xl">
                  AED 500
                </span>
                <p className="text-sm leading-snug text-[color:var(--color-silver-300)]">
                  {ppiClosing.credit.label}
                </p>
              </div>
              <div className="mt-8">
                <CTAButton label={cta} className="w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why SilberArrows ───────────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-why-us">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <h2 id="ppi-why-us" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiWhyUs.title} />
            </h2>
            <p className={cn(BODY, "mt-5")}>{preserveBrandWrap(ppiWhyUs.intro)}</p>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image
                  src={reviewer.image}
                  alt={reviewer.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                  style={{ objectPosition: reviewer.imageFocus ?? "center 25%" }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                  Reviewed by
                </p>
                <p className="truncate text-sm text-white">
                  {reviewer.name}
                  <span className="ml-1.5 text-[color:var(--color-silver-400)]">
                    &middot; {reviewer.role}
                  </span>
                </p>
                <p className="text-[10px] text-[color:var(--color-silver-500)]">{reviewer.cert}</p>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-10">
            <ul className="grid gap-3 sm:grid-cols-2">
              {ppiWhyUs.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/90"
                >
                  <Tick />
                  {preserveBrandWrap(item)}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-[0.9375rem]">
              {preserveBrandWrap(ppiWhyUs.note)}
            </p>
          </div>
        </div>
      </section>

      <Reviews />

      {/* ── FAQs ───────────────────────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-faqs">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 id="ppi-faqs" className="text-display text-title font-normal text-cream">
                Frequently asked questions
              </h2>
            </div>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            {ppiFaqs.map((faq, i) => (
              <details key={faq.question} className="group py-5 md:py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-4">
                    <span aria-hidden className="index-num mt-0.5 hidden text-lg sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-normal leading-snug text-white transition-colors group-hover:text-[color:var(--color-platinum)] md:text-lg">
                      {preserveBrandWrap(faq.question)}
                    </span>
                  </span>
                  <span className="silver-tick mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition duration-300 group-open:rotate-45">
                    <Plus size={14} strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-[color:var(--color-silver-300)] sm:pl-12 md:text-[0.9375rem]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section
        className="section-band relative isolate overflow-clip py-24 md:py-32"
        aria-labelledby="ppi-book"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/images/ppi/studio-wide.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_60%] opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.95)_75%)]" />
        </div>
        <div className="container-page">
          <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 id="ppi-book" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiClosing.title} />
            </h2>
            <p className={cn(BODY, "mt-5")}>{preserveBrandWrap(ppiClosing.text)}</p>
            <div className="mt-8 grid w-full gap-5 border-y border-white/10 py-5 text-left sm:grid-cols-2 sm:gap-8">
              <Price label={ppiClosing.price.label} value={ppiClosing.price.value} />
              <Price
                label={ppiClosing.credit.label}
                value={ppiClosing.credit.value}
                className="sm:border-l sm:border-white/10 sm:pl-8"
              />
            </div>
            <div className="flex justify-center">
              <HeroActions label={cta} />
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
