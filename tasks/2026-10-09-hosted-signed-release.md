# Task: Publish the first hosted stable-signed release

Status: complete; hosted artifact published and public download verified
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Publish Smart Paper 2026.10.10 / Android code 27 from the exact GitHub-hosted signed artifact and verify the public download end to end. The maintainer explicitly authorized this build, signing approval and publication in chat.

## Context

- Owning repositories: frontend version/build; team release record/artifact/tag publisher; unchanged backend receives matching release tag.
- Latest published release: 2026.10.10 / code 27; see [release record](../releases/smart-paper-v2026.10.10.md).
- [Release workflow](../docs/release-workflow.md); [CLI procedure](../docs/hosted-stable-build-cli.md).

## Acceptance Criteria

- [x] Exact committed frontend version 27 / 2026.10.10 passes hosted checks and protected signing.
- [x] Independent review verifies downloaded APK signature, stable identity, version, checksum and source/run provenance.
- [x] Commit the exact hosted APK, original provenance and release record; annotated tags all three repositories, team tag last.
- [x] Tag publisher succeeds; public non-draft release asset download matches committed APK bytes/checksum.
- [x] Current status/release memory updated; all repositories clean; no task-owned processes remain.

## Non-Goals

- Product changes, data migrations, rebuilding locally or replacing old releases.

## Plan

1. Routine increments frontend version, commits/pushes and dispatches exact-source hosted build.
2. Lead validates unsigned checks and submits maintainer-authorized approval; Security independently verifies final APK.
3. Routine records exact artifact, publishes tags and checks public release download after lead acceptance.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Starting state | Latest release API and three clean repositories before this release | Team 9f91e5b; frontend 625cfe0; backend 68c789b; latest .9 |
| Hosted build | Frontend `38f19c1a6a151fce04a02c951a06dab6ae9a1f76`; [run 37920986616](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920986616) | Unsigned checks/build passed; lead submitted protected signing approval under the maintainer request |
| Automatic verification CI | [Run 37920967920](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920967920), same frontend SHA | Passed |
| Signed artifact and independent Security review | Run 37920986616, final artifact 11612476619; copy and original provenance in `releases/artifacts/` | Passed: v2/v3, one stable signer, version 27/2026.10.10, app identity, non-debug status, hash and provenance |
| Release tags | `smart-paper-v2026.10.10` in frontend `38f19c1`, backend `68c789b`, team `67e24d0`; team tag pushed last | Passed |
| Publisher and anonymous download | [Run 37922107371](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37922107371); [public release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.10); APK asset ID `624735317` | Passed: non-draft release; 4,469,135-byte public APK matches committed artifact SHA-256 `e1c3946eb8a9150c9de648992a1353d38345faf6b9022c2adbb30fccc3269c46` |

## Decisions And Risks

- Design: not applicable; version metadata and release infrastructure only.
- Preserve stable app ID and signing certificate; increase code to allow upgrades.
- Phone upgrade/data retention, recipient sharing and TalkBack remain recorded follow-ups, not newly verified claims.

## Outcome / Handoff

The hosted artifact passed independent verification and the authorized release completed. Physical-device checks remain follow-ups, not claims of verification.
