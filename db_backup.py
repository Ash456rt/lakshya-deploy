#!/usr/bin/env python3
"""
Daily backup for lakshyagroups.in business data.
Exports contact_messages, quote_requests, client_projects, profiles as JSON
via the Supabase Management API and stores them in ./backups/.
Keeps the newest 30 backup files and logs to backups/backup.log.
Designed to run from Windows Task Scheduler (see scheduled task LakshyaDB-Backup).
"""
import json
import os
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BACKUP_DIR = ROOT / "backups"
KEEP = 30


def env_val(name: str):
    for fname in (ROOT / ".env.local", ROOT / ".env.vercel"):
        try:
            for line in fname.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line.startswith(name + "="):
                    return line.split("=", 1)[1].strip().strip('"')
        except FileNotFoundError:
            continue
    return None


def log(msg: str) -> None:
    line = f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}"
    print(line, flush=True)
    with open(BACKUP_DIR / "backup.log", "a", encoding="utf-8") as f:
        f.write(line + "\n")


def main() -> None:
    BACKUP_DIR.mkdir(exist_ok=True)
    url = env_val("SUPABASE_URL") or env_val("NEXT_PUBLIC_SUPABASE_URL")
    token = env_val("SUPABASE_ACCESS_TOKEN")
    if not (url and token):
        raise SystemExit("missing SUPABASE_URL / SUPABASE_ACCESS_TOKEN")
    ref = url.split("//")[1].split(".")[0]

    tables = ["contact_messages", "quote_requests", "client_projects", "profiles"]
    dump = {"generated_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"), "tables": {}}

    for t in tables:
        api = f"https://api.supabase.com/v1/projects/{ref}/database/query"
        data = json.dumps({"query": f"select * from public.{t}"}).encode()
        req = urllib.request.Request(
            api,
            data=data,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0",
                "Accept": "application/json",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            dump["tables"][t] = json.loads(resp.read().decode())
        log(f"  {t}: {len(dump['tables'][t])} rows")

    stamp = time.strftime("%Y-%m-%d_%H%M")
    out = BACKUP_DIR / f"lakshya_db_{stamp}.json"
    out.write_text(json.dumps(dump, indent=1, default=str), encoding="utf-8")
    log(f"saved {out.name} ({out.stat().st_size} bytes)")

    # rotate: keep newest KEEP backup files
    backups = sorted(BACKUP_DIR.glob("lakshya_db_*.json"))
    for old in backups[:-KEEP]:
        old.unlink()
        log(f"rotated out {old.name}")
    log("backup finished OK")


if __name__ == "__main__":
    main()
