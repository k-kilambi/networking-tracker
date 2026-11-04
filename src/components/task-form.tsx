"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { TaskFormState } from "@/app/(app)/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Conversation } from "@/lib/conversations";
import { formatDate } from "@/lib/dates";
import { TASK_PRIORITIES, TASK_STATUSES, type Task } from "@/lib/tasks";

const SELECT_CLASS =
  "block h-8 rounded-lg border border-input bg-surface px-2 text-sm capitalize";

type TaskFormProps = {
  action: (previous: TaskFormState, formData: FormData) => Promise<TaskFormState>;
  // Only this contact's conversations, so a task can't link to someone else's.
  conversations: Conversation[];
  defaultDueDate: string;
  task?: Task;
  cancelHref?: string;
  submitLabel: string;
};

export function TaskForm({
  action,
  conversations,
  defaultDueDate,
  task,
  cancelHref,
  submitLabel,
}: TaskFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const values = state?.values ?? task;

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <div className="space-y-1.5">
        <Label htmlFor="task-title">
          What needs doing?<span className="text-danger"> *</span>
        </Label>
        <Input
          id="task-title"
          name="title"
          defaultValue={values?.title ?? ""}
          placeholder="For example, send a follow-up"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="task-due-date">
            Due date<span className="text-danger"> *</span>
          </Label>
          <Input
            id="task-due-date"
            name="due_date"
            type="date"
            defaultValue={values?.due_date ?? defaultDueDate}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="task-priority">
            Priority<span className="text-danger"> *</span>
          </Label>
          <select
            id="task-priority"
            name="priority"
            defaultValue={values?.priority ?? "medium"}
            className={SELECT_CLASS}
          >
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="task-status">
            Status<span className="text-danger"> *</span>
          </Label>
          <select
            id="task-status"
            name="status"
            defaultValue={values?.status ?? "to do"}
            className={SELECT_CLASS}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="task-conversation">From a conversation</Label>
          <select
            id="task-conversation"
            name="conversation_id"
            defaultValue={values?.conversation_id ?? ""}
            className={SELECT_CLASS}
          >
            <option value="">None</option>
            {conversations.map((conversation) => (
              <option key={conversation.id} value={conversation.id}>
                {formatDate(conversation.date)}, {conversation.type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="task-notes">Notes</Label>
        <Textarea
          id="task-notes"
          name="notes"
          defaultValue={values?.notes ?? ""}
          placeholder="Anything to remember, like a link they sent"
        />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
        {cancelHref && (
          <Button variant="outline" nativeButton={false} render={<Link href={cancelHref} />}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
