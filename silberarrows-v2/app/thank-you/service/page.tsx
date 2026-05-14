import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Phone, MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MetaPixelContactEvent } from "@/components/MetaPixelContactEvent";
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
      </Suspense>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,212,216,0.18), transparent 60%)",
        }}
      />

      <div className="container-page relative py-20 text-center">
        <div className="mx-auto flex flex-col items-center max-w-2xl">
          <Logo size="xl" href={null} showWordmark={false} />

          <div className="mt-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-400/30">
            <CheckCircle2
              size={28}
              className="text-emerald-300"
              strokeWidth={1.6}
            />
          </div>

          <h1 className="mt-7 text-4xl md:text-5xl font-semibold text-silver-shine">
            We&apos;ve Got Your Details
          </h1>
          <p className="mt-5 text-base md:text-lg text-[color:var(--color-silver-400)]">
            A Mercedes-Benz specialist will contact you shortly via WhatsApp.
          </p>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[color:var(--color-silver-300)]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)] animate-pulse" />
            Average response time: under 5 minutes
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <a
              href={site.phoneTel}
              className="btn-ghost flex-1 rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
            >
              <Phone size={14} /> Call {site.phone}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-silver flex-1 rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} /> WhatsApp Us Now
            </a>
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
