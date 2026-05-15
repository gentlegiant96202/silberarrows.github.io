import { site } from "@/lib/site";

const ENDPOINT = "https://api.indexnow.org/IndexNow";

type PingResult =
  | { ok: true; status: number; submitted: number }
  | { ok: false; reason: "no-key" | "no-urls" | "error"; status?: number };

/**
 * Notify IndexNow-compatible search engines (Bing, Yandex, Seznam, Naver,
 * Yep, …) that the given URLs have changed.
 *
 * Returns immediately if `INDEXNOW_KEY` is not configured (e.g. local dev,
 * preview deploys) so callers can fire-and-forget without guard logic.
 *
 * The key is a possession-proof token, not a secret — it is served as
 * plain text at /indexnow/<key> on this host and IndexNow fetches it to
 * confirm the request originated from the domain owner.
 */
export async function pingIndexNow(urls: string[]): Promise<PingResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return { ok: false, reason: "no-key" };

  const hostUrl = new URL(site.url);
  const host = hostUrl.host;
  const urlList = Array.from(
    new Set(
      urls
        .map((u) => (u.startsWith("http") ? u : `${site.url}${u.startsWith("/") ? "" : "/"}${u}`))
        // Only submit URLs that live on this host — IndexNow rejects mixed-host batches.
        .filter((u) => {
          try {
            return new URL(u).host === host;
          } catch {
            return false;
          }
        })
    )
  );

  if (urlList.length === 0) return { ok: false, reason: "no-urls" };

  const keyLocation = `${site.url}/indexnow/${key}`;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ host, key, keyLocation, urlList }),
      // Don't let a slow IndexNow response stall the revalidate webhook.
      signal: AbortSignal.timeout(5_000),
    });
    return { ok: true, status: res.status, submitted: urlList.length };
  } catch (err) {
    console.error("[indexnow] ping failed:", err);
    return { ok: false, reason: "error" };
  }
}
