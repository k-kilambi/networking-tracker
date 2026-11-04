import type { SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { signUpTestUser } from "./helpers";

describe("data isolation", () => {
  let userA: SupabaseClient;
  let userB: SupabaseClient;
  let contactId: number;

  // Given User A has a contact and User B has none
  beforeAll(async () => {
    userA = await signUpTestUser();
    userB = await signUpTestUser();

    const { data, error } = await userA
      .from("contacts")
      .insert({ name: "Test Contact" })
      .select("id")
      .single();

    expect(error).toBeNull();
    contactId = data!.id;
  });

  afterAll(async () => {
    await userA?.from("contacts").delete().eq("id", contactId);
  });

  it("shows User A their own contact", async () => {
    const { data } = await userA.from("contacts").select("id");
    expect(data).toHaveLength(1);
  });

  // When User B opens their contact list, then the list is empty
  it("gives User B an empty contact list", async () => {
    const { data } = await userB.from("contacts").select("id");
    expect(data).toEqual([]);
  });

  // When User B tries User A's contact by its direct link, then it isn't shown
  it("refuses to show User B that contact directly", async () => {
    const { data } = await userB
      .from("contacts")
      .select("id")
      .eq("id", contactId)
      .maybeSingle();

    expect(data).toBeNull();
  });
});
