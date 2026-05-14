import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function Services() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="container-page">
        <SectionHeader
          eyebrow="Our Services"
          title="Specialised Mercedes-Benz Solutions"
          intro="Delivered with precision, premium parts and expertise tailored to one marque."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative block overflow-hidden rounded-2xl ring-chrome silver-glow transition hover:-translate-y-0.5"
            >
              {/* chrome top hairline — matches hero image frame */}
              <div className="absolute inset-x-4 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent opacity-70" />

              <div className="relative aspect-[200/253] w-full lg:aspect-[250/253]">
                <Image
                  src={service.hero}
                  alt={service.shortTitle}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105 grayscale-[0.15] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

                <span className="silver-tick absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition group-hover:scale-110 sm:right-4 sm:top-4">
                  <ArrowUpRight size={14} />
                </span>

                {/* Glass info plate — same treatment as hero Dubai card */}
                <div className="absolute inset-x-3 bottom-3 z-10 sm:inset-x-4 sm:bottom-4">
                  <div className="relative overflow-hidden rounded-2xl glass-card ring-silver p-4 backdrop-blur-xl sm:p-5">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />

                    <h3 className="text-[13px] font-semibold leading-snug text-white sm:text-[15px]">
                      {service.shortTitle}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-[color:var(--color-silver-300)] sm:text-[12px]">
                      {service.blurb}
                    </p>

                    <div className="mt-3 flex items-center gap-2 sm:mt-4">
                      <span className="silver-bar" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-silver-shine">
                        Learn More
                      </span>
                    </div>
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
