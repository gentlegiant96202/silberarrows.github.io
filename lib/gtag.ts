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

export function fireGoogleAdsConversion(
  label?: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!GOOGLE_ADS_ID || !label) return;

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...params,
  });
}

// gtag loads via strategy="lazyOnload", so on a freshly loaded page (e.g. the
// thank-you page right after redirect) window.gtag may not exist yet. Poll for
// it briefly so the conversion isn't dropped.
export function fireGoogleAdsConversionWhenReady(
  label?: string,
  params?: Record<string, unknown>,
  timeoutMs = 10000
) {
  if (typeof window === "undefined") return;
  if (!GOOGLE_ADS_ID || !label) return;

  const start = Date.now();
  const tick = () => {
    if (typeof window.gtag === "function") {
      fireGoogleAdsConversion(label, params);
      return;
    }
    if (Date.now() - start > timeoutMs) return;
    window.setTimeout(tick, 200);
  };
  tick();
}

export {};
