"use client";

import { useOfferForm } from "@/components/offers/OfferFormProvider";
import type { LeadContext } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Offer CTA — the hero's square 56px gradient button. Scrolls to the inline
 * lead form under the hero and tags the lead with `context.intent` (hero,
 * closing…) so Meta and GA4 can compare placements. Offer pages carry no
 * Call / WhatsApp links: the form (Meta `Lead`) is the only conversion.
 */
export function OfferActions({
  context,
  label = "Speak to Us Today",
  className,
  align = "start",
}: {
  context: LeadContext;
  label?: string;
  className?: string;
  align?: "start" | "center";
}) {
  const { goToForm } = useOfferForm();

  return (
    <div
      className={cn(
        "flex flex-col items-stretch sm:flex-row sm:items-center",
        align === "center" && "sm:justify-center",
        className
      )}
    >
      <button
        type="button"
        onClick={() => goToForm({ intent: context.intent ?? "form" })}
        className="btn-gradient inline-flex h-14 w-full items-center justify-center px-9 text-base sm:w-auto"
      >
        {label}
      </button>
    </div>
  );
}
