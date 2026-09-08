---
title: FluentSMTP Email Logs Feature
description: Filter, search, open, and resend WordPress email from FluentSMTP's Email Logs screen.
---

# FluentSMTP Email Logs Feature

Email Logs is every message FluentSMTP recorded. It is a top-bar destination of its own. It is not buried under Settings.

Logging must be on. That switch is **Log Emails** on [Settings](/fluent-smtp-settings/). If it is off, the logs screen tells you and offers **Turn On**.

![Email Logs with All / Sent / Failed, date filter, search, and resend](/images/email-logs.png)

## What you can do

- **All / Sent / Failed**: Failed is what you want after a support ticket about missing mail.
- **Date range** then **Filter**.
- **Search logs**: subject, recipient, and similar fields.
- **Refresh**.
- Click a **Subject** (or the view action) to open the message: body, headers, attachments, server response.
- **Resend** on a row, or bulk resend after selecting rows. Failed mail is the usual case. You can also resend something that already went out.
- **Delete** selected rows. There is a bulk delete as well.

Simulated messages are marked **Simulated**. They never left the site. See Email Simulation in Settings.

## Reading a failure

Open the log. The red **Why it failed** line and the **Server Response** block are the provider's words, not a FluentSMTP invention.

![Failed log with Why it failed and the Amazon SES not-verified message](/images/email-log-viewer.png)

"Email address is not verified" on SES is sandbox, or a From that SES has not verified in that region. `401` from Mailgun is a bad key. Use that text, not a guess.

Resend after you fix the cause (verify the domain, fix the key, leave sandbox). Resending the same broken config just writes another failed row.

Logs older than **Delete Logs** on Settings are gone. If you need a longer history, raise that number before the window closes.
