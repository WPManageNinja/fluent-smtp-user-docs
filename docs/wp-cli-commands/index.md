---
title: FluentSMTP WP-CLI Commands
description: Send a test email, check every connection, read sent and failed counts, and prune old email logs from the terminal with wp fluent-smtp.
---

# FluentSMTP WP-CLI Commands

The terminal is the way in when the admin is not: the broken email is the login link you need, the staging site sits behind HTTP auth, or a deploy script should prove mail still works before it finishes.

You need [WP-CLI](https://wp-cli.org/) on the server and FluentSMTP 2.3.0 or newer. Run the commands from the WordPress directory, or add `--path=<wordpress-dir>`.

| Command | What it does |
| --- | --- |
| `wp fluent-smtp test` | Send a test email |
| `wp fluent-smtp health` | Check every connection |
| `wp fluent-smtp stats` | Sent and failed counts |
| `wp fluent-smtp prune-logs` | Delete old email logs |

`wp help fluent-smtp <command>` prints the built-in help for each one.

## Send a test email

```bash
wp fluent-smtp test [--to=<email>] [--from=<email>] [--text]
```

| Option | Description |
| --- | --- |
| `--to=<email>` | Recipient. Defaults to the site admin email. |
| `--from=<email>` | Sender address. FluentSMTP sends through the connection set up for that address. Defaults to the default connection. |
| `--text` | Send plain text instead of HTML. |

```bash
wp fluent-smtp test
wp fluent-smtp test --to=me@example.com --text
wp fluent-smtp test --from=billing@example.com --to=me@example.com
```

On success the command prints the recipient and how long the send took:

```text
Success: Test email handed to the provider for me@example.com in 0.842s.
```

On failure it prints the provider's error and exits with a non-zero status:

```text
Error: Sending failed after 1.203s: Invalid API key
```

"Handed to the provider" means the provider accepted the message. That is not the same as "it landed in the inbox." Check the mailbox, then Spam.

## Check every connection

```bash
wp fluent-smtp health [--format=<format>]
```

| Option | Description |
| --- | --- |
| `--format=<format>` | `table` (default), `csv`, `json` or `yaml`. |

The command checks each configured connection and catches problems such as an expired OAuth token or a deleted API key:

```text
+---------------------+----------+---------+------------------------------+
| sender              | provider | status  | message                      |
+---------------------+----------+---------+------------------------------+
| hello@example.com   | ses      | healthy |                              |
| billing@example.com | gmail    | error   | Token has been expired or... |
+---------------------+----------+---------+------------------------------+
Error: 1 of 2 connection(s) need attention.
```

`status` is `healthy` or `error`. If any connection has an error, the command exits with a non-zero status, so a deploy or monitoring script can stop on it:

```bash
wp fluent-smtp health || echo "A FluentSMTP connection is broken"
```

This is the same check FluentSMTP runs once a day. Running it by hand also updates the status on the dashboard. A connection that has started failing since the last check is sent to your [alert channels](/email-sending-error-notification-telegram/).

## Sent and failed counts

```bash
wp fluent-smtp stats
```

```text
+--------+-------+
| metric | count |
+--------+-------+
| sent   | 1482  |
| failed | 3     |
+--------+-------+
```

The counts come from the [email log](/fluentsmtp-email-logs-feature/). Mail sent while **Log Emails** was off, or logs that have since been deleted, are not counted.

## Delete old email logs

```bash
wp fluent-smtp prune-logs [--days=<days>] [--yes]
```

| Option | Description |
| --- | --- |
| `--days=<days>` | Delete logs older than this many days. Defaults to the **Delete Logs** period in [Settings](/fluent-smtp-settings/#delete-logs). |
| `--yes` | Skip the confirmation prompt. Use it in scripts and cron jobs. |

```bash
wp fluent-smtp prune-logs
wp fluent-smtp prune-logs --days=30 --yes
```

```text
Permanently delete every logged email older than 30 day(s)? [y/n] y
Success: Deleted 2417 log entries.
```

Deleted logs cannot be restored. If you leave out `--days` and no **Delete Logs** period is set, the command stops with an error and deletes nothing.

Logs are deleted in batches, so this is safe on a site with hundreds of thousands of entries.
