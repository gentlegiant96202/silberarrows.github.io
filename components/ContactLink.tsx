"use client";

import { fireGoogleAdsConversion, GADS_LABELS } from "@/lib/gtag";

type ContactKind = "whatsapp" | "phone";

type ContactLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  kind: ContactKind;
};

export function ContactLink({ kind, children, onClick, ...props }: ContactLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        fireGoogleAdsConversion(
          kind === "whatsapp" ? GADS_LABELS.whatsapp : GADS_LABELS.phone
        );
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
