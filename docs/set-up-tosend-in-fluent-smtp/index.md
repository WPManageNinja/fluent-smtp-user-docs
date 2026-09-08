---
title: Setup toSend with FluentSMTP
description: Verify a domain in toSend, create an API key, and connect it in FluentSMTP. Extra From addresses are supported.
---

# Setup toSend with FluentSMTP

[toSend](https://tosend.com/) is a transactional provider. If you do not have an account yet, you can [create one](https://tosend.com/?fluent-smtp=connect). Their WordPress notes also live at [tosend.com/docs/guide/wordpress](https://tosend.com/docs/guide/wordpress/).

## In toSend

1. Sign in at [dash.tosend.com](https://dash.tosend.com/).
2. Add the sending domain and publish the SPF, DKIM, and DMARC records they show. Wait until the domain is verified.
3. Open [API Keys](https://dash.tosend.com/app/api-keys) and create a key. Copy it. Keys look like `tosend_…` (or `tsend_…`). You only see the full key once.

## In FluentSMTP

**Settings → FluentSMTP**, pick **toSend** (first-run wizard or **Add Connection**).

- **From Email** must be on a domain you verified in toSend. Unverified domains are rejected.
- **From Name**, force flags, as usual.
- Paste the **API Key**.
- **Additional Sender Emails**: extra From addresses on verified domains. FluentSMTP checks them when you save.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, then send a test.

You can also add senders later from the connection row (**+N senders**) on Settings. Same rule: domain must already be verified in toSend.
