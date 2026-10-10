# Smart Paper Release: smart-paper-v2026.10.13

Date: 2026-10-10

Status: Published; anonymous public APK download matches the committed stable artifact.

## Scope

- Constrained the Planner schedule event editor to the dynamic viewport and enabled internal vertical scrolling, keeping its heading, fields, validation and actions reachable on short landscape screens.
- Frontend source: `deaad89e3083d270fa74d7988c2ab99162cab674`; backend unchanged.
- Android versionCode 30 / versionName `2026.10.13`; hosted stable signing used the existing protected stable identity.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Release tag | `smart-paper-v2026.10.13` |
| Team root target | `74f9696b7d547177c2cd77da4c3c0152151cf378` |
| Backend | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` (unchanged) |
| Frontend source | `deaad89e3083d270fa74d7988c2ab99162cab674` |
| Android | versionCode 30; versionName `2026.10.13`; app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.13-release.apk` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.13-provenance.json` |
| APK SHA-256 / size | `3189b69e5e79f6afd50dafbde7852f3fd4f925f77e23769ea22bc6c4a041d1d3` / 4,469,135 bytes |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Hosted Build Evidence

| Check | Result |
| --- | --- |
| Automatic frontend CI | [Run 38076385159](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38076385159) passed on the exact frontend source, including lint, TypeScript, tests, local-data build and isolated verification APK checks. |
| Protected hosted build | [Run 38076417837](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38076417837) passed candidate validation and protected signing for the exact source. |
| Candidate artifact | ID `11679366249`; GitHub archive metadata digest `sha256:4a895f75b68b6655e26331ffed6472c0f99e51cb29889e85c69bb68964194045`. |
| Final artifact | ID `11679541147`; GitHub archive metadata digest `sha256:8cd27b2d27b4569f36455b12d5a2184ca5ec5a6805bcf0b30091b4d3e4574d0f`. |
| APK verification | `SHA256SUMS` passed. Independent Security accepted the APK's v2/v3 signatures with one pinned 4096-bit RSA signer, app ID, version, non-debug status, exact source/run, and API artifact IDs/digests. |
| Provenance | Matches source/run, version, app ID, local-data mode, candidate association and APK hash; records 136 compared web assets and the stable certificate fingerprint. |
| Archive digests | GitHub API metadata only; original ZIP bytes were not retained for local archive rehash. |

## Validation

- Frontend Docker `npm run lint`, `npx tsc --noEmit`, and `npm test` passed (66 tests). The local install reported 21 dependency advisories (1 low, 4 moderate, 14 high, 2 critical); no clean audit is claimed.
- Docker local-data production build passed: `npm ci && NEXT_PUBLIC_DATA_MODE=local npm run build`.
- Designer accepted the ready English/Persian handoff. Browser QA confirmed the schedule sheet stays within the viewport at 740×360, including validation errors and scrolling to its heading and actions. Add, edit, reload, cancel, English Dark validation, Persian long-note rotation and the seven-route English/Persian layout matrix passed as recorded in [QA](../design/2026-10-10-phone-landscape-qa.md).
- Independent source review accepted with no findings. Independent signed APK review accepted; the reviewer verified the signature, identity, source/run and artifact metadata. Hosted comparison of 136 web assets was not independently repeated locally against the unsigned candidate.
- Backend tests and migration checks were not rerun for this frontend-only change; backend is unchanged.

## Release Notes

- Planner event creation and editing now keep all form fields and actions reachable on short landscape screens by scrolling inside the sheet.

## Publication

The [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.13) was published by [publisher run 38077418620](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38077418620). Anonymous asset `628732627`, `SmartPaper-local-2026.10.13-release.apk`, was downloaded and matches the committed artifact byte-for-byte: 4,469,135 bytes and SHA-256 `3189b69e5e79f6afd50dafbde7852f3fd4f925f77e23769ea22bc6c4a041d1d3`. No local rebuild was used.

## Known Follow-Ups

- Physical Android keyboard, rotation, safe-area and TalkBack behavior remain unverified.
- Template use/delete confirmation completion remains unverified because native browser confirmation handling timed out during QA; no template defect is claimed.
- The hydrated English Planner at 740×360 has a document width metric of 766; the visually hidden Friday summary may contribute (unproven). QA found no additional visible clipping or unreachable controls.
