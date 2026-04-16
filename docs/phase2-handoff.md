# Phase 2 Handoff — Oursky.com Webflow → Astro Migration

**Date:** 2026-04-15  
**Status:** ✅ Phase 2 Complete — design tokens + layout shell — 25 pages build successfully, ready for Phase 3

---

## What Was Done in Phase 2

### 1. Design Tokens (`src/styles/global.css`)

Replaced all placeholder `@theme` values with **real Webflow brand tokens** extracted from the live Webflow published CSS (`oursky-com-2023.webflow.shared.*.min.css`) via:

```bash
curl -s "https://cdn.prod.website-files.com/6544a001d4acba67aa28f5f5/css/oursky-com-2023.webflow.shared.183d3e1f0.min.css"
```

> **Note:** Tokens were first extracted from the published CSS, then **verified and corrected via Webflow Designer MCP** (`variable_tool → get_variables` + `style_tool → query_styles`). All values in `global.css` are authoritative from the Designer.

#### Key findings vs Phase 1 placeholders:

| Token | Phase 1 placeholder | Phase 2 actual | Source |
|---|---|---|---|
| Primary color | `#e63328` (guessed red) | `#e29f34` | Designer variable `Colors/Primary` |
| Brand font | `Inter` | `Borna Webfont` | Designer variable `Typography/Body Font` |
| Nav CTA bg | — | `#ffbb55` solid | Designer style `primary-link` |
| Heading weight | `700` | `900` (ultra-bold) | Designer style `Heading` |
| Body font-size | `16px` | `14px` | Designer style `default-body` |
| Body bg | `#ffffff` | `#f3f3f3` | Designer style `default-body` |
| Hero text | — | `5rem`, gradient | Designer style `hero-banner__caption__primary` |
| Nav background | — | `rgba(255,255,255,0.9)` frosted glass | Published CSS `.navbar-container` |
| Footer bg | — | `#000` + `border-radius: 1.5rem` | Published CSS `.footer` |

#### Complete `@theme` token map:

