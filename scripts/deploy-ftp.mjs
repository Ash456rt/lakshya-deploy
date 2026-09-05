#!/usr/bin/env node
/**
 * Deploy the static export in ./out to Hostinger via FTP.
 * Resumable: skips files already on the server with a matching size.
 *
 * Credentials are read from .env.local (never commit them):
 *   DEPLOY_FTP_HOST=212.85.29.156
 *   DEPLOY_FTP_USER=u882349588.lakshyagroups.in
 *   DEPLOY_FTP_PASSWORD=...
 *   DEPLOY_FTP_PORT=21                     (optional, default 21)
 *   DEPLOY_FTP_SECURE=false                (optional, set false to skip TLS)
 *   DEPLOY_FTP_REMOTE_DIR=public_html      (optional, default public_html)
 *
 * Usage: npm run build && npm run deploy:ftp
 */
import fs from "node:fs";
import path from "node:path";
import { Client } from "basic-ftp";

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, raw] = match;
    if (process.env[key] === undefined) {
      process.env[key] = raw.replace(/^["']|["']$/g, "");
    }
  }
}

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`\n✗ Missing ${key} in .env.local — see header of scripts/deploy-ftp.mjs\n`);
    process.exit(1);
  }
  return value;
}

function walkLocal(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkLocal(full, base, acc);
    } else {
      acc.push({
        rel: path.relative(base, full).split(path.sep).join("/"),
        size: fs.statSync(full).size,
        full,
      });
    }
  }
  return acc;
}

async function walkRemote(client, dir, base = dir, acc = new Map()) {
  for (const entry of await client.list(dir)) {
    const full = path.posix.join(dir, entry.name);
    if (entry.isDirectory) {
      await walkRemote(client, full, base, acc);
    } else if (entry.isFile) {
      acc.set(path.posix.relative(base, full), entry.size);
    }
  }
  return acc;
}

// Post-deploy smoke test: the clean-URL rewrites are the most common
// failure (403/404 from LiteSpeed), so verify them on the live site.
async function smokeTest(baseUrl) {
  const base = baseUrl.replace(/\/+$/, "");
  const routes = ["", "portal", "login", "signup"];
  let failed = false;
  console.log(`\n▸ Smoke-testing ${base} …`);
  for (const route of routes) {
    const url = `${base}/${route}${route ? "/" : ""}?cb=${Date.now()}`;
    try {
      const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
      const ok = res.status === 200;
      console.log(`  ${ok ? "✓" : "✗"} /${route} → ${res.status}`);
      if (!ok) failed = true;
    } catch (err) {
      console.log(`  ✗ /${route} → ${err.message}`);
      failed = true;
    }
  }
  if (failed) {
    console.error("\n⚠ Smoke test failed — check .htaccess on the server.\n");
    process.exitCode = 1;
  }
}

async function main() {
  loadEnvLocal();

  const outDir = path.resolve(process.cwd(), "out");
  if (!fs.existsSync(path.join(outDir, "index.html"))) {
    console.error("\n✗ out/index.html not found — run `npm run build` first\n");
    process.exit(1);
  }

  const host = requireEnv("DEPLOY_FTP_HOST");
  const user = requireEnv("DEPLOY_FTP_USER");
  const password = requireEnv("DEPLOY_FTP_PASSWORD");
  const port = Number(process.env.DEPLOY_FTP_PORT || 21);
  const secure = process.env.DEPLOY_FTP_SECURE !== "false";
  const remoteDir = `/${process.env.DEPLOY_FTP_REMOTE_DIR || "public_html"}`.replace(/\/+$/, "");

  const client = new Client(10000);
  client.ftp.verbose = false;

  console.log(`\n▸ Connecting to ${host}:${port} (${secure ? "FTPS" : "FTP"})…`);
  try {
    await client.access({ host, port, user, password, secure });
    await client.ensureDir(remoteDir);

    console.log("▸ Listing remote files (resumable check)…");
    const remote = await walkRemote(client, remoteDir);
    console.log(`▸ Remote has ${remote.size} files.`);

    const local = walkLocal(outDir);
    const todo = local.filter((f) => remote.get(f.rel) !== f.size);
    console.log(`▸ Local has ${local.length} files, ${todo.length} to upload.\n`);

    let done = 0;
    for (const file of todo) {
      await client.ensureDir(path.posix.join(remoteDir, path.posix.dirname(file.rel)));
      await client.uploadFrom(file.full, path.posix.join(remoteDir, file.rel));
      done++;
      if (done % 10 === 0 || done === todo.length) {
        console.log(`▸ Uploaded ${done}/${todo.length}`);
      }
    }

    console.log(
      todo.length === 0
        ? "\n✓ Nothing to upload — remote already matches out/.\n"
        : `\n✓ Deploy complete — ${done} file(s) uploaded.`
    );

    await smokeTest(process.env.DEPLOY_CHECK_URL || "https://lakshyagroups.in");
    if (todo.length > 0) {
      console.log("\nHard-refresh lakshyagroups.in (Ctrl+Shift+R) to see the new version.\n");
    }
  } catch (err) {
    console.error("\n✗ FTP deploy failed:", err.message, "\n");
    process.exitCode = 1;
  } finally {
    client.close();
  }
}

main();
