import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { warranty } from "@/lib/content";
import {
  formatPrice,
  getWarrantyStartingPrices,
  WARRANTY_COMPARISON_FEATURES,
  WARRANTY_TERMS,
} from "@/lib/serviceWarrantyPricing";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/utils";

const STARTING = getWarrantyStartingPrices();
const PRICING_HREF = "/service-contracts#warranty";

/** Human label for a comparison-table cell, or null for a bare tick. */
function cellLabel(value: string): string | null {
  if (value === "check") return null;
  if (value === "checkUpTo60") return "Up to 60,000 km";
  if (value === "dash") return "\u2014";
  return value;
}

/**
 * Homepage teaser for the Extended Warranty programme — the sibling of
 * `Contracts`: same split header, same two-card layout, same tier styling.
 * Prices are the lowest across all models and link through to the
 * per-model calculator on the contracts page for an exact figure.
 */
export function Warranty({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-clip border-t border-white/[0.06] py-20 md:py-28",
        className
      )}
      aria-label="Extended Warranty"
    >
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="Extended Warranty"
            title={warranty.heading}
            intro={warranty.sub}
          />
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-6">
          {warranty.plans.map((plan) => {
            const isPremium = plan.name === "Premium";
            const price = isPremium ? STARTING.premium : STARTING.standard;

            return (
              <div
                key={plan.name}
                className={cn(
                  "reveal surface group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10",
                  plan.featured && "ring-chrome"
                )}
              >
                {plan.featured && (
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

                {/* Plan header */}
                <div className="relative flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {plan.name}
                      </h3>
                      {plan.featured && (
                        <span className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--color-silver-400)]">
                          Cover
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
                      {plan.description}
                    </p>
                  </div>
                  {plan.featured && (
                    <span className="silver-chip inline-flex items-center rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em]">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="relative mt-8 border-t border-white/10 pt-6">
                  <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                    Starting from
                  </span>
                  <p className="mt-2 text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-silver-shine sm:text-5xl md:text-6xl">
                    {formatPrice(price)}
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--color-silver-300)]">
                    {WARRANTY_TERMS.periodLabel}
                    <span className="text-[color:var(--color-silver-500)]">
                      {" \u00b7 "}
                      {WARRANTY_TERMS.vatNote}
                    </span>
                  </p>
                </div>

                {/* Coverage */}
                <ul className="relative mt-7 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {WARRANTY_COMPARISON_FEATURES.map((f) => {
                    const value = isPremium ? f.premium : f.standard;
                    const included = value !== "dash";
                    const label = cellLabel(value);
                    return (
                      <li
                        key={f.name}
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
                              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.625rem]",
                              included
                                ? "silver-tick"
                                : "border border-white/10 bg-transparent text-[color:var(--color-silver-700)]"
                            )}
                          >
                            {included ? (
                              <Check size={11} strokeWidth={2.5} />
                            ) : (
                              "\u2013"
                            )}
                          </span>
                          <span className="leading-snug">{f.name}</span>
                        </span>
                        {label && (
                          <span className="max-w-[50%] shrink-0 text-right text-xs uppercase leading-snug tracking-[0.12em] text-[color:var(--color-silver-400)]">
                            {label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="relative mt-8">
                  <Link
                    href={PRICING_HREF}
                    className={cn(
                      plan.featured ? "btn-silver" : "btn-ghost",
                      "group/cta inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] sm:w-auto"
                    )}
                  >
                    <span className="whitespace-nowrap">
                      Get {plan.name} Pricing
                    </span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/cta:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-[color:var(--color-silver-500)]">
          Lowest price across the range. Select your model on the contracts
          page for exact Standard and Premium pricing, including AMG variants.
        </p>
      </div>
    </section>
  );
}
