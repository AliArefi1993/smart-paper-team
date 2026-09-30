# Task: Android AI-report release candidate

Status: released at maintainer direction; local post-release QA in progress
Created: 2026-09-30
Updated: 2026-09-30

## Objective

Prepare and publish a stable-signed `smart-paper-v2026.09.6` APK containing the selective AI report and backup improvements, then continue QA locally. The maintainer directed publication before physical-phone checks.

## Context

- Release workflow: `docs/release-workflow.md`.
- Frontend scope: commits `f327cf2` and `6930db0`; backend unchanged.
- `releases/NEXT.md` tracks the pending gate.

## Acceptance Criteria

- [x] Android versionCode 15 and versionName 2026.09.6 are packaged.
- [x] Stable-signed APK certificate and SHA-256 are recorded.
- [x] Relevant automated frontend and backend checks pass.
- [ ] Post-release QA documents local results and device-only gaps.
- [x] Matching release record, APK artifact, and three repository tags are pushed in release order.

## Verification

| Check | Result |
| --- | --- |
| Frontend lint, TypeScript, tests, local-data build | Passed at `6930db0`: 18 tests |
| Signed APK build and signature | Passed; stable cert `59912e19…2a5`, APK SHA-256 `a718260a…2cd1d` |
| Backend | 33 tests and migration check passed |
| Physical phone | Not available in this workspace |

## Decisions And Risks

- The maintainer explicitly directed this release before physical-phone checks and asked for local QA afterward.
- The previous `.5` release also has a pending physical-phone retest.

## Outcome / Handoff

Frontend revision `82b46d0` and the stable-signed APK are published in `smart-paper-v2026.09.6`. Full artifact metadata and checksum are in the release record. Continue local QA and record any device-only gaps.
