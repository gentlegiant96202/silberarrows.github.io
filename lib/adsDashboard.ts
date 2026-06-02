import { getSupabaseAdmin } from "@/lib/supabase-admin";

// ---- Snapshot payload shape (what the MCP pull writes into `data`) ----

export interface AdsCampaign {
  id: string;
  name: string;
  type: string;
  status: string;
  cost: number;
  impressions: number;
  clicks: number;
  ctr: number; // 0..1
  avgCpc: number;
  conversions: number;
  costPerConv: number;
  convRate: number; // 0..1
  searchImpressionShare: number | null; // 0..1
  lostIsBudget: number | null; // 0..1
  lostIsRank: number | null; // 0..1
}

export interface AdsAdGroup {
  campaign: string;
  name: string;
  cost: number;
  clicks: number;
  conversions: number;
  costPerConv: number;
}

export interface AdsKeyword {
  campaign: string;
  adGroup: string;
  text: string;
  matchType: string;
  cost: number;
  clicks: number;
  conversions: number;
  qualityScore: number | null;
}

export type SearchTermSuggestion = "harvest" | "negative" | "watch";

export interface AdsSearchTerm {
  term: string;
  adGroup?: string;
  cost: number;
  clicks: number;
  conversions: number;
  suggestion?: SearchTermSuggestion;
}

export interface AdsAsset {
  campaign?: string;
  adGroup: string;
  type: string; // HEADLINE | DESCRIPTION
  text: string;
  performanceLabel: string; // LOW | GOOD | BEST | PENDING | LEARNING | UNKNOWN
}

export interface AdsConvAction {
  name: string;
  category?: string;
  conversions: number;
  value?: number;
}

export interface AdsDay {
  date: string; // YYYY-MM-DD
  cost: number;
  conversions: number;
  clicks: number;
}

export interface AdsSnapshotData {
  account: { customerId: string; currency: string };
  range: { label: string; start?: string; end?: string };
  campaigns: AdsCampaign[];
  conversionsByAction: AdsConvAction[];
  adGroups: AdsAdGroup[];
  keywords: AdsKeyword[];
  searchTerms: AdsSearchTerm[];
  assets: AdsAsset[];
  dailyTrend: AdsDay[];
  actions: string[];
  notes?: string;
}

export interface AdsSnapshotRow {
  snapshot_date: string;
  range_label: string | null;
  pulled_at: string;
  data: AdsSnapshotData;
}

export interface AdsSnapshotResult {
  configured: boolean; // service-role key + url present
  current: AdsSnapshotRow | null;
  previous: AdsSnapshotRow | null;
  error?: string;
}

/** Fetch the two most recent snapshots (current + previous for deltas). */
export async function getLatestSnapshots(): Promise<AdsSnapshotResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { configured: false, current: null, previous: null };
  }
  const { data, error } = await supabase
    .from("ads_snapshots")
    .select("snapshot_date, range_label, pulled_at, data")
    .order("snapshot_date", { ascending: false })
    .limit(2);

  if (error) {
    return { configured: true, current: null, previous: null, error: error.message };
  }
  const rows = (data ?? []) as AdsSnapshotRow[];
  return {
    configured: true,
    current: rows[0] ?? null,
    previous: rows[1] ?? null,
  };
}

// ---- Derived totals + formatting helpers ----

export interface AdsTotals {
  cost: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  avgCpc: number;
  costPerConv: number;
}

export function totalsFromCampaigns(campaigns: AdsCampaign[]): AdsTotals {
  const cost = sum(campaigns.map((c) => c.cost));
  const impressions = sum(campaigns.map((c) => c.impressions));
  const clicks = sum(campaigns.map((c) => c.clicks));
  const conversions = sum(campaigns.map((c) => c.conversions));
  return {
    cost,
    impressions,
    clicks,
    conversions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    avgCpc: clicks > 0 ? cost / clicks : 0,
    costPerConv: conversions > 0 ? cost / conversions : 0,
  };
}

function sum(xs: number[]): number {
  return xs.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
}

export function fmtCurrency(value: number, currency = "AED"): string {
  return `${currency} ${value.toLocaleString("en-AE", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function fmtNumber(value: number): string {
  return value.toLocaleString("en-AE", { maximumFractionDigits: 1 });
}

export function fmtPct(value: number | null, digits = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(digits)}%`;
}
