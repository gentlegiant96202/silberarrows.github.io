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
        "flex items-start justify-between gap-3 text-sm",
        included
          ? "text-white"
          : "text-[color:var(--color-silver-600)] line-through"
      )}
    >
      <span className="flex items-start gap-2.5">
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
        {feature.name}
      </span>
      {rightText && (
        <span className="max-w-[55%] shrink-0 text-right text-xs leading-snug text-[color:var(--color-silver-400)]">
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
  const topLabel = isTeaser ? "Starting from" : available ? "Price" : "Availability";
  const subPriceText = !available
    ? "Not offered for this model"
    : description
    ? `${coverageLabel} \u00b7 ${vatNote}`
    : vatNote;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-7 md:p-9 glass-card transition",
        featured
          ? "ring-chrome silver-glow bg-gradient-to-b from-white/[0.07] to-white/[0.01]"
          : "ring-silver"
      )}
    >
      {featured && (
        <>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
          <span className="silver-chip absolute right-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold">
            Most Popular
          </span>
        </>
      )}

      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold text-white">{tierName}</h3>
        {badge && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-silver-400)]">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
        {description ?? coverageLabel}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
          {topLabel}
        </span>
      </div>
      <p className="mt-1 text-4xl md:text-5xl font-semibold text-silver-shine">
        {formatPrice(price)}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-500)]">
        {subPriceText}
      </p>

      <ul className="mt-7 space-y-2.5">
        {features.map((f) => (
          <FeatureRow key={f.name} feature={f} />
        ))}
      </ul>

      {isTeaser
        ? hint && (
            <p className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-center text-xs font-medium text-[color:var(--color-silver-300)]">
              <ArrowUp size={14} className="text-[color:var(--color-platinum)]" />
              {hint}
            </p>
          )
        : available && <ContractCTA message={ctaMessage} />}
    </div>
  );
}
