---
title: Email Sending Error Notification Telegram
description: Connect FluentSMTP's Telegram bot with an activation pin so failed sends show up in Telegram.
---

# Email Sending Error Notification Telegram

When a send fails, FluentSMTP can message you on Telegram through the official bot [@fluentsmtp_bot](https://t.me/fluentsmtp_bot). FluentSMTP does not store your Telegram chat history.

## Connect

1. Open **Alerts** in the FluentSMTP top bar.
2. On **Telegram**, click **Set Up**.

![Telegram Settings: email, terms checkbox, Continue](/images/telegram-setup.png)

3. Open [@fluentsmtp_bot](https://t.me/fluentsmtp_bot) and tap **Start**.
4. Back in FluentSMTP, enter **Your Email Address**, tick **I agree to the terms and conditions of this Telegram integration**, click **Continue**. **Continue** stays disabled until the box is ticked.
5. The plugin shows an **Activation Pin**. Copy the line `activate …` (there is a copy control).
6. Paste that whole line into the bot chat and send it. The bot should confirm.
7. In FluentSMTP click **I have sent the code**.

The row then says **Connected**. Leave the switch on. You can **Disconnect** from the same screen later.

## If it does not connect

- You must send `activate` and the pin as one message, not the pin alone.
- Start the bot before you send the pin.
- After **Continue**, finish the pin step. Reloading the WordPress page too early throws the pin away.

Test it by sending a test to an address the provider will reject, or by reading the next real failure in Telegram. Do not use simulation for this: simulated mail is not a provider failure.
