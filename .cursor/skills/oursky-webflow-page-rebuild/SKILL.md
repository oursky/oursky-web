---
name: oursky-webflow-page-rebuild
description: >
  Step-by-step workflow for rebuilding an Oursky.com Webflow page into Astro 6.
  Tailwind-first sections; standard max-lg/max-md/max-sm breakpoints; @theme
  design tokens for all colors, text sizes, leading, and spacing; Font Awesome
  Pro 6.5.1 SVGs inlined into components; Header.astro (sticky vs fixed home,
  scroll-direction nav); global.css scroll-reveal patterns. Covers source
  analysis, asset migration, component structure, CSS pitfalls, debug patterns,
  and build verification. Use for Phase 3b (remaining marketing pages) and any
  future page additions.
---

# Oursky Webflow → Astro Page Rebuild Skill

Distilled from the real experience of rebuilding the homepage. Follow this top to bottom.

---

## 0. Required Reading (every session)

1. `docs/phase1-handoff.md` — stack, URL parity table, collection schemas
2. `docs/phase2-handoff.md` — design tokens, Borna font, Header/Footer, `navigation.ts`
3. `docs/phase3-handoff.md` — homepage recap, pending pages list
4. `src/layouts/BaseLayout.astro` — props, `bodyClass`, `<main>` wrapping rule (never add `<main>` inside pages)
5. `src/styles/global.css` — `@theme` tokens, `:root` rail variables, `body.page--home` / `html:has`, scroll-reveal utilities
6. `src/data/navigation.ts` — `mainNav`, `ctaLink`, `footerSections`, `narrowHidden`
7. `src/components/layout/Header.astro` — floating pill nav, home vs inner-page positioning, scroll retract script
8. `src/pages/index.astro` — home shell (`home-page`, `home-hero-wrapper`, last section), scroll-reveal observer (copy pattern to other marketing pages as needed)
9. `src/components/home/ActionCardsSection.astro` — reference example of the Tailwind-first section pattern: Tailwind classes for all layout/color/spacing, `<style>` block only for gradient text
10. `src/components/home/IntroSection.astro` — reference example of a simpler Tailwind-first section with scroll-reveal markup (`scroll-reveal-group`, `scroll-reveal-item`, `--sr-delay`)

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

**Cross-reference both files for every section that contains images.** Webflow frequently applies a CSS `background-image` to a card element *and* places a separate `<img>` child inside it. Reading only the CSS misses the `<img>`; reading only the HTML misses the background fill. For each section:

1. Find every `<img>` tag in the ref HTML for that section
2. Find every `background-image` rule for the same card/container class in the CSS
3. If both exist on the same element, decide which layer(s) to port — check the live site to confirm which is the primary visible photo

Porting only one layer when both exist produces broken output (e.g. dark blank cards when only the background fill is ported but the foreground `<img>` is missed).

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

### ⚠️ Webflow dual-layer image pattern

Webflow often places a CSS `background-image` on a card element **and** a separate `<img>` child inside it. They are not interchangeable:

| Layer | CSS location | Visually |
|---|---|---|
| Card fill | `background-image` on `.card` | Full-bleed behind everything |
| Portrait photo | `<img class="people__img">` with `border-radius: 1000px` | Circular foreground image |

**Porting only the background produces dark/blank cards.** When you see `background-image` on a card class in the CSS, immediately check whether there is also an `<img>` inside that card in the HTML. If so, the `<img>` is likely the primary visible photo; decide which layer(s) to carry over based on what the live site actually shows.

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

The page file (`src/pages/<slug>.astro`) stays thin — **`BaseLayout` + imports** for most routes. **`index.astro` is the exception:** it may hold **page-only** `<script>` (scroll-reveal observer) and `<style>` (hero / last-section wrappers) because those glue multiple sections and are not reused elsewhere (see §4b, §5).

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

## 4b. Site header, rail keylines, and `page--home`

The live homepage keeps **one horizontal rail** (max width and gutters aligned with the Webflow `.content-container`) across the hero video card, header, and lower sections. Implementation is split: **Tailwind** on the header chrome, **CSS variables** for shared keylines, **scoped `<style>`** in `Header.astro` for glass pills, absolute nav centering, and scroll-retract motion.

### Header is global — never duplicate in pages

`BaseLayout.astro` renders `<Header />` once above `<main>`. Pages only influence the header via **`bodyClass`** (and global CSS that targets `body`).

