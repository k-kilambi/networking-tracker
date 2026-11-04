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

// Row Level Security means another user's contact comes back as not found.
export async function getContact(idParam: string): Promise<Contact> {
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    notFound();
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  return data;
}
