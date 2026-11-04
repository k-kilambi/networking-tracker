import { createContact } from "@/app/(app)/contacts/actions";
import { ContactForm } from "@/components/contact-form";

export default function NewContactPage() {
  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Add contact</h1>
      <ContactForm
        action={createContact}
        cancelHref="/contacts"
        submitLabel="Add contact"
      />
    </div>
  );
}
