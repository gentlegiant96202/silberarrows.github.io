import {
  type AdsSnapshotRow,
  type AdsCampaign,
  type AdsDay,
  type SearchTermSuggestion,
  totalsFromCampaigns,
  fmtCurrency,
  fmtNumber,
  fmtPct,
} from "@/lib/adsDashboard";

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const days = Math.floor(diff / 86_400_000);
  if (days > 1) return `${days} days ago`;
  if (days === 1) return "yesterday";
  const hours = Math.floor(diff / 3_600_000);
  if (hours >= 1) return `${hours}h ago`;
  const mins = Math.max(1, Math.floor(diff / 60_000));
  return `${mins}m ago`;
}

function Delta({
  current,
  previous,
  betterWhen = "higher",
  kind = "number",
  currency = "AED",
}: {
  current: number;
  previous: number | undefined;
  betterWhen?: "higher" | "lower" | "neutral";
  kind?: "number" | "currency" | "percent";
  currency?: string;
}) {
  if (previous === undefined) return null;
  const diff = current - previous;
  if (Math.abs(diff) < 1e-9) {
    return <span className="text-xs text-silver-600">no change</span>;
  }
  const up = diff > 0;
  const good =
    betterWhen === "neutral" ? null : betterWhen === "higher" ? up : !up;
  const color =
    good === null
      ? "text-silver-500"
      : good
        ? "text-emerald-400"
        : "text-red-400";
  const mag =
    kind === "currency"
      ? fmtCurrency(Math.abs(diff), currency)
      : kind === "percent"
        ? fmtPct(Math.abs(diff))
        : fmtNumber(Math.abs(diff));
  return (
    <span className={`text-xs ${color}`}>
      {up ? "▲" : "▼"} {mag}
    </span>
  );
}

function KpiCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
      <p className="text-[11px] uppercase tracking-wider text-silver-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-silver-100">{value}</p>
      {delta ? <div className="mt-1">{delta}</div> : null}
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-silver-300">
          {title}
        </h2>
        {hint ? <p className="text-xs text-silver-600">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-500 bg-ink-900/40 px-4 py-6 text-center text-sm text-silver-600">
      {children}
    </div>
  );
}

