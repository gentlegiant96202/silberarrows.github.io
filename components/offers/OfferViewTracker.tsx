"use client";

import { useEffect, useRef } from "react";
import type { LeadContext } from "@/lib/analytics";
import { trackOfferView } from "@/lib/analytics";

/**
 * Fires the offer `view_promotion` (GA4), `offer_view` (GTM) and Meta
 * `ViewContent` once per page load. Rendered by the offer detail page.
 */
export function OfferViewTracker({ context }: { context: LeadContext }) {
  const firedFor = useRef<string | null>(null);

  useEffect(() => {
    if (firedFor.current === context.offer) return;
    firedFor.current = context.offer;
    trackOfferView(context);
  }, [context]);

  return null;
}
