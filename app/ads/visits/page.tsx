import { getAdVisits } from "@/lib/adVisits";
import { getLatestSnapshots } from "@/lib/adsDashboard";
import { VisitsReport } from "@/components/ads/VisitsReport";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_DAYS = new Set([7, 14, 30]);

function StateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-silver-600">SilberArrows · Google Ads</p>
      <h1 className="mt-1 text-2xl font-semibold text-silver-100">{title}</h1>
      <div className="mt-4 rounded-xl border border-ink-500 bg-ink-800/60 p-5 text-sm leading-relaxed text-silver-300">
        {children}
      </div>
    </main>
  );
}

export default async function AdsVisitsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const params = await searchParams;
  const requested = Number(params.days);
  const days = ALLOWED_DAYS.has(requested) ? requested : 14;

  // Campaign ids → names come from the latest Google Ads snapshot so the
  // ValueTrack {campaignid} in each visit reads as "Service" / "Brand".
  const [visits, snapshots] = await Promise.all([getAdVisits(days), getLatestSnapshots()]);

  if (!visits.configured) {
    return (
      <StateCard title="Almost there">
        <p>
          The visit log can&apos;t reach Supabase yet. Add{" "}
          <code className="font-mono text-silver-100">SUPABASE_SERVICE_ROLE_KEY</code> to the
          environment (local <code className="font-mono">.env.local</code> and Vercel), then redeploy.
        </p>
      </StateCard>
    );
  }

  if (visits.error) {
    return (
      <StateCard title="Couldn&apos;t load data">
        <p>Supabase returned an error:</p>
        <pre className="mt-2 overflow-x-auto rounded bg-ink-950 p-3 text-xs text-red-300">{visits.error}</pre>
        <p className="mt-2 text-silver-500">
          Most likely the <code className="font-mono">ad_visits</code> table doesn&apos;t exist yet — run{" "}
          <code className="font-mono">supabase/migrations/0003_ad_visits.sql</code> in the Supabase SQL
          editor.
        </p>
      </StateCard>
    );
  }

  const campaignNames: Record<string, string> = {};
  for (const c of snapshots.current?.data.campaigns ?? []) {
    campaignNames[c.id] = c.name.includes("Brand") ? "Brand" : c.name.includes("Service") ? "Service" : c.name;
  }

  return <VisitsReport rows={visits.rows} days={days} campaignNames={campaignNames} />;
}
