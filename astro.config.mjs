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
  if (process.env.VERCEL_ENV === 'production') return 'https://www.oursky.com';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://www.oursky.com';
}

// https://astro.build/config
export default defineConfig({
  site: resolveSite(),
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
});