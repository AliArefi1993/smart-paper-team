# Task: Assess production dependency advisories for Android

Status: complete
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Classify current frontend production npm advisories against the static Android local-data build before wider sharing, with source evidence and bounded remediation recommendations.

## Context

- Selected from the dependency-review item in [ROADMAP](../ROADMAP.md) under the maintainer's instruction to pick and complete a task.
- Frontend baseline: `d899f2c9d66879bf899e09d3f8945412b6b6967b`; Android 2026.10.14/code 31.
- Owning repository: coordination root for assessment documents; frontend inspected read-only.
- Historical install output reported 21 advisories; it is not a current production-scope audit or a clean security result.

## Acceptance Criteria

- [x] Capture current production audit results and exact lockfile baseline.
- [x] Classify advisory families using primary advisory sources and actual application usage.
- [x] Distinguish static APK runtime, build tools, and future hosted-server exposure; state evidence limits.
- [x] Record actionable follow-ups without changing dependencies or claiming remediation.
- [x] Update status, roadmap and task index; validate documentation and commit/push the scoped result.

## Non-Goals

Dependency upgrades, new application behavior, APK publication, a full supply-chain/native Gradle audit, or exploit certification.

## Plan

1. Independent Security assessment of the lockfile, current advisory feed and relevant code paths.
2. Lead acceptance and durable report with narrow follow-up recommendations.
3. Documentation link/whitespace verification and routine scoped commit/push.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Baseline | `scripts/project-context.sh` and separate Git status checks | All three repositories clean; team `1f8711e`, backend `68c789b`, frontend `d899f2c` |
| Production advisory assessment | Independent Security, captured registry audit and material primary advisory families | 7 packages: 1 critical, 5 high, 1 moderate; no demonstrated static APK exploit; SheetJS ReDoS writer reachability unresolved |
| Documentation validation | All local Markdown targets resolve; both evidence files parse; raw audit SHA-256 and frontend lock SHA-256 match metadata; package counts match audit and metadata; `git diff --check` | Passed |

## Decisions And Risks

- Design: not applicable; this task changes documentation only.
- npm dependency classification is not runtime reachability evidence; bundled Capacitor packages may be declared as development dependencies.
- This bounded review cannot certify all npm, native, build, or WebView vulnerabilities.

## Outcome / Handoff

[Assessment and captured audit evidence](../docs/android-dependency-advisories.md) complete. Primary verification covered material advisory families, not all 44 records independently. Docker was unavailable; read-only host npm fallback installed nothing. No processes remain. Application source, locks and APK remain unchanged; no release required. Next scope: framework/build-tool refresh and maintained SheetJS/replacement evaluation with focused export regression checks. Historical parser-only ReDoS inference is corrected in the report. Documentation validation passed: local Markdown targets resolve, JSON parses, raw audit and frontend lock hashes match metadata, package severity counts match (7 total), and `git diff --check` is clean. Scoped commit and push are the remaining mechanical closeout.
