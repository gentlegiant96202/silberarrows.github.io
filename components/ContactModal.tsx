"use client";

import { useEffect, useState } from "react";
import { X, Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

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
  const [countryCode, setCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError("Please enter your name");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits) {
      setError("Please enter your phone number");
      return;
    }
    if (digits.length < 7 || digits.length > 15) {
      setError("Please enter a valid phone number (digits only)");
      return;
    }

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
          countryCode: countryCode.trim() || "+971",
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
      setError("Something went wrong. Please try again or call us directly.");
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl glass-card ring-silver p-7 anim-rise">
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
              className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[color:var(--color-silver-600)] outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] mb-1.5">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={submitting}
                aria-label="Country code"
                className="w-[5.5rem] shrink-0 rounded-lg bg-black/40 border border-white/10 px-3 py-3 text-sm text-white outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
              />
              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                placeholder="50 123 4567"
                inputMode="tel"
                disabled={submitting}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[color:var(--color-silver-600)] outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-silver w-full rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] disabled:opacity-70"
          >
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
          <a
            href={WHATSAPP_DIRECT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 transition"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a
            href={site.phoneTel}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <Phone size={16} /> Call Us
          </a>
        </div>
      </div>
    </div>
  );
}
