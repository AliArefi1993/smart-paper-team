# Design addendum: Finance visible by default

Status: implemented; Designer accepted
Updated: 2026-10-13
Owning frontend: `finance-visibility.ts`, existing Settings/Finance navigation consumers
Design type: bounded amendment to shipped Finance visibility
Editable stories: [FinanceVisibility.stories.tsx](studio/src/stories/FinanceVisibility.stories.tsx), [FinancePin.stories.tsx](studio/src/stories/FinancePin.stories.tsx)

The maintainer explicitly requested **Show Finance defaults to true**, keeping its toggle. This supersedes the default-hidden recommendation in the [2026-10-12 visibility handoff](2026-10-12-finance-visibility.md) for current behavior; historical release facts remain unchanged. No further product discovery or interface redesign is needed.

Current source initializes an absent visibility key from the presence of Finance records. Proposed behavior: an unset key shows Finance and the checked **Show Finance / نمایش بخش مالی** control regardless of whether records exist. Explicit saved `hidden` or `visible` choices remain authoritative. Do not turn on Finance for a person who already chose to hide it. An invalid initial saved preference also falls back to visible, preserving understandable malformed-choice feedback and explicit Retry; read/write failure remains truthful and cannot claim a successful save. Existing active-choice preservation on later storage events stays unchanged unless separately required by implementation tests.

Use the exact existing checked-toggle appearance, header/navigation links and locked Finance screen. No new copy, emphasis, dialog, badge or placement is needed for the normal default. The user may hide Finance through the same immediate-save control. Showing it neither unlocks it nor changes the PIN, current session, Finance records, backups or report field selections. Finance report fields remain off by default. The [ready PIN-change handoff](2026-10-13-finance-pin.md) keeps its current/new/confirm, no-recovery, backup-gate and successful-commit relock boundaries; only its default illustrative visibility baseline now starts checked. Explicit hidden scenarios remain available.

Implementation acceptance:

- Unset visibility preference → visible/checked, with or without any Finance data.
- Explicit saved hidden → hidden/unchecked; explicit saved visible → visible/checked.
- Malformed initial preference → visible with truthful existing error/Retry; no silent saved-choice claim or PIN bypass.
- The checkbox still saves independently; failed toggle writes preserve the effective prior choice and existing Retry behavior.
- PIN/session and record contents are unchanged. Direct Finance still needs its PIN; Finance fields in selective AI reports remain excluded until explicitly selected and authorized.

Editable review states:

- [FreshVisiblePhone](http://localhost:6006/?path=/story/proposals-finance-visibility--fresh-visible-phone): EN/FA fresh/default checked, Light phone.
- [FreshVisibleDarkWide](http://localhost:6006/?path=/story/proposals-finance-visibility--fresh-visible-dark-wide): EN/FA fresh/default checked, Dark wide.
- [MalformedVisibleDarkPhone](http://localhost:6006/?path=/story/proposals-finance-visibility--malformed-visible-dark-phone): checked recovery with PIN-required error.
- `SettingsPhone` remains the explicit saved-hidden reference; hidden/import/error references retain their previous meanings.
- Finance PIN baseline starts visible; `SavedHiddenSettings` and the explicit hidden Persian form keep saved-hidden coverage.

Verification uses narrow current-source review plus the existing checked EN/FA screens: [Settings FA enabled Dark](evidence/2026-10-12-finance-visibility/implementation/settings-fa-enabled-dark.jpg), [visible Finance locked EN Dark](evidence/2026-10-12-finance-visibility/reenabled-en-dark-360.png), and [current PIN form with checked Finance](evidence/2026-10-13-finance-pin/english-phone-dark.jpg). These already-rendered controls supplied the pre-implementation visual reuse evidence; actual unset-key behavior is reviewed below. Studio typecheck/build validate the amended editable states. Frontend must test the new default/explicit-choice/failure behavior and verify the actual screen after implementation. Native Android/TalkBack claims remain unverified.

Designer decision: **ready for implementation**, no unresolved design choice. This changes the initial choice only; continue the accepted engineering/review/release workflow without broad UI changes.

## Actual default-visible review — 2026-10-13

Designer inspected the [fresh actual checked control](evidence/2026-10-13-finance-pin/implementation/fresh-default-visible-en-phone.jpg), actual EN/FA Settings/PIN layouts, [still-locked Finance](evidence/2026-10-13-finance-pin/implementation/finance-still-locked-en-phone.jpg) and [report Finance exclusions](evidence/2026-10-13-finance-pin/implementation/report-finance-excluded-en-full.jpg). Parent browser QA confirms fresh unset preference is visible, explicit hidden choice survives clean reload, hidden PIN action remains available, showing Finance does not authorize it, and report fields remain off. The bounded default amendment is **Designer accepted**. PIN-card final acceptance is recorded separately in its handoff. Native Android evidence remains unverified.
