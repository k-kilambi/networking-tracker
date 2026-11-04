import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Contact = {
  id: number;
  name: string;
  company: string | null;
  role: string | null;
  related_job: string | null;
  how_we_met: string | null;
  email: string | null;
  linkedin: string | null;
  notes: string | null;
  created_at: string;
};

// A user can star a contact once, so Supabase returns one star or null, not a list.
export type ContactWithStar = Contact & { stars: { id: number } | null };

// Row Level Security means another user's contact comes back as not found.
export async function getContact(idParam: string): Promise<ContactWithStar> {
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    notFound();
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*, stars(id)")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  return data;
}
