#!/usr/bin/env node
/**
 * Moves public/images/webflow-assets/ into public/images/blogs/ and
 * public/images/works/ based on which content references each file, then
 * rewrites /images/webflow-assets/ in src content to the right prefix.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const BLOG_DIR = path.join(ROOT, 'public/images/blogs');
const WORKS_DIR = path.join(ROOT, 'public/images/works');
const LEGACY = path.join(ROOT, 'public/images/webflow-assets');

function walkTextFiles(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory() && !name.name.startsWith('.')) walkTextFiles(p, out);
    else if (name.isFile() && /\.(md|mdx|astro|ts|tsx|js|jsx|css|html)$/i.test(name.name)) out.push(p);
  }
  return out;
}

/**
 * Match exact basenames (filenames may contain `)` and spaces, e.g. `image (1).png`).
 */
function scanRefs(onDisk, allSrc) {
  const byBasename = new Map();
  for (const b of onDisk) {
    const needle = `/images/webflow-assets/${b}`;
    for (const fp of allSrc) {
      const t = fs.readFileSync(fp, 'utf8');
      if (!t.includes(needle)) continue;
      const isBlog = fp.replace(/\\/g, '/').includes('/content/blog/');
      const isWorks = fp.replace(/\\/g, '/').includes('/content/works/');
      const cur = byBasename.get(b) || { blog: false, works: false };
      byBasename.set(b, {
        blog: cur.blog || isBlog,
        works: cur.works || isWorks,
      });
    }
  }
  return byBasename;
}

function main() {
  if (!fs.existsSync(LEGACY)) {
    console.log('No public/images/webflow-assets/ — nothing to do.');
    return;
  }
  const onDisk = fs.readdirSync(LEGACY);
  const allSrc = walkTextFiles(path.join(ROOT, 'src'));
  const byBasename = scanRefs(onDisk, allSrc);
  let moved = 0;

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.mkdirSync(WORKS_DIR, { recursive: true });

  for (const b of onDisk) {
    const from = path.join(LEGACY, b);
    if (!fs.statSync(from).isFile()) continue;
    const o = byBasename.get(b) || { blog: false, works: false };
    if (!o.blog && !o.works) {
      console.warn('Orphan (no ref in src), left in place:', b);
      continue;
    }
    const toB = path.join(BLOG_DIR, b);
    const toW = path.join(WORKS_DIR, b);
    if (o.blog && o.works) {
      fs.copyFileSync(from, toB);
      fs.copyFileSync(from, toW);
      fs.unlinkSync(from);
    } else if (o.blog) {
      fs.renameSync(from, toB);
    } else {
      fs.renameSync(from, toW);
    }
    moved++;
  }

  try {
    if (fs.existsSync(LEGACY) && fs.readdirSync(LEGACY).length === 0) fs.rmdirSync(LEGACY);
  } catch {
    // not empty
  }

  const underBlog = (p) => p.replace(/\\/g, '/').includes('/content/blog/');
  const underWorks = (p) => p.replace(/\\/g, '/').includes('/content/works/');
  const files = walkTextFiles(path.join(ROOT, 'src'));
  let rw = 0;
  for (const f of files) {
    let t = fs.readFileSync(f, 'utf8');
    const orig = t;
    if (t.includes('/images/webflow-assets/')) {
      if (underBlog(f)) t = t.split('/images/webflow-assets/').join('/images/blogs/');
      else if (underWorks(f)) t = t.split('/images/webflow-assets/').join('/images/works/');
    }
    if (t !== orig) {
      fs.writeFileSync(f, t, 'utf8');
      rw++;
    }
  }

  console.log(`Moved or copied ${moved} asset(s) from webflow-assets. Rewrote ${rw} text file(s).`);
}

main();
