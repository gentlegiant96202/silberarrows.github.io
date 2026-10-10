"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * ChatGPT landing page (/chatgpt) — a copy of the home page used as the
 * ChatGPT Ads destination. Its WhatsApp links open a chat that says the
 * visitor found us on ChatGPT, so those enquiries are recognisable in the
 * WhatsApp inbox.
 *
 * The flag is kept in sessionStorage, so a visitor who lands on /chatgpt and
 * then browses to /services still gets the ChatGPT message for the rest of
 * that visit, without affecting their later visits.
 */

export const CHATGPT_PATH = "/chatgpt";

const SESSION_KEY = "sa_from_chatgpt";

export const CHATGPT_WHATSAPP_HREF =
  "https://wa.me/97143805515?text=" +
  encodeURIComponent(
    "Hi SilberArrows Team, I found you on ChatGPT and I'd like to service / repair my Mercedes-Benz. What details would you like from me?"
  );

/** Only the generic greetings are swapped; offer / contract messages stay. */
const GENERIC_WHATSAPP_HREFS = new Set<string>([site.whatsapp, site.whatsappDirect]);

const noopSubscribe = () => () => {};

function readSessionFlag(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Swap the generic WhatsApp greeting for the ChatGPT message when this visit
 * started on /chatgpt.
 */
export function useChatGPTWhatsAppHref(
  href: string | undefined,
  enabled: boolean
): string | undefined {
  const pathname = usePathname();
  const onLanding = pathname === CHATGPT_PATH;
  const fromSession = useSyncExternalStore(
    noopSubscribe,
    readSessionFlag,
    () => false
  );

  useEffect(() => {
    if (!onLanding) return;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — the /chatgpt page itself still swaps the link */
    }
  }, [onLanding]);

  if (!enabled || !href || !GENERIC_WHATSAPP_HREFS.has(href)) return href;
  return onLanding || fromSession ? CHATGPT_WHATSAPP_HREF : href;
}
