import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Contracts } from "@/components/sections/Contracts";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Contact } from "@/components/sections/Contact";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { PersonSchema } from "@/components/PersonSchema";
import { services, homeFaqs } from "@/lib/services";
import { team } from "@/lib/content";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import { preserveBrandWrap } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SilberArrows | Mercedes-Benz Service Center Dubai",
  description:
    "Dubai's trusted Mercedes-Benz specialists since 2011. Expert maintenance, repair & diagnostics at Al Quoz with genuine parts.",
  keywords:
    "SilberArrows, Mercedes-Benz service Dubai, independent Mercedes specialist, Mercedes repair Al Quoz, Mercedes maintenance Dubai, Mercedes diagnostics, genuine parts Dubai",
  alternates: { canonical: site.url },
  openGraph: {
    title: "SilberArrows | Premier Mercedes-Benz Service Center Dubai",
    description:
      "Dubai's trusted independent Mercedes-Benz specialists since 2011. Expert service in Al Quoz with genuine parts.",
    url: site.url,
    images: [defaultOgImage],
  },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <FAQSchema items={homeFaqs} />
      <PersonSchema people={team} />
      <Hero />
      <Reviews />
      <WhyChooseUs />
      <Services />
      <Team />
      <Contracts />
      <LatestPosts />

      <section
        className="relative border-t border-white/[0.06] py-20 md:py-28"
        aria-labelledby="home-faqs"
      >
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Sticky editorial header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3">
                <span className="silver-bar" />
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-shine">
                  Frequently Asked Questions
                </p>
              </div>
              <h2
                id="home-faqs"
                className="text-display mt-5 text-[2.25rem] font-semibold text-silver-shine sm:text-5xl lg:text-[2.5rem] xl:text-[3rem]"
              >
                {preserveBrandWrap("Mercedes-Benz Service Dubai FAQs")}
              </h2>
            </div>
          </div>

          {/* Accordion — hairline rows */}
          <div className="reveal divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            {homeFaqs.map((faq, i) => (
              <details key={i} className="group py-5 md:py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="index-num mt-0.5 hidden text-lg sm:block"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-medium leading-snug text-white transition-colors group-hover:text-[color:var(--color-platinum)] md:text-lg">
                      {faq.question}
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

      <Contact />
      <nav
        aria-label="All Mercedes-Benz Services"
        className="sr-only"
      >
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            {s.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
