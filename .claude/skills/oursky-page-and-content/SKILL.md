---
name: oursky-page-and-content
description: >
  Conventions for adding pages, editing pages, and authoring content (blog posts, works)
  in oursky-web. Astro 6 + Tailwind 4. Tailwind-first sections; @theme design tokens for
  colors, text sizes, leading, spacing; header sticky vs fixed-on-home; rail width
  tokens; scroll-reveal pattern; SEO via BaseLayout; FA Pro icons inlined as SVG; the
  Vite stale-CSS-cache footgun. Use whenever you add a new route, restyle a section,
  or write a new blog post or case study.
---

# Oursky Web — Page & Content Conventions

Conventions for working in this codebase post-migration. Read sections 0–4 the first time you touch the repo; the rest is reference.

---

## 0. Required Reading (every session)

1. `src/layouts/BaseLayout.astro` — props (title, description, ogImage, noindex, jsonLd, bodyClass), rendering of header/footer, JSON-LD emission, Plausible gating
2. `src/styles/global.css` — `@theme` tokens, `:root` rail variables, `body.page--home` and `html:has` rules, `.scroll-reveal*` utilities, `.prose`, `@font-face`
3. `src/data/navigation.ts` — `mainNav`, `ctaLink`, `footerSections`, `narrowHidden`
4. `src/components/layout/Header.astro` — floating pill nav, sticky-vs-fixed positioning, scroll-direction retract script
5. `src/pages/index.astro` — home shell (`home-page`, `home-hero-wrapper`), scroll-reveal observer (copy this pattern to other marketing pages if they need staggered reveals)
6. `src/components/home/IntroSection.astro` — reference example: simple Tailwind-first section with scroll-reveal markup
7. `src/components/home/ActionCardsSection.astro` — reference example: more complex Tailwind-first section using a `<style>` block only for gradient text

---

## 1. Component Structure

Astro's file-based routing requires all pages to live under `src/pages/`. Only component files live under `src/components/`.

```
src/
  pages/
    index.astro          ← Home — stays here (Astro routing requirement)
    about.astro
    services.astro
    contact.astro
    blogs/[...slug].astro
    works/[...slug].astro
    blog/[page].astro
    blog-category/[slug].astro
    404.astro
  components/
    layout/              ← Header.astro, Footer.astro
    ui/                  ← atomic, page-agnostic primitives
      PillButton.astro       primary / secondary / ghost button
      SectionBadge.astro     small pill label for section headers
      ContactForm.astro      form fields + Netlify Forms wiring
    home/                ← section components for the home page
    about/               ← section components for /about
    services/            ← section components for /services
    contact/             ← section components for /contact
    products/            ← section components for /products
    blog/                ← shared blog-listing components
  layouts/               ← BaseLayout.astro, BlogLayout.astro, WorkLayout.astro
  content/
    blog/                ← *.md per post
    works/               ← *.md per case study
    categories/          ← *.json
```

**One rule:** the page-named folder under `components/` mirrors its route in `pages/`. `pages/about.astro` → `components/about/`.

Each section `.astro` file:

- Opens with a JSDoc comment if there's anything non-obvious about the source or behavior
- Uses **Tailwind classes in markup** for colors, spacing, typography, layout (see §4)
- Uses a `<style>` block **only** for things Tailwind can't express (gradients, 3D transforms, pseudo-elements)
- Has `aria-label` or `aria-labelledby` on `<section>` elements
- Uses semantic HTML (`<section>`, `<h2>`, `<ul>`, `<article>`, `<blockquote>`)

The page file (`src/pages/<slug>.astro`) stays thin — `BaseLayout` + section imports. `index.astro` is the exception: it holds page-only `<script>` (scroll-reveal observer) and `<style>` (hero / last-section wrappers) that glue multiple sections.

### BaseLayout rule

`BaseLayout.astro` already wraps `<slot />` in `<main>`. **Never add `<main>` inside pages.**

---

## 2. Shared Component Strategy

**Before writing CSS or HTML, ask:** "Does a component for this already exist?"

