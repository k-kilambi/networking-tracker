import Link from "next/link";
import { TaskRow } from "@/components/task-row";
import type { TaskWithContact } from "@/lib/tasks";

type TaskGroup = {
  contact: TaskWithContact["contacts"];
  tasks: TaskWithContact[];
};

function groupByContact(tasks: TaskWithContact[]) {
  const groups = new Map<number, TaskGroup>();

  for (const task of tasks) {
    const group = groups.get(task.contact_id);
    if (group) {
      group.tasks.push(task);
    } else {
      groups.set(task.contact_id, { contact: task.contacts, tasks: [task] });
    }
  }

  return [...groups.entries()];
}

export function TaskGroupList({ tasks }: { tasks: TaskWithContact[] }) {
  return (
    <div className="space-y-3">
      {groupByContact(tasks).map(([contactId, group]) => (
        <section
          key={contactId}
          className="overflow-hidden rounded-lg border border-border bg-surface"
        >
          <h3 className="border-b border-border px-3 py-2 text-sm font-semibold">
            <Link href={`/contacts/${contactId}`} className="hover:text-primary hover:underline">
              {group.contact.name}
              {group.contact.company && (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  · {group.contact.company}
                </span>
              )}
            </Link>
          </h3>
          <ul className="divide-y divide-border">
            {group.tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
