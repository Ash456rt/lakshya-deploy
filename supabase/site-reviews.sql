-- site_reviews — first-party review system for lakshyagroups.in (no Google needed).
-- Clients submit → rows land as 'pending' → you approve in Supabase Table Editor
-- (or SQL) → approved reviews show on /reviews and can seed aggregateRating later
-- once a real base exists. Never fabricate ratings.

create table if not exists public.site_reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  role        text,
  company     text,
  rating      int  not null check (rating between 1 and 5),
  quote       text not null check (char_length(quote) between 20 and 1200),
  project     text,                        -- optional: which service was used
  email       text,                        -- optional: for verification, never shown
  approved    boolean not null default false,
  approved_at timestamptz,
  featured    boolean not null default false
);

alter table public.site_reviews enable row level security;

-- Public read: approved rows only.
drop policy if exists "site_reviews public read approved" on public.site_reviews;
create policy "site_reviews public read approved"
  on public.site_reviews for select
  to anon, authenticated
  using (approved = true);

-- Public insert: always lands unapproved (moderation queue).
drop policy if exists "site_reviews anon insert pending" on public.site_reviews;
create policy "site_reviews anon insert pending"
  on public.site_reviews for insert
  to anon
  with check (approved = false);

-- Admin updates (approve/feature/edit) happen with the service key from the
-- dashboard / SQL editor — no public update path exists at all.
revoke all on public.site_reviews from anon;
grant insert, select on public.site_reviews to anon;

-- Approve helper (run in SQL Editor):
-- update public.site_reviews set approved = true, approved_at = now() where id = '<id>';
