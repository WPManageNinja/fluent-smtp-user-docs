---
title: Amazon or AWS SES with FluentSMTP
description: Create an IAM user, verify a domain, leave the SES sandbox, then connect Amazon SES to FluentSMTP.
---

# Amazon or AWS SES with FluentSMTP

Connect WordPress to Amazon Simple Email Service (SES) using an IAM access key and a verified sender domain. This guide limits the plugin’s sending permission to your chosen domain.

## Open the SES connection

**Settings → FluentSMTP**, pick **Amazon SES**, or **Add Connection** then that tile.

Fill **Sender Settings**. **From Email** must be on a domain (or exact address) SES has verified in the same region you pick.

On **Amazon SES API Settings** you need:

- Access Key
- Secret Key
- Region (must match the SES region where the identity is verified)

## Verify the identity in SES first

1. Open [Amazon SES](https://console.aws.amazon.com/ses/) in the region you will use (top-right region picker).
2. **Identities → Create identity**.
3. Choose **Domain** and enter your sending domain. Keep Easy DKIM enabled, create the identity, then add the DNS records SES provides at your DNS host. If the domain is already verified in this region, open its identity instead.
4. Wait until the identity is **Verified** and DKIM shows **Successful**.

![SES identity summary showing a verified domain and its AWS region](/images/amazon-ses-verified-domain.png)

![SES Authentication tab showing successful DKIM verification and enabled signatures](/images/amazon-ses-dkim.png)

These screenshots use `wpmanageninja.com` in US East (N. Virginia). Use your own domain and its SES region.

If the account banner says you are in the sandbox, request production access (**Account dashboard → Request production access**). Until AWS approves it, SES will refuse mail to anyone you have not verified.

## Create an IAM user

1. Open the [IAM console](https://console.aws.amazon.com/iam/), then **IAM users → Create user**.
2. Enter a name such as `fluentsmtp-ses`. Leave **Provide user access to the AWS Management Console** unchecked.
3. Choose **Next**. On **Set permissions**, continue without selecting a group or policy. You will add the inline policy directly to the user in the next step.
4. Review the details and choose **Create user**, then open the new user.

![Creating an IAM user with console access left disabled](/images/amazon-ses-iam-user.png)

## Add an inline policy

An inline policy belongs directly to this IAM user, so there is no separate policy to create and attach.

FluentSMTP connects through the **SES API**. Use IAM access keys, not the SMTP username and password from SES SMTP settings.

The Amazon SES provider uses these three actions:

| Permission | Why FluentSMTP needs it |
| --- | --- |
| `ses:SendRawEmail` | Sends WordPress emails, including HTML and attachments. |
| `ses:ListIdentities` | Checks the connection and lists identities for sender addresses. |
| `ses:GetSendQuota` | Reads the sending limit, send rate, and recent usage. |

You do not need `AmazonSESFullAccess`, `ses:SendEmail`, or permission to create or delete SES identities.

1. Open the user’s **Permissions** tab, then choose **Add permissions → Create inline policy**.
2. Select **JSON** and replace the editor contents with the policy below.
3. Replace `us-east-1` with your SES region, `123456789012` with your AWS account ID, and **both** occurrences of `example.com` with your verified domain. You can copy the identity ARN from the SES identity's **Summary**.
4. Choose **Next**, name the policy `FluentSMTP-SendFromDomain`, and choose **Create policy**. It is saved directly on this user.

![Permissions tab with Create inline policy in the Add permissions menu](/images/amazon-ses-inline-policy-menu.png)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SendFromVerifiedDomain",
      "Effect": "Allow",
      "Action": "ses:SendRawEmail",
      "Resource": "arn:aws:ses:us-east-1:123456789012:identity/example.com",
      "Condition": {
        "StringLike": {
          "ses:FromAddress": "*@example.com"
        }
      }
    },
    {
      "Sid": "ReadConnectionDetails",
      "Effect": "Allow",
      "Action": [
        "ses:ListIdentities",
        "ses:GetSendQuota"
      ],
      "Resource": "*"
    }
  ]
}
```

![IAM JSON editor with the domain-restricted sending policy and two read permissions](/images/amazon-ses-domain-policy.png)

The sending statement limits this grant to the specified identity, region, and From domain. For example, with `wpmanageninja.com` in both places, it allows `support@wpmanageninja.com` but not an address on another domain or subdomain. To permit just one sender, replace `*@example.com` with an exact address such as `support@example.com`.

The read statement needs `Resource: "*"` because those actions cannot be limited to a domain identity. It can list other identities in the account, but does not grant permission to send from them. AWS documents this separation in [Identity and access management in Amazon SES](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html).

![Reviewing the inline policy before saving it on the IAM user](/images/amazon-ses-inline-policy-review.png)

::: tip Use a dedicated IAM user
Keep this as the user’s only policy. Another attached policy or group could grant wider sending access; an Allow statement here does not override those other grants.
:::

### If your identity uses a configuration set

Open the SES identity’s **Configuration set** tab. If it has a default configuration set, replace the sending statement’s `Resource` value with an array containing **both** the identity ARN and that configuration set’s ARN:

```json
"Resource": [
  "arn:aws:ses:us-east-1:123456789012:identity/example.com",
  "arn:aws:ses:us-east-1:123456789012:configuration-set/YourConfigurationSet"
]
```

This is a replacement for the `Resource` field inside the first statement, not a complete policy. Keep `ses:SendRawEmail` and the `ses:FromAddress` condition unchanged. Replace the region, account ID, domain, and configuration-set name with your own values.

Our demo domain uses `WPManageNinjaConfig`, so its policy also includes that exact configuration-set ARN. Without it, SES rejects the send with **AccessDenied** naming the `configuration-set/...` resource, even though FluentSMTP can save the connection.

## Create an access key

1. On the same IAM user, open **Security credentials → Create access key**.
2. For a WordPress site hosted outside AWS, select **Application running outside AWS** and follow the prompts. Add an optional description, then create the key.
3. Copy the **Access key ID** and **Secret access key** into FluentSMTP. AWS shows the secret only once; keep it private.

![IAM access-key wizard with Application running outside AWS selected](/images/amazon-ses-access-key.png)

Do not create root account access keys for the plugin. The access key belongs to the IAM user; the SES identity and sending limits belong to the selected region.

## Save in FluentSMTP

Leave **Store in Database** selected. Paste Access Key and Secret Key, pick the region, **Save Connection Settings**. FluentSMTP will check the credentials. Keep **Disable Encryption for Secret Key** unchecked. You can also choose **Store in wp-config.php** instead. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

![Saved Amazon SES connection with encrypted credentials hidden and matching AWS region](/images/amazon-ses-connection.png)

Open **Send Test Email**, select the new connection’s From address, enter an inbox you control, and send the test. Confirm that it arrives. Saving a connection checks read access; the test also checks permission to send.

## Extra From addresses

SES can send as more than one address on the same connection, on the verified domain. On **Settings**, the row shows **+N senders**. Click it and add addresses. They must match both the verified domain and your IAM policy. Adding a sender in FluentSMTP does not expand its AWS permissions.

## If mail fails

- **Email address is not verified** (sandbox): verify the recipient, or get production access.
- **MessageRejected / Email address not verified**: From domain is not verified in this region.
- **AccessDenied**: confirm the IAM policy includes all three actions above. For sending failures, check the identity ARN, region, and `ses:FromAddress` condition against the actual From address. A successful connection check does not prove sending is permitted.
- **InvalidClientTokenId**: wrong key, or key from a different account.
- Region mismatch: identity in `eu-west-1`, FluentSMTP set to `us-east-1`.
