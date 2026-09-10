"use client";

import { fireGoogleAdsConversion, GADS_LABELS } from "@/lib/gtag";
import { trackMetaContact, type ContactKind } from "@/lib/meta-pixel";
import { trackOfferSelect, type LeadContext } from "@/lib/analytics";

type ContactLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  kind: ContactKind;
  /**
   * Offer / campaign the click belongs to. Adds `content_ids` + the offer slug
   * to the Meta Contact event (Pixel + CAPI) and fires a GA4
   * `select_promotion`. Omit on generic site chrome.
   */
  context?: LeadContext;
};

/**
 * Anchor for tel: / wa.me links. Every Call / WhatsApp click is reported to:
 *  - Google Ads (gtag conversion, beacon transport)
 *  - Meta (browser Pixel `Contact` + Conversions API `Contact`, deduplicated
 *    by a shared event id)
 *  - GA4 / GTM `select_promotion` when an offer context is supplied
 */
export function ContactLink({
  kind,
  context,
  children,
  onClick,
  ...props
}: ContactLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        fireGoogleAdsConversion(
          kind === "whatsapp" ? GADS_LABELS.whatsapp : GADS_LABELS.phone
        );
        trackMetaContact(kind, context);
        if (context) trackOfferSelect(context, kind);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
