"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { modalAr } from "@/lib/content-ar";
import { DEFAULT_COUNTRY } from "@/lib/countries";
import { CountrySelect } from "@/components/CountrySelect";
import type { LeadContext } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type LeadFormLocale = "en" | "ar";

const STRINGS = {
  en: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "WhatsApp Number",
    phonePlaceholder: "50 123 4567",
    errName: "Please enter your name",
    errPhone: "Please enter your WhatsApp number",
    errPhoneInvalid:
      "Please enter a valid WhatsApp number for the selected country",
    errGeneric: "Something went wrong. Please try again.",
    submit: "Submit request",
    sending: "Sending...",
    note: "We typically respond within minutes on WhatsApp or by phone.",
    thankYouPath: "/thank-you/service",
  },
  ar: {
    nameLabel: modalAr.nameLabel,
    namePlaceholder: modalAr.namePlaceholder,
    phoneLabel: modalAr.phoneLabel,
    phonePlaceholder: modalAr.phonePlaceholder,
    errName: modalAr.errName,
    errPhone: modalAr.errPhone,
    errPhoneInvalid: modalAr.errPhoneInvalid,
    errGeneric: modalAr.errGeneric,
    submit: modalAr.submit,
    sending: modalAr.sending,
    note: modalAr.note,
    thankYouPath: modalAr.thankYouPath,
  },
} as const;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

/**
 * Resolve typed / autofilled digits to a national number + country.
 * Browser autofill often inserts the full international number
 * (+971 50 123 4567 → "971501234567"), so when the digits aren't valid for
 * the selected country, retry them as an international number.
 */
function resolvePhone(
  digits: string,
  country: CountryCode
): { national: string; country: CountryCode } | null {
  const local = parsePhoneNumberFromString(digits, country);
  if (local?.isValid()) {
    return { national: local.nationalNumber, country };
  }
  const intlDigits = digits.startsWith("00") ? digits.slice(2) : digits;
  const intl = parsePhoneNumberFromString(`+${intlDigits}`);
  if (intl?.isValid() && intl.country) {
    return { national: intl.nationalNumber, country: intl.country };
  }
  return null;
}

/**
 * Name + WhatsApp number lead form. Shared by the contact modal and the
 * inline offer form so every submission takes the same path: /api/lead
 * (CRM webhook, Supabase, Meta CAPI `Lead`) → thank-you page, which fires
 * the deduplicated Pixel `Lead` and the Google Ads conversion.
 *
 * `context` attaches the offer (and CTA intent) to the Meta events and the
 * thank-you redirect.
 */
export function LeadForm({
  locale = "en",
  context = null,
  idPrefix = "lead",
  submitLabel,
  className,
}: {
  locale?: LeadFormLocale;
  context?: LeadContext | null;
  /** Unique per rendered form so labels and ids don't collide. */
  idPrefix?: string;
  submitLabel?: string;
  className?: string;
}) {
  const t = STRINGS[locale];
  const rtl = locale === "ar";
  // Letter-spaced uppercase is an English-only device; Arabic must not be tracked.
  const label = rtl
    ? "block text-xs text-[color:var(--color-silver-400)] mb-1.5"
    : "block text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] mb-1.5";
  const input =
    "w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-base text-white placeholder:text-[color:var(--color-silver-600)] outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60";

  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorPulse, setErrorPulse] = useState(0);

  // Back-navigation from the thank-you page can restore this page from the
  // bfcache with the button still in its "Sending..." state.
  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) setSubmitting(false);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  function showError(message: string) {
    setError(message);
    setErrorPulse((n) => n + 1);
  }

  function handlePhoneChange(raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (/^\s*(\+|00)/.test(raw)) {
      const resolved = resolvePhone(digits, country);
      if (resolved) {
        setCountry(resolved.country);
        setPhone(resolved.national);
        return;
      }
    }
    setPhone(digits);
  }

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
    const resolved = resolvePhone(digits, country);
    if (!resolved) {
      showError(t.errPhoneInvalid);
      return;
    }
    if (resolved.country !== country || resolved.national !== digits) {
      setCountry(resolved.country);
      setPhone(resolved.national);
    }

    const countryCode = `+${getCountryCallingCode(resolved.country)}`;

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
          phone: resolved.national,
          source: window.location.pathname,
          eventId,
          ...(fbp && { fbp }),
          ...(fbc && { fbc }),
          ...(gclid && { gclid }),
          ...(gbraid && { gbraid }),
          ...(wbraid && { wbraid }),
          // Meta CAPI attribution only — not persisted.
          ...(context && {
            offer: context.offer,
            offerName: context.offerName,
            ...(context.intent && { intent: context.intent }),
          }),
          eventSourceUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const params = new URLSearchParams({ eid: eventId });
      if (context) params.set("offer", context.offer);
      window.location.assign(`${t.thankYouPath}?${params.toString()}`);
    } catch {
      showError(t.errGeneric);
      setSubmitting(false);
    }
  }

  const nameId = `${idPrefix}-name`;
  const phoneId = `${idPrefix}-phone`;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      noValidate
      className={cn("space-y-4", className)}
    >
      <div>
        <label htmlFor={nameId} className={label}>
          {t.nameLabel}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          disabled={submitting}
          className={input}
        />
      </div>

      <div>
        <label htmlFor={phoneId} className={label}>
          {t.phoneLabel}
        </label>
        {/* Phone numbers are always LTR, even inside an RTL form. */}
        <div className="flex gap-2" dir="ltr">
          <CountrySelect
            value={country}
            onChange={setCountry}
            disabled={submitting}
          />
          <input
            id={phoneId}
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            enterKeyHint="send"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={t.phonePlaceholder}
            disabled={submitting}
            className={input}
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
        className="btn-gradient inline-flex h-14 w-full items-center justify-center gap-2.5 px-9 text-base disabled:opacity-70"
      >
        {submitting && <Loader2 size={18} className="animate-spin" />}
        {submitting ? t.sending : submitLabel ?? t.submit}
      </button>

      <p className="text-center text-xs text-[color:var(--color-silver-500)]">
        {t.note}
      </p>
    </form>
  );
}
