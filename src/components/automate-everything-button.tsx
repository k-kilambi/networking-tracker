"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Check, Sparkles, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { upvoteIdea } from "@/app/(app)/idea-actions";
import { Button } from "@/components/ui/button";
import { FUTURE_IDEAS } from "@/lib/future-ideas";

export function AutomateEverythingButton({ upvotedIdeaIds }: { upvotedIdeaIds: string[] }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        render={
          <Button
            size="sm"
            className="bg-linear-to-r from-primary to-fuchsia-600 text-white shadow-sm hover:brightness-110"
          />
        }
      >
        <Sparkles aria-hidden="true" />
        Automate Everything
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-surface p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Coming soon</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Less typing, more following up. Upvote the ideas you&apos;d use most.
          </Dialog.Description>
          <ul className="mt-4 space-y-3 text-sm">
            {FUTURE_IDEAS.map((idea) => (
              <li key={idea.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{idea.title}</p>
                  <p className="text-muted-foreground">{idea.description}</p>
                </div>
                <UpvoteControl
                  ideaId={idea.id}
                  title={idea.title}
                  isUpvoted={upvotedIdeaIds.includes(idea.id)}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <Dialog.Close render={<Button variant="outline" />}>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type UpvoteControlProps = {
  ideaId: string;
  title: string;
  isUpvoted: boolean;
};

function UpvoteControl({ ideaId, title, isUpvoted }: UpvoteControlProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  if (isUpvoted) {
    return (
      <span className="flex h-7 shrink-0 items-center gap-1 text-[0.8rem] font-medium text-muted-foreground">
        <Check aria-hidden="true" className="size-3.5" />
        Upvoted
      </span>
    );
  }

  function handleClick() {
    setError(undefined);
    startTransition(async () => {
      const result = await upvoteIdea(ideaId);
      setError(result.error);
    });
  }

  return (
    <div className="shrink-0 text-right">
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        aria-label={`Upvote this: ${title}`}
        onClick={handleClick}
      >
        <ThumbsUp aria-hidden="true" />
        Upvote this
      </Button>
      {error && (
        <p role="alert" className="mt-1 max-w-32 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
