---
title: Amazon or AWS SES with FluentSMTP
description: Create an IAM user, verify a domain, leave the SES sandbox, then connect Amazon SES to FluentSMTP.
---

# Amazon or AWS SES with FluentSMTP

SES is cheap and built for this. The two things that generate tickets are: the AWS account is still in the **sandbox** (you can only send to verified addresses), and the From domain is not verified in SES.

## Open the SES connection

**Settings → FluentSMTP**, pick **Amazon / AWS**, or **Add Connection** then that tile.

Fill **Sender Settings**. **From Email** must be on a domain (or exact address) SES has verified in the same region you pick.

On **Amazon SES API Settings** you need:

- Access Key
- Secret Key
- Region (must match the SES region where the identity is verified)

## Verify the identity in SES first

1. Open [Amazon SES](https://console.aws.amazon.com/ses/) in the region you will use (top-right region picker).
2. **Identities → Create identity**.
3. Verify a **Domain** (recommended) with the DKIM records SES shows. Verifying only one email address is enough for tests, not for a real site.
4. Wait until the identity is **Verified**.

If the account banner says you are in the sandbox, request production access (**Account dashboard → Request production access**). Until AWS approves it, SES will refuse mail to anyone you have not verified.

## Create an IAM user for sending

Do not use the root account keys.

1. [IAM console](https://console.aws.amazon.com/iam/) → **Users → Create user**.
2. Name: `fluentsmtp-ses` (no console password needed).
3. **Attach policies directly**. Search `AmazonSESFullAccess` and attach it. That is broader than the minimum. If you want a tighter policy, allow `ses:SendEmail` and `ses:SendRawEmail` on `*`, plus identity read if you use extra senders.
4. Create the user → **Security credentials → Create access key**.
5. Use case: **Other** (or Application running outside AWS). Create. Copy **Access key** and **Secret access key**. The secret is shown once.

The region in FluentSMTP must be the same region as the verified identity. A key is global. The identity is not.

## Save in FluentSMTP

Leave **Store in Database** selected. Paste Access Key and Secret Key, pick the region, **Save Connection Settings**. FluentSMTP will check the credentials. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

Send a test to an inbox you control.

## Extra From addresses

SES can send as more than one address on the same connection, on the verified domain. On **Settings**, the row shows **+N senders**. Click it and add addresses. They must match the verified domain.

## If mail fails

- **Email address is not verified** (sandbox): verify the recipient, or get production access.
- **MessageRejected / Email address not verified**: From domain is not verified in this region.
- **InvalidClientTokenId**: wrong key, or key from a different account.
- Region mismatch: identity in `eu-west-1`, FluentSMTP set to `us-east-1`.
