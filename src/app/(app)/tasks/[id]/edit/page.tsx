import { notFound } from "next/navigation";
import { updateTask } from "@/app/(app)/tasks/actions";
import { TaskForm } from "@/components/task-form";
import type { Conversation } from "@/lib/conversations";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/tasks";

export default async function EditTaskPage({
  params,
}: PageProps<"/tasks/[id]/edit">) {
  const { id } = await params;
  const taskId = Number(id);
  if (!Number.isInteger(taskId)) {
    notFound();
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .maybeSingle();
  if (!data) {
    notFound();
  }
  const task: Task = data;

  const { data: conversationRows } = await supabase
    .from("conversations")
    .select("*")
    .eq("contact_id", task.contact_id)
    .order("date", { ascending: false });
  const conversations: Conversation[] = conversationRows ?? [];

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold">Edit task</h1>
      <TaskForm
        action={updateTask.bind(null, task.id, task.contact_id)}
        conversations={conversations}
        defaultDueDate={task.due_date}
        task={task}
        cancelHref={`/contacts/${task.contact_id}`}
        submitLabel="Save changes"
      />
    </div>
  );
}
