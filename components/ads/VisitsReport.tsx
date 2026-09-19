import {
  type AdVisitRow,
  type AdVisitsSummary,
  type GroupStats,
  type IpStats,
  DEVICE_LABEL,
  MATCH_LABEL,
  NETWORK_LABEL,
  byHourDubai,
  fmtDuration,
  groupBy,
  hasContact,
  isEngaged,
  repeatIps,
  summarize,
} from "@/lib/adVisits";
import { fmtNumber, fmtPct } from "@/lib/adsDashboard";

/* ── shared bits (mirrors Dashboard.tsx styling) ────────────────────── */

const th = "px-3 py-2 text-left font-medium text-silver-500";
const td = "px-3 py-2 text-silver-200";
const tdNum = "px-3 py-2 text-right tabular-nums text-silver-200";
const thNum = "px-3 py-2 text-right font-medium text-silver-500";

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
      <p className="text-[11px] uppercase tracking-wider text-silver-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-silver-100">{value}</p>
      {sub ? <p className="mt-1 text-xs text-silver-600">{sub}</p> : null}
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-silver-300">{title}</h2>
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

function Pill({ tone, children }: { tone: "good" | "bad" | "warn" | "muted"; children: React.ReactNode }) {
  const cls =
    tone === "good"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      : tone === "bad"
        ? "border-red-500/30 bg-red-500/10 text-red-300"
        : tone === "warn"
          ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
          : "border-ink-400 bg-ink-700 text-silver-400";
  return <span className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${cls}`}>{children}</span>;
}

function fmtDubai(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function bounceTone(rate: number | null): "good" | "bad" | "warn" | "muted" {
  if (rate === null) return "muted";
  if (rate >= 0.8) return "bad";
  if (rate >= 0.6) return "warn";
  return "good";
}

/* ── group table ────────────────────────────────────────────────────── */

function GroupTable({
  rows,
  label,
  labelOf,
  minWidth = 640,
}: {
  rows: GroupStats[];
  label: string;
  labelOf?: (key: string) => string;
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead className="border-b border-ink-500 text-xs">
          <tr>
            <th className={th}>{label}</th>
            <th className={thNum}>Visits</th>
            <th className={thNum}>IPs</th>
            <th className={thNum}>No JS</th>
            <th className={thNum}>Bounce</th>
            <th className={thNum}>Median time</th>
            <th className={thNum}>Scroll</th>
            <th className={thNum}>Contacts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-600">
          {rows.map((g) => (
            <tr key={g.key} className={g.visits >= 3 && g.contacts === 0 && (g.bounceRate ?? 0) >= 0.8 ? "bg-red-500/5" : undefined}>
              <td className={`${td} text-silver-100`}>{labelOf ? labelOf(g.key) : g.key}</td>
              <td className={tdNum}>{fmtNumber(g.visits)}</td>
              <td className={tdNum}>{fmtNumber(g.ips)}</td>
              <td className={tdNum}>{g.noJs ? <span className="text-amber-300">{g.noJs}</span> : "0"}</td>
              <td className={tdNum}><Pill tone={bounceTone(g.bounceRate)}>{fmtPct(g.bounceRate, 0)}</Pill></td>
              <td className={tdNum}>{fmtDuration(g.medianActiveMs)}</td>
              <td className={tdNum}>{g.medianScroll === null ? "—" : `${Math.round(g.medianScroll)}%`}</td>
              <td className={tdNum}>
                {g.contacts > 0 ? <span className="text-emerald-300">{g.contacts}</span> : "0"}
                {g.contactRate !== null && g.contacts > 0 ? <span className="ml-1 text-xs text-silver-600">({fmtPct(g.contactRate, 0)})</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── main ───────────────────────────────────────────────────────────── */

export function VisitsReport({
  rows,
  days,
  campaignNames,
}: {
  rows: AdVisitRow[];
  days: number;
  campaignNames: Record<string, string>;
}) {
  const s: AdVisitsSummary = summarize(rows);
  const human = rows.filter((r) => !r.ua_bot);
  const bots = rows.filter((r) => r.ua_bot);

  const ips: IpStats[] = repeatIps(rows, 2);
  const suspicious = ips.filter((i) => i.suspicious);
  const exclusionList = suspicious.map((i) => i.ip).join("\n");

  const byKeyword = groupBy(rows, (r) => r.keyword, "(no keyword — suffix not applied yet)");
  const byCampaign = groupBy(rows, (r) => r.campaign_id, "(unknown)");
  const byDevice = groupBy(rows, (r) => r.device, "(unknown)");
  const byMatch = groupBy(rows, (r) => r.match_type, "(unknown)");
  const byCity = groupBy(rows, (r) => r.city, "(unknown)").slice(0, 10);
  const byLanding = groupBy(rows, (r) => r.landing_path, "(unknown)").slice(0, 10);
  const byUa = groupBy(rows, (r) => r.ua_summary, "(unknown)").slice(0, 10);
  const hours = byHourDubai(rows);
  const hourMax = Math.max(1, ...hours.map((h) => h.visits));
  const recent = human.slice(0, 60);

  const campaignLabel = (id: string) => campaignNames[id] ?? id;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-silver-600">SilberArrows · Google Ads</p>
          <h1 className="mt-1 text-2xl font-semibold text-silver-100">Paid visits &amp; click quality</h1>
          <p className="mt-1 text-sm text-silver-500">
            last {days} days · {fmtNumber(s.visits)} logged landings · live from the site, not from Google
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {[7, 14, 30].map((d) => (
            <a
              key={d}
              href={`/ads/visits?days=${d}`}
              className={`rounded-md border px-3 py-1.5 transition ${
                d === days
                  ? "border-silver-500 text-silver-100"
                  : "border-ink-500 text-silver-400 hover:border-silver-500 hover:text-silver-200"
              }`}
            >
              {d}d
            </a>
          ))}
          <a
            href="/ads/contacts"
            className="ml-2 rounded-md border border-ink-500 px-3 py-1.5 text-silver-400 transition hover:border-silver-500 hover:text-silver-200"
          >
            Contact taps →
          </a>
          <a
            href="/ads"
            className="rounded-md border border-ink-500 px-3 py-1.5 text-silver-400 transition hover:border-silver-500 hover:text-silver-200"
          >
            ← Dashboard
          </a>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-6">
          <Empty>
            Nothing logged yet. Rows appear the moment someone lands from a Google ad (URL carries a
            gclid). If the campaigns are live and this stays empty for a day, check that the
            <code className="mx-1 font-mono">ad_visits</code> migration has been run and Vercel has
            <code className="mx-1 font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.
          </Empty>
        </div>
      ) : null}

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <KpiCard label="Paid visits" value={fmtNumber(s.human)} sub={`${fmtNumber(s.uniqueClickIds)} distinct click ids`} />
        <KpiCard label="Bounce rate" value={fmtPct(s.bounceRate, 0)} sub="not engaged (GA4 rule)" />
        <KpiCard label="Median time" value={fmtDuration(s.medianActiveMs)} sub={`mean ${fmtDuration(s.meanActiveMs)} · tab visible`} />
        <KpiCard label="Median scroll" value={s.medianScroll === null ? "—" : `${Math.round(s.medianScroll)}%`} sub={`${s.meanPageViews ? s.meanPageViews.toFixed(1) : "—"} pages / visit`} />
        <KpiCard label="Contact rate" value={fmtPct(s.contactRate, 1)} sub={`${s.phone} call · ${s.whatsapp} WhatsApp · ${s.leads} form`} />
        <KpiCard label="No JavaScript" value={fmtPct(s.noJsRate, 0)} sub={`${s.noJs} visits never pinged`} />
        <KpiCard label="Repeat IPs" value={fmtPct(s.repeatIpRate, 0)} sub={`${s.repeatIpVisits} visits from IPs seen 3×+`} />
        <KpiCard label="Bots" value={fmtNumber(s.bots)} sub={`${s.webdriver} webdriver among humans`} />
      </div>

      {/* Suspicious IPs */}
      <Section
        title="Suspicious IPs"
        hint="score ≥ 4 and ≥ 3 visits · paste into Google Ads → Campaign settings → IP exclusions"
      >
        {suspicious.length === 0 ? (
          <Empty>
            No IP crosses the suspicion bar yet. Repeat IPs with normal engagement are listed below —
            most will be Etisalat / du carrier addresses shared by many phones.
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_260px]">
            <IpTable rows={suspicious} />
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-xs uppercase tracking-wider text-red-300">Exclusion list</p>
              <p className="mt-1 text-xs text-silver-500">
                {suspicious.length} IP{suspicious.length === 1 ? "" : "s"}. Google allows 500 per
                campaign; add to both Service and Brand.
              </p>
              <textarea
                readOnly
                rows={Math.min(12, Math.max(4, suspicious.length + 1))}
                className="mt-3 w-full resize-none rounded-md border border-ink-500 bg-ink-950 p-2 font-mono text-xs text-silver-200"
                value={exclusionList}
              />
            </div>
          </div>
        )}
      </Section>

      {/* All repeat IPs */}
      <Section title="Repeat IPs" hint="every IP seen twice or more · ranked by suspicion score">
        {ips.length === 0 ? (
          <Empty>No IP has visited more than once in this window.</Empty>
        ) : (
          <IpTable rows={ips.slice(0, 40)} />
        )}
      </Section>

      {/* Keywords */}
      <Section title="By keyword" hint="from ValueTrack {keyword} on the account URL suffix · red rows = 3+ visits, 80%+ bounce, no contact">
        {byKeyword.length ? <GroupTable rows={byKeyword} label="Keyword" /> : <Empty>No visits.</Empty>}
      </Section>

      {/* Campaign / device / match */}
      <Section title="By campaign · device · match type">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <GroupTable rows={byCampaign} label="Campaign" labelOf={campaignLabel} minWidth={420} />
          <GroupTable rows={byDevice} label="Device" labelOf={(k) => DEVICE_LABEL[k] ?? k} minWidth={420} />
          <GroupTable rows={byMatch} label="Match" labelOf={(k) => MATCH_LABEL[k] ?? k} minWidth={420} />
        </div>
      </Section>

      {/* Landing / city / UA */}
      <Section title="By landing page · city · browser">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <GroupTable rows={byLanding} label="Landing page" minWidth={420} />
          <GroupTable rows={byCity} label="City (Vercel geo)" minWidth={420} />
          <GroupTable rows={byUa} label="OS · browser" minWidth={420} />
        </div>
      </Section>

      {/* Hour of day */}
      <Section title="Hour of day" hint="Dubai time · bar = visits, green = contacts, red tint = bounced share">
        <div className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
          <div className="grid items-end gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))", height: 120 }}>
            {hours.map((h) => {
              const total = Math.max(0, (h.visits / hourMax) * 100);
              const bouncedPct = h.visits ? (h.bounced / h.visits) * 100 : 0;
              const contactPct = h.visits ? (h.contacts / h.visits) * 100 : 0;
              return (
                <div
                  key={h.hour}
                  className="flex h-full flex-col justify-end"
                  title={`${h.hour}:00 · ${h.visits} visits · ${h.contacts} contacts · ${h.bounced} bounced`}
                >
                  <div className="relative w-full rounded-t-sm bg-silver-600/40" style={{ height: `${total}%` }}>
                    <div className="absolute bottom-0 left-0 w-full bg-red-500/30" style={{ height: `${bouncedPct}%` }} />
                    <div className="absolute bottom-0 left-0 w-full bg-emerald-400/80" style={{ height: `${contactPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-1 grid text-[10px] text-silver-600" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
            {hours.map((h) => (
              <span key={h.hour} className="text-center">{h.hour % 3 === 0 ? h.hour : ""}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Recent visits */}
      <Section title="Recent visits" hint={`latest ${recent.length} human landings`}>
        {recent.length === 0 ? (
          <Empty>No visits.</Empty>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[1080px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>When (Dubai)</th>
                  <th className={th}>Keyword</th>
                  <th className={th}>Landing</th>
                  <th className={th}>IP · city</th>
                  <th className={th}>Device</th>
                  <th className={thNum}>Time</th>
                  <th className={thNum}>Scroll</th>
                  <th className={thNum}>Pages</th>
                  <th className={th}>Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td className={`${td} whitespace-nowrap text-xs`}>{fmtDubai(r.created_at)}</td>
                    <td className={`${td} text-silver-100`}>
                      {r.keyword ?? <span className="text-silver-600">—</span>}
                      {r.match_type ? <span className="ml-1 text-xs text-silver-600">{MATCH_LABEL[r.match_type] ?? r.match_type}</span> : null}
                    </td>
                    <td className={`${td} text-xs text-silver-400`}>{r.landing_path}</td>
                    <td className={`${td} text-xs`}>
                      <span className="font-mono text-silver-300">{r.ip ?? "—"}</span>
                      {r.city ? <span className="ml-1 text-silver-600">{r.city}</span> : null}
                    </td>
                    <td className={`${td} text-xs text-silver-400`}>
                      {r.ua_summary ?? "—"}
                      {r.device ? <span className="ml-1 text-silver-600">{DEVICE_LABEL[r.device] ?? r.device}</span> : null}
                      {r.network && r.network !== "g" ? <span className="ml-1 text-silver-600">{NETWORK_LABEL[r.network] ?? r.network}</span> : null}
                    </td>
                    <td className={tdNum}>{r.js_seen ? fmtDuration(r.active_ms) : <span className="text-amber-300">no JS</span>}</td>
                    <td className={tdNum}>{r.js_seen ? `${r.max_scroll_pct}%` : "—"}</td>
                    <td className={tdNum}>{r.js_seen ? Math.max(1, r.page_views) : "—"}</td>
                    <td className={td}>
                      <div className="flex flex-wrap gap-1">
                        {r.contact_phone ? <Pill tone="good">Call</Pill> : null}
                        {r.contact_whatsapp ? <Pill tone="good">WhatsApp</Pill> : null}
                        {r.lead_form ? <Pill tone="good">Form</Pill> : null}
                        {!hasContact(r) && isEngaged(r) ? <Pill tone="muted">engaged</Pill> : null}
                        {!isEngaged(r) ? <Pill tone={r.js_seen ? "warn" : "bad"}>{r.js_seen ? "bounce" : "no JS"}</Pill> : null}
                        {r.env?.webdriver === true ? <Pill tone="bad">webdriver</Pill> : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Bots */}
      {bots.length > 0 ? (
        <Section title="Bot user agents" hint="excluded from every number above · AdsBot-Google here is normal">
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>User agent</th>
                  <th className={thNum}>Hits</th>
                  <th className={th}>IPs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {Object.entries(
                  bots.reduce<Record<string, { hits: number; ips: Set<string> }>>((acc, r) => {
                    const k = (r.ua ?? "(none)").slice(0, 120);
                    acc[k] ??= { hits: 0, ips: new Set() };
                    acc[k].hits += 1;
                    if (r.ip) acc[k].ips.add(r.ip);
                    return acc;
                  }, {}),
                )
                  .sort((a, b) => b[1].hits - a[1].hits)
                  .slice(0, 15)
                  .map(([ua, v]) => (
                    <tr key={ua}>
                      <td className={`${td} font-mono text-xs text-silver-300`}>{ua}</td>
                      <td className={tdNum}>{v.hits}</td>
                      <td className={`${td} font-mono text-xs text-silver-500`}>{[...v.ips].slice(0, 4).join(", ")}{v.ips.size > 4 ? ` +${v.ips.size - 4}` : ""}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Section>
      ) : null}

      <p className="mt-10 border-t border-ink-600 pt-4 text-xs leading-relaxed text-silver-600">
        How to read this: a landing is logged at the edge the instant a Google click arrives, before any
        JavaScript. The browser then reports active time (tab visible only), scroll depth, pages and
        Call / WhatsApp taps. <strong className="text-silver-500">Bounce</strong> = not engaged (under 10 s,
        one page, no contact). <strong className="text-silver-500">No JS</strong> = never reported back —
        a headless script, an aggressive blocker, or someone who left within a second. One IP with many
        different browsers <em>and</em> real contacts is a shared carrier network, not a fraudster; the score
        already discounts that. Google&apos;s own invalid-click filter has already refunded whatever it caught;
        this log is for what slipped through.
      </p>
    </main>
  );
}

/* ── IP table ───────────────────────────────────────────────────────── */

function IpTable({ rows }: { rows: IpStats[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="border-b border-ink-500 text-xs">
          <tr>
            <th className={th}>IP</th>
            <th className={thNum}>Visits</th>
            <th className={thNum}>Clicks</th>
            <th className={thNum}>UAs</th>
            <th className={thNum}>No JS</th>
            <th className={thNum}>Median</th>
            <th className={thNum}>Contacts</th>
            <th className={th}>Keywords</th>
            <th className={th}>Seen</th>
            <th className={thNum}>Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-600">
          {rows.map((i) => (
            <tr key={i.ip} className={i.suspicious ? "bg-red-500/5" : undefined}>
              <td className={td}>
                <span className="font-mono text-silver-100">{i.ip}</span>
                <span className="block text-xs text-silver-600">{[i.city, i.uaSummary].filter(Boolean).join(" · ")}</span>
              </td>
              <td className={tdNum}>{i.visits}</td>
              <td className={tdNum} title="distinct click ids">{i.clickIds}</td>
              <td className={tdNum} title="distinct user agents">{i.uaCount}</td>
              <td className={tdNum}>{i.noJs ? <span className="text-amber-300">{i.noJs}</span> : "0"}</td>
              <td className={tdNum}>{fmtDuration(i.medianActiveMs)}</td>
              <td className={tdNum}>{i.contacts ? <span className="text-emerald-300">{i.contacts}</span> : "0"}</td>
              <td className={`${td} max-w-[260px] text-xs text-silver-400`}>
                {i.keywords.length ? i.keywords.slice(0, 3).join(" · ") + (i.keywords.length > 3 ? ` +${i.keywords.length - 3}` : "") : "—"}
              </td>
              <td className={`${td} whitespace-nowrap text-xs text-silver-500`}>
                {fmtDubai(i.firstSeen)}
                {i.visits > 1 ? <> → {fmtDubai(i.lastSeen)}</> : null}
              </td>
              <td className={tdNum}>
                <span title={i.reasons.join("; ")}>
                  <Pill tone={i.suspicious ? "bad" : i.score >= 2 ? "warn" : "muted"}>{i.score}</Pill>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
