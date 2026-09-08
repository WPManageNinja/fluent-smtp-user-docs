---
title: Email Sending Error Notification Slack
description: Connect the FluentSMTP Slack bot so failed sends land in a channel you already watch.
---

# Email Sending Error Notification Slack

Failed sends can go to a Slack channel through FluentSMTP's Slack bot.

## Connect

1. Open **Alerts**.
2. On **Slack**, click **Set Up**.
3. Enter **Your Email Address**, accept the terms, click **Continue to Slack**.
4. Slack opens. Pick the workspace and the channel, then **Allow**.
5. You return to FluentSMTP. The row shows the workspace and channel as **Connected**.

Disconnect from the same screen if you want it to stop.

The message in Slack includes a link back to the failed log on this site. Those links use the hash route `#/logs?…`. Do not rename that path in the plugin.

Privacy: FluentSMTP does not store your Slack message history. The bot needs permission to post in the channel you picked.
