import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// ─── Blog Posts ───────────────────────────────────────────────────────────────
// Maps to src/content/blog/*.mdx
// URL pattern: /blog/[slug]
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Oursky Team'),
    /** Must match a slug in src/content/categories/*.json */
    category: z.string(),
    /** Optional additional tags for filtering */
    tags: z.array(z.string()).default([]),
    /** Hero / OG image path (relative to /public or absolute CDN URL) */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Controls whether post appears in listings */
    draft: z.boolean().default(false),
    /** Webflow CMS item ID – kept for traceability during migration */
    webflowId: z.string().optional(),
  }),
});

// ─── Works / Case Studies ─────────────────────────────────────────────────────
// Maps to src/content/works/*.mdx
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
// URL pattern: /blog/category/[slug]
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
