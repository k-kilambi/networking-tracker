-- Feature 2: contacts, conversations, tasks, and stars.
-- The two-column foreign keys make sure a row can only point to the same user's rows.

create table public.contacts (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.users (id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  company text,
  role text,
  related_job text,
  how_we_met text,
  email text,
  linkedin text,
  notes text,
  created_at timestamptz not null default now(),
  unique (id, user_id)
);

create table public.conversations (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  contact_id bigint not null,
  date date not null,
  type text not null check (type in ('coffee chat', 'call', 'email', 'text', 'event')),
  notes text,
  created_at timestamptz not null default now(),
  unique (id, contact_id, user_id),
  foreign key (contact_id, user_id) references public.contacts (id, user_id) on delete cascade
);

create table public.tasks (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  contact_id bigint not null,
  conversation_id bigint,
  title text not null check (length(trim(title)) > 0),
  due_date date not null,
  priority text not null check (priority in ('high', 'medium', 'low')),
  status text not null default 'to do' check (status in ('to do', 'waiting on them', 'done')),
  notes text,
  created_at timestamptz not null default now(),
  foreign key (contact_id, user_id) references public.contacts (id, user_id) on delete cascade,
  -- Deleting a conversation keeps the task and only clears its link.
  foreign key (conversation_id, contact_id, user_id)
    references public.conversations (id, contact_id, user_id)
    on delete set null (conversation_id)
);

create table public.stars (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  contact_id bigint not null,
  created_at timestamptz not null default now(),
  unique (user_id, contact_id),
  foreign key (contact_id, user_id) references public.contacts (id, user_id) on delete cascade
);

create index contacts_user_id_idx on public.contacts (user_id);
create index conversations_contact_id_user_id_idx on public.conversations (contact_id, user_id);
create index conversations_user_id_idx on public.conversations (user_id);
create index tasks_contact_id_user_id_idx on public.tasks (contact_id, user_id);
create index tasks_user_id_due_date_idx on public.tasks (user_id, due_date);
create index tasks_conversation_idx on public.tasks (conversation_id, contact_id, user_id);
create index stars_contact_id_user_id_idx on public.stars (contact_id, user_id);

-- Row Level Security: each user can only see, add, change, or delete their own rows.
alter table public.contacts enable row level security;
alter table public.conversations enable row level security;
alter table public.tasks enable row level security;
alter table public.stars enable row level security;

create policy "Users manage their own contacts" on public.contacts
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their own conversations" on public.conversations
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their own tasks" on public.tasks
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their own stars" on public.stars
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.contacts, public.conversations, public.tasks, public.stars to authenticated;
