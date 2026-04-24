# Phase 1 Handoff — Oursky.com Webflow → Astro Migration

**Date:** 2026-04-15  
**Status:** ✅ Phase 1 Complete (1A + 1B) — 25 pages build successfully, ready for Phase 2

---

## 1. Stack Versions

| Dependency | Version |
|---|---|
| Astro | 6.1.6 |
| @astrojs/mdx | 5.0.3 |
| @astrojs/react | (installed via `astro add react`) |
| @astrojs/sitemap | 3.7.2 |
| @tailwindcss/vite | 4.2.2 |
| tailwindcss | 4.2.2 |
| React / ReactDOM | 19.x |
| Node.js | 24 LTS |

**Important note:** Astro 6 uses the new Content Layer API (`src/content.config.ts`).  
Collections use `glob()` loaders from `astro/loaders`; schemas use `zod` directly (not `z` from `astro:content` which is deprecated in v6). Use `render(entry)` (named import) instead of `entry.render()`. Collection entries have `entry.id` (filename without extension), not `entry.slug`.

---

## 2. Folder Structure

```
oursky-web/
├── docs/
│   └── phase1-handoff.md           ← this file
├── exports/webflow/                 ← raw Webflow API exports (committed)
│   ├── site-metadata.json          ← site ID, domains, last published
│   ├── pages-metadata.json         ← all 17 pages with slugs + SEO fields
│   ├── categories.json             ← 13 blog categories
│   ├── works-metadata.json         ← 8 works items (slugs, descriptions, image URLs)
│   └── blogs-metadata.json         ← 138 blog posts (slugs, metadata; no body)
├── public/
│   ├── favicon.svg / favicon.ico
│   └── images/
│       ├── blog/                    ← migrated blog images go here
│       └── works/                   ← migrated works images go here
├── src/
│   ├── content.config.ts            ← Astro 6 content collection schemas
│   ├── content/
│   │   ├── blog/
│   │   │   └── hello-world.mdx     ← seed post (Phase 1B: replace with 138 real posts)
│   │   ├── works/
│   │   │   └── placeholder.mdx     ← draft placeholder (Phase 1B: replace with 8 real works)
│   │   └── categories/
│   │       ├── authgear.json        ← all 13 real categories imported from Webflow
│   │       ├── case-study.json
│   │       ├── code.json
│   │       ├── culture.json
│   │       ├── development.json
│   │       ├── engineering.json
│   │       ├── formx.json
│   │       ├── machine-learning-and-ai.json
│   │       ├── product-growth.json
│   │       ├── product-management.json
│   │       ├── project-management.json
│   │       ├── qa.json
│   │       └── ui-design.json
│   ├── layouts/
│   │   ├── BaseLayout.astro         ← HTML shell, meta, OG, Twitter, canonical, fonts
│   │   ├── BlogLayout.astro         ← blog post layout
│   │   └── WorkLayout.astro         ← case study layout with hero + testimonial
│   ├── pages/
│   │   ├── index.astro              ← Home (placeholder)
│   │   ├── blog/
│   │   │   ├── index.astro          ← Blog listing
│   │   │   ├── [...slug].astro      ← Blog post detail
│   │   │   └── category/
│   │   │       └── [slug].astro     ← Category landing pages
│   │   └── works/
│   │       ├── index.astro          ← Works listing
│   │       └── [...slug].astro      ← Works detail
│   └── styles/
│       └── global.css               ← Tailwind v4 @theme tokens (placeholder values)
├── astro.config.mjs                 ← site URL, integrations
├── .env.example                     ← WEBFLOW_API_TOKEN, WEBFLOW_SITE_ID
├── .gitignore                       ← exports/webflow/raw/ excluded; sanitized OK to commit
└── package.json
```

---

## 3. Content Collection Schemas

### 3a. `blog` — `src/content/blog/*.{md,mdx}`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | H1 and default page title |
| `description` | string | ✅ | Primary `meta` description; default for social copy unless `ogDescription` is set |
| `pubDate` | date (coerced) | ✅ | ISO or YYYY-MM-DD |
| `updatedDate` | date (coerced) | ❌ | Optional “last updated” (e.g. future `dateModified`) |
| `author` | string | ❌ | Default: `"Oursky Team"` |
| `categories` | string[] | ✅* | *Or legacy `category` (one slug) — at least one slug; each must match `src/content/categories/<slug>.json` |
| `tags` | string[] | ❌ | Default: `[]`; if empty, listing chips use `categories` |
| `displayCategory` | string | ❌ | Card byline; omit to derive from category data |
| `featured` | number | ❌ | Home blog strip: lower = earlier; not required |
| `image` | string | ❌ | Hero; default share image if `ogImage` omitted |
| `imageAlt` | string | ❌ | Alt text for hero image |
| `excerpt` | string | ❌ | Short blurb on `/blog` and home cards |
| `ogTitle` | string | ❌ | Open Graph + Twitter title only (not the document `title`) |
| `ogDescription` | string | ❌ | Open Graph + Twitter description only |
| `ogImage` | string | ❌ | Open Graph + Twitter image; hero still uses `image` when set |
| `canonicalUrl` | string | ❌ | Absolute URL or path starting with `/` for `rel=canonical` |
| `twitterCard` | `summary` \| `summary_large_image` | ❌ | Default in layout: `summary_large_image` |
| `draft` | boolean | ❌ | Default: `false`; drafts excluded from builds |
| `webflowId` | string | ❌ | Optional; legacy only — not read at build time |

