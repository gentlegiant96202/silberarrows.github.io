import { NextResponse } from "next/server";

type RouteParams = { key: string };

/**
 * IndexNow key verification endpoint.
 *
 * IndexNow accepts a URL submission only if it can GET the key location
 * (returned by us in /api/revalidate's IndexNow ping) and find the key
 * value as plain text. We serve the key directly from the environment so
 * rotating it is a one-line env-var change with no file-system edits.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<RouteParams> }
) {
  const { key: requestedKey } = await params;
  const configured = process.env.INDEXNOW_KEY;
  if (!configured || requestedKey !== configured) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(configured, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
