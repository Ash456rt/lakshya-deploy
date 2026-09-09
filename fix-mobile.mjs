import { chromium } from 'playwright';

console.log('📱 Mobile Optimization Report — Lakshya Groups Website\n');

// Test on iPhone SE (375x812) and Android Pixel 7 (412x915)
const configs = [
  { name: 'iPhone SE', width: 375, height: 812, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  { name: 'Android Pixel 7', width: 412, height: 915, ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  { name: 'iPhone 15 Pro', width: 393, height: 852, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  { name: 'iPad Mini', width: 768, height: 1024, ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
];

const results = [];

for (const cfg of configs) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: cfg.width, height: cfg.height },
    userAgent: cfg.ua,
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(500);

    const bodyOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 10;
    });

    const touchTargetIssues = await page.evaluate(() => {
      const els = document.querySelectorAll('a, button, input[type="submit"], [role="button"]');
      const issues = [];
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        const minSize = Math.min(rect.width, rect.height);
        if (minSize > 0 && minSize < 44 && !el.closest('.sr-only') && !el.hasAttribute('aria-hidden')) {
          const text = el.textContent?.trim()?.substring(0, 25) || el.getAttribute('aria-label') || '';
          if (text) issues.push({ text, size: Math.round(minSize) });
        }
      });
      return issues.slice(0, 3);
    });

    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content').catch(() => null);
    const viewportCorrect = viewportMeta && viewportMeta.includes('width=device-width') && viewportMeta.includes('initial-scale=1');

    const bodyTextSize = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body);
      return parseFloat(style.fontSize);
    });

    results.push({
      device: cfg.name,
      viewport: `${cfg.width}x${cfg.height}`,
      bodyOverflow,
      touchIssues: touchTargetIssues,
      viewportCorrect,
      bodyTextSize: bodyTextSize.toFixed(1),
    });

  } catch (e) {
    results.push({ device: cfg.name, error: e.message });
  } finally {
    await browser.close();
  }
}

console.log('Device Tests:');
for (const r of results) {
  if (r.error) {
    console.log(`  ❌ ${r.device}: ${r.error}`);
    continue;
  }
  const overflow = r.bodyOverflow ? '❌ horizontal overflow' : '✅ no overflow';
  const touch = r.touchIssues.length > 0 ? `⚠️ ${r.touchIssues.length} small touch targets (${r.touchIssues.map(t => `${t.size}px "${t.text}"`).join(', ')})` : '✅ touch targets OK';
  const viewport = r.viewportCorrect ? '✅ viewport meta OK' : '❌ viewport meta missing';
  const fontSize = parseFloat(r.bodyTextSize) >= 16 ? '✅ body 16px+' : '⚠️ body font too small';
  console.log(`  📱 ${r.device} (${r.viewport}): ${overflow}, ${touch}, ${viewport}, ${fontSize}`);
}

console.log('\n📋 Summary:');
const allGood = results.every(r => !r.bodyOverflow && r.touchIssues.length === 0 && r.viewportCorrect && parseFloat(r.bodyTextSize) >= 16);
console.log(allGood ? '✅ All devices pass mobile requirements' : '⚠️ Some mobile issues found — see above');
