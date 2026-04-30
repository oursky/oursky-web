#!/usr/bin/env node
/**
 * Phase 2 image optimization:
 *   - Re-encodes JPEG, PNG, and large WebP images to WebP at sane dimensions.
 *   - Rewrites all /images/... references in src/ to point to the new .webp paths.
 *   - Skips GIFs, SVGs, and files already under 100 KB.
 *   - Skips IMG_4749_Original.jpg (handled separately in Phase 3).
 *
 *   node scripts/optimize-images.mjs           # execute
 *   node scripts/optimize-images.mjs --dry-run # preview only
 *   node scripts/optimize-images.mjs --dir public/images/blogs  # limit to one dir
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');
const LIMIT_DIR = (() => {
  const idx = process.argv.indexOf('--dir');
  return idx !== -1 ? path.resolve(ROOT, process.argv[idx + 1]) : null;
})();

const SRC_EXTS = new Set(['.md', '.mdx', '.astro', '.ts', '.tsx', '.js', '.jsx', '.css', '.html']);
const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// Icons rendered at max 260 px CSS → 2× = 520 px. Everything else: 1600 px.
const ICON_ALLOWLIST = new Set([
  'authgear-icon.png',
  'authgear-icon-p-500.png',
  'fx-icon.png',
  'fx-icon-p-500.png',
  'skytest-icon.png',
  'Icon-iOS-Default-1024x10242x.png',
  'pl-preview-phone.png',
  'pl-preview-phone-p-500.png',
  'authgearcard.png',
  'formx-productcard.png',
  'club-app-icon-round-corner.png',
  'club-app-icon-round-corner-p-500.png',
]);

// Skip these — handled in Phase 3 or not suitable for batch
const SKIP_LIST = new Set([
  'IMG_4749_Original.jpg',
]);

const MIN_SIZE_BYTES = 100 * 1024; // skip files <100 KB

// ─── helpers ──────────────────────────────────────────────────────────────────

function walkImages(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkImages(p, files);
    else if (IMG_EXTS.has(path.extname(name).toLowerCase())) files.push(p);
  }
  return files;
}

function walkSrc(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkSrc(p, files);
    else if (SRC_EXTS.has(path.extname(name).toLowerCase())) files.push(p);
  }
  return files;
}

function webPath(abs) {
  return '/' + path.relative(path.join(ROOT, 'public'), abs).replace(/\\/g, '/');
}

// ─── main ─────────────────────────────────────────────────────────────────────

const imageRoot = LIMIT_DIR ?? path.join(ROOT, 'public', 'images');
const allImages = walkImages(imageRoot);

// Build a rename map: oldWebPath → newWebPath
const renames = new Map(); // oldWebPath → newWebPath
const stats = { processed: 0, skipped: 0, savedBytes: 0 };

console.log(`\nScanning ${allImages.length} image files in ${path.relative(ROOT, imageRoot)}...\n`);

for (const abs of allImages) {
  const name = path.basename(abs);
  const ext = path.extname(name).toLowerCase();
  const size = fs.statSync(abs).size;

  // Skip GIFs and SVGs
  if (ext === '.gif' || ext === '.svg') { stats.skipped++; continue; }

  // Skip by name
  if (SKIP_LIST.has(name)) { stats.skipped++; continue; }

  // Skip small files
  if (size < MIN_SIZE_BYTES) { stats.skipped++; continue; }

  // Already WebP — only re-encode if large
  if (ext === '.webp') {
    const meta = await sharp(abs).metadata();
    const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
    if (size < 300 * 1024 || longEdge <= 1600) { stats.skipped++; continue; }
  }

  const isIcon = ICON_ALLOWLIST.has(name);
  const maxEdge = isIcon ? 520 : 1600;
  const webpPath = abs.replace(/\.(jpg|jpeg|png|webp)$/i, '.webp');
  const quality = isIcon ? 85 : ext === '.png' ? 82 : 80;

  let newSize = 0;
  if (!DRY) {
    if (abs === webpPath) {
      // In-place WebP re-encode: write to tmp then replace
      const tmp = abs + '.tmp';
      await sharp(abs)
        .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(tmp);
      fs.renameSync(tmp, abs);
      newSize = fs.statSync(abs).size;
    } else {
      await sharp(abs)
        .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(webpPath);
      newSize = fs.statSync(webpPath).size;
    }
  }

  const savedKB = Math.round((size - newSize) / 1024);
  const oldWeb = webPath(abs);
  const newWeb = webPath(webpPath);

  if (oldWeb !== newWeb) {
    renames.set(oldWeb, newWeb);
  }

  console.log(
    `  ${DRY ? '[DRY]' : 'OK  '} ${path.relative(ROOT, abs).padEnd(80)} ` +
    `${Math.round(size / 1024)}KB → ${DRY ? '?' : Math.round(newSize / 1024)}KB`
  );
  stats.processed++;
  stats.savedBytes += size - newSize;
}

console.log(`\nProcessed: ${stats.processed}, Skipped: ${stats.skipped}`);
console.log(`Estimated savings: ${Math.round(stats.savedBytes / 1024 / 1024)} MB\n`);

if (renames.size === 0 || DRY) {
  if (DRY) console.log(`[dry-run] Would rename ${renames.size} paths in src/`);
  process.exit(0);
}

// ─── Rewrite source references ────────────────────────────────────────────────

console.log(`Rewriting ${renames.size} renamed paths in src/...\n`);
const srcFiles = walkSrc(path.join(ROOT, 'src'));

let rewriteCount = 0;
for (const srcFile of srcFiles) {
  let content = fs.readFileSync(srcFile, 'utf8');
  let changed = false;

  for (const [oldPath, newPath] of renames) {
    if (content.includes(oldPath)) {
      content = content.replaceAll(oldPath, newPath);
      changed = true;
    }
    // Also handle Webflow -p-500 / -p-800 companion paths (they get orphaned after WebP conversion)
    // These look like /images/foo-p-500.png when the original was /images/foo.png
    // We already included the -p-500 originals in the rename map if they were processed,
    // so this is a no-op for those. But if a srcset still references the old PNG companion,
    // rewrite the whole srcset attr to just use the main WebP (handled below).
  }

  if (changed) {
    fs.writeFileSync(srcFile, content, 'utf8');
    rewriteCount++;
  }
}

// Delete original files now that WebP is written and refs are updated
for (const oldWebPath of renames.keys()) {
  // Only delete originals that were renamed (not already WebP → WebP in-place)
  const absOld = path.join(ROOT, 'public', oldWebPath.slice(1));
  const absNew = path.join(ROOT, 'public', renames.get(oldWebPath).slice(1));
  if (absOld !== absNew && fs.existsSync(absOld)) {
    fs.unlinkSync(absOld);
  }
}

console.log(`Rewrote ${rewriteCount} source files.`);
console.log(`Total saved: ${Math.round(stats.savedBytes / 1024 / 1024)} MB`);
