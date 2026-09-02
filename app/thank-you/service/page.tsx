import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Phone, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { MetaPixelContactEvent } from "@/components/MetaPixelContactEvent";
import { GoogleAdsLeadConversion } from "@/components/GoogleAdsLeadConversion";
import { ContactLink } from "@/components/ContactLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You | SilberArrows Mercedes-Benz Service Dubai",
  description:
    "Thank you for contacting SilberArrows. We will get back to you shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden flex items-center">
      <Suspense fallback={null}>
        <MetaPixelContactEvent />
        <GoogleAdsLeadConversion />
      </Suspense>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      {/* Vibrant emerald/teal wash for a celebratory success feel */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(52,211,153,0.28), transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-24 h-[420px] w-[520px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45,212,191,0.22), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 h-[420px] w-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,212,216,0.16), transparent 65%)",
        }}
      />

      <div className="container-page relative py-20 text-center">
        <div className="mx-auto flex flex-col items-center max-w-2xl">
          <div className="anim-fade relative inline-flex items-center justify-center">
            {/* pulsing halo rings */}
            <span className="absolute inline-flex h-24 w-24 rounded-full bg-emerald-400/20 animate-ping" />
            <span className="absolute inline-flex h-20 w-20 rounded-full border border-emerald-400/40" />
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-500 shadow-[0_0_45px_rgba(52,211,153,0.65)]">
              <CheckCircle2 size={36} className="text-[#06281d]" strokeWidth={2.2} />
            </div>
          </div>

          <h1 className="anim-rise mt-8 text-4xl md:text-5xl font-semibold text-silver-shine">
            We&apos;ve Got Your Details
          </h1>
          <p className="anim-rise mt-5 text-base md:text-lg text-[color:var(--color-silver-300)]">
            A Mercedes-Benz specialist will contact you shortly via{" "}
            <span className="font-semibold text-emerald-300">WhatsApp</span>.
          </p>

          <p className="anim-rise mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            Average response time: under 5 minutes
          </p>

          <div className="anim-rise mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <ContactLink
              kind="phone"
              href={site.phoneTel}
              className="btn-ghost flex-1 rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
            >
              <Phone size={14} /> Call {site.phone}
            </ContactLink>
            <ContactLink
              kind="whatsapp"
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 text-[#06281d] bg-gradient-to-b from-emerald-300 to-emerald-500 border border-emerald-300/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_30px_-10px_rgba(16,185,129,0.6)] transition hover:brightness-105 hover:-translate-y-0.5"
            >
              <MessageCircle size={14} /> WhatsApp Us Now
            </ContactLink>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] hover:text-white transition"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
