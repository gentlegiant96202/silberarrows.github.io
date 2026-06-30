"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  getServiceCareModels,
  getServiceCareVariants,
  getServiceCareYears,
  serviceCareHasYearOptions,
  getServiceCarePricing,
  getServiceCareStartingPrices,
  SERVICECARE_TERMS,
  SERVICECARE_COMPARISON_FEATURES,
} from "@/lib/serviceWarrantyPricing";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Select } from "@/components/sections/contracts/Select";
import { TierCard } from "@/components/sections/contracts/TierCard";
import { cn } from "@/lib/utils";

const STARTING = getServiceCareStartingPrices();
const HINT = "Pick your model above for your exact price";

function buildMessage(
  tier: "Standard" | "Premium",
  coverageLabel: string,
  variant: string,
  year: string,
  price: number
) {
  const yearSuffix = year && year !== "N/A" ? ` (${year})` : "";
  return (
    `Hi Team SilberArrows! I'd like to enquire about a ServiceCare ${tier} contract ` +
    `(${coverageLabel}) for my Mercedes-Benz ${variant}${yearSuffix}. ` +
    `Price shown: AED ${price.toLocaleString()} (excl. VAT).`
  );
}

export function ServiceCareCalculator({ className }: { className?: string }) {
  const models = useMemo(() => getServiceCareModels(), []);
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [year, setYear] = useState("");

  const variants = useMemo(
    () => (model ? getServiceCareVariants(model) : []),
    [model]
  );

  const hasYears = !!(
    model &&
    variant &&
    serviceCareHasYearOptions(model, variant)
  );
  const years = useMemo(
    () => (model && variant ? getServiceCareYears(model, variant) : []),
    [model, variant]
  );

  const resolvedYear = hasYears ? year : "N/A";
  const pricing =
    model && variant && (!hasYears || year)
      ? getServiceCarePricing(model, variant, resolvedYear)
      : null;

  function onModelChange(next: string) {
    setModel(next);
    setVariant("");
    setYear("");
  }

  function onVariantChange(next: string) {
    setVariant(next);
    setYear("");
  }

  function reset() {
    setModel("");
    setVariant("");
    setYear("");
  }

  const selectedSummary = pricing
    ? `${variant}${resolvedYear !== "N/A" ? ` · ${resolvedYear}` : ""}`
    : null;

  return (
    <section
      className={cn("relative py-20 md:py-28 border-t border-white/5", className)}
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Service Contracts"
          title="ServiceCare Maintenance Plans"
          intro="Prepay your scheduled servicing at today's rates. Choose your model to see Standard and Premium pricing."
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
                    : "Choose your model and variant to reveal your exact price"}
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
              hasYears ? "md:grid-cols-3" : "md:grid-cols-2"
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
            <Select
              label="Variant"
              value={variant}
              onChange={onVariantChange}
              options={variants}
              placeholder={model ? "Select variant" : "Select model first"}
              disabled={!model}
            />
            {hasYears && (
              <Select
                label="Year"
                value={year}
                onChange={setYear}
                options={years}
                placeholder="Select year"
              />
            )}
          </div>
          {model && variant && hasYears && !year && (
            <p className="mt-4 text-center text-sm text-[color:var(--color-silver-300)]">
              Select your model year to reveal pricing.
            </p>
          )}
        </div>

        <div className="anim-fade mt-10 grid gap-5 lg:grid-cols-2">
          <TierCard
            tierName="Standard"
            coverageLabel={SERVICECARE_TERMS.standard.label}
            price={pricing ? pricing.standard : STARTING.standard}
            vatNote={SERVICECARE_TERMS.vatNote}
            features={SERVICECARE_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.standard,
            }))}
            isTeaser={!pricing}
            hint={HINT}
            ctaMessage={
              pricing
                ? buildMessage(
                    "Standard",
                    SERVICECARE_TERMS.standard.label,
                    variant,
                    resolvedYear,
                    pricing.standard
                  )
                : ""
            }
          />
          <TierCard
            tierName="Premium"
            featured
            coverageLabel={SERVICECARE_TERMS.premium.label}
            price={pricing ? pricing.premium : STARTING.premium}
            vatNote={SERVICECARE_TERMS.vatNote}
            features={SERVICECARE_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.premium,
            }))}
            isTeaser={!pricing}
            hint={HINT}
            ctaMessage={
              pricing
                ? buildMessage(
                    "Premium",
                    SERVICECARE_TERMS.premium.label,
                    variant,
                    resolvedYear,
                    pricing.premium
                  )
                : ""
            }
          />
        </div>
      </div>
    </section>
  );
}
