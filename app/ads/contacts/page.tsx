import { getContactClicks } from "@/lib/contactClicks";
import { ContactsReport } from "@/components/ads/ContactsReport";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_DAYS = new Set([7, 14, 30]);

function StateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-silver-600">SilberArrows · Contacts</p>
      <h1 className="mt-1 text-2xl font-semibold text-silver-100">{title}</h1>
      <div className="mt-4 rounded-xl border border-ink-500 bg-ink-800/60 p-5 text-sm leading-relaxed text-silver-300">
        {children}
      </div>
    </main>
  );
}

export default async function AdsContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const params = await searchParams;
  const requested = Number(params.days);
  const days = ALLOWED_DAYS.has(requested) ? requested : 14;

  const clicks = await getContactClicks(days);

  if (!clicks.configured) {
    return (
      <StateCard title="Almost there">
        <p>
          The contact log can&apos;t reach Supabase yet. Add{" "}
          <code className="font-mono text-silver-100">SUPABASE_SERVICE_ROLE_KEY</code> to the
          environment (local <code className="font-mono">.env.local</code> and Vercel), then redeploy.
        </p>
      </StateCard>
    );
  }

  if (clicks.error) {
    return (
      <StateCard title="Couldn&apos;t load data">
        <p>Supabase returned an error:</p>
        <pre className="mt-2 overflow-x-auto rounded bg-ink-950 p-3 text-xs text-red-300">{clicks.error}</pre>
        <p className="mt-2 text-silver-500">
          Most likely the <code className="font-mono">contact_clicks</code> table doesn&apos;t exist
          yet — run{" "}
          <code className="font-mono">supabase/migrations/0004_contact_clicks.sql</code> in the
          Supabase SQL editor for the LEADS project.
        </p>
      </StateCard>
    );
  }

  return <ContactsReport rows={clicks.rows} days={days} />;
}
