import { redirect } from "next/navigation";
import { logOut } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 p-6">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Networking Tracker</h1>
        <form action={logOut}>
          <button
            type="submit"
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:bg-background"
          >
            Log out
          </button>
        </form>
      </header>
      <p className="mt-6 text-muted">Logged in as {user.email}</p>
    </main>
  );
}
