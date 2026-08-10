-- Contact form leads + admin flag
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read')),
  created_at timestamptz not null default now()
);

-- No anon/client policies: writes happen server-side with the service role key,
-- reads happen in the admin dashboard (service role too).
alter table public.contact_messages enable row level security;

-- Admin flag on profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;
