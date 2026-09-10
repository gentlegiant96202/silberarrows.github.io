"use client";

import { MessageCircle, Star } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";
import { site } from "@/lib/site";

/**
 * Hero call-to-action row: square 56px buttons (gradient primary that opens
 * the contact modal, outlined WhatsApp link) plus the Google rating as a
 * quiet inline proof point. Client component so the server-rendered Hero
 * can stay free of hooks.
 */
export function HeroActions({ label = "Get a Free Quote" }: { label?: string }) {
  const { openModal } = useContactModal();

  return (
    <div className="anim-rise mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
      <button
        type="button"
        onClick={openModal}
        className="btn-gradient inline-flex h-14 w-full items-center justify-center px-9 text-base sm:w-auto"
      >
        {label}
      </button>

      <ContactLink
        kind="whatsapp"
        href={site.whatsapp}
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

      <a
        href="#reviews"
        className="group inline-flex items-center gap-3 text-sm text-cream/70 transition hover:text-cream sm:ml-1"
      >
        <span className="flex items-center gap-1" aria-hidden>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className="fill-cream text-cream" />
          ))}
        </span>
        <span className="leading-tight">
          <span className="font-bold text-cream">{site.reviews.rating}</span>
          <span className="text-cream/50"> / 5</span>
          <span className="text-cream/50"> · </span>
          {site.reviews.count} Google Reviews
        </span>
      </a>
    </div>
  );
}
