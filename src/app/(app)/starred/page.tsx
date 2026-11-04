import Link from "next/link";
import { ContactTable } from "@/components/contact-table";
import type { ContactWithStar } from "@/lib/contacts";
import { createClient } from "@/lib/supabase/server";

export default async function StarredPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*, stars!inner(id)")
    .order("name");
  const contacts: ContactWithStar[] = data ?? [];

  return (
    <div>
      <h1 className="text-xl font-semibold">Starred</h1>
      {contacts.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          No starred contacts yet. Star someone on your{" "}
          <Link href="/contacts" className="font-medium text-primary hover:underline">
            contacts list
          </Link>
          .
        </p>
      ) : (
        <ContactTable contacts={contacts} />
      )}
    </div>
  );
}
