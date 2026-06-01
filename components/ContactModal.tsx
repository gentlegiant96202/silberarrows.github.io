"use client";

import { useEffect, useState } from "react";
import { X, Phone, MessageCircle, Loader2 } from "lucide-react";
import {
  getCountryCallingCode,
  isValidPhoneNumber,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { site } from "@/lib/site";
import { ContactLink } from "@/components/ContactLink";
import { DEFAULT_COUNTRY } from "@/lib/countries";
import { CountrySelect } from "@/components/CountrySelect";

const WHATSAPP_DIRECT =
  "https://wa.me/97143805515?text=" +
  encodeURIComponent("Hi Team SilberArrows!");

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
      showError("Please enter your name");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits) {
      showError("Please enter your WhatsApp number");
      return;
    }
    if (!isValidPhoneNumber(digits, country)) {
      showError("Please enter a valid WhatsApp number for the selected country");
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
    const gclid =
      getCookie("_gclid") ||
      new URLSearchParams(window.location.search).get("gclid") ||
      null;
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
          eventSourceUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      window.location.assign(
        "/thank-you/service?eid=" + encodeURIComponent(eventId)
      );
    } catch {
      showError("Something went wrong. Please try again or call us directly.");
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] ring-silver p-7 anim-rise">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-[color:var(--color-silver-300)] hover:text-white hover:bg-white/10 transition"
        >
          <X size={18} />
        </button>

        <div className="mb-1 flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            Live
          </span>
        </div>

        <h3
          id="contact-title"
          className="text-2xl font-semibold text-silver-shine"
        >
          Get in Touch
        </h3>
        <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
          Enter your details and we&apos;ll contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] mb-1.5">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={submitting}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-base text-white placeholder:text-[color:var(--color-silver-600)] outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] mb-1.5">
              WhatsApp Number
            </label>
            <div className="flex gap-2">
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
                placeholder="50 123 4567"
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
            className="btn-silver inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] disabled:opacity-70"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Sending..." : "Submit request"}
          </button>

          <p className="text-center text-xs text-[color:var(--color-silver-500)]">
            We typically respond within minutes on WhatsApp or by phone.
          </p>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
            Or reach us directly
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ContactLink
            kind="phone"
            href={site.phoneTel}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <Phone size={16} /> Call Us
          </ContactLink>
          <ContactLink
            kind="whatsapp"
            href={WHATSAPP_DIRECT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition"
          >
            <MessageCircle size={16} /> WhatsApp
          </ContactLink>
        </div>
      </div>
    </div>
  );
}
