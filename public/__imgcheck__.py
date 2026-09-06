import { readdir } from "fs/promises";
import { join } from "path";

p = "C:/Users/Luffy/Downloads/lakshya-deploy/public";
files = ["logo.svg","laksya-logo.png","laksya-logo-300.webp","favicon.ico","apple-icon.png","og-image.webp","team.jpg"]
for f in files:
    fp = join(p, f)
    if not os.path.exists(fp):
        print(f"MISSING: {f}")
    else:
        print(f"{f}: {os.path.getsize(fp)} bytes")
