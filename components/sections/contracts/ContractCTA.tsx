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
    <div className="mt-7 grid grid-cols-2 gap-3">
      <ContactLink
        kind="whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
      >
        <MessageCircle size={16} /> WhatsApp
      </ContactLink>
      <ContactLink
        kind="phone"
        href={site.phoneTel}
        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <Phone size={16} /> Call
      </ContactLink>
    </div>
  );
}
