"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";
import { site } from "@/lib/site";

/**
 * Sticky bottom bar on phones/tablets. Mirrors the hero CTA pair: the Call
 * link wears the cream gradient primary (`btn-gradient`), WhatsApp the
 * outlined cream style (`btn-outline-cream`) with the green icon flip on
 * press. Buttons are 48px tall — a notch shorter than the hero's 56px so the
 * bar doesn't eat too much of a small screen.
 */
export function MobileContactBar() {
  const { open } = useContactModal();

  return (
    <div
      role="region"
      aria-label="Contact"
      aria-hidden={open ? true : undefined}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-[#0c0b0b]/90 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent" />
      <div className="container-page grid grid-cols-2 gap-2.5 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <ContactLink
          kind="phone"
          href={site.phoneTel}
          className="btn-gradient inline-flex h-12 items-center justify-center gap-2.5 px-4 text-base"
        >
          <Phone size={20} strokeWidth={1.75} className="shrink-0" aria-hidden />
          Call
        </ContactLink>
        <ContactLink
          kind="whatsapp"
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn-outline-cream inline-flex h-12 items-center justify-center gap-2.5 px-4 text-base"
        >
          <MessageCircle
            size={20}
            strokeWidth={1.75}
            className="btn-icon shrink-0"
            aria-hidden
          />
          WhatsApp
        </ContactLink>
      </div>
    </div>
  );
}
