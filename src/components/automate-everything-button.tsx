"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";

const FUTURE_IDEAS = [
  {
    title: "Email connection",
    description: "Connect Gmail so your conversations log themselves.",
  },
  {
    title: "Call notes from Granola",
    description: "Turn your calls into contacts, conversations, and tasks.",
  },
  {
    title: "Browser extension",
    description: "Save someone as a contact right from the page you're on.",
  },
  {
    title: "AI input",
    description: "Describe what happened, and let AI fill in the details.",
  },
  {
    title: "Email reminders",
    description: "Get a nudge when a follow-up is due.",
  },
  {
    title: "Job application tracking",
    description: "Connect companies and applications to your contacts, and link your ATS tool.",
  },
];

export function AutomateEverythingButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="secondary" size="sm" />}>
        Automate Everything
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 max-h-[85vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-surface p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Coming soon</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-muted-foreground">
            Less typing, more following up. Here&apos;s what could come next.
          </Dialog.Description>
          <ul className="mt-4 space-y-3 text-sm">
            {FUTURE_IDEAS.map((idea) => (
              <li key={idea.title}>
                <p className="font-medium">{idea.title}</p>
                <p className="text-muted-foreground">{idea.description}</p>
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
