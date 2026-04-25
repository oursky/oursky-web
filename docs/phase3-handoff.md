# Phase 3 Handoff — Oursky.com Webflow → Astro Migration

**Date:** 2026-04-15 (updated 2026-04-23)  
**Status:** ✅ Phase 3b Complete — 34 pages build successfully

---

## Phase 3a Summary — Homepage Rebuild

### Pages Built

| Page | File | Status |
|---|---|---|
| `/` — Home | `src/pages/index.astro` | ✅ Done |

Build baseline: **26 pages** (25 from Phase 1+2, +1 homepage). Zero build errors.

---

## What Was Done in Phase 3a

### Webflow MCP Extraction

Used `data_pages_tool → get_page_metadata` + `get_page_content` for the Home page (`id: 6544a001d4acba67aa28f5fb`). Retrieved 71 content nodes including all text, image references, and component instances.

Key sections identified from content nodes:
- `component-instance` (ca3086c7): Webflow hero component → rebuilt as `HeroSection.astro`
- Text node (8b0342a2): "Welcome to Oursky..." intro → `IntroSection.astro`
- Text nodes (911fafba, 074e054c, d07b6dc0): "Our Works" section → `WorksPreviewSection.astro`
- Text nodes (faf84895, ca46d6d7-*): "Our Products" + FormX/Authgear → `ProductsSection.astro`
- Text node (22f9a147) + image nodes: "Trusted by Leading Brands" → `ClientLogosSection.astro`
- Image + text nodes (70a1adae-*, 7b7fad57-*, 1af76ac7-*, 39acbe96-*, 1009c9da-*): 5 testimonials → `TestimonialsSection.astro`
- Badge/text nodes (b3a781e8-*): Blog preview + "View All" → `BlogPreviewSection.astro`
- Text nodes (b3a781e8-*f847, *f849): "How can we help?" CTA → `ContactCtaSection.astro`

### New Files Created (Phase 3a initial)

```
src/
  pages/
    index.astro                            ← Thin: BaseLayout + section imports
  components/
    home/                                  ← All home-page section components
      HeroSection.astro                    ← Hero banner (gradient text, video bg)
      IntroSection.astro                   ← "Welcome to Oursky" + globe + CTA
      WorksPreviewSection.astro            ← Our Works 3D card grid (removed from homepage, kept as file)
      ProductsSection.astro                ← FormX + Authgear product cards
      ClientLogosSection.astro             ← "Trusted by Leading Brands" logo wall
      TestimonialsSection.astro            ← 5 client testimonials scroll
      BlogPreviewSection.astro             ← Latest blog posts (getCollection)
      ActionCardsSection.astro             ← Newsletter + social media cards
      ContactCtaSection.astro              ← "How can we help?" + ContactForm
    ui/
      PillButton.astro                     ← primary / secondary / ghost button
      SectionBadge.astro                   ← small pill section label
      ContactForm.astro                    ← form fields: Name, Company, Email, Message

docs/
  phase3-handoff.md                        ← This file
.claude/
  skills/
    oursky-page-and-content/
      SKILL.md                             ← Page & content skill
```

### Implementation Notes

1. **`<main>` deduplication fixed**: `BaseLayout.astro` wraps `<slot />` in `<main>`. No `<main>` inside pages or sections.

2. **Works data**: `WorksPreviewSection.astro` exists but is **not rendered** on the homepage (removed per design decision — no Works section on live oursky.com). File retained for potential future use.

3. **Blog preview**: `BlogPreviewSection.astro` uses `getCollection('blog')` to get the latest non-draft posts. More posts visible after Phase 4 content migration.

4. **Client logos**: All 22 client logos migrated from `ref/` to `public/images/` and rendered as `<img>` tags with `filter: brightness(0) invert(1)` on the dark background.

5. **Testimonial avatars**: Migrated from Webflow CDN to `public/images/` during Phase 3a.

