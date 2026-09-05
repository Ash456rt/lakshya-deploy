#!/usr/bin/env node
/**
 * One-shot Supabase setup via the Management API.
 *
 * Requires SUPABASE_ACCESS_TOKEN (personal access token from
 * https://supabase.com/dashboard/account/tokens) in .env.local.
 *
 * Steps:
 *   1. Runs supabase/schema.sql (tables, RLS, trigger)
 *   2. Creates or refreshes admin user admin@lakshyagroups.in
 *   3. Grants profiles.is_admin = true
 *   4. Verifies and writes ADMIN_CREDENTIALS.txt (gitignored)
 *
 * Usage: node scripts/setup-supabase.mjs
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || "uhwnavhmnbqrxqcoueii";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lakshyagroups.in";
const API = `https://api.supabase.com/v1/projects/${PROJECT_REF}`;

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

async function runSql(token, query) {
  const res = await fetch(`${API}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(60000),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`SQL failed (${res.status}): ${text.slice(0, 400)}`);
  }
  return text;
}

function sqlQuote(value) {
  return `'${value.replace(/'/g, "''")}'`;
}

async function main() {
  loadEnvFile(path.resolve(process.cwd(), ".env.local"));
  loadEnvFile(path.resolve(process.cwd(), ".env.vercel"));

  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) {
    console.error(
      "\n✗ Missing SUPABASE_ACCESS_TOKEN.\n" +
        "  Create one at https://supabase.com/dashboard/account/tokens\n" +
        "  then add: SUPABASE_ACCESS_TOKEN=sbp_... to lakshya-deploy/.env.local\n"
    );
    process.exit(1);
  }

  const password =
    process.env.ADMIN_PASSWORD ||
    crypto.randomBytes(12).toString("base64url") + "!Aa1";

  console.log(`\n▸ Project: ${PROJECT_REF}`);

  // 1. Schema
  const schemaPath = path.resolve(process.cwd(), "supabase/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  console.log("▸ Running schema.sql (tables, RLS, trigger)…");
  await runSql(token, "create extension if not exists pgcrypto;");
  // Postgres lacks CREATE POLICY IF NOT EXISTS — drop existing policies so
  // the schema can be re-applied idempotently.
  await runSql(
    token,
    `do $$
     declare r record;
     begin
       for r in select schemaname, tablename, policyname from pg_policies
                where schemaname = 'public'
                  and tablename in ('profiles','client_projects','quote_requests','contact_messages')
       loop
         execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
       end loop;
     end $$;`
  );
  await runSql(token, schema);
  console.log("  ✓ Schema applied");

  // 2. Admin user (auth.users + auth.identities), idempotent.
  // Matches this project's actual constraints:
  //   users:  unique (email) WHERE is_sso_user = false
  //   identities: unique (provider_id, provider)
  console.log(`▸ Creating/refreshing admin user ${ADMIN_EMAIL}…`);
  const userRes = await runSql(
    token,
    `
    with new_user as (
      insert into auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_app_meta_data, raw_user_meta_data, is_sso_user
      ) values (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated', 'authenticated',
        ${sqlQuote(ADMIN_EMAIL)},
        crypt(${sqlQuote(password)}, gen_salt('bf')),
        now(), now(), now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{"full_name":"Lakshya Admin"}'::jsonb,
        false
      )
      on conflict (email) where is_sso_user = false do update
        set encrypted_password = crypt(${sqlQuote(password)}, gen_salt('bf')),
            email_confirmed_at = now(),
            updated_at = now()
      returning id
    )
    insert into auth.identities (
      id, user_id, provider_id, provider, identity_data,
      last_sign_in_at, created_at, updated_at
    )
    select gen_random_uuid(), id, 'email', 'email',
      jsonb_build_object('sub', id::text, 'email', ${sqlQuote(ADMIN_EMAIL)}),
      now(), now(), now()
    from new_user
    on conflict (provider_id, provider) do update set updated_at = now()
    returning user_id;
    `
  );
  console.log("  ✓ Admin user ready");

  // 3. Profile with is_admin
  const uid = JSON.parse(userRes)[0]?.user_id;
  if (!uid) throw new Error("Could not read user id from response: " + userRes.slice(0, 200));
  await runSql(
    token,
    `
    insert into public.profiles (id, full_name, is_admin)
    values (${sqlQuote(uid)}, 'Lakshya Admin', true)
    on conflict (id) do update set is_admin = true;
    `
  );
  console.log("  ✓ profiles.is_admin = true");

  // 4. Verify
  const check = JSON.parse(
    await runSql(
      token,
      `select u.email, p.is_admin, true as tables_ok
       from auth.users u join public.profiles p on p.id = u.id
       where u.email = ${sqlQuote(ADMIN_EMAIL)};`
    )
  );
  console.log("▸ Verify:", JSON.stringify(check));

  // 5. Save credentials locally (gitignored)
  const credsFile = path.resolve(process.cwd(), "ADMIN_CREDENTIALS.txt");
  fs.writeFileSync(
    credsFile,
    `Lakshya Groups — Admin Portal\n` +
      `URL:      https://lakshyagroups.in/admin\n` +
      `Login:    https://lakshyagroups.in/login\n` +
      `Email:    ${ADMIN_EMAIL}\n` +
      `Password: ${password}\n` +
      `User ID:  ${uid}\n` +
      `Created:  ${new Date().toISOString()}\n`,
    { mode: 0o600 }
  );
  console.log(`\n✓ Done. Credentials saved to ADMIN_CREDENTIALS.txt (gitignored).\n`);

  // 6. Live login test with the anon key (same flow the website uses)
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supaUrl && anon) {
    try {
      const res = await fetch(`${supaUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: anon, "Content-Type": "application/json" },
        body: JSON.stringify({ email: ADMIN_EMAIL, password }),
        signal: AbortSignal.timeout(30000),
      });
      console.log(
        res.status === 200
          ? "✓ Login verified against live Supabase auth.\n"
          : `✗ Login test returned ${res.status}: ${(await res.text()).slice(0, 200)}\n`
      );
    } catch (err) {
      console.log(`⚠ Login test could not run: ${err.message}\n`);
    }
  }
}

main().catch((err) => {
  console.error("\n✗ Setup failed:", err.message, "\n");
  process.exit(1);
});
