import Image from "next/image";
import { team } from "@/lib/content";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { preserveBrandWrap } from "@/lib/utils";

const DEFAULT_FOCUS = "center 12%";

export function Team() {
  return (
    <section className="relative overflow-clip border-t border-white/[0.06] py-20 md:py-28">
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="Service Team"
            title="Meet Our Service Team"
            intro="Experienced professionals dedicated to keeping your Mercedes-Benz in perfect condition."
          />
        </div>

        {/* Phones: edge-to-edge snap scroller. md+: 3-up grid.
            `reveal` sits on the outer wrapper (not inside the scroller) so the
            scroll-driven timeline resolves against the viewport, not the
            horizontal scroll container. */}
        <div className="reveal scroll-x -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {team.map((m) => {
            const focus = m.imageFocus ?? DEFAULT_FOCUS;
            return (
              <article
                key={m.name}
                className="ring-chrome group relative w-[78vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 md:w-auto md:max-w-none"
              >
                <div className="absolute inset-x-4 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent opacity-70" />

                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 78vw"
                    className="object-cover grayscale-[0.15] transition duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    style={{ objectPosition: focus }}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink-950)] via-[color:var(--color-ink-950)]/35 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    <h3 className="text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                      {m.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="silver-bar shrink-0" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-silver-shine">
                        {m.role}
                      </p>
                    </div>
                    <p className="mt-2.5 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-silver-400)]">
                      {preserveBrandWrap(m.cert)}
                    </p>
                    <p className="mt-2 line-clamp-3 text-[12.5px] leading-snug text-[color:var(--color-silver-200)]">
                      {preserveBrandWrap(m.bio)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
