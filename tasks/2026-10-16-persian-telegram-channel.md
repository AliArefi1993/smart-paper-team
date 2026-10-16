# Task: Growth operates the Persian Telegram channel

Status: completed
Created: 2026-10-16
Updated: 2026-10-16

## Objective

Establish Growth ownership of @smart_paper_app for app discovery and useful onboarding, with Persian-only channel prose, a verified APK announcement, and a pinned start guide. The maintainer explicitly authorized channel operation in this chat on 2026-10-16.

## Context

- Team coordination repository only; no application changes or new APK release.
- [Growth workflow](../skills/smart-paper-growth/SKILL.md), [onboarding](../docs/growth-community.md), [channel handoff](../docs/growth/telegram-channel.md).
- Existing locally stored bot credential is excluded from Git with owner-only permissions; never copy it into docs, logs, agent handoffs, or commits.
- Design: not applicable; text-only channel posts, no app UI or visual assets changed.

## Acceptance Criteria

- [x] Growth remit and standing Persian channel authorization recorded; no direct recruitment, spending or unattended scheduling inferred.
- [x] Initial Persian welcome, current signed APK caption, and practical first-plan tip reviewed against product/release evidence.
- [x] Credential-safe publisher verifies channel identity, committed APK hash/size, and avoids duplicate retries on uncertain delivery.
- [x] Relevant offline tests and independent security/content review pass; no unresolved high/critical finding.
- [x] Authorized initial posts published, starting guide pinned, public message IDs/links retained; limitations recorded.
- [x] Durable memory updated and scoped changes committed/pushed; application repositories untouched.

## Non-Goals

- No new app build/release, personal outreach, subscriber/contact collection, private bot-inbox ingestion, recurring automation, paid promotion or automatic feedback metrics.

## Plan

1. Growth drafts Persian opening content and channel operating handoff.
2. Implement/review a narrowly scoped local publisher, verify exact artifact and permissions.
3. Publish the reviewed opening batch, retain public receipts, document and close out.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Initial scope | project-context and separate Git statuses | Team 6ec1969; backend 68c789b and frontend 40c3516 clean/unchanged. |
| Existing connection | Prior getMe/getChat/getChatMember | Bot authenticated; channel administrator with post/edit/delete, no promote permission. Reverify before publication. |
| Offline tests | PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts/tests -p test_telegram_channel.py | 10 passed, including ambiguous delivery, duplicate keys, failed pin, concurrency, credential/error safety, wrong bot/channel and artifact rejection. Rerun passed after upload-timeout adjustment. |
| Previews/artifact | Three publisher preview commands; committed record/artifact hash/size | All Persian/length previews passed; signed APK 4,422,272 bytes and SHA-256 d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce match the published record and HEAD. |
| Independent review | Security/content pass plus narrow timeout/error-type follow-up | No blocking finding. Nonblocking test coverage and power-loss durability limitations recorded in handoff. |
| Permissions | Live publisher verify after maintainer reconnected VPN | Expected bot/channel/admin identity and post/edit rights passed; no credentials printed. Earlier network failures caused no publication. |
| Initial publication | Telegram API responses and public journal | Welcome2 published/pinned; tip4 published; APK5 published with expected size. No Telegram-hosted byte re-download. |
| Interrupted upload | Fresh public timeline before=6 and direct next-message widget | First attempt unconfirmed, automatically blocked from reposting. Fresh timeline IDs1-4 plus absent post5 confirmed no APK; root retained reconciled attempt and made one controlled longer-timeout retry, succeeded as5. One interim retry was safely refused by the journal; no duplicate send. |
| Final public confirmation | Fresh public channel timeline after publication | Messages 1–5 visible; welcome2 remains pinned, tip4 is visible, and signed APK5 has the expected Persian caption and exact artifact filename. |
| Credential/source scope | Root exact local-credential scan over changed candidates, routine links/TOML/diff check | No saved credential in candidates; generic hits were source validation/config references and test placeholders. Credential file remains local/ignored/owner-only. |

## Decisions And Risks

- Existing user instruction authorizes channel announcements, useful tips and verified APK sharing in Persian; it does not authorize direct messages or continuous work between chats.
- The current channel title was observed as “Samrt paper”; title changes are outside the opening content batch.
- Pre-user release authorization must be revisited when real app users begin. Reposting the already published signed artifact does not alter release protections or establish real-user enrollment.
- On timeout/ambiguous delivery the publisher records pending state and stops; reconcile with channel before retrying.

## Outcome / Handoff

Published Persian [welcome2](https://t.me/smart_paper_app/2) (pinned), [tip4](https://t.me/smart_paper_app/4), and [APK5](https://t.me/smart_paper_app/5); a fresh public timeline confirmed messages 1–5 and the pin, caption, and artifact filename. Growth's standing scope is recorded in role, skill, AGENTS and the channel handoff. Preparation and publication are complete. All task-owned network commands completed; no bot server, watcher or scheduler remains. Future channel work uses reviewed Persian posts and stable journal keys during active agent runs; actual installs/returns remain unknown and the recruitment pilot has not started.
