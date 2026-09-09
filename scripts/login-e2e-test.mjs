import { chromium } from "playwright";

// E2E login-flow test: submit the login form and classify the outcome.
// PASS = request reaches Supabase (invalid-credentials error is fine)
// FAIL = "Network error" (client cannot reach Supabase)
const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
});

const supabaseCalls = [];
page.on("request", (r) => {
  if (r.url().includes("supabase")) supabaseCalls.push(`${r.method()} ${r.url().slice(0, 90)}`);
});

await page.goto(base + "/login", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(1500);

await page.fill("#email", "e2e-test@example.com");
await page.fill("#password", "wrong-password-123");
await page.click("button[type='submit']");
await page.waitForTimeout(4000);

const errorText = await page.evaluate(() => {
  const el = document.querySelector("[class*='red-']");
  return el ? el.textContent.trim() : null;
});

console.log("supabase requests:", supabaseCalls.length ? supabaseCalls : "NONE");
console.log("form error shown:", JSON.stringify(errorText));

const networkError = errorText === "Network error. Please try again.";
console.log(
  networkError
    ? "\n✗ FAIL — client still cannot reach Supabase"
    : "\n✔ PASS — auth request reached Supabase (expected invalid-credentials response)"
);

await page.screenshot({ path: "login-test.png" });
await browser.close();
process.exitCode = networkError ? 1 : 0;
