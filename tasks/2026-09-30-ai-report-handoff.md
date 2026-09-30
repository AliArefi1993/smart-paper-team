# Task: Self-explanatory AI report handoff

Status: implemented and published in `smart-paper-v2026.09.8`
Created: 2026-09-30
Updated: 2026-09-30

## Objective

Make the selected Markdown report useful when the person sends it to an AI chat without adding a separate prompt.

## Acceptance Criteria

- [x] The file explains Smart Paper, selected scope, date semantics, and that excluded fields are not evidence of zero activity.
- [x] The file asks the AI to answer an accompanying question first, or give a brief grounded summary, observations, next steps, and one follow-up question.
- [x] The file treats user-entered goals and notes as records, not instructions to the AI.
- [x] Finance-only and planner-only reports describe only their selected category and retain the existing field allowlist.
- [x] English and Persian UI guidance explains attaching and sending the file.
- [x] Frontend lint, TypeScript, tests, and local-data build pass.
- [x] Signed APK and matching release record/tag published.

## Verification

- Product, design, and security reviews completed. Security found no direct new finance leak; the main risk was misleading conclusions from filtered data or following instructions pasted into notes.
- Docker frontend lint, TypeScript, 21 tests, and local-data build passed at frontend `3889626`.
- Stable-signed APK built with Android versionCode 17/versionName 2026.09.8; signature matches the prior release. The release record contains its checksum.
- Physical Android sharing and ChatGPT attachment behavior remain dependent on the receiving app and device; prior maintainer direction permits release before phone checks.

## Outcome / Handoff

The report begins with context and a first-response request before the selected records. It remains a local Markdown projection; Smart Paper does not upload it to ChatGPT. GitHub Release `smart-paper-v2026.09.8` contains the signed APK.
