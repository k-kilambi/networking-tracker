-- Upvotes on the future ideas in the Automate Everything popup.
-- One upvote per user per idea. There's no update or delete rule, so an upvote is permanent.

create table public.idea_upvotes (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.users (id) on delete cascade,
  idea_id text not null check (
    idea_id in ('email', 'granola', 'browser-extension', 'ai-input', 'email-reminders', 'job-applications')
  ),
  created_at timestamptz not null default now(),
  unique (user_id, idea_id)
);

alter table public.idea_upvotes enable row level security;

create policy "Users see their own upvotes" on public.idea_upvotes
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users add their own upvotes" on public.idea_upvotes
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

grant select, insert on public.idea_upvotes to authenticated;
