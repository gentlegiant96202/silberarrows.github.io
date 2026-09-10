"use client";

import { MessageCircle } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";
import type { LeadContext } from "@/lib/analytics";
import { offerWhatsAppHref } from "@/lib/offers";
import { cn } from "@/lib/utils";

/**
 * Offer CTA pair — the hero's square 56px buttons: gradient primary that
 * opens the contact modal *with the offer attached*, and an outlined WhatsApp
 * link whose message names the offer. Every click carries `context` so
 * Supabase, Meta and GA4 attribute it to this offer and CTA placement.
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
  const { openModalWith } = useContactModal();

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5",
        align === "center" && "sm:justify-center",
        className
      )}
    >
      <button
        type="button"
        onClick={() => openModalWith(context)}
        className="btn-gradient inline-flex h-14 w-full items-center justify-center px-9 text-base sm:w-auto"
      >
        {label}
      </button>

      <ContactLink
        kind="whatsapp"
        context={context}
        href={offerWhatsAppHref(context)}
        target="_blank"
        rel="noreferrer"
        className="btn-outline-cream inline-flex h-14 w-full items-center justify-center gap-2.5 px-9 text-base sm:w-auto"
      >
        <MessageCircle
          size={24}
          strokeWidth={1.75}
          className="btn-icon shrink-0"
          aria-hidden
        />
        WhatsApp
      </ContactLink>
    </div>
  );
}
