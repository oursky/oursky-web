---
name: oursky-webflow-page-rebuild
description: >
  Step-by-step workflow for rebuilding an Oursky.com Webflow page into Astro 6.
  Based on the real experience of rebuilding the homepage (Phase 3a).
  Covers source analysis, asset migration, component structure, CSS pitfalls,
  debug patterns, and build verification.
  Use for Phase 3b (remaining marketing pages) and any future page additions.
---

# Oursky Webflow → Astro Page Rebuild Skill

Distilled from the real experience of rebuilding the homepage. Follow this top to bottom.

---

## 0. Required Reading (every session)

1. `docs/phase1-handoff.md` — stack, URL parity table, collection schemas
2. `docs/phase2-handoff.md` — design tokens, Borna font, Header/Footer, `navigation.ts`
3. `docs/phase3-handoff.md` — homepage recap, pending pages list
4. `src/layouts/BaseLayout.astro` — props, `<main>` wrapping rule (never add `<main>` inside pages)
5. `src/styles/global.css` — `@theme` tokens
6. `src/data/navigation.ts` — `mainNav`, `ctaLink`, `footerSections`

---

## 1. Source of Truth: Webflow Export in `ref/`

The `ref/oursky-com-2023.webflow/` folder contains the full Webflow export:

```
ref/oursky-com-2023.webflow/
  index.html          ← HTML structure + inline scripts
  css/oursky-com-2023.webflow.css   ← All CSS classes and values
  images/             ← All image/SVG assets
  videos/             ← Video assets
```

**Always read both `index.html` AND `oursky-com-2023.webflow.css` for the target page** before writing any Astro code. The HTML gives structure; the CSS gives exact values (colors, sizes, transforms, gradients).

> ⚠️ `ref/` is temporary and will be deleted. Never reference it from code — copy assets to `public/` first.

---

## 2. Asset Migration (do this before writing components)

Identify every image, SVG, and video used by the page sections:

```bash
# Find all image/video references in the target page HTML
grep -o 'src="images/[^"]*"' ref/oursky-com-2023.webflow/index.html
grep -o 'url\(.*images/[^)]*\)' ref/oursky-com-2023.webflow/css/oursky-com-2023.webflow.css
```

Copy each needed asset:
```bash
cp ref/oursky-com-2023.webflow/images/foo.svg public/images/
cp ref/oursky-com-2023.webflow/videos/hero.mp4 public/videos/
```

Reference in Astro as `/images/foo.svg` (root-relative, served from `public/`).

**Never** use `../ref/...` paths in any component.

---

## 3. Reading Webflow CSS

The CSS file is large (~5000+ lines). Use targeted searches:

```bash
# Find a specific class and read surrounding lines
grep -n "\.section__home__works" ref/.../css/oursky-com-2023.webflow.css
sed -n '1515,1600p' ref/.../css/oursky-com-2023.webflow.css
```

Key things to extract for each section:
- Background colors and gradients (`background-color`, `background-image: linear-gradient(...)`)
- Dimensions and spacing (`padding`, `margin`, `width`, `height`, `aspect-ratio`)
- Typography (`font-size`, `font-weight`, `line-height`, `color`, gradient text clips)
- `border-radius` (sections use large radii like `40px` for rounded top corners)
- CSS transforms (especially 3D: `rotateX`, `rotateZ`, `translate`, `transform-style`)
- `overflow` values
- Responsive breakpoints (`@media` rules at end of file, often lines 4000+)

---

## 4. Component Structure

Astro's file-based routing requires all pages to stay in `src/pages/`. Only component files live under `src/components/`.