| Pattern | Component | Import path (from `components/<page>/`) |
|---|---|---|
| Pill button (primary / secondary / ghost) | `PillButton` | `../ui/PillButton.astro` |
| Section label pill | `SectionBadge` | `../ui/SectionBadge.astro` |
| Contact form (Netlify Forms + reCAPTCHA) | `ContactForm` | `../ui/ContactForm.astro` |

```astro
---
import PillButton from '../ui/PillButton.astro';
---
<PillButton href="/contact" label="Get in Touch" variant="primary" />
<PillButton href="/about" label="Meet the Team" variant="secondary" />
<PillButton href="/services" label="Our Services" variant="secondary" onDark />
<PillButton href="/blog" label="Read the Blog →" variant="ghost" />
```

### When to add a new shared component

Put it in `ui/` when:

- It's a self-contained visual primitive (no page-specific data)
- It will (or likely will) be used on 2+ pages

Put it in `components/<page-slug>/` when:

- It's unique to one page, or
- It relies heavily on page-specific data or layout

Naming: `PascalCase.astro`. When in doubt, start page-specific and promote to `ui/` when the second use appears.

---

## 3. Site Header, Rail Keylines, and `page--home`

The site keeps **one horizontal rail** (max width and gutters) across the hero card, header, and lower sections. Implementation is split: **Tailwind** on header chrome, **CSS variables** for shared keylines, **scoped `<style>`** in `Header.astro` for glass pills, absolute nav centering, and scroll-retract motion.

### Header is global — never duplicate in pages

`BaseLayout.astro` renders `<Header />` once above `<main>`. Pages only influence the header via **`bodyClass`** (and global CSS that targets `body`).

### `bodyClass="page--home"` (home only)

Pass this from `src/pages/index.astro`. Effects:

- **`global.css`**: `body.page--home { position: relative; }` so `position: fixed` on the header stacks correctly; `html:has(body.page--home) { overflow-x: clip; }` contains 3D / wide content.
- **`Header.astro`**: `:global(body.page--home) .header-wrapper` switches the bar from **sticky** (default, inner pages) to **fixed** over the hero (`z-index: 20`).

Inner marketing pages omit `bodyClass`; the header stays **sticky**.

### Rail tokens (`:root` in `global.css`)

| Variable | Role |
|---|---|
| `--home-rail-max` | Max content width (1360px) |
| `--home-rail-gutter` | Horizontal padding for sections / hero wrapper |
| `--home-hero-header-inline-pad` | Extra horizontal pad so header pills align with the hero card inset |
| `--site-rail-strip-above-hero` | Grey strip height above hero card (responsive steps) |

Sections combine `max-width: var(--home-rail-max)` with `padding-left/right: var(--home-rail-gutter)`. **Do not** hardcode one-off 1360 / 2.5rem pairs in new pages — check these variables first.

### Scroll-direction nav hide (tablet/desktop)

`Header.astro` includes a small client script on `#site-header`:

- From **`min-width: 768px`**, scrolling **down** retracts the centered nav pill (slides up, fades).
- Near the top (`scrollY` within ~40px) or scrolling **up** brings it back.
- **Below 768px** retract is disabled.
- **`prefers-reduced-motion: reduce`**: retract is disabled.
- When retracted, the nav wrapper gets **`aria-hidden="true"`** (logo + contact remain usable).

### Navigation data

`src/data/navigation.ts`: **`narrowHidden`** drops links (e.g. Home, Blog) on narrow widths; the in-nav logo chip (`nav-pill__brand`) replaces the separate logo pill below `md`.

---

## 4. Writing Component Styles — Tailwind First

### Where styles live

| Layer | Use for |
|---|---|
| **Tailwind in section markup** | Layout, flex/grid, spacing, typography, colors from `@theme`, responsive `md:` / `max-md:`, most of every section |
| **`src/styles/global.css`** | `@theme` and `@font-face`, **`:root` rail variables**, `body.page--home` rules, **shared animation systems** (e.g. `.scroll-reveal*`), `.prose`, anything reused across many pages |
| **Scoped `<style>` in `Header.astro`** | Frosted pill surfaces (`backdrop-filter`), absolute nav centering on tablet+, retracted-state transforms, scrollbar hiding |
| **Scoped `<style>` in `src/pages/index.astro`** | Page-only shells that tie sections together (`.home-page`, `.home-hero-wrapper`) using `--home-rail-*` |

