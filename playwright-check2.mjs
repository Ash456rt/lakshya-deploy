import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const notFound = [];
page.on('response', resp => {
  if (resp.status() === 404) notFound.push(resp.url());
});

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1000);

await browser.close();

console.log('404 resources on homepage:');
notFound.forEach(u => console.log('  ❌', u));
if (notFound.length === 0) console.log('  ✅ No 404s');
