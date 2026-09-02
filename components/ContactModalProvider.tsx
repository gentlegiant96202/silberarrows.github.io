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

type Ctx = {
  open: boolean;
  openModal: () => void;
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
  const pathname = usePathname();

  // The provider lives in the root layout, so it derives the locale from the
  // route: everything under /ar gets the Arabic (RTL) form and thank-you page.
  const locale: ContactLocale =
    pathname === "/ar" || pathname?.startsWith("/ar/") ? "ar" : "en";

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo(() => ({ open, openModal, closeModal }), [
    open,
    openModal,
    closeModal,
  ]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={open} onClose={closeModal} locale={locale} />
    </ContactModalContext.Provider>
  );
}
