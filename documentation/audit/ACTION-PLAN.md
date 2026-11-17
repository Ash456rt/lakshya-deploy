# lakshyagroups.in — SEO Action Plan
**Audit date:** 2026-09-08 · **Health Score: 78/100** · Business type: Local multi-service company (hybrid local/global B2B)

## Executive Summary
The site's technical foundation is strong (fast CDN delivery, clean robots/sitemap, rich schema, perfect alt coverage). The two biggest risks were **found and fixed during this audit**: localhost canonicals on every page, and doubled title suffixes. Remaining gaps are **content depth** (thin blog), **AI search readiness** (no llms.txt), and **internal linking**.

## Weighted Scores
| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 88 |
| Content Quality | 23% | 62 |
| On-Page SEO | 20% | 82 |
| Schema | 10% | 74 |
| Performance (CWV) | 10% | 90 |
| AI Search Readiness | 10% | 55 |
| Images | 5% | 84 |
| **Weighted total** | | **78/100** |

---

## Phase 1 — Critical (Week 1)
| # | Action | Status | Impact |
|---|---|---|---|
| 1 | ~~Fix localhost canonicals + og:url~~ | ✅ **FIXED & DEPLOYED** (env → https://lakshyagroups.in, verified live) | Indexing-critical |
| 2 | ~~Fix doubled title suffixes on 12 pages~~ | ✅ **FIXED & DEPLOYED** (earlier today) | High |
| 3 | Request re-indexing in Google Search Console (/, /about, /services, /blog, /faq) | ⬜ You (5 min in GSC) | High |
| 4 | Add `llms.txt` + explicit AI-crawler allows in robots.txt | ⬜ I can do this now | Medium |
| 5 | Monitor GSC Pages report for 2 weeks post-canonical-fix | ⬜ Ongoing | — |

## Phase 2 — High-Impact (Weeks 2–3)
| # | Action | Impact |
|---|---|---|
| 6 | Expand top 3 blog posts to 900–1,200 words (add FAQ sections → rich results) | High |
| 7 | Add `BlogPosting` JSON-LD to blog template (author, dates, image) | Medium |
| 8 | Homepage: add "Latest writing" + "Client results" sections → 6 new internal links | Medium |

## Phase 3 — Content & Authority (Month 2)
| # | Action | Impact |
|---|---|---|
| 9 | Publish 2 new in-depth posts targeting real customer questions | High |
| 10 | Collect 5+ verifiable client reviews → add Review schema | Medium |
| 11 | Convert `hero-bg.jpg` (116KB) + `import-export.jpg` (100KB) to WebP | Low |
| 12 | Add `<lastmod>` to sitemap.xml generation | Low |

## Phase 4 — Monitoring (Ongoing)
- Monthly GSC + GA4 review
- Re-run audit monthly
- Track AI citations (Perplexity / ChatGPT) for "web development company Bengaluru"

---
### What's already excellent (keep doing)
- TTFB ~0.31s from CDN; lean 44–75KB HTML pages
- Security headers: CSP, HSTS 1yr, X-Frame DENY, nosniff
- Schema: Organization, LocalBusiness, WebSite+SearchAction, BreadcrumbList, Service+OfferCatalog, FAQPage, Person
- 14/14 images have alt text; robots.txt properly blocks /portal /admin /api /auth
