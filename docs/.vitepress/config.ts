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
    ['link', { rel: 'icon', href: '/docs/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#c716c1' }]
  ],
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