6. **Hero section**: Rebuilt from the Webflow ref export. Uses `--gradient-hero-text`, `--text-hero-primary`, `--radius-xl` design tokens, and a background `<video>` from `public/videos/`.

7. **CSS approach**: All section components use `<style>` blocks with `var(--token, fallback)` design tokens throughout. No Tailwind utilities inside section components. See §5 of the skill for the full token reference.

---

## Post-Phase-3a Polish (completed 2026-04-16)

Three rounds of improvements after the initial homepage build:

### 1. Design Token Adoption
All homepage sections refactored to use `var(--token, fallback)` consistently. No more hardcoded hex/rem values inside section components. Tokens used:

| Category | Example tokens |
|---|---|
| Colors | `--color-brand-black`, `--color-brand-white`, `--color-text-primary` |
| Gradients | `--gradient-hero-text`, `--gradient-section-bg` |
| Typography | `--text-xs` … `--text-7xl`, `--font-weight-bold` |
| Spacing | `--spacing-section-v`, `--spacing-container-h` |
| Radii | `--radius-sm`, `--radius-md`, `--radius-xl`, `--radius-pill` |

The `SKILL.md` §5 was updated to enforce this: **always use `var()` with fallbacks**, never hardcode values.

### 2. Shared UI Components
Three atomic UI components extracted to `src/components/ui/`:

| Component | Replaces | Used in |
|---|---|---|
| `PillButton.astro` | `<a class="primary-button">` etc. | `IntroSection`, any future pages |
| `SectionBadge.astro` | Inline badge HTML | `BlogPreviewSection`, any future pages |
| `ContactForm.astro` | Inline `<form>` in ContactCtaSection | `ContactCtaSection`, any future Contact page |

### 3. Component Directory Refactor
Eliminated the confusing `sections/home/` + `sections/` nesting. New flat structure:

```
Before:                              After:
src/components/                      src/components/
  sections/                            home/          ← all home sections
    home/                              ui/            ← shared atomic components
      HeroSection.astro                layout/        ← Header, Footer (unchanged)
    ActionCardsSection.astro
    ContactCtaSection.astro
  ui/
    PillButton.astro
```

The `SKILL.md` §4 was updated to document this structure and rules for future pages.

---

## Phase 3b Polish (completed 2026-04-21)

A codebase-wide audit and cleanup pass applied after the initial 3 pages (contact, about, services) were built.

### Conventions Established

| Convention | Rule |
|---|---|
| **Responsive breakpoints** | Always use standard named Tailwind breakpoints: `max-lg:` (≤1023px), `max-md:` (≤767px), `max-sm:` (≤639px). Never use arbitrary `max-[991px]:` etc. `@media` in style blocks must use matching pixel values: 1023px / 767px / 639px. |
| **Style blocks** | Only for: gradient text (`-webkit-background-clip`), `clamp()`, 3D transforms, `perspective`, `backdrop-filter`, `cubic-bezier` keyframes, `clip-path`, `::placeholder`/`::scrollbar` pseudo-elements, `nth-child`. Everything else → inline Tailwind. |
| **Color tokens** | All colors from `@theme` via Tailwind classes. No hardcoded hex in class attributes. Only genuine one-offs with no token use arbitrary values. |
| **Type scale tokens** | `text-xs` through `text-6xl`, `text-hero-primary/secondary`, `text-xl-plus`. No arbitrary `text-[1.75rem]` etc. |
| **Leading tokens** | `leading-snug`, `leading-footer`, `leading-desc`, `leading-desc-sm`, `leading-section`, `leading-hero-sm`, `leading-hero`. No arbitrary `leading-[Xrem]`. |
| **Spacing tokens** | `mt-section` / `pb-section-lg` etc. for 60px/120px vertical rhythm. `pt-page-top` / `pt-page-top-tablet` for inner page top padding. |
| **Icons** | Heroicons outline SVGs inlined as strings in data arrays, rendered via `set:html`. No Font Awesome (stripped from Webflow export). |

