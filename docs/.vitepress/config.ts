import { defineConfig } from 'vitepress'

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
    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['link', { rel: 'alternate', type: 'text/markdown', href: `${canonical}index.md`, title: 'Read as Markdown' }],
      ['meta', { property: 'og:type', content: path ? 'article' : 'website' }],
      ['meta', { property: 'og:site_name', content: 'FluentSMTP Documentation' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:image', content: 'https://fluentsmtp.com/docs/favicon-192x192.png' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': path ? 'TechArticle' : 'CollectionPage',
        headline: pageData.title,
        description,
        url: canonical,
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
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Install and activate', link: '/installing-fluent-smtp/' },
          { text: 'Pick an email service', link: '/configurable-email-delivery-providers/' },
          { text: 'Dashboard', link: '/introduction-to-fluent-smtp-dashboard/' },
          { text: 'Settings', link: '/fluent-smtp-settings/' }
        ]
      },
      {
        text: 'Delivery Connections',
        collapsed: false,
        items: [
          { text: 'toSend', link: '/set-up-tosend-in-fluent-smtp/' },
          { text: 'Amazon SES', link: '/set-up-amazon-ses-in-fluent-smtp/' },
          { text: 'Gmail / Google Workspace', link: '/connect-gmail-or-google-workspace-emails-with-fluentsmtp/' },
          { text: 'Outlook / Office 365 (Entra)', link: '/configure-fluentsmtp-with-microsoft-outlook-office/' },
          { text: 'Outlook / Office 365 (Azure)', link: '/setup-outlook-with-fluentsmtp/' },
          { text: 'Cloudflare Email', link: '/configure-cloudflare-email-in-fluent-smtp/' },
          { text: 'Mailgun', link: '/configure-mailgun-in-fluent-smtp-to-send-emails/' },
          { text: 'SendGrid', link: '/set-up-the-sendgrid-driver-in-fluent-smtp/' },
          { text: 'Brevo (Sendinblue)', link: '/setting-up-sendinblue-mailer-in-fluent-smtp/' },
          { text: 'Postmark', link: '/configure-postmark-in-fluent-smtp-to-send-emails/' },
          { text: 'SMTP2GO', link: '/configure-smtp2go-in-fluentsmtp-to-send-emails/' },
          { text: 'SparkPost', link: '/configure-sparkpost-in-fluent-smtp-to-send-emails/' },
          { text: 'Elastic Email', link: '/configure-elastic-email-in-fluent-smtp/' },
          { text: 'Netcore (Pepipost)', link: '/set-up-the-pepipost-mailer-in-fluent-smtp/' },
          { text: 'Any SMTP host', link: '/set-up-fluent-smtp-with-any-host-or-mailer/' }
        ]
      },
      {
        text: 'Alerts',
        collapsed: false,
        items: [
          { text: 'Email summary', link: '/alerts-email-summary/' },
          { text: 'Telegram', link: '/email-sending-error-notification-telegram/' },
          { text: 'Slack', link: '/email-sending-error-notification-slack/' },
          { text: 'Discord', link: '/email-sending-error-notification-discord/' },
          { text: 'Pushover', link: '/email-sending-error-notification-pushover/' }
        ]
      },
      {
        text: 'SMTP credentials',
        collapsed: true,
        items: [
          { text: 'cPanel', link: '/cpanel-smtp-credentials/' }
        ]
      },
      {
        text: 'Advanced',
        collapsed: false,
        items: [
          { text: 'Multiple connections and routing', link: '/using-multiple-smtp-drivers-with-fluent-smtp/' },
          { text: 'Email logs', link: '/fluentsmtp-email-logs-feature/' }
        ]
      }
    ],
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
