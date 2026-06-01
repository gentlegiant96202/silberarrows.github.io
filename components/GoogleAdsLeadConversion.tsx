"use client";

import { useEffect, useRef } from "react";
import { fireGoogleAdsConversionWhenReady, GADS_LABELS } from "@/lib/gtag";

export function GoogleAdsLeadConversion() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    fireGoogleAdsConversionWhenReady(GADS_LABELS.lead);
  }, []);

  return null;
}
