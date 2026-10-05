import { appLinkResponse } from "@/lib/appLinkPage";
import { reviewTarget, showroomLink } from "@/lib/appLinkTargets";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return appLinkResponse(req, reviewTarget(showroomLink));
}
