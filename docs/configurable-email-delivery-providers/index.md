---
title: Configurable Email Delivery Providers
description: Which FluentSMTP connection to pick, and when to use API vs SMTP.
---

# Configurable Email Delivery Providers

After FluentSMTP is active, it asks you to add a connection. That is the email service that will actually send the mail WordPress generates.

Go to **Settings → FluentSMTP**. If nothing is connected yet, you are on the wizard. If a connection already exists, open **Settings** in the top bar and click **Add Connection**.

![Provider picker on Add Connection](/images/add-connection.png)

Pick the logo for the service you use. Each tile is a native API connection except **Other SMTP** (any host that gives you SMTP) and **php** (`mail()`). PHP mail does not improve delivery. Do not pick it unless you are testing that PHP can send at all.

## Which one should you use?

Use a transactional email API when you can. They are faster and easier to keep out of spam than a mailbox on cPanel.

| If you have… | Use this |
| --- | --- |
| toSend | [toSend](/set-up-tosend-in-fluent-smtp/) |
| Amazon SES | [Amazon SES](/set-up-amazon-ses-in-fluent-smtp/) |
| Google Workspace or a Gmail mailbox | [Gmail / Google Workspace](/connect-gmail-or-google-workspace-emails-with-fluentsmtp/) |
| Outlook, Hotmail, or Microsoft 365 | [Outlook / Office 365](/configure-fluentsmtp-with-microsoft-outlook-office/) |
| Cloudflare Email Sending | [Cloudflare Email](/configure-cloudflare-email-in-fluent-smtp/) |
| Mailgun | [Mailgun](/configure-mailgun-in-fluent-smtp-to-send-emails/) |
| SendGrid | [SendGrid](/set-up-the-sendgrid-driver-in-fluent-smtp/) |
| Brevo (formerly Sendinblue) | [Brevo](/setting-up-sendinblue-mailer-in-fluent-smtp/) |
| Postmark | [Postmark](/configure-postmark-in-fluent-smtp-to-send-emails/) |
| SMTP2GO | [SMTP2GO](/configure-smtp2go-in-fluentsmtp-to-send-emails/) |
| SparkPost | [SparkPost](/configure-sparkpost-in-fluent-smtp-to-send-emails/) |
| Elastic Email | [Elastic Email](/configure-elastic-email-in-fluent-smtp/) |
| Netcore Email API (formerly Pepipost) | [Netcore](/set-up-the-pepipost-mailer-in-fluent-smtp/) |
| Only a host mailbox, Zoho, or anything with SMTP | [Any SMTP host](/set-up-fluent-smtp-with-any-host-or-mailer/) |

Gmail and Outlook are fine for password resets and a few contact-form messages a day. They are a poor choice for newsletters or anything that looks like marketing. Google and Microsoft will throttle or close the account. Use SES, Mailgun, Postmark, toSend, or another transactional provider for volume.

You can connect more than one service. FluentSMTP then routes by From address. See [multiple connections](/using-multiple-smtp-drivers-with-fluent-smtp/).
