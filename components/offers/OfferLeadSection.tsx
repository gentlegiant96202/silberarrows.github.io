"use client";

import { Check, X } from "lucide-react";
import { BrandText } from "@/components/BrandText";
import { LeadForm } from "@/components/LeadForm";
import { useOfferForm } from "@/components/offers/OfferFormProvider";
import { OFFER_FORM_ID } from "@/lib/offers";
import { cn, preserveBrandWrap } from "@/lib/utils";

/**
 * Inline lead form directly under the offer hero — the page's only
 * conversion point. Copy and the offer's highlights on the left, the
 * name + WhatsApp form on the right (stacked on mobile). A plan chosen from a
 * tier card shows as a removable chip above the form and rides along as the
 * lead's intent.
 */
export function OfferLeadSection({
  title,
  intro,
  highlights,
  submitLabel,
  className,
}: {
  title: string;
  intro: string;
  highlights: string[];
  submitLabel: string;
  className?: string;
}) {
  const { context, selectedLabel, clearSelection } = useOfferForm();

  return (
    <section
      id={OFFER_FORM_ID}
      className={cn(
        "relative scroll-mt-24 border-b border-white/[0.06] py-16 md:scroll-mt-28 md:py-24",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/25 to-transparent"
        aria-hidden
      />
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-silver-shine">
            Claim This Offer
          </p>
          <h2 className="text-display text-hero-gradient mt-4 font-display font-normal text-[2rem] leading-[1.12] sm:text-4xl md:text-5xl">
            <BrandText text={title} />
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg">
            {preserveBrandWrap(intro)}
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-snug text-cream/90"
              >
                <Check
                  size={16}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-[color:var(--color-platinum)]"
                  aria-hidden
                />
                <span>{preserveBrandWrap(item)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl border border-white/10 bg-[#111113] p-6 ring-silver sm:p-8">
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                Live
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-silver-shine">
              Get in Touch
            </h3>
            <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
              Enter your details and a specialist will contact you shortly.
            </p>

            {selectedLabel && (
              <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-cream/20 bg-white/[0.04] py-1.5 pl-3.5 pr-1.5 text-xs text-cream">
                <span className="truncate">
                  <span className="text-[color:var(--color-silver-400)]">
                    Enquiring about:{" "}
                  </span>
                  <BrandText text={selectedLabel} />
                </span>
                <button
                  type="button"
                  onClick={clearSelection}
                  aria-label="Clear selected plan"
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[color:var(--color-silver-400)] transition hover:bg-white/10 hover:text-white"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <LeadForm
              context={context}
              idPrefix={OFFER_FORM_ID}
              submitLabel={submitLabel}
              className="mt-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
