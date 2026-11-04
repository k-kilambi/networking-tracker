import Link from "next/link";
import { createTask } from "@/app/(app)/tasks/actions";
import { ConversationForm } from "@/components/conversation-form";
import { ConversationList } from "@/components/conversation-list";
import { DeleteContactButton } from "@/components/delete-contact-button";
import { StarButton } from "@/components/star-button";
import { TaskForm } from "@/components/task-form";
import { TaskRow } from "@/components/task-row";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contacts";
import type { Conversation } from "@/lib/conversations";
import { todayString } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/tasks";

export default async function ContactPage({
  params,
}: PageProps<"/contacts/[id]">) {
  const { id } = await params;
  const contact = await getContact(id);

  const supabase = await createClient();
  const [{ data: conversationRows }, { data: taskRows }] = await Promise.all([
    supabase
      .from("conversations")
      .select("*")
      .eq("contact_id", contact.id)
      .order("date", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("tasks")
      .select("*")
      .eq("contact_id", contact.id)
      .order("due_date"),
  ]);
  const conversations: Conversation[] = conversationRows ?? [];
  const tasks: Task[] = taskRows ?? [];
  const today = todayString();
  // Unfinished tasks first, soonest due at the top.
  const sortedTasks = [
    ...tasks.filter((task) => task.status !== "done"),
    ...tasks.filter((task) => task.status === "done"),
  ];

  const details = [
    { label: "Company", value: contact.company },
    { label: "Role", value: contact.role },
    { label: "Related job", value: contact.related_job },
    { label: "How we met", value: contact.how_we_met },
    { label: "Email", value: contact.email },
    { label: "LinkedIn", value: contact.linkedin },
    { label: "Notes", value: contact.notes },
  ];

  return (
    <div>
      <Link href="/contacts" className="text-sm text-muted-foreground hover:text-foreground">
        ← Contacts
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <StarButton
            contactId={contact.id}
            name={contact.name}
            isStarred={contact.stars !== null}
          />
          <h1 className="text-xl font-semibold">{contact.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/contacts/${contact.id}/edit`} />}
          >
            Edit
          </Button>
          <DeleteContactButton
            id={contact.id}
            name={contact.name}
            conversationCount={conversations.length}
            taskCount={tasks.length}
          />
        </div>
      </div>
      <dl className="mt-4 grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt className="text-sm text-muted-foreground">{detail.label}</dt>
            <dd className="whitespace-pre-wrap break-words">{detail.value || "—"}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <TaskForm
          action={createTask.bind(null, contact.id)}
          conversations={conversations}
          defaultDueDate={today}
          submitLabel="Add task"
        />
        {sortedTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks for this person yet.</p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <ConversationForm contactId={contact.id} today={today} />
        <ConversationList conversations={conversations} />
      </section>
    </div>
  );
}
