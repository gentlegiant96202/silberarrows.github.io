import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services";
import { team } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { ServiceSchema } from "@/components/ServiceSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { ArticleSchema } from "@/components/ArticleSchema";
import { absoluteUrl, keywordsForServiceSlug } from "@/lib/seo";
import { site } from "@/lib/site";

const reviewerBySlug: Record<string, string> = {
  "scheduled-maintenance": "Glen Cable",
  "engine-repair": "Glen Cable",
  "suspension-repair": "Glen Cable",
  diagnostics: "Glen Cable",
  "brake-service": "Michael Riley",
  "battery-service": "Michael Riley",
  "air-conditioning": "Michael Riley",
  "tyre-replacement": "Michael Riley",
  "wheel-alignment": "Michael Riley",
  detailing: "Maroua Dafir",
};

function getReviewer(slug: string) {
  const name = reviewerBySlug[slug] ?? "Glen Cable";
  return team.find((m) => m.name === name) ?? team[0];
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: "Service Not Found | SilberArrows Dubai",
      description: "The requested Mercedes-Benz service was not found.",
    };
  }
  const canonical = `${site.url}/services/${slug}`;
  const shortDesc =
    service.overview.length > 80
      ? `${service.overview.slice(0, 80).trim()}...`
      : service.overview;
  return {
    title: `${service.title} | SilberArrows Dubai`,
    description: `${service.title} for Mercedes-Benz in Dubai. ${shortDesc} Expert service at Al Quoz.`,
    keywords: keywordsForServiceSlug(slug),
    alternates: { canonical },
    openGraph: {
      title: `${service.title} | SilberArrows Dubai`,
      description: `Professional ${service.title.toLowerCase()} for Mercedes-Benz vehicles in Dubai.`,
      url: canonical,
      images: [
        {
          url: absoluteUrl(service.hero),
          width: 640,
          height: 427,
          alt: `${service.title} - SilberArrows Dubai`,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 4);
  const reviewer = getReviewer(slug);
  const articleAuthor = {
    name: "SilberArrows Editorial Team",
    role: "Mercedes-Benz Service Editorial Team",
  };
  const reviewerForSchema = {
    name: reviewer.name,
    role: reviewer.role,
    cert: reviewer.cert,
    image: reviewer.image,
  };

  return (
    <>
      <ServiceSchema
        serviceName={service.title}
        serviceDescription={service.overview}
        serviceSlug={service.slug}
        image={service.hero}
      />
      <ArticleSchema
        headline={`${service.title} for Mercedes-Benz in Dubai`}
        description={service.overview}
        url={`/services/${service.slug}`}
        image={service.hero}
        author={articleAuthor}
        reviewer={reviewerForSchema}
        articleSection={service.shortTitle}
        keywords={keywordsForServiceSlug(slug)}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortTitle, href: `/services/${service.slug}` },
        ]}
      />
      {service.faqs?.length ? <FAQSchema items={service.faqs} /> : null}
      <PageHero
        title={service.title}
        intro={service.overview}
        backgroundImage={service.hero}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="rounded-2xl glass-card ring-silver p-7 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                Overview
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
                {service.title}
              </h2>
              <p className="mt-4 text-[color:var(--color-silver-400)] leading-relaxed">
                {service.overview}
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
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
                  <p className="text-sm font-medium text-white truncate">
                    {reviewer.name}
                    <span className="ml-1.5 text-[color:var(--color-silver-400)] font-normal">
                      &middot; {reviewer.role}
                    </span>
                  </p>
                  <p className="text-[10px] text-[color:var(--color-silver-500)]">
                    {reviewer.cert}
                  </p>
                </div>
              </div>

              {service.comparison ? (
                <div className="mt-10">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                    Service Comparison
                  </p>
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/[0.04] text-[color:var(--color-silver-300)]">
                          {service.comparison.headers.map((h, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-left font-semibold uppercase tracking-[0.16em] text-xs"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {service.comparison.rows.map((r, i) => (
                          <tr
                            key={i}
                            className="border-t border-white/5 hover:bg-white/[0.03]"
                          >
                            <td className="px-4 py-3 text-white/90">
                              {r.label}
                            </td>
                            {r.values.map((v, j) => (
                              <td
                                key={j}
                                className="px-4 py-3 text-center text-[color:var(--color-silver-300)]"
                              >
                                {v}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="mt-10">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                    {service.bullets.heading}
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.bullets.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/90"
                      >
                        <span className="silver-tick mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                  Our Process
                </p>
                <ol className="mt-4 grid gap-3">
                  {service.process.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <span className="chrome-badge inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-relaxed text-[color:var(--color-silver-200)]">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl glass-card ring-silver p-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                Ready to Book?
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Speak with a Mercedes-Benz specialist today.
              </h3>
              <p className="mt-3 text-sm text-[color:var(--color-silver-400)]">
                12-month warranty on parts and labour. Free collection and
                delivery across Dubai.
              </p>
              <div className="mt-5">
                <CTAButton label="Get a Free Quote" />
              </div>
            </div>

            <div className="rounded-2xl glass-card ring-silver p-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                Other Services
              </p>
              <ul className="mt-4 space-y-1.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/services/${o.slug}`}
                      className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[color:var(--color-silver-300)] hover:bg-white/[0.05] hover:text-white transition"
                    >
                      <span>{o.shortTitle}</span>
                      <ArrowRight
                        size={14}
                        className="opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {service.faqs?.length ? (
        <section className="pb-16 md:pb-24" aria-labelledby={`${service.slug}-faqs`}>
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-400)]">
                Frequently Asked Questions
              </p>
              <h2
                id={`${service.slug}-faqs`}
                className="mt-3 text-3xl md:text-4xl font-semibold text-silver-shine"
              >
                {service.shortTitle} FAQs
              </h2>
              <div className="mt-8 divide-y divide-white/10 rounded-2xl glass-card ring-silver">
                {service.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group px-6 py-5 open:bg-white/[0.02]"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-white marker:hidden list-none">
                      <span>{faq.question}</span>
                      <span className="silver-tick inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
