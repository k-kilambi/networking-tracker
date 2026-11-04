import { ConversationsChart } from "@/components/conversations-chart";
import { getDashboardStats } from "@/lib/dashboard";
import { todayString } from "@/lib/dates";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const stats = await getDashboardStats(supabase, todayString());
  const hasConversations = stats.conversationsPerWeek.some(
    (week) => week.conversations > 0,
  );

  const tiles = [
    { label: "Open tasks", value: stats.openTasks },
    { label: "Overdue tasks", value: stats.overdueTasks, isAlert: stats.overdueTasks > 0 },
    { label: "Conversations this month", value: stats.conversationsThisMonth },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-lg border border-border bg-surface p-4">
            <dt className="text-sm text-muted-foreground">{tile.label}</dt>
            <dd
              data-testid={tile.label}
              className={`mt-1 text-3xl font-semibold ${tile.isAlert ? "text-danger" : ""}`}
            >
              {tile.value}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 rounded-lg border border-border bg-surface p-4">
        <h2 className="font-semibold">Conversations per week</h2>
        <p className="text-sm text-muted-foreground">The last 8 weeks, by the Monday each week starts</p>
        {hasConversations ? (
          <>
            <div className="mt-4">
              <ConversationsChart data={stats.conversationsPerWeek} />
            </div>
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-muted-foreground">Show as a table</summary>
              <table className="mt-2 text-left">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="pr-6 font-medium">Week of</th>
                    <th className="font-medium">Conversations</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.conversationsPerWeek.map((week) => (
                    <tr key={week.week}>
                      <td className="pr-6">{week.label}</td>
                      <td>{week.conversations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No conversations in the last 8 weeks. Log one on a contact&apos;s page and it will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