**URL pattern:** `/blogs/[entry.id]`  
**Webflow equivalent:** `/blogs/<slug>` ✅ (exact match — no redirects)

### 3b. `works` — `src/content/works/*.{md,mdx}`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Case study title |
| `description` | string | ✅ | Short summary / meta desc |
| `client` | string | ✅ | Client name |
| `industry` | string | ✅ | Industry label |
| `services` | string[] | ❌ | Default: `[]` |
| `heroImage` | string | ❌ | Hero / OG image URL |
| `heroImageAlt` | string | ❌ | Hero alt text |
| `thumbnail` | string | ❌ | Grid card thumbnail (falls back to heroImage) |
| `order` | number (int) | ❌ | Display order, ascending. Default: `99` |
| `testimonial.quote` | string | ❌ | Testimonial body |
| `testimonial.author` | string | ❌ | Attribution name |
| `testimonial.role` | string | ❌ | Attribution role |
| `draft` | boolean | ❌ | Default: `false` |
| `webflowId` | string | ❌ | Webflow CMS item ID |

**URL pattern:** `/works/[entry.id]`  
**Webflow equivalent:** `/works/<slug>` ✅ (matches — no redirects needed for works detail pages)

### 3c. `categories` — `src/content/categories/*.json`

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | Display name |
| `slug` | string | ✅ | URL slug (should match filename stem) |
| `description` | string | ❌ | Category description |
| `webflowId` | string | ❌ | Webflow CMS item ID |

**URL pattern:** `/blog-category/[cat.data.slug]`  
**Webflow equivalent:** `/blog-category/<slug>` ✅ (exact match — no redirects)

---

## 4. Webflow Extraction — What Was Extracted

All exports saved to `exports/webflow/`.

| File | Contents |
|---|---|
| `site-metadata.json` | Site ID `6544a001d4acba67aa28f5f5`, domains, last published date |
| `pages-metadata.json` | 17 pages with slugs, SEO titles, meta descriptions, collection IDs |
| `categories.json` | 13 blog categories with Webflow IDs and slugs |
| `works-metadata.json` | 8 Works items: slugs, descriptions, image CDN URLs, display order |
| `blogs-metadata.json` | 138 blog posts: slugs, names, authors, categories, thumbnails, published dates |

**Blog post body content** was not persisted to disk (138 × rich HTML would be ~1.3 MB).  
For Phase 1B, use `data_cms_tool → list_collection_items` again with `include` body for each batch.

---

## 5. URL Convention & SEO Continuity

| Page | Webflow URL | New URL | Action |
|---|---|---|---|
| Home | `/` | `/` | ✅ Match |
| About | `/about` | `/about` | ✅ Match |
| Services | `/services` | `/services` | ✅ Match |
| Works listing | `/works` | `/works` | ✅ Match |
| Works detail | `/works/<slug>` | `/works/<slug>` | ✅ Match |
| Products | `/products` | `/products` (Phase 1B) | ✅ Match |
| Contact | `/contact` | `/contact` (Phase 1B) | ✅ Match |
| Blog listing | `/blog` | `/blog` | ✅ Match |
| Blog post | `/blogs/<slug>` | `/blogs/<slug>` | ✅ Match |
| Blog category | `/blog-category/<slug>` | `/blog-category/<slug>` | ✅ Match |
| Open Source | `/open-source` | `/open-source` (Phase 1B) | ✅ Match |
| Service sub-pages | `/service/software-development` etc. | TBD | Phase 1B |

All URLs match Webflow exactly — **no redirects needed**.

---

## 6. Build Verification

```bash
cd oursky-web
npm run build     # 25 pages built, sitemap generated
```

