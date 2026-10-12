# Smart Paper Release: smart-paper-v2026.10.17

Date: 2026-10-12

Status: Published and publicly verified.

## Scope

- Upgrade the offline XLSX writer to official vendored SheetJS CE 0.20.3, preserving the existing six-sheet export format and local export contract.
- Add regression coverage for workbook compatibility, locked/expired Finance, failed writes, and a bounded year-sized synthetic planner.
- No backend change, data migration, new workbook feature, or user-visible copy/flow change.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.17` | `860bf687eefdb8d074bf28b5373c69e61ed79687` | Release record and exact reviewed APK artifact |
| backend `smart-paper/` | `smart-paper-v2026.10.17` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend work remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.17` | `41e6b2e4daf4f5d67529a6d0fb97430ae5c90163` | Exact source used by hosted CI and stable build |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 34 |
| Android versionName | `2026.10.17` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.17-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.17-release.apk` |
| APK size / SHA-256 | 4,420,022 bytes / `957b380aada0313b348b58e6c799882d4ed30806f9b7a2eb815c22800d500061` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.17-provenance.json` |

## Validation

- Frontend Docker Node 24 validation passed: clean install, lint, TypeScript, all 90 tests, local-data production build, and audits. Full-install audit: 20 findings (1 low, 4 moderate, 13 high, 2 critical). Production audit: 6 findings (1 moderate, 4 high, 1 critical); this is not a clean audit. See the [upgrade task](../tasks/2026-10-12-spreadsheet-writer-upgrade.md) for the measured export size/time and audit scope.
- Exact-source frontend CI [38209364570](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38209364570) succeeded on `41e6b2e4daf4f5d67529a6d0fb97430ae5c90163`.
- Protected stable build [38209384856](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38209384856) succeeded for code 34/name `2026.10.17`. Candidate artifact `11728887296`, archive SHA-256 `7a5114c88988e580799dcd64a4f7e633f6959fd7d1eadfd368b444664ad0b94d`; unsigned APK SHA-256 `2f16acc29aabee2ae8a777042b7b6ff7a25756ad4fdadb8fe765e6f317515f7c`.
- Final artifact `11729141851`, archive SHA-256 `230c7fd1478234f20250b818d019240a3b661b303058e4c088e1fee0727f25fe`. The original candidate and final ZIP archives are preserved in `/tmp/smart-paper-release-2026.10.17/`; local digests match GitHub artifact metadata. The final `SHA256SUMS` matches the committed APK and provenance records the exact source, run, version, candidate artifact/digest and stable certificate.
- Independent Security review accepted the final artifact: one cryptographically valid stable signer across APK v2/v3; correct app ID, version and non-debug status; all 581 candidate APK payload entries match (the three signature records are added during signing); all 137 web assets match; the bundled app uses SheetJS 0.20.3 with no runtime SheetJS CDN. No actionable artifact finding remained.
- Backend checks were not rerun because its source is unchanged. No local APK rebuild was performed after hosted validation.

## Release Notes

The existing XLSX export now bundles maintained SheetJS CE 0.20.3 from the committed vendor tarball, so local exports do not depend on the retired public-registry package or a runtime CDN. Workbook sheets and export behavior remain unchanged. The production audit count decreased from the recorded 7-package baseline to 6 packages; unrelated findings remain.

## Known Follow-Ups

- Physical-device spreadsheet opening/rendering, Persian cell display, chooser behavior and low-memory export remain unverified.
- Existing backup/restore, upgrade/data-retention, launcher, timer lifecycle, native accessibility and TalkBack follow-ups remain open; this release does not certify them.
- Backend and hosted-web work remain paused. Framework/build-tool refresh is the next readiness-first backlog task.
- Publisher workflow [38210724200](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38210724200) succeeded; public GitHub Release: https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.17 (asset ID `632842140`). Anonymous download was 4,420,022 bytes and SHA-256 `957b380aada0313b348b58e6c799882d4ed30806f9b7a2eb815c22800d500061`, matching the committed APK byte-for-byte.
