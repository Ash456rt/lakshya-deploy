#!/usr/bin/env python3
"""
Fast FTP mirror upload for lakshya-deploy out/ folder.
FTP details:
- host: 212.85.29.156
- username: u882349588.lakshyagroups.in
- password: Laksshya@26
- port: 21 (plain FTP)
- remote root: /
Per-file timeout: 25s. Skips a file on timeout and keeps going.
"""
import os
import socket
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
PER_FILE_TIMEOUT = 25

file_list = []

def collect():
    base = Path(LOCAL_DIR).resolve()
    for root, dirs, files in os.walk(base):
        for name in files:
            full = Path(root) / name
            rel = full.relative_to(base)
            file_list.append((full, rel))

def makedirs(ftp: ftplib.FTP, remote_dir: str) -> None:
    if not remote_dir or remote_dir == "/":
        return
    parts = [p for p in remote_dir.strip("/").split("/") if p]
    cur = ""
    for part in parts:
        cur = (cur + "/" + part).strip("/")
        try:
            ftp.mkd(cur)
        except ftplib.error_perm:
            pass

def upload_one(ftp: ftplib.FTP, local: Path, remote: str, timeout: int) -> bool:
    local_size = os.path.getsize(local)
    parent = os.path.dirname(remote)
    if parent and parent != ".":
        makedirs(ftp, parent)
    try:
        with open(local, "rb") as f:
            print(f"PUT {remote}  ({local_size} bytes)")
            ftp.storbinary(f"STOR {remote}", f, blocksize=1024*64)
        return True
    except (socket.timeout, TimeoutError, OSError) as e:
        print(f"TIMEOUT uploading {remote}: {e}")
        return False
    except Exception as e:
        print(f"ERROR uploading {remote}: {e}")
        return False

def main():
    print(f"Collecting files under {LOCAL_DIR}...")
    collect()
    print(f"Total files to upload: {len(file_list)}")
    print(f"Connecting to {FTP_HOST}:{FTP_PORT} as {FTP_USER}...")
    ftp = ftplib.FTP()
    ftp.connect(host=FTP_HOST, port=FTP_PORT, timeout=PER_FILE_TIMEOUT)
    ftp.login(user=FTP_USER, passwd=FTP_PASS)
    ftp.set_pasv(True)
    print("WARNING: Using plain FTP — password sent in clear text.")
    ftp.set_debuglevel(0)
    try:
        ftp.sendcmd("OPTS UTF8 ON")
    except Exception as e:
        print("OPTS UTF8 ON not supported:", e)

    total = len(file_list)
    uploaded = 0
    failed = []
    last_print = 0

    for idx, (local, rel) in enumerate(file_list, start=1):
        remote = str(Path(REMOTE_DIR) / rel).replace("\\", "/")
        ok = upload_one(ftp, local, remote, PER_FILE_TIMEOUT)
        if ok:
            uploaded += 1
        else:
            failed.append(str(rel))
        if idx - last_print >= 50 or idx == total:
            print(f"Progress: {idx}/{total}  uploaded={uploaded}  failed={len(failed)}")
            last_print = idx

    try:
        ftp.quit()
    except Exception:
        pass

    print("\n=== SUMMARY ===")
    print(f"Total files: {total}")
    print(f"Uploaded: {uploaded}")
    print(f"Failed/timeout: {len(failed)}")
    if failed:
        print("Failed files (up to 40 shown):")
        for rel in failed[:40]:
            print(f"  - {rel}")
        if len(failed) > 40:
            print(f"  ...and {len(failed)-40} more")

if __name__ == "__main__":
    main()
