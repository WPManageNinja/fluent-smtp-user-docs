---
title: Configure SparkPost with FluentSMTP
description: Create a SparkPost API key and connect it in FluentSMTP.
---

# Configure SparkPost with FluentSMTP

## In SparkPost

1. Sign in at [SparkPost](https://app.sparkpost.com/account/api-keys).
2. Verify a sending domain.
3. Create an API key with **Transmissions: Read/Write** (mail send). Copy it.

FluentSMTP sends to `api.sparkpost.com`. If your account is SparkPost EU only, talk to SparkPost about US API access, or use [Other SMTP](/set-up-fluent-smtp-with-any-host-or-mailer/) with the SMTP credentials they give you.

## In FluentSMTP

**Settings → FluentSMTP**, pick **SparkPost**.

- **From Email** on the verified domain.
- **API Key**.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.
