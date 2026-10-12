# Smart Paper Release: smart-paper-v2026.10.19

Date: 2026-10-12

Status: Independent Security accepted; publication and anonymous download verification pending.

## Scope

- Make Finance optional in the offline Android app. New installations start hidden; existing installations with a saved Finance key retain visibility until explicitly changed.
- Settings saves the visibility choice immediately and independently of other drafts. Hidden direct access offers Settings recovery; navigation follows the same persisted choice.
- Hiding preserves records and existing PIN-gated backup/export/report access. Visibility stays outside JSON schema 5; import preserves the device choice.
- Keep backend work paused, Timer available by default, dependencies and stable signing identity unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.19` | Determined at release closeout | Exact APK, provenance and release memory |
| backend `smart-paper/` | `smart-paper-v2026.10.19` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.19` | `c0ada332093baea9ff2d0b83a953d37642a037f8` | Exact source used by CI and protected signing |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 36 |
| Android versionName | `2026.10.19` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.19-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.19-release.apk` |
| APK size / SHA-256 | 4,381,120 bytes / `5df46b4034264a0b31c200fe364ac12f4e13fc23847e34984cc879eff4f1791f` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.19-provenance.json` |

## Validation

- Exact-source CI [38276109486](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38276109486) passed on `c0ada332093baea9ff2d0b83a953d37642a037f8`.
- Protected stable build [38277577658](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38277577658) succeeded. First run `38276691881` failed an upstream Google Maven `lint-checks-31.13.0.jar` download with HTTP 503; the retry used unchanged source. An extra queued retry `38278388307` was cancelled before signing.
- Candidate artifact `11760645019`, original ZIP 6,561,019 bytes, SHA-256 `57d77400edcbe20f2f6c549c6fbdd8bb3dc8568567bd3b37daaba6b48845bb90`; unsigned APK SHA-256 `9bee4bebc25a10bdde4d6549e15a82fda34741037b4c7f87075f693f8b40d966`.
- Final artifact `11759703107`, original ZIP 4,383,251 bytes, SHA-256 `8579dd44f0f6e639473efe670bd31d7cde516e45b18e45de43bc0875a5e35cca`. Original archives are retained in `/private/tmp/smart-paper-release-2026.10.19/`; local digests match immutable GitHub metadata.
- Routine verification passed: checksum/provenance source/run/version/package/local mode; one valid pinned signer across APK v2/v3; correct app ID, code36/name and non-debug status; all 557 unsigned payload entries and 113 web assets match the final APK, with only three signature records added. Independent Security independently confirmed archives, signature/identity, payload/assets and packaged visibility/PIN/import disclosures; no actionable finding remained.
- Source Security accepted storage failure/concurrency/import handling and the actual controlled-clock expiry witness: hide, advance 61 minutes and re-enable produced zero saved-income appearances before deliberate PIN unlock. Saved goal 1000/income 28 remained intact. This is browser evidence, not native lifecycle certification.
- All 102 tests, ESLint, TypeScript and local-data build passed; final copy-only correction passed lint/types/build before exact-source hosted checks. Final Designer accepted actual EN/FA phone/wide Light/Dark evidence and complete record/backup/PIN disclosures.
- Lead browser QA covered new hidden default, saved-key upgrade, immediate toggle preserving Settings drafts, maintainer Cancel retaining the draft, reload persistence, navigation/direct-route recovery, PIN retention, hidden JSON export/Merge restore and live import hints. See [implementation evidence](../design/evidence/2026-10-12-finance-visibility/implementation/README.md).
- Verified task-owned preview processes are absent and ports 6006/8880/8890/8891 are clear; Docker daemon/SDK volume preserved. Backend checks were not rerun because source is unchanged. No local APK rebuild followed hosted validation.

## Release Notes

Finance can now be shown or hidden from Settings without deleting its saved records or changing its PIN protection. Fresh installations start hidden; existing saved Finance stays discoverable. Backups and exports keep their existing access and inclusion rules.

## Publication

Independent Security artifact acceptance passed. Release tags, publisher workflow and anonymous public APK checksum verification remain pending.

## Known Follow-Ups

- Physical-device upgrade/data retention, lifecycle, keyboard, enlarged-font and TalkBack checks remain unverified.
- Local Finance PIN remains a screen lock, not data encryption; full JSON backups are unencrypted.
- Dependency audit and native/runtime limits remain as recorded in the preceding framework release; no dependency changes in this release.
- Backend/hosted web remain paused. The next selected task is the viewed-week Planner AI report shortcut; implementation follows this release closure and its ready design handoff.
