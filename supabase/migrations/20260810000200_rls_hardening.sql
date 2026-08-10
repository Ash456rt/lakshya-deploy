-- Hardening: prevent privilege escalation and quote tampering by clients.

-- Clients may only update their own SAFE profile columns (name/company/phone),
-- never is_admin, id, etc. Column-level grants enforce this at the API layer.
revoke update on public.profiles from anon, authenticated;
grant update (full_name, company, phone) on public.profiles to authenticated;

-- Clients should never update quote statuses (that's admin work). The portal
-- has no update UI; drop the client update policy entirely.
drop policy if exists quotes_update_own on public.quote_requests;
