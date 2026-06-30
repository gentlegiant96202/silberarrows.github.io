"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, MessageCircle, Phone, Clock, Navigation } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";
import { cn } from "@/lib/utils";

export function Contact({
  showHeader = true,
  className,
}: {
  showHeader?: boolean;
  className?: string;
}) {
  const { openModal } = useContactModal();
  const [mapOpen, setMapOpen] = useState(false);
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;

  return (
    <section
      className={cn(
        "relative py-20 md:py-28 border-t border-white/5",
        className
      )}
    >
      <div className="container-page">
        {showHeader && (
          <SectionHeader
            eyebrow="Contact"
            title="Contact Us"
            intro="Get in touch with Dubai's trusted Mercedes-Benz specialists."
          />
        )}

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl glass-card ring-silver silver-glow p-7 md:p-10 transition">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
            <div className="flex items-center gap-3">
              <span className="silver-bar" />
              <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-silver-shine">
                Get in Touch
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Speak with a specialist
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-silver-400)]">
              Speak directly with our Mercedes-Benz specialists for expert
              advice and service booking.
            </p>

            <div className="mt-7 grid gap-3">
              <button
                onClick={openModal}
                className="btn-silver rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} /> Call or WhatsApp Us
              </button>
              <ContactLink
                kind="phone"
                href={site.phoneTel}
                className="btn-ghost rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
              >
                <Phone size={14} /> {site.phone}
              </ContactLink>
            </div>

            <div className="mt-8 space-y-3 text-sm text-[color:var(--color-silver-400)]">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-[color:var(--color-silver-300)]" />
                <span>
                  {site.address.line1},
                  <br />
                  {site.address.line2}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 text-[color:var(--color-silver-300)]" />
                <span>{site.hours}</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl glass-card ring-chrome min-h-[380px] flex flex-col">
            <div className="absolute inset-0">
              {mapOpen ? (
                <iframe
                  title="SilberArrows location"
                  aria-label="Map showing SilberArrows location"
                  className="absolute inset-0 h-full w-full grayscale-[0.6] contrast-[1.1] brightness-[0.6] saturate-50"
                  src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapOpen(true)}
                  aria-label="Load interactive map of the SilberArrows workshop"
                  className="group absolute inset-0 h-full w-full"
                >
                  <Image
                    src="/assets/images/al-manara-location.webp"
                    alt="SilberArrows Mercedes-Benz workshop in Al Quoz, Dubai"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover grayscale-[0.4] brightness-[0.55] saturate-50 transition duration-300 group-hover:brightness-[0.7]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full glass-card ring-silver px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition duration-300 group-hover:scale-105">
                      <MapPin
                        size={14}
                        className="text-[color:var(--color-platinum)]"
                      />
                      View Map
                    </span>
                  </span>
                </button>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
            </div>

            <div className="relative mt-auto p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-silver-300)]">
                Visit Our Workshop
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {site.address.line1}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
                {site.address.line2}, {site.address.country}
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 btn-ghost rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]"
              >
                <Navigation size={13} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