**Bias:** express new section UI with **Tailwind classes in the template**; add scoped CSS only when Tailwind is awkward (see "What stays in a `<style>` block" below).

### Default: Tailwind utility classes

```astro
<!-- ❌ Old way — CSS in <style> block -->
<div class="card">…</div>
<style>
  .card { background: var(--color-surface); border-radius: var(--radius-lg); padding: 2rem 1.75rem; }
</style>

<!-- ✅ New way — Tailwind classes inline -->
<div class="bg-surface rounded-lg p-8 px-7">…</div>
```

### Token → Tailwind class mapping (from `src/styles/global.css @theme`)

#### Colors

| Intent | Tailwind class | Value |
|---|---|---|
| Body text | `text-text` | `#333333` |
| Muted / secondary text | `text-text-muted` | `#726f70` |
| Amber accent | `text-primary` / `bg-primary` | `#e29f34` |
| Amber CTA (brighter) | `text-primary-dark` / `bg-primary-dark` | `#ffbb55` |
| Card surface | `bg-surface` | `#ffffff` |
| Page background | `bg-bg` | `#f3f3f3` |
| Hero strip background | `bg-bg-hero` | `#f2f2f2` |
| Last-section background | `bg-bg-section-light` | `#f7f7f7` |
| Muted bg / placeholder | `bg-muted` | `#ececec` |
| Accent gray | `bg-accent` | `#d9d9d9` |
| Input bg | `bg-input` | `#f1f1f1` |
| Border color | `border-border` | `#eeeeee` |
| Mid-tone border | `border-border-mid` | `#a3a3a3` |
| Dev services blue | `bg-section-blue` | `#2064e8` |
| Why Oursky blue | `bg-section-blue-dark` | `#0c53df` |
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

> **Rule:** reach for a token first. If none exists and the value appears once across the codebase, an arbitrary value (`bg-[#...]`) is fine. If it appears 2+ times, add a token to `global.css @theme` instead.

#### Typography — text size

| Intent | Tailwind class | Value |
|---|---|---|
| Small label / tag 12px | `text-xs` | `0.75rem` |
| Body 14px | `text-sm` | `0.875rem` |
| Base 16px | `text-base` | `1rem` |
| Large 20px | `text-lg` | `1.25rem` |
| XL 24px | `text-xl` | `1.5rem` |
| 28px | `text-xl-plus` | `1.75rem` |
| 2XL 32px | `text-2xl` | `2rem` |
| 3XL section title 48px | `text-3xl` | `3rem` |
| 4XL 52px hero | `text-4xl` | `3.25rem` |
| Inner page hero 64px | `text-5xl` | `4rem` |
| Display 72px | `text-6xl` | `4.5rem` |
| Hero heading 80px | `text-hero-primary` | `5rem` |
| Hero subtitle 40px | `text-hero-secondary` | `2.5rem` |

#### Typography — weight + line-height

| Intent | Tailwind class | Value |
|---|---|---|
| Normal | `font-normal` | `400` |
| Medium | `font-medium` | `500` |
| Semibold | `font-semibold` | `600` |
| Bold | `font-bold` | `700` |
| Black / heading | `font-black` | `900` |
| Compact body | `leading-snug` | `1.4rem` |
| Footer clock labels | `leading-footer` | `2.375rem` |
| Hero description | `leading-desc` | `2.5rem` |
| Hero description mobile | `leading-desc-sm` | `1.75rem` |
| Section card heading | `leading-section` | `3.5rem` |
| Inner-page hero tablet | `leading-hero-sm` | `3rem` |
| Hero heading | `leading-hero` | `5rem` |

#### Spacing + radius

