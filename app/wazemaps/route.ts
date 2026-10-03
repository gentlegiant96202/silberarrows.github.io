import { appLinkResponse } from "@/lib/appLinkPage";
import { googleBusiness, site } from "@/lib/site";

export const dynamic = "force-dynamic";

// Waze resolves `google_place_id` to the same business as the Google
// profile; `ll` is the profile pin, used if the place id isn't matched.
export function GET(req: Request) {
  const { lat, lng } = site.geo;
  const query = `google_place_id=${googleBusiness.placeId}&ll=${lat},${lng}&navigate=yes`;
  const webUrl = `https://www.waze.com/ul?${query}`;

  return appLinkResponse(req, {
    title: "Waze",
    heading: "Drive to us with Waze",
    webUrl,
    androidUrl: `intent://www.waze.com/ul?${query}#Intent;scheme=https;package=com.waze;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `waze://?${query}`,
    buttonLabel: "Open in Waze",
    embedUrl: site.googleMaps.embed,
    embedTitle: "SilberArrows on the map",
    androidHelp:
      "Tap the button above. If this page is still showing, tap the ⋮ menu at the top right and choose “Open in Chrome”, then tap the button again. If Waze isn't installed, the Waze web map opens instead.",
    iosHelp:
      "Tap the button above and choose “Open” when asked. If nothing happens, tap the compass or ⋯ icon at the bottom of the screen and choose “Open in Safari”, then tap the button again. If Waze isn't installed, the Waze web map opens instead.",
  });
}
