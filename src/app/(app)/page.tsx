import Link from "next/link";
import { TaskGroupList } from "@/components/task-group-list";
import { Button } from "@/components/ui/button";
import { addDays, todayString } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";
import { TASK_PRIORITIES, type TaskPriority, type TaskWithContact } from "@/lib/tasks";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const priority = TASK_PRIORITIES.find((value) => value === params.priority);
  const today = todayString();
  const nextWeek = addDays(today, 7);

  const supabase = await createClient();
  let query = supabase
    .from("tasks")
    .select("*, contacts(name, company)")
    .neq("status", "done")
    .lte("due_date", nextWeek)
    .order("due_date");

  if (priority) {
    query = query.eq("priority", priority);
  }

  const [{ data }, { count: contactCount }] = await Promise.all([
    query,
    supabase.from("contacts").select("*", { count: "exact", head: true }),
  ]);
  const tasks: TaskWithContact[] = data ?? [];
  const needsAttention = tasks.filter((task) => task.due_date <= today);
  const comingUp = tasks.filter((task) => task.due_date > today);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Home</h1>
        <PriorityFilter selected={priority} />
      </div>

      {contactCount === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-semibold">Start with one person</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add someone you&apos;re talking to, then add what you need to do for them. It will show up here.
          </p>
          <Button className="mt-4" nativeButton={false} render={<Link href="/contacts/new" />}>
            Add your first contact
          </Button>
        </div>
      ) : (
        <>
          <section className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Needs attention</h2>
            {needsAttention.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing due today or earlier{priority ? ` at ${priority} priority` : ""}.
              </p>
            ) : (
              <TaskGroupList tasks={needsAttention} />
            )}
          </section>
          <section className="mt-8">
            <h2 className="mb-2 text-lg font-semibold">Coming up in the next 7 days</h2>
            {comingUp.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing coming up{priority ? ` at ${priority} priority` : ""}.
              </p>
            ) : (
              <TaskGroupList tasks={comingUp} />
            )}
          </section>
        </>
      )}
    </div>
  );
}

function PriorityFilter({ selected }: { selected?: TaskPriority }) {
  const options = [
    { label: "All", href: "/", isActive: !selected },
    ...TASK_PRIORITIES.map((priority) => ({
      label: priority,
      href: `/?priority=${priority}`,
      isActive: selected === priority,
    })),
  ];

  return (
    <nav aria-label="Filter by priority" className="flex items-center gap-1 text-sm">
      <span className="mr-1 text-muted-foreground">Priority:</span>
      {options.map((option) => (
        <Link
          key={option.label}
          href={option.href}
          aria-current={option.isActive ? "true" : undefined}
          className={`rounded-full px-2.5 py-0.5 capitalize ${
            option.isActive
              ? "bg-primary font-medium text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
