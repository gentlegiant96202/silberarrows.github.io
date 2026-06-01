"use client";

import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";
import { useContactModal } from "@/components/ContactModalProvider";
import { ContactLink } from "@/components/ContactLink";

export function Footer() {
  const { openModal } = useContactModal();

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size="lg" href={null} showWordmark={false} />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--color-silver-400)]">
              Dubai&apos;s independent Mercedes-Benz service centre. Servicing
              one marque, exclusively, with factory-trained technicians and
              genuine parts since 2011.
            </p>
            <button
              onClick={openModal}
              className="btn-silver mt-6 rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em]"
            >
              Contact Us
            </button>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-silver-400)] hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Visit / Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-silver-400)]">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 text-[color:var(--color-silver-300)]" />
                <span>
                  {site.address.line1},
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 text-[color:var(--color-silver-300)]" />
                <ContactLink kind="phone" href={site.phoneTel} className="hover:text-white">
                  {site.phone}
                </ContactLink>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={16} className="mt-0.5 text-[color:var(--color-silver-300)]" />
                <ContactLink
                  kind="whatsapp"
                  href={site.whatsapp}
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Us
                </ContactLink>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="mt-0.5 text-[color:var(--color-silver-300)]" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-chrome mt-12" />

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-[color:var(--color-silver-500)]">
          <p>
            &copy; {site.name} {new Date().getFullYear()}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[color:var(--color-silver-400)]">
              Independent Mercedes-Benz Specialists
            </span>
            <span className="text-[color:var(--color-silver-700)]">/</span>
            <span>Established {site.established}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
