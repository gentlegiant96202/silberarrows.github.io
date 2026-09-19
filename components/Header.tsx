"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site, type NavItem, type NavLink } from "@/lib/site";
import { useContactModal } from "@/components/ContactModalProvider";
import { cn } from "@/lib/utils";

/** Small pulsing silver dot that flags promotional nav entries (e.g. Offers). */
function HighlightDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "silver-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full animate-pulse",
        className
      )}
    />
  );
}

function isLinkActive(link: NavLink, pathname: string): boolean {
  return link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
}

/** A parent is active on its own route or on any of its children's routes. */
function isItemActive(item: NavItem, pathname: string): boolean {
  return (
    isLinkActive(item, pathname) ||
    (item.children?.some((c) => isLinkActive(c, pathname)) ?? false)
  );
}

const DESKTOP_LINK =
  "relative inline-flex items-center whitespace-nowrap px-2.5 py-2 text-[0.8125rem] xl:text-sm xl:px-3.5 font-medium uppercase tracking-[0.12em] xl:tracking-[0.14em] transition rounded-md";

function ActiveUnderline() {
  return (
    <span className="absolute -bottom-0.5 left-2.5 right-2.5 xl:left-3.5 xl:right-3.5 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
  );
}

/**
 * Desktop entry with a dropdown. The label stays a real link to the parent
 * route; the chevron toggles the panel for keyboard/touch users while hover
 * opens it for pointer users. The panel is a child of the wrapper (with the
 * gap as padding) so moving the pointer down into it never counts as leaving.
 *
 * The panel is deliberately minimal: a square hairline box aligned with the
 * label, listing the child routes in the nav's own uppercase type.
 */
function DesktopDropdown({
  item,
  pathname,
  open,
  onOpenChange,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const active = isItemActive(item, pathname);
  const panelId = `nav-menu-${item.href.replace(/\W+/g, "")}`;
  const tabIndex = open ? 0 : -1;

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onOpenChange(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onOpenChange(false);
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          className={cn(
            DESKTOP_LINK,
            "pr-1 xl:pr-1.5",
            active
              ? "text-silver-shine"
              : "text-[color:var(--color-silver-400)] hover:text-white"
          )}
        >
          {item.label}
          {item.highlight && (
            <HighlightDot
              className={cn("ml-1.5", active && "invisible")}
            />
          )}
          {active && <ActiveUnderline />}
        </Link>
        <button
          type="button"
          aria-label={`${open ? "Close" : "Open"} ${item.label} menu`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onOpenChange(!open)}
          className={cn(
            "inline-flex h-8 w-6 items-center justify-center rounded-md pr-1 transition xl:pr-1.5",
            active || open
              ? "text-silver-shine"
              : "text-[color:var(--color-silver-400)] hover:text-white"
          )}
        >
          <ChevronDown
            size={14}
            strokeWidth={2}
            className={cn(
              "transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      {/*
        Minimal panel: left edge aligned with the label text (the link's
        horizontal padding), same uppercase tracking as the nav, one hairline
        between rows, nothing else.
      */}
      <div
        id={panelId}
        className={cn(
          "absolute left-2.5 top-full z-50 pt-3 transition duration-200 ease-out xl:left-3.5",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        )}
      >
        <ul className="min-w-[13rem] divide-y divide-white/[0.06] border border-white/10 bg-[rgba(12,11,11,0.94)] py-1.5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {item.children?.map((child) => {
            const childActive = isLinkActive(child, pathname);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  tabIndex={tabIndex}
                  aria-current={childActive ? "page" : undefined}
                  className={cn(
                    "flex items-center whitespace-nowrap px-4 py-3 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors xl:text-[0.8125rem] xl:tracking-[0.14em]",
                    childActive
                      ? "text-silver-shine"
                      : "text-[color:var(--color-silver-400)] hover:text-white"
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
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
    setOpenMenu(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-white/10 bg-black/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-24 items-center justify-between gap-4 md:h-28">
        <Logo size="responsive" showWordmark={false} />

        <nav className="hidden lg:flex shrink-0 items-center gap-0.5 xl:gap-1">
          {nav.map((item) => {
            if (item.children?.length) {
              return (
                <DesktopDropdown
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  open={openMenu === item.href}
                  onOpenChange={(next) =>
                    setOpenMenu((cur) =>
                      next ? item.href : cur === item.href ? null : cur
                    )
                  }
                />
              );
            }

            const active = isItemActive(item, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  DESKTOP_LINK,
                  active
                    ? "text-silver-shine"
                    : "text-[color:var(--color-silver-400)] hover:text-white"
                )}
              >
                {item.label}
                {item.highlight && (
                  <HighlightDot className={cn("ml-1.5", active && "invisible")} />
                )}
                {active && <ActiveUnderline />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={openModal}
            className="btn-gradient inline-flex h-10 items-center justify-center px-6 text-sm"
          >
            Contact Us
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
        >
          <Menu
            size={24}
            aria-hidden
            className={cn(
              "absolute transition duration-200 ease-out",
              mobileOpen
                ? "scale-75 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            )}
          />
          <X
            size={24}
            aria-hidden
            className={cn(
              "absolute transition duration-200 ease-out",
              mobileOpen
                ? "scale-100 rotate-0 opacity-100"
                : "scale-75 -rotate-90 opacity-0"
            )}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) => {
              const active = isLinkActive(item, pathname);
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.14em] transition",
                      active
                        ? "bg-white/10 text-white"
                        : "text-[color:var(--color-silver-300)] hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.label}
                    {item.highlight && (
                      <HighlightDot className={cn(active && "invisible")} />
                    )}
                  </Link>

                  {item.children?.length ? (
                    <div className="my-1 ml-4 flex flex-col gap-0.5 border-l border-white/10 pl-2">
                      {item.children.map((child) => {
                        const childActive = isLinkActive(child, pathname);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2.5 text-xs uppercase tracking-[0.14em] transition",
                              childActive
                                ? "bg-white/10 text-white"
                                : "text-[color:var(--color-silver-400)] hover:bg-white/5 hover:text-white"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <button
              onClick={openModal}
              className="btn-gradient mt-3 inline-flex h-14 w-full items-center justify-center px-9 text-base"
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
