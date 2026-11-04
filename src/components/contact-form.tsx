"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ContactFormState } from "@/app/(app)/contacts/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Contact } from "@/lib/contacts";

type ContactFormProps = {
  action: (
    previous: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
  contact?: Contact;
  cancelHref: string;
  submitLabel: string;
};

const TEXT_FIELDS = [
  { name: "name", label: "Name" },
  { name: "company", label: "Company" },
  { name: "role", label: "Role" },
  { name: "related_job", label: "Related job" },
  { name: "how_we_met", label: "How we met" },
  { name: "email", label: "Email", type: "email" },
  { name: "linkedin", label: "LinkedIn" },
] as const;

export function ContactForm({
  action,
  contact,
  cancelHref,
  submitLabel,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  // After an error, keep what was typed instead of clearing the form.
  const values = state?.values ?? contact;

  return (
    // noValidate swaps the browser's email error for our friendlier message.
    <form action={formAction} noValidate className="max-w-xl space-y-4">
      {TEXT_FIELDS.map((field) => {
        const fieldError =
          (field.name === "name" && state?.nameError) ||
          (field.name === "email" && state?.emailError);

        return (
          <div key={field.name} className="space-y-1.5">
            <Label htmlFor={field.name}>
              {field.label}
              {field.name === "name" && <span className="text-danger"> *</span>}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type={"type" in field ? field.type : "text"}
              defaultValue={values?.[field.name] ?? ""}
              aria-invalid={fieldError ? true : undefined}
              aria-describedby={fieldError ? `${field.name}-error` : undefined}
            />
            {fieldError && (
              <p id={`${field.name}-error`} role="alert" className="text-sm text-danger">
                {fieldError}
              </p>
            )}
          </div>
        );
      })}
      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={values?.notes ?? ""}
          aria-describedby="notes-hint"
        />
        <p id="notes-hint" className="text-sm text-muted-foreground">
          For background on this person. You can add tasks, like a follow-up, on the next screen.
        </p>
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href={cancelHref} />}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