### `bodyClass="page--home"` (home only)

Pass this from `src/pages/index.astro` (already wired). Effects:

- **`global.css`**: `body.page--home { position: relative; }` so `position: fixed` on the header stacks correctly; `html:has(body.page--home) { overflow-x: clip; }` contains 3D / wide content.
- **`Header.astro`**: `:global(body.page--home) .header-wrapper` switches the bar from **sticky** (default, inner pages) to **fixed** over the hero (`z-index: 20`), so it stays pinned while the hero scrolls away.

Inner marketing pages omit `bodyClass`; the header stays **sticky** with the grey strip rhythm from `--site-rail-strip-above-hero`.

### Rail tokens (`:root` in `global.css`)

| Variable | Role |
|---|---|
| `--home-rail-max` | Max content width (1360px), matches Webflow rail |
| `--home-rail-gutter` | Horizontal padding for sections / hero wrapper |
| `--home-hero-header-inline-pad` | Extra horizontal pad so the header pills line up with the hero card inset |
| `--site-rail-strip-above-hero` | Grey strip height above the hero card (responsive steps) |

Sections and `index.astro` shells combine `max-width: var(--home-rail-max)` with `padding-left/right: var(--home-rail-gutter)` (or Tailwind where the same numbers are applied via arbitrary values). **Do not** hardcode one-off 1360/2.5rem pairs in new pages without checking these variables first.

### Scroll-direction nav hide (tablet/desktop)

`Header.astro` includes a small client script on `#site-header`:

- From **`min-width: 768px`**, when the user scrolls **down**, the centered nav pill **slides up and fades** (`#site-header.site-header--nav-retracted .header__nav-center--desktop`).
- Near the top (`scrollY` within ~40px) or on **scroll up**, the nav returns.
- **Below 768px** the retract behavior is disabled (whole bar stays visible).
- **`prefers-reduced-motion: reduce`**: retract is disabled; nav stays visible.
- When retracted, the nav wrapper gets **`aria-hidden="true"`** (logo + contact remain usable).

CSS for the transition uses **`cubic-bezier` + transform + opacity** in the component `<style>` block — not Tailwind — because it is tightly coupled to the DOM hooks above.

### Navigation data

`src/data/navigation.ts`: **`narrowHidden`** drops links (e.g. Home, Blog) on narrow widths; the in-nav logo chip (`nav-pill__brand`) replaces the separate logo pill below `md`. Match Webflow breakpoints when changing visibility.

---

## 5. Writing Component Styles — Tailwind First

### Where styles live (refined homepage convention)

| Layer | Use for |
|---|---|
| **Tailwind in section `.astro` markup** | Layout, flex/grid, spacing, typography, colors from `@theme`, responsive `md:` / `max-md:` / arbitrary breakpoints, most of each homepage section |
| **`src/styles/global.css`** | `@theme` and `@font-face`, **`:root` rail variables**, `body.page--home` rules, **shared animation systems** (e.g. `.scroll-reveal*`), `.prose`, anything reused across many pages |
| **Scoped `<style>` in `Header.astro`** | Frosted pill surfaces (`backdrop-filter`), absolute centering of the nav pill on tablet+, retracted-state transforms, scrollbar hiding on horizontal nav |
| **Scoped `<style>` in `src/pages/index.astro`** | **Page-only shells** that tie sections together (`.home-page`, `.home-hero-wrapper`, `.section__home__lastsection`, `.home-lower-content`) using `--home-rail-*` — not worth a component until a second route needs the same wrapper |

**Bias:** express new section UI with **Tailwind classes in the template**; add scoped CSS only when Tailwind is awkward (see table in §5 “What stays in a `<style>` block”). Prefer **one** global definition for cross-page patterns (scroll reveal, prose) instead of copying `<style>` into every section.

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

#### Colors

