import { appLinkResponse } from "@/lib/appLinkPage";
import { showroomLink, wazeTarget } from "@/lib/appLinkTargets";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  return appLinkResponse(req, wazeTarget(showroomLink));
}
