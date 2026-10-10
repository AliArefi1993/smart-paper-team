# Smart Paper Release: smart-paper-v2026.10.12

Date: 2026-10-10
Status: Signed artifact accepted; tag publisher and public checksum verification pending.

## Scope

- Simplified the Planner bottom area in local-data mode: removed the fixed bar and reserved gap, surfaced existing save status/Retry inline, and kept Next day reachable in-flow. Django manual-save behavior is unchanged.
- Frontend source: `9419b2dfe0a427f4fa776f6928fda5640740afb7`; no backend changes or data migration.
- Android versionCode 29 / versionName `2026.10.12`; hosted signing used the existing protected stable identity.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Release tag | `smart-paper-v2026.10.12` |
| Frontend source | `9419b2dfe0a427f4fa776f6928fda5640740afb7` |
| Backend | `68c789b` (unchanged) |
| Android | versionCode 29; versionName `2026.10.12`; app ID `com.aliarefi.smartpaper`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.12-release.apk` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.12-provenance.json` |
| APK SHA-256 / size | `28935a9ec432b19bcc5b98fa310972f7c0573c2dc4fb0d8d89fd4da12328a2a8` / 4,469,135 bytes |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Hosted Build Evidence

| Check | Result |
| --- | --- |
| Automatic frontend CI | [Run 37986033565](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37986033565) passed on the exact frontend source. |
| Protected hosted build | [Run 38023856839](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38023856839) passed candidate validation and protected signing for the exact source. |
| Initial candidate attempt | Run 37986072938 failed during unsigned Android assembly when Maven returned HTTP 500 while fetching `kotlin-compiler-embeddable:2.2.20`; one retry with unchanged source/workflow passed. |
| Candidate artifact | ID `11659331307`; GitHub archive metadata digest `sha256:115d0ce18070001bbd5bb49320edf44b73054d60047522d12dd7ce11cffb67f8`. |
| Final artifact | ID `11660382477`; GitHub archive metadata digest `sha256:73e47a12c46ab76bdee70b8b0925f4b11524d696549d2e2ff14609385bd2d635`. |
| APK verification | Checksum passed; v2/v3 signatures verified with one pinned stable signer. Package ID, version, non-debug status and provenance match. Independent Security accepted the exact APK and provenance. |
| Provenance | Matches source/run, version, app ID, local-data mode, candidate association and APK hash; records 136 compared web assets and the stable certificate fingerprint. |
| Archive digests | GitHub API metadata only; original ZIP bytes were not retained for local archive rehash. Packaged asset comparison is hosted workflow evidence. |

## Validation

- Frontend Docker: `npm ci`, lint, TypeScript, `npm test` (66 passed), and local-data production build passed. Install reported 21 dependency advisories (1 low, 4 moderate, 14 high, 2 critical); no clean audit is claimed.
- Planner Storybook studio Docker install, typecheck and build passed. Designer accepted the built English/Persian portrait, landscape and short-height treatments.
- Production browser QA passed at phone portrait/short-height and landscape sizes, including English/Persian Light/Dark, navigation through rotation/reload, Friday disabled state, minimized days, failed-write retention and Retry recovery.
- Existing backend test and migration evidence was reused; backend remained unchanged at `68c789b`.

## Release Notes

- Local Planner mode no longer reserves a fixed bottom bar. Save status and Retry are shown inline; Next day remains available in the week overview and at the active day end, and is disabled on Friday.
- Failed saves retain edits and same-week day navigation; route/week departure guards are unchanged. Django keeps its manual-save footer.

## Publication

Tag publisher and anonymous public APK checksum verification are pending. Record the team tag target and publisher run after tagging.

## Follow-Ups

- Native keyboard, physical rotation, TalkBack, upgrade/data retention and other on-device behavior remain unverified. Existing Planner horizontal overflow was observed before and after this bounded change and remains tracked by the separate landscape task.
