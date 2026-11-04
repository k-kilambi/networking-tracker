"use client";

import { deleteContact } from "@/app/(app)/contacts/actions";
import { Button } from "@/components/ui/button";

type DeleteContactButtonProps = {
  id: number;
  name: string;
  conversationCount: number;
  taskCount: number;
};

export function DeleteContactButton({
  id,
  name,
  conversationCount,
  taskCount,
}: DeleteContactButtonProps) {
  const message =
    `Are you sure you want to delete ${name}? ` +
    `This also deletes ${conversationCount} conversation(s), ${taskCount} task(s), and any star. ` +
    "This can't be undone.";

  return (
    <form
      action={deleteContact.bind(null, id)}
      onSubmit={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
