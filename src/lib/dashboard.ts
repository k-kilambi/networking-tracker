import type { SupabaseClient } from "@supabase/supabase-js";
import { addDays, formatShortDate } from "@/lib/dates";

const WEEKS_SHOWN = 8;

export type DashboardStats = {
  openTasks: number;
  overdueTasks: number;
  conversationsThisMonth: number;
  conversationsPerWeek: { week: string; label: string; conversations: number }[];
};

type TaskRow = { due_date: string; status: string };
type ConversationRow = { date: string };

function mondayOf(date: string) {
  const dayOfWeek = new Date(`${date}T00:00:00Z`).getUTCDay();
  return addDays(date, -((dayOfWeek + 6) % 7));
}

export function computeDashboardStats(
  tasks: TaskRow[],
  conversations: ConversationRow[],
  today: string,
): DashboardStats {
  const openTasks = tasks.filter((task) => task.status !== "done");
  const overdueTasks = openTasks.filter((task) => task.due_date < today);
  const thisMonth = today.slice(0, 7);

  const thisWeek = mondayOf(today);
  const conversationsPerWeek = Array.from({ length: WEEKS_SHOWN }, (_, index) => {
    const week = addDays(thisWeek, (index - WEEKS_SHOWN + 1) * 7);
    return {
      week,
      label: formatShortDate(week),
      conversations: conversations.filter(
        (conversation) => mondayOf(conversation.date) === week,
      ).length,
    };
  });

  return {
    openTasks: openTasks.length,
    overdueTasks: overdueTasks.length,
    conversationsThisMonth: conversations.filter((conversation) =>
      conversation.date.startsWith(thisMonth),
    ).length,
    conversationsPerWeek,
  };
}

// Row Level Security limits these queries to the logged-in user's rows.
export async function getDashboardStats(supabase: SupabaseClient, today: string) {
  const [{ data: tasks }, { data: conversations }] = await Promise.all([
    supabase.from("tasks").select("due_date, status"),
    supabase.from("conversations").select("date"),
  ]);

  return computeDashboardStats(tasks ?? [], conversations ?? [], today);
}
