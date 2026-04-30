#!/usr/bin/env node
/**
 * Phase 1 image cleanup:
 *   1. Delete known orphan files (verified 0 references in src/).
 *   2. Delete exact-byte-duplicate files and rewrite references to the surviving copy.
 *
 *   node scripts/cleanup-images.mjs           # execute
 *   node scripts/cleanup-images.mjs --dry-run # preview only
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');

const SRC_EXTS = new Set(['.md', '.mdx', '.astro', '.ts', '.tsx', '.js', '.jsx', '.css', '.html']);

// ─── helpers ──────────────────────────────────────────────────────────────────

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkDir(p, files);
    else if (SRC_EXTS.has(path.extname(name).toLowerCase())) files.push(p);
  }
  return files;
}

function md5(filepath) {
  return crypto.createHash('md5').update(fs.readFileSync(filepath)).digest('hex');
}

function rewriteFile(filepath, from, to) {
  const before = fs.readFileSync(filepath, 'utf8');
  const after = before.replaceAll(from, to);
  if (before === after) {
    console.warn(`  WARN: expected to find "${from}" in ${filepath} but found nothing`);
    return false;
  }
  if (!DRY) fs.writeFileSync(filepath, after, 'utf8');
  return true;
}

function deleteFile(filepath) {
  const kb = Math.round(fs.statSync(filepath).size / 1024);
  if (!DRY) fs.unlinkSync(filepath);
  console.log(`  DEL  ${path.relative(ROOT, filepath)} (${kb} KB)`);
}

// ─── 1. Orphan files (verified no references in src/) ─────────────────────────

const ORPHANS = [
  'public/images/os-bg-2.png',
  'public/images/swrm-preview-phone-p-800.png',
];

console.log('\n=== Phase 1a: Orphan deletion ===');
for (const rel of ORPHANS) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.log(`  SKIP ${rel} (not found)`);
    continue;
  }
  deleteFile(abs);
}

// ─── 2. Exact-byte duplicates ─────────────────────────────────────────────────
// Each entry: { keep: 'public/images/...', drop: 'public/images/...', refs: ['src/...'] }
// "refs" are the source files that reference the DROP path and need rewriting.

const DEDUPES = [
  // Identical PNG duplicate groups in blogs/
  {
    keep: 'public/images/blogs/03323ab616_679953f4387921465f2815a5_A4.png',
    drop: 'public/images/blogs/10d2861c7f_679953fc04177405443dbaf9_A4.png',
    refs: ['src/content/blog/client-case-study-energy-footprint-tracker-app.md'],
  },
  {
    keep: 'public/images/blogs/05c0bac77b_679928a9b7be1beda2dc35e6_Agile-Pyramid-comic.png',
    drop: 'public/images/blogs/1fc77e7de2_679928925e32e647fabe87ec_Agile-Pyramid-comic.png',
    refs: ['src/content/blog/journey-through-agile-test-automation.md'],
  },
  {
    keep: 'public/images/blogs/1fd3b6904d_679952ed00afd2ad0dda8c63_Newsletter_JUN2018_210618.png',
    drop: 'public/images/blogs/f2443780ad_679952f9a48dced2941113c5_Newsletter_JUN2018_210618.png',
    refs: ['src/content/blog/infographic-5-things-to-ask-before-outsourcing-app-development.md'],
  },
  {
    keep: 'public/images/blogs/3c3d3be8a2_6799295d0330a30a262a0d8a_903F4B0.jpg.png',
    drop: 'public/images/blogs/9617ad0a04_6799296e778d40c8eb350dd6_903F4B0.jpg.png',
    refs: ['src/content/blog/offline-first-no-more-network-connection-error.md'],
  },
  {
    keep: 'public/images/blogs/058ca99fcf_67994cfc36bc0d12791a3136_photo-1454165804606-c3d57bc86b40-720x481.jpeg',
    drop: 'public/images/blogs/aacbce96a3_67994d0824c6856e26dc3164_photo-1454165804606-c3d57bc86b40-720x481.jpeg',
    refs: ['src/content/blog/5-tips-to-resolve-a-conflict.md'],
  },
  {
    keep: 'public/images/blogs/6e6920bab4_679945262d8409abc58c45ab_photo-1456406644174-8ddd4cd52a06.jpeg',
    drop: 'public/images/blogs/8945301af7_67994532b922bb4dfb2ae40c_photo-1456406644174-8ddd4cd52a06.jpeg',
    refs: ['src/content/blog/lesson-from-getting-37-conversion-apart-from-luck.md'],
  },
  {
    keep: 'public/images/blogs/724ac904f9_67994c8efe20b33f4be45398_1s0LCbddq8T4VN4kXtt9r2g.jpeg',
    drop: 'public/images/blogs/b74d7cbb66_67994c830615a7e0ea6f225a_1s0LCbddq8T4VN4kXtt9r2g.jpeg',
    refs: ['src/content/blog/how-we-figured-out-period-leave-without-a-single-meeting.md'],
  },
  {
    keep: 'public/images/blogs/94ff22a761_67994e32518e430f41f9acea_Untitled-design-1.png',
    drop: 'public/images/blogs/c0032bed54_67994e3ca96b779450c37463_Untitled-design-1.png',
    refs: ['src/content/blog/how-secure-is-your-messaging-app-7-questions-and-4-examples.md'],
  },
  // Identical JPG/JPEG extension twins
  {
    keep: 'public/images/blogs/86256bf2c9_6799482b54769870a1e9c883_1.jpeg',
    drop: 'public/images/blogs/aa3cdfde6c_6799483e826e17694ac815ed_1.jpg',
    refs: ['src/content/blog/starting-guide-to-wireframe-design---7-steps-3-tools.md'],
  },
  {
    keep: 'public/images/blogs/3ec5cf127b_67995282ba8a39e39ec1623d_ourskyblog-ccc.jpeg',
    drop: 'public/images/blogs/0002ec86d5_6799528a24c6856e26e279c0_ourskyblog-ccc.jpg',
    refs: ['src/content/blog/client-case-study-ios-traditional-chinese-medicine-app-checkcheckcin.md'],
  },
  {
    keep: 'public/images/blogs/efe99b5919_679942d2f9deac5f8d123019_Oursky-life-8827.jpeg',
    drop: 'public/images/blogs/0eac53fa20_679942c679416f07ba267b7b_Oursky-life-8827.jpg',
    refs: ['src/content/blog/an-opensourced-recipe-for-intializing-redux-x-android-native-apps.md'],
  },
  {
    keep: 'public/images/blogs/5c36a5fcce_67993e2e087156cfaa539ba1_binary-1536651_1920.jpeg',
    drop: 'public/images/blogs/aefff61a50_67993e1aff94522de78c74ef_binary-1536651_1920.jpg',
    refs: ['src/content/blog/using-tensorflow-and-support-vector-machine-to-create-an-image-classifications-engine.md'],
  },
];

console.log('\n=== Phase 1b: Exact-duplicate removal ===');
let totalSaved = 0;

for (const { keep, drop, refs } of DEDUPES) {
  const keepAbs = path.join(ROOT, keep);
  const dropAbs = path.join(ROOT, drop);

  if (!fs.existsSync(keepAbs)) {
    console.warn(`  SKIP: KEEP file missing: ${keep}`);
    continue;
  }
  if (!fs.existsSync(dropAbs)) {
    console.log(`  SKIP: DROP file already gone: ${drop}`);
    continue;
  }

  // Verify they are identical bytes
  const hashKeep = md5(keepAbs);
  const hashDrop = md5(dropAbs);
  if (hashKeep !== hashDrop) {
    console.warn(`  SKIP: ${path.basename(drop)} — files differ (MD5 mismatch), skipping`);
    continue;
  }

  // Rewrite references in source files
  const dropWebPath = '/' + drop.replace(/^public\//, '');
  const keepWebPath = '/' + keep.replace(/^public\//, '');

  for (const refFile of refs) {
    const absRef = path.join(ROOT, refFile);
    if (!fs.existsSync(absRef)) {
      console.warn(`  WARN: ref file not found: ${refFile}`);
      continue;
    }
    const ok = rewriteFile(absRef, dropWebPath, keepWebPath);
    if (ok) console.log(`  REWRITE ${refFile}: ${path.basename(drop)} → ${path.basename(keep)}`);
  }

  const saved = fs.statSync(dropAbs).size;
  totalSaved += saved;
  deleteFile(dropAbs);
}

const savedKB = Math.round(totalSaved / 1024);
console.log(`\nTotal saved: ${savedKB} KB${DRY ? ' (dry run)' : ''}`);
