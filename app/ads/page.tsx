import { getLatestSnapshots } from "@/lib/adsDashboard";
import { Dashboard } from "@/components/ads/Dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function StateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-silver-600">
        SilberArrows · Google Ads
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-silver-100">{title}</h1>
      <div className="mt-4 rounded-xl border border-ink-500 bg-ink-800/60 p-5 text-sm leading-relaxed text-silver-300">
        {children}
      </div>
    </main>
  );
}

export default async function AdsPage() {
  const { configured, current, previous, error } = await getLatestSnapshots();

  if (!configured) {
    return (
      <StateCard title="Almost there">
        <p>
          The dashboard is built, but it can&apos;t reach Supabase yet. Add{" "}
          <code className="font-mono text-silver-100">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          to the environment (local <code className="font-mono">.env.local</code> and
          Vercel), then redeploy.
        </p>
      </StateCard>
    );
  }

  if (error) {
    return (
      <StateCard title="Couldn&apos;t load data">
        <p>Supabase returned an error:</p>
        <pre className="mt-2 overflow-x-auto rounded bg-ink-950 p-3 text-xs text-red-300">{error}</pre>
        <p className="mt-2 text-silver-500">
          Most likely the <code className="font-mono">ads_snapshots</code> table
          doesn&apos;t exist yet — run{" "}
          <code className="font-mono">supabase/migrations/0001_ads_snapshots.sql</code>{" "}
          in the Supabase SQL editor.
        </p>
      </StateCard>
    );
  }

  if (!current) {
    return (
      <StateCard title="No snapshots yet">
        <p>
          The table is ready but empty. Ask the agent to &quot;pull the latest
          ads numbers,&quot; or run the snapshot script locally:
        </p>
        <pre className="mt-2 overflow-x-auto rounded bg-ink-950 p-3 text-xs text-silver-200">
          node scripts/ads-snapshot.mjs data/ads/2026-06-02.json
        </pre>
      </StateCard>
    );
  }

  return <Dashboard current={current} previous={previous} />;
}
