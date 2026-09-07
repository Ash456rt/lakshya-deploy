#!/usr/bin/env python3
"""
Mirror the built out/ folder to the FTP server.
FTP details (from user):
- host: 212.85.29.156
- username: u882349588.lakshyagroups.in
- password: Laksshya@26
- port: 21 (plain FTP; switch to ftplib.FTP_TLS if your server needs FTPS)
- remote root: /  (i.e. uploads into the FTP account's web root)
"""

import os
import ftplib
from pathlib import Path

FTP_HOST = os.getenv("DEPLOY_FTP_HOST", "212.85.29.156")
FTP_USER = os.getenv("DEPLOY_FTP_USER", "u882349588.lakshyagroups.in")
FTP_PASS = os.getenv("DEPLOY_FTP_PASSWORD", "")
if not FTP_PASS:
    raise SystemExit("ERROR: DEPLOY_FTP_PASSWORD not set. Set it via environment or create ftp_pass.txt")
FTP_PORT = int(os.getenv("DEPLOY_FTP_PORT", "21"))
LOCAL_DIR = os.path.abspath("out")
REMOTE_DIR = "/"

def makedirs(ftp: ftplib.FTP, remote_dir: str) -> None:
    """Create a remote directory tree, ignoring errors when dirs already exist."""
    if not remote_dir or remote_dir == "/":
        return
    parts = [p for p in remote_dir.strip("/").split("/") if p]
    cur = ""
    for part in parts:
        cur = (cur + "/" + part).strip("/")
        try:
            ftp.mkd(cur)
        except ftplib.error_perm:
            # directory probably already exists
            pass

def walk_local(base: str):
    base = Path(base).resolve()
    for root, dirs, files in os.walk(base):
        for name in files:
            full = Path(root) / name
            rel = full.relative_to(base)
            yield full, rel

def main():
    print(f"Connecting to {FTP_HOST}:{FTP_PORT} as {FTP_USER}...")
    ftp = ftplib.FTP()
    ftp.connect(host=FTP_HOST, port=FTP_PORT)
    ftp.login(user=FTP_USER, passwd=FTP_PASS)
    ftp.set_pasv(True)
    print("WARNING: Using plain FTP — password sent in clear text. Set DEPLOY_FTP_SECURE=true and use FTP_TLS.")
    ftp.set_debuglevel(0)

    # Try to enable UTF-8 support if the server advertises it
    try:
        ftp.sendcmd("OPTS UTF8 ON")
    except Exception as e:
        print("OPTS UTF8 ON not supported:", e)

    total = 0
    uploaded = 0
    failed = []

    for local_full, rel in walk_local(LOCAL_DIR):
        total += 1
        remote_path = str(Path(REMOTE_DIR) / rel).replace("\\", "/")
        local_size = os.path.getsize(local_full)

        # Ensure remote parent directory exists
        parent = os.path.dirname(remote_path)
        if parent and parent != ".":
            makedirs(ftp, parent)

        try:
            with open(local_full, "rb") as f:
                print(f"[{uploaded+1}/{total}] PUT {rel}  ->  {remote_path}  ({local_size} bytes)")
                ftp.storbinary(f"STOR {remote_path}", f, blocksize=1024*64)
            uploaded += 1
        except Exception as e:
            failed.append((str(rel), str(e)))
            print(f"ERROR uploading {rel}: {e}")

    try:
        ftp.quit()
    except Exception:
        pass

    print(f"\nDone. Uploaded {uploaded}/{total} file(s).")
    if failed:
        print(f"{len(failed)} file(s) failed:")
        for rel, err in failed[:30]:
            print(f"  - {rel}: {err}")
        if len(failed) > 30:
            print(f"  ...and {len(failed)-30} more")

if __name__ == "__main__":
    main()
