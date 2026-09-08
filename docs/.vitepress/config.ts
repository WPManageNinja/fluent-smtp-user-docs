import sidebar from './sidebar.mjs'
import { defineConfig } from 'vitepress'
import featureImages from './feature-images.json'

function featureImageFor(relativePath: string) {
  const slug = relativePath.replace(/\/index\.md$/, '').replace(/\.md$/, '')
  const image = featureImages.find(image => image.slug === slug)
  if (!image && relativePath !== '404.md') throw new Error(`Missing feature image: ${relativePath}`)
  return image
}

export default defineConfig({
  lang: 'en-US',
  title: 'FluentSMTP',
  description: 'Send WordPress email through the service you already use. Free, always.',
  base: '/docs/',
  srcDir: '.',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: false,
  sitemap: {
    hostname: 'https://fluentsmtp.com',
    transformItems(items) {
      return items
        .filter((item) => !item.url.includes('404'))
        .map((item) => {
          let url = item.url
          if (!url.startsWith('http')) {
            if (!url.startsWith('/')) {
              url = `/${url}`
            }
            if (!url.startsWith('/docs')) {
              url = `/docs${url === '/' ? '/' : url}`
            }
            if (!url.endsWith('/')) {
              url = `${url}/`
            }
          }
          return { ...item, url }
        })
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/docs/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/docs/favicon-192x192.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/docs/apple-touch-icon.png' }],
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/docs/sitemap.xml' }],
    ['link', { rel: 'alternate', type: 'text/plain', href: '/docs/llms.txt', title: 'Documentation index for AI readers' }],
    ['meta', { name: 'theme-color', content: '#c716c1' }]
  ],
  transformHead({ pageData }) {
    if (pageData.relativePath === '404.md') {
      return [['meta', { name: 'robots', content: 'noindex' }]]
    }
    const path = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '/')
    const canonical = `https://fluentsmtp.com/docs/${path}`
    const title = `${pageData.title} | FluentSMTP`
    const description = pageData.description
    const feature = featureImageFor(pageData.relativePath)!
    const image = `https://fluentsmtp.com/docs${feature.image}`
    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['link', { rel: 'alternate', type: 'text/markdown', href: `${canonical}index.md`, title: 'Read as Markdown' }],
      ['meta', { property: 'og:type', content: path ? 'article' : 'website' }],
      ['meta', { property: 'og:site_name', content: 'FluentSMTP Documentation' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: feature.alt }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }],
      ['meta', { name: 'twitter:image:alt', content: feature.alt }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': path ? 'TechArticle' : 'CollectionPage',
        headline: pageData.title,
        description,
        url: canonical,
        image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
        inLanguage: 'en-US',
        ...(pageData.lastUpdated ? { dateModified: new Date(pageData.lastUpdated).toISOString() } : {}),
        publisher: { '@type': 'Organization', name: 'WPManageNinja', url: 'https://wpmanageninja.com/' }
      }).replace(/</g, '\\u003c')]
    ]
  },
  themeConfig: {
    siteTitle: 'Documentation',
    search: {
      provider: 'local'
    },
    nav: [],
    sidebar,
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WPManageNinja/fluent-smtp' }
    ],
    footer: {
      message: 'FluentSMTP is free, and it will stay free.',
      copyright: 'WPManageNinja'
    }
  }
})
