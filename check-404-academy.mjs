import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const errors404 = [];
page.on('response', resp => {
  if (resp.status() === 404) errors404.push(resp.url());
});

await page.goto('http://localhost:3000/lakshya-deploy/', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1500);

await browser.close();

console.log('404 resources on academy page:');
errors404.forEach(u => console.log('  ❌', u));
if (errors404.length === 0) console.log('  ✅ No 404s');
