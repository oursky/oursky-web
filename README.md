# Oursky web (Astro)

Static marketing site for [Oursky](https://www.oursky.com) — an [Astro](https://astro.build/) 6 project with Tailwind CSS 4 and MDX content collections.

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

Copy `.env.example` to `.env` if you need to override site defaults (e.g. `PUBLIC_SITE_URL`). The static site build does not require a `.env` file.

## GitHub

Create a new empty repository, then from this directory:

```sh
git remote add origin https://github.com/<org>/<repo>.git
git branch -M main
git push -u origin main
```

## Netlify

1. In the [Netlify dashboard](https://app.netlify.com), connect the GitHub repository. Build command and publish directory come from `netlify.toml`.
2. **Deploy previews** use `DEPLOY_PRIME_URL` for canonical URLs, Open Graph base URLs, and the sitemap. **Production** deploys (`CONTEXT=production`) use `https://www.oursky.com` unless you set `PUBLIC_SITE_URL` under Site → Settings → Environment variables.
3. Contact form submissions land in **Site → Forms → oursky-contact**. Configure email notifications under Forms → Settings → Form notifications.
4. Redirect rules live in `netlify.toml`.
5. Optional: enable **Password protection** on preview deploys.
