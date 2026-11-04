export const TASK_PRIORITIES = ["high", "medium", "low"] as const;
export const TASK_STATUSES = ["to do", "waiting on them", "done"] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: number;
  contact_id: number;
  conversation_id: number | null;
  title: string;
  due_date: string;
  priority: TaskPriority;
  status: TaskStatus;
  notes: string | null;
  created_at: string;
};

export type TaskWithContact = Task & {
  contacts: { name: string; company: string | null };
};

export const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  high: "bg-danger/10 text-danger",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-muted text-muted-foreground",
};
