-- Lead attribution: persist the Google click id + landing page with every
-- lead so Google Ads WhatsApp/Call/form conversions can be reconciled against
-- real conversations, and so a future value-based (Data Manager API) upload
-- has the click id it needs.
--
-- Run once in the Supabase SQL editor for the LEADS project (the one behind
-- NEXT_PUBLIC_SUPABASE_URL). Safe to re-run. Until this has run, /api/lead
-- detects the missing columns and falls back to inserting name + phone only.

alter table public.leads
  add column if not exists source      text,   -- landing path at submit, e.g. /lp/mercedes-repair
  add column if not exists gclid       text,   -- Google Ads click id (web)
  add column if not exists gbraid      text,   -- Google Ads click id (iOS app-to-web)
  add column if not exists wbraid      text,   -- Google Ads click id (iOS web-to-app)
  add column if not exists event_id    text,   -- shared dedupe id (Meta eventID / gtag transaction_id)
  add column if not exists landing_url text;   -- full URL at submit

create index if not exists leads_gclid_idx  on public.leads (gclid)  where gclid  is not null;
create index if not exists leads_source_idx on public.leads (source) where source is not null;
