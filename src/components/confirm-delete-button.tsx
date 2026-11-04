"use client";

import { Button } from "@/components/ui/button";

export function ConfirmDeleteButton({
  action,
  message,
  label,
}: {
  action: () => Promise<void>;
  message: string;
  label: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      <Button type="submit" variant="ghost" size="sm" aria-label={label}>
        Delete
      </Button>
    </form>
  );
}
