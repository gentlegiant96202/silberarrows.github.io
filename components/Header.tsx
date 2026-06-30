"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";
import { useContactModal } from "@/components/ContactModalProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useContactModal();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-page flex h-24 items-center justify-between gap-4 md:h-28">
        <Logo size="lg" showWordmark={false} />

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap px-2.5 py-2 text-[13px] xl:text-sm xl:px-3.5 font-medium uppercase tracking-[0.12em] xl:tracking-[0.14em] transition rounded-md",
                  active
                    ? "text-silver-shine"
                    : "text-[color:var(--color-silver-400)] hover:text-white"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex shrink-0 items-center gap-4">
          <span className="hidden xl:flex items-center gap-1.5 text-xs text-[color:var(--color-silver-400)]">
            <MapPin size={12} />
            {site.address.short}
          </span>
          <button
            onClick={openModal}
            className="btn-silver rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]"
          >
            Contact Us
          </button>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="lg:hidden inline-flex items-center justify-center h-12 w-12 rounded-lg border border-white/10 bg-white/5 text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.14em] transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-[color:var(--color-silver-300)] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={openModal}
              className="btn-silver mt-3 rounded-lg px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em]"
            >
              Contact Us
            </button>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[color:var(--color-silver-500)] px-1">
              <MapPin size={12} />
              {site.address.short}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
