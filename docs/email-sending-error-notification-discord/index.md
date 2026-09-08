---
title: Email Sending Error Notification Discord
description: Create a Discord channel webhook and paste it into FluentSMTP to get failure alerts.
---

# Email Sending Error Notification Discord

Failed sends can post to a Discord channel through a webhook you create. FluentSMTP never logs in as you.

## Create the webhook in Discord

1. Open Discord, go to the server and channel that should receive alerts.
2. Channel settings (gear) → **Integrations → Webhooks → New Webhook** (or **Create Webhook**).
3. Name it `FluentSMTP` if you want. Copy **Webhook URL**.

## In FluentSMTP

1. Open **Alerts**.
2. On **Discord**, click **Set Up**.
3. **Channel Name (for your own reference)**: anything you will recognise, it does not have to match Discord's name exactly.
4. **Channel Webhook URL**: paste the URL.
5. **Connect Discord**.

The row becomes **Connected**. You can send a test from that screen if the plugin offers it, then disconnect later.

If nothing appears in Discord, the webhook was rotated or the channel was deleted. Create a new webhook and connect again.