| Intent | Tailwind class | Value |
|---|---|---|
| Section vertical 60px | `mt-section` / `pb-section` etc. | `3.75rem` |
| Section large 120px | `mt-section-lg` etc. | `7.5rem` |
| Inner page top (desktop) | `pt-page-top` | `13.5rem` |
| Inner page top (tablet) | `pt-page-top-tablet` | `7.37rem` |
| Mobile gutter | `px-page-x` | `1.25rem` |
| Desktop gutter | `px-page-x-lg` | `2.5rem` |
| Small radius 6px | `rounded-sm` | `0.375rem` |
| Card radius 12px | `rounded-md` | `0.75rem` |
| Large card 24px | `rounded-lg` | `1.5rem` |
| Hero banner 48px | `rounded-xl` | `3rem` |
| Pill | `rounded-full` | `9999px` |

> If a value maps to an existing token, use the token class. If it maps to a Tailwind default (e.g. `leading-8`), use the default. Only use arbitrary values (`text-[…]`) when there's genuinely no matching token or default.

### What stays in a `<style>` block

| Case | Example |
|---|---|
| Multi-stop / complex gradients | `linear-gradient(120deg, #42afb9 17%, #0095ff 52%, #2b5ef8 81%)` |
| Gradient text fill | `-webkit-background-clip: text; -webkit-text-fill-color: transparent` |
| `clamp()` responsive sizing | `clamp(520px, 92vh, 900px)` |
| 3D transforms | `rotateX(45deg) rotateZ(45deg) translate(360px, -60px)` |
| `clip-path` | `inset(0 0 0 0 round 40px 40px 0 0)` |
| `::placeholder` / `::-webkit-scrollbar` | `::-webkit-scrollbar { display: none }` |
| Parent→descendant hover (`.section:hover .child`) | grouped hover effects |
| `nth-child` selectors | hamburger-line variants |
| `perspective` / `transform-style: preserve-3d` | complex 3D stacking |
| Custom `cubic-bezier` transitions | `transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)` |
| `backdrop-filter` (use `backdrop-blur-*` if standard) | `backdrop-filter: blur(7px)` |
| `transform-origin` | non-center transform origins |

When you do use a `<style>` block, write plain CSS values — no `var(--token, fallback)` fallbacks (the `@theme` always resolves):

```css
/* ✅ */
.hero-h1 { background-image: var(--gradient-hero-text); }

/* ❌ — unnecessary fallback */
.hero-h1 { background-image: var(--gradient-hero-text, linear-gradient(…)); }
```

### Responsive breakpoints

**Responsive changes go on the HTML element as Tailwind variant classes** — not in a `<style>` block.

```astro
<!-- ✅ Tailwind variants -->
<h1 class="text-5xl leading-hero max-md:text-hero-secondary max-md:leading-hero-sm">…</h1>
```

| Tailwind class | CSS equivalent | Use for |
|---|---|---|
| `max-sm:` | `max-width: 639px` | Small mobile |
| `max-md:` | `max-width: 767px` | Mobile layout |
| `max-lg:` | `max-width: 1023px` | Tablet + mobile |
| `md:` | `min-width: 768px` | Tablet+ |
| `lg:` | `min-width: 1024px` | Desktop |

**`@media` inside a `<style>` block** is legitimate only when the style block is already justified (keyframes, `prefers-reduced-motion`, complex selectors) AND the same rule needs to vary by viewport. Use the same pixel values as Tailwind named breakpoints (1023 / 767 / 639px).

### Common Tailwind patterns

| Pattern | Tailwind |
|---|---|
| Full-width section | `w-full` on `<section>` |
| Rounded top corners only | `rounded-t-[40px]` |
| Horizontal scroll carousel | `flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]` |
| Snap card item | `snap-start shrink-0 w-72` |
| Logo invert on dark bg | `brightness-0 invert opacity-75` |
| 4-column grid | `grid grid-cols-4 gap-[60px] max-md:grid-cols-2` |
| Two-column form | `grid grid-cols-2 max-[599px]:grid-cols-1 gap-3` |
| Card hover lift | `transition-all hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]` |
| Image zoom on card hover | `group` on `<a>`, `group-hover:scale-[1.04]` on `<img>` |
| Text color on parent hover | `group` on parent, `group-hover:text-primary` on child |

### Scroll-driven section reveals

Lightweight IntersectionObserver pattern, defined globally so all pages can reuse it.

**CSS** (in `src/styles/global.css`): classes `.scroll-reveal`, `.scroll-reveal--visible`, `.scroll-reveal-group`, `.scroll-reveal-item`, `.scroll-reveal-group--visible` define opacity + `translate3d` transitions and stagger via **`--sr-delay`** on items.

