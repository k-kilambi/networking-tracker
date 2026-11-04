import Link from "next/link";
import { ContactTable } from "@/components/contact-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactWithStar } from "@/lib/contacts";
import { createClient } from "@/lib/supabase/server";

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

// Keeps characters like commas and % in a search from changing what the filter means.
function searchFilter(search: string) {
  const escaped = search.replace(/[\\%_]/g, "\\$&").replace(/[\\"]/g, "\\$&");
  return ["name", "company", "related_job"]
    .map((column) => `${column}.ilike."%${escaped}%"`)
    .join(",");
}

export default async function ContactsPage({
  searchParams,
}: PageProps<"/contacts">) {
  const params = await searchParams;
  const search = firstValue(params.q);
  const company = firstValue(params.company);
  const sort = firstValue(params.sort) === "name" ? "name" : "newest";
  const isFiltering = Boolean(search || company);

  const supabase = await createClient();
  let query = supabase.from("contacts").select("*, stars(id)");

  if (search) {
    query = query.or(searchFilter(search));
  }
  if (company) {
    query = query.eq("company", company);
  }
  query =
    sort === "name"
      ? query.order("name")
      : query.order("created_at", { ascending: false });

  const [{ data }, { data: companyRows }] = await Promise.all([
    query,
    supabase.from("contacts").select("company").not("company", "is", null),
  ]);
  const contacts: ContactWithStar[] = data ?? [];
  const companies = [...new Set((companyRows ?? []).map((row) => row.company as string))].sort(
    (a, b) => a.localeCompare(b),
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <Button nativeButton={false} render={<Link href="/contacts/new" />}>
          Add contact
        </Button>
      </div>

      <form className="mt-4 flex flex-wrap items-end gap-2" action="/contacts">
        <label className="min-w-48 flex-1 text-sm font-medium">
          Search
          <Input
            name="q"
            type="search"
            defaultValue={search}
            placeholder="Name, company, or related job"
            className="mt-1 bg-surface"
          />
        </label>
        <label className="text-sm font-medium">
          Company
          <select
            name="company"
            defaultValue={company}
            className="mt-1 block h-8 rounded-lg border border-input bg-surface px-2 text-sm"
          >
            <option value="">All companies</option>
            {companies.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Sort by
          <select
            name="sort"
            defaultValue={sort}
            className="mt-1 block h-8 rounded-lg border border-input bg-surface px-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
        <Button type="submit" variant="outline">
          Apply
        </Button>
        {isFiltering && (
          <Button variant="ghost" nativeButton={false} render={<Link href="/contacts" />}>
            Clear
          </Button>
        )}
      </form>

      {contacts.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          {isFiltering
            ? "No contacts match. Try a different search or clear the filters."
            : "No contacts yet. Add the first person you want to keep in touch with."}
        </p>
      ) : (
        <ContactTable contacts={contacts} />
      )}
    </div>
  );
}
