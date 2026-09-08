---
title: Setup the SendGrid Driver with FluentSMTP
description: Create a SendGrid API key with Mail Send permission and connect it in FluentSMTP.
---

# Setup the SendGrid Driver with FluentSMTP

## In SendGrid

1. Sign in at [app.sendgrid.com](https://app.sendgrid.com/).
2. Verify a Sender Identity (domain authentication is better than a single sender).
3. **Settings → API Keys → Create API Key**. Name it `FluentSMTP`. Permission: **Restricted Access** with **Mail Send** enabled is enough. Full Access also works, and is more than you need.
4. Copy the key once.

## In FluentSMTP

**Settings → FluentSMTP**, pick **SendGrid**.

- **From Email** must be allowed by that SendGrid account (authenticated domain or verified sender).
- Paste the **API Key**.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.

The form links to [Create API Key](https://app.sendgrid.com/settings/api_keys).
