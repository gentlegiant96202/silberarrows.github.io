"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackOpenAILead } from "@/lib/openai-pixel";

/**
 * Browser half of the OpenAI (ChatGPT Ads) form-lead conversion, fired once
 * on the thank-you page.
 *
 * `?eid=` is the id /api/lead already sent to the OpenAI Conversions API, so
 * the Pixel `lead_created` is deduplicated against the server event — a
 * refresh or shared thank-you URL doesn't add a lead. Without an eid (direct
 * visit) nothing is sent.
 *
 * Must be rendered inside <Suspense> (uses useSearchParams).
 */
export function OpenAILeadConversion() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    const eid = searchParams.get("eid");
    if (!eid) return;

    firedRef.current = true;
    trackOpenAILead(eid);
  }, [searchParams]);

  return null;
}
