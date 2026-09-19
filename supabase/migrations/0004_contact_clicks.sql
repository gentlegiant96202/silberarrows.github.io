-- Sitewide Call / WhatsApp tap log for bot review and Meta Contact reconcilation.
--
-- One row per tap that reaches /api/contact-click (the same request that
-- forwards a Contact event to the Meta Conversions API). Unlike ad_visits,
-- this is not limited to Google paid landings — the sticky bar, offer CTAs
-- and footer all land here, which is what Events Manager counts as Contact.
--
-- Run once in the Supabase SQL editor for the LEADS project (the one behind
-- NEXT_PUBLIC_SUPABASE_URL). Safe to re-run.
--
-- Retention: the IP is stored in the clear so repeat tap farms can be
-- compared against ad_visits and loaded into Ads IP exclusions. Purge old
-- rows regularly, e.g. once a month in the SQL editor:
--   delete from public.contact_clicks where created_at < now() - interval '90 days';

create extension if not exists "pgcrypto";

create table if not exists public.contact_clicks (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  event_id         text not null unique,          -- shared with Pixel + CAPI

  kind             text not null,                 -- phone | whatsapp
  constraint contact_clicks_kind_check check (kind in ('phone', 'whatsapp')),

  -- request
  ip               text,                          -- preferred public hop (IPv6 when both exist)
  ip_v4            text,
  ip_v6            text,
  ip_prefix        text,                          -- /24 for IPv4, /48 for IPv6
  ua               text,
  ua_summary       text,
  ua_bot           boolean not null default false,
  country          text,
  region           text,
  city             text,
  path             text,
  page_url         text,
  referrer         text,

  -- offer attribution (when the tap was on an offer page / card)
  offer            text,
  offer_name       text,
  intent           text,

  -- session + paid-click ids (cookie or current URL)
  visit_id         text,                          -- _sa_visit when this session started from a Google ad
  gclid            text,
  gbraid           text,
  wbraid           text,
  fbclid           text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,

  -- Meta matching cookies (same values sent to CAPI)
  fbp              text,
  fbc              text,
  capi_sent        boolean not null default false,

  -- browser environment from the beacon + Client Hints from the request
  env              jsonb
);

create index if not exists contact_clicks_created_idx on public.contact_clicks (created_at desc);
create index if not exists contact_clicks_ip_idx      on public.contact_clicks (ip)      where ip is not null;
create index if not exists contact_clicks_kind_idx    on public.contact_clicks (kind);
create index if not exists contact_clicks_offer_idx   on public.contact_clicks (offer)   where offer is not null;
create index if not exists contact_clicks_visit_idx   on public.contact_clicks (visit_id) where visit_id is not null;
create index if not exists contact_clicks_bot_idx     on public.contact_clicks (ua_bot);
create index if not exists contact_clicks_gclid_idx   on public.contact_clicks (gclid)   where gclid is not null;
create index if not exists contact_clicks_fbclid_idx  on public.contact_clicks (fbclid)  where fbclid is not null;

-- Locked down like ad_visits: RLS on, zero policies. Only the service-role
-- key (/api/contact-click insert, /ads/contacts read) gets through.
alter table public.contact_clicks enable row level security;
