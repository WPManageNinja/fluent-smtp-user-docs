---
title: Outlook or Office365 with FluentSMTP
description: Register a Microsoft Azure app, add your site callback URL, and connect Outlook or Microsoft 365 to FluentSMTP.
---

# Outlook or Office365 with FluentSMTP

Same connection as the [Entra guide](/configure-fluentsmtp-with-microsoft-outlook-office/). This page is the Azure Portal walkthrough, which is what a lot of older bookmarks open.

Outlook / Microsoft 365 is not for mass marketing. Use it for site mail (forms, resets, notifications).

## Open FluentSMTP

**Settings → FluentSMTP**. Pick **Outlook or Office 365**, or **Add Connection** → **Outlook or Office 365**. Copy **App Callback URL** from the form. With pretty permalinks it is `/wp-json/fluent-smtp/outlook_callback`. With Plain permalinks it is `index.php?rest_route=/fluent-smtp/outlook_callback`. Use the string the form shows, character for character.

![Outlook connection form](/images/outlook-connection.png)

## Register an application in Azure

1. Open [portal.azure.com](https://portal.azure.com/#home) and sign in.
2. Search for **App registrations**.
3. **New registration** (or **Register an application** if the list is empty).
4. **Name**: `FluentSMTP`.
5. **Supported account types**: **Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts** unless you are locking this to one tenant.
6. **Redirect URI**: **Web**, value = **App Callback URL**.
7. **Register**. Copy **Application (client) ID**.

The Entra admin center exposes the same registration settings. Use your own site’s callback, copied directly from FluentSMTP.

![Microsoft Entra app registration with Web callback and organizational and personal account support](/images/microsoft-entra-register-app.png)

The screenshot uses `smtp.lab`; substitute the callback copied from your own site.

## Client secret

1. **Certificates & secrets → + New client secret**.
2. Add, then copy **Value**. Not Secret ID.

![Microsoft client secret creation showing description and expiry](/images/microsoft-entra-client-secret.png)

## FluentSMTP

Leave **Store in Database** selected. Paste Client ID and Client Secret. Leave **Directory (tenant) ID** empty unless the app is single-tenant (then paste the tenant ID from Overview). Click **Authenticate with Office365**, approve, save. You can tick **Disable Encryption**, or switch to **Store in wp-config.php**. Both are optional. See [Where secrets are stored](/fluent-smtp-settings/#where-secrets-are-stored).

After approval, copy **Your Access Code** from the callback window into FluentSMTP’s **Access Token** field and click **Save Connection Settings**. Reopen the saved connection and check that it says **Outlook / Office365 is connected**.

![FluentSMTP Outlook connected confirmation](/images/outlook-connected.png)

Send a test. If a redirect URI error appears, the URI in Azure does not match the callback on the form.

Tenant notes and permalinks: see the [Entra article](/configure-fluentsmtp-with-microsoft-outlook-office/).