```
src/
  pages/
    index.astro          ← HOME PAGE — stays here (Astro routing requirement)
    about.astro          ← ABOUT PAGE — stays here
    ...                  ← one file per route
  components/
    layout/              ← Header.astro, Footer.astro
    ui/                  ← atomic, page-agnostic primitives
      PillButton.astro       primary / secondary / ghost button
      SectionBadge.astro     small pill label for section headers
      ContactForm.astro      form fields: Name, Company, Email, Message, submit
    home/                ← section components for the home page
      HeroSection.astro
      IntroSection.astro
      ProductsSection.astro
      ...
    about/               ← section components for /about  (add in Phase 3b)
    services/            ← section components for /services  (add in Phase 3b)
    ...                  ← one folder per page-slug
  layouts/               ← BaseLayout.astro, BlogLayout.astro, WorkLayout.astro
```

**One rule:** page-named folder under `components/` mirrors its route in `pages/`.
`pages/about.astro` → sections in `components/about/`.

Each section `.astro` file:
- Opens with a JSDoc comment citing the Webflow source
- Uses **Tailwind classes in the markup** for colors, spacing, typography, and layout (see §5)
- Uses a `<style>` block **only** for complex CSS that Tailwind can't express (gradients, 3D transforms, clamp, pseudo-elements)
- Has `aria-label` or `aria-labelledby` on `<section>` elements
- Uses semantic HTML (`<section>`, `<h2>`, `<ul>`, `<article>`, `<blockquote>`)

The page file (`src/pages/<slug>.astro`) stays thin — only `BaseLayout` + imports. No logic.

### BaseLayout rule

`BaseLayout.astro` already wraps `<slot />` in `<main>`. **Never add `<main>` inside pages.**

---

## 4a. Shared Component Strategy

**Before writing any CSS or HTML, ask:** "Does a component for this already exist?"

### Step 1 — Check existing shared components

```bash
ls src/components/ui/       # atomic: buttons, badges, form fields
ls src/components/layout/   # Header, Footer (injected by BaseLayout)
```

### Step 2 — Use shared components

| Pattern | Component | Import path (from `components/<page>/`) |
|---|---|---|
| Pill button (amber / outline / ghost) | `PillButton` | `../ui/PillButton.astro` |
| Section label pill | `SectionBadge` | `../ui/SectionBadge.astro` |
| Contact form fields | `ContactForm` | `../ui/ContactForm.astro` |

**Example — button:**
```astro
---
import PillButton from '../ui/PillButton.astro';
---
<PillButton href="/contact" label="Get in Touch" variant="primary" />
<PillButton href="/about" label="Meet the Team" variant="secondary" />
<PillButton href="/services" label="Our Services" variant="secondary" onDark />
<PillButton href="/blog" label="Read the Blog →" variant="ghost" />
```

**Example — section badge:**
```astro
---
import SectionBadge from '../ui/SectionBadge.astro';
---
<div class="section-header">
  <SectionBadge label="Services" />
  <SectionBadge label="View All →" href="/services" variant="viewall" />
</div>
```

**Example — contact form inside a section:**
```astro
---
import ContactForm from '../ui/ContactForm.astro';
---
<div class="contact-section">
  <div class="contact-section__banner">...</div>
  <div class="contact-section__form-side">
    <ContactForm />
  </div>
</div>
```

### Step 3 — Build new shared components when justified

Put a new component in `ui/` when:
- It's a self-contained visual primitive (no page-specific data)
- It will (or likely will) be used on 2+ pages

Put it in `components/<page-slug>/` when:
- It's unique to one page, or
- It relies heavily on page-specific data or layout

> **Naming convention:** `PascalCase.astro` for all components.
> When in doubt, start page-specific and promote to `ui/` when the second use appears.

---

## 5. Writing Component Styles — Tailwind First

### Default: Tailwind utility classes in the HTML markup

`global.css` defines `@theme` tokens that Tailwind v4 compiles into utility classes. **Always reach for a Tailwind class before writing any CSS.** Keep `<style>` blocks only for things that are genuinely impossible in Tailwind.

**Pattern: Tailwind class instead of CSS property**

