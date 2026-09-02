import { ArrowUpLeft, Quote, Star } from "lucide-react";
import { reviews } from "@/lib/reviews";
import { relativeWhenAr, reviewsAr, siteAr } from "@/lib/content-ar";

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} من 5`}>
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

/**
 * Same real Google reviews as the English site. The quotes are left in their
 * original English (isolated LTR) rather than translated — a translated review
 * is no longer the customer's words. The framing, rating and dates are Arabic.
 */
export function ReviewsAr() {
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
              <p className="text-[12px] font-semibold text-silver-shine">
                {reviewsAr.eyebrow}
              </p>
            </div>
            <h2
              id="reviews-title"
              className="text-display mt-5 text-[2.1rem] font-semibold text-silver-shine sm:text-5xl lg:text-[2.5rem] xl:text-[2.85rem]"
            >
              {reviewsAr.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg">
              {reviewsAr.intro}
            </p>

            {/* Aggregate rating — oversized numeral */}
            <div className="mt-8 flex items-end gap-5 border-t border-white/10 pt-6">
              <span
                dir="ltr"
                className="text-[4.5rem] font-semibold leading-[0.85] text-silver-shine sm:text-[5.5rem]"
              >
                {siteAr.reviews.rating}
              </span>
              <span className="flex flex-col gap-1.5 pb-1.5">
                <Stars rating={5} size={16} />
                <span className="text-xs text-[color:var(--color-silver-400)]">
                  {siteAr.reviews.count} {reviewsAr.countLabel}
                </span>
              </span>
            </div>

            <a
              href={siteAr.reviews.url}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold"
            >
              {reviewsAr.readAll}
              <ArrowUpLeft size={14} />
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
                className="pointer-events-none absolute -start-2 -top-2 text-white/[0.06]"
              />
              <Stars rating={r.rating} />
              <blockquote
                lang="en"
                dir="ltr"
                className="mt-4 text-start text-[15px] leading-relaxed text-[color:var(--color-silver-200)]"
              >
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <span className="chrome-badge inline-flex h-9 w-9 items-center justify-center rounded-full text-xs">
                  {r.name.charAt(0)}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-white">
                    <bdi>{r.name}</bdi>
                  </span>
                  <span className="text-[11px] text-[color:var(--color-silver-500)]">
                    {reviewsAr.googleReview} · {relativeWhenAr(r.daysAgo)}
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
