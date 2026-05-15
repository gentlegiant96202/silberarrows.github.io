import { NextResponse } from "next/server";

type RouteParams = { key: string };

/**
 * IndexNow key verification endpoint.
 *
 * IndexNow accepts a URL submission only if it can GET the key location
 * (returned by us in /api/revalidate's IndexNow ping) and find the key
 * value as plain text. The protocol mandates the key file URL look like
 * a `.txt` resource — Bing's validator returns 422 otherwise — so this
 * route accepts `<KEY>.txt` and 404s anything else.
 *
 * We serve the key directly from the environment so rotating it is a
 * one-line env-var change with no file-system edits.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<RouteParams> }
) {
  const { key: requested } = await params;
  const configured = process.env.INDEXNOW_KEY;
  if (!configured) {
    return new NextResponse("Not found", { status: 404 });
  }
  const expected = `${configured}.txt`;
  if (requested !== expected) {
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
