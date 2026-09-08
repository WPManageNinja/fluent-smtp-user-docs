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
