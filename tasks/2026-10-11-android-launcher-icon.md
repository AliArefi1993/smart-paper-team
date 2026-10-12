# Task: Android launcher icon redesign

Status: source and artifact accepted; coordinated publication in 2026.10.16 pending
Created: 2026-10-11
Updated: 2026-10-11

## Objective

Replace the installed Android app's generic launcher artwork with a distinctive Smart Paper icon and publish a stable upgrade APK.

## Context

- Owner: frontend Android resources; team design/studio and release records.
- Baseline frontend: d899f2c, Android 2026.10.14/code 31.
- Release: 2026.10.15/code 32 under standing authorization in docs/release-workflow.md.

## Acceptance Criteria

- [x] Designer ready handoff and bilingual editable launcher previews.
- [x] Adaptive, round, legacy and themed icons use the approved paper identity; critical artwork stays inside adaptive safe zone.
- [x] Relevant automated/studio checks and independent packaged-artifact review pass.
- [ ] Stable package/signing identity preserved; higher version publishes verified APK.
- [ ] Installed update if a connected authorized device is available; otherwise provide the APK and record installation as unverified.
- [ ] Essential design/task/status/release memory updated and scoped commits pushed.

## Plan

1. Designer reviews launcher resources and prepares precise vector artwork.
2. Implement Android launcher resources and density fallbacks.
3. Validate design/resources, commit source, run exact-source protected stable build.
4. Independently verify final APK, publish and verify public download.

## Verification

- Designer [handoff](../design/2026-10-11-android-launcher-icon.md) ready; studio typecheck/build and bilingual mask/scale preview checks passed.
- Source review: no high/critical finding; safe-circle radius <=31.41 vs 33, alpha/dimensions checked at 48/72/96/144/192px, no dangling launcher references; package/manifest/backup/signing/workflows unchanged.
- Automatic exact-source CI [38164641840](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38164641840) and protected hosted build [38164657390](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38164657390) passed. Routine independently verified pinned v2/v3 signer, package/version and APK hash; final independent review pending.
- Hosted unsigned checks passed: lint, TypeScript, tests, local-data build, assembly and candidate validation on exact source.
- GitHub account and Docker SDK tools available. No host adb/connected physical device available.

## Decisions And Risks

- Launcher-only scope; no screen or persistence changes.
- Physical OEM mask rendering, themed tint and upgrade/data retention require device evidence.

## Outcome / Handoff

Approved paper/check identity implemented. Independent Security source review passed; lead viewed legacy PNG parity. Frontend `99bd2de7b852801416fbb6b550c30ee1239a968f` committed/pushed; exact-source hosted build [38164657390](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38164657390) underway. Designer accepted implemented vectors and round raster. Unsigned hosted gate passed; protected signing approved by lead under standing authorization. Hosted signing passed; original final/candidate ZIPs independently rehashed. APK SHA-256 `a04e4aa3e9dee2d22dd9e51db80a471e9e8e402af599f06f713091e6d8576320`, size 4,391,350 bytes. Independent artifact gate passed; lead authorized publication. Public verification pending.

Independent artifact verification: pinned single v2/v3 signer and non-debug package/code32 accepted; 581 unsigned/signed shared entries, 137 web files, compiled v26/v33 vectors and 10 legacy PNG pixel equality passed. Backup rules unchanged. Physical checks remain unverified.

2026-10-12 coordination: owner hit usage limits after signed-artifact acceptance but before publication. The reviewed 2026.10.15 candidate remains unpublished; the batch owner consolidates this accepted icon with the timer and regression work into 2026.10.16/code33. No physical installation is claimed.
