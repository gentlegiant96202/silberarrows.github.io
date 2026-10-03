/*
 * Short links shared over WhatsApp open inside WhatsApp's in-app browser,
 * which never hands plain https links to the Google Maps app. These pages
 * detect the phone and jump to the app (Android intent / iOS URL scheme),
 * falling back to the normal web URL when the app is missing.
 */

export type AppLinkTarget = {
  title: string;
  webUrl: string;
  androidUrl: string;
  iosUrl: string;
  buttonLabel: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function appLinkResponse(req: Request, target: AppLinkTarget): Response {
  const ua = req.headers.get("user-agent") ?? "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  if (!isAndroid && !isIOS) {
    return Response.redirect(target.webUrl, 302);
  }

  const appUrl = isAndroid ? target.androidUrl : target.iosUrl;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(target.title)}</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         background: #0b0b0c; color: #e8e6e1; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  main { text-align: center; padding: 24px; max-width: 360px; }
  p { color: #a9a9ad; font-size: 15px; line-height: 1.5; }
  a.btn { display: block; margin-top: 16px; padding: 14px 18px; border-radius: 999px; text-decoration: none;
          background: #e8e6e1; color: #0b0b0c; font-weight: 600; }
  a.alt { display: block; margin-top: 14px; color: #a9a9ad; font-size: 14px; }
</style>
</head>
<body>
<main>
  <h1 style="font-size:20px;font-weight:500">SilberArrows</h1>
  <p>Opening ${escapeHtml(target.title)}…</p>
  <a class="btn" href="${escapeHtml(appUrl)}">${escapeHtml(target.buttonLabel)}</a>
  <a class="alt" href="${escapeHtml(target.webUrl)}">Open in browser instead</a>
</main>
<script>
  var appUrl = ${JSON.stringify(appUrl)};
  var webUrl = ${JSON.stringify(target.webUrl)};
  var fallback = setTimeout(function () { window.location.href = webUrl; }, 1800);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearTimeout(fallback);
  });
  window.location.href = appUrl;
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
      Vary: "User-Agent",
    },
  });
}
