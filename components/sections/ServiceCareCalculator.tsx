"use client";

import { useMemo, useState } from "react";
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
import { QuotePanel } from "@/components/sections/contracts/QuotePanel";
import { cn } from "@/lib/utils";

const STARTING = getServiceCareStartingPrices();
const HINT = "Select your model above for exact pricing";

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

  const stepsTotal = hasYears ? 3 : 2;
  const stepsDone = (model ? 1 : 0) + (variant ? 1 : 0) + (hasYears && year ? 1 : 0);

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
            eyebrow="Service Contracts"
            title="ServiceCare Maintenance Plans"
            intro="Prepay your scheduled servicing at today's rates. Choose your model to see Standard and Premium pricing."
          />
        </div>

        <QuotePanel
          className="mt-10 md:mt-12"
          title={<>Build your quote &mdash; interactive</>}
          status={
            selectedSummary
              ? `Showing pricing for ${selectedSummary}`
              : "Select your model and variant to view your exact pricing"
          }
          stepsDone={stepsDone}
          stepsTotal={stepsTotal}
          canReset={!!model}
          onReset={reset}
          note={
            model && variant && hasYears && !year ? (
              <p className="mt-4 text-sm text-[color:var(--color-silver-300)]">
                Select your model year to view pricing.
              </p>
            ) : null
          }
        >
          <div
            className={cn(
              "grid gap-4",
              hasYears ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
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
            <Select
              step={2}
              label="Variant"
              value={variant}
              onChange={onVariantChange}
              options={variants}
              placeholder={model ? "Select variant" : "Select model first"}
              disabled={!model}
            />
            {hasYears && (
              <Select
                step={3}
                label="Year"
                value={year}
                onChange={setYear}
                options={years}
                placeholder="Select year"
                className="sm:col-span-2 lg:col-span-1"
              />
            )}
          </div>
        </QuotePanel>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
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
