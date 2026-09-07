#!/usr/bin/env python3
"""
Probe FTP passive modes on the lakshya FTP server.
HOST=212.85.29.156 USER=u882349588.lakshyagroups.in PASS=Laksshya@26 PORT=21
"""
import os
import ftplib
from pathlib import Path

HOST = os.getenv("DEPLOY_FTP_HOST", "212.85.29.156")
USER = os.getenv("DEPLOY_FTP_USER", "u882349588.lakshyagroups.in")
PASS = os.getenv("DEPLOY_FTP_PASSWORD", "")
if not PASS:
    raise SystemExit("ERROR: DEPLOY_FTP_PASSWORD not set. Set it via environment or create ftp_pass.txt")
PORT = int(os.getenv("DEPLOY_FTP_PORT", "21"))
LOCAL = "out"
REMOTE = "/"

base = Path(LOCAL).resolve()
files = []
for r, d, fnames in os.walk(base):
    for fn in fnames:
        full = Path(r) / fn
        rel = full.relative_to(base)
        files.append((full, rel))

print(f"total files: {len(files)}")

# ---- PASV ----
ftp = ftplib.FTP()
ftp.connect(host=HOST, port=PORT, timeout=25)
ftp.login(user=USER, passwd=PASS)
ftp.set_pasv(True)
print("WARNING: Using plain FTP — password sent in clear text. Set DEPLOY_FTP_SECURE=true and use FTP_TLS for encryption.")
ftp.set_debuglevel(0)
print("\n[PASV mode]")
try:
    ftp.sendcmd("OPTS UTF8 ON")
    print("OPTS UTF8 ON ok")
except Exception as e:
    print("OPTS UTF8 ON:", e)

small = files[0]
remote = str(Path(REMOTE) / small[1]).replace("\\", "/")
print(f"probe PUT {remote} ({os.path.getsize(small[0])} bytes)")
try:
    with open(small[0], "rb") as f:
        ftp.storbinary("STOR " + remote, f, blocksize=1024 * 64)
    print("PASV PROBE OK")
except Exception as e:
    print("PASV PROBE FAIL:", repr(e)[:200])

try:
    ftp.quit()
except Exception:
    pass

# ---- EPSV ----
ftp2 = ftplib.FTP()
ftp2.connect(host=HOST, port=PORT, timeout=25)
ftp2.login(user=USER, passwd=PASS)
ftp2.set_pasv(True)
ftp2.set_debuglevel(0)
print("\n[EPSV mode]")
try:
    ftp2.sendcmd("OPTS UTF8 ON")
    print("OPTS UTF8 ON ok")
except Exception as e:
    print("OPTS UTF8 ON:", e)

print(f"probe PUT {remote} ({os.path.getsize(small[0])} bytes)")
try:
    with open(small[0], "rb") as f:
        ftp2.storbinary("STOR " + remote, f, blocksize=1024 * 64)
    print("EPSV PROBE OK")
except Exception as e:
    print("EPSV PROBE FAIL:", repr(e)[:200])

try:
    ftp2.quit()
except Exception:
    pass
