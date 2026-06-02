-- Ads reporting dashboard: one row per manual pull from Google Ads (via MCP).
-- Run this once in the Supabase SQL editor for the main project
-- (the one behind NEXT_PUBLIC_SUPABASE_URL).

create extension if not exists "pgcrypto";

create table if not exists public.ads_snapshots (
  id            uuid primary key default gen_random_uuid(),
  snapshot_date date not null unique,
  range_label   text,
  pulled_at     timestamptz not null default now(),
  data          jsonb not null,
  created_at    timestamptz not null default now()
);

create index if not exists ads_snapshots_date_idx
  on public.ads_snapshots (snapshot_date desc);

-- Locked down: no public access. The dashboard page reads it server-side with
-- the service-role key, and the snapshot script writes with the same key.
-- Both bypass RLS, so we keep RLS ON with zero policies (deny-by-default).
alter table public.ads_snapshots enable row level security;