| Design intent | Tailwind class | Value |
|---|---|---|
| White text / fill | `text-white` / `bg-white` | `#ffffff` |
| Black text / fill | `text-black` / `bg-black` | `#000000` |
| Body text | `text-text` | `#333333` |
| Muted / secondary text | `text-text-muted` | `#726f70` |
| Amber accent | `text-primary` / `bg-primary` | `#e29f34` |
| Amber CTA (brighter) | `text-primary-dark` / `bg-primary-dark` | `#ffbb55` |
| Card surface white | `bg-surface` | `#ffffff` |
| Page background | `bg-bg` | `#f3f3f3` |
| Hero strip background | `bg-bg-hero` | `#f2f2f2` |
| Last-section background | `bg-bg-section-light` | `#f7f7f7` |
| Muted bg / placeholder | `bg-muted` | `#ececec` |
| Accent gray | `bg-accent` | `#d9d9d9` |
| Input bg | `bg-input` | `#f1f1f1` |
| Border color | `border-border` | `#eeeeee` |
| Mid-tone borders | `border-border-mid` | `#a3a3a3` |
| Dev services blue | `bg-section-blue` | `#2064e8` |
| Why Oursky blue (darker) | `bg-section-blue-dark` | `#0c53df` |
| CTA card light blue | `bg-section-blue-light` | `#eff6fa` |
| Motto card gray-blue | `bg-section-gray-blue` | `#dde2ec` |
| Design services warm gray | `bg-section-warm-gray` | `#a19d96` |
| Newsletter card blue | `bg-newsletter-blue` | `#1a4fff` |
| Social links dark | `bg-social-dark` | `#2c2c2c` |
| Client logos dark | `bg-logos-dark` | `#181818` |
| Hero outer beige | `bg-hero-beige` | `#ecebe7` |
| Hero inner beige | `bg-hero-beige-light` | `#e6e5e3` |
| Open source bar | `bg-footer-opensource` | `#cfeaff` |
| Footer background | `bg-footer-bg` | `#000000` |
| Footer accent amber | `text-footer-accent` | `#ffbb55` |
| Link on dark bg | `text-link-on-dark` | `#ffff00` |

**Intentional one-offs** (these values have no `@theme` token — use arbitrary Tailwind):
```astro
bg-[#00aeff]   <!-- works section hero gradient base -->
```

> **Rule:** reach for a color token first. If none exists and the value appears only once across the whole codebase, use an arbitrary value. If it appears 2+ times, add a token to `global.css @theme` instead.

#### Typography — text size

| Design intent | Tailwind class | Value |
|---|---|---|
| Small label / tag 12px | `text-xs` | `0.75rem` |
| Body base 14px | `text-sm` | `0.875rem` |
| Base text 16px | `text-base` | `1rem` |
| Large text 20px | `text-lg` | `1.25rem` |
| XL text 24px | `text-xl` | `1.5rem` |
| Between xl and 2xl 28px | `text-xl-plus` | `1.75rem` |
| 2XL 32px | `text-2xl` | `2rem` |
| 3XL section title 48px | `text-3xl` | `3rem` |
| 4XL 52px hero | `text-4xl` | `3.25rem` |
| Inner page hero title 64px | `text-5xl` | `4rem` |
| Large display text 72px | `text-6xl` | `4.5rem` |
| Hero heading 80px | `text-hero-primary` | `5rem` |
| Hero subtitle 40px | `text-hero-secondary` | `2.5rem` |

#### Typography — font weight

| Design intent | Tailwind class | Value |
|---|---|---|
| Normal weight | `font-normal` | `400` |
| Medium weight | `font-medium` | `500` |
| Semibold weight | `font-semibold` | `600` |
| Bold weight | `font-bold` | `700` |
| Black / heading weight | `font-black` | `900` |

#### Typography — line height

| Design intent | Tailwind class | Value |
|---|---|---|
| Compact body / card text | `leading-snug` | `1.4rem` (22.4px) |
| Footer clock labels | `leading-footer` | `2.375rem` (38px) |
| Hero description | `leading-desc` | `2.5rem` (40px) |
| Hero description at mobile | `leading-desc-sm` | `1.75rem` (28px) |
| Section card headings | `leading-section` | `3.5rem` (56px) |
| Inner page hero at tablet | `leading-hero-sm` | `3rem` (48px) |
| Hero heading | `leading-hero` | `5rem` (80px) |

#### Spacing

| Design intent | Tailwind class | Value |
|---|---|---|
| Section vertical spacing 60px | `mt-section` / `mb-section` / `pt-section` / `pb-section` | `3.75rem` |
| Section large spacing 120px | `mt-section-lg` / `pb-section-lg` etc. | `7.5rem` |
| Inner page container top (desktop) | `pt-page-top` | `13.5rem` |
| Inner page container top (tablet) | `pt-page-top-tablet` | `7.37rem` |
| Mobile horizontal gutter | `px-page-x` | `1.25rem` |
| Desktop horizontal gutter | `px-page-x-lg` | `2.5rem` |

