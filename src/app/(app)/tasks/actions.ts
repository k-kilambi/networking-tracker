"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TASK_PRIORITIES, TASK_STATUSES, type TaskPriority, type TaskStatus } from "@/lib/tasks";

type TaskValues = {
  title: string;
  due_date: string;
  priority: string;
  status: string;
  notes: string | null;
  conversation_id: number | null;
};

export type TaskFormState = {
  error?: string;
  saved?: boolean;
  values?: TaskValues;
} | null;

function readTask(formData: FormData): TaskValues {
  const conversationId = String(formData.get("conversation_id") ?? "");

  return {
    title: String(formData.get("title") ?? "").trim(),
    due_date: String(formData.get("due_date") ?? ""),
    priority: String(formData.get("priority") ?? ""),
    status: String(formData.get("status") ?? ""),
    notes: String(formData.get("notes") ?? "").trim() || null,
    conversation_id: conversationId ? Number(conversationId) : null,
  };
}

function validationError(values: TaskValues) {
  if (!values.title) {
    return "Please add what you need to do.";
  }
  if (!values.due_date) {
    return "Please choose a due date.";
  }
  if (!TASK_PRIORITIES.includes(values.priority as TaskPriority)) {
    return "Please choose a priority.";
  }
  if (!TASK_STATUSES.includes(values.status as TaskStatus)) {
    return "Please choose a status.";
  }
  return null;
}

function revalidateTaskPages(contactId: number) {
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath(`/contacts/${contactId}`);
}

export async function createTask(
  contactId: number,
  _previous: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const values = readTask(formData);
  const error = validationError(values);
  if (error) {
    return { error, values };
  }

  const supabase = await createClient();
  const { error: saveError } = await supabase
    .from("tasks")
    .insert({ ...values, contact_id: contactId });

  if (saveError) {
    return { error: "We couldn't save this task. Please try again.", values };
  }

  revalidateTaskPages(contactId);
  return { saved: true };
}

export async function updateTask(
  id: number,
  contactId: number,
  _previous: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const values = readTask(formData);
  const error = validationError(values);
  if (error) {
    return { error, values };
  }

  const supabase = await createClient();
  const { error: saveError } = await supabase
    .from("tasks")
    .update(values)
    .eq("id", id);

  if (saveError) {
    return { error: "We couldn't save your changes. Please try again.", values };
  }

  revalidateTaskPages(contactId);
  redirect(`/contacts/${contactId}`);
}

export async function setTaskDone(
  id: number,
  contactId: number,
  isDone: boolean,
) {
  const supabase = await createClient();
  await supabase
    .from("tasks")
    .update({ status: isDone ? "done" : "to do" })
    .eq("id", id);

  revalidateTaskPages(contactId);
}

export async function deleteTask(id: number, contactId: number) {
  const supabase = await createClient();
  await supabase.from("tasks").delete().eq("id", id);

  revalidateTaskPages(contactId);
}
