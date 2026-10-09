# Smart Paper Release: smart-paper-v2026.10.10

Date: 2026-10-09
Status: Published; anonymous public APK download matches the committed stable artifact.

## Scope

- Maintainer-authorized stable Android release using the exact GitHub-hosted APK for frontend `38f19c1a6a151fce04a02c951a06dab6ae9a1f76`.
- Version-only change: Android code 27 / `2026.10.10`; no application behavior or data migration changes.
- The hosted signing key remains in the protected GitHub environment. Agents did not read or upload signing secrets.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.10` |
| Frontend source | `38f19c1a6a151fce04a02c951a06dab6ae9a1f76` |
| Frontend tag target | `38f19c1` |
| Backend tag target | `68c789b` unchanged |
| Team root tag target | `67e24d0` |
| Android | versionCode 27; versionName `2026.10.10`; app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.10-release.apk` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.10-provenance.json` |
| APK SHA-256 / size | `e1c3946eb8a9150c9de648992a1353d38345faf6b9022c2adbb30fccc3269c46` / 4,469,135 bytes |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Hosted Build Evidence

| Check | Result |
| --- | --- |
| Automatic frontend verification CI | [Run 37920967920](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920967920) passed on the exact frontend source |
| Protected hosted build | [Run 37920986616](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920986616) completed successfully; unsigned job 113788594336 and protected signer job 113790039745 passed |
| Final artifact | ID `11612476619`, `smart-paper-stable-38f19c1a6a151fce04a02c951a06dab6ae9a1f76-1`; GitHub archive digest `sha256:f8f4b7c236e7826c9b54942f1b347ae8fbb52eac7b3e0a807a6390d443a8aea1` |
| Candidate artifact | ID `11612581391`; provenance candidate archive digest matches GitHub REST digest `sha256:a4ce1a73a4cd6c6b785c117bbc78459d8bb6e49584f656412e3f4ad6d4a11e22` |
| Download and checksum | Exact final artifact downloaded; `SHA256SUMS` passed. APK checksum and size match the values above. |
| Provenance | Matches run `37920986616`, source SHA above, code 27/name `2026.10.10`, app ID, non-debug status and 136 compared web assets. |
| Independent Security review | Passed: v2/v3 signatures verified with one pinned stable signer; package, version, non-debug status, checksum and provenance accepted. |

## Publication

The [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.10) was published by [publisher run 37922107371](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37922107371). The public asset `SmartPaper-local-2026.10.10-release.apk` (asset ID `624735317`) was downloaded anonymously; it is 4,469,135 bytes and matches the committed artifact byte-for-byte with SHA-256 `e1c3946eb8a9150c9de648992a1353d38345faf6b9022c2adbb30fccc3269c46`. No local rebuild was used.

## Follow-Ups

- Physical Android upgrade/data retention, backup/restore, clipboard/chooser/recipient behavior and TalkBack remain unverified.
- Independent CI verification-archive extraction, fork/cancellation/cache-hit runs, and account-specific billing usage remain unverified.
