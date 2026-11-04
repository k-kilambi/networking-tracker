import Link from "next/link";
import { StarButton } from "@/components/star-button";
import type { ContactWithStar } from "@/lib/contacts";

export function ContactTable({ contacts }: { contacts: ContactWithStar[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border text-muted-foreground">
          <tr>
            <th className="w-10 px-2 py-2 font-medium">
              <span className="sr-only">Star</span>
            </th>
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Company</th>
            <th className="px-4 py-2 font-medium">Role</th>
            <th className="px-4 py-2 font-medium">Related job</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b border-border last:border-0">
              <td className="px-2 py-1.5">
                <StarButton
                  contactId={contact.id}
                  name={contact.name}
                  isStarred={contact.stars !== null}
                />
              </td>
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
  );
}
