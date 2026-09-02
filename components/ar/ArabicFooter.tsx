"use client";

import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";
import { chromeAr, siteAr } from "@/lib/content-ar";

export function ArabicFooter() {
  const { openModal } = useContactModal();

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Logo size="lg" href={null} showWordmark={false} />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--color-silver-400)]">
              {chromeAr.footerBlurb}
            </p>
            <button
              onClick={openModal}
              className="btn-silver mt-6 rounded-lg px-5 py-3 text-xs font-semibold"
            >
              {chromeAr.contactUs}
            </button>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-xs font-semibold text-white">
              {chromeAr.visitContact}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-silver-400)]">
              <li className="flex gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <span>
                  {siteAr.address.line1}،
                  <br />
                  {siteAr.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <ContactLink
                  kind="phone"
                  href={siteAr.phoneTel}
                  dir="ltr"
                  className="hover:text-white"
                >
                  {siteAr.phone}
                </ContactLink>
              </li>
              <li className="flex gap-3">
                <MessageCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <ContactLink
                  kind="whatsapp"
                  href={siteAr.whatsapp}
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {chromeAr.whatsappUs}
                </ContactLink>
              </li>
              <li className="flex gap-3">
                <Clock
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <span>{siteAr.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-chrome mt-12" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-[color:var(--color-silver-500)] md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {siteAr.name} {new Date().getFullYear()}. {chromeAr.rights}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[color:var(--color-silver-400)]">
              {chromeAr.independent}
            </span>
            <span className="text-[color:var(--color-silver-700)]">/</span>
            <span>{chromeAr.establishedLabel}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
