# Oursky.com — Webflow to Self-Host Migration Plan

Migration of [oursky.com](https://www.oursky.com) from Webflow to a self-hosted static site. No external CMS — all content is file-based in the repo, managed by AI agents or developers via git.

---

## Tech Stack Decisions

### Framework: Astro 6 (not Next.js or plain Vite)

Plain Vite + React produces a single-page app, which is poor for SEO. Next.js with `output: 'export'` works but carries unnecessary complexity (App Router, RSC, middleware, revalidation) for a site with no SSR, no CMS API, and no i18n at launch.

**Astro** is the right fit because:

- Built on Vite — fast DX and build times
- Static-first by default — generates clean HTML per page, zero JS unless opted in (islands architecture)
- Native Content Collections with Markdown (and optional MDX where needed) — type-safe, schema-validated, ideal for AI-agent-managed content
- `@astrojs/sitemap` and proper `<head>` meta support out of the box
- React islands available for interactive components (nav mobile menu, contact form) without shipping React to every page

### Styling: Tailwind v4 with custom `@theme` tokens (not utility classes in components)

Design tokens are defined in `src/styles/global.css` under `@theme` and extracted from the live Webflow site. **Section components use `<style>` blocks with `var(--token, fallback)`** rather than Tailwind utility classes — this keeps component CSS readable and avoids coupling component markup to the utility system.

### Content: File-based, no headless CMS

Blog posts (one `.md` file per post), works/case studies, and categories live under `src/content/`. An AI agent adds or edits posts by committing files, triggering a rebuild and deploy. This replaces the Strapi + Next.js pattern used in `authgear-web` with a simpler, no-server approach.

### Webflow migration approach: MCP extraction + reference, not HTML export

**We do not use Webflow's HTML export.** Exported HTML is a classname soup (`w-nav-menu`, `w-inline-block`, etc.) with no design system, requiring a painful hybrid of Webflow CSS + jQuery. Instead:

1. **Design tokens** are extracted from the live Webflow published CSS (via `curl` of the CDN stylesheet) and verified against Webflow Designer MCP (`style_tool`, `variable_tool`). These become `@theme` tokens in `global.css`.
2. **Page structure and content** are extracted via Webflow MCP Data API (`data_pages_tool → get_page_content/get_page_metadata`) to get content nodes, text, image URLs, and SEO fields.
3. **Visual reference** comes from the live Webflow site and Designer MCP `element_snapshot_tool`. The published Webflow CSS (`ref/` in the repo) is also available as a reference for spacing and layout decisions.
4. AI rebuilds each section as clean Astro components using the extracted tokens and content, matching the Webflow design without copying its implementation.


| Webflow MCP Tool        | What it provides                                                 |
| ----------------------- | ---------------------------------------------------------------- |
| `data_sites_tool`       | Site ID, domain list                                             |
| `data_pages_tool`       | Page slugs, SEO fields, content nodes                            |
| `data_cms_tool`         | CMS collections: blog posts, works, categories                   |
| `style_tool`            | CSS properties per Webflow class — used to verify/extract tokens |
| `variable_tool`         | Webflow design variables (colors, typography)                    |
| `element_snapshot_tool` | Visual snapshot of any element (Designer must be open)           |


---

## Project Structure

```
oursky-web/
├── exports/webflow/              # Raw Webflow API exports (committed, no tokens)
│   ├── site-metadata.json
│   ├── pages-metadata.json       # 17 pages with SEO fields
│   ├── categories.json           # 13 blog categories
│   ├── works-metadata.json       # 8 works items
│   └── blogs-metadata.json       # 138 blog post metadata (no bodies)
├── public/
│   ├── fonts/                    # Self-hosted Borna Webfont (5 weights)
│   ├── images/                   # Client logos, testimonial avatars, hero assets
│   ├── videos/                   # Hero background video
│   └── robots.txt
├── src/
│   ├── content.config.ts         # Astro 6 content collection schemas
│   ├── content/
│   │   ├── blog/                 # One .md file per post (AI-agent managed, 138 target); template: docs/templates/blog-post.md
│   │   ├── works/                # MDX case studies (AI-agent managed, 8 items)
│   │   └── categories/           # JSON blog categories (13 items)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, meta/OG/Twitter, canonical, fonts
│   │   ├── BlogLayout.astro      # Blog post layout with SEO
│   │   └── WorkLayout.astro      # Case study layout with hero + testimonial
│   ├── components/
│   │   ├── layout/               # Header.astro, Footer.astro
│   │   ├── home/                 # Homepage section components
│   │   └── ui/                   # Shared atomic components (PillButton, SectionBadge, ContactForm)
│   ├── data/
│   │   └── navigation.ts         # Nav links, footer columns, office locations
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── service/[slug].astro
│   │   ├── products.astro
│   │   ├── contact.astro
│   │   ├── open-source.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── blogs/[...slug].astro  # Matches Webflow URL /blogs/<slug>
│   │   ├── blog-category/
│   │   │   └── [slug].astro       # Matches Webflow URL /blog-category/<slug>
│   │   └── works/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css            # Tailwind v4 @theme tokens + @font-face (Borna)
├── docs/
│   ├── migration-plan.md         # This file
│   ├── phase1-handoff.md
│   ├── phase2-handoff.md
│   ├── phase3-handoff.md
│   └── templates/
│       └── blog-post.md          # Copy-paste template for new `src/content/blog/<slug>.md` posts
├── scripts/
│   ├── generate-blog-stubs.mjs   # Converts Webflow blog export → .md stubs
│   └── generate-works-stubs.mjs  # Converts Webflow works export → MDX stubs
├── .cursor/skills/oursky-webflow-page-rebuild/SKILL.md
├── astro.config.mjs
└── .env.example                  # WEBFLOW_API_TOKEN, PLAUSIBLE_DOMAIN, PUBLIC_SITE_URL
```

### URL parity with Webflow (no redirects needed)


| Page type     | URL                     |
| ------------- | ----------------------- |
| Blog post     | `/blogs/<slug>`         |
| Blog category | `/blog-category/<slug>` |
| Works detail  | `/works/<slug>`         |
| All others    | match Webflow exactly   |


---

## Content Collections and AI Agent Workflow

All dynamic content lives as files in `src/content/`. An AI agent creates or edits files, commits, and pushes — a CI/CD rebuild deploys the change.

### Blog posts — `src/content/blog/<slug>.md`

Each post is a single Markdown file with YAML frontmatter (see `docs/templates/blog-post.md` for a starter). The content collection also accepts `.mdx` if a post needs embedded components. Same general pattern as **formx.ai** (`src/content/blog/*.md` with frontmatter, listings sorted by date).

```yaml
---
title: "Build it right the First Time"
description: "How engineering excellence drives product success"
pubDate: 2026-04-15
author: "Oursky Team"
category: "engineering"   # must match a filename stem in src/content/categories/
image: "/images/blog/build-it-right.jpg"
draft: false
---
```

After the `---` delimiter, the body is standard GitHub-flavored Markdown.

### Works / Case Studies — `src/content/works/*.mdx`

Frontmatter holds structured metadata; MDX body holds rich sections, screenshots, and testimonials.

```yaml
---
title: "ASOS Mobile App"
description: "Helping ASOS deliver a world-class mobile shopping experience"
client: "ASOS"
industry: "E-commerce"
services: ["Mobile Development", "UX Design"]
heroImage: "/images/works/asos-hero.jpg"
testimonial:
  quote: "Oursky has been great to work with..."
  author: "Becky Pate"
  role: "Senior Product Manager, ASOS"
order: 1
draft: false
---
```

### Blog categories — `src/content/categories/*.json`

Categories are stable and rarely change. Stored as a data collection (no MDX body needed).

```json
{
  "name": "Engineering",
  "slug": "engineering",
  "description": "Posts about software engineering practices and culture"
}
```

Schemas are enforced in `src/content.config.ts` — malformed content fails the build rather than silently breaking.

---

## Migration Execution Phases

### Phase 1: Setup and extraction

- Scaffold Astro 6 with Tailwind v4, MDX, React, sitemap
- Extract Webflow site structure, page metadata, and all 3 CMS collections via MCP Data API
- Generate Markdown (`.md`) stubs for all 138 blog posts and MDX stubs for 8 works items; import 13 categories as JSON
- Establish URL conventions (all match Webflow — no redirects needed)

### Phase 2: Design system and layout shell

- Extract brand tokens from published Webflow CSS and verify via Designer MCP; define in `global.css @theme`
- Self-host Borna Webfont (5 weights downloaded from Webflow CDN)
- Build `Header.astro`, `Footer.astro`, `navigation.ts`; wire into `BaseLayout`
- `robots.txt`, analytics env placeholders in `.env.example`

### Phase 3: Page rebuild

- Per page: extract content nodes via `data_pages_tool`, use published Webflow CSS and `element_snapshot_tool` as visual reference, rebuild as clean Astro + CSS-variable components
- 3a: Homepage — `index.astro` + all home sections + shared UI components + reusable page-rebuild skill
- 3b: `/about`, `/services`, `/service/*`, `/products`, `/contact`, `/open-sourcese`

### Phase 4: Full content migration (in progress)

- Re-fetch 138 blog post HTML bodies from Webflow API; convert to **Markdown** (`.md` in `src/content/blog/`); set `draft: false` per post when the body is complete
- New posts: copy `docs/templates/blog-post.md` → `src/content/blog/<slug>.md` and fill frontmatter + body
- Fetch rich body content for 8 works; complete MDX case studies
- Download and migrate all CDN images to `public/images/`
- Audit category mapping; verify all blog post slugs and author fields
- Test AI agent workflow: create/edit a post, verify build + deploy

### Phase 5: Deploy and cutover

- Deploy to Vercel or Cloudflare Pages
- Verify sitemap, `robots.txt`, canonical URLs, OG tags
- Update DNS from Webflow to new host
- Monitor 404s; add redirect rules for any missed URLs
- Add JSON-LD structured data (Organization, WebSite) to `BaseLayout`

---

## Plan Progress


| Phase                          | Status           | Notes                                                                                                       |
| ------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| 1 Setup + extraction           | Done             | `docs/phase1-handoff.md`                                                                                    |
| 2 Design system + layout shell | Done             | `docs/phase2-handoff.md`                                                                                    |
| 3a Homepage rebuild            | Done             | `docs/phase3-handoff.md`                                                                                    |
| 3b Remaining pages             | Done             | 34 pages — see `docs/phase3-handoff.md`                                                                     |
| 4 Full content migration       | Done (see `docs/phase4-handoff.md`) | 138 blog `.md`, 8 works MDX, 13 categories; optional image download + JSON-LD remain |
| 5 Deploy + cutover             | Not started      |                                                                                                             |


**Open items across phases:**

- JSON-LD Organization + WebSite in `BaseLayout.astro` (deferred from Phase 2)
- Satoshi Variable font — one occurrence in Webflow CSS; download from fontshare.com if needed
- Phase 4: all 138 blog HTML bodies, 8 works rich bodies, testimonial avatars, client logos from CDN

**Key reference:**

- Page rebuild skill: `.cursor/skills/oursky-webflow-page-rebuild/SKILL.md`
- Webflow site ID: `6544a001d4acba67aa28f5f5`
- Webflow collection IDs: blogs `654c9b978627503eaa19e2fd`, works `654ba60d6d88c15f2b6e94e3`, categories `66e14c181ca7ef2021f1efca`

