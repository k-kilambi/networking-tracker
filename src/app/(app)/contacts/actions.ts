"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ContactValues = ReturnType<typeof readContact>;

export type ContactFormState = {
  error?: string;
  nameError?: string;
  values?: ContactValues;
} | null;

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
  const values = readContact(formData);
  if (!values.name) {
    return { nameError: "Please add this person's name.", values };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .insert(values)
    .select("id")
    .single();

  if (error) {
    return { error: "We couldn't save this contact. Please try again.", values };
  }

  revalidatePath("/contacts");
  redirect(`/contacts/${data.id}`);
}

export async function updateContact(
  id: number,
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = readContact(formData);
  if (!values.name) {
    return { nameError: "Please add this person's name.", values };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contacts").update(values).eq("id", id);

  if (error) {
    return { error: "We couldn't save your changes. Please try again.", values };
  }

  revalidatePath("/contacts");
  redirect(`/contacts/${id}`);
}

export async function toggleStar(contactId: number, isStarred: boolean) {
  const supabase = await createClient();

  if (isStarred) {
    await supabase.from("stars").delete().eq("contact_id", contactId);
  } else {
    await supabase.from("stars").insert({ contact_id: contactId });
  }

  revalidatePath("/contacts");
  revalidatePath(`/contacts/${contactId}`);
  revalidatePath("/starred");
}

export async function deleteContact(id: number) {
  const supabase = await createClient();
  await supabase.from("contacts").delete().eq("id", id);

  revalidatePath("/contacts");
  redirect("/contacts");
}
