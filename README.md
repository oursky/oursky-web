# Oursky web (Astro)

Static marketing site for [Oursky](https://www.oursky.com), rebuilt from Webflow as an [Astro](https://astro.build/) 6 project with Tailwind CSS 4, MDX content collections, and a checked-in Webflow export under `ref/` for parity reference.

## Requirements

- Node.js 22.12 or newer (see `package.json` `engines` and `.nvmrc`)

## Local development

```sh
npm install
npm run dev
```

The dev server defaults to `http://localhost:4321`.

```sh
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

## Environment variables

Copy `.env.example` to `.env` when you need Webflow migration scripts or future analytics keys. The static site build does not require a `.env` file.

## GitHub

Create a new empty repository, then from this directory:

```sh
git remote add origin https://github.com/<org>/<repo>.git
git branch -M main
git push -u origin main
```

## Vercel (internal / preview)

1. Import the GitHub repository in the [Vercel dashboard](https://vercel.com/new).
2. Framework preset **Astro** is detected automatically. Build command `npm run build`, output **static** (`dist/`).
3. **Preview URLs** use the deployment hostname for canonical URLs, Open Graph base URLs, and the sitemap (via `VERCEL_URL`). **Production** deployments use `https://www.oursky.com` unless you set `PUBLIC_SITE_URL` in project → Environment Variables.
4. Optional: enable **Deployment Protection** on preview deployments if the site should not be publicly reachable before launch.

## Content tooling

| Script | Purpose |
| --- | --- |
| `npm run generate:works` | Regenerate work stubs |
| `npm run generate:blog-stubs` | Blog stub generator |
| `npm run generate:blog-stubs:all` | Same with `--force` |

## Docs

Migration notes and phase handoffs live in `docs/`.
