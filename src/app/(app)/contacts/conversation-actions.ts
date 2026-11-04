"use server";

import { revalidatePath } from "next/cache";
import { CONVERSATION_TYPES } from "@/lib/conversations";
import { createClient } from "@/lib/supabase/server";

export type ConversationFormState = {
  error?: string;
  saved?: boolean;
} | null;

export async function createConversation(
  contactId: number,
  _previous: ConversationFormState,
  formData: FormData,
): Promise<ConversationFormState> {
  const date = String(formData.get("date") ?? "");
  const type = String(formData.get("type") ?? "");
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!date) {
    return { error: "Please choose the date of this conversation." };
  }
  if (!CONVERSATION_TYPES.includes(type as (typeof CONVERSATION_TYPES)[number])) {
    return { error: "Please choose what kind of conversation this was." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("conversations")
    .insert({ contact_id: contactId, date, type, notes });

  if (error) {
    return { error: "We couldn't save this conversation. Please try again." };
  }

  revalidatePath(`/contacts/${contactId}`);
  return { saved: true };
}

export async function deleteConversation(id: number, contactId: number) {
  const supabase = await createClient();
  await supabase.from("conversations").delete().eq("id", id);

  revalidatePath(`/contacts/${contactId}`);
}
