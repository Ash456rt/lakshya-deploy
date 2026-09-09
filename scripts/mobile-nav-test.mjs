import { chromium } from "playwright";

// Mobile interaction test: open hamburger menu on iPhone viewport, verify
// the nav opens and links are tappable.
const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});

await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(1500);

// find the hamburger button via its aria-controls handle
const burger = page.locator("button[aria-controls='mobile-menu']");
const count = await burger.count();
console.log("hamburger found:", count);

if (count > 0) {
  const box = await burger.boundingBox();
  console.log("hamburger box:", box && `${Math.round(box.width)}x${Math.round(box.height)} @y=${Math.round(box.y)}`);
  const tapTargetOk = box && box.width >= 40 && box.height >= 40;
  console.log("tap target >= 40px:", tapTargetOk ? "ok" : "TOO SMALL");

  await burger.tap();
  await page.waitForTimeout(800);
  const menuVisible = await page.locator("header nav >> visible=true").count()
    || await page.evaluate(() => {
      const m = document.querySelector("header [class*='md:hidden']");
      return m && getComputedStyle(m).display !== "none" && m.offsetHeight > 40;
    });
  console.log("mobile menu opens on tap:", menuVisible ? "ok ✔" : "FAILED");

  // count tappable links inside opened menu
  const links = await page.evaluate(() => {
    const m = document.querySelector("header [class*='md:hidden']");
    return m ? m.querySelectorAll("a").length : 0;
  });
  console.log("links in mobile menu:", links);

  await page.screenshot({ path: "mobile-menu-open.png" });
}

await browser.close();
console.log("\nMobile nav test done — see mobile-menu-open.png");
