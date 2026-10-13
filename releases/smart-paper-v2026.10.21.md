# Smart Paper Release: smart-paper-v2026.10.21

Date: 2026-10-13

Status: Independent final artifact Security accepted the signed APK; publication and anonymous checksum verification pending.

## Scope

- Let a person replace a known local Finance PIN offline through Settings. Verify the current PIN, enter and confirm a new 4–12 digit PIN, persist a salted verifier, and immediately relock protected Finance and report/export work.
- Keep PINs out of JSON backups; imports preserve the receiving device's credential. There is no in-app recovery for a forgotten custom PIN, and the existing full JSON backup/import continues to require the PIN.
- Default Finance visibility to true only when no preference is saved. Preserve an existing saved hidden/visible choice and the explicit visibility setting.
- Keep Finance excluded by default from AI reports. Backend behavior, Timer availability and existing Finance records remain unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.21` | Pending | Create only after independent final artifact Security acceptance |
| backend `smart-paper/` | `smart-paper-v2026.10.21` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.21` | `4a6736df8d98770ab608334583d1ba8a5ac1403d` | Exact source used by CI and protected stable signing |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 38 |
| Android versionName | `2026.10.21` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.21-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.21-release.apk` |
| APK size / SHA-256 | 4,389,312 bytes / `5866485c0a266e6ecca1485c7d3cd4e870e888ce3c4ad4100fc0bef9675ece69` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.21-provenance.json` |

## Validation

- Exact-source CI [38334342301](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38334342301) passed on `4a6736df8d98770ab608334583d1ba8a5ac1403d`: 121 tests, lint, type check, local-data production build, and isolated verification APK packaging.
- Protected stable build [38334700023](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38334700023) passed for Android code 38/name `2026.10.21`. Standing-authorized stable-signing environment approval was submitted only after the exact-source unsigned candidate passed and its provenance was checked.
- Candidate artifact `11784845532`, ZIP 6,603,491 bytes, SHA-256 `eec6a9d814873c0bc259ceb978fec9dc86ac610d2f6f9728459d7b24c7e8e33d`; unsigned APK SHA-256 `429006287c5a2045bde627671dd7bc689914c360e88cfad526443bcac601e3fa`.
- Final artifact `11786651262`, ZIP 4,391,443 bytes, SHA-256 `c8012ab81af11d4ba23ed89fc60aaacddde61ac05522812e8cc71d29aa1688f9`. Original candidate and final ZIPs are retained in `/private/tmp/smart-paper-release-2026.10.21/`; hashes match GitHub artifact metadata.
- Final provenance binds source/run/version/package/local mode, candidate artifact ID and archive hash, unsigned/final APK hashes, 113 web assets and the pinned stable certificate. `SHA256SUMS` passes. Read-only SDK `apksigner` verified APK v2/v3 and one signer; `aapt` reports the expected app ID/version. All 557 unsigned APK payload entries match the signed APK byte-for-byte, with only the three expected signature records added; all 113 packaged web assets match the candidate build.
- Source Security and QA accepted the implementation; final Designer accepted the PIN and default-visible states. Actual built-browser checks covered new-install visible default, saved preference persistence, PIN empty validation and Cancel, independent Settings drafts, direct fragment navigation, locked Finance, and report exclusion. The PIN was not actually changed through browser automation; synthetic automated credential tests cover cryptography, persistence, concurrency and failure behavior.
- Independent final artifact Security accepted the exact APK/provenance with no finding: API/archive hashes, source/version/local identity, non-debug status, one pinned v2/v3 signer, all 557 unchanged payload entries and all 113 web assets passed. No local APK rebuild was performed after hosted validation.

## Release Notes

Finance can remain visible by default on a fresh install without changing an existing saved visibility choice. A person can change a known Finance PIN from Settings; each change relocks protected views, and PINs remain outside backups. Reports continue to exclude Finance unless deliberately enabled through the existing authorization flow.

## Publication

Independent final artifact Security accepted the exact signed APK. Publication and anonymous public verification remain pending. Commit the exact APK and provenance with the release record, push scoped commits, create annotated frontend and unchanged-backend tags first and the team tag last, then verify the anonymous public APK bytes and update this record before syncing release notes.

## Known Follow-Ups

- Actual PIN-change interaction with a real credential, native Web Locks/multi-window behavior, OS transfer, Android install/upgrade and data retention, keyboard/lifecycle interruption, and TalkBack remain unverified.
- A forgotten custom PIN has no in-app recovery path. The existing full JSON backup/import also requires the PIN; backups do not include it.
- Backend and hosted-web work remain paused; Timer remains available by default. Physical-device validation remains open.
