-- ============================================================
-- Lakshya Groups — Client Portal database schema
-- Run this in the Supabase SQL Editor:
--   https://supabase.com/dashboard/project/<ref>/sql/new
--
-- Order matters: all tables are created FIRST, then policies,
-- so the file runs top-to-bottom without errors.
-- ============================================================

-- ------------------------------------------------------------
-- TABLES
-- ------------------------------------------------------------

-- 1) Profiles — one row per auth user, created automatically on signup
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  phone text,
  created_at timestamptz not null default now()
);

-- Admin flag on profiles (needed by is_admin() below)
alter table public.profiles add column if not exists is_admin boolean not null default false;

-- 2) Client projects — work assigned to a client
create table if not exists public.client_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'on_hold', 'completed')),
  progress int not null default 0 check (progress between 0 and 100),
  updated_at timestamptz not null default now()
);

-- 3) Quote requests — submitted from the portal
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  service text not null,
  details text,
  status text not null default 'pending'
    check (status in ('pending', 'quoted', 'accepted', 'declined')),
  created_at timestamptz not null default now()
);

-- 4) Contact form leads (server-side writes only)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read')),
  created_at timestamptz not null default now()
);

-- Indexes for RLS lookups
create index if not exists client_projects_user_id_idx
  on public.client_projects (user_id);
create index if not exists quote_requests_user_id_idx
  on public.quote_requests (user_id);

-- ------------------------------------------------------------
-- HELPERS
-- ------------------------------------------------------------

-- Helper: check if a user is admin
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = uid), false);
$$;

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.client_projects enable row level security;
alter table public.quote_requests enable row level security;
alter table public.contact_messages enable row level security;

-- profiles: users manage only their own row
create policy "profiles_select_own"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own"
  on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own"
  on public.profiles for update using (auth.uid() = id);

-- client_projects: clients can only READ their own projects.
-- Creating/updating projects is admin work — do it from the dashboard
-- or with the service-role key (never via the anon key).
create policy "projects_select_own"
  on public.client_projects for select using (auth.uid() = user_id);

-- quote_requests: users create and track their own requests
create policy "quotes_select_own"
  on public.quote_requests for select using (auth.uid() = user_id);
create policy "quotes_insert_own"
  on public.quote_requests for insert with check (auth.uid() = user_id);
create policy "quotes_update_own"
  on public.quote_requests for update using (auth.uid() = user_id);

-- Allow anyone (anonymous) to insert contact messages
create policy "contact_insert_anonymous"
  on public.contact_messages for insert
  with check (true);

-- Admin policies: admins can read all data
create policy "admin_select_all_profiles"
  on public.profiles for select
  using (public.is_admin(auth.uid()));

create policy "admin_update_profiles"
  on public.profiles for update
  using (public.is_admin(auth.uid()));

create policy "admin_select_all_projects"
  on public.client_projects for select
  using (public.is_admin(auth.uid()));
create policy "admin_insert_projects"
  on public.client_projects for insert
  with check (public.is_admin(auth.uid()));
create policy "admin_update_projects"
  on public.client_projects for update
  using (public.is_admin(auth.uid()));

create policy "admin_select_all_quotes"
  on public.quote_requests for select
  using (public.is_admin(auth.uid()));
create policy "admin_update_quotes"
  on public.quote_requests for update
  using (public.is_admin(auth.uid()));

create policy "admin_select_all_messages"
  on public.contact_messages for select
  using (public.is_admin(auth.uid()));
create policy "admin_update_messages"
  on public.contact_messages for update
  using (public.is_admin(auth.uid()));
