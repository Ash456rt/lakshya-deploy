#!/usr/bin/env python3
"""
One-off Supabase admin helper for the security fix.
Loads credentials from .env.local/.env.vercel without printing them,
runs SQL via the Supabase Management API, prints rows as a table.
Usage: python sb_admin.py "select 1 as x"
"""
import json
import sys
import urllib.request


def env_val(name: str):
    for fname in (".env.local", ".env.vercel"):
        try:
            for line in open(fname, encoding="utf-8"):
                line = line.strip()
                if line.startswith(name + "="):
                    return line.split("=", 1)[1].strip().strip('"')
        except FileNotFoundError:
            continue
    return None


SUPABASE_URL = env_val("SUPABASE_URL") or env_val("NEXT_PUBLIC_SUPABASE_URL")
ACCESS_TOKEN = env_val("SUPABASE_ACCESS_TOKEN")
REF = SUPABASE_URL.split("//")[1].split(".")[0] if SUPABASE_URL else None

if not (SUPABASE_URL and ACCESS_TOKEN and REF):
    raise SystemExit("missing SUPABASE_URL / SUPABASE_ACCESS_TOKEN in env files")


def run_sql(sql: str):
    """Run SQL through the Supabase Management API database/query endpoint."""
    url = f"https://api.supabase.com/v1/projects/{REF}/database/query"
    data = json.dumps({"query": sql}).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {ACCESS_TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0",
            "Accept": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())


def print_rows(rows):
    if not rows:
        print("(no rows)")
        return
    cols = list(rows[0].keys())
    widths = {c: max(len(c), *(len(str(r.get(c, ""))) for r in rows)) for c in cols}
    print(" | ".join(c.ljust(widths[c]) for c in cols))
    print("-|-".join("-" * widths[c] for c in cols))
    for r in rows:
        print(" | ".join(str(r.get(c, "")).ljust(widths[c]) for c in cols))


if __name__ == "__main__":
    sql = sys.argv[1] if len(sys.argv) > 1 else "select 1 as ok"
    try:
        result = run_sql(sql)
    except urllib.error.HTTPError as e:
        print("HTTP ERROR", e.code)
        print(e.read().decode()[:1000])
        sys.exit(1)
    if isinstance(result, list):
        print_rows(result)
    else:
        print(json.dumps(result)[:2000])
