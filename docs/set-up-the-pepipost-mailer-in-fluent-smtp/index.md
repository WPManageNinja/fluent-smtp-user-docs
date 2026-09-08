---
title: Set Up the Netcore Mailer in FluentSMTP
description: Connect Netcore Email API (formerly Pepipost) with an API key. The URL is still set-up-the-pepipost-mailer-in-fluent-smtp.
---

# Set Up the Netcore Mailer in FluentSMTP

Netcore Email API used to be Pepipost. The Google URL for this article is still `set-up-the-pepipost-mailer-in-fluent-smtp`. The tile in FluentSMTP says **Netcore**.

## In Netcore

1. Sign in to the Netcore Email API dashboard.
2. Verify the sending domain.
3. Open **Settings → Integrations** (or **API**) and copy the API key.

## In FluentSMTP

**Settings → FluentSMTP**, pick **Netcore**.

- **From Email** that Netcore has verified.
- **API Key**.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. If you do use wp-config, the constant is still named `FLUENTMAIL_PEPIPOST_API_KEY`. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.
