import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client — SERVER ONLY. Bypasses RLS, so never import this
// into client components or route handlers that expose it to the browser.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
