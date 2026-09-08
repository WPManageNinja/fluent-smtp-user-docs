# FluentSMTP user docs

VitePress site for [fluentsmtp.com/docs](https://fluentsmtp.com/docs/). Article URLs match the old BetterDocs slugs so Google results keep working. Cloudflare should serve this Worker on `fluentsmtp.com/docs*` (and `fluentsmtp.com/docs-category*` if you want the old category URLs to 301).

## Run locally

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173/docs/`.

## Build and preview

```bash
npm run build
npm run preview
```

`build` also copies the VitePress output under `docs/.vitepress/dist-cf/docs/` so Workers static assets line up with `base: '/docs/'`. It also copies `404.html` to the assets root so Cloudflare's 404-page handler can find it.

## Publish

```bash
npx wrangler login
npm run deploy
```

Then in Cloudflare, add a route on the `fluentsmtp.com` zone:

- `fluentsmtp.com/docs*` → this Worker
- `fluentsmtp.com/docs-category*` → this Worker (optional, category 301s)

Leave the marketing site on WordPress for everything else.

## URL map

Every old article slug is a folder with `index.md`, so the public path is `/docs/<slug>/`. New pages that the plugin already links to:

- `/docs/configure-cloudflare-email-in-fluent-smtp/`
- `/docs/email-sending-error-notification-pushover/`

## SEO and AI access

Every build produces a sitemap with canonical, trailing-slash HTML URLs and Git-based modification dates, plus Markdown generated from the same sources as the website. Each HTML page includes its own description, canonical URL, Open Graph metadata, structured data, and a Markdown alternate link. The favicon files are the official icons used on fluentsmtp.com (downloaded from its January 2021 WordPress uploads).

Public endpoints after deployment:

- `https://fluentsmtp.com/docs/sitemap.xml` — submit this URL in Google Search Console.
- `https://fluentsmtp.com/docs/llms.txt` — guide index for AI readers.
- `https://fluentsmtp.com/docs/llms-full.txt` — all documentation in one file.
- `https://fluentsmtp.com/docs/<slug>/index.md` — individual Markdown guides; the homepage is `/docs/index.md`.
- The normal page URL with `Accept: text/markdown` — the same Markdown representation, with `Content-Type: text/markdown` and `Vary: Accept`. Browser requests continue to get HTML. Responses that negotiate formats use `private, no-cache` to avoid shared-cache format collisions.

Markdown contains absolute links and a canonical source URL. Standalone Markdown and AI text files carry `X-Robots-Tag: noindex` to keep them out of search results while remaining fetchable by AI tools. `llms.txt` is a discovery convention, not a guarantee of indexing, model training, or citations.

### Production rollout

1. Deploy the Worker and confirm the `fluentsmtp.com/docs*` route points to it. On September 8, 2026, the production docs sitemap URL still returned a WordPress 301 to `/sitemaps.xml`; the local implementation returns the docs XML directly.
2. In the WordPress-managed root `https://fluentsmtp.com/robots.txt`, preserve the existing rules and add:

   ```text
   Sitemap: https://fluentsmtp.com/docs/sitemap.xml
   ```

   A `/docs/robots.txt` file would not control crawling: robots rules belong at the domain root. The root robots file currently allows `/docs/`.
3. Optionally link to `/docs/llms.txt` from the marketing site's root `/llms.txt`. The docs Worker does not own root paths.
4. Verify that Cloudflare bot/WAF settings allow the search and AI crawlers you want. Repository configuration cannot establish zone-level crawler access.
5. Submit `/docs/sitemap.xml` in the site's Google Search Console property and inspect a representative article URL. Sitemap submission does not guarantee indexing.

### Verification

Requires Node.js 22.18+ (or Node.js 24+) for the check script's TypeScript import.

```bash
npm run build
npm run check
npx wrangler dev --port 8787
# In another terminal:
DOCS_TEST_ORIGIN=http://localhost:8787 node scripts/check-discovery.mjs
```

Checks cover all sitemap pages, metadata, Markdown discovery and source links, official favicon assets, Accept preferences, live HTML/Markdown responses, HEAD, legacy redirects, and real 404 responses. `npm run preview` serves static output; use Wrangler to test content negotiation.

Implementation references: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Cloudflare static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), and [llms.txt](https://llmstxt.org/).

## Plugin documentation feed

`/docs/api/v1/docs.json` is generated at build time from the same Markdown and
shared sidebar as the website. The versioned envelope is `{ "version": 1, "docs": [...] }`.
Each article includes a slug `id`, plain-text `title` and `description`, Markdown
`content` for local search, canonical `link`, and `category: { value, label }`.
Articles follow sidebar order; the build fails for missing or duplicate membership.
The homepage is excluded. This is a static JSON asset served by the existing Worker.

The FluentSMTP plugin fetches this feed through its authenticated PHP docs handler,
caches results for six hours, and retains a non-autoloaded last-success option for
outages. Failed refreshes with a backup are retried after five minutes. With no
backup, the plugin shows an error and Retry. Search is local and case-insensitive;
article links open the documentation website.

Deploy the docs Worker and verify the public JSON endpoint **before releasing the
updated plugin**. Older plugin versions still use the WordPress REST feed, which
must remain available during the transition.

### Check hard-coded plugin links before release

With the plugin checkout alongside this repository, run:

```bash
node scripts/check-plugin-links.mjs
# With wrangler dev running (also checks redirects, page identity and tracking queries):
DOCS_TEST_ORIGIN=http://localhost:8787 node scripts/check-plugin-links.mjs
```

Pass a different plugin checkout path as the first argument if needed. The check
scans PHP/Vue sources, translation files, readmes and built assets. After deployment,
repeat with `DOCS_TEST_ORIGIN=https://fluentsmtp.com` to verify production routing.
