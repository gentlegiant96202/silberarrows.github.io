"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, MessageCircle, Phone, Clock, Navigation } from "lucide-react";
import { contactAr, siteAr } from "@/lib/content-ar";
import { SectionHeaderAr } from "@/components/ar/SectionHeaderAr";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";

export function ContactAr() {
  const { openModal } = useContactModal();
  const [mapOpen, setMapOpen] = useState(false);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${siteAr.geo.lat},${siteAr.geo.lng}`;

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div className="container-page">
        <div className="reveal">
          <SectionHeaderAr
            eyebrow={contactAr.eyebrow}
            title={contactAr.title}
            intro={contactAr.intro}
          />
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-12 lg:gap-6">
          {/* ── Speak with us ─────────────────────────────────────────── */}
          <div className="reveal surface relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 lg:col-span-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
            <div className="flex items-center gap-3">
              <p className="text-[12px] font-semibold text-silver-shine">
                {contactAr.cardEyebrow}
              </p>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
              {contactAr.cardTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-[15px]">
              {contactAr.cardBody}
            </p>

            <div className="mt-7 grid gap-3">
              <button
                onClick={openModal}
                className="btn-silver flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
              >
                <MessageCircle size={16} /> {contactAr.callOrWhatsapp}
              </button>
              <ContactLink
                kind="phone"
                href={siteAr.phoneTel}
                className="btn-ghost flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
              >
                <Phone size={14} /> <span dir="ltr">{siteAr.phone}</span>
              </ContactLink>
            </div>

            <div className="mt-8 divide-y divide-white/[0.06] border-t border-white/[0.06] text-sm text-[color:var(--color-silver-400)]">
              <div className="flex items-start gap-3 py-3.5">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <span>
                  {siteAr.address.line1}،
                  <br />
                  {siteAr.address.line2}
                </span>
              </div>
              <div className="flex items-start gap-3 py-3.5">
                <Clock
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <span>{siteAr.hours}</span>
              </div>
            </div>
          </div>

          {/* ── Workshop map ──────────────────────────────────────────── */}
          <div className="reveal ring-chrome relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl lg:col-span-7 lg:min-h-[460px]">
            <div className="absolute inset-0">
              {mapOpen ? (
                <iframe
                  title={contactAr.mapTitle}
                  aria-label={contactAr.mapAria}
                  className="absolute inset-0 h-full w-full brightness-[0.6] contrast-[1.1] grayscale-[0.6] saturate-50"
                  src={`https://www.google.com/maps?q=${siteAr.geo.lat},${siteAr.geo.lng}&z=15&hl=ar&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapOpen(true)}
                  aria-label={contactAr.loadMapAria}
                  className="group absolute inset-0 h-full w-full"
                >
                  <Image
                    src="/assets/images/al-manara-location.webp"
                    alt={contactAr.mapImageAlt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover brightness-[0.55] grayscale-[0.4] saturate-50 transition duration-500 group-hover:scale-[1.03] group-hover:brightness-[0.7]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="glass-card ring-silver inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition duration-300 group-hover:scale-105">
                      <MapPin
                        size={14}
                        className="text-[color:var(--color-platinum)]"
                      />
                      {contactAr.viewMap}
                    </span>
                  </span>
                </button>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink-950)] via-transparent to-[color:var(--color-ink-950)]/40" />
            </div>

            <div className="pointer-events-none relative mt-auto p-6 sm:p-8">
              <div className="pointer-events-auto max-w-md">
                <p className="text-[12px] text-[color:var(--color-silver-300)]">
                  {contactAr.visit}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                  {siteAr.address.line1}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
                  {siteAr.address.line2}، {siteAr.address.country}
                </p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold"
                >
                  <Navigation size={13} /> {contactAr.directions}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