#### Border radius

| Design intent | Tailwind class | Value |
|---|---|---|
| Small 6px | `rounded-sm` | `0.375rem` |
| Card / thumbnail 12px | `rounded-md` | `0.75rem` |
| Large card / footer 24px | `rounded-lg` | `1.5rem` |
| Hero banner 48px | `rounded-xl` | `3rem` |
| Pill | `rounded-full` | `9999px` |

> **Rule on arbitrary values:** if a rem/px value maps to an existing token, always use the token class. If it maps to a Tailwind default (e.g. `leading-8` = `2rem`), use the default. Only use `text-[…]` / `leading-[…]` / `mt-[…]` etc. when there is genuinely no matching token or default.

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
| Site header pill glass + scroll-retract | Keep in `Header.astro` — see **§4b** (do not split across random section files) |

When you do use a `<style>` block, write plain CSS values (no `var(--token, fallback)` fallbacks — the fallbacks are unnecessary since `@theme` always resolves the tokens):
```css
/* ✅ Clean — no redundant fallback */
.hero-h1 { background-image: var(--gradient-hero-text); }

/* ❌ Noisy — the fallback is unnecessary */
.hero-h1 { background-image: var(--gradient-hero-text, linear-gradient(…)); }
```

### Tailwind responsive breakpoints

**All responsive changes go on the HTML element as Tailwind variant classes** — not in a `<style>` block.

```astro
<!-- ✅ Responsive via Tailwind variants -->
<h1 class="text-5xl leading-hero max-md:text-hero-secondary max-md:leading-hero-sm">…</h1>

<!-- ❌ Do not add @media to a style block just for responsive layout -->
<h1 class="page-title">…</h1>
<style>
  .page-title { font-size: 4rem; }
  @media (max-width: 767px) { .page-title { font-size: 2.5rem; } }
</style>
```

**Standard named breakpoints to use:**

| Tailwind class | CSS equivalent | Use for |
|---|---|---|
| `max-sm:` | `max-width: 639px` | Small mobile only |
| `max-md:` | `max-width: 767px` | Mobile layout |
| `max-lg:` | `max-width: 1023px` | Tablet + mobile layout |
| `md:` | `min-width: 768px` | Tablet and up |
| `lg:` | `min-width: 1024px` | Desktop only |

**Map Webflow's `991px` breakpoint to `max-lg:` (1023px).** The visual difference is negligible and keeps the codebase on one consistent scale.

**When is `@media` inside a `<style>` block legitimate?**  
Only when the style block is already justified (e.g. a keyframe animation, `prefers-reduced-motion` override, or complex selector) *and* that same CSS rule needs to vary by viewport. The canonical example in this codebase is `TestimonialsSection.astro`, where the marquee animation is replaced by an accessible scroll container at narrow widths:

```css
/* Legitimate — already in a style block for keyframes; @media changes the animation */
@keyframes testimonials-marquee-scroll { … }

@media (prefers-reduced-motion: reduce) {
  .testimonials-marquee__track { animation: none; overflow-x: auto; … }
}
@media (prefers-reduced-motion: reduce) and (max-width: 1023px) {
  .testimonials-marquee__track { padding-left: 1.25rem; … }
}
```

If such a `@media` is needed, use the same pixel values as the Tailwind named breakpoints (1023 / 767 / 639px). Never use Webflow's `991px`.

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

### Scroll-driven section reveals (homepage pattern)

The refined home replaces static-only sections with a **lightweight IntersectionObserver** pattern (not Webflow IX2). This is intentional, small JS, and respects reduced motion.

**CSS (global — do not reimplement with Tailwind arbitrary utilities):** in `src/styles/global.css`, classes `.scroll-reveal`, `.scroll-reveal--visible`, `.scroll-reveal-group`, `.scroll-reveal-item`, `.scroll-reveal-group--visible` define opacity + `translate3d` transitions and stagger via **`--sr-delay`** on items.

**JS wiring:** `src/pages/index.astro` wraps the home main content in a root with class **`home-page`** and runs a script that:

1. Selects `.home-page .scroll-reveal` and `.home-page .scroll-reveal-group`
2. If `prefers-reduced-motion: reduce`, adds visible classes immediately
3. Otherwise uses **`IntersectionObserver`** (`rootMargin: '0px 0px -5% 0px'`, `threshold: 0.05`), toggles visibility classes once, then **`unobserve`**

