import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { MetaPixelContactEvent } from "@/components/MetaPixelContactEvent";
import { GoogleAdsLeadConversion } from "@/components/GoogleAdsLeadConversion";
import { OpenAILeadConversion } from "@/components/OpenAILeadConversion";
import { ContactLink } from "@/components/ContactLink";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ThankYouStrings = {
  eyebrow: string;
  title: string;
  bodyBefore: string;
  bodyChannel: string;
  response: string;
  whatsappCta: string;
  whatsappHint: string;
  call: string;
  rating: string;
  imageAlt: string;
  imageCaption: string;
  back: string;
  homeHref: string;
  /** Pre-filled WhatsApp chat link; defaults to the English message. */
  whatsappHref?: string;
};

/**
 * Shared body of the English and Arabic thank-you pages. Renders the
 * deduplicated lead conversions (Meta Pixel, Google Ads, OpenAI), so it must
 * only be used on pages the lead form redirects to.
 */
export function ThankYouContent({
  t,
  rtl = false,
}: {
  t: ThankYouStrings;
  rtl?: boolean;
}) {
  // Letter-spaced uppercase is an English-only device; Arabic must not be tracked.
  const caps = !rtl && "uppercase tracking-[0.32em]";
  const BackIcon = rtl ? ArrowRight : ArrowLeft;

  return (
    <section className="relative overflow-hidden">
      <Suspense fallback={null}>
        <MetaPixelContactEvent />
        <GoogleAdsLeadConversion />
        <OpenAILeadConversion />
      </Suspense>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="pointer-events-none absolute -top-40 start-0 h-[560px] w-[900px] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,228,226,0.13), transparent 62%)",
        }}
      />

      <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="anim-fade flex items-center gap-4">
            <span className="ring-chrome inline-flex h-12 w-12 shrink-0 items-center justify-center bg-[#111113]">
              <Check size={22} strokeWidth={1.75} className="text-cream" aria-hidden />
            </span>
            <p className={cn("text-[0.6875rem] font-semibold text-silver-shine", caps)}>
              {t.eyebrow}
            </p>
          </div>

          <h1 className="anim-rise text-display mt-7 text-4xl font-normal leading-[1.04] text-cream sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="anim-rise mt-5 max-w-xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg">
            {t.bodyBefore} <span className="text-cream">{t.bodyChannel}</span>.
          </p>

          <div className="anim-rise mt-9 max-w-xl border border-white/10 bg-[#111113] p-5 ring-silver sm:p-6">
            <p className="flex items-center gap-2 text-xs text-[color:var(--color-silver-300)]">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              {t.response}
            </p>
            <ContactLink
              kind="whatsapp"
              href={t.whatsappHref ?? site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient mt-4 inline-flex h-14 w-full items-center justify-center gap-2.5 px-6 text-base"
            >
              <MessageCircle size={20} strokeWidth={1.75} className="shrink-0" aria-hidden />
              {t.whatsappCta}
            </ContactLink>
            <p className="mt-2.5 text-center text-xs text-[color:var(--color-silver-500)]">
              {t.whatsappHint}
            </p>
            <ContactLink
              kind="phone"
              href={site.phoneTel}
              className="btn-outline-cream mt-4 inline-flex h-12 w-full items-center justify-center gap-2.5 px-6 text-base"
            >
              <Phone size={18} strokeWidth={1.75} className="btn-icon shrink-0" aria-hidden />
              {t.call} <span dir="ltr">{site.phone}</span>
            </ContactLink>
          </div>


          <div className="anim-rise mt-8 flex max-w-xl flex-wrap items-center justify-between gap-4">
            <a
              href={site.reviews.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[color:var(--color-silver-300)] transition hover:text-white"
            >
              <span className="inline-flex gap-0.5 text-cream" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              {t.rating}
            </a>
            <Link
              href={t.homeHref}
              className={cn(
                "inline-flex items-center gap-2 text-xs text-[color:var(--color-silver-400)] transition hover:text-white",
                !rtl && "uppercase tracking-[0.18em]"
              )}
            >
              <BackIcon size={13} /> {t.back}
            </Link>
          </div>
        </div>

        <div className="anim-fade relative hidden lg:col-span-5 lg:block">
          <div className="ring-chrome relative aspect-[4/5] overflow-hidden">
            <Image
              src="/assets/images/hero/02-lounge.jpg"
              alt={t.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover brightness-[0.8] saturate-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-6 text-sm text-cream">
              {t.imageCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
