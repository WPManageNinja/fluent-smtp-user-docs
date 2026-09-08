---
title: Setup Brevo Mailer with FluentSMTP
description: Create a Brevo (Sendinblue) v3 API key and connect it in FluentSMTP. The URL is still setting-up-sendinblue-mailer-in-fluent-smtp.
---

# Setup Brevo Mailer with FluentSMTP

Brevo used to be Sendinblue. The FluentSMTP tile still says Sendinblue in a few places. Same product. The Google-indexed URL for this article stays `setting-up-sendinblue-mailer-in-fluent-smtp`.

## In Brevo

1. Sign in at [app.brevo.com](https://app.brevo.com/).
2. Verify the sender domain (or a sender email).
3. Open [SMTP & API → API Keys](https://app.brevo.com/settings/keys/api).
4. **Generate a new API key**. Copy the **v3** key.

## In FluentSMTP

**Settings → FluentSMTP**, pick **Brevo** / Sendinblue.

- **From Email** that Brevo has verified.
- **API Key**.

Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

**Save Connection Settings**, send a test.