**JS wiring** (in `src/pages/index.astro`): wraps the home main content in a root with class `home-page` and runs an observer that:

1. Selects `.home-page .scroll-reveal` and `.home-page .scroll-reveal-group`
2. Adds visible classes immediately if `prefers-reduced-motion: reduce`
3. Otherwise uses `IntersectionObserver` (`rootMargin: '0px 0px -5% 0px'`, `threshold: 0.05`), toggles visibility once, then `unobserve`

**Markup**: put `scroll-reveal-group` on a section; children that should stagger use `scroll-reveal-item` with optional `style="--sr-delay: 80ms"`.

**Other routes**: copy the observer into the page that needs reveals (scope under a page wrapper class so blog MDX / other layouts aren't affected) or extract a tiny shared script later.

### 3D transforms and overflow

`overflow: hidden` on a parent **does not clip CSS 3D-transformed children in Chrome**. Use `clip-path: inset(...)` instead.

---

## 5. Icons — Font Awesome Pro 6.5.1

We use **Font Awesome Pro** SVGs inlined into components. Existing pages already have icons; this is the playbook for new ones.

### Pattern — inline SVG

FA Pro icons use `fill` (not `stroke`). Set `fill="currentColor"` and control the color via the parent's `text-*` class.

```astro
---
const items = [
  {
    title: 'Agile Development',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" fill="currentColor" aria-hidden="true">
      <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8…"/>
    </svg>`,
  },
];
---

<div class="text-white" set:html={item.icon} />
```

### Sizing

| Use | width / height |
|---|---|
| Inline UI icon | `20` / `20` |
| Card / feature icon | `32` / `32` |
| Large display icon | `48` / `48` |

FA Pro icons have a variable `viewBox`. Always set explicit `width` and `height` — don't rely on viewBox dimensions.

### Where to find icon paths

- **For an icon already used elsewhere on the site**: copy the `<path d="…"/>` from that existing component. Keeps versions consistent.
- **For new icons**: use a Font Awesome Pro local kit if available (place at `ref/fontawesome-pro-6.5.1-desktop/`; gitignored). Browse `svgs/{solid,regular,light,brands,sharp-light}/` to find the right icon, read the file, copy the path. The Webflow site historically used `sharp-light/` for service-page icons and `solid/` for stats.
- **As a last resort**: use the Font Awesome free CDN icons. Match the visual weight of nearby icons.

### Common icon → file mapping

| Intent | FA Pro file |
|---|---|
| Arrow right / CTA | `solid/arrow-right.svg` |
| Checkmark / verified | `solid/check.svg` / `solid/circle-check.svg` |
| Code | `solid/code.svg` |
| Rocket | `solid/rocket.svg` |
| Users / team | `solid/users.svg` |
| Chart | `solid/chart-line.svg` |
| Globe | `solid/globe.svg` |
| Envelope | `solid/envelope.svg` |
| Map pin | `solid/location-dot.svg` |
| GitHub | `brands/github.svg` |
| LinkedIn | `brands/linkedin-in.svg` |
| X (Twitter) | `brands/x-twitter.svg` |
| Instagram | `brands/instagram.svg` |
| YouTube | `brands/youtube.svg` |

---

## 6. SEO via BaseLayout

```astro
<BaseLayout
  title="About"
  description="We don't just build apps; Oursky creates digital experiences that help our partners succeed."
