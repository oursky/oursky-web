// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

/** Canonical origin for sitemap, OG URLs, and import.meta.env.SITE (no trailing slash). */
function resolveSite() {
  const fromEnv = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  // Netlify build env: CONTEXT=production for prod deploys; DEPLOY_PRIME_URL
  // is the branch/preview URL (already includes the scheme).
  if (process.env.CONTEXT === 'production') return 'https://www.oursky.com';
  if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL.replace(/\/$/, '');
  return 'https://www.oursky.com';
}

// https://astro.build/config
export default defineConfig({
  site: resolveSite(),
  output: 'static',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
});