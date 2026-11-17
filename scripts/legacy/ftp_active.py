#!/usr/bin/env python3
"""
Mirror out/ to FTP server using FTPS (AUTH TLS) when available,
falling back to plain FTP only if the server doesn't support encryption.

Credentials are read from environment variables or a local pass file.
Never hardcode passwords in source — rotate them regularly.

Host: 212.85.29.156
User: u882349588.lakshyagroups.in
Port: 21
Remote root: /
"""
import os
import ftplib
from pathlib import Path

HOST = os.getenv("DEPLOY_FTP_HOST", "212.85.29.156")
USER = os.getenv("DEPLOY_FTP_USER", "u882349588.lakshyagroups.in")
PASS = os.getenv("DEPLOY_FTP_PASSWORD") or ""
PORT = int(os.getenv("DEPLOY_FTP_PORT", "21"))
USE_TLS = os.getenv("DEPLOY_FTP_SECURE", "true").lower() not in ("false", "0", "no")
LOCAL_DIR = os.path.abspath("out")
REMOTE_DIR = "/"


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


def main() -> None:
    base = Path(LOCAL_DIR).resolve()
    files = []
    for root, dirs, fnames in os.walk(base):
        for fn in fnames:
            full = Path(root) / fn
            rel = full.relative_to(base)
            files.append((full, rel))

    print(f"total files to upload: {len(files)}")

    if USE_TLS:
        try:
            ftp = ftplib.FTP_TLS()
            ftp.connect(host=HOST, port=PORT, timeout=25)
            ftp.login(user=USER, passwd=PASS)
            ftp.prot_p()  # encrypt data channel
            print("Using FTPS (TLS encrypted)")
        except Exception as e:
            print(f"FTPS failed ({e}), falling back to plain FTP —PASSWORD sent in clear text!")
            ftp = ftplib.FTP()
            ftp.connect(host=HOST, port=PORT, timeout=25)
            ftp.login(user=USER, passwd=PASS)
    else:
        ftp = ftplib.FTP()
        ftp.connect(host=HOST, port=PORT, timeout=25)
        ftp.login(user=USER, passwd=PASS)

    ftp.set_pasv(True)  # passive mode is more firewall-friendly
    ftp.set_debuglevel(0)
    try:
        ftp.sendcmd("OPTS UTF8 ON")
    except Exception as e:
        print("OPTS UTF8 ON not supported:", e)

    total = len(files)
    uploaded = 0
    failed = []

    for idx, (full, rel) in enumerate(files, start=1):
        remote = str(Path(REMOTE_DIR) / rel).replace("\\", "/")
        parent = os.path.dirname(remote)
        if parent and parent != ".":
            makedirs(ftp, parent)

        try:
            with open(full, "rb") as f:
                print(f"PUT {rel}")
                ftp.storbinary(f"STOR {remote}", f, blocksize=1024 * 64)
            uploaded += 1
        except Exception as e:
            failed.append((str(rel), str(e)))
            print(f"FAIL {rel} -> {str(e)[:80]}")

        if idx % 100 == 0 or idx == total:
            print(f"progress {idx}/{total} uploaded={uploaded} failed={len(failed)}")

    try:
        ftp.quit()
    except Exception:
        pass

    print("\nSUMMARY")
    print(f"total files: {total}")
    print(f"uploaded: {uploaded}")
    print(f"failed/timeout: {len(failed)}")
    if failed:
        print("first 20 failures:")
        for r, e in failed[:20]:
            print(f"  - {r}: {e[:80]}")
        if len(failed) > 20:
            print(f"  ...and {len(failed) - 20} more")


if __name__ == "__main__":
    main()