>
```

Rules:

- **`title`** is the page-specific part only. `BaseLayout` prefixes `Oursky - ` automatically (e.g. `"About"` → `<title>Oursky - About</title>`). Don't include `Oursky -` in the page's title prop.
- **`description`** ≤ 160 chars. Used for `<meta name="description">` and the default OG/Twitter description.
- **`ogImage`** defaults to `/images/og-default.png`. Override with `ogImage="/images/<page>/hero.png"` if the page has a relevant hero.
- **`noindex`** for utility/draft pages (`/404`, `/thank-you`-style). Adds `<meta name="robots" content="noindex, nofollow">`.
- **`canonical`** optional — defaults to the live page URL.
- **`jsonLd`** accepts an extra schema object or array, emitted alongside the always-emitted Organization + WebSite. `BlogLayout` and `WorkLayout` pass `Article` / `BreadcrumbList` automatically; static pages rarely need this.
- **`bodyClass="page--home"`** only for the homepage (see §3).

After writing: build (`npm run build`) and grep the rendered HTML for `<title>` and `<meta name="description">` to confirm the values.

---

## 7. URL Routes

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Service detail | `/service/<slug>` |
| Products | `/products` |
| Contact | `/contact` |
| Open Source | `/open-source` |
| Works listing | `/works` |
| Works case study | `/works/<slug>` |
| Blog listing | `/blog` (paginated `/blog/<n>`) |
| Blog post | `/blogs/<slug>` |
| Blog category | `/blog-category/<slug>` |
| 404 | `/404` |

`astro.config.mjs` sets `trailingSlash: 'never'` — canonicals are slash-less (`/about`, not `/about/`). When linking internally, omit trailing slashes too.

---

## 8. Adding Content — Blog, Works, Categories

All dynamic content lives as files in `src/content/`. Add or edit a file, commit, push — Netlify rebuilds and deploys.

### New blog post

1. Copy `templates/blog-post.md` → `src/content/blog/<slug>.md` (kebab-case slug; will render at `/blogs/<slug>`).
2. Fill required frontmatter: `title`, `description`, `pubDate`, `categories` (one or more existing slugs), `draft: true`.
3. Write the body as GitHub-flavored Markdown.
4. Set `draft: false` and commit when ready.

Each `categories[]` entry must match a `src/content/categories/<slug>.json` file. Schema enforced in `src/content.config.ts`.

For posts that need embedded components (rare), rename the file to `.mdx` and import.

### New case study (work)

1. Copy `templates/work.md` → `src/content/works/<slug>.md`.
2. Fill `title`, `description`, `client`, `industry`, plus optional `services`, `heroImage`, `thumbnail`, `order`, `bgColor`, `testimonial`.
3. Write the body. `order` controls position on `/works` listing (lower = first).

### New category

Add `src/content/categories/<slug>.json` with `name`, `slug`, optional `description`. Categories are stable and rarely change.

### Content images

Place under `public/images/blogs/` (blog) or `public/images/works/` (works). Reference with absolute path from frontmatter (`image: "/images/blogs/post-hero.webp"`) or in Markdown (`![alt](/images/blogs/...)`). Don't reference Webflow CDN URLs.

---

## 9. The Vite Stale CSS Cache Footgun

**Symptoms:**

- Components render HTML correctly but have no styling
- Computed `background-color` is `rgba(0,0,0,0)` even though CSS sets a color
- Some sections style correctly while others don't

**Root cause:** Vite's CSS-module cache holds CID-hashed CSS from before the edit. The CID is based on file path, not content, so it stays stable while the cached CSS goes stale until the dev server restarts.

**Fix:** restart the dev server after substantive CSS rewrites.

```bash
pkill -f "astro dev"
npm run dev
```

Note the new port (4321 / 4322 / …) and hard-refresh the browser (Cmd+Shift+R) to clear browser cache too.

**Diagnosing in DevTools:**

```js
// Inspect all loaded rules
document.styleSheets[0].cssRules

// Compare expected vs actual
window.getComputedStyle(el).backgroundColor

// Check whether a specific class rule even exists
Array.from(document.styleSheets)
  .flatMap(s => Array.from(s.cssRules))
  .filter(r => r.selectorText?.includes('your-class'))
```

---

## 10. Debug Workflow

For live inspection use the Chrome DevTools MCP server. Typical loop:

```
1. navigate_page → http://localhost:<port>/<route>
2. take_screenshot → verify visual state
3. evaluate_script → window.getComputedStyle / getBoundingClientRect
4. evaluate_script → el.scrollIntoView()
5. take_screenshot → verify scroll position
```

---

## 11. Build Verification

```bash
npm run build
```

Must pass with **zero TypeScript / Astro errors**. If you've added a new page, the page count increases; if you've added blog/works content, it grows by one each. Rebuild after every content or component change before committing.
