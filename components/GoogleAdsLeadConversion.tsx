"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { fireGoogleAdsConversionWhenReady, GADS_LABELS } from "@/lib/gtag";

/**
 * Fires the Google Ads "Web Form Lead" conversion once on the thank-you page.
 *
 * The lead's event id (`?eid=`) — the same id used to dedupe the Meta Pixel /
 * CAPI Lead — is passed as `transaction_id`, so a refresh, back-navigation or
 * a shared thank-you URL doesn't count a second lead in Google Ads.
 *
 * Must be rendered inside <Suspense> (uses useSearchParams).
 */
export function GoogleAdsLeadConversion() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const eid = searchParams.get("eid");
    fireGoogleAdsConversionWhenReady(
      GADS_LABELS.lead,
      eid ? { transaction_id: eid } : undefined
    );
  }, [searchParams]);

  return null;
}
