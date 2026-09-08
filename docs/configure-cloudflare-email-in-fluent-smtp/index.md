---
title: Configure Cloudflare Email with FluentSMTP
description: Enable Email Sending on a Cloudflare domain, create an API token, and connect Cloudflare Email in FluentSMTP.
---

# Configure Cloudflare Email with FluentSMTP

You need a Cloudflare account where the sending domain is added, with **Email Sending** enabled and SPF / DKIM / DMARC published. Until that is done, the API will refuse mail.

## Create an API token

1. Open [Cloudflare API Tokens](https://dash.cloudflare.com/?to=/:account/api-tokens). If you have several accounts, pick the one that owns the domain.
2. **Create Token**.
3. Permission policies: **Custom**.
4. Add a policy scoped to **Entire Account**.
5. Resource: **Email & Messaging → Email Sending**. Enable **Read** and **Edit**.
6. Continue, create, copy the token once.

Copy the **Account ID** from the Cloudflare dashboard (right sidebar on the account overview, or the URL).

## In FluentSMTP

**Settings → FluentSMTP → Add Connection** (or the wizard). Pick **Cloudflare**.

![Cloudflare Email connection form with token steps, API Token, and Account ID](/images/cloudflare-connection.png)

- **From Email** on the verified sending domain.
- **API Token**.
- **Cloudflare Account ID**.

The form repeats the token steps in an info box. Follow those labels if Cloudflare has moved the dashboard.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, then send a test.

If save fails, the token is missing Email Sending, or the domain is not enabled for sending on that account.
