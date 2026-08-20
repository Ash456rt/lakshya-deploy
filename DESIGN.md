# Laksya Groups — Design System

## Brand Identity

Laksya Groups is a Bengaluru-based multi-service conglomerate. The design should feel **premium, trustworthy, and technically capable** — not like a flashy startup or a template.

## Color System

### Primary Palette
- **Background:** `#030712` (neutral-950) — true dark canvas
- **Surface:** `#0a0a0a` to `#171717` (neutral-900/800) — card backgrounds, elevated surfaces
- **Border:** `rgba(255,255,255,0.06)` — subtle dividers, never harsh

### Accent
- **Primary accent:** Amber `#f59e0b` — the brand color, used sparingly for CTAs, links, focus rings
- **Supporting accent:** Cool white `#e2e8f0` — headings, high-emphasis text
- **Muted text:** `#a1a1aa` (zinc-400) — body copy, descriptions

### Accent Colors (use ONE per section max, not all at once)
- Amber-500 for primary actions and links
- Emerald-500 for success states only
- Rose-500 for errors/urgency only

**Rule:** No rainbow accents. Each section gets ONE accent color at most. The site should feel monochrome with strategic amber highlights.

## Typography

### Font Stack
- **Display/Headings:** Geist Sans (already loaded) — weight 700 (bold), NOT 900
- **Body:** Geist Sans — weight 400 (regular)
- **Mono/Code:** Geist Mono — for technical elements

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero H1 | 4rem (64px) / 3rem mobile | 700 | 1.1 |
| Section H2 | 2.5rem (40px) / 2rem mobile | 700 | 1.2 |
| Card H3 | 1.25rem (20px) | 600 | 1.3 |
| Body large | 1.125rem (18px) | 400 | 1.7 |
| Body | 1rem (16px) | 400 | 1.6 |
| Caption | 0.875rem (14px) | 400 | 1.5 |

### Rules
- Never use `font-black` (900 weight) — it reads as template-y
- Headings use `font-bold` (700) with generous tracking
- Body text is always `text-zinc-400` on dark backgrounds
- Section labels (pills) use 14px, uppercase tracking, with the section's accent color

## Spacing & Layout

- **Section padding:** `py-24` (96px) vertical, `px-6` horizontal
- **Max width:** `max-w-7xl` (1280px) for content, `max-w-4xl` (896px) for text-heavy sections
- **Card gaps:** `gap-6` (24px) minimum
- **Card padding:** `p-8` (32px) for content cards
- **Border radius:** `rounded-2xl` (16px) for cards, `rounded-full` for pills/badges

## Components

### Cards
- Background: `bg-white/[0.03]` (subtle white overlay)
- Border: `border border-white/[0.06]`
- Hover: border brightens to `border-white/[0.12]`
- No gradient backgrounds on cards — keep them clean
- No glow effects — use border color change on hover instead

### Buttons (Primary)
- Background: solid amber `bg-amber-600`
- Hover: `bg-amber-500`
- Padding: `px-6 py-3` (desktop), `px-8 py-4` (hero CTA)
- Border radius: `rounded-full`
- Text: white, 14px, font-medium (500)

### Buttons (Secondary)
- Background: transparent
- Border: `border border-white/20`
- Hover: `bg-white/[0.06]`
- Same sizing as primary

### Section Labels (Pills)
- 14px, font-medium, uppercase with wide tracking
- Colored text matching the section accent
- Subtle background: `{accent}/10` opacity
- Border: `border {accent}/20`
- Rounded full, inline-block

### Form Inputs
- Background: `bg-white/[0.05]`
- Border: `border-white/[0.08]`
- Focus: `border-amber-500` with `ring-2 ring-amber-500/20`
- Text: white, placeholder text-zinc-500
- NO light-mode inputs — the site is dark-only

## Motion & Animation

### Principles
- Animations should be subtle and purposeful, not flashy
- Fade + slight translateY for enter animations (15-20px, not 50px)
- Duration: 0.4-0.6s for content, 0.2-0.3s for micro-interactions
- Ease: `ease-out` for enters, `ease-in-out` for loops

### What to Avoid
- ParticleText (too novelty, removes on repeat visits)
- Hyperspeed/synthwave backgrounds (too flashy for a services company)
- Ripple distortion effects
- Magnetic buttons everywhere (reserve for hero CTA only)
- Background beams (too busy)

### Allowed Effects
- Subtle gradient orbs in background (low opacity, large blur)
- Scroll-triggered fade-in animations
- Hover state transitions on cards (border color, slight scale)
- Smooth scroll between sections

## Section Structure

Each section follows this pattern:
1. **Section label** — pill badge with accent color
2. **Heading** — `text-4xl font-bold` with optional gradient text (ONE word, not whole heading)
3. **Subheading** — `text-zinc-400 max-w-2xl mx-auto text-center`
4. **Content** — grid of cards or feature blocks
5. **Transition** — subtle gradient fade to next section background

### Section Background Gradient Pattern
```
bg-neutral-950 → bg-neutral-900 → bg-neutral-950 (alternating subtle shifts)
```
Never pure black to pure black — use slight warmth shifts for visual separation.

## Dark Mode Only

This site is dark-only. Remove ALL `dark:` Tailwind prefixes — they are dead code. All styles should target the dark state directly.

## What NOT to Do (Anti-patterns)

1. Don't use more than 2 accent colors on a single page
2. Don't put gradient text on entire headings — one keyword max
3. Don't use `font-black` — use `font-bold`
4. Don't add background effects to every section
5. Don't use glass morphism (`backdrop-blur`) on every card
6. Don't animate on scroll everything — pick key moments
7. Don't use emoji for icons — use SVG or lucide-react
8. Don't mix light and dark mode classes — pick one (dark)
