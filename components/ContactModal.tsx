"use client";

import { useEffect, useState } from "react";
import { X, Phone, MessageCircle, Loader2 } from "lucide-react";
import {
  getCountryCallingCode,
  isValidPhoneNumber,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { site } from "@/lib/site";
import { modalAr, siteAr } from "@/lib/content-ar";
import { ContactLink } from "@/components/ContactLink";
import { DEFAULT_COUNTRY } from "@/lib/countries";
import { CountrySelect } from "@/components/CountrySelect";
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
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "WhatsApp Number",
    phonePlaceholder: "50 123 4567",
    errName: "Please enter your name",
    errPhone: "Please enter your WhatsApp number",
    errPhoneInvalid:
      "Please enter a valid WhatsApp number for the selected country",
    errGeneric: "Something went wrong. Please try again or call us directly.",
    submit: "Submit request",
    sending: "Sending...",
    note: "We typically respond within minutes on WhatsApp or by phone.",
    or: "Or reach us directly",
    call: "Call Us",
    whatsapp: "WhatsApp",
    close: "Close",
    thankYouPath: "/thank-you/service",
    whatsappHref: WHATSAPP_DIRECT,
  },
  ar: { ...modalAr, whatsappHref: siteAr.whatsappDirect },
} as const;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function ContactModal({
  open,
  onClose,
  locale = "en",
}: {
  open: boolean;
  onClose: () => void;
  locale?: ContactLocale;
}) {
  const t = STRINGS[locale];
  const rtl = locale === "ar";
  // Letter-spaced uppercase is an English-only device; Arabic must not be tracked.
  const label = rtl
    ? "block text-xs text-[color:var(--color-silver-400)] mb-1.5"
    : "block text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] mb-1.5";

  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorPulse, setErrorPulse] = useState(0);

  function showError(message: string) {
    setError(message);
    setErrorPulse((n) => n + 1);
  }

  useEffect(() => {
    if (!open) {
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      showError(t.errName);
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits) {
      showError(t.errPhone);
      return;
    }
    if (!isValidPhoneNumber(digits, country)) {
      showError(t.errPhoneInvalid);
      return;
    }

    const countryCode = `+${getCountryCallingCode(country)}`;

    setSubmitting(true);

    const eventId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    // Google click IDs: cookie (set in the root layout on landing) first, then
    // the current URL as a fallback for same-page submissions.
    const query = new URLSearchParams(window.location.search);
    const gclid = getCookie("_gclid") || query.get("gclid") || null;
    const gbraid = getCookie("_gbraid") || query.get("gbraid") || null;
    const wbraid = getCookie("_wbraid") || query.get("wbraid") || null;
    const eventSourceUrl = window.location.href;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          countryCode,
          phone: digits,
          source: window.location.pathname,
          eventId,
          ...(fbp && { fbp }),
          ...(fbc && { fbc }),
          ...(gclid && { gclid }),
          ...(gbraid && { gbraid }),
          ...(wbraid && { wbraid }),
          eventSourceUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      window.location.assign(
        t.thankYouPath + "?eid=" + encodeURIComponent(eventId)
      );
    } catch {
      showError(t.errGeneric);
      setSubmitting(false);
    }
  }

  if (!open) return null;

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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className={label}>{t.nameLabel}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              disabled={submitting}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-base text-white placeholder:text-[color:var(--color-silver-600)] outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
            />
          </div>

          <div>
            <label className={label}>{t.phoneLabel}</label>
            {/* Phone numbers are always LTR, even inside an RTL form. */}
            <div className="flex gap-2" dir="ltr">
              <CountrySelect
                value={country}
                onChange={setCountry}
                disabled={submitting}
              />
              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                placeholder={t.phonePlaceholder}
                inputMode="tel"
                autoComplete="tel-national"
                disabled={submitting}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-base text-white placeholder:text-[color:var(--color-silver-600)] outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
              />
            </div>
          </div>

          {error && (
            <p
              key={errorPulse}
              role="alert"
              className="anim-shake rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "btn-silver inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold disabled:opacity-70",
              !rtl && "uppercase tracking-[0.16em]"
            )}
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? t.sending : t.submit}
          </button>

          <p className="text-center text-xs text-[color:var(--color-silver-500)]">
            {t.note}
          </p>
        </form>

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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ContactLink
            kind="phone"
            href={site.phoneTel}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <Phone size={16} /> {t.call}
          </ContactLink>
          <ContactLink
            kind="whatsapp"
            href={t.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition"
          >
            <MessageCircle size={16} /> {t.whatsapp}
          </ContactLink>
        </div>
      </div>
    </div>
  );
}