**Markup:** Put **`scroll-reveal-group`** on a section (or block); children that should stagger use **`scroll-reveal-item`** with optional `style="--sr-delay: 80ms"`. The homepage sections (`IntroSection`, `WorksPreviewSection`, `ProductsSection`, etc.) follow this pattern.

**Other routes (Phase 3b):** reuse the same class names from `global.css`. Either copy the observer into each page that needs reveals (scoped under a page wrapper class like `home-page`) or extract a tiny shared script later — keep the **observer scope** limited to the page wrapper so blog MDX / other layouts are unaffected.

**Smooth scrolling:** `html { scroll-behavior: smooth; }` is already set in `global.css` for in-page anchors; do not add redundant per-section JS unless product asks for offset headers.

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
Elements with `data-w-id` use Webflow's IX2 animation engine. **Do not** try to reproduce IX2 in Astro. For the **homepage**, we already ship a **small subset** of scroll feel: **global.css scroll-reveal classes** + **IntersectionObserver in `index.astro`**, plus **header scroll-direction hide** in `Header.astro`. Other pages: static-first unless you add the same observer pattern deliberately.

### Header scroll behavior (summary)
See **§4b**. This is client JS + scoped CSS in `Header.astro`, not Webflow export scripts.

---

## 9. Icons — Font Awesome Pro 6.5.1

The Webflow export used **Font Awesome Pro** icons. We now have the FA Pro 6.5.1 desktop kit under `ref/fontawesome-pro-6.5.1-desktop/` (temporary — will be deleted).

> ⚠️ **Never reference `ref/` from code.** Copy the SVG content (not the file) into your component.

### Available style variants

```
ref/fontawesome-pro-6.5.1-desktop/svgs/
  solid/      ← filled; use for UI icons and decorative icons
  regular/    ← medium weight; use when solid feels too heavy
  light/      ← thinnest; use sparingly for large display icons
  brands/     ← social/brand logos (GitHub, LinkedIn, X, etc.)
```

**Default: `solid/`** unless the design calls for a lighter weight.

### Do you need the 6.5.1 folder?

**No, not for any icon that already appears in the Webflow HTML export.**

Webflow inlines FA Pro paths directly into the HTML (at version 6.6.0 or 6.7.2). Those paths differ slightly from the 6.5.1 ref files. Using the ref file for an icon that's already in the HTML gives you subtly wrong geometry.

| Situation | Where to get the path |
|---|---|
| Icon already embedded in a Webflow `.html` file | Copy `<path d="..."/>` from the HTML — not from ref |
| New icon needed that doesn't appear in any Webflow page | Read from `ref/fontawesome-pro-6.5.1-desktop/svgs/<style>/<name>.svg` |

The 6.5.1 folder is **browse-only** for this project — use it to find icon names and check what exists. The actual path data comes from the Webflow HTML.

### Font-mode icons (services page) — how to identify them

The services page (`services.html`) renders icons using a webfont (`<span class="font-fa">`). The unicode characters that select the glyph are embedded in the HTML as raw bytes but **are invisible in text editors** (private-use area, e.g. `U+E5EB`). Do NOT try to read them with a text tool — use the binary extraction method below.

**⚠️ Do not use a browser or curl to get these.** The live site renders the same empty-looking spans; the visible glyph is painted entirely by the font renderer and has no representation in the DOM source.

#### Extracting font-mode icon names (one-time, already done for services page)

```bash
pip3 install fonttools brotli   # only needed once

python3 << 'EOF'
import json, re
from fontTools.ttLib import TTFont

# 1. Build unicode→name map from FA metadata
with open("ref/fontawesome-pro-6.5.1-desktop/metadata/icons.json") as f:
    icons = json.load(f)
unicode_to_name = {data["unicode"].upper(): name for name, data in icons.items() if data.get("unicode")}

# 2. Read the Webflow HTML as bytes (text tools won't show the chars)
with open("ref/oursky-com-2023.webflow/services.html", "rb") as f:
    content = f.read()

# 3. Decode each font-fa span's embedded codepoint
for match in re.finditer(b'font-fa[^<]*>', content):
    trailing = content[match.end():match.end()+4]
    char = trailing.decode("utf-8", errors="replace")[0]
    cp = ord(char)
    if cp > 0x007E:   # ignore plain ASCII
        hex_str = f"{cp:04X}"
        print(f"U+{hex_str}  {unicode_to_name.get(hex_str, '<unknown>')}")
EOF
```

