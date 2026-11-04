import Link from "next/link";
import { ContactTable } from "@/components/contact-table";
import { Button } from "@/components/ui/button";
import type { ContactWithStar } from "@/lib/contacts";
import { createClient } from "@/lib/supabase/server";

export default async function ContactsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*, stars(id)")
    .order("created_at", { ascending: false });
  const contacts: ContactWithStar[] = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <Button nativeButton={false} render={<Link href="/contacts/new" />}>
          Add contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          No contacts yet. Add the first person you want to keep in touch with.
        </p>
      ) : (
        <ContactTable contacts={contacts} />
      )}
    </div>
  );
}
