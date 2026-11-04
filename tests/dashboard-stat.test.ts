import type { SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getDashboardStats } from "@/lib/dashboard";
import { addDays, todayString } from "@/lib/dates";
import { signUpTestUser } from "./helpers";

describe("dashboard overdue tasks stat", () => {
  const today = todayString();
  let user: SupabaseClient;
  let contactId: number;

  // Given one unfinished task due yesterday, one finished task due yesterday,
  // and one unfinished task due tomorrow
  beforeAll(async () => {
    user = await signUpTestUser();

    const { data, error } = await user
      .from("contacts")
      .insert({ name: "Test Contact" })
      .select("id")
      .single();
    expect(error).toBeNull();
    contactId = data!.id;

    const { error: taskError } = await user.from("tasks").insert([
      {
        contact_id: contactId,
        title: "Unfinished, due yesterday",
        due_date: addDays(today, -1),
        priority: "high",
        status: "to do",
      },
      {
        contact_id: contactId,
        title: "Finished, due yesterday",
        due_date: addDays(today, -1),
        priority: "high",
        status: "done",
      },
      {
        contact_id: contactId,
        title: "Unfinished, due tomorrow",
        due_date: addDays(today, 1),
        priority: "high",
        status: "to do",
      },
    ]);
    expect(taskError).toBeNull();
  });

  afterAll(async () => {
    await user?.from("contacts").delete().eq("id", contactId);
  });

  // When they open the dashboard, then "Overdue tasks" shows 1
  it("counts only the unfinished task that is past its due date", async () => {
    const stats = await getDashboardStats(user, today);
    expect(stats.overdueTasks).toBe(1);
  });
});
