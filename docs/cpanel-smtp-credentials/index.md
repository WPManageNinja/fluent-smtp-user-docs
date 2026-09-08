---
title: cPanel SMTP Credentials
description: Create a cPanel mailbox and find the SMTP host, port, and password for FluentSMTP's Other SMTP connection.
---

# cPanel SMTP Credentials

Most shared hosts give you mailboxes on your domain. Those are SMTP, not a transactional API. Use them with [Any Hosting Email Service](/set-up-fluent-smtp-with-any-host-or-mailer/).

## Create a mailbox

In cPanel: **Email Accounts → Create**. Use cPanel's own guide if the screen has moved: [Create an Email Account](https://docs.cpanel.net/cpanel/email/create-an-email-account/).

## SMTP details

cPanel **Email Accounts → Connect Devices** (or **Set Up Mail Client**) lists the values. Official notes: [Set Up Mail Client](https://docs.cpanel.net/cpanel/email/set-up-mail-client/).

Typical:

- Host: `mail.yourdomain.com`
- Port **465** + **SSL**, or port **587** + **TLS**
- Username: the full address
- Password: the mailbox password

If the host uses a different hostname (`smtp.yourdomain.com`, a server name), use what they printed, not a guess.

If you cannot see the client settings, ask the host for SMTP host, port, encryption, username, and password. Put those on the Other SMTP form in FluentSMTP.
