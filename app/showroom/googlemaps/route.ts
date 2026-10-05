import { appLinkResponse } from "@/lib/appLinkPage";
import { googleMapsTarget, showroomLink } from "@/lib/appLinkTargets";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return appLinkResponse(req, googleMapsTarget(showroomLink));
}
