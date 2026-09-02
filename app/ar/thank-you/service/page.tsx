import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Phone, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { MetaPixelContactEvent } from "@/components/MetaPixelContactEvent";
import { GoogleAdsLeadConversion } from "@/components/GoogleAdsLeadConversion";
import { ContactLink } from "@/components/ContactLink";
import { chromeAr, siteAr, thankYouAr } from "@/lib/content-ar";

export const metadata: Metadata = {
  title: thankYouAr.metaTitle,
  description: thankYouAr.metaDescription,
  robots: { index: false, follow: false },
};

/**
 * Arabic thank-you page. The Arabic contact modal redirects here with the same
 * `?eid=` as the English flow, so the Meta Lead and the Google Ads "Web Form
 * Lead" conversion fire (deduped) exactly as they do on /thank-you/service.
 */
export default function ArabicThankYouPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <Suspense fallback={null}>
        <MetaPixelContactEvent />
        <GoogleAdsLeadConversion />
      </Suspense>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      {/* Vibrant emerald/teal wash for a celebratory success feel */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(52,211,153,0.28), transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -end-24 h-[420px] w-[520px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45,212,191,0.22), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -start-24 h-[420px] w-[520px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,212,216,0.16), transparent 65%)",
        }}
      />

      <div className="container-page relative py-20 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <div className="anim-fade relative inline-flex items-center justify-center">
            <span className="absolute inline-flex h-24 w-24 animate-ping rounded-full bg-emerald-400/20" />
            <span className="absolute inline-flex h-20 w-20 rounded-full border border-emerald-400/40" />
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-500 shadow-[0_0_45px_rgba(52,211,153,0.65)]">
              <CheckCircle2
                size={36}
                className="text-[#06281d]"
                strokeWidth={2.2}
              />
            </div>
          </div>

          <h1 className="anim-rise mt-8 text-4xl font-semibold text-silver-shine md:text-5xl">
            {thankYouAr.title}
          </h1>
          <p className="anim-rise mt-5 text-base text-[color:var(--color-silver-300)] md:text-lg">
            {thankYouAr.bodyBefore}{" "}
            <span className="font-semibold text-emerald-300">
              {thankYouAr.bodyChannel}
            </span>
            .
          </p>

          <p className="anim-rise mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            {thankYouAr.response}
          </p>

          <div className="anim-rise mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <ContactLink
              kind="phone"
              href={siteAr.phoneTel}
              className="btn-ghost flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
            >
              <Phone size={14} /> {thankYouAr.call}{" "}
              <span dir="ltr">{siteAr.phone}</span>
            </ContactLink>
            <ContactLink
              kind="whatsapp"
              href={siteAr.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-300/60 bg-gradient-to-b from-emerald-300 to-emerald-500 px-5 py-3.5 text-sm font-semibold text-[#06281d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_30px_-10px_rgba(16,185,129,0.6)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <MessageCircle size={14} /> {thankYouAr.whatsappNow}
            </ContactLink>
          </div>

          <Link
            href={chromeAr.homeHref}
            className="mt-10 inline-flex items-center gap-2 text-xs text-[color:var(--color-silver-400)] transition hover:text-white"
          >
            {/* "Back" points right in RTL */}
            <ArrowRight size={13} /> {thankYouAr.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
