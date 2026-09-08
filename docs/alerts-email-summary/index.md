---
title: Email Summary
description: Turn on FluentSMTP's summary email, set the recipient, and pick the days it should send.
---

# Email Summary

The summary is a regular email about how much this site sent, and how much of it failed. It is not a failure alert. For failures as they happen, use Telegram, Slack, Discord, or Pushover.

## Turn it on

1. Open **Alerts** in the FluentSMTP top bar.
2. On the right, **Summary Email**.
3. Turn on **Enable Email Summary**.
4. **Send To**: one or more addresses, comma separated. `{site_admin}` is the WordPress admin email.
5. **Send On**: the weekdays it should go out.
6. **Save Settings**.

![Alerts screen with Summary Email on the right](/images/alerts.png)

If the switch is off, the days and address fields are hidden. The summary does not send until you save with it on.

The recipient should be a mailbox someone actually reads. Putting it on a no-reply address wastes the report.
