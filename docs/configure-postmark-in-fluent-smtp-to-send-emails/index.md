---
title: Configure Postmark in FluentSMTP
description: Use a Postmark server API token, pick a message stream, and optionally track opens and links.
---

# Configure Postmark in FluentSMTP

## In Postmark

1. Sign in at [account.postmarkapp.com](https://account.postmarkapp.com/).
2. Open the **Server** you send transactional mail from (not the account-wide token unless you know you want that).
3. **API Tokens** tab. Copy a server token.
4. Confirm the From domain (or sender signature) is verified.
5. Note the **Message Stream** ID. Default is `outbound`.

The plugin points at [Postmark servers](https://account.postmarkapp.com/servers).

## In FluentSMTP

**Settings → FluentSMTP**, pick **Postmark**.

- **From Email** on a verified signature / domain.
- **API Key**: the server token.
- **Message Stream**: usually `outbound`. Use another stream if you created one on purpose.
- **Track Opens** and **Track Links**: optional. HTML only. They add Postmark tracking.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.
