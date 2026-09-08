---
title: Multiple SMTP Connections & Auto Routing
description: How FluentSMTP routes by From address, Default, Fallback, and extra senders on SES and toSend.
---

# Multiple SMTP Connections & Auto Routing

You can connect more than one email service. FluentSMTP then picks a connection from the From address on the message.

The rule, as it appears under the connection list:

> Mail sent from a connection's own From address always goes through that connection. Everything else goes through the Default, and if that fails, the Fallback.

You cannot use the same From address on two connections. Saving a second connection with an existing From address replaces the first.

## Add another connection

**Settings → Add Connection**. Pick a provider. Use a **different From Email**. Save.

On the row:

- **Set as Default** from the actions menu. This is the connection for mail whose From does not match any connection.
- **Set as Fallback** on a different connection. Default cannot be Fallback.
- **Clear Fallback** if you no longer want a backup.

Until there are two connections, Fallback cannot be set. With one connection, everything goes through it.

## Extra senders (SES and toSend)

Amazon SES and toSend can send as several From addresses on one connection. The row shows **+N senders**. Click it, add an address on a domain that provider has verified. Those addresses then route through that same connection.

## How other plugins should send

If Fluent Forms, FluentCRM, or Fluent Support lets you set a From address, pick one that exists on a FluentSMTP connection. That message then uses that connection. If they send from something FluentSMTP does not know, Default is used (then Fallback).

**Force From Email** on the Default connection will rewrite From for mail that did not match another connection. That is usually what you want on a site with one "real" sending domain.

## Fallback is not a second opinion on spam

Fallback runs when Default's send **fails** (API error, auth, timeout). It does not retry because a message landed in spam. Fix SPF/DKIM/DMARC on the domain, or use a provider that is allowed to send as that domain.
