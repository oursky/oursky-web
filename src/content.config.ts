import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// ─── Blog Posts ───────────────────────────────────────────────────────────────
// One file per post: src/content/blog/<slug>.md (Markdown; .mdx optional for edge cases)
// New-post template: templates/blog-post.md
// URL pattern: /blogs/<slug>
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Oursky Team'),
      /** @deprecated use `categories` (single slug) — preprocessed to `categories` for migration */
      category: z.string().optional(),
      /**
       * Category slugs; each must have a `src/content/categories/<slug>.json`.
       * All tags from Webflow "Category Tags" multi-ref are included (order preserved).
       */
      categories: z.array(z.string()).optional(),
      /** Optional extra labels for filters (e.g. legacy) — if empty, UI uses `categories` for pills */
      tags: z.array(z.string()).default([]),
      /**
       * Verbatim "Category" plain text from Webflow (case as entered in CMS) for the card byline.
       * Pills use `name` from category JSON. Omit to derive from the first category slug.
       */
      displayCategory: z.string().optional(),
      /** If set, post appears on homepage "Blog" preview at this position (1 = first). Lower values come first. */
      featured: z.number().optional(),
      /** Hero / OG image path (relative to /public or absolute CDN URL) */
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      /**
       * Short blurb for listing cards. When omitted, cards show title and image only.
       * The required `description` is still the primary SEO `meta` description in the head.
       */
      excerpt: z.string().optional(),
      /** If set, overrides `og:title` and `twitter:title` only. Page `title` and the H1 stay the `title` field. */
      ogTitle: z.string().optional(),
      /** If set, overrides `og:description` and `twitter:description` only. `description` still sets the default `meta` description. */
      ogDescription: z.string().optional(),
      /**
       * Share-image URL (path or absolute). When set, used for Open Graph and Twitter; hero image is still `image` when `image` is set.
       * If neither `ogImage` nor `image` is set, the site default OG image is used.
       */
      ogImage: z.string().optional(),
      /**
       * Canonical URL: absolute URL, or path starting with `/` (e.g. `/blogs/slug`). Defaults to the live post URL.
       * Use for syndication or if the post was moved but old URLs should consolidate here.
       */
      canonicalUrl: z.string().optional(),
      /** Twitter / X card type; defaults to `summary_large_image` in BaseLayout */
      twitterCard: z.enum(['summary', 'summary_large_image']).optional(),
      /** Controls whether post appears in listings */
      draft: z.boolean().default(false),
      /** Webflow CMS item ID — optional, legacy; not read at build/runtime */
      webflowId: z.string().optional(),
    })
    .transform((d) => {
      const categories =
        d.categories && d.categories.length > 0
          ? d.categories
          : d.category
            ? [d.category]
            : [];
      const { category: _legacy, ...rest } = d;
      return { ...rest, categories };
    })
    .superRefine((d, ctx) => {
      if (!d.categories || d.categories.length === 0) {
        ctx.addIssue({ code: 'custom', message: 'Blog post needs at least one category (or legacy `category` field)' });
      }
    }),
});

// ─── Works / Case Studies ─────────────────────────────────────────────────────
// Maps to src/content/works/*.{md,mdx}
// New-work template: templates/work.md
// URL pattern: /works/[slug]
const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    industry: z.string(),
    services: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    thumbnail: z.string().optional(),
    /** Controls display order on the Works listing page (lower = first) */
    order: z.number().default(99),
    /** Card background color on the Works listing grid (hex) */
    bgColor: z.string().optional(),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().default(false),
    webflowId: z.string().optional(),
  }),
});

// ─── Blog Categories ──────────────────────────────────────────────────────────
// Maps to src/content/categories/*.json (data collection, no body)
// URL pattern: /blog-category/[slug]
const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    /** URL-safe slug; should match the filename without extension */
    slug: z.string(),
    description: z.string().optional(),
    webflowId: z.string().optional(),
  }),
});

export const collections = { blog, works, categories };
