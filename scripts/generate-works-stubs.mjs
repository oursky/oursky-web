#!/usr/bin/env node
/**
 * generate-works-stubs.mjs
 *
 * Converts exports/webflow/works-metadata.json → src/content/works/<slug>.mdx
 *
 * Each generated file has:
 *  - Full frontmatter from the Webflow export
 *  - A placeholder body (fill in real content during Phase 4)
 *  - draft: false  (works are listed on the site immediately)
 *
 * Usage:
 *   node scripts/generate-works-stubs.mjs
 *   node scripts/generate-works-stubs.mjs --dry-run   (print to stdout, no writes)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const worksMetaPath = path.join(ROOT, 'exports/webflow/works-metadata.json');
const outDir = path.join(ROOT, 'src/content/works');

const { works } = JSON.parse(fs.readFileSync(worksMetaPath, 'utf8'));

let written = 0;
let skipped = 0;

for (const item of works) {
  const outFile = path.join(outDir, `${item.slug}.mdx`);

  if (fs.existsSync(outFile) && !FORCE) {
    console.log(`skip  ${item.slug}.mdx  (already exists; use --force to overwrite)`);
    skipped++;
    continue;
  }

  // Build YAML frontmatter — only include optional fields when values are present
  const lines = [
    `---`,
    `title: ${yamlStr(item.name)}`,
    `description: ${yamlStr(item.description)}`,
    `client: ${yamlStr(item.name)}`,
    `industry: "Technology"`,
    `order: ${item.order ?? 99}`,
  ];

  if (item.heroImage) lines.push(`heroImage: ${yamlStr(item.heroImage)}`);
  if (item.thumbnail) lines.push(`thumbnail: ${yamlStr(item.thumbnail)}`);

  lines.push(
    `draft: false`,
    `webflowId: ${yamlStr(item.id)}`,
    `---`,
    ``,
    `{/* TODO Phase 4: replace this placeholder with full case study content */}`,
    ``,
    `## Overview`,
    ``,
    item.description,
    ``,
  );

  const content = lines.join('\n');

  if (DRY_RUN) {
    console.log(`\n--- ${item.slug}.mdx ---\n${content}`);
  } else {
    fs.writeFileSync(outFile, content, 'utf8');
    console.log(`write ${item.slug}.mdx`);
    written++;
  }
}

console.log(`\nDone. written=${written} skipped=${skipped}`);

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Wrap a string in double-quotes, escaping any internal double-quotes. */
function yamlStr(value) {
  if (!value) return '""';
  const escaped = String(value).replace(/"/g, '\\"');
  return `"${escaped}"`;
}
