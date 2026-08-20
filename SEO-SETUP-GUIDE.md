# 🚀 Laksya Groups — SEO Setup Guide

Follow these steps IN ORDER. Each one builds on the previous.

---

## Step 1: Google Search Console (Do This FIRST)

### Why
Google Search Console tells Google your site exists and helps you fix indexing issues.

### How
1. Go to **https://search.google.com/search-console**
2. Click **"Add Property"**
3. Choose **"URL prefix"** and enter: `https://laksya-groups.vercel.app`
4. Choose **"HTML tag"** verification method
5. Copy the verification code (e.g., `abc123xyz...`)
6. Update `src/app/layout.tsx` — replace the existing verification code:
   ```tsx
   verification: {
     google: "YOUR_NEW_CODE_HERE",
   },
   ```
7. Deploy your site
8. Go back to Search Console and click **"Verify"**
9. Once verified, go to **Sitemaps** → Submit: `https://laksya-groups.vercel.app/sitemap.xml`

### What to Check Weekly
- **Performance** → See which queries bring traffic
- **Pages** → See which pages are indexed
- **Errors** → Fix any crawl issues immediately

---

## Step 2: Google Analytics 4 (GA4)

### Why
Tracks visitor behavior, traffic sources, and conversions.

### How
1. Go to **https://analytics.google.com**
2. Click **"Admin"** (gear icon, bottom left)
3. Click **"Create Property"**
4. Enter:
   - Property name: `Laksya Groups`
   - Time zone: `India (GMT+05:30)`
   - Currency: `Indian Rupee`
5. Follow setup wizard:
   - Business size: Select appropriate
   - Business objectives: `Generate leads` + `Increase online sales`
6. Choose **"Web"** platform
7. Enter your URL: `https://laksya-groups.vercel.app`
8. Copy the **Measurement ID** (starts with `G-`)
9. Add to `src/app/layout.tsx` in the `<head>`:
   ```tsx
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
   />
   <script
     dangerouslySetInnerHTML={{
       __html: `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');`,
     }}
   />
   ```

---

## Step 3: Google Business Profile

### Why
This is how your business appears on Google Maps and in local search results. Critical for getting found in Bengaluru.

### How
1. Go to **https://business.google.com**
2. Click **"Manage now"** or **"Add your business"**
3. Enter:
   - Business name: `Laksya Groups`
   - Business category: `Information Technology Company` (primary)
   - Also add: `Web Development Company`, `Travel Agency`, `Training Centre`
4. Add your address:
   ```
   36/2, Beml Layout, Margondanahalli
   Bengaluru, Karnataka 560036, India
   ```
5. Add phone: `+91 99028 41875`
6. Add website: `https://laksya-groups.vercel.app`
7. Add hours:
   - Monday-Friday: 9:00 AM – 6:00 PM
   - Saturday: 10:00 AM – 2:00 PM
   - Sunday: Closed
8. Add photos:
   - Logo (use `/laksya-logo.png`)
   - Cover photo
   - Office photos (at least 5)
   - Team photos
   - Service photos
9. Write a description (750 chars max):
   ```
   Laksya Groups is a multi-service conglomerate headquartered in Bengaluru,
   India. We provide App & Web Development, Strategic Consultancy, Import &
   Export, Customer Support, Transport & Logistics, Tours & Travel, and
   professional training through Laksya Academy.

   Founded in 2018, we have helped businesses across 50+ countries with
   technology, operations, and growth. Our one-partner model means you get
   7 services under one roof — no juggling multiple vendors.

   Services:
   - Website & Mobile App Development
   - Business Consultancy & Digital Transformation
   - Import & Export Solutions
   - 24/7 Customer Support
   - Transport & Logistics
   - Tours & Travel Packages
   - Professional Training (Laksya Academy)

   Contact us for a free consultation.
   ```
10. Verify your business (Google will send a postcard to your address)

### After Verification
- Post updates weekly (offers, blog posts, company news)
- Respond to every review (positive and negative)
- Add new photos regularly
- Keep hours updated

---

## Step 4: Submit to Directories

### Free Listings (Do These Now)
| Directory | URL | Notes |
|-----------|-----|-------|
| JustDial | https://www.justdial.com | Major local directory |
| IndiaMART | https://www.indiamart.com | B2B directory |
| Sulekha | https://www.sulekha.com | Local business directory |
| TradeIndia | https://www.tradeindia.com | Trade directory |

### Paid Listings (Consider Later)
| Directory | URL | Notes |
|-----------|-----|-------|
| Clutch | https://clutch.co | Tech company reviews |
| GoodFirms | https://goodfirms.co | IT services directory |
| G2 | https://g2.com | Software reviews |

---

## Step 5: Get Google Reviews

### Why
Reviews are a top local SEO signal. 5+ reviews with 4+ stars significantly boost visibility.

### How
1. Create a **Google Review Link**:
   - Go to Google Maps → Find your business
   - Click "Write a review"
   - Copy the URL
   - Use https://shorturl.at/ to create a short link
2. Share this link with every happy client
3. Send a follow-up email after project completion:

```
Subject: Quick favor — 1 minute review?

Hi [Client Name],

Thank you for choosing Laksya Groups for [project name]. We hope the
[website/app/service] is working well for you.

If you have a minute, we would really appreciate a Google review:
[Review Link]

It helps other businesses find us and we read every single review.

Thank you!
[Your Name]
Laksya Groups
```

---

## Step 6: Content Calendar (Monthly)

### Week 1: Publish 1 blog post
- Write about a real project or client success
- Include specific numbers and outcomes
- Add author bio with LinkedIn

### Week 2: Post on LinkedIn
- Share the blog post with a personal take
- Tag the client (if they agree)
- Use hashtags: #webdevelopment #bengaluru #startup #tech

### Week 3: Add a case study
- Document a recent project
- Include challenge → solution → results

### Week 4: Update testimonials
- Add new client quotes
- Refresh stats if needed

---

## Quick Reference: Your SEO Checklist

- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Google Analytics installed
- [ ] Google Business Profile created
- [ ] Business verified (postcard)
- [ ] 5+ Google reviews
- [ ] Listed on JustDial
- [ ] Listed on IndiaMART
- [ ] Listed on Sulekha
- [ ] First blog post published
- [ ] LinkedIn post shared
- [ ] First case study added

---

## Expected Timeline

| Week | What Happens |
|------|-------------|
| Week 1 | Google indexes your site |
| Week 2-4 | Search Console starts showing data |
| Month 2 | Analytics shows traffic patterns |
| Month 3 | First organic visitors from blog |
| Month 6 | Noticeable ranking improvement |
| Month 12 | Established presence for key terms |

**SEO is a marathon, not a sprint.** Consistency beats perfection.
