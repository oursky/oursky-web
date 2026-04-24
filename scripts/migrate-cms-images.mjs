#!/usr/bin/env node
/**
 * Downloads Webflow CDN assets (cdn.prod.website-files.com, uploads-ssl.webflow.com) into
 * public/images/blogs/ or public/images/works/ based on which file references
 * the URL, and rewrites source to /images/blogs/... or /images/works/...
 *
 *   node scripts/migrate-cms-images.mjs           # download + rewrite
 *   node scripts/migrate-cms-images.mjs --dry-run # list URLs only
 *   node scripts/migrate-cms-images.mjs --force   # re-download even if file exists
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const URL_PATTERNS = [
  /https:\/\/cdn\.prod\.website-files\.com\/[^\s"'<>\]\\]+(?:\?[^\s"'<>\]\\]*)?/g,
  /https:\/\/uploads-ssl\.webflow\.com\/[^\s"'<>\]\\]+(?:\?[^\s"'<>\]\\]*)?/g,
];

function isWebflowAssetHost(hostname) {
  return (
    hostname === 'uploads-ssl.webflow.com' ||
    hostname === 'cdn.prod.website-files.com' ||
    hostname.endsWith('website-files.com')
  );
}

const DIRS_TO_SCAN = [path.join(ROOT, 'src')];
const GLOB_EXTS = new Set(['.md', '.mdx', '.astro', '.ts', '.tsx', '.js', '.jsx', '.css', '.html']);

const BLOG_ROOT = path.join(ROOT, 'public/images/blogs');
const WORKS_ROOT = path.join(ROOT, 'public/images/works');

const WEB_BLOGS = '/images/blogs';
const WEB_WORKS = '/images/works';

function kindForSourceFile(absoluteFile) {
  const norm = path.relative(ROOT, absoluteFile).split(path.sep).join('/');
  if (norm.startsWith('src/content/works/')) return 'works';
  if (norm.startsWith('src/content/blog/')) return 'blogs';
  return 'blogs';
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkFiles(p, out);
    else if (GLOB_EXTS.has(path.extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

function extractUrls(text) {
  const s = new Set();
  for (const re of URL_PATTERNS) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) s.add(m[0]);
  }
  return s;
}

function fileNameForUrl(u) {
  try {
    const { pathname, hostname } = new URL(u);
    if (!isWebflowAssetHost(hostname)) return null;
    const last = path.posix.basename(pathname);
    const dec = decodeURIComponent(last);
    const base = dec.replace(/[/\\*<>:"|?]/g, '_').replace(/\s+/g, ' ').trim() || 'image';
    const h = crypto.createHash('sha256').update(u).digest('hex').slice(0, 10);
    const ext = path.extname(base) || '.bin';
    const stem = path.basename(base, ext) || 'asset';
    const maxStem = 120;
    const shortStem = stem.length > maxStem ? stem.slice(0, maxStem) : stem;
    return `${h}_${shortStem}${ext}`;
  } catch {
    return null;
  }
}

const physicalRoot = (k) => (k === 'works' ? WORKS_ROOT : BLOG_ROOT);
const webPrefix = (k) => (k === 'works' ? WEB_WORKS : WEB_BLOGS);

/**
 * @param {string} destKind 'blogs' | 'works'
 */
function destPaths(destKind, destFileName) {
  return {
    abs: path.join(physicalRoot(destKind), destFileName),
    web: `${webPrefix(destKind)}/${destFileName}`,
  };
}

async function downloadTo(url, destFilePath) {
  if (fs.existsSync(destFilePath) && !FORCE) {
    return 'skipped';
  }
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  const buf = Buffer.from(ab);
  fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
  fs.writeFileSync(destFilePath, buf);
  return 'fetched';
}

function collectByFile() {
  const allFiles = [];
  for (const d of DIRS_TO_SCAN) allFiles.push(...walkFiles(d));
  const byFile = new Map();
  for (const f of allFiles) {
    const text = fs.readFileSync(f, 'utf8');
    const u = extractUrls(text);
    if (u.size) {
      byFile.set(f, [...u]);
    }
  }
  return { byFile };
}

/**
 * @returns {Map<string, { needBlog: boolean, needWorks: boolean, fileName: string }>}
 */
function buildNeeds(byFile) {
  const m = new Map();
  for (const [f, urls] of byFile) {
    const kb = kindForSourceFile(f) === 'blogs';
    const kw = kindForSourceFile(f) === 'works';
    for (const u of urls) {
      if (!m.has(u)) m.set(u, { needBlog: false, needWorks: false, fileName: fileNameForUrl(u) });
      const e = m.get(u);
      if (kb) e.needBlog = true;
      if (kw) e.needWorks = true;
    }
  }
  return m;
}

async function main() {
  const { byFile } = collectByFile();
  if (!byFile.size) {
    console.log('No Webflow CDN URLs in scanned files.');
    return;
  }
  const all = new Set();
  for (const urls of byFile.values()) urls.forEach((u) => all.add(u));
  console.log(
    `Scanned src: ${byFile.size} file(s) with URL(s), ${all.size} unique CDN URL(s).`,
  );

  if (DRY) {
    for (const u of [...all].sort()) console.log(u);
    return;
  }

  const needs = buildNeeds(byFile);
  fs.mkdirSync(BLOG_ROOT, { recursive: true });
  fs.mkdirSync(WORKS_ROOT, { recursive: true });

  const errors = [];
  let nOk = 0;
  for (const [u, n] of needs) {
    if (!n.fileName) {
      errors.push([u, 'parse']);
      continue;
    }
    if (!n.needBlog && !n.needWorks) continue;
    try {
      if (n.needBlog) {
        const { abs, web } = destPaths('blogs', n.fileName);
        const r = await downloadTo(u, abs);
        nOk++;
        if (r === 'fetched') console.log('  blogs ', web);
        else if (r === 'skipped') console.log('  blogs  (exists)', web);
      }
      if (n.needWorks) {
        const { abs, web } = destPaths('works', n.fileName);
        const r = await downloadTo(u, abs);
        nOk++;
        if (r === 'fetched') console.log('  works ', web);
        else if (r === 'skipped') console.log('  works  (exists)', web);
      }
    } catch (e) {
      errors.push([u, e.message || String(e)]);
    }
  }

  const sorted = [...all].sort((a, b) => b.length - a.length);
  let rewritten = 0;
  for (const f of byFile.keys()) {
    const orig = fs.readFileSync(f, 'utf8');
    let text = orig;
    const kind = kindForSourceFile(f) === 'works' ? 'works' : 'blogs';
    for (const u of sorted) {
      if (!text.includes(u)) continue;
      const n = needs.get(u);
      if (!n?.fileName) continue;
      const { web } = destPaths(kind, n.fileName);
      if (kind === 'blogs' && !n.needBlog) continue;
      if (kind === 'works' && !n.needWorks) continue;
      text = text.split(u).join(web);
    }
    if (text !== orig) {
      fs.writeFileSync(f, text, 'utf8');
      rewritten++;
    }
  }

  console.log(`\nDownloaded/skipped ${nOk} file placement(s). Rewrote ${rewritten} source file(s).`);
  if (errors.length) {
    console.log('\nFailed:');
    for (const [u, err] of errors) console.log(' ', err, (u).slice(0, 100));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
