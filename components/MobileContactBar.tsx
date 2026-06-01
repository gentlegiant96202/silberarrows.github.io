"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";
import { site } from "@/lib/site";

export function MobileContactBar() {
  const { open } = useContactModal();

  return (
    <div
      role="region"
      aria-label="Contact"
      aria-hidden={open ? true : undefined}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/85 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="container-page grid grid-cols-2 gap-2.5 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <ContactLink
          kind="phone"
          href={site.phoneTel}
          className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em]"
        >
          <Phone size={16} /> Call
        </ContactLink>
        <ContactLink
          kind="whatsapp"
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#06281d] bg-gradient-to-b from-emerald-300 to-emerald-500 border border-emerald-300/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
        >
          <MessageCircle size={16} /> WhatsApp
        </ContactLink>
      </div>
    </div>
  );
}
