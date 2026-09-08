---
title: Install and Activate FluentSMTP
description: Install FluentSMTP from WordPress.org, or upload the zip. Then open Settings → FluentSMTP.
---

# Install and Activate FluentSMTP

FluentSMTP takes over `wp_mail` and sends through an email service you connect. Until you add a connection, WordPress still uses whatever your host left behind, which is why contact form and password-reset mail often never arrives.

You need:

- WordPress 6.5 or later
- PHP 7.4 or later

## Install from the dashboard

1. In WordPress, go to **Plugins → Add Plugin**.
2. Search for `fluent smtp`.
3. Find **FluentSMTP - WP SMTP Plugin** by WPManageNinja.
4. Click **Install Now**, then **Activate**.

![Searching for FluentSMTP on the Add Plugins screen](/images/install-plugin.png)

If another SMTP plugin is already active, WordPress will tell you. FluentSMTP should be the only plugin sending mail. Deactivate the other SMTP plugin first, or you will get double-sending and confusing logs.

If FluentSMTP is already active and you search for another SMTP plugin, FluentSMTP shows a notice: **You already have an SMTP plugin**. That is the plugin protecting you from installing a second mailer. Go to its settings instead.

After activation, go to **Settings → FluentSMTP**. That is the plugin screen. It is not a top-level menu.

## Install from a zip

Use this if you cannot reach wordpress.org from the site, or you are installing a specific build.

1. Download the zip from [wordpress.org/plugins/fluent-smtp](https://wordpress.org/plugins/fluent-smtp/).
2. Go to **Plugins → Add Plugin → Upload Plugin**.
3. Choose the zip, install, then activate.

The plugin then appears under **Settings → FluentSMTP**.

## What you should see next

On a site with no connection yet, FluentSMTP opens a first-run wizard: pick a provider, fill the form, save. On a site that already has a connection, you get the dashboard.

![FluentSMTP dashboard after a connection exists](/images/dashboard.png)

Next: [choose an email service](/configurable-email-delivery-providers/) and save a connection. Then send a test from **Send Test Email** in the top bar.
