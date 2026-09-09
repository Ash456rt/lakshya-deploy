import { chromium } from "playwright";

// Quick dev-server health check: loads pages, reports HTTP status, title,
// console/page errors, and saves a screenshot of the last page.
const base = process.argv[2] || "http://localhost:3000";
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ["/", "/about"];

const browser = await chromium.launch();
const errors = [];

for (let path of paths) {
  if (path === "home") path = "/";
  if (!path.startsWith("/")) path = "/" + path;
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(`${path} pageerror: ${e.message}`));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${path} ${r.status()}: ${r.url()}`);
  });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${path} console: ${m.text().slice(0, 200)}`);
  });
  const res = await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);
  const title = await page.title();
  console.log(`${path} -> HTTP ${res.status()} | title: "${title}"`);
  await page.screenshot({ path: `check-${path.replace(/\//g, "_") || "home"}.png` });
  await page.close();
}

await browser.close();

if (errors.length) {
  console.log("\nErrors found:");
  errors.slice(0, 10).forEach((e) => console.log(" -", e));
  process.exitCode = 1;
} else {
  console.log("\nNo console or page errors. Site is running ✔");
}
