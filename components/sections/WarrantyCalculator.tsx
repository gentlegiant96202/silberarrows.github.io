"use client";

import { useMemo, useState } from "react";
import {
  getWarrantyModels,
  getWarrantyQuote,
  getWarrantyStartingPrices,
  WARRANTY_TERMS,
  WARRANTY_COMPARISON_FEATURES,
} from "@/lib/serviceWarrantyPricing";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Select, StepBadge } from "@/components/sections/contracts/Select";
import { TierCard } from "@/components/sections/contracts/TierCard";
import { QuotePanel } from "@/components/sections/contracts/QuotePanel";
import { cn } from "@/lib/utils";

const STARTING = getWarrantyStartingPrices();
const HINT = "Select your model above for exact pricing";

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

  // The variant toggle is optional and pre-selected, so it never blocks a
  // quote; progress is driven by the model choice alone.
  const stepsTotal = showAmgToggle ? 2 : 1;
  const stepsDone = model ? stepsTotal : 0;

  return (
    <section
      className={cn(
        "relative border-t border-white/[0.06] py-20 md:py-28",
        className
      )}
    >
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="Extended Warranty"
            title="Extended Warranty Coverage"
            intro="Protect your Mercedes-Benz beyond the manufacturer warranty. Choose your model to see Standard and Premium pricing."
          />
        </div>

        <QuotePanel
          className="mt-10 md:mt-12"
          title={<>Build your quote &mdash; interactive</>}
          status={
            selectedSummary
              ? `Showing pricing for ${selectedSummary}`
              : "Select your model to view your exact pricing"
          }
          stepsDone={stepsDone}
          stepsTotal={stepsTotal}
          canReset={!!model}
          onReset={reset}
          note={
            quote?.isAmgOnly ? (
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-300)]">
                AMG pricing applies to this model
              </p>
            ) : null
          }
        >
          <div
            className={cn(
              "grid gap-4",
              showAmgToggle ? "sm:grid-cols-2" : "sm:grid-cols-1"
            )}
          >
            <Select
              step={1}
              label="Start here: Choose your model"
              value={model}
              onChange={onModelChange}
              options={models}
              placeholder="Select model"
            />
            {showAmgToggle && (
              <div className="anim-rise block">
                <span className="mb-2.5 flex items-center gap-2">
                  <StepBadge index={2} done />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-silver-shine">
                    Variant
                  </span>
                </span>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/20 bg-white/[0.06] p-1.5">
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
                        aria-pressed={active}
                        className={cn(
                          "rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition",
                          active
                            ? "btn-silver text-black"
                            : "text-[color:var(--color-silver-300)] hover:bg-white/[0.06] hover:text-white"
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
        </QuotePanel>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
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
