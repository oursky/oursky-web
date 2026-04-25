# Phase 5 — Pre-Launch Checklist

Adapted from the FormX migration playbook (`/Users/rachelleau/Downloads/webflow-migration-guide.md` §11), trimmed for our actual setup: Astro 6 + Tailwind 4, Netlify host, clean rebuild (no Webflow CSS / `w-*` classes / Webflow.js), Plausible-only analytics (no cookie banner), self-hosted fonts, all CMS images already local.

Work top-to-bottom on the deploy preview URL before flipping DNS. Items prefixed `🔧` need work; `✓` are confirmations.

> Local-only items verified 2026-04-25 are marked `[x]`. Items still `[ ]` need a Netlify deploy preview, admin/account access, or end-of-launch verification.

---

## 1. Build & correctness (local)

```bash
npm run build          # → 183+ pages, sitemap-index.xml generated, exits 0
npm run preview        # spot-check 5–10 pages
```

- [x] `npm run build` exits clean with no errors or warnings
- [x] Page count is 183 (homepage + 17 marketing pages + 138 blog posts + 8 works + 13 categories + paginated blog listings + `/404`)
- [ ] No console errors when navigating in `npm run preview` (re-check on deploy preview)
- [x] `dist/sitemap-index.xml` exists and references `dist/sitemap-0.xml`
- [x] `public/robots.txt` lists the production sitemap URL

## 2. URL parity with Webflow

Webflow → new site URL conventions are 1:1; the migration plan promised no redirects beyond the 8 we explicitly added.

- [x] Blog posts render at `/blogs/<slug>` (not `/post/<slug>` — that pattern was never used by Webflow, confirmed by Phase 5 audit `/tmp/audit-results.txt`)
- [x] Works render at `/works/<slug>`
- [x] Categories render at `/blog-category/<slug>`
- [x] Paginated blog listing renders at `/blog` and `/blog/<page>`
- [x] Trailing-slash canonical: `<link rel="canonical">` is `/about`, **not** `/about/` (matches Webflow). Set by `trailingSlash: 'never'` in `astro.config.mjs`.
- [ ] All `[[redirects]]` rules in `netlify.toml` resolve correctly. The 7 imported CSV rules verified locally 2026-04-25 with `npx netlify dev --offline --dir dist`. The 1 wildcard `/*.html → /:splat` rule does NOT fire under `netlify dev --offline` (offline emulation limitation) — must be re-verified on the first deploy preview URL.

  ```bash
  npx netlify dev --offline --dir dist
  for path in /case-studies /product-development /mobile /web /design /tech /findus; do
    curl -sI -o /dev/null -w "%{http_code} $path -> %{redirect_url}\n" "http://localhost:8888$path"
  done
  # all 7 should be 301 → /works (or /services, /contact)

  # On deploy preview URL, additionally verify .html stripping:
  curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "https://<preview>.netlify.app/about.html"
  # should be 301 → /about
  ```

## 3. SEO

