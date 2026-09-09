import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 375, height: 812 }, // iPhone SE
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
});

const page = await context.newPage();

const issues = [];

// Check viewport meta
const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content').catch(() => null);
if (!viewportMeta || !viewportMeta.includes('width=device-width')) {
  issues.push('❌ Viewport meta missing or incorrect');
}

// Check each page on mobile
const pages = [
  { path: '/', name: 'Home', checks: ['hero', 'nav', 'cta'] },
  { path: '/about', name: 'About', checks: ['content'] },
  { path: '/services', name: 'Services', checks: ['grid', 'cards'] },
  { path: '/services/app-web-development', name: 'App Dev', checks: ['content'] },
  { path: '/case-studies', name: 'Case Studies', checks: ['list'] },
  { path: '/blog', name: 'Blog', checks: ['list'] },
  { path: '/faq', name: 'FAQ', checks: ['accordion'] },
  { path: '/travels/', name: 'Travels', checks: ['mobile-nav', 'hero'] },
  { path: '/lakshya-deploy/', name: 'Academy', checks: ['mobile-nav', 'hero'] },
];

for (const p of pages) {
  try {
    await page.goto(`http://localhost:3000${p.path}`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1000);

    const bodyText = await page.locator('body').textContent();
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = 812;

    if (scrollHeight < viewportHeight - 50) {
      issues.push(`⚠️ ${p.name}: Page too short (${scrollHeight}px vs ${viewportHeight}px viewport) — possible layout issue`);
    }

    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const viewportWidth = window.innerWidth;
      return docWidth > viewportWidth + 5;
    });
    if (overflow) {
      issues.push(`❌ ${p.name}: Horizontal overflow on mobile (${document.documentElement.scrollWidth}px > ${viewportWidth}px)`);
    }

    // Check touch targets (buttons/links should be at least 44px)
    const smallTouchTargets = await page.evaluate(() => {
      const els = document.querySelectorAll('a, button, input, select, textarea');
      const small = [];
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);
        if (size > 0 && size < 44 && !el.hasAttribute('aria-hidden')) {
          small.push({ tag: el.tagName, text: el.textContent?.trim()?.substring(0, 30), size });
        }
      });
      return small.slice(0, 5);
    });
    if (smallTouchTargets.length > 0) {
      issues.push(`⚠️ ${p.name}: ${smallTouchTargets.length} touch targets < 44px: ${smallTouchTargets.map(t => `${t.tag} "${t.text}" (${t.size}px)`).join(', ')}`);
    }

    // Check if nav hamburger works on mobile
    const burger = page.locator('#navBurger, .nav-burger, .mobile-toggle, [aria-label="Open menu"]');
    const burgerVisible = await burger.isVisible().catch(() => false);
    if (p.path === '/' && burgerVisible) {
      // Try tapping it
      try {
        await burger.click();
        await page.waitForTimeout(300);
        const mobileMenu = page.locator('#navMobile, .mobile-menu, [role="menu"]');
        const menuOpen = await mobileMenu.isVisible().catch(() => false);
        if (!menuOpen) {
          issues.push(`❌ ${p.name}: Mobile menu doesn't open when hamburger tapped`);
        }
      } catch (e) {
        issues.push(`⚠️ ${p.name}: Couldn't test mobile menu: ${e.message}`);
      }
    }

    console.log(`✅ ${p.name.padEnd(20)} ${p.path.padEnd(35)} OK (${Math.round(scrollHeight)}px scroll)`);

  } catch (e) {
    issues.push(`❌ ${p.name}: Navigation failed — ${e.message}`);
  }
}

// Check images have aspect-ratio or explicit dimensions
const imagesWithoutDimensions = await page.evaluate(() => {
  const imgs = document.querySelectorAll('img');
  const bad = [];
  imgs.forEach(img => {
    if (!img.hasAttribute('width') && !img.hasAttribute('height') && !img.style.aspectRatio) {
      const src = img.src?.substring(0, 60) || '';
      const nw = img.naturalWidth;
      if (nw > 0 || src.includes('localhost')) {
        bad.push(src);
      }
    }
  });
  return bad.slice(0, 5);
});
if (imagesWithoutDimensions.length > 0) {
  issues.push(`⚠️ Images without dimensions: ${imagesWithoutDimensions.map(s => s.substring(0, 50)).join(', ')}`);
}

// Check font sizes on mobile (body text should be at least 16px)
const smallFonts = await page.evaluate(() => {
  const els = document.querySelectorAll('body, p, li, span, div');
  const small = [];
  els.forEach(el => {
    const style = window.getComputedStyle(el);
    const fontSize = parseFloat(style.fontSize);
    if (fontSize > 0 && fontSize < 14 && el.textContent?.trim().length > 10) {
      small.push({ tag: el.tagName, text: el.textContent?.trim()?.substring(0, 30), size: fontSize });
    }
  });
  return small.slice(0, 5);
});
if (smallFonts.length > 0) {
  issues.push(`⚠️ Font sizes < 14px: ${smallFonts.map(f => `${f.tag} ${f.size}px "${f.text}"`).join(', ')}`);
}

await browser.close();

console.log('\n📱 Mobile Audit Results:');
if (issues.length === 0) {
  console.log('✅ No mobile issues found');
} else {
  console.log(`⚠️ ${issues.length} issues found:\n`);
  issues.forEach(i => console.log(i));
}

// Check specific iPhone vs Android viewport handling
console.log('\n📐 Viewport meta:', viewportMeta);