function Sparkline({
  points,
  color,
}: {
  points: number[];
  color: string;
}) {
  if (points.length < 2) return null;
  const w = 160;
  const h = 36;
  const max = Math.max(...points, 1);
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(h - (p / max) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

const suggestionStyle: Record<SearchTermSuggestion, string> = {
  harvest: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  negative: "border-red-500/30 bg-red-500/10 text-red-300",
  watch: "border-ink-400 bg-ink-700 text-silver-400",
};

function assetLabelStyle(label: string): string {
  const l = label.toUpperCase();
  if (l === "BEST") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  if (l === "GOOD") return "border-silver-500/30 bg-ink-700 text-silver-200";
  if (l === "LOW") return "border-red-500/30 bg-red-500/10 text-red-300";
  return "border-ink-400 bg-ink-700 text-silver-500";
}

const th = "px-3 py-2 text-left font-medium text-silver-500";
const td = "px-3 py-2 text-silver-200";
const tdNum = "px-3 py-2 text-right tabular-nums text-silver-200";
const thNum = "px-3 py-2 text-right font-medium text-silver-500";

export function Dashboard({
  current,
  previous,
}: {
  current: AdsSnapshotRow;
  previous: AdsSnapshotRow | null;
}) {
  const data = current.data;
  const prev = previous?.data;
  const currency = data.account?.currency ?? "AED";

  const totals = totalsFromCampaigns(data.campaigns);
  const prevTotals = prev ? totalsFromCampaigns(prev.campaigns) : undefined;

  const prevCampaignById = new Map<string, AdsCampaign>(
    (prev?.campaigns ?? []).map((c) => [c.id, c]),
  );

  const topKeywords = [...data.keywords]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 15);
  const wasted = data.keywords.filter((k) => k.cost > 0 && k.conversions === 0);
  const wastedSpend = wasted.reduce((a, k) => a + k.cost, 0);

  const trend: AdsDay[] = data.dailyTrend ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-silver-600">
            SilberArrows · Google Ads
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-silver-100">
            Performance Dashboard
          </h1>
          <p className="mt-1 text-sm text-silver-500">
            {data.range?.label ?? "Latest"} · snapshot {current.snapshot_date} ·
            pulled {timeAgo(current.pulled_at)}
            {previous ? ` · vs ${previous.snapshot_date}` : ""}
          </p>
        </div>
        <form action="/api/ads-auth" method="post">
          <input type="hidden" name="action" value="logout" />
          <button
            type="submit"
            className="rounded-md border border-ink-500 px-3 py-1.5 text-xs text-silver-400 transition hover:border-silver-500 hover:text-silver-200"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* KPI summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <KpiCard
          label="Spend"
          value={fmtCurrency(totals.cost, currency)}
          delta={
            <Delta current={totals.cost} previous={prevTotals?.cost} betterWhen="neutral" kind="currency" currency={currency} />
          }
        />
        <KpiCard
          label="Leads (conv.)"
          value={fmtNumber(totals.conversions)}
          delta={<Delta current={totals.conversions} previous={prevTotals?.conversions} betterWhen="higher" />}
        />
        <KpiCard
          label="Cost / lead"
          value={totals.conversions > 0 ? fmtCurrency(totals.costPerConv, currency) : "—"}
          delta={prevTotals && prevTotals.conversions > 0 && totals.conversions > 0 ? (
            <Delta current={totals.costPerConv} previous={prevTotals.costPerConv} betterWhen="lower" kind="currency" currency={currency} />
          ) : undefined}
        />
        <KpiCard
          label="Clicks"
          value={fmtNumber(totals.clicks)}
          delta={<Delta current={totals.clicks} previous={prevTotals?.clicks} betterWhen="higher" />}
        />
        <KpiCard
          label="Impressions"
          value={fmtNumber(totals.impressions)}
          delta={<Delta current={totals.impressions} previous={prevTotals?.impressions} betterWhen="higher" />}
        />
        <KpiCard
          label="CTR"
          value={fmtPct(totals.ctr)}
          delta={<Delta current={totals.ctr} previous={prevTotals?.ctr} betterWhen="higher" kind="percent" />}
        />
      </div>

      {/* Actions */}
      {data.actions && data.actions.length > 0 ? (
        <Section title="This session's actions" hint="what to do before the next pull">
          <ul className="space-y-2 rounded-xl border border-ink-500 bg-ink-800/60 p-4">
            {data.actions.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-silver-200">
                <span className="mt-0.5 text-silver-600">▢</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Conversions by action */}
      <Section title="Conversions by action" hint="Web Form Lead = primary (drives bidding)">
        {data.conversionsByAction && data.conversionsByAction.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {data.conversionsByAction.map((c) => (
              <div key={c.name} className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
                <p className="text-sm text-silver-300">{c.name}</p>
                <p className="mt-1 text-2xl font-semibold text-silver-100">{fmtNumber(c.conversions)}</p>
                {c.value ? <p className="text-xs text-silver-500">{fmtCurrency(c.value, currency)} value</p> : null}
              </div>
            ))}
          </div>
        ) : (
          <Empty>No conversions recorded yet. They appear here once the gtag actions fire.</Empty>
        )}
      </Section>

      {/* Campaigns */}
      <Section title="Campaigns" hint="Brand and Service are judged separately — never blended">
        <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-b border-ink-500 text-xs">
              <tr>
                <th className={th}>Campaign</th>
                <th className={thNum}>Spend</th>
                <th className={thNum}>Impr.</th>
                <th className={thNum}>Clicks</th>
                <th className={thNum}>CTR</th>
                <th className={thNum}>Avg CPC</th>
                <th className={thNum}>Leads</th>
                <th className={thNum}>CPL</th>
                <th className={thNum}>Impr. share</th>
                <th className={thNum}>Lost (budget)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-600">
              {data.campaigns.map((c) => {
                const p = prevCampaignById.get(c.id);
                return (
                  <tr key={c.id}>
                    <td className={td}>
                      <span className="block text-silver-100">{c.name}</span>
                      <span className="text-xs text-silver-600">{c.status}</span>
                    </td>
                    <td className={tdNum}>
                      {fmtCurrency(c.cost, currency)}
                      <div><Delta current={c.cost} previous={p?.cost} betterWhen="neutral" kind="currency" currency={currency} /></div>
                    </td>
                    <td className={tdNum}>{fmtNumber(c.impressions)}</td>
                    <td className={tdNum}>{fmtNumber(c.clicks)}</td>
                    <td className={tdNum}>{fmtPct(c.ctr)}</td>
                    <td className={tdNum}>{c.avgCpc > 0 ? fmtCurrency(c.avgCpc, currency) : "—"}</td>
                    <td className={tdNum}>
                      {fmtNumber(c.conversions)}
                      <div><Delta current={c.conversions} previous={p?.conversions} betterWhen="higher" /></div>
                    </td>
                    <td className={tdNum}>{c.conversions > 0 ? fmtCurrency(c.costPerConv, currency) : "—"}</td>
                    <td className={tdNum}>{fmtPct(c.searchImpressionShare)}</td>
                    <td className={tdNum}>{fmtPct(c.lostIsBudget)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Trend */}
      <Section title="Daily trend" hint="spend & leads per day">
        {trend.length >= 2 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
              <p className="text-xs uppercase tracking-wider text-silver-500">Spend</p>
              <div className="mt-2"><Sparkline points={trend.map((d) => d.cost)} color="#aeaeb3" /></div>
              <p className="mt-1 text-xs text-silver-600">{trend[0].date} → {trend[trend.length - 1].date}</p>
            </div>
            <div className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
              <p className="text-xs uppercase tracking-wider text-silver-500">Leads</p>
              <div className="mt-2"><Sparkline points={trend.map((d) => d.conversions)} color="#34d399" /></div>
              <p className="mt-1 text-xs text-silver-600">{fmtNumber(trend.reduce((a, d) => a + d.conversions, 0))} total in range</p>
            </div>
          </div>
        ) : (
          <Empty>Daily trend builds up once the campaigns have a few days of spend.</Empty>
        )}
      </Section>

      {/* Ad groups */}
      <Section title="Ad groups" hint="which intent funds the high-value jobs">
        <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-ink-500 text-xs">
              <tr>
                <th className={th}>Ad group</th>
                <th className={th}>Campaign</th>
                <th className={thNum}>Spend</th>
                <th className={thNum}>Clicks</th>
                <th className={thNum}>Leads</th>
                <th className={thNum}>CPL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-600">
              {data.adGroups.map((g, i) => (
                <tr key={`${g.campaign}-${g.name}-${i}`}>
                  <td className={`${td} text-silver-100`}>{g.name}</td>
                  <td className={`${td} text-xs text-silver-500`}>{g.campaign}</td>
                  <td className={tdNum}>{fmtCurrency(g.cost, currency)}</td>
                  <td className={tdNum}>{fmtNumber(g.clicks)}</td>
                  <td className={tdNum}>{fmtNumber(g.conversions)}</td>
                  <td className={tdNum}>{g.conversions > 0 ? fmtCurrency(g.costPerConv, currency) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Keywords */}
      <Section title="Top keywords" hint={`by spend · ${wasted.length} burning budget with 0 leads (${fmtCurrency(wastedSpend, currency)})`}>
        {topKeywords.some((k) => k.cost > 0) ? (
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>Keyword</th>
                  <th className={th}>Match</th>
                  <th className={thNum}>QS</th>
                  <th className={thNum}>Spend</th>
                  <th className={thNum}>Clicks</th>
                  <th className={thNum}>Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {topKeywords.map((k, i) => (
                  <tr key={`${k.text}-${k.matchType}-${i}`} className={k.cost > 0 && k.conversions === 0 ? "bg-red-500/5" : undefined}>
                    <td className={`${td} text-silver-100`}>{k.text}</td>
                    <td className={`${td} text-xs text-silver-500`}>{k.matchType}</td>
                    <td className={tdNum}>{k.qualityScore ?? "—"}</td>
                    <td className={tdNum}>{fmtCurrency(k.cost, currency)}</td>
                    <td className={tdNum}>{fmtNumber(k.clicks)}</td>
                    <td className={tdNum}>{fmtNumber(k.conversions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>{data.keywords.length} keywords live, no spend yet. Cost & quality-score data appears here after the first clicks.</Empty>
        )}
      </Section>

      {/* Search terms */}
      <Section title="Search terms → actions" hint="the #1 weekly lever: harvest winners, block waste">
        {data.searchTerms && data.searchTerms.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>Search term</th>
                  <th className={thNum}>Spend</th>
                  <th className={thNum}>Clicks</th>
                  <th className={thNum}>Leads</th>
                  <th className={th}>Suggestion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {data.searchTerms.map((s, i) => (
                  <tr key={`${s.term}-${i}`}>
                    <td className={`${td} text-silver-100`}>{s.term}</td>
                    <td className={tdNum}>{fmtCurrency(s.cost, currency)}</td>
                    <td className={tdNum}>{fmtNumber(s.clicks)}</td>
                    <td className={tdNum}>{fmtNumber(s.conversions)}</td>
                    <td className={td}>
                      {s.suggestion ? (
                        <span className={`rounded-full border px-2 py-0.5 text-xs capitalize ${suggestionStyle[s.suggestion]}`}>
                          {s.suggestion}
                        </span>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>No search-term data yet. Once searches trigger the ads, this is where we harvest keywords and add negatives.</Empty>
        )}
      </Section>

      {/* RSA assets */}
      <Section title="Ad asset grades" hint="swap LOW headlines / descriptions">
        {data.assets && data.assets.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>Asset</th>
                  <th className={th}>Type</th>
                  <th className={th}>Ad group</th>
                  <th className={th}>Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {data.assets.map((a, i) => (
                  <tr key={`${a.text}-${i}`}>
                    <td className={`${td} text-silver-100`}>{a.text}</td>
                    <td className={`${td} text-xs text-silver-500`}>{a.type}</td>
                    <td className={`${td} text-xs text-silver-500`}>{a.adGroup}</td>
                    <td className={td}>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${assetLabelStyle(a.performanceLabel)}`}>
                        {a.performanceLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>Asset grades (LOW / GOOD / BEST) appear after the RSAs accrue enough impressions.</Empty>
        )}
      </Section>

      {data.notes ? (
        <p className="mt-10 border-t border-ink-600 pt-4 text-xs text-silver-600">{data.notes}</p>
      ) : null}
    </main>
  );
}
