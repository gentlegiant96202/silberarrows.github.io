import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iyppyaocvroqfbdklgex.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5cHB5YW9jdnJvcWZiZGtsZ2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTY1NjIsImV4cCI6MjA4NjQ3MjU2Mn0.hshrdiynRTv6GPe08-tz7YDNDJWeryLbCuKDmJ0tmu8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
