---
title: Configure SMTP2GO in FluentSMTP to Send Emails
description: Create an SMTP2GO API key and connect it in FluentSMTP.
---

# Configure SMTP2GO in FluentSMTP to Send Emails

## In SMTP2GO

1. Sign in at SMTP2GO.
2. Verify the sending domain.
3. Create an API key. The plugin links to [EU API keys](https://app-eu.smtp2go.com/sending/apikeys/). If your account is in another region, open Sending → API Keys from your own dashboard instead.

## In FluentSMTP

**Settings → FluentSMTP**, pick **SMTP2GO**.

- **From Email** on the verified domain.
- **API Key**.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.