### New Tokens Added to `src/styles/global.css`

| Token | Value | Purpose |
|---|---|---|
| `--text-5xl` | `4rem` | Inner page hero titles |
| `--text-6xl` | `4.5rem` | Large display (OurValue motto) |
| `--text-xl-plus` | `1.75rem` | Between xl and 2xl (intro, tabs) |
| `--leading-hero` | `5rem` | Hero heading paired with text-5xl/hero-primary |
| `--leading-hero-sm` | `3rem` | Same at tablet/mobile |
| `--leading-section` | `3.5rem` | Section card headings (text-3xl) |
| `--leading-desc` | `2.5rem` | Hero description paragraphs |
| `--leading-desc-sm` | `1.75rem` | Hero description at mobile |
| `--leading-footer` | `2.375rem` | Footer clock labels and city names |
| `--leading-snug` | `1.4rem` | Compact body/card text |
| `--spacing-section` | `3.75rem` | 60px section vertical spacing unit |
| `--spacing-section-lg` | `7.5rem` | 120px section vertical spacing large |
| `--spacing-page-top` | `13.5rem` | Inner page container top (desktop) |
| `--spacing-page-top-tablet` | `7.37rem` | Inner page container top (tablet) |
| `--max-w-hero-desc` | `63.25rem` | Hero description container max-width |
| `--color-bg-hero` | `#f2f2f2` | Hero wrapper / home top strip |
| `--color-bg-section-light` | `#f7f7f7` | Home last section background |
| `--color-border-mid` | `#a3a3a3` | Mid-tone borders (tech stack, tabs) |
| `--color-link-on-dark` | `#ffff00` | Linked text on blue / dark bg |

### Files Updated (Token Cleanup)

| File | Changes |
|---|---|
| `src/pages/index.astro` | Style block removed; all CSS → inline Tailwind |
| `src/pages/contact.astro` | Style block removed |
| `src/pages/about.astro` | Style block removed |
| `src/pages/services.astro` | Style block removed |
| `src/components/about/OurValueSection.astro` | `text-[72px]` → `text-6xl`, `leading-[80px]` → `leading-hero` |
| `src/components/about/PeopleSection.astro` | `leading-[1.4rem]` → `leading-snug`, `max-[991px]:` → `max-lg:` |
| `src/components/about/WhatWeDoSection.astro` | `text-[1.75rem]` → `text-xl-plus`, `leading-[2.5rem]` → `leading-desc` |
| `src/components/services/DesignServicesSection.astro` | `text-[1.2rem]` → `text-lg`, `leading-[1.4rem]` → `leading-snug`; style block removed |
| `src/components/services/DevelopmentServicesSection.astro` | Style block removed; Heroicons icons added to service + methodology cards |
| `src/components/services/ServicesHeroSection.astro` | Token classes applied; arbitrary px → tokens |
| `src/components/services/TechStackSection.astro` | `text-[1.75rem]` → `text-xl-plus` |
| `src/components/about/AboutHeroSection.astro` | Token classes applied |
| `src/components/products/ProductsHeroSection.astro` | Style block reduced to gradient text only |
| `src/components/products/ProductCardsSection.astro` | `@media` block removed; responsive → inline |
| `src/components/layout/Footer.astro` | `text-[1.75rem]` → `text-xl-plus`, `leading-[2.375rem]` → `leading-footer` |
| `src/components/home/TestimonialsSection.astro` | `mt-[120px]` → `mt-section-lg`, `pt/mb-[60px]` → `pt/mb-section`, `leading-[1.4rem]` → `leading-snug`, `text-[0.8rem]` → `text-xs` |
| `src/components/home/IntroSection.astro` | `text-[28px]` → `text-xl-plus`, `mt-[60px]` → `mt-section` |
| `src/components/home/ProductsSection.astro` | `pb-[120px]` → `pb-section-lg`, `mt-[60px]` → `mt-section` |
| `src/components/home/WorksPreviewSection.astro` | `pb-[120px]` → `pb-section-lg` |
| `src/components/home/BlogPreviewSection.astro` (both copies) | `text-[0.7rem]` → `text-xs` |

