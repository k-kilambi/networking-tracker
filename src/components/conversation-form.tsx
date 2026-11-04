"use client";

import { useActionState } from "react";
import {
  createConversation,
  type ConversationFormState,
} from "@/app/(app)/contacts/conversation-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONVERSATION_TYPES } from "@/lib/conversations";

export function ConversationForm({
  contactId,
  today,
}: {
  contactId: number;
  today: string;
}) {
  const [state, formAction, isPending] = useActionState<ConversationFormState, FormData>(
    createConversation.bind(null, contactId),
    null,
  );

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="conversation-date">
            Date<span className="text-danger"> *</span>
          </Label>
          <Input id="conversation-date" name="date" type="date" defaultValue={today} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="conversation-type">
            Type<span className="text-danger"> *</span>
          </Label>
          <select
            id="conversation-type"
            name="type"
            defaultValue=""
            className="block h-8 rounded-lg border border-input bg-surface px-2 text-sm capitalize"
          >
            <option value="" disabled>
              Choose one
            </option>
            {CONVERSATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="conversation-notes">Notes</Label>
        <Textarea
          id="conversation-notes"
          name="notes"
          placeholder="What did you talk about?"
        />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Log conversation"}
      </Button>
    </form>
  );
}
