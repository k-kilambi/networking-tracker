"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/actions";

type AuthFormProps = {
  title: string;
  submitLabel: string;
  action: (previous: AuthState, formData: FormData) => Promise<AuthState>;
  switchText: string;
  switchHref: string;
  switchLabel: string;
};

export function AuthForm({
  title,
  submitLabel,
  action,
  switchText,
  switchHref,
  switchLabel,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-xl font-semibold">{title}</h1>
        <form action={formAction} className="mt-5 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm text-danger">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-primary px-3 py-2 font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? "One moment..." : submitLabel}
          </button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          {switchText}{" "}
          <Link href={switchHref} className="font-medium text-primary hover:underline">
            {switchLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}