### SKILL.md Updates

- §5: Expanded token → Tailwind class tables (colors, type scale, leading, spacing, radius)
- §5: Breakpoints section rewritten — standard named breakpoints required; maps Webflow 991px → `max-lg:`; `@media` must use matching px values
- §5: Color rules updated — all tokens listed; intentional one-offs documented
- §9 (new): Heroicons guide — FA Pro replacement, `set:html` pattern, size defaults, icon mapping table
- Sections renumbered: old §9–§12 → new §11–§14
- Description updated in frontmatter

---

## Phase 3b Polish — Round 2 (2026-04-22–23)

### Bug Fixes

| Bug | Root cause | Fix |
|---|---|---|
| **Pages blank after View Transitions navigation** | `DOMContentLoaded` fires once per hard load; ES module scripts are cached by the browser — not re-run on Astro `ClientRouter` navigation. `scroll-reveal-group` elements stayed at `opacity: 0` on second visit. | Replaced `DOMContentLoaded` + `readyState` guard with `document.addEventListener('astro:page-load', init)` in all four pages: `index.astro`, `services.astro`, `about.astro`, `contact.astro`. `astro:page-load` fires after every navigation including View Transitions. |
| **About page Spline animation cropped** | `aspect-ratio: 1360/762` on container conflicted with fixed `height: 520px` on `<spline-viewer>`. Padding-left was 43% (calibrated for Webflow's full-bleed container) but our page has rail gutters, making viewer too narrow. | Removed `aspect-ratio`, switched to `height: 520px` on container, reduced `padding-left` to 35% (gives ~780px viewer width, matching Webflow's ~775px). Mobile: `height: 280px; padding-left: 20%`. |

### Header Polish

| Change | Detail |
|---|---|
| **Parallax on hero video** | Added `id="hero-parallax-layer"` + `will-change: transform` + rAF-throttled `translateY(scrollY × 0.35)` scroll script. Respects `prefers-reduced-motion`. |
| **Parallax on Works cards** | Added section-relative offset parallax (factor 0.12) to `.works-cardwrap` in `WorksPreviewSection.astro`. |
| **Active nav pill height (desktop)** | Changed `align-items: center` → `align-items: stretch` on `.nav-pill` CSS. Changed `lg:p-3` → `lg:px-3 lg:py-2` on nav element. Active link fills pill height instead of sizing from content+padding. |
| **Tablet/mobile pill height parity** | Changed all three pills (logo, nav, contact) to explicit `height: 3rem` at `max-width: 1023px`. Previously used `height: auto; min-height/max-height` which flexbox `align-items: center` ignores — causing rendered height ~36px instead of 48px. |
| **Nav-link overflow fix at tablet** | Added `height: auto` to `.header .nav-pill .nav-link` in `@media (max-width: 1023px)`. `h-full = height: 100%` (full pill height) overrides `align-items: stretch` in CSS spec — item was rendering at 3rem and overflowing the nav pill's padding area. Only visible on pages with an active link (blue gradient). |

### Header CSS Justified Rules (reference)

The `Header.astro` style block is intentional — every rule has a reason Tailwind can't express:

