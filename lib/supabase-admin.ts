import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client for the ads dashboard. Uses the service-role key, so it
// MUST never be imported into a client component. RLS is on with no policies,
// so this key is the only way in (read or write).
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    cached = null;
    return cached;
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
