---
# Blog post — copy to `src/content/blog/<slug>.md`
# Body: GitHub-flavored Markdown. Build schema: `src/content.config.ts` (collection `blog`).

# Required
title: "Post title (H1 and default document title)"
description: "Primary SEO description (meta description, ~160 chars; also default for Open Graph if ogDescription is omitted)"
pubDate: 2026-04-23
# At least one category: use `categories` (preferred) or legacy single `category` (same slug as `src/content/categories/<slug>.json`)
categories:
  - "engineering"
draft: true
# author: "Oursky Team"   # optional; default is Oursky Team

# Optional — dates
# updatedDate: 2026-04-23

# Optional — taxonomy & listing
# tags: []                 # extra filter labels; if empty, listing pills use `categories`
# displayCategory: "…"     # byline on cards when you want custom text (else derived from category JSON)
# featured: 1              # home blog strip: lower numbers first; fill with latest if fewer than 6 featured
# (Set draft: false when ready to publish; omit or false to list on /blog and home)

# Optional — media
# image: "/images/blogs/hero.jpg"
# imageAlt: "Hero image description"

# Optional — short blurb for /blog and home cards (title + image still always show)
# excerpt: "One or two lines for card previews. `description` remains the main SEO text unless you add og* overrides below."

# Optional — social / share overrides (Open Graph + Twitter; the document title and meta description stay from `title` and `description` unless you use these for share tags only)
# ogTitle: "Shorter share title"           # only og:title + twitter:title (prefixed with "Oursky - " like the main title)
# ogDescription: "Different blurb for link previews"   # only og:description + twitter:description
# ogImage: "/images/blogs/og-only.jpg"   # share image; hero still uses `image` when set
# canonicalUrl: "/blogs/your-slug"         # or full https URL; default is the live post URL
# twitterCard: "summary_large_image"     # or "summary"

# Optional — legacy (not used by the site build; safe to keep for records)
# webflowId: "…"
---

Body: use `**bold**`, lists, `[links](url)`, fenced code blocks. For rich embeds, add short HTML in Markdown or use `.mdx` for that file only if needed.
