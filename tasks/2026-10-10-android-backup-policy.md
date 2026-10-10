# Task: Explicit Android backup and device-transfer policy

Status: in progress
Created: 2026-10-10
Updated: 2026-10-10

## Objective

Exclude Smart Paper app data from Android cloud backup while permitting Android device-to-device transfer where supported, preserving deliberate external JSON recovery and requiring fresh Finance unlock after a transferred installation starts.

## Context

- User selected this task and the cloud-excluded/device-transfer-allowed policy on 2026-10-10.
- Owning repositories: frontend application/configuration; team design, verification and release memory. Backend unchanged.
- Baseline frontend `deaad89`, team `e0c1e02`; all three working trees clean at entry.
- [Privacy assessment](../docs/privacy-local-data-review.md), [phone data-safety task](2026-10-08-android-data-safety-validation.md), [release workflow](../docs/release-workflow.md).

## Acceptance Criteria

- [x] Configure explicit applicable legacy and current backup rules; exclude cloud backup, permit supported Android device transfer, and document legacy limitations.
- [x] Finance authorization is not restored from persisted app storage; existing saved records and JSON import/export remain intact.
- [x] Ready Designer handoff covers concise English/Persian recovery disclosure before frontend copy implementation.
- [x] Relevant automated checks and independent Security/QA review pass; verify packaged manifest and rule resources.
- [ ] Publish a stable-signed Android release with exact-source/provenance/public download verification under standing authorization.
- [ ] Update durable product/privacy/architecture/release memory; distinguish static checks from unexecuted device recovery tests.

## Non-Goals

- Encryption, sync, iOS transfer, notification changes, backend changes, or guaranteed OEM migration behavior.
- Collection of personal data or claiming unexecuted phone/cloud/migration tests.

## Plan

1. Product/Security policy review and ready bilingual Designer handoff.
2. Implement version-appropriate XML rules and nonpersistent Finance authorization, preserving record storage.
3. Targeted regression checks, frontend/studio checks, independent QA and Security review.
4. Scoped commits/push, exact-source hosted release, independent artifact verification and public checksum check.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Baseline | `scripts/project-context.sh` | Three clean repositories |
| Frontend | Docker lint, TypeScript, all 70 tests, local-data production build | Passed |
| Studio | Typecheck/build; Designer EN/FA phone/wide Light/Dark review | Passed |
| Browser QA | [Bilingual report](../design/2026-10-10-android-backup-policy-qa.md); actual Finance → Export → Finance links, reload and retained synthetic income | Passed; fresh runtime locks, wrong PIN rejected |
| Security source review | Independent manifest/XML, authorization gates, disclosure and regression review | Accepted; no actionable finding |
| Documentation | `git diff --check`, 17 local links across nine files | Passed before release updates |
| Compiled APK | Hosted run `38078437740`, source `d899f2c`; independent `apksigner`, `aapt`, ZIP/hash and packaged JS review | Passed; all nine domain rules, no overriding agent, fresh memory authorization; pinned v2/v3 signer |
| Hosted source checks | Automatic CI `38078425679`; protected build `38078437740` | Passed; code 31 / `2026.10.14` |
| Artifact integrity | Final ZIP locally rehashed; extracted bytes match; APK 4,473,495 bytes / `24caacb6ead7bc953b45b2d4716bd39df9146093c664a38e3f5fb1dcba63c82b` | Passed; hosted 137-asset/payload comparisons not independently repeated, candidate digest metadata-only |
| Publication | Team tag publisher and anonymous public APK download | Pending |
| Actual OS cloud/D2D recovery, OEM behavior, TalkBack | Synthetic-data physical device testing | Not run |

## Decisions And Risks

- API 24–27 cannot express the chosen cloud-off/D2D-on distinction using `requireFlags`; exclude legacy backup there and use manual JSON recovery.
- API 28–30 uses device-transfer-required legacy includes; API 31+ uses separate cloud and transfer sections.
- Finance unlock held in memory expires within one hour and resets after full app runtime restart; persisted legacy deadlines must never authorize access.
- Device transfer remains OS/OEM-dependent and is not a substitute for a verified external JSON backup.

## Outcome / Handoff

Frontend `d899f2c9d66879bf899e09d3f8945412b6b6967b` committed/pushed. Implementation, automated/browser checks, exact-source hosted CI/protected signing and independent compiled APK/Security review accepted. Lead approved publication; routine owns exact artifact/provenance record, scoped team commit and frontend/backend/team tag order. Public checksum verification remains pending. Actual device recovery/OEM evidence remains a follow-up.
