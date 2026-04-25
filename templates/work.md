---
# Work / case study — copy to `src/content/works/<slug>.md`
# Body: GitHub-flavored Markdown. Build schema: `src/content.config.ts` (collection `works`).
# URL: /works/<slug>

# Required
title: "Project name (H1 and default document title)"
description: "Primary SEO description (meta description; also default for Open Graph if no override)"
client: "Client name"
industry: "Industry (e.g. E-commerce, Logistics, Healthcare)"
draft: true

# Optional — services (string[]; populates the services chip row on the work page)
# services:
#   - "Mobile Development"
#   - "UX Design"

# Optional — media
# heroImage: "/images/works/hero.jpg"
# heroImageAlt: "Hero image description"
# thumbnail: "/images/works/thumb.png"   # used on the /works listing card

# Optional — listing layout
# order: 1            # lower numbers come first on /works (default 99)
# bgColor: "#512f60"  # card background on the listing grid (hex)

# Optional — testimonial block (rendered above the body when present)
# testimonial:
#   quote: "Working with Oursky helped us launch faster than planned."
#   author: "Jane Smith"
#   role: "VP Engineering, Acme Co"   # optional

# Optional — legacy (not used by the site build; safe to keep for records)
# webflowId: "…"
---

Body: introduce the client, the problem, what we built, and the outcome. Use `## Section heading`, `**bold**`, lists, screenshots (`![alt](/images/works/<slug>/screenshot.png)`), and pull quotes. For rich embeds (charts, video), rename the file to `.mdx` and import components.
