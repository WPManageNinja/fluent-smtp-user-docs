---
title: Configure Mailgun with FluentSMTP
description: Add a verified Mailgun domain, copy a private API key, pick US or EU, and save the connection in FluentSMTP.
---

# Configure Mailgun with FluentSMTP

Mailgun needs a **verified sending domain** and a **private API key**. The region in FluentSMTP must match the region of that domain (US or EU).

## In Mailgun

1. Sign in at [app.mailgun.com](https://app.mailgun.com/).
2. Add and verify a domain under [Sending → Domains](https://app.mailgun.com/mg/sending/domains). Publish the DNS records Mailgun shows.
3. Open [API security](https://app.mailgun.com/settings/api_security). Create a Mailgun API key (not the webhook signing key, not the verification public key). Copy it once.

EU domains live in the EU region. Everyone else is usually US. Wrong region looks like "domain not found" when you save.

## In FluentSMTP

**Settings → FluentSMTP**, pick **Mailgun**, or **Add Connection** → Mailgun.

- **From Email** on the verified domain.
- **Private API Key**.
- **Domain Name**: the sending domain, for example `mg.example.com` or `example.com`, exactly as Mailgun lists it.
- **Select Region**: US or EU.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, then send a test.

The plugin's key link is [app.mailgun.com/settings/api_security](https://app.mailgun.com/settings/api_security). Mailgun moves that UI occasionally. If the link 404s, open Account → API Security from the dashboard.
