import Link from "next/link";
import { deleteTask, setTaskDone } from "@/app/(app)/tasks/actions";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { LinkedText } from "@/components/linked-text";
import { formatDate, todayString } from "@/lib/dates";
import { PRIORITY_CLASSES, type Task } from "@/lib/tasks";

export function TaskRow({ task }: { task: Task }) {
  const isDone = task.status === "done";
  const isOverdue = !isDone && task.due_date < todayString();
  const doneLabel = isDone
    ? `Mark ${task.title} as not done`
    : `Mark ${task.title} as done`;

  return (
    <li className="flex items-start gap-3 p-3">
      <form action={setTaskDone.bind(null, task.id, task.contact_id, !isDone)}>
        <button
          type="submit"
          role="checkbox"
          aria-checked={isDone}
          aria-label={doneLabel}
          title={doneLabel}
          className={`mt-0.5 flex size-5 items-center justify-center rounded-full border text-xs ${
            isDone
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground hover:border-primary"
          }`}
        >
          {isDone && "✓"}
        </button>
      </form>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${isDone ? "text-muted-foreground line-through" : ""}`}>
          {task.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className={isOverdue ? "font-medium text-danger" : "text-muted-foreground"}>
            {isOverdue ? "Overdue: " : "Due "}
            {formatDate(task.due_date)}
          </span>
          <span className={`rounded-full px-2 py-0.5 font-medium capitalize ${PRIORITY_CLASSES[task.priority]}`}>
            {task.priority}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 capitalize text-muted-foreground">
            {task.status}
          </span>
        </div>
        {task.notes && (
          <p className="mt-1 whitespace-pre-wrap break-words text-sm text-muted-foreground">
            <LinkedText text={task.notes} />
          </p>
        )}
      </div>
      <div className="flex items-center">
        <Link
          href={`/tasks/${task.id}/edit`}
          aria-label={`Edit ${task.title}`}
          className="rounded px-2 py-1 text-sm font-medium hover:bg-muted"
        >
          Edit
        </Link>
        <ConfirmDeleteButton
          action={deleteTask.bind(null, task.id, task.contact_id)}
          label={`Delete ${task.title}`}
          message={`Delete "${task.title}"? This can't be undone.`}
        />
      </div>
    </li>
  );
}
