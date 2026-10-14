# Smart Paper Release: smart-paper-v2026.10.26

Date: 2026-10-14

## Scope

- Empty target-day timed-event lists now cancel the pending morning reminder and schedule nothing. Saved enable/time choices remain intact, and populated timed-event reminders continue to work.
- Settings disclose in English and Persian that reminders summarize timed events and skip days without timed events. No daily planning nudge was added.
- Backend source and behavior are unchanged.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.26` | Pending release commit | Release record, exact APK and provenance committed before tagging. |
| backend `smart-paper/` | `smart-paper-v2026.10.26` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; release marker only. |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.26` | `aa33f7942364185b5421fbdc65ed5944f539eda2` | Exact source used for CI and hosted build. |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 43 |
| Android versionName | `2026.10.26` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.26-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.26-release.apk` |
| APK size | 4,409,696 bytes |
| APK SHA-256 | `201edcc40e57ce174ae21aad8fa3a06b3d372fe720bce33fc075479ef7db55d7` |
| Signing certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.26-provenance.json` |

## Validation

| Area | Command | Result |
| --- | --- | --- |
| Product and design | Accepted Product scope, ready bilingual handoff and final production comparison | Passed; no daily planning nudge was included. |
| Local frontend checks | Docker Node 24: focused tests, full `npm test`, lint, TypeScript and local-data build | Passed: focused 15/15, full 173/173, lint/types/build clean. The full suite ran with CI-equivalent `NEXT_PUBLIC_DATA_MODE=local`. |
| Frontend exact-source CI | [Run 38589474128](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38589474128), attempt 2 | Passed on `aa33f7942364185b5421fbdc65ed5944f539eda2`. Attempt 1 reached Android assembly but Google Maven returned HTTP 503 for `layoutlib-api:31.13.0`; no source change followed, and exact-SHA attempt 2 passed. |
| Hosted unsigned candidate | [Stable build run 38589501971](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38589501971) | Passed; candidate artifact `11906708755`, archive SHA-256 `dc506df12b99045e031e428c1fcd681e76e0f9ab3e73c81d7e8cead8829fad05`. Independent review accepted identity/version/non-debug status, packaged behavior, all 556 APK payload entries and 112 web assets. |
| Protected stable signing | [Stable build run 38589501971](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38589501971) | Passed after required `stable-signing` environment approval. Final artifact `11908591195`, archive SHA-256 `a00e3b80aa6a31eb52aa97f1b297ba60cd80d78656df249935c3f7a259fc8f9a`. |
| Final artifact Security review | Independent review of the signed APK and provenance | Passed: checksum/provenance match, pinned v2/v3 signer and certificate, Android identity/version/non-debug status, and all 556 candidate payload entries match; only signature metadata was added. No actionable finding. |
| Public release | Pending | Tag and publisher have not yet run. |
| Backend tests and migration check | Not run | Backend unchanged; no backend application change in this release. |

## Release Notes

- Morning notifications no longer use generic fallback copy on days without timed events. The pending reminder is cancelled and no notification is scheduled for that day.
- Saved reminder choices remain enabled for later populated days, and notes/goals alone do not trigger a notification.
- Publication and anonymous public APK verification are pending.

## Known Follow-Ups

- Physical Android notification delivery, lifecycle behavior and TalkBack remain unverified; no device result is claimed.
- The wider native notification review remains open separately.
- Backend and hosted-web work remain paused.
