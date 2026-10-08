# Task: Preserve saved templates during Merge import

Status: complete; published as Android 2026.10.7
Created: 2026-10-08
Updated: 2026-10-08

## Objective

Prevent default Merge import from deleting saved week templates that are absent from an incoming JSON backup.

## Context

- Discovered by independent review during [data-safety validation](2026-10-08-android-data-safety-validation.md).
- Owner: `smart-paper-front/`; team owns handoff and release records.
- Pre-fix review found that `importLocalExportPayload` assigned incoming templates wholesale for both Merge and Replace, contradicting the existing Merge promise. The adapter now preserves saved IDs absent from the incoming collection.
- Maintainer authorized backlog prioritization and execution on 2026-10-08. Data preservation takes priority over new features and the unreproduced ChatGPT handoff issue.

## Acceptance Criteria

- [x] Merge preserves templates when incoming templates are empty or omitted.
- [x] Merge retains unrelated templates and updates matching IDs from the incoming backup.
- [x] Replace uses the incoming collection; omitted templates clear it as before.
- [x] Actual adapter regression tests cover those cases and persisted results.
- [x] Five-key write/rollback and schema-compatibility tests pass.
- [x] Designer handoff ready; independent final review has no unresolved critical/high finding.
- [x] Relevant checks, documentation and stable-signed Android release complete.

## Non-Goals

New import controls/copy, different conflict UI, backend parity, crash-atomic storage redesign, unrelated features.

## Plan

1. Designer confirms existing interaction and template conflict contract with bilingual studio reference.
2. Implement a minimal template merge in the owning adapter and focused regression tests.
3. Validate, independently review, fix findings, document and release under standing authorization.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Initial frontend baseline | Docker Node 24 `node --test tests/*.test.mjs` | 37 passed |
| Independent discovery | Review of `src/lib/local-store.ts` template assignment | High data-loss finding |
| Final source checks | Docker lint, TypeScript and all 52 tests | Passed |
| Independent final review | Actual production diff, adapter tests and phone matrix | No blocking findings; exact Replace collection retained |
| Design | Ready handoff; studio typecheck/build and bounded EN/FA phone/wide outcome review | Passed with documented studio environment limitations |
| Stable-signed release | `scripts/build-android-release-docker.sh`; `apksigner`; APK version and packaged assets | Passed; versionCode 24/name 2026.10.7, stable certificate, all 136 exported files byte-match; two zero-byte Cordova bridge shims also packaged. `npm ci` reported 21 advisories; no clean audit claimed. |
| Publication | Coordinated commits/tags and GitHub Release asset verification | Passed; non-draft public asset matches committed APK size and SHA-256 |
| Physical Android | No `adb` available in workspace | Unexecuted follow-up |

## Decisions And Risks

- Design required for import behavior; no visual redesign planned.
- Template IDs are local identities; incoming matches update the saved template, following existing upsert semantics. Independent-device ID collisions remain an existing identity limitation.
- Rollback tests cannot establish process-termination atomicity or real-device durability.

## Outcome / Handoff

[Designer handoff](../design/2026-10-08-template-merge-safety.md) is ready. The adapter now preserves unrelated template IDs during Merge; focused pre-fix adapter tests reproduced both data-loss cases. Docker lint/TypeScript/all 52 tests passed on final source; independent final review has no blockers. The stable-signed 2026.10.7/code24 APK was published and its public asset verified against the committed artifact. Frontend `036d2c5`, backend `68c789b` and team `64c7911` carry the coordinated tag. Physical Android and TalkBack checks remain unverified follow-ups.
