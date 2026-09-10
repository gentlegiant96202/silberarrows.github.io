import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { BrandText } from "@/components/BrandText";
import type { Offer } from "@/lib/offers";
import { offerPath } from "@/lib/offers";
import { cn, preserveBrandWrap } from "@/lib/utils";

/**
 * Offer tile on the /offers index. The first (featured) offer spans the full
 * row as a photo + copy split behind a chrome ring; further offers fall into
 * a two-column grid of the same card at a smaller scale.
 */
export function OfferCard({
  offer,
  index,
  featured = false,
}: {
  offer: Offer;
  index: number;
  featured?: boolean;
}) {
  const image = offer.cardImage ?? offer.image;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={offerPath(offer)}
      className={cn(
        "reveal surface group relative grid overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1",
        featured ? "ring-chrome lg:grid-cols-12" : "sm:grid-cols-12"
      )}
    >
      {featured && (
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
      )}

      {/* ── Photo ─────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative overflow-hidden",
          featured
            ? "aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[28rem]"
            : "aspect-[4/3] sm:col-span-5 sm:aspect-auto sm:min-h-[16rem]"
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 640px) 30vw, 100vw"}
          className="object-cover grayscale-[0.3] transition duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink-950)]/80 via-[color:var(--color-ink-950)]/20 to-transparent lg:bg-gradient-to-r" />

        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span
            aria-hidden
            className="index-num text-4xl text-white/20 md:text-5xl"
          >
            {number}
          </span>
        </div>
        {offer.badge && (
          <span className="silver-chip absolute right-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em]">
            {offer.badge}
          </span>
        )}
      </div>

      {/* ── Copy ──────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex flex-col p-6 sm:p-8",
          featured ? "lg:col-span-7 md:p-10 lg:p-12" : "sm:col-span-7"
        )}
      >
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-shine">
          Offer {number}
        </p>
        <h2
          className={cn(
            "text-display mt-4 font-display font-normal text-silver-shine",
            featured
              ? "text-[2rem] sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
              : "text-2xl sm:text-3xl"
          )}
        >
          <BrandText text={offer.title} />
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--color-silver-300)] md:text-[0.9375rem]">
          {preserveBrandWrap(offer.summary)}
        </p>

        <ul
          className={cn(
            "mt-6 grid gap-x-6 gap-y-2.5 text-sm text-white",
            featured && "sm:grid-cols-2"
          )}
        >
          {offer.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span className="silver-tick mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                <Check size={11} strokeWidth={2.5} />
              </span>
              <span className="leading-snug">{preserveBrandWrap(h)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-4 pt-2 lg:mt-auto">
          <span className="btn-gradient inline-flex h-12 items-center justify-center px-7 text-base">
            View Offer
          </span>
          <span className="silver-tick inline-flex h-10 w-10 items-center justify-center rounded-full transition duration-300 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
