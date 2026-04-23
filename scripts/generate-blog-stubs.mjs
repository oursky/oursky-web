#!/usr/bin/env node
/**
 * generate-blog-stubs.mjs
 *
 * Converts exports/webflow/blogs-metadata.json → src/content/blog/<slug>.md
 *
 * Each generated file has:
 *  - Full frontmatter from the Webflow export (metadata only — no body content)
 *  - A placeholder body
 *  - draft: true  (set to false when body content is added in Phase 4)
 *
 * Category mapping:
 *  Blog posts reference categories by Webflow ID in `categoryTags`.
 *  This script maps those IDs to slugs via exports/webflow/categories.json.
 *  Posts with no matching category default to "development".
 *
 * Usage:
 *   node scripts/generate-blog-stubs.mjs               # generate all 138 stubs
 *   node scripts/generate-blog-stubs.mjs --limit=5     # generate first N posts
 *   node scripts/generate-blog-stubs.mjs --dry-run     # print to stdout, no writes
 *   node scripts/generate-blog-stubs.mjs --force       # overwrite existing files
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity;

const blogsMetaPath = path.join(ROOT, 'exports/webflow/blogs-metadata.json');
const categoriesMetaPath = path.join(ROOT, 'exports/webflow/categories.json');
const outDir = path.join(ROOT, 'src/content/blog');

const { posts } = JSON.parse(fs.readFileSync(blogsMetaPath, 'utf8'));
const { categories } = JSON.parse(fs.readFileSync(categoriesMetaPath, 'utf8'));

// Build ID → slug lookup table
const categoryById = Object.fromEntries(categories.map((c) => [c.id, c.slug]));

let written = 0;
let skipped = 0;
let processed = 0;

for (const post of posts) {
  if (processed >= LIMIT) break;

  const outFile = path.join(outDir, `${post.slug}.md`);

  if (fs.existsSync(outFile) && !FORCE) {
    console.log(`skip  ${post.slug}.md  (already exists; use --force to overwrite)`);
    skipped++;
    continue;
  }

  // Resolve category slug from Webflow tag IDs (use first match)
  const categorySlug =
    (post.categoryTags ?? []).map((id) => categoryById[id]).find(Boolean) ?? 'development';

  // Sanitize pubDate
  const pubDate = post.lastPublished
    ? new Date(post.lastPublished).toISOString().split('T')[0]
    : '2024-01-01';

  const lines = [
    `---`,
    `title: ${yamlStr(post.name)}`,
    `description: ${yamlStr(post.metaDescription || '')}`,
    `pubDate: ${pubDate}`,
    `author: ${yamlStr(post.author || 'Oursky Team')}`,
    `category: ${yamlStr(categorySlug)}`,
  ];

  if (post.thumbnail) lines.push(`image: ${yamlStr(post.thumbnail)}`);

  lines.push(
    `draft: true`,
    `webflowId: ${yamlStr(post.id)}`,
    `---`,
    ``,
    `<!-- TODO Phase 4: fetch and convert body content from Webflow CMS -->`,
    ``,
    `Body content will be imported from Webflow CMS in Phase 4.`,
    ``,
  );

  const content = lines.join('\n');

  if (DRY_RUN) {
    console.log(`\n--- ${post.slug}.md ---\n${content}`);
  } else {
    fs.writeFileSync(outFile, content, 'utf8');
    console.log(`write ${post.slug}.md`);
    written++;
  }
  processed++;
}

console.log(`\nDone. written=${written} skipped=${skipped} total_processed=${processed}`);

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Wrap a string in double-quotes, escaping any internal double-quotes. */
function yamlStr(value) {
  if (!value) return '""';
  const escaped = String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
  return `"${escaped}"`;
}