```astro
<!-- ❌ Old way — CSS in <style> block -->
<div class="card">…</div>
<style>
  .card { background: var(--color-surface, #fff); border-radius: var(--radius-lg, 1.5rem); padding: 2rem 1.75rem; }
</style>

<!-- ✅ New way — Tailwind classes inline -->
<div class="bg-surface rounded-lg p-8 px-7">…</div>
```

**Token → Tailwind class mapping** (from `src/styles/global.css @theme`):

| Design intent | Tailwind class | Value |
|---|---|---|
| White text / fill | `text-white` / `bg-white` | `#ffffff` |
| Black text / fill | `text-black` / `bg-black` | `#000000` |
| Body text color | `text-text` | `#333333` |
| Muted / secondary text | `text-text-muted` | `#726f70` |
| Amber accent | `text-primary` / `bg-primary` | `#e29f34` |
| Amber CTA (brighter) | `text-primary-dark` / `bg-primary-dark` | `#ffbb55` |
| Card surface white | `bg-surface` | `#ffffff` |
| Muted bg / placeholder | `bg-muted` | `#ececec` |
| Accent gray | `bg-accent` | `#d9d9d9` |
| Input bg | `bg-input` | `#f1f1f1` |
| Border color | `border-border` | `#eeeeee` |
| Small text 12px | `text-xs` | `0.75rem` |
| Body text 14px | `text-sm` | `0.875rem` |
| Base text 16px | `text-base` | `1rem` |
| Large text 20px | `text-lg` | `1.25rem` |
| XL text 24px | `text-xl` | `1.5rem` |
| 2XL text 32px | `text-2xl` | `2rem` |
| 3XL text 48px | `text-3xl` | `3rem` |
| Normal weight | `font-normal` | `400` |
| Medium weight | `font-medium` | `500` |
| Semibold weight | `font-semibold` | `600` |
| Black / heading weight | `font-black` | `900` |
| Small radius 6px | `rounded-sm` | `0.375rem` |
| Card radius 12px | `rounded-md` | `0.75rem` |
| Large card radius 24px | `rounded-lg` | `1.5rem` |
| Hero card radius 48px | `rounded-xl` | `3rem` |
| Pill radius | `rounded-full` | `9999px` |

**Hardcoded Webflow-specific colors** (no token — use arbitrary values):
```astro
bg-[#e6e5e3]   <!-- hero beige -->
bg-[#181818]   <!-- client logos dark -->
bg-[#1a4fff]   <!-- newsletter blue -->
bg-[#00aeff]   <!-- works section base -->
bg-[#2c2c2c]   <!-- social card dark -->
```

### What stays in a `<style>` block (cannot do in Tailwind)

Use a `<style>` block **only** for these cases:

| Case | Example |
|---|---|
| Multi-stop / complex gradients | `linear-gradient(120deg, #42afb9 17%, #0095ff 52%, #2b5ef8 81%)` |
| Gradient text fill | `-webkit-background-clip: text; -webkit-text-fill-color: transparent` |
| `clamp()` responsive sizing | `clamp(520px, 92vh, 900px)` |
| 3D transforms | `rotateX(45deg) rotateZ(45deg) translate(360px, -60px)` |
| `clip-path` | `inset(0 0 0 0 round 40px 40px 0 0)` |
| `::placeholder` / `::webkit-scrollbar` pseudo-elements | `::webkit-scrollbar { display: none }` |
| Parent→descendant hover (`.section:hover .child`) | `.blog-section:hover .blog-btn` |
| `nth-child` selectors | `.hamburger-line:nth-child(1)` |
| `perspective` / `transform-style: preserve-3d` | complex 3D stacking |
| Complex `max(calc(...), rem)` expressions | `max(calc((100vw - 1360px) / 2), 2.5rem)` |
| Custom transition with `cubic-bezier` | `transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)` |
| `backdrop-filter` (use `backdrop-blur-*` if standard blur) | `backdrop-filter: blur(7px)` |
| `repeating-linear-gradient` decoration | wireframe grid patterns |
| `transform-origin` | non-center transform origins |

