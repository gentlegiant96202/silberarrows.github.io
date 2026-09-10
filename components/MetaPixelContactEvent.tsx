"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import "@/lib/meta-pixel"; // window.fbq typing

/**
 * Browser half of the form-lead event, fired once on the thank-you page.
 *
 * `?eid=` is the same id /api/lead already sent to the Conversions API, so
 * Meta deduplicates the Pixel `Lead` against the server `Lead`. Without an
 * eid (direct visit / stripped params) fall back to a softer `Contact`.
 *
 * `?offer=` (set by the modal when the lead came from an offer) is attached
 * as `content_ids` so the Pixel Lead is attributable to that offer, matching
 * the custom_data the server sent.
 *
 * Must be rendered inside <Suspense> (uses useSearchParams).
 */
export function MetaPixelContactEvent() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (typeof window === "undefined" || !window.fbq) return;

    firedRef.current = true;
    const eid = searchParams.get("eid");
    const offer = searchParams.get("offer");

    const customData = offer
      ? { content_ids: [offer], content_category: "offer", offer }
      : {};

    if (eid) {
      window.fbq("track", "Lead", customData, { eventID: eid });
    } else {
      window.fbq("track", "Contact", customData);
    }
  }, [searchParams]);

  return null;
}
