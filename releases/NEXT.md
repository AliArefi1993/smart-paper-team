# Next Smart Paper Release: smart-paper-v2026.09.6

Status: stable-signed candidate prepared; team tag pending physical-phone acceptance.

## Scope

- Select fields and an inclusive date range for a Markdown AI report in Android local-data mode.
- Preview the report text and share its file through the device chooser; finance starts off and is checked again at share time.
- Give JSON backups dated filenames and show file contents before replace confirmation.

## Prepared Version

- Android versionCode: 15
- Android versionName: `2026.09.6`
- Frontend release revision: `82b46d0` (report source `6930db0` plus version metadata).
- Backend: unchanged at `68c789b`.

## Required Before Tag

- [x] Signed APK build, version, certificate, and checksum verified.
- [ ] Install over `.5` and confirm planner, templates, and finance persist.
- [ ] JSON backup outside the app, invalid/cancelled import safety, and valid restore on a spare device.
- [ ] AI report filters, preview, finance unlock, and ChatGPT chooser or save-and-attach path on a phone.
- [ ] English/Persian layout, offline use, timer suspension, and notification behavior on a phone.
- [x] Commit APK and release record, then push app and team commits before tags.

See `tasks/2026-09-30-ai-report-release.md` for current evidence and handoff.
