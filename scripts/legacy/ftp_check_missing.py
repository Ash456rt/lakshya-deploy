#!/usr/bin/env python3
"""Compare local out/ files to the FTP server by size; report what is missing or mismatched."""
import os
import ftplib
from pathlib import Path

HOST = "212.85.29.156"
USER = "u882349588.lakshyagroups.in"
# password lives in ftp_pass.txt (gitignored) — rotate it there, never in code
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "ftp_pass.txt"), encoding="utf-8") as _f:
    PASS = _f.read().strip()
PORT = 21
LOCAL_DIR = os.path.abspath("out")
REMOTE_DIR = "/public_html"  # REAL webroot: FTP root is one level above it

base = Path(LOCAL_DIR).resolve()
files = []
for root, dirs, fnames in os.walk(base):
    for fn in fnames:
        full = Path(root) / fn
        files.append((full, full.relative_to(base)))

# Prefer explicit FTPS (AUTH TLS) so credentials are encrypted in transit
try:
    ftp = ftplib.FTP_TLS()
    ftp.connect(host=HOST, port=PORT, timeout=30)
    ftp.login(user=USER, passwd=PASS)
    ftp.prot_p()
except Exception:
    ftp = ftplib.FTP()
    ftp.connect(host=HOST, port=PORT, timeout=30)
    ftp.login(user=USER, passwd=PASS)
ftp.set_pasv(True)
try:
    ftp.sendcmd("OPTS UTF8 ON")
except Exception:
    pass
ftp.voidcmd("TYPE I")  # binary mode required before SIZE on most servers

missing = []
mismatch = []
for full, rel in files:
    remote = str(Path(REMOTE_DIR) / rel).replace("\\", "/")
    try:
        rs = ftp.size(remote)
    except Exception:
        rs = None
    size = os.path.getsize(full)
    if rs is None:
        missing.append((remote, size))
    elif rs != size:
        mismatch.append((remote, size, rs))

ftp.quit()

print(f"local files: {len(files)}")
print(f"missing on server: {len(missing)}")
print(f"size mismatch: {len(mismatch)}")
if missing:
    print("\nMISSING (first 30):")
    for remote, size in missing[:30]:
        print(f"  - {remote} ({size} bytes)")
if mismatch:
    print("\nMISMATCH (first 30):")
    for remote, size, rs in mismatch[:30]:
        print(f"  - {remote} local={size} remote={rs}")
