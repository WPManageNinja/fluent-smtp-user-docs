<script setup lang="ts">
import { withBase } from 'vitepress'

const providers = [
  ['toSend', 'tosend', 'set-up-tosend-in-fluent-smtp', ''],
  ['Amazon SES', 'aws-ses', 'set-up-amazon-ses-in-fluent-smtp', ''],
  ['Gmail', 'gmail-google-workspace', 'connect-gmail-or-google-workspace-emails-with-fluentsmtp', 'Google Workspace'],
  ['Microsoft Outlook', 'microsoft', 'configure-fluentsmtp-with-microsoft-outlook-office', 'Office 365'],
  ['Cloudflare Email', 'cloudflare', 'configure-cloudflare-email-in-fluent-smtp', ''],
  ['Mailgun', 'mailgun', 'configure-mailgun-in-fluent-smtp-to-send-emails', ''],
  ['SendGrid', 'sendgrid', 'set-up-the-sendgrid-driver-in-fluent-smtp', ''],
  ['Brevo', 'sendinblue', 'setting-up-sendinblue-mailer-in-fluent-smtp', 'Formerly Sendinblue'],
  ['Postmark', 'postmark', 'configure-postmark-in-fluent-smtp-to-send-emails', ''],
  ['SMTP2GO', 'smtp2go', 'configure-smtp2go-in-fluentsmtp-to-send-emails', ''],
  ['SparkPost', 'sparkpost', 'configure-sparkpost-in-fluent-smtp-to-send-emails', ''],
  ['Elastic Email', 'elastic-email', 'configure-elastic-email-in-fluent-smtp', ''],
  ['Netcore', 'netcore', 'set-up-the-pepipost-mailer-in-fluent-smtp', 'Formerly Pepipost'],
  ['Other SMTP', 'smtp', 'set-up-fluent-smtp-with-any-host-or-mailer', 'Any SMTP host']
]
const steps = [
  { title: 'Install FluentSMTP', text: 'Add the free plugin to your WordPress site.', link: 'installing-fluent-smtp' },
  { title: 'Connect your email service', text: 'Choose a provider and follow the setup guide.', link: 'configurable-email-delivery-providers' },
  { title: 'Send a test email', text: 'Check your connection from the dashboard.', link: 'introduction-to-fluent-smtp-dashboard' }
]
const categories = [
  { title: 'Getting started', text: 'Find your way around FluentSMTP.', links: [
    ['Installation', 'installing-fluent-smtp'], ['Dashboard & test emails', 'introduction-to-fluent-smtp-dashboard'], ['Plugin settings', 'fluent-smtp-settings']
  ] },
  { title: 'Email logs & routing', text: 'See what was sent and manage delivery.', links: [
    ['View and resend emails', 'fluentsmtp-email-logs-feature'], ['Multiple connections & routing', 'using-multiple-smtp-drivers-with-fluent-smtp'], ['Find your cPanel SMTP credentials', 'cpanel-smtp-credentials']
  ] },
  { title: 'Alerts & summaries', text: 'Keep up with delivery and sending errors.', links: [
    ['Email summary', 'alerts-email-summary'], ['Telegram notifications', 'email-sending-error-notification-telegram'], ['Slack notifications', 'email-sending-error-notification-slack'], ['Discord notifications', 'email-sending-error-notification-discord'], ['Pushover notifications', 'email-sending-error-notification-pushover']
  ] }
]
const doc = (slug: string) => withBase(`/${slug}/`)
</script>

