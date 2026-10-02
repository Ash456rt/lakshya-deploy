# Quick SEO sweep: every sitemap URL -> 200, self-canonical, title, no accidental noindex
import re, urllib.request, xml.etree.ElementTree as ET, sys, gzip

BASE = "https://lakshyagroups.in"
HDRS = {"User-Agent": "Mozilla/5.0 (compatible; seo-sweep/1.0)"}

def get(url):
    req = urllib.request.Request(url, headers=HDRS)
    return urllib.request.urlopen(req, timeout=30).read()

raw = get(BASE + "/sitemap.xml")
if raw[:2] == b"\x1f\x8b":
    raw = gzip.decompress(raw)

root = ET.fromstring(raw)
ns = {"s": root[0].tag.split("}")[0].strip("{")} if root[0].tag.startswith("{") else {}
locs = [el.text.strip() for el in root.iter() if el.tag.endswith("}loc") or el.tag == "loc"]
print(f"sitemap URLs: {len(locs)}")

fails = []
for u in locs:
    try:
        body = get(u).decode("utf-8", "replace")
    except Exception as e:
        fails.append((u, f"FETCH {e}"))
        print(f"FAIL {u} :: fetch error {e}")
        continue

    canon = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', body) or \
            re.search(r'<link[^>]+href="([^"]+)"[^>]+rel="canonical"', body)
    title = re.search(r"<title[^>]*>([^<]*)</title>", body)
    # check actual robots META TAGS only (the hostname-guard inline script contains the
    # literal string "noindex,nofollow" in every page's source but never runs here)
    robot_metas = re.findall(r'<meta[^>]+name=["\']robots["\'][^>]*>', body, re.I)
    noindex = any(re.search(r'content=["\'][^"\']*noindex', m, re.I) for m in robot_metas)
    code_ok = True  # urllib raises on non-2xx

    problems = []
    if not canon:
        problems.append("no canonical")
    elif canon.group(1).rstrip("/") != u.rstrip("/"):
        problems.append(f"canonical={canon.group(1)}")
    if not title or not title.group(1).strip():
        problems.append("no title")
    if noindex:
        problems.append("NOINDEX present")
    if len(body) < 3000:
        problems.append(f"thin html ({len(body)}B)")

    if problems:
        fails.append((u, "; ".join(problems)))
        print(f"FAIL {u} :: {'; '.join(problems)}")
    else:
        print(f"PASS {u}")

print()
if fails:
    print(f"RESULT: {len(locs)-len(fails)}/{len(locs)} pass, {len(fails)} FAIL")
    sys.exit(1)
print(f"RESULT: {len(locs)}/{len(locs)} ALL PASS")
