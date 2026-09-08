---
title: Choose an email service
pageClass: provider-comparison
description: Compare FluentSMTP providers by price, free allowance, and use case. Find the right service for WordPress notifications, store emails, or newsletters.
---

# Choose an email service

FluentSMTP is free. The email service you connect handles delivery and sets the sending price and limits. Choose based on what your site sends, how often it sends, and how much setup you want to manage.

## Our recommendation: toSend

::: tip A good starting point for WordPress sites
**toSend is our email delivery service, from the team behind FluentSMTP.** We recommend it for contact-form notifications, password resets, WooCommerce emails, and sites with growing or uneven sending volume.

Its published rate is **$0.30 per 1,000 emails**—that's **$3 for 10,000**—with no monthly minimum. Unlimited sending domains and all features are included. The first 10,000 emails are free; this is an introductory allowance, not a monthly free plan.

[Set up toSend →](/set-up-tosend-in-fluent-smtp/) · [View pricing and sign up](https://tosend.com/#pricing)
:::

For example, at that rate, 5,000 emails cost $1.50 and 50,000 cost $15, before introductory credits. You pay for usage rather than a monthly email bundle. The public site currently labels signup as early access; check availability when you register.

## Choose by how you send

- **A business site, WooCommerce store, or membership site:** start with [toSend](/set-up-tosend-in-fluent-smtp/). A dedicated delivery service is our recommendation when customers depend on receipts, account emails, and password resets.
- **A small site sending a few messages a day:** an existing Gmail or Microsoft mailbox can be enough. Keep sending comfortably below its limits and allow room for your normal mailbox traffic. See [mailbox limitations](#why-not-gmail-or-microsoft-for-lots-of-email).
- **The lowest raw sending cost, with technical setup:** consider [Amazon SES](/set-up-amazon-ses-in-fluent-smtp/). You manage AWS permissions, domain verification, and production access yourself.
- **Newsletters or campaigns:** use a dedicated provider that permits your type of marketing email, such as toSend or Brevo, together with a newsletter tool that manages subscribers and unsubscribes. FluentSMTP handles delivery; it does not manage a mailing list.
- **Already happy with a provider:** connect it below. You do not need to switch services to use FluentSMTP.

## Compare provider pricing

**Pricing checked September 8, 2026.** Amounts are in USD. Monthly subscriptions below use monthly billing unless noted. These are entry options, not equivalent feature packages. Taxes, overages, attachments, optional features, and account approval can affect the final cost. Each row links to the provider's source so you can check before signing up.

### Dedicated email services

| Provider & setup guide | Free option and starting price | When to consider it |
| --- | --- | --- |
| **[toSend](/set-up-tosend-in-fluent-smtp/)** · Our recommendation | First **10,000 emails free**, then **$0.30/1,000**. No monthly minimum. [Pricing](https://tosend.com/#pricing) | WordPress sites, stores, and agencies wanting usage-based pricing and a direct FluentSMTP connection. |
| [Amazon SES](/set-up-amazon-ses-in-fluent-smtp/) | **$0.10/1,000** for à-la-carte outbound sending; Essentials starts at **$0.16/1,000**. Attachment data and extras are additional. [Pricing](https://aws.amazon.com/ses/pricing/) | Technical users prioritizing low sending costs and comfortable managing AWS. New accounts start on Essentials; you can switch to à-la-carte. |
| [Mailgun](/configure-mailgun-in-fluent-smtp-to-send-emails/) | Free: **100/day**. Basic: **$15/month for 10,000**. [Pricing](https://www.mailgun.com/pricing/) | Teams using email APIs, webhooks, and inbound routes. Basic includes one sending domain and one day of logs. |
| [SendGrid](/set-up-the-sendgrid-driver-in-fluent-smtp/) | Trial: **100/day for 60 days**. Essentials: **$19.95/month for 50,000**. [Pricing](https://www.twilio.com/en-us/products/email-api/pricing) | Sites already using Twilio SendGrid or needing its templates and delivery tooling. The trial is time-limited. |
| [Brevo](/setting-up-sendinblue-mailer-in-fluent-smtp/) | Free: **300/day**. Starter: **from $9/month for 5,000**. Prepaid credits are also available. [Plans](https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans) | Sites wanting marketing tools and transactional sending in one account. Check contact limits and branding options as well as email volume. |
| [Postmark](/configure-postmark-in-fluent-smtp-to-send-emails/) | Free: **100/month**. Basic: **$15/month for 10,000**. [Pricing](https://postmarkapp.com/pricing) | Teams wanting detailed email history: Basic includes 45-day retention and five sending domains. |
| [SMTP2GO](/configure-smtp2go-in-fluentsmtp-to-send-emails/) | Free: **1,000/month**, capped at **200/day**. Starter: **10,000/month**; confirm the paid price at signup (public listings differ between $10 and $15/month). [Pricing](https://www.smtp2go.com/pricing/) · [Free limits](https://support.smtp2go.com/hc/en-gb/articles/223087947-Free-Plan) | Small sites starting with a recurring free allowance, or teams also connecting devices and other SMTP applications. |
| [Elastic Email](/configure-elastic-email-in-fluent-smtp/) | Free: **3,000/month**, with a **100/day** limit. Email API Starter: **$19/month for 50,000**. [Pricing](https://elasticemail.com/email-api-pricing) | Sites sending enough email to use a larger monthly bundle. Choose the Email API product when comparing delivery costs. |
| [Cloudflare Email](/configure-cloudflare-email-in-fluent-smtp/) | Workers Paid required: **3,000/month included**, then **$0.35/1,000**, plus the **$5/month** Workers subscription and any other Workers usage. [Email pricing](https://developers.cloudflare.com/email-service/platform/pricing/) · [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) | Sites already using Workers Paid. Sending is currently labeled beta; free inbound Email Routing is a separate feature. |

**A daily allowance is not a monthly pool.** For example, 300 free emails per day will not cover a 1,000-email campaign sent on one day. Include busy days, retries, and emails to multiple recipients when estimating your needs.

### Existing SparkPost and Netcore accounts

| Provider & setup guide | Pricing option | When to consider it |
| --- | --- | --- |
| [SparkPost](/configure-sparkpost-in-fluent-smtp-to-send-emails/) | Check your SparkPost account or request current terms from the provider. We could not verify a current public price for the legacy SparkPost connection. [Bird email pricing](https://bird.com/products/email/pricing) | Existing SparkPost users. Confirm that a new plan supports the SparkPost API used by FluentSMTP before buying; Bird plans should not be assumed interchangeable. |
| [Netcore / Pepipost](/set-up-the-pepipost-mailer-in-fluent-smtp/) | Ask Netcore for current Email API pricing and trial availability; no verified public entry price is listed here. [Netcore Email API](https://www.netcorecloud.com/email/email-api/) | Existing Netcore users or teams arranging a plan around their sending volume. |

### Mailboxes and other SMTP hosts

| Provider & setup guide | Pricing option | When to consider it |
| --- | --- | --- |
| [Gmail / Google Workspace](/connect-gmail-or-google-workspace-emails-with-fluentsmtp/) | Use an existing mailbox. Personal Gmail has a free option; custom-domain Workspace email requires a subscription. [Workspace plans](https://workspace.google.com/pricing/) | A few site notifications a day. Avoid newsletters, large bursts, and high-volume automated email through this mailbox connection. |
| [Outlook / Microsoft 365](/configure-fluentsmtp-with-microsoft-outlook-office/) | Use an existing mailbox. Personal Outlook.com has a free option; business email requires a suitable paid plan. [Microsoft 365 plans](https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-plans-and-pricing) | Low-volume site notifications using an existing Microsoft account. Avoid bulk and high-volume transactional sending. |
| [Other SMTP](/set-up-fluent-smtp-with-any-host-or-mailer/) | Set by your host or mail service; sometimes included with hosting. | Any provider that supplies SMTP credentials. Suitability depends on the underlying service: a hosting mailbox and a dedicated SMTP relay can have very different limits. |

## Why not Gmail or Microsoft for lots of email?

Gmail and Microsoft mailboxes are useful for everyday correspondence. Their sending quotas also apply when FluentSMTP sends through the connected account. Your website and your regular mailbox activity share that capacity; using an API connection does not turn it into an unlimited sending service.

Google documents sending limits for [personal Gmail](https://support.google.com/mail/answer/22839?hl=en) and [Google Workspace](https://support.google.com/a/answer/166852). Personal Gmail can stop sending after more than 500 messages in a day, and recovery can take 1–24 hours. Treat that as a ceiling, not a target for website traffic. Workspace limits depend on the account and sending method.

Microsoft explicitly recommends specialized providers for bulk commercial email and explains that Exchange Online throttles messages when sending rates are exceeded. See [Microsoft's sending limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits#sending-limits).

For a busy store, a membership launch, or a newsletter, choose a dedicated sending service such as toSend. Keep your Google or Microsoft inbox for reading and replying to email—you can use a separate delivery service for your site's authenticated domain email without moving that inbox.

## Connect your chosen provider

Go to **WordPress → Settings → FluentSMTP**. If nothing is connected yet, the setup wizard opens. Otherwise, open **Settings** in the top bar and click **Add Connection**.

![Provider picker on Add Connection](/images/add-connection.png)

Pick your provider's logo and follow its setup guide above. Use **Other SMTP** when your provider supplies SMTP credentials. The **php** option uses the server's `mail()` function; it is not a separate delivery service and does not fix email delivery by itself.

After saving the connection, use **Send Test Email** and check the receiving inbox. If you need different providers for different From addresses, see [multiple connections and routing](/using-multiple-smtp-drivers-with-fluent-smtp/).
