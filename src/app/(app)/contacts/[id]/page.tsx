import Link from "next/link";
import { DeleteContactButton } from "@/components/delete-contact-button";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contacts";
import { createClient } from "@/lib/supabase/server";

export default async function ContactPage({
  params,
}: PageProps<"/contacts/[id]">) {
  const { id } = await params;
  const contact = await getContact(id);

  const supabase = await createClient();
  const [{ count: conversationCount }, { count: taskCount }] = await Promise.all([
    supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("contact_id", contact.id),
    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("contact_id", contact.id),
  ]);

  const details = [
    { label: "Company", value: contact.company },
    { label: "Role", value: contact.role },
    { label: "Related job", value: contact.related_job },
    { label: "How we met", value: contact.how_we_met },
    { label: "Email", value: contact.email },
    { label: "LinkedIn", value: contact.linkedin },
    { label: "Notes", value: contact.notes },
  ];

  return (
    <div>
      <Link href="/contacts" className="text-sm text-muted-foreground hover:text-foreground">
        ← Contacts
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{contact.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/contacts/${contact.id}/edit`} />}
          >
            Edit
          </Button>
          <DeleteContactButton
            id={contact.id}
            name={contact.name}
            conversationCount={conversationCount ?? 0}
            taskCount={taskCount ?? 0}
          />
        </div>
      </div>
      <dl className="mt-4 grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt className="text-sm text-muted-foreground">{detail.label}</dt>
            <dd className="whitespace-pre-wrap break-words">{detail.value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
