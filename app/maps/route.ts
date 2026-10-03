import { appLinkResponse } from "@/lib/appLinkPage";
import { googleBusiness, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const webUrl = site.googleMaps.profile;
  const { lat, lng } = site.geo;

  return appLinkResponse(req, {
    title: "Google Maps",
    webUrl,
    androidUrl: `intent://maps.google.com/?cid=${googleBusiness.cid}#Intent;scheme=https;package=com.google.android.apps.maps;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `comgooglemaps://?q=${encodeURIComponent(googleBusiness.name)}&center=${lat},${lng}`,
    buttonLabel: "Open in Google Maps",
  });
}
