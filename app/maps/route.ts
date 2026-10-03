import { appLinkResponse } from "@/lib/appLinkPage";
import { googleBusiness, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const webUrl = site.googleMaps.profile;
  const { lat, lng } = site.geo;

  return appLinkResponse(req, {
    title: "Google Maps",
    heading: "Find us on Google Maps",
    webUrl,
    androidUrl: `intent://maps.google.com/?cid=${googleBusiness.cid}#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `comgooglemaps://?q=${encodeURIComponent(googleBusiness.name)}&center=${lat},${lng}`,
    buttonLabel: "Open in Google Maps",
    embedUrl: site.googleMaps.embed,
    androidHelp:
      "Tap the button above. If this page is still showing, tap the ⋮ menu at the top right and choose “Open in Chrome”, then tap the button again.",
    iosHelp:
      "Tap the button above and choose “Open” when asked. If nothing happens, tap the compass or ⋯ icon at the bottom of the screen and choose “Open in Safari”, then tap the button again.",
  });
}
