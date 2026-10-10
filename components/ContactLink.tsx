"use client";

import { fireGoogleAdsConversion, GADS_LABELS } from "@/lib/gtag";
import { trackMetaContact, type ContactKind } from "@/lib/meta-pixel";
import { trackOpenAILead } from "@/lib/openai-pixel";
import { trackOfferSelect, type LeadContext } from "@/lib/analytics";
import { useChatGPTWhatsAppHref } from "@/lib/chatgpt-landing";

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
 *  - OpenAI / ChatGPT Ads (browser Pixel `lead_created` + Conversions API
 *    `lead_created`, reusing the Meta event id for deduplication)
 *  - GA4 / GTM `select_promotion` when an offer context is supplied
 *
 * Generic WhatsApp links switch to the "found you on ChatGPT" message for
 * visits that started on /chatgpt (see lib/chatgpt-landing.ts).
 */
export function ContactLink({
  kind,
  context,
  children,
  onClick,
  href,
  ...props
}: ContactLinkProps) {
  const resolvedHref = useChatGPTWhatsAppHref(
    href,
    kind === "whatsapp" && !context
  );

  return (
    <a
      {...props}
      href={resolvedHref}
      onClick={(e) => {
        fireGoogleAdsConversion(
          kind === "whatsapp" ? GADS_LABELS.whatsapp : GADS_LABELS.phone
        );
        const eventId = trackMetaContact(kind, context);
        if (eventId) trackOpenAILead(eventId);
        if (context) trackOfferSelect(context, kind);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
