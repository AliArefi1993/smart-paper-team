# Smart Paper Release: smart-paper-v2026.10.18

Date: 2026-10-12

Status: Stable-signed and independently reviewed; team tag publication pending.

## Scope

- Refresh the offline Android framework/build dependency set, including Next.js and aligned ESLint config 16.4.0, and Capacitor Android/core/CLI 8.5.1.
- Keep React 19.2.4, Capacitor major 8, the vendored SheetJS CE 0.20.3 writer, app behavior, data contract, and stable signing identity.
- No backend, data migration, or user-visible flow change.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.18` | Release-preparation commit containing this record and exact APK | Tag is created and pushed last after this commit is pushed |
| backend `smart-paper/` | `smart-paper-v2026.10.18` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend work remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.18` | `047e4bd15d9542693fe03d1e6c4f42d65d798a65` | Exact source used by hosted CI and stable build |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 35 |
| Android versionName | `2026.10.18` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.18-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.18-release.apk` |
| APK size / SHA-256 | 4,376,928 bytes / `fe6b8b1de15daf76d09a12820ececd34be7246ee165579ade3ae7e7c5e9c1536` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.18-provenance.json` |

## Validation

- Exact-source CI [38212196581](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38212196581) passed on `047e4bd15d9542693fe03d1e6c4f42d65d798a65`.
- Protected stable build [38212221396](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38212221396) succeeded for code 35/name `2026.10.18`. Candidate artifact `11729891190`, original ZIP 6,533,291 bytes, SHA-256 `7b2d83c577edebed09ce3dc20b34c8cdfe86a7189f697b25e8a3f42438c49bb8`; unsigned APK SHA-256 `e0d2a4809678452418c4469808462f15feff6c54a491d696841fd10c475bc34b`.
- Final artifact `11730385657`, original ZIP 4,379,059 bytes, SHA-256 `b6589ef905eaeee73002593025c68d2a0eda076285e97afce135da464defa7c3`. Candidate and final original ZIPs are preserved in `/tmp/smart-paper-release-2026.10.18/`; local archive digests match GitHub metadata. `SHA256SUMS` matches the committed APK and provenance.
- Provenance binds source, run, version, app ID, local-data mode, 112 compared web assets, candidate artifact ID/archive digest, unsigned/final APK hashes, and pinned certificate.
- Independent Security accepted the compiled artifact and provenance: one cryptographically valid stable signer across APK v2/v3; correct app ID/version and non-debug status; 556 candidate APK entries match (three signing records added); 112 web files match; compiled DEX confirms Capacitor Android 8.5.1 proxy navigation guards run before plugin hooks and disabled HTTP/document settings reject the inspected paths. No actionable finding remained.
- Frontend Docker validation on the same source passed fresh install, lint, TypeScript, all 90 tests, local-data static build, and Capacitor sync. Production npm audit: 0 findings; full-install audit: 8 findings (5 high, 3 moderate, 0 critical). These package scopes do not establish whole-APK or future-advisory safety. Details and residual paths are in the [framework task](../tasks/2026-10-12-framework-refresh.md).
- Lead browser smoke on the final static build covered seven routes, English/Persian planner persistence, Timer start/pause, Idea Space save/reload, Finance relock after reload, and an actual XLSX ZIP/XML export with six sheets, Persian text and no formulas. No console warnings/errors observed. This is browser evidence, not physical-device verification.
- Backend tests were not rerun because backend source is unchanged. No local APK rebuild was performed after hosted validation.

## Release Notes

The framework and build dependencies were refreshed within the existing majors; the Capacitor Android proxy-navigation security patch is included. Existing offline Android behavior, data, and export contract are preserved. The audited npm scopes are improved while residual findings and a forthcoming advisories disclosure remain explicitly unverified.

## Known Follow-Ups

- Public GitHub Release and anonymous APK download verification are pending the team tag publisher.
- Physical-device keyboard, lifecycle, accessibility, spreadsheet rendering, install/upgrade and data-retention behavior remain unverified.
- Five high full-install package findings share the braces advisory and three moderate findings share the CLI/xcode UUID advisory; see the task record for exact dependency paths. The announced October 14 disclosure remains unpublished as of this release preparation.
- Backend and hosted-web work remain paused. Finance visibility has been selected as the next product task; its bilingual Designer handoff is in progress.
