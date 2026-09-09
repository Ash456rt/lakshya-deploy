// Upload a single file to Hostinger via FTP (credentials from .env.local)
import fs from "node:fs";
import path from "node:path";
import { Client } from "basic-ftp";

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

async function main() {
  loadEnvLocal();
  const [local, remoteRel] = process.argv.slice(2);
  if (!local || !remoteRel) {
    console.error("usage: node scripts/upload-one.mjs <local-file> <remote/relative/path>");
    process.exit(1);
  }
  const client = new Client(10000);
  await client.access({
    host: process.env.DEPLOY_FTP_HOST,
    port: Number(process.env.DEPLOY_FTP_PORT || 21),
    user: process.env.DEPLOY_FTP_USER,
    password: process.env.DEPLOY_FTP_PASSWORD,
    secure: process.env.DEPLOY_FTP_SECURE !== "false",
  });
  const remoteDir = `/${process.env.DEPLOY_FTP_REMOTE_DIR || "public_html"}`.replace(/\/+$/, "");
  const dest = path.posix.join(remoteDir, remoteRel);
  await client.ensureDir(path.posix.dirname(dest));
  await client.uploadFrom(local, dest);
  console.log(`✓ uploaded ${local} -> ${dest}`);
  client.close();
}

main().catch((e) => { console.error("✗", e.message); process.exit(1); });
