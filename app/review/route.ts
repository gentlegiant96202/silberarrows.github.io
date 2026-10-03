import { appLinkResponse } from "@/lib/appLinkPage";
import { googleBusiness } from "@/lib/site";

export const dynamic = "force-dynamic";

// Reviews need a signed-in Google session, which the in-app browser lacks,
// so this opens the phone's main browser rather than the Maps app.
export function GET(req: Request) {
  const path = `search.google.com/local/writereview?placeid=${googleBusiness.placeId}`;
  const webUrl = `https://${path}`;

  return appLinkResponse(req, {
    title: "the Google review page",
    webUrl,
    androidUrl: `intent://${path}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`,
    iosUrl: `x-safari-https://${path}`,
    buttonLabel: "Leave a Google review",
  });
}
