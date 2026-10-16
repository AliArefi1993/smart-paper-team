# Growth and community onboarding brief

## Role boundary

Help the maintainer learn whether the current Android app reaches and helps people who want an offline English/Persian personal planner. Start with small, consent-based learning. Do not promise features, create a growth program, contact people, or publish content without an approved task and explicit authorization for any outreach.

## Source map

- [Current status](../STATUS.md) is the starting point for current focus, risks, and repository revisions.
- [Product](../PRODUCT.md) describes supported behavior and explicit non-claims.
- [Feedback triage](feedback-triage.md) governs sanitized voluntary reports, severity, and closure. Reporter identities, original reports, and attachments stay in their private source location; never put them in Git.
- [Decisions](decisions.md) D-011 records the standing pre-user Android release authorization and its gates; D-018 rejects automatic hosted Android diagnostics/session replay. Read the current release workflow and record when a release question requires them.
- Use [current status](../STATUS.md) and its matching dated record under `releases/` to identify the published version and official artifact at the time of use. [Next release](../releases/NEXT.md) describes pending work, not the current download. Keep version/download details out of this onboarding brief; include verified details and a checked date in actual sharing materials.
- [Privacy/local-data review](privacy-local-data-review.md) and [Android backup policy](android-backup-policy.md) give additional privacy and migration context.

## Current positioning and constraints

Smart Paper is a signed Android APK for personal weekly planning, progress tracking, ideas, and optional finance tracking. Android local-data mode is designed to work offline and supports English and Persian. Distribution is currently through a public APK release; do not describe it as available in an app store. Check the current release record before sharing a download path.

Personal records live on the device. There is no account, server sync, or automatic report upload. Local error and feature-count recording has a visible disclosure and saved user controls; sending a report is a separate deliberate action. Do not imply that data is encrypted: the Finance PIN is a screen lock, and local Finance data and JSON backups are not encrypted. Android cloud app-data backup is excluded; supported device-to-device transfer may occur, but OS/OEM behavior has not been verified. A verified JSON backup stored outside the app is advised before changing phones or uninstalling. Finance unlock lasts up to one hour in runtime and resets after reload/restart; JSON backup/import is PIN-gated and does not contain the PIN.

Native Android chooser, upgrade/data retention, migration, notification delivery, and TalkBack behavior have evidence gaps noted in `STATUS.md` and release records. Browser and desktop checks do not establish those device behaviors. Do not present them as verified.

## Needs confirmation

- First recruitment audience selected by the maintainer on 2026-10-16: friends or colleagues who use Android. Audience fit, geography, and language mix remain untested; see [the first pilot package](growth/first-pilot.md) and [preparation task](../tasks/2026-10-16-first-user-pilot.md).
- Suitable community or distribution channels and whether the maintainer wants to use them.
- Any budget, incentive, or paid promotion allowance.
- Support contact and who may respond to prospective users or testers.
- Whether participants can be asked to report outcomes and what consent language is acceptable.

## First pilot preparation (not started)

The maintainer authorized [preparing the first pilot package](growth/first-pilot.md) for friends or colleagues using Android. It proposes a small, opt-in APK evaluation. Before inviting anyone, resolve the remaining launch choices in that package and obtain authorization covering outreach. Provide the current public release path and a short task asking each participant to record a useful plan and return to it later. Collect only voluntary, minimal answers; do not request screenshots, personal plans, finance details, or device diagnostics by default. Keep raw responses private and summarize only sanitized, aggregated observations outside public materials.

Measure a manual, consented funnel: invitations accepted, installs the participant confirms, completion of one agreed first useful action, and voluntary return to use the app. Treat confirmed installs, first useful action, and return as distinct outcomes; download counts alone do not show whether the app helped. Do not add telemetry, tracking links, automatic collection, or hosted replay. Proposal preparation does not authorize recruitment or running the experiment.