- [x] Every page has unique `<title>` and `<meta name="description">`. Title format is `Oursky - <X>` (matches Webflow). Verified 2026-04-25 on /, /about, /services, /products, /contact, /works, /blog, /works/cornerstone, /blogs/<sample>, /404.
- [x] `<link rel="canonical">` present on every page
- [x] OG image set on every page (default `/images/og-default.png`, blog posts use post hero, works use heroImage)
- [x] JSON-LD Organization + WebSite on every page (emitted by `BaseLayout.astro`; Organization includes 5 verified `sameAs` profiles)
- [x] JSON-LD `BlogPosting` + `BreadcrumbList` on every blog post (emitted by `BlogLayout.astro`)
- [ ] Validate one blog post's structured data with [Rich Results Test](https://search.google.com/test/rich-results) — needs deploy preview URL
- [x] Read-time renders in blog post byline (verified: "8 min read" on the sample post)
- [ ] `noindex` honored on draft posts (set `draft: true` on a sample post, rebuild, confirm it 404s and isn't in `sitemap-0.xml`). Drafts are filtered in `getStaticPaths` so no page is built for them — this item just confirms behavior.
- [x] `/404.html` exists and uses BaseLayout (header + footer rendered; carries `noindex, nofollow`)

## 4. Performance

- [x] No render-blocking stylesheets in the `<head>` (Borna is self-hosted with `font-display: swap`; no Google Fonts CDN)
- [ ] Below-fold images use `loading="lazy"`; above-fold (hero) images do not. Homepage spot-check 2026-04-25: 29/32 imgs are lazy. Verify none of the lazy ones are above-fold heroes.
- [ ] **Open issue — CLS risk.** All `<img>` tags should have explicit `width` and `height`. Spot-check 2026-04-25: homepage 9/32 imgs dimensioned, sample blog post 9/19. Audit and add dimensions to the worst offenders during the deploy-preview Lighthouse pass; not blocker if Lighthouse Performance still ≥ 90.
- [x] Plausible script absent unless env var is set AND it's a production build; verified twice with build-with/without env var (`grep -c "plausible.io" dist/index.html` toggles 0 ↔ 1)
- [ ] Lighthouse run on homepage, `/blog`, and one blog post — Performance ≥ 90 on each (mobile preset). Run on deploy preview URL.

## 5. Webflow / CDN independence

The FormX playbook's "CDN independence" gate. Hard requirement — these must each return zero results.

```bash
grep -r "cdn.prod.website-files.com" src/ public/    # → 0 results
grep -r "uploads-ssl.webflow.com" src/ public/       # → 0 results
grep -r "data-wf-" src/ public/ --include="*.astro"  # → 0 results (clean rebuild — no Webflow data attrs)
grep -rE '\b(w-form|w-nav|w-richtext)\b' src/ --include="*.astro"  # → 0 results (word-boundaries avoid false positives like "x-www-form-urlencoded")
```

- [x] All four greps above return zero (verified 2026-04-25)
- [x] All blog frontmatter `image:` paths start with `/images/blogs/` (138/138)
- [x] All works frontmatter `heroImage:` / `thumbnail:` paths start with `/images/works/` (16/16)
- [x] Favicons served from `public/`: `favicon.png` (256×256) + `apple-touch-icon.png` (180×180)
- [x] No Webflow `webflow.js` / `webflow.css` / jQuery in `public/` or referenced from any layout

## 6. Contact form (Netlify Forms)

The form name is `oursky-contact`. Submissions group under that name in the Netlify dashboard.

- [ ] First deploy succeeds — Netlify build log says it detected the form `oursky-contact` (look for "Detected forms" line)
- [ ] Form on `/contact` page submits successfully (test with a real submission)
- [ ] Form on `/` (homepage CTA) submits successfully
- [ ] In-page success state displays ("Thanks — we'll be in touch shortly.")
- [ ] In-page error state displays when offline / network blocked
- [ ] Submission visible in **Netlify dashboard → Site → Forms → oursky-contact**
- [ ] Netlify-hosted reCAPTCHA 2 widget renders before the submit button (Google "I'm not a robot" checkbox). Netlify injects this at runtime — no script tag in our source.
- [ ] Submitting without solving the reCAPTCHA fails (server-side validation rejects). Our AJAX handler shows the in-page error state.
- [ ] Honeypot working: submitting with the hidden `bot-field` filled gets silently discarded (won't appear in dashboard).
- [ ] One reCAPTCHA per page rule respected: each page has at most one ContactForm instance (homepage has 1 in CTA section, `/contact` has 1 in `WorkWithUsSection`). If you ever add a second form to a single page, you must use the bring-your-own reCAPTCHA flavor instead.
- [ ] Email notification configured: **Forms → Settings → Form notifications → Email notification** → recipient address set
- [x] No leftover `data-wf-*` / `data-name` / Webflow reCAPTCHA `<div class="w-form-formrecaptcha">` in source. Clean rebuild — confirmed by `grep` returning 0.

## 7. Third-party scripts

Live-site script inventory ran 2026-04-25 against `https://www.oursky.com`. Findings:

- [x] No Tawk.to / live chat scripts (live site has none — confirmed)
- [x] No Optibase / GTM / Google Analytics / FB Pixel / LinkedIn Insight / Apollo / Hotjar (live site has none — confirmed)
- [x] No leftover Webflow reCAPTCHA markup (`grep -r "w-form-formrecaptcha" src/` → 0 results). Note: `g-recaptcha` will appear in `dist/` HTML at runtime once Netlify injects the widget — that's expected.
- [ ] **Plausible analytics** — set `PLAUSIBLE_DOMAIN=oursky.com` in **Netlify → Site → Environment variables**, scoped to the **Production** deploy context only. Verify the script tag `<script defer data-domain="oursky.com" src="https://plausible.io/js/script.js">` appears in `<head>` of a production-deployed page. Deploy previews must NOT have it (intentional — `import.meta.env.PROD` gating in `BaseLayout.astro`).
- [x] **GeoJS** (`get.geojs.io/v1/ip/geo.js`) on Webflow site is intentionally NOT migrated — no visible feature uses it.
- [ ] **Swiper v12** migrated and bundled. Homepage testimonials use Swiper (`TestimonialsSection.astro`) replicating Webflow's config (1 slide mobile, 3 desktop, 12 px / 24 px gap, 2.2 s autoplay, loop, mousewheel-to-axis). Re-inits on `astro:page-load`. Verify on deploy preview: autoplay pauses on hover, respects `prefers-reduced-motion`, no visible jump at the loop seam.
- [x] **Google WebFont loader** + **jQuery** + **Webflow runtime chunks** intentionally NOT migrated (Borna self-hosted; clean rebuild has no runtime deps).

## 8. Deploy & DNS cutover

- [ ] Netlify site is connected to the GitHub repo, building from `master`
- [ ] Custom domain `www.oursky.com` added in Netlify → Domain management
- [ ] HTTPS certificate provisioned (Netlify auto-issues via Let's Encrypt; wait for green check)
- [ ] `PUBLIC_SITE_URL=https://www.oursky.com` set in Netlify environment variables (production context)
- [ ] Browse the deploy preview URL end-to-end (every nav link, footer link, contact form, one of each: blog post, works, category)
- [ ] **DNS cutover** — change `www.oursky.com` from Webflow's CNAME to Netlify's. Suggest doing this in a low-traffic window.
- [ ] Apex `oursky.com` → 301 redirect to `https://www.oursky.com` (configure in Netlify if not already)
- [ ] Old Webflow project disabled or unpublished only **after** DNS has propagated (verify with `dig www.oursky.com` showing Netlify IPs)

## 9. Post-cutover (first 48h)

- [ ] No spike in 404s — check **Netlify → Site → Analytics → Top not found** (or browse the live site for the URLs in `dist/sitemap-0.xml`)
- [ ] Any 404 with traffic gets a redirect rule added to `netlify.toml`
- [ ] Search Console: submit `https://www.oursky.com/sitemap-index.xml`
- [ ] Search Console: re-verify ownership (HTML tag method survives the host change; DNS-method may need re-verification)
- [ ] Plausible (if enabled) showing live traffic on the dashboard
- [ ] At least one real contact form submission received and visible in dashboard
- [ ] No JSON-LD validation errors in Search Console → Enhancements (BlogPosting, BreadcrumbList)

---

## Blocked — needs account access

These need access to third-party accounts that the dev/migration team doesn't own. Coordinate with Oursky admins before they can ship.

- [ ] **Newsletter signup** — Webflow homepage has a Mailchimp signup ("Get updates and tips from the team") posting to `oursky.us2.list-manage.com/subscribe/post?u=34db69ee3e01fe49e12302054&id=72405ff6d4` with Cloudflare Turnstile (`data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"`). Not migrated. **Decision needed**: re-implement with same Mailchimp endpoint (needs confirmation list IDs are still active), switch to Netlify Forms + Mailchimp sync, or drop entirely. Owner: Oursky Mailchimp admin.
- [ ] **n8n integration for contact form submissions** — route Netlify form submissions through an n8n webhook for downstream automation (CRM, email, Slack, etc.). Requires n8n instance, webhook URL, and a Netlify outgoing webhook configured under **Forms → Settings → Outgoing notifications → Add notification → HTTP POST**. Owner: n8n / ops admin.
- [ ] **Plausible env var** — `PLAUSIBLE_DOMAIN=oursky.com` in Netlify dashboard (production context). Needs Netlify site admin.
- [ ] **Mailchimp API token** (only if going the API/sync route for newsletter) — generate in Mailchimp dashboard, store as `MAILCHIMP_API_KEY` in Netlify env. Owner: Mailchimp admin.

## Known followups (not blockers for launch)

- MD fidelity audit — turndown converted 138 blog HTML bodies; spot-check the top 10 posts by anticipated traffic for figure / nested-styling glitches

## Reference

- Migration plan: `docs/migration-plan.md`
- Phase handoffs: `docs/phase1-handoff.md`, `phase2-handoff.md`, `phase3-handoff.md`, `phase4-handoff.md`
- Production-redirect audit results: `/tmp/audit-results.txt` (regenerate by re-running the curl loop in §2)
- Redirect converter: `npm run convert:redirects exports/webflow/redirects.csv`
