# Task: Stable release pipeline check

Status: complete
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Publish the user-requested stable Android 2026.10.9 / code 26 and verify the complete build, CI and publication path. Application behavior is unchanged from 2026.10.8; this is a release-process check after frontend CI was added.

## Context

- Owning repositories: frontend for Android version; team for artifact/record/status; backend unchanged.
- [Release workflow](../docs/release-workflow.md) and [CI task](2026-10-07-github-actions-ci-android-builds.md).
- User explicitly authorized the new release on 2026-10-09.

## Acceptance Criteria

- [x] Increasing Android version and successful hosted checks on the release frontend revision.
- [x] Fresh local-data stable APK has stable app ID, non-debug status, expected certificate/version and byte-matching exported assets.
- [x] Scoped commits pushed and annotated release tags in all three repositories; team tag last.
- [x] Published non-draft APK download matches committed SHA-256/size.
- [x] Release record and current status are accurate; all repositories clean; task-owned processes stopped.

## Non-Goals

- New app behavior, production deployment, or moving stable signing secrets to CI.

## Plan

1. Routine bumps version, builds/verifies stable APK and reports evidence; Security reviews the bounded release.
2. Lead accepts evidence and prepares release memory; Routine commits/pushes, tags and verifies publication.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Hosted release revision | Frontend `fada7d8`, [run 37897954237](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37897954237) | Lint/types/all 57 tests/local build/sync/verification APK and artifact passed |
| Fresh stable APK | Documented Docker build; apksigner/aapt and byte comparison | Stable ID/label, nondebug, code 26/name 2026.10.9 and expected stable cert; all 136 files match; two zero-byte bridge shims |
| Independent Security | Narrow version diff and independent candidate ZIP/checksum/asset comparison | Accepted, no blockers |
| Candidate | `releases/artifacts/SmartPaper-local-2026.10.9-release.apk` | 4,415,512 bytes; SHA256 `5cc4ea722748a505ca39a4e37ed2bb4059003d3cab9e3d39e5cd122b69688d94` |
| Publication | Team release `951f0c7`, [publisher 37899216492](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37899216492); all three annotated tags | Passed; public release/asset download available; downloaded size 4415512/SHA256 exactly match candidate. Initial API 404 did not prevent independent public-page/download proof |
| Existing product/backend QA | Unchanged product/backend code | Prior bilingual/report QA and backend 33-test/no-migration evidence reused |

## Decisions And Risks

- Design: not applicable; only release metadata changes.
- GitHub verification APKs use separate identity/debug keys. Stable signing stays local; the team publisher uploads the committed stable artifact.
- Physical Android upgrade/data retention, clipboard/recipient delivery and TalkBack remain unverified follow-ups.

## Outcome / Handoff

Published [Android 2026.10.9/code 26](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.9). Hosted checks, stable signing/identity/version/assets, independent Security review, tag publisher and public-download checksum passed. Tagged revisions: team 951f0c7, frontend fada7d8, backend 68c789b; all three branches main and clean at publication. Final documentation closeout follows without moving tags. Build/session/push processes finished and Docker containers exited; no task-owned processes remain. Physical-phone follow-ups remain with the maintainer. Stable signing stays local; hosted signing is still future work.
