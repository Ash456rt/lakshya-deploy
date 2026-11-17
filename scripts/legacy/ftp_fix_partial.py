#!/usr/bin/env python3
"""
Repair a partial FTP upload for lakshyagroups.in.

Compares local out/ files with the server by file SIZE and re-uploads only
files that are missing or size-mismatched. Reconnects automatically if the
FTP connection drops, alternating PASV/ACTIVE data mode after each failure.
Logs progress to ftp_fix_progress.log so it can be monitored safely.
"""
import os
import socket
import time
import ftplib
from pathlib import Path

HOST = os.getenv("DEPLOY_FTP_HOST", "212.85.29.156")
USER = os.getenv("DEPLOY_FTP_USER", "u882349588.lakshyagroups.in")
PASS = os.getenv("DEPLOY_FTP_PASSWORD", "")
if not PASS:
    # Fallback: read from local pass file (gitignored)
    pass_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ftp_pass.txt")
    if os.path.exists(pass_path):
        with open(pass_path, encoding="utf-8") as _f:
            PASS = _f.read().strip()
if not PASS:
    raise SystemExit("ERROR: DEPLOY_FTP_PASSWORD not set and no ftp_pass.txt found.")
PORT = int(os.getenv("DEPLOY_FTP_PORT", "21"))
USE_TLS = os.getenv("DEPLOY_FTP_SECURE", "true").lower() not in ("false", "0", "no")
LOCAL_DIR = os.path.abspath("out")
REMOTE_DIR = "/public_html"  # REAL webroot: FTP root is one level above it
LOG_PATH = "ftp_fix_progress.log"

socket.setdefaulttimeout(30)  # covers data sockets too (active accept / pasv connect)

LOG = open(LOG_PATH, "a", encoding="utf-8")


def log(msg: str) -> None:
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    LOG.write(line + "\n")
    LOG.flush()


def connect(pasv: bool) -> ftplib.FTP:
    # Prefer explicit FTPS (AUTH TLS) so credentials are encrypted in transit;
    # fall back to plain FTP if the server refuses TLS.
    if USE_TLS:
        try:
            ftp = ftplib.FTP_TLS()
            ftp.connect(host=HOST, port=PORT, timeout=30)
            ftp.login(user=USER, passwd=PASS)
            ftp.prot_p()  # encrypt the data channel too
            return ftp
        except Exception as e:
            print(f"FTPS failed ({e}), falling back to plain FTP")
    ftp = ftplib.FTP()
    ftp.connect(host=HOST, port=PORT, timeout=30)
    ftp.login(user=USER, passwd=PASS)
    ftp.set_pasv(pasv)
    try:
        ftp.sendcmd("OPTS UTF8 ON")
    except Exception:
        pass
    ftp.voidcmd("TYPE I")
    return ftp


def connect_any(prefer_active: bool) -> tuple[ftplib.FTP, bool]:
    order = (False, True) if prefer_active else (True, False)
    last_err = None
    for pasv in order:
        try:
            ftp = connect(pasv)
            ftp.voidcmd("NOOP")
            return ftp, pasv
        except Exception as e:
            last_err = e
            print(f"connect (pasv={pasv}) failed: {str(e)[:100]}")
    raise SystemExit(f"could not connect to FTP in either mode: {last_err}")


def makedirs(ftp: ftplib.FTP, remote_dir: str) -> None:
    if not remote_dir or remote_dir == "/":
        return
    parts = [p for p in remote_dir.strip("/").split("/") if p]
    cur = ""
    for part in parts:
        cur = cur + "/" + part
        try:
            ftp.mkd(cur)
        except (ftplib.error_perm, ftplib.error_temp):
            pass


def remote_size(ftp: ftplib.FTP, remote: str):
    try:
        return ftp.size(remote)
    except Exception:
        return None


def main() -> None:
    base = Path(LOCAL_DIR).resolve()
    files = []
    for root, dirs, fnames in os.walk(base):
        for fn in fnames:
            full = Path(root) / fn
            files.append((full, full.relative_to(base)))

    prefer_active = True  # this server's PASV data channel historically hangs
    ftp, pasv = connect_any(prefer_active)
    log(f"connected (pasv={pasv}); local files: {len(files)}")

    to_upload = []
    for full, rel in files:
        remote = str(Path(REMOTE_DIR) / rel).replace("\\", "/")
        size = os.path.getsize(full)
        rs = remote_size(ftp, remote)
        if rs is None or rs != size:
            to_upload.append((full, remote, size))

    log(f"need upload (missing or size mismatch): {len(to_upload)}")

    uploaded = 0
    rounds = 0
    while to_upload and rounds < 6:
        rounds += 1
        still = []
        for i, (full, remote, size) in enumerate(to_upload):
            try:
                parent = os.path.dirname(remote)
                if parent and parent != ".":
                    makedirs(ftp, parent)
                with open(full, "rb") as f:
                    ftp.storbinary(f"STOR {remote}", f, blocksize=1024 * 64)
                uploaded += 1
                if uploaded % 10 == 0:
                    log(f"progress: {uploaded} uploaded, {len(to_upload) - i - 1} left in this round")
            except Exception as e:
                log(f"FAIL {remote} (pasv={pasv}): {str(e)[:90]}")
                still.append((full, remote, size))
                try:
                    ftp.quit()
                except Exception:
                    pass
                prefer_active = pasv  # transfer failed in this mode; try the other next
                time.sleep(2)
                try:
                    ftp, pasv = connect_any(not prefer_active if False else prefer_active)
                    log(f"reconnected (pasv={pasv})")
                except SystemExit:
                    return
        to_upload = still
        if to_upload and rounds < 6:
            log(f"retry round {rounds + 1} for {len(to_upload)} file(s)...")

    try:
        ftp.quit()
    except Exception:
        pass

    log("=== SUMMARY ===")
    log(f"uploaded now: {uploaded}")
    log(f"still failed: {len(to_upload)}")
    for full, remote, size in to_upload[:30]:
        log(f"  - {remote} ({size} bytes)")
    log("DONE")


if __name__ == "__main__":
    main()
