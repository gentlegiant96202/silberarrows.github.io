#!/usr/bin/env node
// Push a Google Ads snapshot JSON into the Supabase `ads_snapshots` table.
//
// Workflow (manual cadence):
//   1. Agent pulls metrics via the Google Ads MCP and writes data/ads/<date>.json
//   2. Run:  node scripts/ads-snapshot.mjs data/ads/<date>.json
//   3. The /ads dashboard reads the latest two snapshots live (no redeploy needed).
//
// Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local
// (or the process env). The service-role key bypasses RLS, so keep it secret.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadDotEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      let val = m[2];
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(m[1] in process.env)) process.env[m[1]] = val;
    }
  } catch {
    /* no .env.local — rely on real env */
  }
}

loadDotEnv();

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/ads-snapshot.mjs <snapshot.json>");
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(readFileSync(resolve(process.cwd(), file), "utf8"));
} catch (e) {
  console.error(`Could not read/parse ${file}: ${e.message}`);
  process.exit(1);
}

if (!payload.snapshot_date || !payload.data) {
  console.error('Snapshot file must be { "snapshot_date": "YYYY-MM-DD", "data": { ... } }');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env / .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const row = {
  snapshot_date: payload.snapshot_date,
  range_label: payload.range_label ?? payload.data?.range?.label ?? null,
  pulled_at: payload.pulled_at ?? new Date().toISOString(),
  data: payload.data,
};

const { error } = await supabase
  .from("ads_snapshots")
  .upsert(row, { onConflict: "snapshot_date" });

if (error) {
  console.error("Upsert failed:", error.message);
  process.exit(1);
}

const d = payload.data;
console.log(
  `✓ Snapshot ${row.snapshot_date} saved — ` +
    `${d.campaigns?.length ?? 0} campaigns, ${d.adGroups?.length ?? 0} ad groups, ` +
    `${d.keywords?.length ?? 0} keywords.`,
);