| Rule | Why CSS |
|---|---|
| `backdrop-filter` + `-webkit-backdrop-filter` | Tailwind `backdrop-blur-sm` omits `-webkit-` prefix (Safari still needs it) |
| `transition: … cubic-bezier(…)` | Tailwind uses fixed easing functions; specific curves can't be expressed as utilities |
| `padding: calc(var(--token) + clamp(…))` | Tailwind can't compose CSS custom properties with `clamp()` |
| `:global(body.page--home) .header-wrapper` | Cross-component ancestor selector — can't target ancestor from child in Tailwind |
| `max-width: var(--home-rail-max)` | Non-Tailwind token; `w-[var(…)]` is fragile and non-idiomatic |
| Nav retract animation compound selector | JS toggles class on `#site-header`; descendant selector targets nav. No Tailwind mechanism for JS-toggled ancestor state. |
| `.header .nav-pill.pill { height }` overrides | Astro scoped style = specificity 0,2,0. Tailwind utility = 0,1,0. Compound selector needed to beat `.pill { height: 4.25rem }`. |
| `scrollbar-width: none` + `::-webkit-scrollbar` | Non-standard property + pseudo-element |
| `radial-gradient` active states | Two-stop gradient with CSS variables + multi-layer `inset`+`offset` box-shadow |

### Why `@media (max-width: 767px)` in style blocks (not `max-md:`)

Astro scopes `<style>` blocks by appending `[data-astro-cid-xxx]` to every selector, giving rules specificity `0,2,0` (class + CID attribute). Tailwind utilities are only `0,1,0`. When a CSS rule needs to beat a Tailwind utility — e.g. `.header .nav-pill.pill { height }` overriding `h-full` — it must stay in CSS. The `@media` block follows because you can't mix CSS-block specificity with Tailwind responsive prefixes. `767px` matches Tailwind's `md` boundary exactly.

---

## Phase 3b — Remaining Pages (Use the skill)

**Prerequisite skill:** `.claude/skills/oursky-page-and-content/SKILL.md` — read it first.

Priority order from `docs/phase2-handoff.md`:

| Page | Webflow page ID | Status | Notes |
|---|---|---|---|
| `/contact` | `654dca55f5bb0633400ded52` | ✅ Done | WorkWithUsSection, FindUsSection, reuses ActionCardsSection |
| `/about` | `654dc0d170a7624572225216` | ✅ Done | AboutHeroSection, OurValueSection (stats+counter), WhatWeDoSection, PeopleSection |
| `/services` | `654dca00f7ddbbf98ffc9862` | ✅ Done | ServicesHeroSection, DevelopmentServicesSection (3 cols), DesignServicesSection, TechStackSection (5 tabs), ServiceLetsTalkSection |
| `/products` | `654dca3c0e169ca747a21219` | ✅ Done | Hero + FormX/Authgear featured cards; reuses existing `ProductsHeroSection` + `ProductCardsSection` components |
| `/open-source` | `6630a9ba0322d5a4207257b5` | ✅ Done | Hero + rich text content (Kubernetes/CI, Web/Mobile, Other Tools) |
| `/service/software-development` | `66f3e0b4442ebaa706ec9f2d` | ✅ Done | Hero + blue intro card + 3 process items + stats + circles + methodologies + TechStack |
| `/service/ui-ux-design` | `66f45af96a746027f5fd224b` | ✅ Done | Hero + blue intro card + 3 approach items + stats + 6-step design process + methodologies |
| `/service/ai` | `6854baa7b030e17f1e2bcd5f` | ✅ Done | Hero + dark-blue intro card + 3 AI approach items + stats + AI Products + circles + methodologies + TechStack |

**Build count:** 26 baseline → 29 pages after contact + about + services → 33 pages after open-source + 3 service inner pages → 34 pages after /products.

### New Files Created (Phase 3b so far)

