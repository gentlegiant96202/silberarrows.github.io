"use client";

import { useEffect } from "react";
import { X, Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { modalAr, siteAr } from "@/lib/content-ar";
import { ContactLink } from "@/components/ContactLink";
import { LeadForm } from "@/components/LeadForm";
import type { LeadContext } from "@/lib/analytics";
import { offerWhatsAppHref } from "@/lib/offers";
import { cn } from "@/lib/utils";

export type ContactLocale = "en" | "ar";

const WHATSAPP_DIRECT =
  "https://wa.me/97143805515?text=" +
  encodeURIComponent("Hi Team SilberArrows!");

const STRINGS = {
  en: {
    live: "Live",
    title: "Get in Touch",
    sub: "Enter your details and we'll contact you shortly.",
    or: "Or reach us directly",
    call: "Call Us",
    whatsapp: "WhatsApp",
    close: "Close",
    whatsappHref: WHATSAPP_DIRECT,
  },
  ar: {
    live: modalAr.live,
    title: modalAr.title,
    sub: modalAr.sub,
    or: modalAr.or,
    call: modalAr.call,
    whatsapp: modalAr.whatsapp,
    close: modalAr.close,
    whatsappHref: siteAr.whatsappDirect,
  },
} as const;

export function ContactModal({
  open,
  onClose,
  locale = "en",
  context = null,
  showDirect = true,
}: {
  open: boolean;
  onClose: () => void;
  locale?: ContactLocale;
  /**
   * Offer the form was opened from (see ContactModalProvider.openModalWith).
   * Not shown in the UI and not stored separately — the lead goes into the
   * same table as any other, with `source` = the offer page path. The context
   * only rides along on the Meta / GA events and the WhatsApp message.
   */
  context?: LeadContext | null;
  /**
   * Show the "Or reach us directly" Call / WhatsApp pair. Off on offer pages,
   * where only the form (Meta `Lead`) is offered.
   */
  showDirect?: boolean;
}) {
  const t = STRINGS[locale];
  const rtl = locale === "ar";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const whatsappHref =
    context && !rtl ? offerWhatsAppHref(context) : t.whatsappHref;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      lang={rtl ? "ar" : undefined}
      dir={rtl ? "rtl" : "ltr"}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4",
        rtl && "font-arabic"
      )}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] ring-silver p-7 anim-rise">
        <button
          aria-label={t.close}
          onClick={onClose}
          className="absolute top-4 end-4 rounded-full p-1.5 text-[color:var(--color-silver-300)] hover:text-white hover:bg-white/10 transition"
        >
          <X size={18} />
        </button>

        <div className="mb-1 flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-pulse" />
          <span
            className={cn(
              "text-xs text-emerald-300",
              !rtl && "uppercase tracking-[0.2em]"
            )}
          >
            {t.live}
          </span>
        </div>

        <h3
          id="contact-title"
          className="text-2xl font-semibold text-silver-shine"
        >
          {t.title}
        </h3>
        <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
          {t.sub}
        </p>

        <LeadForm
          locale={locale}
          context={context}
          idPrefix="modal"
          className="mt-6"
        />

        {showDirect && (
          <>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span
                className={cn(
                  "text-[0.6875rem] text-[color:var(--color-silver-500)]",
                  !rtl && "uppercase tracking-[0.18em]"
                )}
              >
                {t.or}
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Same pair as the hero / mobile bar: gradient primary + outlined WhatsApp */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ContactLink
                kind="phone"
                href={site.phoneTel}
                context={context ?? undefined}
                className="btn-gradient inline-flex h-12 items-center justify-center gap-2.5 px-4 text-base"
              >
                <Phone size={20} strokeWidth={1.75} className="shrink-0" aria-hidden />
                {t.call}
              </ContactLink>
              <ContactLink
                kind="whatsapp"
                href={whatsappHref}
                context={context ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-cream inline-flex h-12 items-center justify-center gap-2.5 px-4 text-base"
              >
                <MessageCircle
                  size={20}
                  strokeWidth={1.75}
                  className="btn-icon shrink-0"
                  aria-hidden
                />
                {t.whatsapp}
              </ContactLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
