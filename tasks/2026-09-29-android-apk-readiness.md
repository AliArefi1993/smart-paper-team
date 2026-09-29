# Task: Android APK readiness

Status: in progress
Created: 2026-09-29
Updated: 2026-09-29

## Objective

Make the local-data Android app the primary product and improve data safety before sharing a signed APK with others.

## Context

- Product: `PRODUCT.md`; roadmap: `ROADMAP.md`.
- Code: `smart-paper-front/`; release automation: team root.
- Decision: `docs/decisions.md` D-007.

## Acceptance Criteria

- [x] Android replace import validates before mutation, confirms the action, and restores prior values on write failure.
- [x] A short `feature.md` lists current features and recent work, with an update rule.
- [x] Release automation refuses a missing signed release APK.
- [x] Relevant frontend tests, lint, type check, and local-mode build pass.
- [x] Physical-device release checks are documented for handoff.
- [ ] Signed APK upgrade, backup restore, and phone flows pass on a physical device.

## Non-Goals

- Publish a new APK before physical-device validation.
- Deploy or remove the Django backend.

## Verification

| Check | Result |
| --- | --- |
| Local import tests | 5 passed in Docker, 2026-09-29 |
| Frontend lint/type/local build | Passed in Docker, 2026-09-29 |
| Production dependency audit | 1 critical, 4 high, 1 moderate finding; static Android applicability reviewed in `releases/smart-paper-v2026.09.2.md` |
| Stable-signed 2026.09.2 candidate | Built, signature verified, SHA-256 `06e192b93827d14794d646717db96d8fb3e43cfe2db5cc1bc2776667779a8139` |
| Phone backup/restore and upgrade | Not run; no connected device/ADB in this workspace |

## Phone Release Checklist

1. On the existing installation, add a recognizable week, template, and income entry. Export JSON to a destination outside Smart Paper; open the file and keep a copy.
2. Install a new APK over the existing one with a higher version code and the same signing certificate. Reopen and verify the saved records remain.
3. On a spare phone or clean test device, import the JSON backup. Compare the week, template, section settings, and finance values. Do not uninstall the only copy of personal data for this test.
4. Cancel replace import, then try an invalid backup. Confirm neither changes saved records. Perform one valid replace and verify its result.
5. Test offline planner and finance use, English/Persian screens, small-screen layout, and morning notifications with permission allowed/denied and after app restart/reboot.

## Outcome / Handoff

The updated `2026.09.2` APK is staged in `releases/artifacts/`, signed with the existing certificate and versionCode 11. Backend tests (33), migration drift, frontend lint/type/build, and import safety tests (5) passed on 2026-09-29. No new release tag or GitHub Release has been published. Run the phone checklist before creating the release tag.
