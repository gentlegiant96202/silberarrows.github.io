import { Star } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { reviews, relativeWhen } from "@/lib/reviews";
import { site } from "@/lib/site";

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
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
      className="relative scroll-mt-28 py-20 md:py-28 border-t border-white/5"
      aria-labelledby="reviews-title"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Customer Reviews"
          title="Loved by Mercedes-Benz Owners in Dubai"
          intro="Real feedback from drivers who trust us with their Mercedes-Benz."
        />

        {/* Aggregate rating badge */}
        <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-4 rounded-2xl glass-card ring-silver px-6 py-4">
          <span className="text-4xl font-semibold leading-none text-silver-shine">
            {site.reviews.rating}
          </span>
          <span className="h-10 w-px bg-white/10" aria-hidden />
          <span className="flex flex-col gap-1">
            <Stars rating={5} size={15} />
            <span className="text-xs text-[color:var(--color-silver-400)]">
              {site.reviews.count} Google reviews
            </span>
          </span>
        </div>

        {/* Review cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex h-full flex-col rounded-2xl glass-card ring-silver silver-glow p-6 transition"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--color-silver-200)]">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
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

        <div className="mt-10 text-center">
          <a
            href={site.reviews.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] underline decoration-white/20 underline-offset-4 transition hover:text-white"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
