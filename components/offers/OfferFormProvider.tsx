"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { LeadContext } from "@/lib/analytics";
import { trackOfferSelect } from "@/lib/analytics";
import { OFFER_FORM_ID } from "@/lib/offers";

/** Intent recorded when the visitor fills the form without using a CTA. */
const DEFAULT_INTENT = "form";

export type OfferFormSelection = {
  /** CTA placement or plan, e.g. "hero", "servicecare-premium". */
  intent: string;
  /** Plan name shown on the form, e.g. "Premium ServiceCare". */
  label?: string;
};

type Ctx = {
  /** Offer context for the lead, carrying the latest CTA intent. */
  context: LeadContext;
  /** Plan chosen from a tier card, shown as a chip on the form. */
  selectedLabel: string | null;
  /** Scroll to the inline form, focus it and record where the visitor came from. */
  goToForm: (selection?: OfferFormSelection) => void;
  clearSelection: () => void;
};

const OfferFormContext = createContext<Ctx | null>(null);

export function useOfferForm() {
  const ctx = useContext(OfferFormContext);
  if (!ctx) throw new Error("useOfferForm must be used within OfferFormProvider");
  return ctx;
}

export function offerFormNameInputId(): string {
  return `${OFFER_FORM_ID}-name`;
}

/**
 * Offer pages replace the modal / WhatsApp CTAs with one inline form under
 * the hero. Every CTA on the page (hero, tier cards, closing, mobile bar)
 * scrolls to that form and tags the lead with its own intent, so Meta and
 * GA4 can still compare placements.
 */
export function OfferFormProvider({
  offer,
  offerName,
  children,
}: {
  offer: string;
  offerName: string;
  children: React.ReactNode;
}) {
  const [intent, setIntent] = useState(DEFAULT_INTENT);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const context = useMemo<LeadContext>(
    () => ({ offer, offerName, intent }),
    [offer, offerName, intent]
  );

  const goToForm = useCallback(
    (selection?: OfferFormSelection) => {
      const nextIntent = selection?.intent ?? DEFAULT_INTENT;
      setIntent(nextIntent);
      setSelectedLabel(selection?.label ?? null);
      trackOfferSelect({ offer, offerName, intent: nextIntent }, "form");

      const section = document.getElementById(OFFER_FORM_ID);
      if (!section) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(
        () => {
          const input = document.getElementById(offerFormNameInputId());
          if (input instanceof HTMLInputElement && !input.value) {
            input.focus({ preventScroll: true });
          }
        },
        reduceMotion ? 0 : 450
      );
    },
    [offer, offerName]
  );

  const clearSelection = useCallback(() => {
    setIntent(DEFAULT_INTENT);
    setSelectedLabel(null);
  }, []);

  const value = useMemo(
    () => ({ context, selectedLabel, goToForm, clearSelection }),
    [context, selectedLabel, goToForm, clearSelection]
  );

  return (
    <OfferFormContext.Provider value={value}>
      {children}
    </OfferFormContext.Provider>
  );
}
