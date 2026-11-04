import { randomBytes } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Each test run signs up brand-new made-up accounts, so real data is never involved.
export async function signUpTestUser(): Promise<SupabaseClient> {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data, error } = await client.auth.signUp({
    email: `nt.test.${randomBytes(6).toString("hex")}@example.com`,
    password: randomBytes(16).toString("hex"),
  });

  if (error || !data.session) {
    throw new Error(`Could not sign up a test user: ${error?.message ?? "no session"}`);
  }

  return client;
}
