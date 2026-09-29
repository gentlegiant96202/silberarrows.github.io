/**
 * OpenAI (ChatGPT Ads) Measurement Pixel — browser helpers.
 *
 * The Pixel stub + `init` run `beforeInteractive` in the root layout, so
 * `window.oaiq` exists from first paint and early `measure` calls queue until
 * oaiq.min.js arrives.
 *
 * Every conversion (form lead, Call tap, WhatsApp tap) is sent as the
 * standard `lead_created` event from both the browser and the server
 * Conversions API (lib/openai-capi.ts) with one shared event id — the same id
 * Meta uses — so OpenAI keeps the first copy it receives and drops the other.
 */

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

export const OPENAI_PIXEL_ID = "D8TAbUXR8TmBts2ZW4awjw";

export const OPENAI_LEAD_EVENT = "lead_created";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (!match) return null;
  try {
    return decodeURIComponent(match[2]);
  } catch {
    return match[2];
  }
}

/**
 * OpenAI click reference + browser reference for the server event.
 *
 * `oppref` is read from the current URL first, then our own `_oppref` cookie
 * (written in the root layout on landing, so it survives an ad blocker that
 * stops oaiq.min.js), then the Pixel's `__oppref` cookie. `obref` only exists
 * once the Pixel has loaded.
 */
export function getOpenAIAttribution(): { oppref?: string; obref?: string } {
  if (typeof window === "undefined") return {};

  let fromQuery: string | null = null;
  try {
    fromQuery = new URLSearchParams(window.location.search).get("oppref");
  } catch {
    /* ignore */
  }

  const oppref = fromQuery || readCookie("_oppref") || readCookie("__oppref");
  const obref = readCookie("__obref");

  return {
    ...(oppref && { oppref }),
    ...(obref && { obref }),
  };
}

/**
 * Browser half of an OpenAI `lead_created` conversion. `eventId` must be the
 * id also sent to the server so the pair is deduplicated.
 */
export function trackOpenAILead(eventId: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.oaiq !== "function") return;
  try {
    window.oaiq(
      "measure",
      OPENAI_LEAD_EVENT,
      { type: "customer_action" },
      { event_id: eventId }
    );
  } catch {
    /* tracking must never break the click / page */
  }
}

export {};
