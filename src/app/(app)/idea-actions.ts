"use server";

import { revalidatePath } from "next/cache";
import { FUTURE_IDEAS } from "@/lib/future-ideas";
import { createClient } from "@/lib/supabase/server";

const UNIQUE_VIOLATION = "23505";

export async function upvoteIdea(ideaId: string) {
  if (!FUTURE_IDEAS.some((idea) => idea.id === ideaId)) {
    return { error: "We couldn't save that. Please try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("idea_upvotes").insert({ idea_id: ideaId });

  // Already upvoted, for example in another tab, is the result the user wanted.
  if (error && error.code !== UNIQUE_VIOLATION) {
    return { error: "We couldn't save that. Please try again." };
  }

  revalidatePath("/", "layout");
  return {};
}
