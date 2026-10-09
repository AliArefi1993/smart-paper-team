# Task: Publish the first hosted stable-signed release

Status: verified hosted candidate; tag publication and public download verification in progress
Created: 2026-10-09
Updated: 2026-10-09

## Objective

Publish Smart Paper 2026.10.10 / Android code 27 from the exact GitHub-hosted signed artifact and verify the public download end to end. The maintainer explicitly authorized this build, signing approval and publication in chat.

## Context

- Owning repositories: frontend version/build; team release record/artifact/tag publisher; unchanged backend receives matching release tag.
- Latest published release: 2026.10.9 / code 26.
- [Release workflow](../docs/release-workflow.md); [CLI procedure](../docs/hosted-stable-build-cli.md).

## Acceptance Criteria

- [x] Exact committed frontend version 27 / 2026.10.10 passes hosted checks and protected signing.
- [x] Independent review verifies downloaded APK signature, stable identity, version, checksum and source/run provenance.
- [ ] Commit the exact hosted APK and release record; annotated tags all three repositories, team tag last.
- [ ] Tag publisher succeeds; public non-draft release asset download matches committed APK bytes/checksum.
- [ ] Current status/release memory updated; all repositories clean; no task-owned processes remain.

## Non-Goals

- Product changes, data migrations, rebuilding locally or replacing old releases.

## Plan

1. Routine increments frontend version, commits/pushes and dispatches exact-source hosted build.
2. Lead validates unsigned checks and submits maintainer-authorized approval; Security independently verifies final APK.
3. Routine records exact artifact, publishes tags and checks public release download after lead acceptance.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Existing state | Latest release API and three clean repositories | Team 9f91e5b; frontend 625cfe0; backend 68c789b; latest .9 |
| Hosted build | Frontend `38f19c1a6a151fce04a02c951a06dab6ae9a1f76`; [run 37920986616](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920986616) | Unsigned checks/build passed; lead submitted protected signing approval under the maintainer request |
| Automatic verification CI | [Run 37920967920](https://github.com/AliArefi1993/smart-paper-front/actions/runs/37920967920), same frontend SHA | Passed |
| Signed artifact and independent Security review | Run 37920986616, final artifact 11612476619; copy and original provenance in `releases/artifacts/` | Passed: v2/v3, one stable signer, version 27/2026.10.10, app identity, non-debug status, hash and provenance |
| Release tag/public download | Pending | Tags authorized and in progress; public publisher/download check pending |

## Decisions And Risks

- Design: not applicable; version metadata and release infrastructure only.
- Preserve stable app ID and signing certificate; increase code to allow upgrades.
- Phone upgrade/data retention, recipient sharing and TalkBack remain recorded follow-ups, not newly verified claims.

## Outcome / Handoff

The hosted artifact passed independent verification. The maintainer explicitly authorized publication, and the lead gave release go-ahead. Routine owns the remaining tag, publisher, public download, and final documentation mechanics. Physical-device checks remain follow-ups, not claims of verification.
