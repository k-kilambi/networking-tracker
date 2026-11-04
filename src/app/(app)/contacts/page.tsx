import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/lib/contacts";
import { createClient } from "@/lib/supabase/server";

export default async function ContactsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  const contacts: Contact[] = data ?? [];

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
        <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">Role</th>
                <th className="px-4 py-2 font-medium">Related job</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-medium">
                    <Link href={`/contacts/${contact.id}`} className="text-primary hover:underline">
                      {contact.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{contact.company}</td>
                  <td className="px-4 py-2">{contact.role}</td>
                  <td className="px-4 py-2">{contact.related_job}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