```
src/
  pages/
    contact.astro                           ✅
    about.astro                             ✅
    services.astro                          ✅
  components/
    contact/
      WorkWithUsSection.astro               ✅ — form + email alt
      FindUsSection.astro                   ✅ — offices (HK/TW + UK/JP)
    about/
      AboutHeroSection.astro                ✅ — gradient blue title
      OurValueSection.astro                 ✅ — motto+why cards + 6-stat grid with animated counters
      WhatWeDoSection.astro                 ✅ — statement + "Let's Talk" CTA
      PeopleSection.astro                   ✅ — 7-person team card grid (CSS bg-image overlay)
    services/
      ServicesHeroSection.astro             ✅ — gradient blue title
      DevelopmentServicesSection.astro      ✅ — blue card 3-col + 4 methodology items
      DesignServicesSection.astro           ✅ — tan card + 3 methodology items
      TechStackSection.astro                ✅ — bordered card, 5 tab groups (JS toggle)
      ServiceLetsTalkSection.astro          ✅ — light blue CTA card
    service/
      ServiceInnerHeroSection.astro         ✅ — gradient title + subtitle (shared hero for service inner pages)
      ServiceStatisticsSection.astro        ✅ — 3-col icon/number/label stats grid with animated counters
      ServiceCirclesSection.astro           ✅ — dark Venn "Customer / Your Software / Oursky" diagram
      ServiceSharedMethodologies.astro      ✅ — 4 "why Oursky" cards (best devs, UX, PM, quality)
      SoftwareDevContent.astro              ✅ — all sections for /service/software-development
      UIUXContent.astro                     ✅ — all sections for /service/ui-ux-design
      AIContent.astro                       ✅ — all sections for /service/ai
  open-source/
    OpenSourceContentSection.astro          ✅ — rich text with GitHub links, 3 tool category headings
```

### Assets Migrated (Phase 3b so far)

Team photos: `IMG_4131.jpeg`, `sailing.jpeg`, `IMG_4749_Original.jpg`, `frank-3.png`, `frank.png`, `joyz.png`, `may-yeung-photo-m.jpg`, `IMG_6107.jpeg`

Service images: `development-service.webp`, `design-service.webp`

Tech stack logos: `react-native.webp`, `flutter.webp`, `kotlin.png`, `swift.webp`, `graphql.png`, `ionic.webp`, `tailwindcss.png`, `reactjs.svg`, `typescript.webp`, `vite.png`, `storybook.svg`, `k8s.png`, `openai.png`, `helm.png`, `prometheusio.svg`, `terraform.png`, `kubeflow.svg`, `dotnet.png`, `golang.png`, `rails.png`, `python.png`, `fastapi.png`, `celery.png`, `langchain.png`, `github-actions.png`, `gnupg.png`

Per page workflow:
1. Read `.claude/skills/oursky-page-and-content/SKILL.md` first
2. Call `data_pages_tool → get_page_metadata` + `get_page_content`
3. Build `src/pages/<slug>.astro` (thin) + `src/components/<slug>/*.astro`
4. Reuse shared UI components from `src/components/ui/` where possible
5. Use `var(--token, fallback)` for all CSS — never hardcode values
6. Use SEO title/description from `exports/webflow/pages-metadata.json`
7. Run `npm run build` after each page

---

## Follow-ups Deferred to Later Phases

- [ ] **Phase 4**: Logo images — download from Webflow CDN, replace text placeholders in `ClientLogosSection.astro`
- [x] **Phase 4**: Blog post bodies (138 posts) — via Webflow MCP + `npm run import:webflow-mcp` (see `docs/phase4-handoff.md`)
- [x] **Phase 4**: Works bodies — case-study copy in `src/content/works/*.md` (same import)
- [ ] **Phase 4**: Testimonial avatars — migrate from Webflow CDN to `public/images/`
- [ ] **SEO**: JSON-LD Organization + WebSite structured data in `BaseLayout.astro` (listed Phase 2)
- [ ] **Font**: Satoshi Variable — one occurrence in Webflow CSS; download from fontshare.com if needed
- [ ] **Phase 5**: DNS cutover + redirect rules + deploy

---

## Webflow Site Reference (carried forward)

| Property | Value |
|---|---|
| Site ID | `6544a001d4acba67aa28f5f5` |
| Works collection ID | `654ba60d6d88c15f2b6e94e3` |
| Blogs collection ID | `654c9b978627503eaa19e2fd` |
| Blog Categories collection ID | `66e14c181ca7ef2021f1efca` |
| Primary locale | English (`654ba60def05336c1f0eb137`) |
| Last published | 2026-04-08 |
