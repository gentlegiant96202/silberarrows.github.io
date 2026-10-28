import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn, preserveBrandWrap } from "@/lib/utils";

export function Services({ className }: { className?: string }) {
  return (
    <section
      className={cn("section-band py-20 md:py-28", className)}
    >
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="Our Services"
            title="Specialised Mercedes-Benz Solutions"
            intro="Delivered with precision, premium parts and expertise tailored to one marque."
          />
        </div>

        {/* 11 services, the featured one two columns wide → 12 slots: 2 columns
            on phones/tablets, 6 on desktop, no orphans. Featured aspect ratios
            are the regular ones doubled so row heights match. */}
        <div className="reveal mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 lg:grid-cols-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={cn(
                "surface group relative block overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1",
                service.featured && "col-span-2"
              )}
            >
              <div
                className={cn(
                  "relative w-full",
                  service.featured
                    ? "aspect-[8/5] md:aspect-[5/2] lg:aspect-[8/5]"
                    : "aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]"
                )}
              >
                <Image
                  src={service.card ?? service.hero}
                  alt={service.shortTitle}
                  fill
                  quality={90}
                  sizes={
                    service.featured
                      ? "(min-width: 1024px) 33vw, 100vw"
                      : "(min-width: 1024px) 17vw, 50vw"
                  }
                  className={cn(
                    "object-cover transition duration-700 ease-out group-hover:scale-[1.04]",
                    service.featured && "object-[50%_30%]"
                  )}
                />
                <div className="service-card-scrim pointer-events-none absolute inset-0" />

                {service.featured && (
                  <span className="silver-chip absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] sm:left-4 sm:top-4">
                    New
                  </span>
                )}

                <span className="silver-tick absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full sm:right-4 sm:top-4">
                  <ArrowUpRight
                    size={14}
                    className="transition duration-300 group-hover:rotate-45"
                  />
                </span>

                <div className="service-card-copy absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-2 sm:px-3.5 sm:pb-3.5">
                  <h3 className="text-[0.8125rem] font-semibold leading-tight tracking-tight text-white sm:text-sm">
                    {preserveBrandWrap(service.shortTitle)}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-[0.6875rem] leading-snug text-[color:var(--color-silver-300)]">
                    {preserveBrandWrap(service.blurb)}
                  </p>
                  <span className="mt-1.5 block text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-silver-shine">
                    Learn More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