Icon names come back in DOM order (matches the visual top-to-bottom order on the page). Cross-reference with the section headings in the HTML to confirm which name belongs to which card.

### Workflow

**For icons already in Webflow HTML (inline SVG):**
1. Find the `<svg>` element in the relevant Webflow `.html` file
2. Copy the `<path d="..."/>` content — strip the `<!--! Font Awesome Pro ... -->` comment
3. Wrap in `<svg xmlns="..." viewBox="..." width="32" height="32" fill="currentColor" aria-hidden="true">...</svg>`

**For font-mode icons (services page and similar):**
1. Run the binary extraction script above to get the icon name for each span
2. Fetch the path from `ref/fontawesome-pro-6.5.1-desktop/svgs/sharp-light/<name>.svg`
3. Inline with `width="32" height="32" fill="currentColor" aria-hidden="true"`

**For new icons not in any Webflow HTML:**
1. Browse `ref/fontawesome-pro-6.5.1-desktop/svgs/sharp-light/` to find the right icon
2. Read the file to get the SVG markup
3. Inline it into the component with `width="32" height="32" fill="currentColor" aria-hidden="true"`

### Pattern — inline SVG in component

FA Pro icons use `fill` not `stroke`. Add `fill="currentColor"` (or omit — FA paths default fill to the current color context). Control color via the parent's `text-*` class.

```astro
---
const items = [
  {
    title: 'Agile Development',
    // Copied from ref/fontawesome-pro-6.5.1-desktop/svgs/solid/bolt.svg
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" fill="currentColor" aria-hidden="true">
      <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/>
    </svg>`,
    description: '...',
  },
];
---

<!-- Render icon — parent text-* sets fill color -->
<div class="text-white" set:html={item.icon} />
```

### Sizing

FA Pro icons have a variable `viewBox` (not always `0 0 24 24`). Always set explicit `width` and `height` on the `<svg>` element to control render size — do not rely on the viewBox dimensions.

| Use case | `width` / `height` |
|---|---|
| Inline UI icon | `20` / `20` |
| Card / feature icon | `32` / `32` |
| Large display icon | `48` / `48` |

### Finding icon names

```bash
# Search available icons
ls ref/fontawesome-pro-6.5.1-desktop/svgs/solid/ | grep "arrow"
ls ref/fontawesome-pro-6.5.1-desktop/svgs/brands/ | grep "github"
```

Metadata index (icon names, search terms, categories):
```
ref/fontawesome-pro-6.5.1-desktop/metadata/icons.json
ref/fontawesome-pro-6.5.1-desktop/metadata/categories.yml
```

### Exact icon map — every FA icon used on oursky.com

> **Priority rule:** Webflow already inlines the FA Pro paths directly into the HTML. For every icon below that is already embedded, **copy the `<path>` from the Webflow HTML page** — not from the ref SVG file. The ref 6.5.1 files have slightly different path data (different version). Use the ref files only when you need an icon that doesn't already appear in any Webflow HTML page.

#### index.html + detail_blogs.html — Blog carousel scroll buttons

| Placement | FA icon name | Ref file | Color | Note |
|---|---|---|---|---|
| Blog scroll ← | `chevron-left` | `solid/chevron-left.svg` | `white` (fill) | Already inline in HTML |
| Blog scroll → | `chevron-right` | `solid/chevron-right.svg` | `white` (fill) | Already inline in HTML |

#### about.html — Motto card icon (font-mode FA Sharp Light)

| Placement | Unicode | FA icon name | Ref file |
|---|---|---|---|
| "All we care is the Code and UX" heading | U+E1A9 | `hand-horns` | `sharp-light/hand-horns.svg` |

Rendered in `OurValueSection.astro` — `width="52" height="52"`, `fill="currentColor"` (black text context).

#### about.html — Statistics section (6 icons, FA Pro 6.6.0)

| Statistic label | FA icon name | Ref file | Fill color |
|---|---|---|---|
| 15+ Years of web/app experiences | `hexagon-check` | `solid/hexagon-check.svg` | `#39c086` |
| 70+ Experts | `people-group` | `solid/people-group.svg` | `#146aff` |
| 3+ Offices (UK · TW · HK · JP) | `location-smile` | `solid/location-smile.svg` | `#40afd4` |
| 5m+ Single app with most users | `cloud-arrow-down` | `solid/cloud-arrow-down.svg` | `#2a97c6` |
| 150+ Projects Shipped | `trophy` | `solid/trophy.svg` | `#2a4b83` |
| 8+ Featured on AppStore / Play Store | `trophy-star` | `solid/trophy-star.svg` | `#e9a125` |

