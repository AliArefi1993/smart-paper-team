# Smart Paper Release: smart-paper-v2026.10.22

Date: 2026-10-13

Status: Signed artifact and independent final review accepted; public release verification pending.

## Scope

- Read saved Idea Space thoughts in a focused viewer and follow the original thought or direct branches, including branches outside current search results.
- Preserve unfinished writing, search and return context; keep existing branch lineage and storage contracts without adding independent-note links or schema changes.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.22` | Pending first release commit | Release docs, exact APK and provenance |
| backend `smart-paper/` | `smart-paper-v2026.10.22` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.22` | `c489284d9483d6d2a05004d429ee50b08ca9c186` | Exact source used by CI and protected stable signing |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 39 |
| Android versionName | `2026.10.22` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.22-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.22-release.apk` |
| APK size / SHA-256 | 4,393,408 bytes / `7d1d4091b4e339f775514f7ed4058463b0ccf08c40d054676aeaf090ab18cd89` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.22-provenance.json` |

## Validation

- Exact-source CI [38355977518](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38355977518) passed on frontend `c489284d9483d6d2a05004d429ee50b08ca9c186`: lint, type check, tests, local-data production build and isolated verification APK checks.
- Protected stable build [38356495797](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38356495797) passed for code39/name `2026.10.22`. The unsigned candidate passed before the exact-run protected approval; signing and final verification passed afterward.
- Candidate artifact `11793435373` (`stable-unsigned-c489284d9483d6d2a05004d429ee50b08ca9c186-1`) is 6,616,707 bytes with archive SHA-256 `fb2e11b9ab12087fd8f2a5bbfac95c62df48078939391023faa5c5e5d896252f`; its unsigned APK SHA-256 is `eb62a047950a6d82558c571e2691c24dc49d6977609a41f15763951e1fb86e6f`.
- Final artifact `11806519607` (`smart-paper-stable-c489284d9483d6d2a05004d429ee50b08ca9c186-1`) is 4,395,539 bytes with archive SHA-256 `a7c24d4260644d684e3d23783b37079f141dabc2f1404668de6dc1212e5b49d1`. The extracted APK checksum passes `SHA256SUMS` and matches the archive provenance.
- Independent final artifact Security accepted the exact candidate and signed APK: stable app ID/version/non-debug status, pinned v2/v3 certificate, 557 unchanged APK payload entries plus three signature entries, and all 113 web assets matched. No local rebuild was performed after hosted validation.
- The frontend source, final Designer handoff, focused tests, browser QA, independent correctness, QA and source Security were accepted. The available Samsung A15 (Android 16) was not detected over USB; physical Android and TalkBack results remain unverified.

## Release Notes

Idea Space makes a saved thought and its existing origin/branch lineage easier to read and navigate. Returning to writing preserves the draft and search context. Existing notes and backup contracts remain unchanged; independently saved thoughts are not automatically linked.

## Publication

Pending: create and push the annotated frontend and unchanged-backend tags, then the team tag last. Verify the published GitHub release and anonymously downloaded APK against the committed bytes and checksum, then update this record and GitHub release notes with the verified publication facts.

## Known Follow-Ups

- Physical Android installation/upgrade, data retention, native lifecycle and TalkBack remain unverified because the Mac currently detects no attached phone.
- Execute the adopted manual QA/discovery/maintenance checkpoint at the next normal work boundary; this is not a release gate.
