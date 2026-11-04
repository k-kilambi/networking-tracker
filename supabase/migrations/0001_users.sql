-- Feature 1: the users table.
-- Supabase Auth keeps passwords in its own protected area (auth.users).
-- This table holds one row per account for the rest of the app to reference.

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: with this on, no one can read any row unless a rule allows it.
alter table public.users enable row level security;

create policy "Users can see their own row"
  on public.users for select
  using ((select auth.uid()) = id);

-- Trigger: whenever Supabase Auth creates an account, add the matching row here.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
