import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.PUBLIC_QUIZ_SUPABASE_URL!,
    process.env.PUBLIC_QUIZ_API_KEY!,
  );
}
