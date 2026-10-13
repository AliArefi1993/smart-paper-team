# Task: Local problem reporting and optional diagnostics

Status: implementation accepted; exact-source CI and Android release gates in progress
Created: 2026-10-07
Updated: 2026-10-13

## Objective

Give Android users an easy-to-reach way to report a problem directly. Separate error-recording and usage-count switches start ON for local collection; users choose whether to attach either category to a deliberately prepared email to provide real-world QA evidence while Smart Paper remains offline and server-free.

## Context

- Roadmap: [Now](../ROADMAP.md#now).
- Owning implementation repository: `smart-paper-front/`; task memory belongs to the coordination repository.
- Current product: [PRODUCT.md](../PRODUCT.md). Implementation is in the working tree; this capability is not yet released.

## Acceptance Criteria

- [x] Report a problem is easy to discover; design determines placement, including relevant error states.
- [x] Users can describe the problem and preview the report before deliberately opening an email draft to `arefi.ali90@gmail.com` (maintainer-confirmed, 2026-10-13); final Send belongs to the email app. Optional evidence may be included as clearly separated sections of the exact email body; no file attachment is required. If no email handler is available, deliberate Copy report for email uses the same reviewed text and displays the recipient. Reporting works with both recorders disabled. A generic chooser alone is insufficient, and no recipient is invented.
- [x] Separate local error-recording and usage-count controls both start ON on fresh/existing installs with absent preferences after visible EN/FA local-only disclosure and successful initialization. Saved OFF choices remain authoritative; unreadable/malformed/failed preference persistence fails closed per category. They persist independently and stop their category immediately when disabled.
- [x] Diagnostics follow the strict static schema in the [Product brief](../design/2026-10-13-local-diagnostics-product.md): packaged app/build version and coarse route/action/error codes; daily feature counts and observable aggregate flow outcomes. No device/OS identifiers or new device plugin in this cycle.
- [x] Exclude planner text, notes, ideas, finance records, PINs, credentials and other personal content from automatic collection. Never collect raw error messages, rejection reasons or stack traces; do not collect raw state, screenshots, identifiers or session replay. The voluntary report description is composer-only, outside collected records and backups.
- [x] Users can inspect and delete collected records. Each report explicitly asks whether to attach errors and usage counts, independently unchecked by default; a recoverable failure offers direct composer access without automatic attachments or transmission.
- [x] Apply automatic expiry/oldest-record removal on store access. Proposed starting defaults are 128 KiB serialized UTF-8 combined, at most 200 errors and 14 calendar days, subject to failure/quota validation; this tightens the original 2 MB proposal. Bound the description to 4,000 characters with visible feedback.
- [x] No server, telemetry service or automatic network upload is used. Recording remains offline and does not delay normal interactions or compromise primary-data saving.
- [x] Capture JS runtime/known operation failures best-effort and explain limitations. Separate source/API feasibility assessment is recorded in the Product brief: no native crash integration exists; no native crash SDK/handler is added this cycle. Sudden native crashes/process termination may leave incomplete or no diagnostics; never promise full crash coverage.
- [x] English/Persian and accessibility states are designed and validated; cancellation sends nothing and preserves primary app data.
- [ ] Relevant automated checks, independent review, documentation and Android release workflow are completed when implemented.

## Non-Goals

- Automatic delivery, hosted monitoring, remote observation, session replay or full backups attached by default.
- Claiming voluntary reports represent all users or replace automated/physical-device QA.
- AI integration.

## Plan

1. Continue the requested improvement cycle; apply the adopted manual baseline checkpoint as bounded review, not an added release gate.
2. Designer reviews current entry points and saves a ready bilingual handoff in `design/` with editable studio stories before frontend implementation. Product scope is ready in the [brief](../design/2026-10-13-local-diagnostics-product.md): both local controls ON with disclosure, strict event schema, bounded retention, per-report optional attachments and direct email handoff. The support destination is `arefi.ali90@gmail.com`, supplied by the maintainer for this cycle.
3. Implement bounded local recording, preview/delete controls and deliberate email report handoff in the frontend repository; assess native crash capture feasibility.
4. Test storage limits/failures, privacy exclusions, settings, expiry, sharing/cancellation and offline behavior; review and fix findings.
5. Update product/status memory and follow the authorized Android release workflow after validation.

## Verification

| Check | Command or evidence | Result |
| --- | --- | --- |
| Planning record | Maintainer discussion on 2026-10-07 | Agreed direction captured; no implementation |
| Product review | Updated brief and maintainer-confirmed support address | Accepted ON local defaults; per-report inclusion stays optional/unchecked |
| Designer proposal | [Ready handoff](../design/2026-10-13-local-diagnostics-design.md), 13 bilingual studio stories | Docker Node 24 typecheck/build passed; final bilingual structural review passed |
| Core and email transport | Docker Node 24 focused tests | 18/18 passed (13 core + 5 email) |
| Primary-operation integration | Docker Node 24 `tests/local-diagnostics-integration.test.mjs` | 6/6 passed: Planner fault isolation, unchanged outcomes, static errors, backup/AI exclusion and independent controls |
| Independent source Security | Final bounded UI/store/native transport source review | Accepted; no actionable findings; bridge logging disabled; exact packaged review pending |
| Local validation environment | Docker recovered after resume; scoped checks use Docker | Maintainer chose Docker only; host Node remains unauthorized |
| Full/local final checks | Docker Node 24 | Full suite 158/158; final focused 24/24, lint 0 warnings, types and local-data build passed |
| Runtime QA/Designer | [Synthetic evidence](../docs/evidence/2026-10-13-local-diagnostics/README.md) and ready handoff | Accepted: EN/FA phone/wide/dark/landscape, disclosure/OFF/restart, report/preview/copy, delete/failure/privacy, parent draft/focus preservation |
| Close regressions | Ten rapid double-Escape cycles plus unexpected dialog-close recovery | Passed after fixing native CloseWatcher bypass; deliberate discard/empty close remain closed |
| Hosted exact-source CI | [Run 38441610985](https://github.com/AliArefi1993/smart-paper-front/actions/runs/38441610985), frontend `b5d0b6ddbb1807d3783a90bd119c37b00bb64029` | Passed |
| Static checks | Root/frontend `git diff --check` | Passed; does not establish app correctness |

## Decisions And Risks

- Automatic means local collection only; transmission always requires deliberate user sharing.
- Email sharing may disclose the sender's address and user-entered message to the recipient; automatic collection excludes personal app content.
- Product defaults/schema/capture limits are specified in the brief. Designer owns placement and bilingual interactions; byte/count defaults need implementation validation and native sharing needs observed evidence.
- Design: ready handoff accepted before implementation; final running comparison is pending.
- The maintainer confirmed `arefi.ali90@gmail.com` as the support destination on 2026-10-13. Display it in the preview and prefill the email draft; the user retains final Send/cancel control.

## Outcome / Handoff

Implementation and browser acceptance are complete in frontend `b5d0b6ddbb1807d3783a90bd119c37b00bb64029`, committed and pushed with Android version40/name `2026.10.23`. Product accepted the user-directed ON local defaults and optional reviewed email flow; Designer accepted eleven runtime screenshots, and independent QA/Security accepted the corrected final source. Known-operation/runtime capture, bounded separate storage, independent controls, inspect/delete, exact preview/copy and native fixed-recipient email are implemented. Raw bridge logging is disabled. QA found rapid Escape bypass of the discard prompt, fixed with keyboard prevention and controlled close recovery; native URI construction was also corrected to preserve the recipient and encoded body. [Android's URI builder source](https://android.googlesource.com/platform/frameworks/base/+/5064fddf81e477a90c81d72f7328aa5887c67511/core/java/android/net/Uri.java) shows that query appending clears an opaque URI's recipient-bearing part.

Docker-only checks passed: 158 full tests, final 24 focused tests, lint with no warnings, types and local-data build; [durable synthetic runtime evidence](../docs/evidence/2026-10-13-local-diagnostics/README.md) preserves privacy, failure, consent and close checks. Actual email/clipboard delivery, physical Android lifecycle and TalkBack remain unverified; no real email was opened or sent in QA. JSON schema5 and backend `68c789b` remain unchanged.

Next: exact-source CI passed. Protected stable build run38442339521 completed the unsigned candidate at the exact source; independent candidate review is in progress before signing approval, followed by final signed APK/publication gates. Do not mark shipped before final signed artifact and public download verification. Lead owns durable product/architecture/database/task/status updates; routine owns scoped release commit/tag/push and verified task process cleanup. Root docs remain uncommitted until the release record/artifact are ready. Unrelated containers and all volumes are preserved.
