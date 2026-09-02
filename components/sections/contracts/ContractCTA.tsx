"use client";

import { MessageCircle, Phone } from "lucide-react";
import { ContactLink } from "@/components/ContactLink";
import { site } from "@/lib/site";

const WHATSAPP_NUMBER = "97143805515";

export function ContractCTA({ message }: { message: string }) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="anim-rise grid grid-cols-2 gap-3">
      <ContactLink
        kind="whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300/60 bg-gradient-to-b from-emerald-300 to-emerald-500 px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#06281d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition hover:brightness-105"
      >
        <MessageCircle size={16} /> WhatsApp
      </ContactLink>
      <ContactLink
        kind="phone"
        href={site.phoneTel}
        className="btn-ghost flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em]"
      >
        <Phone size={16} /> Call
      </ContactLink>
    </div>
  );
}
