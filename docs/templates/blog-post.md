---
# Blog post template — copy to src/content/blog/<slug>.md
# Each published post is a standalone .md file (Markdown only; MDX not required).
# Frontmatter schema: src/content.config.ts (collection `blog`)

title: "Post title for H1 and <title>"
description: "SEO / OG description (plain text)"
pubDate: 2026-04-23
# updatedDate: 2026-04-23   # optional
author: "Oursky Team"
# Must match src/content/categories/*.json slug (filename without .json)
category: "engineering"
tags: []
# Hero / OG image — path under public/ or full URL during migration
# image: "/images/blog/example.jpg"
# imageAlt: "Description of hero image"

# draft: false   # omit or set false to list on /blog and home preview
draft: true

# webflowId: "…"   # optional traceability during Webflow migration
---

<!-- Optional: remove after content is migrated -->

Body: GitHub-flavored Markdown (`**bold**`, lists, `[links](url)`, fenced code blocks).

For complex embeds later, prefer short HTML snippets in Markdown or migrate the post to MDX only if needed.
