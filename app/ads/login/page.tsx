import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Ads Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string; setup?: string }>;
}) {
  const { error, next, setup } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-silver-500">
            SilberArrows
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-silver-100">
            Ads Dashboard
          </h1>
          <p className="mt-1 text-sm text-silver-500">Internal · restricted access</p>
        </div>

        {setup ? (
          <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            Set <code className="font-mono">ADS_DASHBOARD_PASSWORD</code> in the
            environment to enable sign-in.
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            Incorrect password.
          </div>
        ) : null}

        <form
          action="/api/ads-auth"
          method="post"
          className="rounded-xl border border-ink-500 bg-ink-800/70 p-6 shadow-xl"
        >
          <input type="hidden" name="action" value="login" />
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <label
            htmlFor="password"
            className="block text-xs font-medium uppercase tracking-wider text-silver-500"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-ink-500 bg-ink-950 px-3 py-2 text-silver-100 outline-none focus:border-silver-500"
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-silver-100 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
