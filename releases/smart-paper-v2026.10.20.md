# Smart Paper Release: smart-paper-v2026.10.20

Date: 2026-10-13

Status: Independent Security accepted the signed artifact; publication and anonymous checksum verification pending.

## Scope

- Add a Planner action that opens the existing selective AI report for the loaded week, with its Saturday–Friday date range preselected.
- Preserve deliberate field selection and transfer, Finance exclusion and unlock rules, offline report preparation, and explicit recovery for invalid context, failed saves, and active editors.
- Keep direct Export defaults, backend behavior, and the default Timer experience unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.20` | Pending | Release record and exact reviewed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.10.20` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.20` | `4f62d32f493867625ff828fd765b8a1244372036` | Exact source used by CI and protected signing; tag pending |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 37 |
| Android versionName | `2026.10.20` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.20-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.20-release.apk` |
| APK size / SHA-256 | 4,381,120 bytes / `784d4f232c0fc0c5bc8dcad1c9857b528aa71ccedb25e15dae5c66289d956f79` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.20-provenance.json` |

## Validation

- Exact-source CI [38308396886](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38308396886) passed on `4f62d32f493867625ff828fd765b8a1244372036`.
- Protected stable build [38308970779](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38308970779) succeeded for code 37/name `2026.10.20`.
- Candidate artifact `11774301453`, original ZIP 6,564,765 bytes, SHA-256 `147f90758e30aa64ad254ca278147ad8da4d383275207131d3bcce5c3e66e65b`; unsigned APK SHA-256 `9f976950196f733a473ed53ba6dee030be146ac44eb2412fe4821cca5d2eb073`.
- Final artifact `11774266633`, original ZIP 4,383,251 bytes, SHA-256 `badd550c202b3620d473db63b7265b39720a3de401097787b31e263ab0d7f3b7`. Candidate and final ZIPs are retained in `/private/tmp/smart-paper-release-2026.10.20/`; local archive hashes match GitHub artifact metadata.
- Routine checks passed: `SHA256SUMS` and provenance bind the exact source/run/version/package/local mode, candidate ID/archive hash, unsigned/final APK hashes, 113 web assets, and pinned stable certificate. Docker `apksigner` verified one signer across APK v2/v3; `aapt` reports package `com.aliarefi.smartpaper`, code 37/name `2026.10.20`, and non-debug status. All 557 unsigned APK entries and 113 packaged web assets match; only three signature records were added.
- Source Security and final Designer accepted. All 110 tests, lint, TypeScript, local-data build, and synthetic browser checks for empty/past/future weeks, privacy, invalid context/recovery, failed saves and active editors passed. See [implementation evidence](../design/evidence/2026-10-12-planner-ai-shortcut/implementation/README.md).
- Independent Security accepted the exact signed artifact: stable v2/v3 signature and identity, provenance, all 557 APK payload entries, all 113 web assets, and packaged Planner behavior passed with no finding. Public publication and anonymous checksum verification remain pending. No local APK rebuild was performed after hosted validation.

## Release Notes

Planner can open the selective AI report for the week currently being viewed, including past or future weeks. The date range remains editable, Finance stays excluded by default, and users still preview and deliberately transfer the report.

## Publication

Independent Security accepted the exact signed APK. The release tag, publisher workflow, and anonymous public APK checksum verification remain pending.

## Known Follow-Ups

- Native clipboard and recipient-app delivery, lifecycle, upgrade/data retention, and TalkBack behavior remain unverified.
- Report preparation is offline; receiving a cloud AI response requires internet. No Smart Paper server or AI account integration is introduced.
- Backend and hosted-web work remain paused; Timer stays available by default.
