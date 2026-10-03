/*
 * Short links shared over WhatsApp open inside WhatsApp's in-app browser,
 * which never hands plain https links to the Google Maps app. These pages
 * detect the phone and jump to the app (Android intent / iOS URL scheme),
 * falling back to the normal web URL when the app is missing. The page body
 * only stays on screen when that hand-off fails, so it carries the retry
 * button and per-platform instructions.
 */

export type AppLinkTarget = {
  title: string;
  heading: string;
  webUrl: string;
  androidUrl: string;
  iosUrl: string;
  buttonLabel: string;
  embedUrl: string;
  embedTitle: string;
  androidHelp: string;
  iosHelp: string;
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
  const help = isAndroid ? target.androidHelp : target.iosHelp;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#050505">
<title>${escapeHtml(target.title)} | SilberArrows</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: radial-gradient(ellipse at top, #1a1a1d 0%, #050505 60%);
         color: #e8e6e1; font-family: "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
         -webkit-font-smoothing: antialiased; }
  main { max-width: 440px; margin: 0 auto; padding: 32px 20px calc(32px + env(safe-area-inset-bottom)); }
  .logo { display: block; height: 28px; width: auto; margin: 0 auto 28px; }
  .eyebrow { margin: 0; text-align: center; font-size: 11px; font-weight: 600; letter-spacing: 0.32em;
             text-transform: uppercase; color: #b9b8b4; }
  h1 { margin: 10px 0 0; text-align: center; font-size: 26px; font-weight: 400; line-height: 1.15; color: #f4f2ec; }
  .map { position: relative; margin-top: 24px; aspect-ratio: 4 / 3; overflow: hidden;
         border: 1px solid rgba(255,255,255,0.12); background: #111113; }
  .map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  .btn { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 20px; height: 56px;
         text-decoration: none; background: linear-gradient(180deg, #f4f2ec, #cfcdc7); color: #0b0b0c;
         font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .btn svg { flex-shrink: 0; }
  .help { margin-top: 18px; padding: 16px; border: 1px solid rgba(255,255,255,0.08); background: #0e0e10;
          font-size: 14px; line-height: 1.55; color: #b9b8b4; }
  .help strong { display: block; margin-bottom: 4px; font-size: 12px; letter-spacing: 0.16em;
                 text-transform: uppercase; color: #e8e6e1; }
  .alt { display: block; margin-top: 18px; text-align: center; font-size: 13px; color: #8e8d89; }
  .status { margin: 14px 0 0; text-align: center; font-size: 13px; color: #8e8d89; }
</style>
</head>
<body>
<main>
  <img class="logo" src="/assets/icons/silberarrows-logo.png" alt="SilberArrows">
  <p class="eyebrow">Mercedes-Benz Service Centre</p>
  <h1>${escapeHtml(target.heading)}</h1>
  <p class="status">Opening ${escapeHtml(target.title)}…</p>

  <div class="map">
    <iframe src="${escapeHtml(target.embedUrl)}" title="${escapeHtml(target.embedTitle)}" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  </div>

  <a class="btn" href="${escapeHtml(appUrl)}">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/>
    </svg>
    ${escapeHtml(target.buttonLabel)}
  </a>

  <div class="help">
    <strong>Didn't open?</strong>
    ${escapeHtml(help)}
  </div>

  <a class="alt" href="${escapeHtml(target.webUrl)}">Continue in this browser instead</a>
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
