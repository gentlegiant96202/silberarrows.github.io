-- Paid-click visit log for click-fraud detection and landing-page engagement.
--
-- One row per page request that arrived with a Google click id (gclid /
-- gbraid / wbraid) or utm_source=google&utm_medium=cpc. The edge middleware
-- inserts the request half (IP, UA, geo, keyword from ValueTrack); the browser
-- then reports engagement (active time, scroll, pages, contact clicks) through
-- /api/ad-visit, which calls ad_visit_ping() below. A row that never receives
-- a ping is a client that never executed JavaScript — a strong bot signal.
--
-- Run once in the Supabase SQL editor for the LEADS project (the one behind
-- NEXT_PUBLIC_SUPABASE_URL). Safe to re-run.
--
-- Retention: the IP is stored in the clear because the whole point is to load
-- repeat offenders into Google's IP exclusion list. Purge old rows regularly,
-- e.g. once a month in the SQL editor:
--   delete from public.ad_visits where created_at < now() - interval '90 days';

create extension if not exists "pgcrypto";

create table if not exists public.ad_visits (
  id               uuid primary key default gen_random_uuid(),
  visit_id         text not null unique,          -- also stored in the _sa_visit cookie
  created_at       timestamptz not null default now(),

  -- request (edge middleware)
  ip               text,
  ip_prefix        text,                          -- /24 for IPv4, /48 for IPv6 — groups carrier NAT + small ranges
  ua               text,
  ua_summary       text,                          -- "iOS · Safari", "Android · Chrome", …
  ua_bot           boolean not null default false,-- UA matches a known crawler / headless / script pattern
  country          text,
  region           text,
  city             text,
  landing_path     text,
  landing_url      text,
  referrer         text,

  -- Google Ads click ids
  gclid            text,
  gbraid           text,
  wbraid           text,

  -- ValueTrack from the account final URL suffix
  campaign_id      text,
  adgroup_id       text,
  keyword          text,
  match_type       text,                          -- e | p | b
  device           text,                          -- m | t | c
  network          text,                          -- g | s | d
  creative_id      text,
  target_id        text,                          -- kwd-123456 (criterion id)
  loc_physical     text,                          -- geo criterion id of the user's location
  loc_interest     text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,

  -- engagement (browser, via ad_visit_ping)
  js_seen          boolean not null default false,
  first_ping_at    timestamptz,
  last_seen_at     timestamptz,
  active_ms        integer not null default 0,    -- time the tab was actually visible
  max_scroll_pct   smallint not null default 0,
  page_views       smallint not null default 0,   -- client-side navigations incl. the landing
  pages            text[],
  clicks           smallint not null default 0,   -- any click / tap on the page
  contact_phone    boolean not null default false,
  contact_whatsapp boolean not null default false,
  lead_form        boolean not null default false,
  env              jsonb                          -- viewport, language, tz, webdriver, touch, cores, memory, connection
);

create index if not exists ad_visits_created_idx  on public.ad_visits (created_at desc);
create index if not exists ad_visits_ip_idx       on public.ad_visits (ip)      where ip is not null;
create index if not exists ad_visits_gclid_idx    on public.ad_visits (gclid)   where gclid is not null;
create index if not exists ad_visits_keyword_idx  on public.ad_visits (keyword) where keyword is not null;

-- Locked down like ads_snapshots: RLS on, zero policies. Only the service-role
-- key (middleware insert, /api/ad-visit ping, /ads/visits read) gets through.
alter table public.ad_visits enable row level security;

-- Merge an engagement ping into its visit. Every numeric field is taken as the
-- max of what we already have and what the browser just sent, so out-of-order
-- or duplicate beacons can never shrink a value. No-op if the visit is unknown.
create or replace function public.ad_visit_ping(
  p_visit_id   text,
  p_active_ms  integer,
  p_max_scroll integer,
  p_page_views integer,
  p_pages      text[],
  p_clicks     integer,
  p_phone      boolean,
  p_whatsapp   boolean,
  p_lead       boolean,
  p_env        jsonb
) returns void
language sql
security definer
set search_path = public
as $$
  update public.ad_visits set
    js_seen          = true,
    first_ping_at    = coalesce(first_ping_at, now()),
    last_seen_at     = now(),
    active_ms        = greatest(active_ms, coalesce(p_active_ms, 0)),
    max_scroll_pct   = greatest(max_scroll_pct, least(coalesce(p_max_scroll, 0), 100)),
    page_views       = greatest(page_views, coalesce(p_page_views, 0)),
    pages            = case
                         when p_pages is not null
                          and cardinality(p_pages) >= coalesce(cardinality(pages), 0)
                         then p_pages else pages end,
    clicks           = greatest(clicks, coalesce(p_clicks, 0)),
    contact_phone    = contact_phone    or coalesce(p_phone, false),
    contact_whatsapp = contact_whatsapp or coalesce(p_whatsapp, false),
    lead_form        = lead_form        or coalesce(p_lead, false),
    env              = coalesce(p_env, env)
  where visit_id = p_visit_id;
$$;

revoke execute on function public.ad_visit_ping(text, integer, integer, integer, text[], integer, boolean, boolean, boolean, jsonb)
  from public, anon, authenticated;
