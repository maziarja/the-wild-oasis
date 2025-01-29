import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lpjgjgzipjujbabwkdyr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwamdqZ3ppcGp1amJhYndrZHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMjk0MTUsImV4cCI6MjA1MDkwNTQxNX0.P2T5DkEP-pirv0oQR9gfndTaDGiKECHs53hIO2Mz3Wc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