All six are `height="48" width="48"` in Webflow. Copy paths from `ref/oursky-com-2023.webflow/about.html` lines 108–144.

#### service/ai.html — Statistics section (FA Pro 6.7.2)

| Statistic label | FA icon name | Ref file | Fill color | Note |
|---|---|---|---|---|
| Years of Proven AI expertise | `shield-check` | `solid/shield-check.svg` | `#18CAAA` | Path differs from 6.5.1; copy from HTML |

Other icons in that section are custom SVGs (cloud-download, star/sparkle) — not FA Pro.

#### service/ui-ux-design.html — Statistics section

| Statistic label | FA icon name | Ref file | Fill color |
|---|---|---|---|
| (desktop/screen icon) | `display` or `desktop` | `solid/display.svg` | `#1964e6` |

Other icons in that section are custom SVGs — not FA Pro.

#### services.html — Font-mode FA Sharp Light icons (U+xxxx already decoded)

All icons use `sharp-light/` style. Paths come from `ref/fontawesome-pro-6.5.1-desktop/svgs/sharp-light/`.

**Development section (blue card):**

| Section title | Unicode | FA icon name | Ref file |
|---|---|---|---|
| Software Development | U+E5EB | `gear-complex-code` | `sharp-light/gear-complex-code.svg` |
| Backend and Microservice Development | U+F233 | `server` | `sharp-light/server.svg` |
| Artificial Intelligence | U+F2DB | `microchip` | `sharp-light/microchip.svg` |

**Development methodologies (below blue card):**

| Section title | Unicode | FA icon name | Ref file |
|---|---|---|---|
| Code quality | U+F121 | `code` | `sharp-light/code.svg` |
| Agile development | U+E4BB | `arrows-spin` | `sharp-light/arrows-spin.svg` |
| Active communication | U+F0AE | `list-check` | `sharp-light/list-check.svg` |
| Quality assurance | U+F316 | `file-check` | `sharp-light/file-check.svg` |

**UI/UX Design methodologies:**

| Section title | Unicode | FA icon name | Ref file |
|---|---|---|---|
| User-centric design | U+F4FC | `user-check` | `sharp-light/user-check.svg` |
| Usability testing | U+E03E | `telescope` | `sharp-light/telescope.svg` |
| Lean startup | U+E027 | `rocket-launch` | `sharp-light/rocket-launch.svg` |

#### service/ai.html — Font-mode FA Sharp Light icons (not yet built)

| Placement | Unicode | FA icon name | Ref file |
|---|---|---|---|
| Stat 1 | U+E027 | `rocket-launch` | `sharp-light/rocket-launch.svg` |
| Stat 2 | U+F76C | `cloud-bolt` | `sharp-light/cloud-bolt.svg` |
| Stat 3 | U+E1EC | `microchip-ai` | `sharp-light/microchip-ai.svg` |
| Methodology: Code quality | U+F121 | `code` | `sharp-light/code.svg` |
| Methodology: Design process | U+F5AE | `pen-ruler` | `sharp-light/pen-ruler.svg` |
| Methodology: Active communication | U+F0AE | `list-check` | `sharp-light/list-check.svg` |
| Methodology: QA | U+F316 | `file-check` | `sharp-light/file-check.svg` |

#### service/software-development.html — Font-mode FA Sharp Light icons (not yet built)

| Placement | Unicode | FA icon name | Ref file |
|---|---|---|---|
| Stat 1 | U+F0FB | `jet-fighter` | `sharp-light/jet-fighter.svg` |
| Stat 2 | U+F0C0 | `users` | `sharp-light/users.svg` |
| Stat 3 | U+F2F1 | `rotate` | `sharp-light/rotate.svg` |
| Methodology: Code quality | U+F121 | `code` | `sharp-light/code.svg` |
| Methodology: Design process | U+F5AE | `pen-ruler` | `sharp-light/pen-ruler.svg` |
| Methodology: Active communication | U+F0AE | `list-check` | `sharp-light/list-check.svg` |
| Methodology: QA | U+F316 | `file-check` | `sharp-light/file-check.svg` |

#### service/ui-ux-design.html — Font-mode FA Sharp Light icons (not yet built)

