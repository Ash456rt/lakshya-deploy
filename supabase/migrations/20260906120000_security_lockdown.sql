-- Security lockdown applied 2026-09-06 after manual pentest of lakshyagroups.in
-- Finding 1 (CRITICAL): authenticated users could update their own is_admin column
--                       (table-wide UPDATE grant) -> full privilege escalation.
-- Finding 2 (HIGH):     authenticated users could INSERT a profile row with
--                       is_admin=true directly (table-wide INSERT grant).
-- Finding 3 (MEDIUM):   clients could update quote_requests status (admin-only work).
-- Finding 4 (LOW):      contact form insert accepted arbitrary payloads.

-- 1+2. profiles: restrict INSERT/UPDATE to safe columns; is_admin only via
--      the set_user_admin() security-definer function below.
revoke update on public.profiles from anon, authenticated;
grant update (full_name, company, phone) on public.profiles to authenticated;

revoke insert on public.profiles from anon, authenticated;
grant insert (id, full_name, company, phone, created_at) on public.profiles to authenticated;

-- 3. clients must never update quote statuses
drop policy if exists quotes_update_own on public.quote_requests;

-- 4. contact form: basic anti-spam constraints, form flow unchanged
drop policy if exists contact_insert_anonymous on public.contact_messages;
create policy contact_insert_anonymous on public.contact_messages
  for insert to anon, authenticated
  with check (
    char_length(name) between 2 and 200
    and char_length(message) between 5 and 5000
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  );

-- Admin-only way to toggle another user's admin flag (used by admin/users page)
create or replace function public.set_user_admin(target_user uuid, admin_flag boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin(auth.uid()) then
    raise exception 'not authorized' using errcode = '42501';
  end if;
  update public.profiles set is_admin = admin_flag where id = target_user;
end;
$$;
revoke all on function public.set_user_admin(uuid, boolean) from public, anon;
grant execute on function public.set_user_admin(uuid, boolean) to authenticated;

-- ---- Contact-form rate limiting (5 submissions per IP per 10 minutes) ----
create table if not exists public.contact_rate (
  ip text primary key,
  bucket bigint not null,
  count int not null default 0
);
alter table public.contact_rate enable row level security;
-- no policies: only the security-definer trigger touches it

create or replace function public.contact_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ip text;
  v_bucket bigint;
  v_count int;
begin
  v_ip := coalesce(
    current_setting('request.headers', true)::json ->> 'x-forwarded-for',
    'unknown'
  );
  v_ip := left(split_part(v_ip, ',', 1), 60);
  v_bucket := extract(epoch from now())::bigint / 600;  -- 10-minute windows

  insert into contact_rate (ip, bucket, count) values (v_ip, v_bucket, 1)
  on conflict (ip) do update
    set count = case when contact_rate.bucket = v_bucket then contact_rate.count + 1 else 1 end,
        bucket = v_bucket
  returning count into v_count;

  delete from contact_rate where bucket < v_bucket - 2;

  if v_count > 5 then
    raise exception 'too many submissions from this address, try later'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists contact_rate_trigger on public.contact_messages;
create trigger contact_rate_trigger
  before insert on public.contact_messages
  for each row execute function public.contact_rate_limit();

-- ---- New-lead email notifications via Resend ----
-- Config lives in private.settings (gitignored, never commit real values):
--   resend_api_key : 're_...'   (until set or 'PENDING', the trigger is a no-op)
--   leads_from_addr: 'Lakshya Leads <onboarding@resend.dev>'  -- switch to leads@lakshyagroups.in after domain verification
--   leads_to_addr  : recipient inbox for lead alerts
create extension if not exists pg_net;
create schema if not exists private;
create table if not exists private.settings (
  key text primary key,
  value text not null
);
alter table private.settings enable row level security;
revoke all on private.settings from anon, authenticated;

create table if not exists private.notification_log (
  id bigint generated always as identity primary key,
  lead_id text,
  http_status int,
  response jsonb,
  created_at timestamptz not null default now()
);
revoke all on private.notification_log from anon, authenticated;
alter table private.notification_log enable row level security;

create or replace function public.notify_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key text;
  v_from text;
  v_to text;
  v_content text;
  v_task bigint;
begin
  select value into v_key from private.settings where key = 'resend_api_key';
  if v_key is null or v_key = 'PENDING' then
    return new;  -- notifications not configured yet; never block lead capture
  end if;

  select value into v_from from private.settings where key = 'leads_from_addr';
  select value into v_to   from private.settings where key = 'leads_to_addr';
  v_from := coalesce(nullif(v_from, ''), 'Lakshya Leads <onboarding@resend.dev>');
  v_to   := coalesce(nullif(v_to, ''),   'admin@lakshyagroups.in');

  v_content := 'New lead from lakshyagroups.in' || chr(10) || chr(10) ||
    'Name: '    || coalesce(new.name, '-')    || chr(10) ||
    'Email: '   || coalesce(new.email, '-')   || chr(10) ||
    'Service: ' || coalesce(new.service, '-') || chr(10) || chr(10) ||
    'Message: ' || coalesce(new.message, '-') || chr(10) || chr(10) ||
    'Received: ' || to_char(new.created_at, 'DD Mon YYYY HH24:MI') || ' IST' || chr(10) ||
    'View all: https://lakshyagroups.in/admin/messages';

  begin
    select net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || v_key,
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'from', v_from,
        'to', jsonb_build_array(v_to),
        'subject', 'New lead: ' || coalesce(new.name, 'Website visitor'),
        'text', v_content
      )
    ) into v_task;

    insert into private.notification_log (lead_id, http_status, response)
    values (new.id::text, 0, jsonb_build_object('pg_net_task', v_task));
  exception when others then
    insert into private.notification_log (lead_id, http_status, response)
    values (new.id::text, -1, jsonb_build_object('error', sqlerrm));
  end;

  return new;
end;
$$;

drop trigger if exists notify_new_lead_trigger on public.contact_messages;
create trigger notify_new_lead_trigger
  after insert on public.contact_messages
  for each row execute function public.notify_new_lead();
