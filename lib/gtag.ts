declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export const GADS_LABELS = {
  lead: process.env.NEXT_PUBLIC_GADS_LEAD_LABEL,
  whatsapp: process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL,
  phone: process.env.NEXT_PUBLIC_GADS_PHONE_LABEL,
} as const;

/**
 * Fire a Google Ads conversion.
 *
 * `window.gtag` is a dataLayer stub defined `beforeInteractive` in the root
 * layout, so it exists from first paint. If the gtag.js library hasn't loaded
 * yet the event simply queues and is flushed when it arrives — nothing is
 * dropped. `transport_type: 'beacon'` makes the hit survive a navigation that
 * starts immediately after the click (tel: / wa.me links).
 */
export function fireGoogleAdsConversion(
  label?: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  if (!GOOGLE_ADS_ID || !label) return;

  const payload = {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    transport_type: "beacon",
    ...params,
  };

  if (typeof window.gtag !== "function") {
    // Defensive fallback in case the head stub failed to run: recreate the
    // standard stub so the call queues in dataLayer as an `arguments` object,
    // which is what gtag.js replays on load.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag("event", "conversion", payload);
}

/**
 * Kept for call-site compatibility. With the beforeInteractive stub the
 * conversion can be fired immediately; the poll only matters if the stub is
 * somehow missing, in which case we wait briefly for gtag to appear.
 */
export function fireGoogleAdsConversionWhenReady(
  label?: string,
  params?: Record<string, unknown>,
  timeoutMs = 10000
) {
  if (typeof window === "undefined") return;
  if (!GOOGLE_ADS_ID || !label) return;

  if (typeof window.gtag === "function") {
    fireGoogleAdsConversion(label, params);
    return;
  }

  const start = Date.now();
  const tick = () => {
    if (typeof window.gtag === "function") {
      fireGoogleAdsConversion(label, params);
      return;
    }
    if (Date.now() - start > timeoutMs) {
      // Last resort: queue it anyway.
      fireGoogleAdsConversion(label, params);
      return;
    }
    window.setTimeout(tick, 200);
  };
  tick();
}

export {};
