# Smart Paper Release: smart-paper-v2026.10.11

Date: 2026-10-09
Status: Published; anonymous public APK download matches the committed stable artifact.

## Scope

- Finance session expiry handling; no backend change or data migration.
- Exact hosted stable APK built from frontend `052be41c465669b2a3a18342fd443f96a8fc3c5b` after exact-source CI and lead acceptance.
- Android versionCode 28 / versionName `2026.10.11`; hosted signing key stayed in the protected GitHub environment.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.11` |
| Frontend source and tag target | `052be41c465669b2a3a18342fd443f96a8fc3c5b` |
| Backend tag target | `68c789b` (unchanged) |
| Team root tag target | `f85ed4f158e44fd2142a9ac1fe22f8b9245685a6` |
| Android | versionCode 28; versionName `2026.10.11`; app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.11-release.apk` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.11-provenance.json` |
| APK SHA-256 / size | `83e19d56c73159fa8bd9ba834d4b01838756ba8e9c224f43a0980dc19f743e52` / 4,469,135 bytes |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Hosted Build Evidence

| Check | Result |
| --- | --- |
| Automatic frontend verification CI | [Run 37980072688](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37980072688) passed on the exact frontend source |
| Protected hosted build | [Run 37980511818](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37980511818) completed successfully; unsigned job 113989530809 and protected signer passed |
| Final artifact | ID `11641098506`, `smart-paper-stable-052be41c465669b2a3a18342fd443f96a8fc3c5b-1`; GitHub archive digest `sha256:d488c7c8b05211043e596f2e785a6f9a21a69674574c9fafba0c70c15c63ec05` |
| Candidate artifact | ID `11639999103`; archive digest `sha256:b40edd3cfc278e505599707d6523e5e6df78808825f5d6c26174a1c49d569706` |
| Download and checksum | Exact final artifact downloaded; `SHA256SUMS` passed. APK SHA-256 and size match the values above. |
| Provenance | Matches run `37980511818`, source SHA above, code 28/name `2026.10.11`, app ID, non-debug status, 136 compared web assets and candidate artifact. |
| APK verification | v2/v3 signatures verified with one pinned stable signer; package ID, version and certificate match. Independent Security review accepted the exact signed APK and provenance. |
| Archive digest | GitHub API artifact metadata reports the final/candidate archive digests above; the original ZIP was not retained for a local rehash. |
| Packaged assets | Hosted workflow provenance records 136 compared web assets; no local rebuild was used. |

## Validation

- Frontend Docker: `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test` (66 passed), and `NEXT_PUBLIC_DATA_MODE=local npm run build` passed. Install reported 21 dependency advisories (1 low, 4 moderate, 14 high, 2 critical); no clean audit is claimed.
- Automatic frontend CI passed on the exact source SHA. The hosted stable workflow also passed its unsigned APK and packaged-asset verification before protected signing.
- Design studio Docker clean install, typecheck and build passed after adding the two missing optional `@emnapi` lock entries; the Storybook build emitted its existing large-chunk warning.
- Designer accepted English/Persian Light/Dark phone layouts at 390px and bilingual 360px wrapping. Lead synthetic browser QA passed expiry/focus/visibility, active polling, draft/PIN/message clearing, wrong-PIN recovery, and saved-record retention/re-unlock cases.
- Independent sensitive-source review accepted the final implementation. Backend remained unchanged at `68c789b`; its prior 33-test/no-migration evidence was reused.
- Physical Android lifecycle/upgrade, keyboard and TalkBack checks remain unverified.

## Publication

The [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.11) was published by [publisher run 37982644853](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37982644853). Anonymous asset `625997631`, `SmartPaper-local-2026.10.11-release.apk`, was downloaded and matches the committed artifact byte-for-byte: 4,469,135 bytes and SHA-256 `83e19d56c73159fa8bd9ba834d4b01838756ba8e9c224f43a0980dc19f743e52`. No local rebuild was used.

## Follow-Ups

- Physical Android suspension/lifecycle, upgrade/data retention, backup/restore, keyboard and TalkBack remain unverified.
- Existing dependency advisories remain as listed above.
