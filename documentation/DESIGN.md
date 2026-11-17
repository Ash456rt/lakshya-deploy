# Lakshya Groups — Design Language (Light Paper Editorial)

_Adopted Sep 2026. Read before any UI change. One system, applied everywhere._

## Positioning
A serious multi-service group (education, trade, logistics, development, travel).
The site reads like a well-set publication: warm paper, ink type, one cobalt accent,
generous white space, hairline rules. Not a dark AI-themed template. Not decorative.

## Color System
- **Paper canvas:** `#f5f1e8` (page), `#fbf9f3` (alt bands), `#ffffff` (elevated cards/inputs).
- **Ink:** `#201c16` (headings/primary text), `#5b554b` (body), `#8b8476` (muted/labels).
- **Accent (ONE):** cobalt `#2433b3` / strong `#1c2a9c` / soft wash `#e7e9fa`.
  Links, focus rings, small index numbers, underline marks, progress fills.
- **Primary CTAs:** near-black ink fill (`bg-ink`) with paper text. Secondary CTAs:
  hairline outline + ink text.
- **Hairlines:** `rgba(28,25,20,0.10)` on paper; borders are 1px, never thick.
- Legacy `brand-violet/blue/copper` token names still exist in code but ALL resolve to
  the accent family or ink. No second accent. No gradient text on headings.
- The logo (metallic mark, dark) appears only as the header image and small avatars.

## Typography
- **Display:** Newsreader (serif), weight 500, tight leading `~1.02-1.05`,
  `letter-spacing: -0.01em`. Headlines only. No random serif words inside sans headlines.
- **Body/UI:** Geist sans. **Meta labels:** Geist Mono or 11px uppercase tracking `0.22em`.
- Scale: hero `text-6xl-8xl`, section heads `4xl-5xl`, body `base-lg`.

## Section Rhythm & Labels
- Section paddings `py-16/20/32`. Max width `max-w-6xl`, content `px-6`.
- **Masthead label rule:** max one small uppercase label per page section header;
  plain muted text, never a background pill. Category chips inside cards are muted labels too.
- No em dashes, no `·`-separated meta strips, no section numbering eyebrows, no scroll cues,
  no decorative status dots, no pure black/white, no outer glows. Blobs and mesh gradients are out.

## Components
- **Cards:** white on paper, 1px hairline `border-ink/10`, radius 14px, hairline-tinted hover.
  Lists and stats generally avoid cards: use hairlines and whitespace.
- **Forms:** transparent inputs over paper/white, 1px `border-stone-300`, label above input,
  `min-h-[48px]`, cobalt focus ring. Success `text-emerald-700 bg-emerald-50`;
  error `text-red-700 bg-red-50`.
- **Navbar:** transparent on paper at top; `bg-paper/85` + hairline after scroll.
  Logo image left, single-line links, ink CTA button.
- **Chatbot & site tour:** light surfaces (`white`/`paper-deep`), ink text, cobalt accents.
  Tour overlay is a light scrim; driver popovers white with ink text.

## Motion
- **Lenis** smooth scrolling site-wide (auto-disabled for `prefers-reduced-motion`).
- Framer Motion for reveals/parallax: animate transform/opacity only.
- Entry reveals feel like type on paper: mask/slide with `cubic-bezier(0.22,1,0.36,1)`.
- No infinite marquees except the one logo strip; no scroll-jacking.

## Do Not
- Reintroduce dark surfaces on marketing pages (admin dashboard internals may use a
  light admin treatment only).
- Reintroduce the old multi-accent metallic palette or amber.
- Use AI-purple/blue glow gradients, pill eyebrows, or gradient text.