<template>
  <div class="docs-home">
    <section class="docs-hero" aria-labelledby="home-title">
      <div class="home-container hero-inner">
        <p class="home-eyebrow">FluentSMTP documentation</p>
        <h1 id="home-title">Get your WordPress<br>email up and running.</h1>
        <p class="hero-description">From your first connection to everyday troubleshooting.<br class="desktop-break"> Find the guides you need to send email with FluentSMTP.</p>
        <div class="hero-actions">
          <a class="home-button" :href="doc('installing-fluent-smtp')">Get started <span aria-hidden="true">→</span></a>
          <a class="home-text-link" href="#connections">Connect an email service <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>

    <div class="home-container">
      <section class="home-start" aria-labelledby="start-title">
        <h2 id="start-title" class="home-eyebrow">New to FluentSMTP? Start here</h2>
        <ol class="start-steps">
          <li v-for="(step, index) in steps" :key="step.link">
            <span class="step-number" aria-hidden="true">0{{ index + 1 }}</span>
            <div><a :href="doc(step.link)">{{ step.title }} <span aria-hidden="true">↗</span></a><p>{{ step.text }}</p></div>
          </li>
        </ol>
      </section>

      <section id="connections" class="home-section" aria-labelledby="connections-title">
        <div class="section-heading">
          <div><h2 id="connections-title">Connect your email service</h2><p>Choose your provider for a step-by-step setup guide.</p></div>
          <a class="home-text-link" :href="doc('configurable-email-delivery-providers')">Help me choose <span aria-hidden="true">→</span></a>
        </div>
        <ul class="provider-grid">
          <li v-for="[name, logo, slug, detail] in providers" :key="slug">
            <a class="provider-link" :href="doc(slug)">
              <span class="provider-logo"><img :src="withBase(`/providers/provider-${logo}.svg`)" alt="" width="128" height="40" loading="lazy"></span>
              <span class="provider-label">{{ name }}<small v-if="detail">{{ detail }}</small></span>
              <span class="provider-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <p class="connection-note">Using the Azure Portal? <a :href="doc('setup-outlook-with-fluentsmtp')">Follow the Outlook Azure setup guide <span aria-hidden="true">→</span></a></p>
      </section>

      <section class="home-section browse-section" aria-labelledby="browse-title">
        <div class="section-heading"><div><h2 id="browse-title">Explore the docs</h2><p>Settings, sending history, and everything after setup.</p></div></div>
        <div class="doc-categories">
          <section v-for="category in categories" :key="category.title">
            <h3>{{ category.title }}</h3><p>{{ category.text }}</p>
            <ul><li v-for="[title, slug] in category.links" :key="slug"><a :href="doc(slug)">{{ title }} <span aria-hidden="true">→</span></a></li></ul>
          </section>
        </div>
      </section>

      <aside class="home-help" aria-labelledby="help-title">
        <div><h2 id="help-title">Need a hand?</h2><p>Get help with your FluentSMTP setup.</p></div>
        <a class="home-text-link" href="https://wpmanageninja.com/support-tickets/">Contact support <span aria-hidden="true">↗</span></a>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.docs-home { --home-muted: var(--vp-c-text-2); color: var(--vp-c-text-1); }
