"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { ContactModal, type ContactLocale } from "@/components/ContactModal";
import type { LeadContext } from "@/lib/analytics";
import { trackOfferSelect } from "@/lib/analytics";

type Ctx = {
  open: boolean;
  /** Offer / campaign context attached to the current modal session, if any. */
  context: LeadContext | null;
  /**
   * Open the generic contact form. Safe to pass straight to `onClick` — the
   * event argument is ignored.
   */
  openModal: () => void;
  /**
   * Open the form with an offer context. The context is sent with the lead
   * (Supabase `offer` / `intent`, Meta `content_ids`, CRM webhook) and drives
   * offer-specific copy inside the modal.
   */
  openModalWith: (context: LeadContext) => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<Ctx | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within provider");
  return ctx;
}

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<LeadContext | null>(null);
  const pathname = usePathname();

  // The provider lives in the root layout, so it derives the locale from the
  // route: everything under /ar gets the Arabic (RTL) form and thank-you page.
  const locale: ContactLocale =
    pathname === "/ar" || pathname?.startsWith("/ar/") ? "ar" : "en";

  const openModal = useCallback(() => {
    setContext(null);
    setOpen(true);
  }, []);

  const openModalWith = useCallback((next: LeadContext) => {
    setContext(next);
    setOpen(true);
    trackOfferSelect(next, "modal");
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setContext(null);
  }, []);

  // Navigating away always resets any offer context.
  useEffect(() => {
    setContext(null);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo(
    () => ({ open, context, openModal, openModalWith, closeModal }),
    [open, context, openModal, openModalWith, closeModal]
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal
        open={open}
        onClose={closeModal}
        locale={locale}
        context={context}
      />
    </ContactModalContext.Provider>
  );
}
