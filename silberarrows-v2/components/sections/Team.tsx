import Image from "next/image";
import { team } from "@/lib/content";
import { SectionHeader } from "@/components/sections/SectionHeader";

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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {team.map((m) => {
            const focus = m.imageFocus ?? DEFAULT_FOCUS;
            return (
              <div
                key={m.name}
                className="group relative block overflow-hidden rounded-2xl ring-chrome silver-glow transition hover:-translate-y-0.5"
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
                      <div className="relative z-10 p-3.5 backdrop-blur-md sm:p-4">
                        <div className="flex items-center gap-2">
                          <span className="silver-bar" />
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-silver-shine">
                            {m.role}
                          </p>
                        </div>

                        <h3 className="mt-1.5 text-base font-semibold leading-snug text-white sm:text-[17px]">
                          {m.name}
                        </h3>

                        <p className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-[color:var(--color-silver-400)] sm:text-[10px]">
                          {m.cert}
                        </p>

                        <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-[color:var(--color-silver-200)] sm:line-clamp-3 sm:text-[12px]">
                          {m.bio}
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
