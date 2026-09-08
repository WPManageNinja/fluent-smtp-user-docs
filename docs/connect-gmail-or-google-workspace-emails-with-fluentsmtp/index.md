---
title: Connect Gmail or Google Workspace With FluentSMTP
description: Create a Google Cloud OAuth client, add https://fluentsmtp.com/gapi/ as the redirect URI, then authenticate FluentSMTP.
---

# Connect Gmail or Google Workspace With FluentSMTP

Use this when the From address is a Gmail or Google Workspace mailbox. FluentSMTP talks to Google over OAuth. It does not store your Google password.

Gmail and Workspace are not a marketing ESP. Free Gmail is a few hundred messages a day. Workspace is higher, still not "blast a list." For volume, use SES, Mailgun, Postmark, or toSend.

## Open the Gmail connection

1. Go to **Settings → FluentSMTP**.
2. If this is the first connection, pick **Gmail or Google Workspace**.
3. If you already have a connection, open **Settings**, click **Add Connection**, then pick **Gmail or Google Workspace**.

You will fill **Sender Settings** first:

- **From Email**: the Google address that will send. It must be the same account you approve on Google's consent screen.
- **From Name**: what recipients see.
- **Set the return-path to match the From Email**.
- **Force Sender Name** if you want this name on every message this connection sends.

Gmail does not have **Force From Email**. The mailbox you authenticate as is the From.

Then the **Gmail / Google Workspace API Settings** block.

![Gmail connection form with Client ID, Client Secret, and the fluentsmtp.com/gapi/ redirect URI](/images/gmail-connection.png)

## Create a Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/) and sign in as the user who owns the mailbox, or as a Workspace admin who can grant Gmail access.
2. Click the project picker → **New Project**. Name it something like `FluentSMTP` and create it. Select it when it exists.

![Google Cloud New Project form with FluentSMTP Docs as the project name](/images/google-cloud-new-project.png)

The screenshots use a demo project named **FluentSMTP Docs**. Use your own project and mailbox when following these steps.

## Enable the Gmail API

1. Go to **APIs & Services → Library** (or **Enable APIs and services**).
2. Search for **Gmail API**.
3. Open it and click **Enable**.

![Gmail API product page with the Enable button](/images/google-enable-gmail-api.png)

## OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**. This opens **Google Auth Platform**.
2. Click **Get started** if the project is not configured yet.
3. Under **App Information**, enter an app name such as `FluentSMTP` and select a **User support email**.
4. Under **Audience**, choose:
   - **Internal**: available when the project belongs to a Google Workspace or Cloud Identity organization. Only users in that organization can authenticate.
   - **External**: use this for a personal Gmail account or users outside your organization. The app starts in Testing.
5. Under **Contact Information**, enter an email address for Google to send project notices.
6. Review the **Google API Services: User Data Policy**, accept it if you agree, then click **Continue → Create**.

![Google Auth Platform audience setup with External selected and Internal available only to organization users](/images/google-oauth-audience.png)

### Testing vs published

For an External app in **Testing**, open **Google Auth Platform → Audience → Test users → Add users** and add the Google address you will authenticate with.

::: warning Testing connections expire after seven days
Google issues seven-day refresh tokens for External apps in Testing when Gmail access is requested. If **Publish app** is disabled, follow **Go to Branding** and complete the missing information Google identifies. For ongoing site mail, move the app to **In production** from **Audience → Publish app**, then authenticate FluentSMTP again. Publishing does not make the app verified. See [Google’s audience guidance](https://support.google.com/cloud/answer/15549945?hl=en).
:::

A personal-use app with fewer than 100 users can qualify for Google’s [verification exception](https://support.google.com/cloud/answer/13464323?hl=en). Google may show **Google hasn’t verified this app** during sign-in. For the app you created, check its name, then use **Advanced → Go to [your app name] (unsafe)** if offered. This prompt is shown to the person connecting the mailbox, not to email recipients.

Workspace Internal apps do not require public verification, but your Workspace administrator can still restrict access.

## Create the OAuth client

1. Open **Google Auth Platform → Clients → Create client**. You can also reach this through **APIs & Services → Credentials → Create credentials → OAuth client ID**.
2. Application type: **Web application**.
3. Name: `FluentSMTP`.
4. **Authorized redirect URIs**: add exactly:

```
https://fluentsmtp.com/gapi/
```

That URI is not your site. FluentSMTP uses it as a fixed OAuth bounce so you do not have to expose a callback on every WordPress install. If you skip it, or add a trailing-path variant Google does not treat as the same, authentication is refused.

Leave **Authorized JavaScript origins** empty. The callback belongs under **Authorized redirect URIs**.

![Google OAuth Web application client with https://fluentsmtp.com/gapi/ in Authorized redirect URIs](/images/google-oauth-redirect-uri.png)

5. Click **Create**. Copy the **Client ID** and **Client secret** and keep them private. Google shows the secret only in the creation dialog; copy it before clicking **OK**.

## Paste into FluentSMTP and authenticate

Back on the connection form:

1. Leave **Store in Database** selected. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).
2. Paste **Application Client ID** and **Application Client Secret**.
3. Confirm **Authorized Redirect URI** still shows `https://fluentsmtp.com/gapi/`.
4. Click **Authenticate with Google**. A Google window opens.
5. Pick the same account as **From Email**. If Google shows a testing notice for the app you created, click **Continue**. Review the **Send email on your behalf** permission, then click **Continue** to approve it.

![Google consent screen requesting permission to send email on your behalf](/images/google-oauth-consent.png)

6. FluentSMTP shows an access token. Paste it into **Access Token** if the form asks, then click **Save Connection Settings**.

When it works, reopen the saved connection. The form says **Gmail / Google Workspace is connected**.

![FluentSMTP Gmail API settings with the saved secret hidden, redirect URI, and connected confirmation](/images/gmail-connected.png)

Send a test from **Send Test Email**.

If Google shows `redirect_uri_mismatch`, the Cloud client does not have `https://fluentsmtp.com/gapi/` exactly. Edit the client, add it, wait a minute, try again.

If you see a yellow notice about an upgraded Google API, the old connection used a previous client. Create a new client (or reuse this one) and authenticate again. Same docs URL is linked from that notice in the plugin.

## After it is connected

Send a test. Confirm it in the inbox, not only the success notice.

If you later need to authenticate again, open the connection, click the link to authenticate again, and repeat the Google window.

Next: [Settings](/fluent-smtp-settings/) and [email logs](/fluentsmtp-email-logs-feature/).
