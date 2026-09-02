"use client";

import { ArrowUp, Check } from "lucide-react";
import { formatPrice } from "@/lib/serviceWarrantyPricing";
import { ContractCTA } from "@/components/sections/contracts/ContractCTA";
import { cn } from "@/lib/utils";

export type TierFeature = { name: string; value: string };

function isIncluded(value: string): boolean {
  return value !== "dash";
}

function FeatureRow({ feature }: { feature: TierFeature }) {
  const included = isIncluded(feature.value);

  let rightText: string | null = null;
  if (feature.value === "check") rightText = null;
  else if (feature.value === "checkUpTo60") rightText = "Up to 60,000 km";
  else if (feature.value === "dash") rightText = "\u2014";
  else rightText = feature.value;

  return (
    <li
      className={cn(
        "flex items-start justify-between gap-4 py-3 text-sm",
        included
          ? "text-white"
          : "text-[color:var(--color-silver-600)] line-through"
      )}
    >
      <span className="flex min-w-0 items-start gap-3">
        <span
          className={cn(
            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]",
            included
              ? "silver-tick"
              : "border border-white/10 bg-transparent text-[color:var(--color-silver-700)]"
          )}
        >
          {included ? <Check size={11} strokeWidth={2.5} /> : "\u2013"}
        </span>
        <span className="leading-snug">{feature.name}</span>
      </span>
      {rightText && (
        <span className="max-w-[50%] shrink-0 text-right text-xs uppercase leading-snug tracking-[0.12em] text-[color:var(--color-silver-400)]">
          {rightText}
        </span>
      )}
    </li>
  );
}

export function TierCard({
  tierName,
  badge,
  description,
  featured = false,
  coverageLabel,
  price,
  vatNote,
  features,
  ctaMessage,
  isTeaser = false,
  hint,
}: {
  tierName: string;
  /** Optional small label next to the tier name (e.g. variant "AMG"). */
  badge?: string;
  /** Optional tagline under the tier name (e.g. "Drivetrain only"). When set,
   * the coverage label moves under the price. */
  description?: string;
  featured?: boolean;
  coverageLabel: string;
  price: number | null;
  vatNote: string;
  features: TierFeature[];
  /** Prefilled WhatsApp message. CTA is hidden when price is unavailable. */
  ctaMessage: string;
  /** When true, shows a "Starting from" teaser with `hint` instead of the CTA. */
  isTeaser?: boolean;
  /** Hint line rendered in teaser mode in place of the CTA. */
  hint?: string;
}) {
  const available = price !== null && price !== 0;
  const topLabel = isTeaser
    ? "Starting from"
    : available
      ? "Price"
      : "Availability";
  const subPriceText = !available
    ? "Not offered for this model"
    : description
      ? `${coverageLabel} \u00b7 ${vatNote}`
      : vatNote;

  return (
    <div
      className={cn(
        "surface group relative overflow-hidden rounded-3xl p-6 transition duration-500 sm:p-8 md:p-9",
        featured && "ring-chrome",
        // "Locked" until a model is chosen — the exact price unlocks the card
        isTeaser && "opacity-[0.82] hover:opacity-100"
      )}
    >
      {featured && (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(229,228,226,0.16), transparent 70%)",
            }}
          />
        </>
      )}

      {/* Header */}
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {tierName}
            </h3>
            {badge && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-silver-400)]">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
            {description ?? coverageLabel}
          </p>
        </div>
        {featured && (
          <span className="silver-chip inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
            Most Popular
          </span>
        )}
      </div>

      {/* Price */}
      <div className="relative mt-7 border-t border-white/10 pt-6">
        <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
          {topLabel}
        </span>
        <p
          key={`${isTeaser ? "teaser" : "price"}-${price ?? "na"}`}
          className={cn(
            "anim-rise mt-2 text-[2.5rem] font-semibold leading-none tracking-[-0.03em] sm:text-5xl md:text-6xl",
            isTeaser ? "text-silver-soft" : "text-silver-shine"
          )}
        >
          {formatPrice(price)}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-500)]">
          {subPriceText}
        </p>
      </div>

      {/* Inclusions */}
      <ul className="relative mt-7 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {features.map((f) => (
          <FeatureRow key={f.name} feature={f} />
        ))}
      </ul>

      {/* Footer: unlock hint or live CTA */}
      <div className="relative mt-7">
        {isTeaser ? (
          hint && (
            <p className="flex items-center justify-center gap-2.5 rounded-xl border border-dashed border-[color:var(--color-platinum)]/30 bg-white/[0.03] px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-silver-200)]">
              <ArrowUp
                size={15}
                strokeWidth={2.5}
                className="animate-bounce text-[color:var(--color-platinum)]"
              />
              {hint}
            </p>
          )
        ) : (
          available && <ContractCTA message={ctaMessage} />
        )}
      </div>
    </div>
  );
}
