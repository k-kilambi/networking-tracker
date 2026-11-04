"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ContactFormState = { error: string } | null;

function readContact(formData: FormData) {
  const optional = (name: string) => {
    const value = String(formData.get(name) ?? "").trim();
    return value || null;
  };

  return {
    name: String(formData.get("name") ?? "").trim(),
    company: optional("company"),
    role: optional("role"),
    related_job: optional("related_job"),
    how_we_met: optional("how_we_met"),
    email: optional("email"),
    linkedin: optional("linkedin"),
    notes: optional("notes"),
  };
}

export async function createContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .insert(readContact(formData))
    .select("id")
    .single();

  if (error) {
    return { error: "We couldn't save this contact. Please try again." };
  }

  revalidatePath("/contacts");
  redirect(`/contacts/${data.id}`);
}

export async function updateContact(
  id: number,
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contacts")
    .update(readContact(formData))
    .eq("id", id);

  if (error) {
    return { error: "We couldn't save your changes. Please try again." };
  }

  revalidatePath("/contacts");
  redirect(`/contacts/${id}`);
}

export async function deleteContact(id: number) {
  const supabase = await createClient();
  await supabase.from("contacts").delete().eq("id", id);

  revalidatePath("/contacts");
  redirect("/contacts");
}
