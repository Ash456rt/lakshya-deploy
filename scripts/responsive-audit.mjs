import { chromium } from "playwright";

// Responsive audit: loads each route at mobile/tablet viewports and reports
// horizontal overflow (the main mobile layout breaker) plus offending elements.
const base = process.argv[2] || "http://localhost:3000";
const routes = (process.argv[3] || "home")
  .split(",")
  .map((r) => r.trim())
  .filter(Boolean);

const viewports = [
  { name: "android-small", width: 360, height: 800 },
  { name: "iphone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
];

const browser = await chromium.launch();
let issues = 0;

const findOffenders = () => {
  const out = [];
  const vw = window.innerWidth;
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > vw + 2 || r.left < -2)) {
      // skip elements clipped by an overflow-hidden ancestor (decorative)
      let clipped = false;
      let p = el.parentElement;
      while (p) {
        const o = getComputedStyle(p).overflowX;
        if (o === "hidden" || o === "clip") { clipped = true; break; }
        p = p.parentElement;
      }
      if (clipped) continue;
      const cls = String(el.className).split(" ").slice(0, 3).join(".");
      out.push(`<${el.tagName.toLowerCase()}> .${cls} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
      if (out.length >= 6) break;
    }
  }
  return out;
};

for (const route of routes) {
  const path = route === "home" ? "/" : "/" + route.replace(/^\/+/, "");
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    try {
      await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(1500);
      const m = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        offenders: window.__findOffenders ? null : undefined,
      }));
      const overflow = m.scrollW > m.innerW + 2;
      if (overflow) {
        issues++;
        const offenders = await page.evaluate(findOffenders);
        console.log(`[OVERFLOW] ${path} @${vp.name} (${vp.width}px): scrollW=${m.scrollW} innerW=${m.innerW}`);
        offenders.forEach((o) => console.log("   -", o));
      }
    } catch (e) {
      console.log(`[ERR] ${path} @${vp.name}: ${e.message.slice(0, 120)}`);
      issues++;
    }
    await page.close();
  }
  // one iPhone-size screenshot per route
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `responsive-${route.replace(/\//g, "_")}.png` });
  } catch {}
  await page.close();
}

await browser.close();
console.log(
  issues
    ? `\n${issues} viewport issue(s) found — see [OVERFLOW] lines above`
    : "\nNo horizontal overflow at any mobile/tablet viewport ✔"
);
