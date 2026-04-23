#!/usr/bin/env node
/**
 * Imports blog posts, categories, and works from JSON dumps produced by Webflow MCP
 * (data_cms_tool list_collection_items). Run from repo root:
 *
 *   node scripts/import-webflow-mcp-dumps.mjs
 *
 * Reads:
 *   - exports/webflow/mcp-blogs-page1.json, mcp-blogs-page2.json  ({ result: { items } })
 *   - exports/webflow/mcp-categories.json  (optional; { result: { items } })
 *   - exports/webflow/works-html/<slug>.html  (raw Rich Text HTML from CMS)
 *   - exports/webflow/works-metadata.json  (for ordering / verification)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CATEGORY_ID_TO_SLUG = {
  '66e30461d41728ea83cc8655': 'authgear',
  '66e31d0b42c2789ea5940762': 'case-study',
  '66e341281744da707fec649f': 'code',
  '66e3102169c81d6f245e10dd': 'culture',
  '66e14c484e10f26052cc961d': 'development',
  '66e14c8253d2161c8be72908': 'engineering',
  '66e34053edd40593fb6daf6e': 'formx',
  '66e150f2443adb3788fa9772': 'machine-learning-and-ai',
  '66e30edc677eec696d6b7e59': 'product-growth',
  '66e15e2e1375b4a0e70b85ea': 'product-management',
  '67994c57005556a1b384b8c2': 'project-management',
  '66e14c5475541121d679c3b1': 'qa',
  '66e14c4f6f1337844e464c70': 'ui-design',
};

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
turndown.addRule('removeEmptyP', {
  filter: (node) => node.nodeName === 'P' && (node.textContent || '').trim() === '' && !node.querySelector('img'),
  replacement: () => '',
});

function yamlStr(value) {
  if (value == null) return '""';
  const escaped = String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
  return `"${escaped}"`;
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function pickCategorySlug(fieldData) {
  const ref = fieldData['category-tags-2'];
  if (Array.isArray(ref) && ref.length > 0) {
    for (const id of ref) {
      const s = CATEGORY_ID_TO_SLUG[id];
      if (s) return s;
    }
  }
  return 'engineering';
}

function htmlToMd(html) {
  if (!html || typeof html !== 'string') return '_Content not available._\n';
  return turndown.turndown(html).replace(/\n{3,}/g, '\n\n');
}

// ─── Categories ─────────────────────────────────────────────────────────────
const catPath = path.join(ROOT, 'exports/webflow/mcp-categories.json');
const blogDir = path.join(ROOT, 'src/content/categories');
if (fs.existsSync(catPath)) {
  const { result } = readJson(catPath);
  for (const it of result.items) {
    const { name, slug } = it.fieldData;
    const out = { slug, name, webflowId: it.id };
    const file = path.join(blogDir, `${slug}.json`);
    fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n', 'utf8');
  }
  console.log(`Wrote ${result.items.length} category JSON files.`);
} else {
  console.log('Skip categories (mcp-categories.json missing).');
}

// ─── Blog posts (138) ─────────────────────────────────────────────────────
const p1 = path.join(ROOT, 'exports/webflow/mcp-blogs-page1.json');
const p2 = path.join(ROOT, 'exports/webflow/mcp-blogs-page2.json');
if (!fs.existsSync(p1) || !fs.existsSync(p2)) {
  console.error('Missing mcp-blogs-page1.json or mcp-blogs-page2.json');
  process.exit(1);
}
const j1 = readJson(p1);
const j2 = readJson(p2);
const allPosts = [...j1.result.items, ...j2.result.items];
const outBlog = path.join(ROOT, 'src/content/blog');
let nBlog = 0;
// Remove local seed post (not in Webflow CMS) before writing migrated posts
const seed = path.join(outBlog, 'hello-world.md');
if (fs.existsSync(seed)) {
  fs.unlinkSync(seed);
  console.log('Removed local seed: hello-world.md');
}
for (const it of allPosts) {
  const fd = it.fieldData;
  const slug = fd.slug;
  if (!slug) continue;
  const bodyHtml = fd['blog-content'] || '';
  const md = htmlToMd(bodyHtml);
  const category = pickCategorySlug(fd);
  const desc = (fd['meta-description'] || '').trim() || fd.name;
  const pub = it.lastPublished ? it.lastPublished.split('T')[0] : '2024-01-01';
  const author = (fd.author || 'Oursky Team').trim() || 'Oursky Team';
  const thumb = fd.thumbnail;
  const image = thumb && typeof thumb === 'object' && thumb.url ? thumb.url : undefined;
  const imageAlt = thumb && thumb.alt ? thumb.alt : undefined;
  const lines = [
    '---',
    `title: ${yamlStr(fd.name || slug)}`,
    `description: ${yamlStr(desc)}`,
    `pubDate: ${pub}`,
    `author: ${yamlStr(author)}`,
    `category: ${yamlStr(category)}`,
  ];
  if (image) lines.push(`image: ${yamlStr(image)}`);
  if (imageAlt) lines.push(`imageAlt: ${yamlStr(imageAlt)}`);
  lines.push(`draft: ${it.isDraft ? 'true' : 'false'}`);
  lines.push(`webflowId: ${yamlStr(it.id)}`);
  lines.push('---', '', md, '');
  fs.writeFileSync(path.join(outBlog, `${slug}.md`), lines.join('\n'), 'utf8');
  nBlog++;
}
console.log(`Wrote ${nBlog} blog markdown files.`);

// ─── Works (8) from works-html + metadata ─────────────────────────────────
const worksHtmlDir = path.join(ROOT, 'exports/webflow/works-html');
const worksMeta = path.join(ROOT, 'exports/webflow/works-metadata.json');
const outWorks = path.join(ROOT, 'src/content/works');
if (fs.existsSync(worksMeta) && fs.existsSync(worksHtmlDir)) {
  const { works } = readJson(worksMeta);
  let nWorks = 0;
  for (const w of works) {
    const htmlPath = path.join(worksHtmlDir, `${w.slug}.html`);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`Missing works HTML: ${w.slug}.html — skip.`);
      continue;
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    const bodyMd = htmlToMd(html);
    const name = w.name;
    const description = (w.description || '').replace(/\n/g, ' ').trim();
    const order = w.order ?? 99;
    const lines = [
      '---',
      `title: ${yamlStr(name)}`,
      `description: ${yamlStr(description)}`,
      `client: ${yamlStr(name)}`,
      `industry: "Technology"`,
      `order: ${order}`,
    ];
    if (w.heroImage) lines.push(`heroImage: ${yamlStr(w.heroImage)}`);
    if (w.thumbnail) lines.push(`thumbnail: ${yamlStr(w.thumbnail)}`);
    lines.push(`draft: false`);
    lines.push(`webflowId: ${yamlStr(w.id)}`);
    lines.push('---', '', bodyMd, '');
    fs.writeFileSync(path.join(outWorks, `${w.slug}.mdx`), lines.join('\n'), 'utf8');
    nWorks++;
  }
  console.log(`Wrote ${nWorks} works MDX files.`);
} else {
  console.log('Skip works (works-html/ or works-metadata.json missing).');
}

console.log('Done.');
