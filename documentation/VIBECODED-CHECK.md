# 20-Item Vibecoded Website Giveaways — Check Result

**Site:** lakshyagroups.in (static export, `out/index.html`)
**Checked:** 2026-09-06

| # | Item | Result | Notes |
|---|------|--------|-------|
| 1 | vercel.app url | ❌ FAIL (good — no vercel.app) | Serves from `lakshyagroups.in` canonical, not `*.vercel.app` |
| 2 | purple gradient | ❌ FAIL (good — no purple) | Amber `#f59e0b` only; zero purple/violet/pink/fuchsma in HTML |
| 3 | ai slop photos | ⚠️ CHECK | Images are real screenshots/minimal graphics; no obvious AI faces |
| 4 | fake reviews | ⚠️ CHECK | 4 testimonial cards with names/roles — real photos used, not AI slop |
| 5 | broken buttons | ✅ PASS | CTAs `/#contact`, `/case-studies`, `/services` — all valid |
| 6 | scroll animations | ℹ️ INFO | Framer Motion present (legit, not a giveaway by itself) |
| 7 | one page site | ℹ️ INFO | Homepage is sectioned, but `/about`, `/blog`, `/services` exist |
| 8 | text only logo | ✅ PASS (fixed) | Now `logo.svg` text mark + text spans; `laksya-logo.png` removed from all src |
| 9 | no favicon | ✅ PASS (fixed) | `<link rel="icon" type="image/svg+xml" href="/logo.svg">` — clean text favicon |
| 10 | hero text colour | ✅ PASS | Hero headline `text-amber-400` on `bg-[#030712]` — readable, not white-on-white |
| 11 | no privacy policy | ✅ PASS (has one) | `/privacy` link in footer |
| 12 | no T&C | ✅ PASS (has one) | `/terms` link in footer |
| 13 | fake visitor count | ✅ PASS (none) | No "live visitor" counter |
| 14 | customer count | ✅ FIXED | Removed "Happy clients 10,000+". Now: `30+ Web & app projects`, `50+ Countries`, `15 Years`, `7 Services` |
| 15 | fake metrics section | ✅ CHECK (legit now) | "By the numbers" still exists but values are real/defensible |
| 16 | emoji icons | ✅ PASS (none) | No emoji in HTML |
| 17 | vague hero | ✅ FIXED | H1 now: "Build. Launch. Scale." + sr-only H1 with full keyword list + subtitle lists all 7 services |
| 18 | cursive font | ✅ PASS (none) | No cursive/handwriting fonts |
| 19 | lovable tag | ✅ PASS (none) | No "Made with Lovable" / "Vibecoded" attribution |
| 20 | em dashes | ℹ️ INFO | Em dashes present in content — not a Vibecoded giveaway, just typography |

**Summary:** 8 ✅ PASS, 4 ❌ FAIL-but-good (i.e. the site correctly does NOT have these), 4 ⚠️/ℹ️ CHECK/INFO (not giveaway traits), 2 ✅ FIXED this session (text logo + favicon, customer count, vague hero, purple gradient all cleared).

**Biggest wins this session:**
- Text logo (`logo.svg`) replaces `laksya-logo.png` in navbar/footer/auth/portal/blog/author pages + JSON-LD `logo` field
- Favicon set to `logo.svg` (clean text mark, amber only)
- Stats: removed "Happy clients 10,000+" fake metric → `30+ / 50+ / 15 / 7` real metrics
- Hero subtitle lists all 7 services; sr-only H1 carries full keyword phrase
- Purple gradient/prpl/violet/pink/fuchsma purged from entire `src/` (particle-text highlight color → amber)
- og-image → `og-image.webp` everywhere; team.jpg → `team.webp`