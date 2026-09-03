import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn, preserveBrandWrap } from "@/lib/utils";

export function Services({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative border-t border-white/[0.06] py-20 md:py-28",
        className
      )}
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

        {/* 10 services → 2 columns on phones/tablets, 5 on desktop: no orphans */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 lg:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="reveal surface group relative block overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full md:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={service.hero}
                  alt={service.shortTitle}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover grayscale-[0.3] transition duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink-950)] via-[color:var(--color-ink-950)]/45 to-transparent" />

                <span className="silver-tick absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition duration-300 group-hover:rotate-45 group-hover:scale-110 sm:right-4 sm:top-4">
                  <ArrowUpRight size={14} />
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                  <h3 className="text-[0.9375rem] font-semibold leading-snug tracking-tight text-white sm:text-base">
                    {preserveBrandWrap(service.shortTitle)}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[0.71875rem] leading-relaxed text-[color:var(--color-silver-300)] sm:text-xs">
                    {preserveBrandWrap(service.blurb)}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="silver-bar transition-all duration-300 group-hover:w-10" />
                    <span className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-silver-shine">
                      Learn More
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
