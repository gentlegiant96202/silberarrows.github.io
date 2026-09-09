"use client";

import { fireGoogleAdsConversion, GADS_LABELS } from "@/lib/gtag";
import { trackMetaContact, type ContactKind } from "@/lib/meta-pixel";

type ContactLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  kind: ContactKind;
};

/**
 * Anchor for tel: / wa.me links. Every Call / WhatsApp click is reported to:
 *  - Google Ads (gtag conversion, beacon transport)
 *  - Meta (browser Pixel `Contact` + Conversions API `Contact`, deduplicated
 *    by a shared event id)
 */
export function ContactLink({ kind, children, onClick, ...props }: ContactLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        fireGoogleAdsConversion(
          kind === "whatsapp" ? GADS_LABELS.whatsapp : GADS_LABELS.phone
        );
        trackMetaContact(kind);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