- **Colors:** `--color-bg` (#f3f3f3), `--color-primary` (#e29f34), `--color-text` (#333), `--color-muted` (#ececec), `--color-border` (#eee), `--color-footer-bg` (#000), `--color-footer-accent` (#ffbb55), `--color-destructive` (#d5455f), and all dark-mode equivalents
- **Typography:** `--font-sans: "Borna", system-ui, sans-serif`
- **Type scale:** xs (12px) → 4xl (52px) based on most-frequent values in Webflow CSS
- **Layout:** `--max-w-content: 78.75rem` (1260px), `--spacing-page-x: 1.25rem`, `--nav-height: 4.25rem`
- **Radii:** `--radius-lg: 1.5rem` (cards/footer), `--radius-full: 9999px` (pills)

### 2. Self-hosted Borna Font

Downloaded all 5 Borna Webfont weights from Webflow CDN to `public/fonts/`:

| File | Weight | Style |
|---|---|---|
| `borna-regular.woff2` | 400 | normal |
| `borna-medium.woff2` | 500 | normal |
| `borna-medium-italic.woff2` | 500 | italic |
| `borna-semibold.woff2` | 600 | normal |
| `borna-bold.woff2` | 700 | normal |

`@font-face` declarations added to `global.css` with `font-display: swap`.  
`BaseLayout.astro` adds `<link rel="preload">` for the two most-used weights (400, 500).

No Google Fonts dependency remains.

### 3. Logo SVGs

Downloaded from Webflow CDN to `public/images/`:
- `oursky-logo.svg` — black logo (header, light backgrounds)
- `oursky-logo-white.svg` — white logo (footer on black)

### 4. Layout Shell

#### `src/data/navigation.ts` (new)
Central navigation data file. Contains:
- `mainNav` — 5 main links (Works, Services, Products, Blog, About) with `mobileHidden` flag for tablet collapse
- `ctaLink` — Contact CTA
- `footerSections` — 4 column groups (Works, Services, Products, Company)
- `offices` — Oursky + Skymakers office locations

#### `src/components/layout/Header.astro` (new)

Floating pill navigation faithfully replicating Webflow's `.header` design:

- **Desktop:** sticky wrapper (`z-index: 8`, `position: sticky`) with logo pill + nav pill + amber contact CTA pill
- **Active state:** blue radial-gradient pill matching Webflow's `.w--current` style
- **Frosted glass:** `backdrop-filter: blur(7px)`, `background: rgba(255,255,255,0.9)`, `border: 1px solid #eee`
- **Mobile (< 768px):** nav pill + contact hidden, hamburger button shown → full-screen frosted overlay
- **Accessibility:** `aria-current="page"`, `aria-expanded`, `aria-controls`, `aria-label` throughout
- Inline `<script>` for toggle (no React needed — pure Astro)

#### `src/components/layout/Footer.astro` (new)

Black rounded footer card matching Webflow's `.footer` design:

- Black background (`#000`), `border-radius: 1.5rem`, `padding: 4rem 2.5rem`
- Top row: Oursky logo + tagline (amber `#ffbb55`) + email / navigation columns
- Bottom: offices list (Oursky + Skymakers) + Open Source badge (light blue pill)
- Copyright with dynamic year
- Fully responsive (stacks on mobile)

#### `src/layouts/BaseLayout.astro` (updated)

- Imports `Header.astro` + `Footer.astro`
- Wraps `<slot />` in `<main>`
- Removed Google Fonts `<link>` (replaced by self-hosted Borna via `global.css`)
- Added `<link rel="preload">` for critical font weights

### 5. `public/robots.txt` (new)

```
User-agent: *
Allow: /
Disallow: /404
Sitemap: https://www.oursky.com/sitemap-index.xml
```

### 6. `.env.example` (updated)

Added analytics and site config placeholders:
- `PLAUSIBLE_DOMAIN` + `PLAUSIBLE_API_HOST`
- `GTM_ID` (commented — alternative to Plausible)
- `PUBLIC_SITE_URL`

---

## Build Verification

```bash
cd oursky-web
npm run build  # ✅ 25 pages built in ~2s, 0 errors
```

All 25 pages from Phase 1 continue to build cleanly.

---

## File Tree Changes (Phase 2 additions/edits)

```
oursky-web/
├── docs/
│   ├── phase1-handoff.md          (unchanged)
│   └── phase2-handoff.md          ← this file (NEW)
├── public/
│   ├── robots.txt                 ← NEW
│   ├── fonts/
│   │   ├── borna-regular.woff2    ← NEW
│   │   ├── borna-medium.woff2     ← NEW
│   │   ├── borna-medium-italic.woff2 ← NEW
│   │   ├── borna-semibold.woff2   ← NEW
│   │   └── borna-bold.woff2       ← NEW
│   └── images/
│       ├── oursky-logo.svg        ← NEW (black)
│       └── oursky-logo-white.svg  ← NEW (white)
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.astro       ← NEW
│   │       └── Footer.astro       ← NEW
│   ├── data/
│   │   └── navigation.ts          ← NEW
│   ├── layouts/
│   │   └── BaseLayout.astro       ← UPDATED (imports Header+Footer)
│   └── styles/
│       └── global.css             ← UPDATED (real tokens, Borna @font-face)
└── .env.example                   ← UPDATED (analytics vars)
```

---

## Phase 3 Recommended Next Steps

1. **Page rebuild** — Use `data_pages_tool` + `element_snapshot_tool` (with Webflow Designer open) to get structured content + visual reference for each page. Priority order:
   - `/` — Home (hero, works grid, testimonials, products, blog preview, CTA)
   - `/about` — Team, values
   - `/services` + `/service/*` — Service detail pages
   - `/products` — FormX + Authgear cards
   - `/contact` — Form + office info
   - `/open-source`

2. **Logo tweak** — The downloaded `oursky-logo.svg` is `50×11` (text only). The header currently renders it with `height: 2rem`. Verify visually and adjust `width`/`height` attrs in `Header.astro` if needed.

3. **Webflow Designer token verification** — Once Designer is open at [oursky-com-2023.design.webflow.com](https://oursky-com-2023.design.webflow.com), run:
   ```
   style_tool → get_styles { query: "all" }
   variable_tool → get_variable_collections { query: "all" }
   ```
   to cross-check extracted hex values and catch any tokens in Webflow variables not in the published CSS.

4. **Font: Satoshi Variable** — The Webflow CSS also references `font-family: Satoshi Variable` (one occurrence, likely a secondary/mono-like usage). Download from [fontshare.com/fonts/satoshi](https://www.fontshare.com/fonts/satoshi) if needed in Phase 3 component work.

5. **SEO:** Add JSON-LD structured data (Organization, WebSite) to `BaseLayout.astro` — deferred from Phase 1.

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
