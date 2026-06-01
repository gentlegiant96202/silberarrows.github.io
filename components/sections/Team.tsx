import Image from "next/image";
import { team } from "@/lib/content";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn, preserveBrandWrap } from "@/lib/utils";

const DEFAULT_FOCUS = "center 12%";

export function Team() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="container-page">
        <SectionHeader
          eyebrow="Service Team"
          title="Meet Our Service Team"
          intro="Experienced professionals dedicated to keeping your Mercedes-Benz in perfect condition."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
          {team.map((m, i) => {
            const focus = m.imageFocus ?? DEFAULT_FOCUS;
            // With an odd number of members the final card would orphan in the
            // 2-col mobile layout — span it and centre it to fill the gap.
            const orphan = team.length % 2 === 1 && i === team.length - 1;
            return (
              <div
                key={m.name}
                className={cn(
                  "group relative block overflow-hidden rounded-2xl ring-chrome silver-glow transition hover:-translate-y-0.5",
                  orphan &&
                    "col-span-2 mx-auto w-[calc(50%-0.375rem)] md:col-span-1 md:mx-0 md:w-auto"
                )}
              >
                <div className="absolute inset-x-4 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent opacity-70" />

                {/* ~10% shorter than 3/4 portrait; per-member objectPosition fixes framing */}
                <div className="relative aspect-[5/6] w-full min-h-[280px] sm:min-h-[300px] md:min-h-[330px] lg:min-h-[350px]">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04] grayscale-[0.12] group-hover:grayscale-0"
                    style={{ objectPosition: focus }}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

                  <div className="absolute inset-x-3 bottom-3 z-10 sm:inset-x-4 sm:bottom-4">
                    <div className="relative overflow-hidden rounded-2xl ring-silver glass-card">
                      <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />

                      <div
                        className="pointer-events-none absolute inset-0 scale-125"
                        aria-hidden
                      >
                        <Image
                          src={m.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover blur-2xl opacity-45 saturate-150"
                          style={{ objectPosition: focus }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
                      <div className="relative z-10 p-3 text-center backdrop-blur-md sm:p-4 sm:text-left">
                        <h3 className="text-base font-semibold leading-snug text-white sm:text-[17px]">
                          {m.name}
                        </h3>

                        {/* Mobile: centred divider under the name */}
                        <span className="silver-bar mx-auto mt-2 block sm:hidden" />

                        <div className="mt-1.5 flex items-center justify-center gap-2 sm:justify-start">
                          <span className="silver-bar hidden shrink-0 sm:block" />
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-silver-shine">
                            {m.role}
                          </p>
                        </div>

                        <p className="mt-2 hidden text-[9px] uppercase tracking-[0.16em] text-[color:var(--color-silver-400)] sm:block sm:text-[10px]">
                          {preserveBrandWrap(m.cert)}
                        </p>

                        <p className="mt-1.5 hidden line-clamp-3 text-[12px] leading-snug text-[color:var(--color-silver-200)] sm:block">
                          {preserveBrandWrap(m.bio)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
