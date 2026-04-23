# Phase 4 Handoff — Content Migration (Webflow CMS → Git)

**Date:** 2026-04-24  
**Status:** Content migrated — **170** static pages build successfully

---

## What Was Migrated

| Source (Webflow CMS) | Target | Count |
| --- | --- | --- |
| **Blogs** collection (`blog-content` Rich Text, + metadata) | `src/content/blog/<slug>.md` | 138 |
| **Blog categories** | `src/content/categories/<slug>.json` | 13 |
| **Works** (`project-details` Rich Text, + `works-metadata.json` fields) | `src/content/works/<slug>.mdx` | 8 |

- Local seed post `hello-world.md` was **removed** (not present in Webflow).
- Thumbnail / case-study image URLs in frontmatter point at **Webflow / CDN** hosts until optional Phase 4b (download to `public/images/`).

---

## How This Was Done (Webflow MCP)

1. **Tool:** `data_cms_tool` on server `webflow` (MCP), actions:
   - `get_collection_details` — field slugs (e.g. blog `blog-content`, `category-tags-2`; works `project-details`).
   - `list_collection_items` — paginated (100 + 38) for all blog posts; per-slug fetches for works HTML bodies.
2. **Dumps in repo (reproducible re-imports):**
   - `exports/webflow/mcp-blogs-page1.json` — `list-blogs-p1` response (100 items).
   - `exports/webflow/mcp-blogs-page2.json` — next page (38 items).
   - `exports/webflow/mcp-categories.json` — category list (13 items).
3. **Works Rich Text** saved as raw HTML under `exports/webflow/works-html/<slug>.html` (eight files + `cornerstone` from the same CMS body), then converted with the same pipeline as blog bodies.
4. **Import command:** `npm run import:webflow-mcp`  
   - Implementation: `scripts/import-webflow-mcp-dumps.mjs`
   - Uses **`turndown`** to turn Webflow Rich Text HTML into GitHub-flavored Markdown in `.md` / `.mdx` bodies.
5. **Category → post mapping:** `fieldData['category-tags-2']` (MultiReference) first ID maps to a slug via `CATEGORY_ID_TO_SLUG` in the import script (mirrors `exports/webflow/categories.json` / Phase 1 IDs).

---

## Rerun / Update Workflow

1. In Webflow (or via MCP with the same `list_collection_items` + pagination), refresh the JSON files under `exports/webflow/`.
2. Regenerate `works-html/*.html` if case-study copy changes (or re-fetch by slug from MCP).
3. Run: `npm run import:webflow-mcp` then `npm run build`.

---

## Known Gaps and Follow-ups

- **Remote images:** Hero/thumbnail/blog images still use `cdn.prod.website-files.com` / `uploads-ssl.webflow.com` URLs. Optional: script or manual pass to copy into `public/images/blog/` and `public/images/works/` and rewrite frontmatter paths.
- **MD fidelity:** `turndown` does not perfectly match Webflow’s richtext (e.g. some figures, nested styling). Review high-traffic posts and tweak Markdown or use MDX for rare posts if needed.
- **Works as `.mdx`:** Bodies are Markdown from HTML; if MDX ever errors on a `{` character, escape or use a small wrapper—current build passes.
- **SEO / JSON-LD** for articles (structured data) remains a cross-phase follow-up (see `migration-plan.md`).
- **Phase 5:** Deploy, cutover, redirects, Plausible, DNS.

---

## Build Verification

```bash
npm run build
```

**Last verified:** 170 page(s) built, sitemap generated.

---

## Webflow Reference IDs (unchanged)

| Item | ID |
| --- | --- |
| Site | `6544a001d4acba67aa28f5f5` |
| Blogs collection | `654c9b978627503eaa19e2fd` |
| Works collection | `654ba60d6d88c15f2b6e94e3` |
| Blog categories collection | `66e14c181ca7ef2021f1efca` |
