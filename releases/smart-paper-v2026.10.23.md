# Smart Paper Release: smart-paper-v2026.10.23

Date: 2026-10-13

Status: Published and publicly verified.

## Scope

- Record limited local errors and daily feature counts through separate disclosed switches, ON when no preference exists; saved OFF choices remain authoritative.
- Inspect/delete bounded recent evidence, describe a problem, independently select optional evidence, preview the exact report and deliberately open an email draft or copy it. Evidence starts unchecked for every report; primary writing and Settings drafts are preserved.
- Exclude personal app contents, PINs and raw errors from automatic recording. Nothing uploads automatically. Sudden native/startup failures may leave no record.

## Repository Tags

| Repository | Tag | Commit | Notes |
| --- | --- | --- | --- |
| team root | `smart-paper-v2026.10.23` | `30bce9a63fe09c56b0272498b777101e85b4abb4` | Release docs, exact APK and provenance |
| backend `smart-paper/` | `smart-paper-v2026.10.23` | `68c789b707239ef5451f98f7f6ce49d7c9b8a8c2` | Unchanged; backend remains paused |
| frontend `smart-paper-front/` | `smart-paper-v2026.10.23` | `b5d0b6ddbb1807d3783a90bd119c37b00bb64029` | Exact source for CI and stable build |

## Android Local-Data Version

| Field | Value |
| --- | --- |
| Android versionCode | 40 |
| Android versionName | `2026.10.23` |
| App ID | `com.aliarefi.smartpaper` |
| Data mode | `NEXT_PUBLIC_DATA_MODE=local` |
| APK filename | `SmartPaper-local-2026.10.23-release.apk` |
| APK path | `releases/artifacts/SmartPaper-local-2026.10.23-release.apk` |
| APK size / SHA-256 | 4,409,696 bytes / `a3d49e0e08c916f61260a4d4cfc869c429076780f89f6ce931c14d738dfa17c6` |
| Stable certificate SHA-256 | `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |
| Provenance | `releases/artifacts/SmartPaper-local-2026.10.23-provenance.json` |

## Validation

- Exact-source CI [38441610985](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38441610985) passed on frontend `b5d0b6ddbb1807d3783a90bd119c37b00bb64029`: lint, type check, tests, local-data production build, Capacitor sync and isolated verification APK/provenance checks.
- Docker local checks passed: full suite 158/158; final focused core/email/primary-isolation tests 24/24; lint with no warnings, TypeScript and local-data build. Exact-commit hosted checks cover the release version bump.
- Product, bilingual Designer and independent QA/source Security accepted the implementation. Eleven runtime screenshots and synthetic failure/consent/privacy/close tests are recorded in the [task](../tasks/2026-10-07-local-feedback-diagnostics.md) and [durable evidence](../docs/evidence/2026-10-13-local-diagnostics/README.md).
- QA's rapid-Escape discard bypass was fixed and passed ten rapid double-Escape cycles plus forced-close recovery. Native email URI construction preserves the fixed recipient and separately encoded subject/body; Capacitor bridge logging is disabled.
- Protected stable build [38442339521](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38442339521) passed on the exact source above and code40/name `2026.10.23`; the unsigned candidate and protected signing jobs succeeded.
- Unsigned candidate artifact `11837310906` is 6,689,263 bytes with archive SHA-256 `b4a92e3367bf15c9cd36ffbcfa8ed19f92cfbee18558891d0ccceff9b222449d`; its APK SHA-256 is `d90a12d5c4d082c95b90182c95e70b59e1f3c86e719baaf2ec45b30cf4caf024`. Same-run provenance records code40/name `2026.10.23`, non-debug stable identity and 112 compared web assets. Independent candidate review passed.
- Final artifact `11840190472` (`smart-paper-stable-b5d0b6ddbb1807d3783a90bd119c37b00bb64029-1`) is 4,411,827 bytes with archive SHA-256 `b5075941511d1c816c856eb452cb567746bd922e0e6380dff0ac74aa1a9d9aa5`. The signed APK is 4,409,696 bytes with SHA-256 `a3d49e0e08c916f61260a4d4cfc869c429076780f89f6ce931c14d738dfa17c6`; its checksum matches `SHA256SUMS` and provenance. Independent final artifact Security verified the pinned v2/v3 signer, app identity/version/non-debug status, all 556 unsigned payload entries plus three signature entries, and all 112 web assets.
- No backend code or migration changed; backend remains at the previously released source revision.

## Release Notes

Report a problem from Settings or covered failure states without losing current writing. Separate on-device error and usage recording controls default ON with disclosure; either can be turned off, and recorded evidence can be inspected or deleted. Describe what happened, choose optional evidence and review the exact report before opening email or copying it. Smart Paper never sends or uploads the report automatically.

## Publication

Published at [GitHub Release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.23). Publisher workflow [38449040776](https://github.com/AliArefi1993/smart-paper-team/actions/runs/38449040776) succeeded. Public release `411996012` is non-draft and non-prerelease; APK asset `637924903` is 4,409,696 bytes. An anonymous download matched the committed APK byte-for-byte with SHA-256 `a3d49e0e08c916f61260a4d4cfc869c429076780f89f6ce931c14d738dfa17c6`.

## Known Follow-Ups

- Physical Android email handler/body delivery, installation/upgrade, lifecycle/keyboard and TalkBack remain unverified. Browser sharing/copy tests used synthetic stubs and never sent email.
- Native crashes/process termination/startup failure may leave no diagnostic record. Clipboard copies and email drafts remain outside Smart Paper deletion control.
- Execute the adopted bounded manual baseline checkpoint at the next normal work boundary; it is not a release gate.
