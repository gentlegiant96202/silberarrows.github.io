import {
  type ContactClickRow,
  type ContactClicksSummary,
  type GroupStats,
  type IpStats,
  byDayDubai,
  byHourDubai,
  groupBy,
  hasGoogleClick,
  hasMetaClick,
  isWebdriver,
  repeatIps,
  rowScore,
  summarize,
  timezoneMismatch,
} from "@/lib/contactClicks";
import { fmtNumber, fmtPct } from "@/lib/adsDashboard";

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

function GroupTable({
  rows,
  label,
  minWidth = 640,
}: {
  rows: GroupStats[];
  label: string;
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead className="border-b border-ink-500 text-xs">
          <tr>
            <th className={th}>{label}</th>
            <th className={thNum}>Taps</th>
            <th className={thNum}>Human</th>
            <th className={thNum}>Bots</th>
            <th className={thNum}>Call</th>
            <th className={thNum}>WA</th>
            <th className={thNum}>IPs</th>
            <th className={thNum}>Flagged</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-600">
          {rows.map((g) => (
            <tr key={g.key} className={g.flagged >= 2 || g.bots >= 2 ? "bg-red-500/5" : undefined}>
              <td className={`${td} text-silver-100`}>{g.key}</td>
              <td className={tdNum}>{fmtNumber(g.taps)}</td>
              <td className={tdNum}>{fmtNumber(g.human)}</td>
              <td className={tdNum}>{g.bots ? <span className="text-amber-300">{g.bots}</span> : "0"}</td>
              <td className={tdNum}>{g.phone}</td>
              <td className={tdNum}>{g.whatsapp}</td>
              <td className={tdNum}>{fmtNumber(g.ips)}</td>
              <td className={tdNum}>
                {g.flagged > 0 ? <span className="text-red-300">{g.flagged}</span> : "0"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IpTable({ rows }: { rows: IpStats[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
      <table className="w-full min-w-[960px] text-sm">
        <thead className="border-b border-ink-500 text-xs">
          <tr>
            <th className={th}>IP</th>
            <th className={thNum}>Taps</th>
            <th className={thNum}>Call</th>
            <th className={thNum}>WA</th>
            <th className={thNum}>UAs</th>
            <th className={thNum}>Bots</th>
            <th className={th}>Paths</th>
            <th className={th}>Seen</th>
            <th className={thNum}>Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-600">
          {rows.map((i) => (
            <tr key={i.ip} className={i.suspicious ? "bg-red-500/5" : undefined}>
              <td className={td}>
                <span className="font-mono text-silver-100">{i.ip}</span>
                <span className="block text-xs text-silver-600">
                  {[i.city ?? i.country, i.uaSummary, i.prefix].filter(Boolean).join(" · ")}
                </span>
              </td>
              <td className={tdNum}>{i.taps}</td>
              <td className={tdNum}>{i.phone}</td>
              <td className={tdNum}>{i.whatsapp}</td>
              <td className={tdNum}>{i.uaCount}</td>
              <td className={tdNum}>{i.bots ? <span className="text-amber-300">{i.bots}</span> : "0"}</td>
              <td className={`${td} max-w-[240px] text-xs text-silver-400`}>
                {i.paths.length
                  ? i.paths.slice(0, 3).join(" · ") + (i.paths.length > 3 ? ` +${i.paths.length - 3}` : "")
                  : "—"}
              </td>
              <td className={`${td} whitespace-nowrap text-xs text-silver-500`}>
                {fmtDubai(i.firstSeen)}
                {i.taps > 1 ? <> → {fmtDubai(i.lastSeen)}</> : null}
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

function RowFlags({ r }: { r: ContactClickRow }) {
  const scored = rowScore(r);
  return (
    <div className="flex flex-wrap gap-1">
      <Pill tone={r.kind === "whatsapp" ? "good" : "muted"}>{r.kind === "whatsapp" ? "WhatsApp" : "Call"}</Pill>
      {r.offer ? <Pill tone="muted">{r.offer}</Pill> : null}
      {hasGoogleClick(r) ? <Pill tone="good">Google</Pill> : null}
      {hasMetaClick(r) ? <Pill tone="good">Meta</Pill> : null}
      {r.ua_bot ? <Pill tone="bad">bot UA</Pill> : null}
      {isWebdriver(r) ? <Pill tone="bad">webdriver</Pill> : null}
      {timezoneMismatch(r) ? <Pill tone="warn">tz mismatch</Pill> : null}
      {r.env?.cookies === false ? <Pill tone="warn">no cookies</Pill> : null}
      {!r.capi_sent ? <Pill tone="warn">CAPI miss</Pill> : null}
      {scored.suspicious && !r.ua_bot ? (
        <Pill tone="bad" >score {scored.score}</Pill>
      ) : null}
    </div>
  );
}

export function ContactsReport({ rows, days }: { rows: ContactClickRow[]; days: number }) {
  const s: ContactClicksSummary = summarize(rows);
  const human = rows.filter((r) => !r.ua_bot);
  const bots = rows.filter((r) => r.ua_bot);
  const flagged = rows.filter((r) => rowScore(r).suspicious);

  const ips = repeatIps(rows, 2);
  const suspicious = ips.filter((i) => i.suspicious);
  const exclusionList = suspicious.map((i) => i.ip).join("\n");

  const byPath = groupBy(rows, (r) => r.path, "(unknown)").slice(0, 15);
  const byCity = groupBy(rows, (r) => r.city, "(unknown)").slice(0, 10);
  const byUa = groupBy(rows, (r) => r.ua_summary, "(unknown)").slice(0, 10);
  const byOffer = groupBy(rows, (r) => r.offer, "(no offer)").slice(0, 10);
  const byCountry = groupBy(rows, (r) => r.country, "(unknown)").slice(0, 10);
  const daysSeries = byDayDubai(rows);
  const hours = byHourDubai(rows);
  const hourMax = Math.max(1, ...hours.map((h) => h.taps));
  const recent = rows.slice(0, 80);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-silver-600">SilberArrows · Contacts</p>
          <h1 className="mt-1 text-2xl font-semibold text-silver-100">Call &amp; WhatsApp taps</h1>
          <p className="mt-1 text-sm text-silver-500">
            last {days} days · {fmtNumber(s.taps)} logged taps · every Contact that hits the site, not just paid visits
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {[7, 14, 30].map((d) => (
            <a
              key={d}
              href={`/ads/contacts?days=${d}`}
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
            href="/ads/visits"
            className="ml-2 rounded-md border border-ink-500 px-3 py-1.5 text-silver-400 transition hover:border-silver-500 hover:text-silver-200"
          >
            Paid visits →
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
            Nothing logged yet. New Call / WhatsApp taps appear here the moment someone taps —
            including the sticky mobile bar. Historical Meta Contacts from before this log cannot
            be backfilled. If this stays empty after a live tap, run{" "}
            <code className="mx-1 font-mono">supabase/migrations/0004_contact_clicks.sql</code>
            and confirm Vercel has <code className="mx-1 font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.
          </Empty>
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <KpiCard label="Human taps" value={fmtNumber(s.human)} sub={`${s.phone} call · ${s.whatsapp} WhatsApp`} />
        <KpiCard label="Unique IPs" value={fmtNumber(s.uniqueIps)} sub={`${fmtNumber(s.repeatIpTaps)} from IPs seen 3×+`} />
        <KpiCard label="Bots" value={fmtNumber(s.bots)} sub={`${s.webdriver} webdriver among humans`} />
        <KpiCard label="Flagged" value={fmtNumber(flagged.length)} sub="score ≥ 3 (UA / webdriver / tz)" />
        <KpiCard label="Google click" value={fmtNumber(s.google)} sub="gclid / gbraid / wbraid" />
        <KpiCard label="Meta click" value={fmtNumber(s.meta)} sub="fbclid or _fbc" />
        <KpiCard label="Offer taps" value={fmtNumber(s.offers)} sub="attributed to an offer slug" />
        <KpiCard label="CAPI sent" value={fmtPct(s.capiRate, 0)} sub={`${s.tzMismatch} tz mismatch · ${s.noCookies} no cookies`} />
      </div>

      <Section
        title="Suspicious IPs"
        hint="score ≥ 4 and ≥ 3 taps · paste into Google Ads / Meta IP exclusions"
      >
        {suspicious.length === 0 ? (
          <Empty>
            No IP crosses the suspicion bar yet. Repeat IPs with a normal mix of devices are listed
            below — most will be Etisalat / du carrier addresses shared by many phones.
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_260px]">
            <IpTable rows={suspicious} />
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-xs uppercase tracking-wider text-red-300">Exclusion list</p>
              <p className="mt-1 text-xs text-silver-500">
                {suspicious.length} IP{suspicious.length === 1 ? "" : "s"}. Cross-check against{" "}
                <a href="/ads/visits" className="underline hover:text-silver-200">
                  paid visits
                </a>{" "}
                before excluding a carrier NAT.
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

      <Section title="Repeat IPs" hint="every IP seen twice or more · ranked by suspicion score">
        {ips.length === 0 ? (
          <Empty>No IP has tapped more than once in this window.</Empty>
        ) : (
          <IpTable rows={ips.slice(0, 40)} />
        )}
      </Section>

      <Section title="By day" hint="Dubai calendar day">
        {daysSeries.length === 0 ? (
          <Empty>No taps.</Empty>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>Day</th>
                  <th className={thNum}>Taps</th>
                  <th className={thNum}>Human</th>
                  <th className={thNum}>Bots</th>
                  <th className={thNum}>Call</th>
                  <th className={thNum}>WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {daysSeries.map((d) => (
                  <tr key={d.day}>
                    <td className={`${td} whitespace-nowrap`}>{d.day}</td>
                    <td className={tdNum}>{d.taps}</td>
                    <td className={tdNum}>{d.human}</td>
                    <td className={tdNum}>{d.bots ? <span className="text-amber-300">{d.bots}</span> : "0"}</td>
                    <td className={tdNum}>{d.phone}</td>
                    <td className={tdNum}>{d.whatsapp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section title="Hour of day" hint="Dubai time · bar = taps, red tint = flagged, amber = bot UA">
        <div className="rounded-xl border border-ink-500 bg-ink-800/60 p-4">
          <div
            className="grid items-end gap-1"
            style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))", height: 120 }}
          >
            {hours.map((h) => {
              const total = Math.max(0, (h.taps / hourMax) * 100);
              const botPct = h.taps ? (h.bots / h.taps) * 100 : 0;
              const flaggedPct = h.taps ? (h.flagged / h.taps) * 100 : 0;
              return (
                <div
                  key={h.hour}
                  className="flex h-full flex-col justify-end"
                  title={`${h.hour}:00 · ${h.taps} taps · ${h.bots} bots · ${h.flagged} flagged`}
                >
                  <div className="relative w-full rounded-t-sm bg-silver-600/40" style={{ height: `${total}%` }}>
                    <div className="absolute bottom-0 left-0 w-full bg-amber-400/50" style={{ height: `${botPct}%` }} />
                    <div className="absolute bottom-0 left-0 w-full bg-red-500/40" style={{ height: `${flaggedPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="mt-1 grid text-[10px] text-silver-600"
            style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
          >
            {hours.map((h) => (
              <span key={h.hour} className="text-center">
                {h.hour % 3 === 0 ? h.hour : ""}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section title="By page · city · browser">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <GroupTable rows={byPath} label="Page" minWidth={420} />
          <GroupTable rows={byCity} label="City (Vercel geo)" minWidth={420} />
          <GroupTable rows={byUa} label="OS · browser" minWidth={420} />
        </div>
      </Section>

      <Section title="By offer · country">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          <GroupTable rows={byOffer} label="Offer" minWidth={420} />
          <GroupTable rows={byCountry} label="Country" minWidth={420} />
        </div>
      </Section>

      <Section title="Recent taps" hint={`latest ${recent.length} · bots included so they are visible`}>
        {recent.length === 0 ? (
          <Empty>No taps.</Empty>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-500 bg-ink-800/40">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="border-b border-ink-500 text-xs">
                <tr>
                  <th className={th}>When (Dubai)</th>
                  <th className={th}>Page</th>
                  <th className={th}>IP · city</th>
                  <th className={th}>Device</th>
                  <th className={th}>Signals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-600">
                {recent.map((r) => {
                  const scored = rowScore(r);
                  return (
                    <tr key={r.id} className={scored.suspicious ? "bg-red-500/5" : undefined}>
                      <td className={`${td} whitespace-nowrap text-xs`}>{fmtDubai(r.created_at)}</td>
                      <td className={`${td} text-xs text-silver-400`}>
                        {r.path ?? "—"}
                        {r.intent ? <span className="ml-1 text-silver-600">{r.intent}</span> : null}
                      </td>
                      <td className={`${td} text-xs`}>
                        <span className="font-mono text-silver-300">{r.ip ?? "—"}</span>
                        {r.ip_v4 && r.ip_v4 !== r.ip ? (
                          <span className="ml-1 font-mono text-silver-600">{r.ip_v4}</span>
                        ) : null}
                        {r.city ? <span className="ml-1 text-silver-600">{r.city}</span> : null}
                        {r.country ? <span className="ml-1 text-silver-600">{r.country}</span> : null}
                      </td>
                      <td className={`${td} text-xs text-silver-400`}>
                        {r.ua_summary ?? "—"}
                        {typeof r.env?.tz === "string" ? (
                          <span className="ml-1 text-silver-600">{r.env.tz}</span>
                        ) : null}
                      </td>
                      <td className={td}>
                        <RowFlags r={r} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {bots.length > 0 ? (
        <Section title="Bot user agents" hint="excluded from the human KPI counts above">
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
                  }, {})
                )
                  .sort((a, b) => b[1].hits - a[1].hits)
                  .slice(0, 15)
                  .map(([ua, v]) => (
                    <tr key={ua}>
                      <td className={`${td} font-mono text-xs text-silver-300`}>{ua}</td>
                      <td className={tdNum}>{v.hits}</td>
                      <td className={`${td} font-mono text-xs text-silver-500`}>
                        {[...v.ips].slice(0, 4).join(", ")}
                        {v.ips.size > 4 ? ` +${v.ips.size - 4}` : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Section>
      ) : null}

      {human.length > 0 ? (
        <p className="mt-10 border-t border-ink-600 pt-4 text-xs leading-relaxed text-silver-600">
          How to read this: every Call / WhatsApp tap beacons here with the visitor IP (both
          families when Vercel saw them), user agent, Vercel geo, page, offer,{" "}
          <code className="font-mono">_sa_visit</code>, Google / Meta click ids, Pixel cookies, and
          a small environment blob (timezone, language, viewport, touch,{" "}
          <code className="font-mono">navigator.webdriver</code>, Client Hints).{" "}
          <strong className="text-silver-500">Bot UA</strong> matches crawlers and headless
          scripts. <strong className="text-silver-500">Flagged</strong> is a score from those
          signals plus timezone-vs-country and empty viewports. One IP with many different
          browsers and no bot UA is a shared carrier network, not a farm — the score already
          discounts that. This log starts from the deploy that shipped it; the ~155 Meta Contacts
          from last week are not in here.
        </p>
      ) : null}
    </main>
  );
}
