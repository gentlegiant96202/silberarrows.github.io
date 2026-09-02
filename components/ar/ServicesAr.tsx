import Image from "next/image";
import { servicesAr } from "@/lib/content-ar";
import { SectionHeaderAr } from "@/components/ar/SectionHeaderAr";

/**
 * Arabic services grid. Cards are intentionally not links: the English
 * service pages would break the Arabic experience, and a paid landing page
 * should keep the visitor moving toward the contact CTA.
 */
export function ServicesAr() {
  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div className="container-page">
        <div className="reveal">
          <SectionHeaderAr
            eyebrow={servicesAr.eyebrow}
            title={servicesAr.title}
            intro={servicesAr.intro}
          />
        </div>

        {/* 8 services → 2 columns on phones, 4 on desktop: no orphans */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 lg:grid-cols-4">
          {servicesAr.items.map((service) => (
            <div
              key={service.title}
              className="reveal surface group relative block overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full md:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover grayscale-[0.3] transition duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink-950)] via-[color:var(--color-ink-950)]/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                  <h3 className="text-[15px] font-semibold leading-snug text-white sm:text-base">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-[color:var(--color-silver-300)] sm:text-xs">
                    {service.blurb}
                  </p>
                  <span className="silver-bar mt-3 block transition-all duration-300 group-hover:w-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
