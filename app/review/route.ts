import { appLinkResponse } from "@/lib/appLinkPage";
import { reviewTarget, serviceCentreLink } from "@/lib/appLinkTargets";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return appLinkResponse(req, reviewTarget(serviceCentreLink));
}