**Pages built (25 total):**
- `/` — Home placeholder
- `/blog/` — Blog listing (shows 1 live post — hello-world seed)
- `/blogs/hello-world/` — Seed post
- `/blog-category/[authgear|case-study|code|culture|development|engineering|formx|machine-learning-and-ai|product-growth|product-management|project-management|qa|ui-design]/` — 13 category pages
- `/works/` — Works listing
- `/works/[cornerstone|hl-insurance|jamn-player|lavatools-carbon-lite|mtr-mobile|palace|swrm-greenswrm|wilson-parking]/` — 8 works detail pages
- `sitemap-index.xml` — Auto-generated by `@astrojs/sitemap`

**Blog stubs** (10 posts with `draft: true` — not built yet, waiting for body content in Phase 4):  
Located in `src/content/blog/<slug>.mdx` — real Webflow slugs, real metadata, placeholder body.

---

## 7. Phase 1B — What Was Done

### Commands Run

```bash
# Created conversion scripts
mkdir scripts
# wrote scripts/generate-works-stubs.mjs
# wrote scripts/generate-blog-stubs.mjs

# Generated all 8 works stubs from exports/webflow/works-metadata.json
node scripts/generate-works-stubs.mjs
# → wrote src/content/works/{cornerstone,hl-insurance,jamn-player,
#     lavatools-carbon-lite,mtr-mobile,palace,swrm-greenswrm,wilson-parking}.mdx
# → deleted src/content/works/placeholder (legacy stub)

# Generated 10 representative blog stubs (draft: true) for schema validation
node scripts/generate-blog-stubs.mjs --limit=10

# Build passed: 25 pages built in 2.54s
npm run build
```

### Phase 1 Complete Checklist

- [x] Astro 6 project scaffolded with Tailwind v4, MDX, React, sitemap
- [x] `src/content.config.ts` — schemas for `blog`, `works`, `categories`
- [x] `src/content/categories/*.json` — all 13 categories imported from Webflow
- [x] `src/content/works/*.md` — all 8 works stubs with real metadata and CDN image URLs
- [x] `src/content/blog/hello-world.mdx` — live seed post
- [x] `src/content/blog/<slug>.mdx` × 10 — draft stubs validating schema (metadata only)
- [x] `exports/webflow/` — all 5 export files committed (no API tokens in sanitized exports)
- [x] `scripts/generate-works-stubs.mjs` — idempotent generator for works MDX
- [x] `scripts/generate-blog-stubs.mjs` — batch generator for blog MDX (supports `--limit`, `--force`, `--dry-run`)
- [x] `package.json` scripts: `generate:works`, `generate:blog-stubs`, `generate:blog-stubs:all`
- [x] `.gitignore` — secrets (.env), build output, OS files covered
- [x] `npm run build` — ✅ 25 pages, 0 errors

### What Remains for Phase 4 (Content Migration)

- [ ] **Blog bodies**: Re-fetch 138 post bodies via Webflow Data API → `data_cms_tool` (paginated). Convert HTML → MDX. Run `generate:blog-stubs:all --force` then fill in body content and set `draft: false`.
- [ ] **Works bodies**: Re-fetch 8 works rich descriptions via `data_cms_tool`. Replace placeholder body in each `src/content/works/*.md`.
- [ ] **Category mapping cleanup**: Some blog posts from Webflow had `category` values not in the 13 canonical slugs. Audit by searching `category: "development"` (used as fallback) after full import.
- [ ] **Images**: Download CDN images from `thumbnail`/`heroImage` fields to `public/images/` and rewrite URLs from absolute CDN to relative `/images/…`.
- [ ] **Author field**: Many blog posts have `author: ""` (empty in Webflow export) — audit and fill in.

## 8. Phase 2 Recommended Next Steps

1. **Extract design tokens** (requires Webflow Designer open in browser)  
   - `style_tool → get_styles` → update `src/styles/global.css` `@theme` block with real brand colors/fonts

2. **Build layout shell**  
   - `src/components/layout/Header.astro`  
   - `src/components/layout/Footer.astro`  
   - Wire into `BaseLayout.astro`

3. **Rebuild remaining pages** (use Webflow MCP `pages_tool → get_page_content` + `element_snapshot_tool` for reference)  
   - Home, About, Services, Works listing, Products, Contact, Open Source

4. **Set up redirects** (no redirects needed — all URLs match Webflow exactly per Section 5)

5. **Deploy to Vercel / Cloudflare Pages**  
   ```bash
   npm run build && vercel deploy --prod
   ```

---

## 9. Webflow Site Reference

| Property | Value |
|---|---|
| Site ID | `6544a001d4acba67aa28f5f5` |
| Works collection ID | `654ba60d6d88c15f2b6e94e3` |
| Blogs collection ID | `654c9b978627503eaa19e2fd` |
| Blog Categories collection ID | `66e14c181ca7ef2021f1efca` |
| Primary locale | English (`654ba60def05336c1f0eb137`) |
| Last published | 2026-04-08 |
