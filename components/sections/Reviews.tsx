import { ArrowUpRight, Quote, Star } from "lucide-react";
import { reviews, relativeWhen } from "@/lib/reviews";
import { site } from "@/lib/site";
import { preserveBrandWrap } from "@/lib/utils";

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5`}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-[color:var(--color-platinum)] text-[color:var(--color-platinum)]"
              : "fill-white/10 text-white/10"
          }
        />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-28 border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="reviews-title"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ── Editorial column (sticky on desktop) ─────────────────────── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3">
              <span className="silver-bar" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-silver-shine">
                Customer Reviews
              </p>
            </div>
            <h2
              id="reviews-title"
              className="text-display mt-5 text-[2.25rem] font-semibold text-silver-shine sm:text-5xl lg:text-[2.5rem] xl:text-[3rem]"
            >
              {preserveBrandWrap("Loved by Mercedes-Benz Owners in Dubai")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg">
              {preserveBrandWrap(
                "Real feedback from drivers who trust us with their Mercedes-Benz."
              )}
            </p>

            {/* Aggregate rating — oversized numeral */}
            <div className="mt-8 flex items-end gap-5 border-t border-white/10 pt-6">
              <span className="text-[4.5rem] font-semibold leading-[0.85] tracking-[-0.05em] text-silver-shine sm:text-[5.5rem]">
                {site.reviews.rating}
              </span>
              <span className="flex flex-col gap-1.5 pb-1.5">
                <Stars rating={5} size={16} />
                <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-400)]">
                  {site.reviews.count} Google reviews
                </span>
              </span>
            </div>

            <a
              href={site.reviews.url}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Read all reviews on Google
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* ── Masonry of review cards ──────────────────────────────────── */}
        <div className="columns-1 gap-4 md:columns-2 lg:col-span-8">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="reveal surface relative mb-4 break-inside-avoid overflow-hidden rounded-2xl p-6 md:p-7"
            >
              <Quote
                aria-hidden
                size={56}
                strokeWidth={1}
                className="pointer-events-none absolute -right-2 -top-2 text-white/[0.06]"
              />
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-silver-200)]">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <span className="chrome-badge inline-flex h-9 w-9 items-center justify-center rounded-full text-xs">
                  {r.name.charAt(0)}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-white">
                    {r.name}
                  </span>
                  <span className="text-[11px] text-[color:var(--color-silver-500)]">
                    Google review · {relativeWhen(r.daysAgo)}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
