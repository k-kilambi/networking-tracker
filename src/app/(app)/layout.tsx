import Link from "next/link";
import { redirect } from "next/navigation";
import { logOut } from "@/app/actions";
import { AutomateEverythingButton } from "@/components/automate-everything-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <Link href="/" className="font-semibold">
              Networking Tracker
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Tasks
            </Link>
            <Link href="/contacts" className="text-muted-foreground hover:text-foreground">
              Contacts
            </Link>
            <Link href="/starred" className="text-muted-foreground hover:text-foreground">
              Starred
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <AutomateEverythingButton />
            <Button size="sm" nativeButton={false} render={<Link href="/contacts/new" />}>
              Add contact
            </Button>
            <form action={logOut}>
              <Button type="submit" variant="outline" size="sm">
                Log out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </>
  );
}
