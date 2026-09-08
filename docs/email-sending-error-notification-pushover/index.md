---
title: Email Sending Error Notification Pushover
description: Connect Pushover with an API token and user key so failed FluentSMTP sends reach your phone.
---

# Email Sending Error Notification Pushover

Pushover pushes a notification to Android, iPhone, iPad, or desktop.

## In Pushover

1. Create an account at [pushover.net](https://pushover.net/).
2. Copy your **User Key** from the Pushover dashboard.
3. Create an **Application** (or use one you already have). Copy its **API Token**.

## In FluentSMTP

1. Open **Alerts**.
2. On **Pushover**, click **Set Up**.
3. Paste **API Token** and **User Key**.
4. **Connect Pushover**.

The row shows **Connected**. Failures then show up in the Pushover app. Disconnect from the same screen.

If connect fails, the token and user key are swapped, or the application was deleted in Pushover.
