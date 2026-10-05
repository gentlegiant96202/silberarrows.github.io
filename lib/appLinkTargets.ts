import type { AppLinkTarget } from "@/lib/appLinkPage";
import { googleBusiness, showroomBusiness, site } from "@/lib/site";

export type LinkedBusiness = {
  label: string;
  name: string;
  cid: string;
  placeId: string;
  geo: { lat: number; lng: number };
};

export const serviceCentreLink: LinkedBusiness = {
  label: "Mercedes-Benz Service Centre",
  ...googleBusiness,
  geo: site.geo,
};

export const showroomLink: LinkedBusiness = {
  label: "Mercedes-Benz Showroom & Leasing",
  ...showroomBusiness,
};

/** Only the CID form resolves to the business card; `q=place_id:` renders a blank map. */
function embedUrl(biz: LinkedBusiness): string {
  return `https://www.google.com/maps?cid=${biz.cid}&output=embed`;
}

export function googleMapsTarget(biz: LinkedBusiness): AppLinkTarget {
  const webUrl = `https://maps.google.com/?cid=${biz.cid}`;
  const { lat, lng } = biz.geo;

  return {
    eyebrow: biz.label,
    title: "Google Maps",
    heading: "Find us on Google Maps",
    webUrl,
    androidUrl: `intent://maps.google.com/?cid=${biz.cid}#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `comgooglemaps://?q=${encodeURIComponent(biz.name)}&center=${lat},${lng}`,
    buttonLabel: "Open in Google Maps",
    embedUrl: embedUrl(biz),
    embedTitle: "SilberArrows on Google Maps",
    androidHelp:
      "Tap the button above. If this page is still showing, tap the ⋮ menu at the top right and choose “Open in Chrome”, then tap the button again.",
    iosHelp:
      "Tap the button above and choose “Open” when asked. If nothing happens, tap the compass or ⋯ icon at the bottom of the screen and choose “Open in Safari”, then tap the button again.",
  };
}

// Waze resolves `google_place_id` to the same business as the Google
// profile; `ll` is the profile pin, used if the place id isn't matched.
export function wazeTarget(biz: LinkedBusiness): AppLinkTarget {
  const { lat, lng } = biz.geo;
  const query = `google_place_id=${biz.placeId}&ll=${lat},${lng}&navigate=yes`;
  const webUrl = `https://www.waze.com/ul?${query}`;

  return {
    eyebrow: biz.label,
    title: "Waze",
    heading: "Drive to us with Waze",
    webUrl,
    androidUrl: `intent://www.waze.com/ul?${query}#Intent;scheme=https;package=com.waze;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `waze://?${query}`,
    buttonLabel: "Open in Waze",
    embedUrl: embedUrl(biz),
    embedTitle: "SilberArrows on the map",
    androidHelp:
      "Tap the button above. If this page is still showing, tap the ⋮ menu at the top right and choose “Open in Chrome”, then tap the button again. If Waze isn't installed, the Waze web map opens instead.",
    iosHelp:
      "Tap the button above and choose “Open” when asked. If nothing happens, tap the compass or ⋯ icon at the bottom of the screen and choose “Open in Safari”, then tap the button again. If Waze isn't installed, the Waze web map opens instead.",
  };
}

// Reviews need a signed-in Google session, which the in-app browser lacks,
// so this opens the phone's main browser rather than the Maps app.
export function reviewTarget(biz: LinkedBusiness): AppLinkTarget {
  const path = `search.google.com/local/writereview?placeid=${biz.placeId}`;
  const webUrl = `https://${path}`;

  return {
    eyebrow: biz.label,
    title: "the Google review page",
    heading: "Thank you for choosing SilberArrows",
    webUrl,
    androidUrl: `intent://${path}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `x-safari-https://${path}`,
    buttonLabel: "Leave a Google review",
    embedUrl: embedUrl(biz),
    embedTitle: "SilberArrows on Google Maps",
    androidHelp:
      "Tap the button above. If this page is still showing, tap the ⋮ menu at the top right and choose “Open in Chrome”, then tap the button again. You'll need to be signed in to your Google account.",
    iosHelp:
      "Tap the button above and choose “Open” when asked. If nothing happens, tap the compass or ⋯ icon at the bottom of the screen and choose “Open in Safari”, then tap the button again. You'll need to be signed in to your Google account.",
  };
}
