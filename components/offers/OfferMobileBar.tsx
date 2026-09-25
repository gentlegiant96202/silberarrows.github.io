"use client";

import { useEffect, useState } from "react";
import { useContactModal } from "@/components/ContactModalProvider";
import { useOfferForm } from "@/components/offers/OfferFormProvider";
import { OFFER_FORM_ID } from "@/lib/offers";
import { cn } from "@/lib/utils";

/**
 * Offer-page replacement for the global Call / WhatsApp MobileContactBar:
 * one gradient button that scrolls to the inline lead form. It slides away
 * while the form itself is on screen so it never covers the fields.
 */
export function OfferMobileBar({ label }: { label: string }) {
  const { open } = useContactModal();
  const { goToForm } = useOfferForm();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(OFFER_FORM_ID);
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const hidden = open || formVisible;

  return (
    <div
      role="region"
      aria-label="Enquire"
      aria-hidden={hidden ? true : undefined}
      className={cn(
        "lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-[#0c0b0b]/90 backdrop-blur-xl transition-transform duration-300 ease-out",
        hidden ? "pointer-events-none translate-y-full" : "translate-y-0"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent" />
      <div className="container-page pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <button
          type="button"
          tabIndex={hidden ? -1 : undefined}
          onClick={() => goToForm({ intent: "mobile-bar" })}
          className="btn-gradient inline-flex h-12 w-full items-center justify-center px-4 text-base"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
