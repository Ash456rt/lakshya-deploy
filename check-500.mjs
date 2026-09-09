import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const errors500 = [];
page.on('response', resp => {
  if (resp.status() === 500) errors500.push(resp.url());
});

await page.goto('http://localhost:3000/lakshya-deploy/', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1500);

await browser.close();

console.log('500 resources on academy page:');
errors500.forEach(u => console.log('  ❌', u));
if (errors500.length === 0) console.log('  ✅ No 500s');