.home-container { max-width: 1152px; margin: 0 auto; padding: 0 32px; }
.docs-hero { background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.hero-inner { padding-top: 76px; padding-bottom: 76px; }
.home-eyebrow { margin: 0 0 20px; color: var(--home-muted); font-size: 13px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; }
h1 { max-width: 820px; margin: 0; font-size: clamp(36px, 4.4vw, 56px); line-height: 1.12; font-weight: 650; letter-spacing: -.045em; }
.hero-description { margin: 24px 0 0; color: var(--home-muted); font-size: 18px; line-height: 1.65; }
.hero-actions { display: flex; align-items: center; gap: 28px; margin-top: 32px; }
.home-button { display: inline-flex; align-items: center; gap: 26px; padding: 12px 20px; border-radius: 6px; color: #fff; background: #9e0099; font-size: 14px; font-weight: 600; transition: background .18s; }
.home-button:hover { background: #7a0076; }
.home-text-link { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 550; }
a { text-decoration: none; }
a:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 5px; }
.home-text-link:hover, .start-steps a:hover, .doc-categories a:hover, .connection-note a:hover { color: var(--vp-c-brand-1); }
.home-start { padding: 36px 0 40px; border-bottom: 1px solid var(--vp-c-divider); }
.home-start .home-eyebrow { margin-bottom: 24px; font-size: 12px; }
ul, ol { padding: 0; margin: 0; list-style: none; }
.start-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.start-steps li { display: flex; gap: 16px; }
.step-number { color: var(--vp-c-brand-1); font-size: 13px; font-weight: 600; line-height: 26px; }
.start-steps a { font-size: 15px; font-weight: 600; }
.start-steps a span { margin-left: 5px; color: var(--home-muted); }
.start-steps p { margin: 6px 0 0; font-size: 13px; line-height: 1.6; color: var(--home-muted); }
.home-section { padding-top: 60px; scroll-margin-top: 96px; }
.section-heading { display: flex; justify-content: space-between; align-items: center; gap: 24px; margin-bottom: 28px; }
.section-heading h2 { margin: 0; font-size: 28px; line-height: 1.3; font-weight: 600; letter-spacing: -.025em; }
.section-heading p { margin: 10px 0 0; font-size: 15px; color: var(--home-muted); }
.provider-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.provider-link { position: relative; height: 150px; display: flex; flex-direction: column; justify-content: space-between; padding: 22px; border: 1px solid var(--vp-c-divider); border-radius: 8px; transition: border-color .18s, background .18s; }
.provider-link:hover { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); }
.provider-logo { display: flex; align-items: center; width: 136px; height: 44px; }
.provider-logo img { width: auto; height: auto; max-width: 128px; max-height: 36px; object-fit: contain; }
.provider-label { font-size: 14px; line-height: 20px; font-weight: 550; }
.provider-label small { display: block; font-size: 12px; font-weight: 400; color: var(--home-muted); }
.provider-arrow { position: absolute; right: 18px; bottom: 22px; color: var(--home-muted); transition: color .18s, transform .18s; }
.provider-link:hover .provider-arrow { color: var(--vp-c-brand-1); transform: translate(2px, -2px); }
.connection-note { color: var(--home-muted); font-size: 13px; margin: 20px 0 0; }
.connection-note a { text-decoration: underline; text-underline-offset: 3px; }
.browse-section { padding-bottom: 56px; }
.doc-categories { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; }
.doc-categories section { border-top: 2px solid var(--vp-c-divider); padding-top: 24px; }
.doc-categories h3 { margin: 0; font-size: 17px; font-weight: 600; }
.doc-categories p { color: var(--home-muted); font-size: 13px; line-height: 1.6; margin: 8px 0 18px; }
.doc-categories a { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 9px 0; font-size: 14px; line-height: 1.5; }
.doc-categories a span { color: var(--home-muted); }
.home-help { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 28px 0; margin-bottom: 44px; border-top: 1px solid var(--vp-c-divider); }
.home-help h2 { font-size: 18px; font-weight: 600; margin: 0; }
.home-help p { font-size: 14px; color: var(--home-muted); margin: 6px 0 0; }
:global(.dark .docs-home .provider-logo) { background: #fff; border-radius: 4px; padding: 6px 8px; }
:global(.dark .docs-home .provider-logo img) { max-width: 120px; max-height: 32px; }
@media (max-width: 959px) {
  .provider-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .start-steps { gap: 20px; }
  .start-steps li { gap: 10px; }
  .doc-categories { gap: 24px; }
}
@media (max-width: 639px) {
  .home-container { padding-left: 24px; padding-right: 24px; }
  .hero-inner { padding-top: 48px; padding-bottom: 48px; }
  .hero-description { font-size: 16px; }
  .desktop-break { display: none; }
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 20px; margin-top: 28px; }
  .start-steps { grid-template-columns: 1fr; gap: 22px; }
  .start-steps li { gap: 16px; }
  .home-section { padding-top: 40px; }
  .section-heading { align-items: flex-start; flex-direction: column; gap: 16px; margin-bottom: 24px; }
  .section-heading h2 { font-size: 25px; }
  .provider-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .provider-link { padding: 16px 12px; height: 142px; }
  .provider-logo { width: 114px; }
  .provider-logo img { max-width: 110px; max-height: 30px; }
  :global(.dark .docs-home .provider-logo img) { max-width: 98px; }
  .provider-arrow { display: none; }
  .provider-label { font-size: 13px; }
  .connection-note { line-height: 1.8; }
  .doc-categories { grid-template-columns: 1fr; gap: 28px; }
  .home-help { align-items: flex-start; flex-direction: column; gap: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; }
}
</style>
