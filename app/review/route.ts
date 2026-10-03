import { appLinkResponse } from "@/lib/appLinkPage";
import { googleBusiness, site } from "@/lib/site";

export const dynamic = "force-dynamic";

// Reviews need a signed-in Google session, which the in-app browser lacks,
// so this opens the phone's main browser rather than the Maps app.
export function GET(req: Request) {
  const path = `search.google.com/local/writereview?placeid=${googleBusiness.placeId}`;
  const webUrl = `https://${path}`;

  return appLinkResponse(req, {
    title: "the Google review page",
    heading: "Thank you for choosing SilberArrows",
    webUrl,
    androidUrl: `intent://${path}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `x-safari-https://${path}`,
    buttonLabel: "Leave a Google review",
    embedUrl: site.googleMaps.embed,
    androidHelp:
      "Tap the button above. If this page is still showing, tap the ⋮ menu at the top right and choose “Open in Chrome”, then tap the button again. You'll need to be signed in to your Google account.",
    iosHelp:
      "Tap the button above and choose “Open” when asked. If nothing happens, tap the compass or ⋯ icon at the bottom of the screen and choose “Open in Safari”, then tap the button again. You'll need to be signed in to your Google account.",
  });
}