When you do use a `<style>` block, write plain CSS values (no `var(--token, fallback)` fallbacks — the fallbacks are unnecessary since `@theme` always resolves the tokens):
```css
/* ✅ Clean — no redundant fallback */
.hero-h1 { background-image: var(--gradient-hero-text); }

/* ❌ Noisy — the fallback is unnecessary */
.hero-h1 { background-image: var(--gradient-hero-text, linear-gradient(…)); }
```

### Tailwind responsive breakpoints

| CSS media query | Tailwind equivalent |
|---|---|
| `@media (max-width: 767px)` | `max-md:` |
| `@media (max-width: 1023px)` | `max-lg:` |
| `@media (max-width: 991px)` | `max-[991px]:` |
| `@media (min-width: 768px)` | `md:` |
| `@media (min-width: 1024px)` | `lg:` |

### Common Tailwind patterns for Webflow layouts

| Webflow pattern | Tailwind approach |
|---|---|
| Full-width section | `w-full` on `<section>` |
| Rounded top corners only | `rounded-t-[40px]` |
| Horizontal scroll carousel | `flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]` on `<ul>` |
| Snap card item | `snap-start shrink-0 w-72` on each `<li>` |
| Logo invert on dark bg | `brightness-0 invert opacity-75` |
| Video background | `<video autoplay loop muted playsinline poster="...">` with `absolute inset-0 w-full h-full object-cover` |
| 4-column logo grid | `grid grid-cols-4 gap-[60px] max-md:grid-cols-2` |
| Two-column form layout | `grid grid-cols-2 max-[599px]:grid-cols-1 gap-3` |
| Card hover lift | `transition-all hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]` |
| Image zoom on card hover | `group` on `<a>`, `group-hover:scale-[1.04]` on `<img>` |
| Text color change on hover | `group` on parent, `group-hover:text-primary` on child |

### 3D transforms and overflow

`overflow: hidden` on a parent **does not clip CSS 3D-transformed children in Chrome**. 3D transforms create a stacking context that escapes overflow clipping.

Use `clip-path` instead:
```css
.section__home__works {
  /* overflow: hidden ← does NOT clip 3D children */
  clip-path: inset(0 0 0 0 round 40px 40px 0 0); /* ← clips everything including 3D */
}
```

---

## 6. The Vite Stale CSS Cache Problem

This is the **biggest footgun** in this codebase. Symptoms:
- Components render HTML correctly but have no styling at all
- Computed `background-color` is `rgba(0,0,0,0)` (transparent) even though CSS sets `#000`
- Some sections style correctly while others don't
- `var()` tokens *appear* to fail — but the real problem is the entire `<style>` block is absent

**Root cause**: Vite's CSS module cache holds CID-hashed CSS from before your edits. When the server has served a component before, it caches the CID→CSS mapping. If the file changes, the CID stays the same (it's based on file path, not content), but the old cached CSS continues to be served until the server is restarted.

**`var()` tokens are not the problem** — design tokens work fine when the correct CSS loads. The stale cache prevents the entire style block from loading.

**How to diagnose**:
```javascript
// In DevTools console
document.styleSheets[0].cssRules // inspect all loaded rules
window.getComputedStyle(el).backgroundColor // compare to expected
```

**Fix: always restart the dev server after substantive CSS rewrites**:
```bash
pkill -f "astro dev"
cd oursky-web && npm run dev
# Note the new port (4321, 4322, etc.) — navigate there in browser
```

After restart, do a **hard refresh** in the browser (Cmd+Shift+R) to clear any browser-level cache too.

---

## 7. Debug Workflow with Chrome DevTools MCP

Use the `user-chrome-devtools` MCP server for live inspection. Typical workflow:

```
1. navigate_page → http://localhost:<port>/
2. take_screenshot → verify visual state
3. evaluate_script (function: "() => { return window.getComputedStyle(el).property; }")
4. evaluate_script (function: "() => { el.scrollIntoView(); return 'ok'; }")
5. take_screenshot → verify scroll position
```

