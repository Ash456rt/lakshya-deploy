import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function checkPage(path, name) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`CONSOLE ERROR: ${msg.text()}`);
  });
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));

  let status = 0;
  try {
    const response = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
    status = response?.status() || 0;
  } catch (e) {
    errors.push(`NAV ERROR: ${e.message}`);
  }

  const title = await page.title().catch(() => 'N/A');
  const url = page.url();

  // Check for visible content
  const bodyText = await page.textContent('body').catch(() => '');
  const hasContent = bodyText && bodyText.trim().length > 100;

  // Check for broken images
  const imgErrors = [];
  page.on('requestfailed', req => {
    if (req.resourceType() === 'image') {
      imgErrors.push(`IMG FAIL: ${req.url()}`);
    }
  });

  await page.waitForTimeout(1000);

  await browser.close();

  return {
    path,
    name,
    status,
    title,
    finalUrl: url,
    hasContent,
    bodyTextLength: bodyText?.trim().length || 0,
    errors: errors.slice(0, 10),
    imgErrors: imgErrors.slice(0, 5),
  };
}

const pages = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/services/app-web-development', name: 'App & Web Dev' },
  { path: '/services/strategic-consultancy', name: 'Consultancy' },
  { path: '/services/import-export', name: 'Import Export' },
  { path: '/services/customer-support', name: 'Customer Support' },
  { path: '/services/transport-logistics', name: 'Transport' },
  { path: '/case-studies', name: 'Case Studies' },
  { path: '/blog', name: 'Blog' },
  { path: '/faq', name: 'FAQ' },
  { path: '/travels/', name: 'Travels (standalone)' },
  { path: '/lakshya-deploy/', name: 'Academy (standalone)' },
  { path: '/portal', name: 'Portal' },
  { path: '/admin', name: 'Admin' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/terms', name: 'Terms' },
];

console.log('🔍 Checking Lakshya Groups website...\n');

const results = [];
for (const p of pages) {
  const r = await checkPage(p.path, p.name);
  results.push(r);
  const icon = r.status === 200 ? '✅' : r.status === 308 ? '🔀' : r.status === 404 ? '❌' : '❓';
  console.log(`${icon} ${r.name.padEnd(30)} ${r.path.padEnd(35)} ${r.status} | ${r.title.substring(0, 50)}`);
  if (r.errors.length) {
    r.errors.forEach(e => console.log(`   ⚠️  ${e}`));
  }
  if (r.imgErrors.length) {
    r.imgErrors.forEach(e => console.log(`   🖼️  ${e}`));
  }
  if (!r.hasContent && r.status === 200) {
    console.log(`   ⚠️  Page has no visible content!`);
  }
}

console.log('\n📊 Summary:');
const passed = results.filter(r => r.status === 200 && r.hasContent && !r.errors.length).length;
const failed = results.filter(r => r.status !== 200 || !r.hasContent || r.errors.length > 0).length;
console.log(`✅ ${passed} pages OK`);
console.log(`❌ ${failed} pages with issues`);
