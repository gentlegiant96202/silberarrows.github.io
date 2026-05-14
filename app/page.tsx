import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Contracts } from "@/components/sections/Contracts";
import { Contact } from "@/components/sections/Contact";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { services, homeFaqs } from "@/lib/services";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

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
      <Hero />
      <WhyChooseUs />
      <Services />
      <Team />
      <Contracts />

      <section className="pb-16 md:pb-24" aria-labelledby="home-faqs">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-400)]">
              Frequently Asked Questions
            </p>
            <h2
              id="home-faqs"
              className="mt-3 text-3xl md:text-4xl font-semibold text-silver-shine"
            >
              Mercedes-Benz Service Dubai FAQs
            </h2>
            <div className="mt-8 divide-y divide-white/10 rounded-2xl glass-card ring-silver">
              {homeFaqs.map((faq, i) => (
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