Key checks when CSS seems broken:
```javascript
// Check if CSS rule exists at all
Array.from(document.styleSheets).flatMap(s => Array.from(s.cssRules)).filter(r => r.selectorText?.includes('your-class'))

// Check computed values
window.getComputedStyle(document.querySelector('.your-class')).backgroundColor

// Check element dimensions
document.querySelector('.your-class').getBoundingClientRect()
```

---

## 8. Webflow JavaScript to Replicate in Astro

The Webflow export's `index.html` contains inline `<script>` blocks at the bottom. Key ones to replicate:

### Clock widget (used in footer)
```javascript
function setClock(clockElement, date, timeZone) {
  const fmt = new Intl.DateTimeFormat('en-HK', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone });
  // ... rotate SVG path elements via setAttribute('transform', `rotate(${ratio*360}, 51.6928, 51.0082)`)
}
setClock(document.getElementById('clock-container--hk'), new Date(), 'Asia/Hong_Kong');
setClock(document.getElementById('clock-container--london'), new Date(), 'Europe/London');
setInterval(() => { /* update clocks */ }, 1000);
```

### Blog scroll buttons
```javascript
const list = document.querySelector('.blog-card-list');
document.querySelector('.blog-card-list__button--left').addEventListener('click', () => list.scrollBy({ left: -300, behavior: 'smooth' }));
document.querySelector('.blog-card-list__button--right').addEventListener('click', () => list.scrollBy({ left: 300, behavior: 'smooth' }));
```

### Mobile video fallback
The export removes video on Android/mobile and shows a static image instead. Omit for now (Phase 4 mobile optimization).

### Webflow interactions (`data-w-id`)
Elements with `data-w-id` use Webflow's IX2 animation engine (scroll reveal, hover effects). These do NOT need to be replicated in Phase 3 — implement static versions. The animations can be added later with CSS or a lightweight library.

---

## 9. URL Parity

All URLs match Webflow exactly. Never change them. From `docs/phase1-handoff.md`:

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Blog list | `/blog` |
| Blog post | `/blogs/<slug>` |
| Works list | `/works` |
| Works case study | `/works/<slug>` |
| Contact | `/contact` |
| Open Source | `/open-source` |

---

## 10. SEO — BaseLayout Props

Always copy `seoTitle` and `seoDesc` **verbatim** from `exports/webflow/pages-metadata.json` for the page being rebuilt. Do not shorten or paraphrase.

```astro
<BaseLayout
  title="<seoTitle>"
  description="<seoDesc>"
>
```

Example for the homepage:
```astro
<BaseLayout
  title="Oursky - Build it right the First Time"
  description="We are a developer-led software agency comprising a diverse team of experts who work with startups and enterprises to create award-winning digital experiences and fast-track digital transformation."
>
```

Rules:
- **Use the full `seoTitle` string** — do not truncate to just the page name (e.g. `"Oursky"` alone is wrong; the correct value is `"Oursky - Build it right the First Time"`)
- Description ≤ 160 chars; if Webflow's value exceeds this, trim at a sentence boundary
- `ogImage` defaults to `/images/og-default.png` — override if the page has a hero image
- `noindex` only for utility/draft pages
- **Verify** after writing: check the rendered `<title>` tag with `npm run build` and inspect the output HTML to confirm the full title is present

---

## 11. Build Verification

After every page:
```bash
npm run build
```

Must pass with **zero TypeScript/Astro errors**. Warnings about missing images are acceptable (Phase 4 image migration).

Baseline: **26 pages** after Phase 3a. Each new page adds 1.

---

## 12. What's Out of Scope (Phase 3)

- Blog post / works body content (full HTML → MDX is Phase 4)
- Downloading Webflow CDN images to `public/` (Phase 4)
- JSON-LD structured data (Phase 2 next steps)
- Contact form backend
- Webflow IX2 scroll animations
- DNS cutover (Phase 5)
