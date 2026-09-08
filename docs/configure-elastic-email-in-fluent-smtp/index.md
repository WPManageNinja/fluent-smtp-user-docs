---
title: Configure Elastic Email with FluentSMTP
description: Create an Elastic Email API key, pick transactional or marketing, and connect FluentSMTP.
---

# Configure Elastic Email with FluentSMTP

## In Elastic Email

1. Sign in at Elastic Email.
2. Verify the sending domain.
3. Create an API key from [Manage API](https://elasticemail.com/account#/settings/new/manage-api). Copy it.

## In FluentSMTP

**Settings → FluentSMTP**, pick **Elastic Email**.

- **From Email** on the verified domain.
- **API Key**.
- **Email Type**: **Transactional** for site mail (forms, resets). **Marketing** only if that is actually what this connection is for.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.
