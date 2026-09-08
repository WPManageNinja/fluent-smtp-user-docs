const CATEGORY_REDIRECTS: Record<string, string> = {
  '/docs-category/getting-started': '/docs/installing-fluent-smtp/',
  '/docs-category/drivers': '/docs/configurable-email-delivery-providers/',
  '/docs-category/alerts': '/docs/alerts-email-summary/',
  '/docs-category/obtain-smtp-credentials': '/docs/cpanel-smtp-credentials/',
  '/docs-category/functionality': '/docs/using-multiple-smtp-drivers-with-fluent-smtp/',
  '/docs-category/miscellaneous': '/docs/fluentsmtp-email-logs-feature/'
}

// Only explicit Markdown preferences opt in; ordinary browser Accept headers stay HTML.
export function prefersMarkdown(accept: string): boolean {
  const entries = accept.toLowerCase().split(',').map(value => {
    const [type, ...params] = value.trim().split(';')
    const quality = params.find(param => param.trim().startsWith('q='))
    const q = quality ? Number(quality.trim().slice(2)) : 1
    return { type: type.trim(), q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 }
  })
  const markdown = entries.find(entry => entry.type === 'text/markdown')?.q ?? 0
  const html = entries.find(entry => entry.type === 'text/html')?.q
    ?? entries.find(entry => entry.type === 'text/*')?.q
    ?? entries.find(entry => entry.type === '*/*')?.q ?? 0
  return markdown > 0 && markdown >= html
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (path.startsWith('/docs-category')) {
      const dest = CATEGORY_REDIRECTS[path] ?? '/docs/'
      return Response.redirect(new URL(dest, url.origin).href, 301)
    }

    const isDoc = path === '/docs' || path.startsWith('/docs/')
    if (!isDoc || !['GET', 'HEAD'].includes(request.method)) return env.ASSETS.fetch(request)

    const pageRequest = !path.split('/').pop()?.includes('.')
    const negotiated = pageRequest && prefersMarkdown(request.headers.get('Accept') ?? '')
    const assetUrl = new URL(url)
    if (negotiated) assetUrl.pathname = `${path}/index.md`
    const upstream = await env.ASSETS.fetch(new Request(assetUrl, request))
    const response = new Response(upstream.body, upstream)
    if (pageRequest) {
      const vary = response.headers.get('Vary')
      response.headers.set('Vary', vary ? `${vary}, Accept` : 'Accept')
      // Shared caches must not mix negotiated HTML and Markdown representations.
      response.headers.set('Cache-Control', 'private, no-cache')
    }
    if (response.status === 404) response.headers.set('X-Robots-Tag', 'noindex')
    if (response.ok && assetUrl.pathname.endsWith('.md')) {
      const canonicalPath = assetUrl.pathname.replace(/index\.md$/, '')
      response.headers.set('Content-Type', 'text/markdown; charset=utf-8')
      response.headers.set('Link', `<https://fluentsmtp.com${canonicalPath}>; rel="canonical"`)
      if (!negotiated) response.headers.set('X-Robots-Tag', 'noindex')
    } else if (response.ok && /\/llms(?:-full)?\.txt$/.test(path)) {
      response.headers.set('Content-Type', 'text/plain; charset=utf-8')
      response.headers.set('X-Robots-Tag', 'noindex')
    } else if (response.ok && response.headers.get('Content-Type')?.includes('text/html')) {
      response.headers.set('Link', `<https://fluentsmtp.com${path}/index.md>; rel="alternate"; type="text/markdown", <https://fluentsmtp.com/docs/llms.txt>; rel="describedby"; type="text/plain"`)
    }
    return response
  }
} satisfies ExportedHandler<Env>
