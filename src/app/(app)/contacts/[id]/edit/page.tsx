import { updateContact } from "@/app/(app)/contacts/actions";
import { ContactForm } from "@/components/contact-form";
import { getContact } from "@/lib/contacts";

export default async function EditContactPage({
  params,
}: PageProps<"/contacts/[id]/edit">) {
  const { id } = await params;
  const contact = await getContact(id);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Edit {contact.name}</h1>
      <ContactForm
        action={updateContact.bind(null, contact.id)}
        contact={contact}
        cancelHref={`/contacts/${contact.id}`}
        submitLabel="Save changes"
      />
    </div>
  );
}
