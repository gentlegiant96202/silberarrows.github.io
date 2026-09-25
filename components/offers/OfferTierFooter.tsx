"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useOfferForm } from "@/components/offers/OfferFormProvider";
import type { LeadContext } from "@/lib/analytics";
import { trackOfferSelect } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Footer for a TierCard on an offer page. The enquire button (gradient on
 * the featured tier, outlined on the other) scrolls to the inline lead form
 * and pre-selects this plan; a text link goes to the per-model calculator
 * for an exact figure. Both actions carry the tier intent.
 */
export function OfferTierFooter({
  context,
  tierName,
  selectionLabel,
  featured = false,
  pricingHref,
}: {
  context: LeadContext;
  tierName: string;
  /** Plan name shown on the form, e.g. "Premium ServiceCare Plans". */
  selectionLabel?: string;
  featured?: boolean;
  pricingHref: string;
}) {
  const { goToForm } = useOfferForm();

  return (
    <div className="anim-rise flex flex-col gap-3">
      <button
        type="button"
        onClick={() =>
          goToForm({
            intent: context.intent ?? "form",
            label: selectionLabel ?? tierName,
          })
        }
        className={cn(
          featured ? "btn-gradient" : "btn-outline-cream",
          "inline-flex h-12 w-full items-center justify-center px-6 text-base"
        )}
      >
        Enquire About {tierName}
      </button>
      <Link
        href={pricingHref}
        onClick={() => trackOfferSelect(context, "link")}
        className="group/link inline-flex items-center justify-center gap-1.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-silver-400)] transition hover:text-white"
      >
        Exact price for my model
        <ArrowRight
          size={13}
          className="transition-transform group-hover/link:translate-x-1"
        />
      </Link>
    </div>
  );
}
