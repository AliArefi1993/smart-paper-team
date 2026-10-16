# Persian Telegram channel

Channel: [@smart_paper_app](https://t.me/smart_paper_app).

## Authorization and boundaries

On 2026-10-16 the maintainer explicitly authorized Growth to operate this channel for app adoption, using Persian-only posts, release shares and useful tips. Routine posts within that scope need no repeat approval. The agent acts during active work; this is not continuous monitoring or unattended operation. No direct invitations/DMs, spending, adding admins, scheduling, telemetry, contact scraping or account changes are authorized by this channel scope. Root owns local publication tooling and the initial publication; Growth drafts content without handling credentials.

The maintainer separately requested channel profile polish on 2026-10-16: title is now «اسمارت پیپر» (correcting “Samrt paper”), with the [Persian description](telegram-description.txt) linking to guide2 and the [brand-matched channel photo](../../design/2026-10-16-telegram-channel-avatar.md). API reads and the live public browser view confirmed all profile fields and pin2. The [fresh review](2026-10-16-channel-review.md) found no material issue requiring another post edit. The three existing posts and APK remain; profile changes may add Telegram service notices, not new promotional posts.

Use truthful product and verified-release claims. Do not claim encryption, guaranteed reliability, app-store availability, complete device coverage or observed adoption. Channel prose is Persian only; URLs and version identifiers may retain ASCII. Do not solicit private planner/finance/Idea content, public diagnostics or personal screenshots. Route voluntary problems through the app's Settings → Report a problem («تنظیمات» → «گزارش مشکل»); users review the report and choose whether/how to send it. No admin support identity, bot reply behavior or response-time promise is established.

Sharing the already verified APK does not widen the existing pre-user app-release authorization or bypass its gates. Real pilot enrollment/installs remain unknown. The maintainer must revisit that release policy once actual users are confirmed; a channel publication alone is not evidence of installation or use.

Maintainer editorial direction (2026-10-16): opening posts focus on installation and the first useful experience. Use the Persian brand «اسمارت پیپر». Welcome links directly to the existing APK post5 and guides download → Android installation → today's Planner → one small plan. The release caption presents supported benefits and the same first-plan action. Keep storage, backup, Merge/Replace, PIN, diagnostics/privacy and internal testing details out of these opening posts. Detailed product/release constraints remain internal; do not imply perfect reliability or completed phone checks. Design: not applicable (channel text only).

## Opening batch

Persian copy internally reviewed by Growth against PRODUCT.md, STATUS.md and the current release record. The revised opening copy uses supported offline Persian weekly planning, Ideas and focus/rest timer benefits. This is a content review under the user's standing authorization, not a claimed maintainer sign-off. No screenshots or UI changes.

| Content | Source | Publication state | Message ID/link |
| --- | --- | --- | --- |
| Welcome, intended pin | [welcome.txt](telegram-posts/welcome.txt) | Published and pinned | [2](https://t.me/smart_paper_app/2) |
| Signed Android attachment caption | [release-2026.10.29.txt](telegram-posts/release-2026.10.29.txt) | Published with signed APK | [5](https://t.me/smart_paper_app/5) |
| First useful planner tip | [tip-first-plan.txt](telegram-posts/tip-first-plan.txt) | Published | [4](https://t.me/smart_paper_app/4) |

Welcome now links directly to the existing signed APK message [5](https://t.me/smart_paper_app/5), with no public placeholder. Root reviewed and edited existing messages 2/5 to the revised Persian copy. Telegram returned the exact new text for both and the same APK filename/size; no new messages or APK upload were created. A separate read-only check confirmed welcome2 remains pinned. This is a copy edit, not a new upload or release. Release caption must accompany the verified signed artifact, not an unsigned build. Published on 2026-10-16 (Asia/Tehran); the API confirmed welcome2/pin, tip4, and APK5 with the expected 4,422,272-byte size. Local artifact SHA-256 matched the committed published record before upload. Telegram-hosted bytes were not downloaded again. Public receipts are in [the publication journal](telegram-publications.json). Failed or uncertain sends must not be recorded as published or retried blindly.

## Factual evidence and limits

Checked 2026-10-16:

- [Product](../../PRODUCT.md): offline Android weekly planning, Persian UI, automatic Planner saving, local storage, explicit export/backup and deliberate problem reporting.
- [Release 2026.10.29](../../releases/smart-paper-v2026.10.29.md): published signed artifact `SmartPaper-local-2026.10.29-release.apk`, SHA-256 `d3589efedb5546960d104552a1e042d0f8a61c716344740bb073a3174076a3ce`; safe Merge behavior and explicit Replace.
- [Current status](../../STATUS.md): physical chooser, upgrade/data retention and TalkBack remain unverified. These remain internal evidence limits; opening copy makes no device-test completion claim.
- Actual Persian navigation labels: `settings` in `smart-paper-front/src/lib/i18n.ts`, «گزارش مشکل» in `smart-paper-front/src/components/report-problem-button.tsx`.
- Local data and JSON backups are not encrypted; cloud app-data backup is excluded, OS/OEM transfer remains unverified. These constraints remain internal; the opening welcome and release caption focus on installation and first use, per maintainer direction.

No adoption count is claimed. Downloads, confirmed installs, a saved/reopened plan and voluntary returning use remain separate outcomes. Any later learning is voluntary and recorded only as sanitized aggregate observations.

## Local publication procedure

The local publisher is `scripts/telegram-channel.py`. Read-only channel/bot validation uses `python3 scripts/telegram-channel.py verify`. Preview each text before sending with `preview --key <key> --text <path>`; use the same arguments with `publish` only within the authorization above.

- Welcome key: `welcome-2026-10-16`; text `docs/growth/telegram-posts/welcome.txt`; add `--pin`.
- Release key: `release-2026-10-29`; text `docs/growth/telegram-posts/release-2026.10.29.txt`; add `--release-record releases/smart-paper-v2026.10.29.md` for the verified signed APK attachment.
- Tip key: `tip-first-plan-2026-10-16`; text `docs/growth/telegram-posts/tip-first-plan.txt`.

Nonsecret results belong in `docs/growth/telegram-publications.json`. Completed keys prevent repeat posting. For pending/uncertain outcomes, inspect the actual channel before reconciling or retrying; the publisher has no generic inbox/history access. Keep credentials local and excluded from Git; never display them or store them in publication records.

## Interrupted upload reconciliation

The first APK upload timed out without confirmation. It remained pending and could not automatically repost. The first public page was stale; a fresh timeline query showed API-confirmed tip4 and no APK, and the direct next-message widget reported post5 absent. After that evidence and original process completion, root preserved the failed attempt under `reconciled_attempts`, cleared only its active key, and made one controlled retry with a longer upload timeout. That retry succeeded as post5. For future ambiguity, inspect fresh public evidence or the owner’s Telegram UI; never remove pending state based on an old cached page. Ledger atomic writes cover process interruption, not guaranteed host/power-loss durability.
