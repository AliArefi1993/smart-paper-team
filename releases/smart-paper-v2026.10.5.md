# Smart Paper Release: smart-paper-v2026.10.5

Date: 2026-10-06
Status: verified; publication authorized under standing maintainer direction; physical checks are follow-ups.

## Scope

- Android/local Planner edits save automatically on the device; routine Save week and Save + next controls are removed.
- A compact device-save status and navigation-only Next day replace the phone save controls. Storage failure retains visible writing, exposes Retry and blocks explicit week/page departure until retry succeeds.
- Full writing keeps accurate save feedback and reachable Retry; schedule commands say Add event / Apply changes.
- Templates, Ideas, Finance, timer duration Apply, Settings and export/restore retain deliberate commands; Django Planner remains manual.
- Planner notification updates coalesce separately from persistence and do not prompt for permission while typing.

## Repository Revisions And Tags

| Repository | Commit | Tag |
| --- | --- | --- |
| team root | Release artifact, record, designs and frontend pointer commit | `smart-paper-v2026.10.5` |
| backend | `68c789b` unchanged | `smart-paper-v2026.10.5` |
| frontend | `45d4130` | `smart-paper-v2026.10.5` |

## Android Local-Data Artifact

| Field | Value |
| --- | --- |
| Android versionCode | 22 |
| Android versionName | `2026.10.5` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.5-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.5-release.apk` |
| APK SHA-256 | `c87efeada7d056366a78509b331119d5898f830ac2aab654239680100b1320bf` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` verified |
| Size | 4410456 bytes |

## Validation

| Area | Result |
| --- | --- |
| Backend | Unchanged; reused prior 33-test/no-migration evidence |
| Frontend | Docker lint/types/30 tests and local-data web build passed against frozen final source |
| Independent review | No unresolved findings; Retry focus/live-region and notification ordering corrections verified |
| Studio | Typecheck/build and EN/FA phone/wide proposal review passed |
| Browser | Disposable-data EN/FA phone/wide, rapid edits/reload, week isolation, Summaries read-back, full writing and schedule staging passed; see [QA](../design/2026-10-06-save-controls-qa.md) |
| Signed APK | assembleRelease passed; stable signature, code22/name2026.10.5 and all136 exported web files byte-for-byte verified |
| Physical Android / TalkBack | Unverified follow-ups under maintainer direction |

## Release Notes

Planner saves edits automatically on this device. Next day now moves through the plan without an extra Save action. Retry appears if storage fails. Schedule buttons distinguish adding an event from applying changes.

## Known Follow-Ups

- Failed text is retained across SPA departure/return in memory; storage failure followed by reload/process termination cannot guarantee recovery. Device-saved data is not an external backup.
- Browser storage-failure UI was not injected; owner tests and source review cover failure/retry and week identity. Actual native lifecycle, keyboard, TalkBack, install/upgrade and notifications remain physical-device follow-ups.
- Representative large-history typing latency on Android is unverified; local storage writes the complete week collection on accepted edits.
- Idea Space draft displacement/context recovery remains a separate existing production follow-up. Settings save placement and retained Finance action styling are separately scoped design follow-ups.
- Locked dependencies unchanged; npm installation reports 21 dependency findings. Prior static Android applicability assessments remain in earlier records; no clean audit is claimed.

See [task](../tasks/2026-10-06-save-controls-autosave.md), [Product](../design/2026-10-06-save-controls-product.md), and [ready design](../design/2026-10-06-save-controls-design.md).
