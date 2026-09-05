#!/usr/bin/env node
/**
 * Removes the seeded demo rows created during setup:
 *   - project "Corporate Website Redesign"
 *   - quote request "Mobile app for client project tracking…"
 *   - contact message from rajesh@example.com
 *
 * Dry-run by default. Pass --yes to actually delete.
 *
 * Auth: uses SUPABASE_ACCESS_TOKEN from .env.local (Management API SQL),
 * same as scripts/setup-supabase.mjs.
 *
 * Usage: node scripts/cleanup-demo-data.mjs [--yes]
 */
import fs from "node:fs";
import path from "node:path";

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || "uhwnavhmnbqrxqcoueii";
const API = `https://api.supabase.com/v1/projects/${PROJECT_REF}`;
const APPLY = process.argv.includes("--yes");

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
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(60000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`SQL failed (${res.status}): ${text.slice(0, 300)}`);
  return JSON.parse(text || "[]");
}

const sqlQuote = (v) => `'${v.replace(/'/g, "''")}'`;

const TARGETS = [
  {
    label: 'Project "Corporate Website Redesign"',
    count: `select count(*)::int as n from public.client_projects where title = 'Corporate Website Redesign'`,
    del: `delete from public.client_projects where title = 'Corporate Website Redesign' returning id`,
  },
  {
    label: 'Quote "Mobile app for client project tracking…"',
    count: `select count(*)::int as n from public.quote_requests where details like 'Mobile app for client project tracking%'`,
    del: `delete from public.quote_requests where details like 'Mobile app for client project tracking%' returning id`,
  },
  {
    label: "Contact message from rajesh@example.com",
    count: `select count(*)::int as n from public.contact_messages where email = 'rajesh@example.com'`,
    del: `delete from public.contact_messages where email = 'rajesh@example.com' returning id`,
  },
];

async function main() {
  loadEnvFile(path.resolve(process.cwd(), ".env.local"));
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) {
    console.error("\n✗ Missing SUPABASE_ACCESS_TOKEN in .env.local\n");
    process.exit(1);
  }

  console.log(`\n▸ Project: ${PROJECT_REF} (${APPLY ? "APPLYING" : "dry run — pass --yes to delete"})\n`);

  let total = 0;
  for (const t of TARGETS) {
    const [{ n }] = await runSql(token, t.count);
    console.log(`  ${n > 0 ? "•" : " "} ${t.label}: ${n} row(s)`);
    if (n > 0 && APPLY) {
      const rows = await runSql(token, t.del);
      console.log(`    ↳ deleted ${rows.length}`);
      total += rows.length;
    }
    total += 0;
  }

  console.log(
    APPLY
      ? `\n✓ Done — ${total} demo row(s) removed. Your admin login was not touched.\n`
      : `\n▸ Nothing deleted (dry run). Re-run with --yes to apply.\n`
  );
}

main().catch((err) => {
  console.error("\n✗ Cleanup failed:", err.message, "\n");
  process.exit(1);
});
