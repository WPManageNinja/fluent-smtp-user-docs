---
title: FluentSMTP Settings
description: General Settings, connection rows, Default, Fallback, logging, simulation, and extra senders.
---

# FluentSMTP Settings

Open **Settings** in the FluentSMTP top bar. The page has two columns: **Active Email Connections** on the left, **General Settings** on the right.

![Settings with one Amazon SES connection and General Settings](/images/settings.png)

Save General Settings with **Save Settings**. Connection changes are saved on the Add/Edit Connection screen with **Save Connection Settings**.

## General Settings

These apply to the whole site, not to one provider.

### Log Emails

On by default. FluentSMTP stores every outgoing message so you can search it, open it, and resend it. Turn this off only if you have a reason. Without logs you cannot see why a send failed.

If FluentCRM is active, **Exclude FluentCRM Emails** appears under this switch. FluentCRM already logs campaigns. Turning the exclusion on keeps those messages out of the FluentSMTP table and keeps the table smaller.

### Delete Logs

How long a logged email stays before FluentSMTP deletes it. Options run from 7 days to 2 years. Shorter is kinder to the database. Failed mail you still need to debug should be resent or exported before that window closes.

### Email Simulation

Stops delivery. Messages are still written to the log, marked as simulated. Use this on staging, or when you need to see what would have been sent without touching real inboxes.

If `FLUENTMAIL_SIMULATE_EMAILS` is defined in PHP, the switch does nothing. The constant wins.

### Plain Text Alternative (beta)

Adds a `text/plain` part next to HTML. Some clients still cannot show HTML. Leave this off unless you know you need it.

## Connection rows

Each row is one connection.

- The provider logo and the From address.
- A short note (region, "routes its own From address", and similar).
- **Default** if this is the connection everything else falls through to.
- **Fallback** if this is the backup when Default fails.
- Extra senders, on SES and toSend, as a **+N senders** mark you can click.
- **Edit** (pencil) opens the form.
- **Actions** (three dots): Set as Default, Set as Fallback, View, Delete.

You cannot set the same connection as both Default and Fallback. You cannot set a Fallback until there is more than one connection.

**View** opens the connection details (From address, name, whether the token is still valid). **Delete** removes the connection. Mail that used that From address will then go through Default, or fail if nothing is left.

## Default, Fallback, and extra From addresses

Mail sent from a connection's own From address always goes through that connection. Everything else goes through the Default. If Default fails, FluentSMTP tries the Fallback.

That sentence also appears under the list once you have more than one connection. Full walkthrough: [Multiple SMTP Connections & Auto Routing](/using-multiple-smtp-drivers-with-fluent-smtp/).

SES and toSend can send as more than one From address on the same connection. Click **+N senders** (or **Manage additional sender addresses**) on the row. Addresses have to be on a domain that provider has already verified.

## Force From Email and Force Sender Name

These live on each connection form, under **Sender Settings**, not on General Settings. Gmail, Outlook, and Cloudflare do not show **Force From Email**. Those connections send as the mailbox you authenticate.

- **Force From Email (recommended)**: any mail that is not already routed to another connection is sent from this address, whatever From the sending plugin set.
- **Force Sender Name**: the From Name on this connection is used, whatever name the sending plugin set.
- **Set the return-path to match the From Email**: bounce notices go back to this address, when the provider honours Return-Path.

## Where secrets are stored

Leave **Store in Database** selected. That is the default. You paste the key (or password) on the form. FluentSMTP encrypts it with your WordPress SALT keys, then saves it. Most sites should stop there.

The same form still lets you change that:

1. **Store in Database**, encryption on (default). The field help text says the value is encrypted with your WordPress SALT keys before it is saved.
2. **Store in Database**, with **Disable Encryption** ticked. The secret is stored as readable text. The checkbox is labeled not recommended. Use it only if a security plugin rotates SALT keys and the encrypted value keeps breaking.
3. **Store in wp-config.php**. The key fields disappear. The form shows the `define()` lines for that provider. Paste them into `wp-config.php` above `That's all, stop editing!`. Use this when you do not want the secret in the database at all.

None of those extra steps are required. Pick **Store in Database**, leave encryption on, paste the key, save.

If you do choose wp-config, the form is the source of truth for the constant names. They look like this:

| Connection | Constants |
| --- | --- |
| Other SMTP | `FLUENTMAIL_SMTP_USERNAME`, `FLUENTMAIL_SMTP_PASSWORD` |
| toSend | `FLUENTMAIL_TOSEND_API_KEY` |
| Amazon SES | `FLUENTMAIL_AWS_ACCESS_KEY_ID`, `FLUENTMAIL_AWS_SECRET_ACCESS_KEY` |
| Mailgun | `FLUENTMAIL_MAILGUN_API_KEY`, `FLUENTMAIL_MAILGUN_DOMAIN` |
| SendGrid | `FLUENTMAIL_SENDGRID_API_KEY` |
| Brevo (Sendinblue) | `FLUENTMAIL_SENDINBLUE_API_KEY` |
| SparkPost | `FLUENTMAIL_SPARKPOST_API_KEY` |
| Netcore (Pepipost) | `FLUENTMAIL_PEPIPOST_API_KEY` |
| Postmark | `FLUENTMAIL_POSTMARK_API_KEY` |
| Elastic Email | `FLUENTMAIL_ELASTICMAIL_API_KEY` |
| SMTP2GO | `FLUENTMAIL_SMTP2GO_API_KEY` |
| Gmail | `FLUENTMAIL_GMAIL_CLIENT_ID`, `FLUENTMAIL_GMAIL_CLIENT_SECRET` |
| Outlook | `FLUENTMAIL_OUTLOOK_CLIENT_ID`, `FLUENTMAIL_OUTLOOK_CLIENT_SECRET` |
| Cloudflare | `FLUENTMAIL_CLOUDFLARE_API_KEY`, `FLUENTMAIL_CLOUDFLARE_ACCOUNT_ID` |