| Placement | Unicode | FA icon name | Ref file |
|---|---|---|---|
| Stat 1 | U+E595 | `users-viewfinder` | `sharp-light/users-viewfinder.svg` |
| Stat 2 | U+F4BC | `hand-heart` | `sharp-light/hand-heart.svg` |
| Stat 3 | U+F2F1 | `rotate` | `sharp-light/rotate.svg` |
| Process step 1–6 | U+E0EE–U+E0F3 | `circle-1` … `circle-6` | `sharp-light/circle-1.svg` … |
| Methodology: Code quality | U+F121 | `code` | `sharp-light/code.svg` |
| Methodology: Design process | U+F5AE | `pen-ruler` | `sharp-light/pen-ruler.svg` |
| Methodology: Active communication | U+F0AE | `list-check` | `sharp-light/list-check.svg` |
| Methodology: QA | U+F316 | `file-check` | `sharp-light/file-check.svg` |

### Common icon → file mapping (additional icons for new pages)

| Design intent | FA Pro file |
|---|---|
| Arrow right / CTA | `solid/arrow-right.svg` |
| Checkmark / verified | `solid/check.svg` / `solid/circle-check.svg` |
| Code / development | `solid/code.svg` / `solid/brackets-curly.svg` |
| Design / paintbrush | `solid/paintbrush.svg` |
| Rocket / launch | `solid/rocket.svg` |
| Users / team | `solid/users.svg` |
| Chart / analytics | `solid/chart-line.svg` |
| Globe | `solid/globe.svg` |
| Envelope / email | `solid/envelope.svg` |
| Map pin / location | `solid/location-dot.svg` |
| GitHub | `brands/github.svg` |
| LinkedIn | `brands/linkedin-in.svg` |
| X (Twitter) | `brands/x-twitter.svg` |
| Instagram | `brands/instagram.svg` |
| YouTube | `brands/youtube.svg` |

---

## 11. URL Parity

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

## 12. SEO — BaseLayout Props

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
  bodyClass="page--home"
>
```

Rules:
- **Use the full `seoTitle` string** — do not truncate to just the page name (e.g. `"Oursky"` alone is wrong; the correct value is `"Oursky - Build it right the First Time"`)
- Description ≤ 160 chars; if Webflow's value exceeds this, trim at a sentence boundary
- `ogImage` defaults to `/images/og-default.png` — override if the page has a hero image
- `noindex` only for utility/draft pages
- **Verify** after writing: check the rendered `<title>` tag with `npm run build` and inspect the output HTML to confirm the full title is present

---

## 13. Build Verification + Visual Check

After every page, two steps are both required — build passing is not enough on its own.

### Step 1 — Build
```bash
npm run build
```
Must pass with **zero TypeScript/Astro errors**. Warnings about missing images are acceptable (Phase 4 image migration). Baseline: **26 pages** after Phase 3a. Each new page adds 1.

### Step 2 — Visual comparison against the live Webflow site *(mandatory)*

A clean build only proves the code compiled. It does **not** prove the page looks correct. After every section is built:

1. Open `http://localhost:4321/<slug>` in the browser
2. Open `https://www.oursky.com/<slug>` alongside it
3. Scroll through both side-by-side and check:
   - Every image is visible (not blank, broken, or missing)
   - Section order matches Webflow
   - Background colors, rounded corners, and spacing match
   - Typography (size, weight, color) matches
   - Layout at tablet (~768px) and mobile (~375px) matches

**Images are the most common failure point.** For every section that contains photos:
- Confirm `<img>` elements render (not just background-image fills)
- Confirm circular crops (`border-radius: 9999px`) are applied where Webflow uses them
- Confirm background-image fills are visible when they are the intended visual layer

> The `PeopleSection` bug (2026-04-22) is the canonical example of why this step is not optional: the build was clean, but the cards were dark and blank because the foreground `<img>` elements were never ported — only the CSS `background-image` was. A 10-second visual comparison would have caught it immediately.

---

## 14. What's Out of Scope (Phase 3)

- Blog post / works body content (full HTML → MDX is Phase 4)
- Downloading Webflow CDN images to `public/` (Phase 4)
- JSON-LD structured data (Phase 2 next steps)
- Contact form backend
- Full **Webflow IX2** parity (complex timelines, CMS-driven interactions) — the homepage uses **targeted** CSS + minimal JS instead; do not import IX2
- DNS cutover (Phase 5)
