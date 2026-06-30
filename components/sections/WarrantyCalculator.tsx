"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  getWarrantyModels,
  getWarrantyQuote,
  getWarrantyStartingPrices,
  WARRANTY_TERMS,
  WARRANTY_COMPARISON_FEATURES,
} from "@/lib/serviceWarrantyPricing";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Select } from "@/components/sections/contracts/Select";
import { TierCard } from "@/components/sections/contracts/TierCard";
import { cn } from "@/lib/utils";

const STARTING = getWarrantyStartingPrices();
const HINT = "Pick your model above for your exact price";

function buildMessage(
  tier: "Standard" | "Premium",
  periodLabel: string,
  model: string,
  isAmg: boolean,
  price: number
) {
  const amgSuffix = isAmg ? " (AMG)" : "";
  return (
    `Hi Team SilberArrows! I'd like to enquire about Extended Warranty - ${tier} ` +
    `(${periodLabel}) for my Mercedes-Benz ${model}${amgSuffix}. ` +
    `Price shown: AED ${price.toLocaleString()} (excl. VAT).`
  );
}

export function WarrantyCalculator({ className }: { className?: string }) {
  const models = useMemo(() => getWarrantyModels(), []);
  const [model, setModel] = useState("");
  const [isAmg, setIsAmg] = useState(false);

  const quote = model ? getWarrantyQuote(model, isAmg) : null;
  const showAmgToggle = quote?.hasAmgOption ?? false;
  const amgApplied = quote?.variantLabel === "AMG";

  function onModelChange(next: string) {
    setModel(next);
    setIsAmg(false);
  }

  function reset() {
    setModel("");
    setIsAmg(false);
  }

  const selectedSummary = quote
    ? `${model}${amgApplied ? " · AMG" : ""}`
    : null;

  return (
    <section
      className={cn("relative py-20 md:py-28 border-t border-white/5", className)}
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Extended Warranty"
          title="Extended Warranty Coverage"
          intro="Protect your Mercedes-Benz beyond the manufacturer warranty. Choose your model to see Standard and Premium pricing."
        />

        <div className="anim-rise relative mt-12 w-full rounded-2xl ring-chrome silver-glow bg-gradient-to-b from-white/[0.08] to-white/[0.01] p-6 md:p-8 transition duration-300 hover:-translate-y-0.5">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-platinum)] opacity-60" />
                <span className="silver-tick relative inline-flex h-2.5 w-2.5 rounded-full" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-silver-shine">
                  Build your quote &mdash; interactive
                </p>
                <p className="mt-0.5 text-sm text-[color:var(--color-silver-300)]">
                  {selectedSummary
                    ? `Showing pricing for ${selectedSummary}`
                    : "Choose your model to reveal your exact price"}
                </p>
              </div>
            </div>
            {model && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-silver-300)] transition hover:border-white/40 hover:text-white"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          <div
            className={cn(
              "mt-20 grid gap-4",
              showAmgToggle ? "md:grid-cols-2" : "md:grid-cols-1"
            )}
          >
            <div className="relative">
              <Select
                label="Start here: Choose your model"
                value={model}
                onChange={onModelChange}
                options={models}
                placeholder="Select model"
              />
            </div>
            {showAmgToggle && (
              <div className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] font-semibold text-silver-shine">
                  Variant
                </span>
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/20 bg-white/[0.06] p-1">
                  {(
                    [
                      { label: "Standard", amg: false },
                      { label: "AMG", amg: true },
                    ] as const
                  ).map((opt) => {
                    const active = isAmg === opt.amg;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setIsAmg(opt.amg)}
                        className={cn(
                          "rounded-lg px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition",
                          active
                            ? "btn-silver text-black"
                            : "text-[color:var(--color-silver-300)] hover:text-white"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {quote?.isAmgOnly && (
            <p className="mt-4 text-center text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-300)]">
              AMG pricing applies to this model
            </p>
          )}
        </div>

        <div className="anim-fade mt-10 grid gap-5 lg:grid-cols-2">
          <TierCard
            tierName="Standard"
            badge={amgApplied ? "AMG" : undefined}
            description="Drivetrain only"
            coverageLabel={WARRANTY_TERMS.periodLabel}
            price={quote ? quote.standardPrice : STARTING.standard}
            vatNote={WARRANTY_TERMS.vatNote}
            features={WARRANTY_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.standard,
            }))}
            isTeaser={!quote}
            hint={HINT}
            ctaMessage={
              quote && quote.standardPrice !== null
                ? buildMessage(
                    "Standard",
                    WARRANTY_TERMS.periodLabel,
                    model,
                    amgApplied,
                    quote.standardPrice
                  )
                : ""
            }
          />
          <TierCard
            tierName="Premium"
            featured
            badge={amgApplied ? "AMG" : undefined}
            description="Comprehensive coverage"
            coverageLabel={WARRANTY_TERMS.periodLabel}
            price={quote ? quote.premiumPrice : STARTING.premium}
            vatNote={WARRANTY_TERMS.vatNote}
            features={WARRANTY_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.premium,
            }))}
            isTeaser={!quote}
            hint={HINT}
            ctaMessage={
              quote && quote.premiumPrice !== null
                ? buildMessage(
                    "Premium",
                    WARRANTY_TERMS.periodLabel,
                    model,
                    amgApplied,
                    quote.premiumPrice
                  )
                : ""
            }
          />
        </div>
      </div>
    </section>
  );
}
