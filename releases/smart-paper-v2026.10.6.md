# Smart Paper Release: smart-paper-v2026.10.6

Date: 2026-10-07
Status: validated stable-signed release; publication triggered by the coordinated tag.

## Scope

- Protect Idea Space writing before Edit/Branch/Cancel; recover contextual new/edit/branch drafts, including legacy text.
- Preserve writing when its source is missing or changed; offer explicit Keep as new thought instead of silent overwrite.
- Report draft/note/cleanup failures separately and retry safely without duplicate notes.
- Confirm Finance income deletion; improve named commit-control targets.
- Add the existing validated Settings save action after its full form. Planner autosave remains unchanged.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.6` |
| Frontend | `37f3d2a` |
| Backend | `68c789b` unchanged |
| Team | Release artifact/record/design/frontend pointer commit |
| Android | versionCode 23; versionName `2026.10.6`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.6-release.apk` |
| SHA-256 / size | `80cdf16d9bbc378f2b5c7365fe14475d587c6baf39d855e3a5a4d0b7efe99ce8` / 4,413,052 bytes |
| Certificate SHA-256 | Verified stable `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Verification

| Check | Result |
| --- | --- |
| Backend | Unchanged; reuse prior 33-test/no-migration evidence |
| Studio | Typecheck/build and bounded EN/FA phone-column/wide review passed |
| Frontend / independent review | Docker lint, TypeScript, all 37 tests and local-data production build passed; final independent review has no blockers |
| Actual UI | Bounded desktop Chrome Ideas new/edit/branch reload and dirty cancellation; Settings invalid focus/save/read-back; EN/FA Finance cancellation and wide dark layout passed. Phone/fault/native scenarios remain unexecuted; see QA |
| Signed APK / packaged assets | Gradle release build, apksigner and aapt passed; code23/name2026.10.6; all 136 exported files byte-match APK assets |
| Physical Android / TalkBack | Unverified follow-ups |

See [task](../tasks/2026-10-06-audit-followups.md), [design](../design/2026-10-06-audit-followups-design.md), and [QA](../design/2026-10-06-audit-followups-qa.md) for exact scope/evidence.

## Boundaries

- Drafts are unfinished private writing, excluded from JSON backups/reports. Existing saved-note backup schema remains compatible.
- Local storage failure plus process termination cannot guarantee recovery; failure feedback must not imply successful saving.
- Native keyboard/Back/process recreation/notifications and TalkBack remain physical-device follow-ups; browser or source checks do not establish them.
- Dependency locks unchanged; prior audit findings/applicability assessments remain in earlier release records. No clean dependency audit is claimed.
