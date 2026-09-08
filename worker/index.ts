const CATEGORY_REDIRECTS: Record<string, string> = {
  '/docs-category/getting-started': '/docs/installing-fluent-smtp/',
  '/docs-category/drivers': '/docs/configurable-email-delivery-providers/',
  '/docs-category/alerts': '/docs/alerts-email-summary/',
  '/docs-category/obtain-smtp-credentials': '/docs/cpanel-smtp-credentials/',
  '/docs-category/functionality': '/docs/using-multiple-smtp-drivers-with-fluent-smtp/',
  '/docs-category/miscellaneous': '/docs/fluentsmtp-email-logs-feature/'
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    if (path.startsWith('/docs-category')) {
      const dest = CATEGORY_REDIRECTS[path] ?? '/docs/'
      return Response.redirect(new URL(dest, url.origin), 301)
    }

    return env.ASSETS.fetch(request)
  }
} satisfies ExportedHandler<Env>
