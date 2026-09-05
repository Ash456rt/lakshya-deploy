#!/usr/bin/env node
/**
 * Health monitor for lakshyagroups.in + its Supabase backend.
 *
 * Checks:
 *   1. Site routes (/, /portal, /login, /signup) return 200
 *   2. Supabase auth service is healthy
 *   3. Canary admin login works (proves auth + DB + RLS end-to-end)
 *
 * Alerts: if ALERT_WEBHOOK_URL is set (in .env.local), failures are
 * POSTed there as JSON — works with Slack/Discord-style webhooks.
 *
 * Usage:
 *   npm run monitor
 *
 * Schedule (Windows Task Scheduler or cron) e.g. every 15 min:
 *   cron:  *\/15 * * * *  cd /path/to/lakshya-deploy && npm run monitor
 */
import fs from "node:fs";
import path from "node:path";

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const timeout = (ms) => AbortSignal.timeout(ms);

async function checkRoute(url) {
  try {
    const res = await fetch(url, { redirect: "follow", signal: timeout(20000) });
    return { ok: res.status === 200, detail: `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, detail: err.message };
  }
}

async function main() {
  loadEnvFile(path.resolve(process.cwd(), ".env.local"));
  const failures = [];

  // 1. Site routes
  const base = process.env.DEPLOY_CHECK_URL || "https://lakshyagroups.in";
  for (const route of ["", "portal", "login", "signup"]) {
    const url = `${base}/${route}${route ? "/" : ""}?cb=${Date.now()}`;
    const r = await checkRoute(url);
    console.log(`${r.ok ? "✓" : "✗"} https://${path.basename(base)} /${route} → ${r.detail}`);
    if (!r.ok) failures.push(`Site route /${route}: ${r.detail}`);
  }

  // 2. Supabase auth health
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supaUrl && anon) {
    let ok = false;
    let detail = "missing env";
    try {
      const res = await fetch(`${supaUrl}/auth/v1/health`, {
        headers: { apikey: anon },
        signal: timeout(20000),
      });
      ok = res.status === 200;
      detail = `HTTP ${res.status}`;
    } catch (err) {
      detail = err.message;
    }
    console.log(`${ok ? "✓" : "✗"} Supabase auth health → ${detail}`);
    if (!ok) failures.push(`Supabase auth health: ${detail}`);

    // 3. Canary admin login (proves auth + DB + RLS end-to-end)
    if (process.env.MONITOR_ADMIN_EMAIL && process.env.MONITOR_ADMIN_PASSWORD) {
      try {
        const res = await fetch(`${supaUrl}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: { apikey: anon, "Content-Type": "application/json" },
          body: JSON.stringify({
            email: process.env.MONITOR_ADMIN_EMAIL,
            password: process.env.MONITOR_ADMIN_PASSWORD,
          }),
          signal: timeout(20000),
        });
        ok = res.status === 200;
        detail = `HTTP ${res.status}`;
      } catch (err) {
        detail = err.message;
      }
      console.log(`${ok ? "✓" : "✗"} Canary admin login → ${detail}`);
      if (!ok) failures.push(`Canary admin login: ${detail}`);
    } else {
      console.log("• Canary admin login → skipped (set MONITOR_ADMIN_EMAIL / MONITOR_ADMIN_PASSWORD)");
    }
  } else {
    console.log("• Supabase checks → skipped (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY missing)");
  }

  // Alert on failure
  if (failures.length > 0 && process.env.ALERT_WEBHOOK_URL) {
    try {
      await fetch(process.env.ALERT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 lakshyagroups.in monitor: ${failures.length} failure(s)\n- ${failures.join("\n- ")}`,
        }),
        signal: timeout(15000),
      });
    } catch {
      /* alert delivery is best-effort */
    }
  }

  if (failures.length > 0) {
    console.error(`\n✗ ${failures.length} check(s) failed\n`);
    process.exit(1);
  }
  console.log("\n✓ All checks passed\n");
}

main();
