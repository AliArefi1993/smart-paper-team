# Smart Paper Release: smart-paper-v2026.10.8

Date: 2026-10-08
Status: Published non-draft GitHub release; public APK download verified against the committed artifact on 2026-10-09.

## Scope

- Remove the misleading Open ChatGPT URL, which opened a destination without carrying the report.
- Add deliberate Copy report text, keep Share report file, and offer manual text selection with localized open/paste/review/send guidance.
- Before copy/share/manual selection, ensure the content matches the reviewed preview and recheck finance authorization. A changed report requires a fresh review and deliberate second action.
- No automatic app launch, attachment, upload or sending is promised. Existing date/field choices and finance-off-by-default behavior remain.

## Repositories And Artifact

| Field | Value |
| --- | --- |
| Tag (all three repositories) | `smart-paper-v2026.10.8` |
| Frontend | `efc027e` |
| Backend | `68c789b` unchanged |
| Team | `7187a7d` release commit; coordinated tag pushed |
| Android | versionCode 25; versionName `2026.10.8`; local-data mode |
| APK | `releases/artifacts/SmartPaper-local-2026.10.8-release.apk` |
| SHA-256 / size | `f7efe78aae7af2b4f353aa27810bf160c382927c5055560895a837056343594c` / 4,415,348 bytes |
| Certificate SHA-256 | Stable `59912e191b4588996b4f3641c9b3609e77fa75aa6695be789ece1a0325faf2a5` |

## Publication

[GitHub release](https://github.com/AliArefi1993/smart-paper-team/releases/tag/smart-paper-v2026.10.8) was created by workflow run [37806215527](https://github.com/AliArefi1993/smart-paper-team/actions/runs/37806215527). It is non-draft. Downloaded public APK size (4,415,348 bytes) and SHA-256 (`f7efe78aae7af2b4f353aa27810bf160c382927c5055560895a837056343594c`) match the committed artifact.

## Verification

| Check | Result |
| --- | --- |
| Backend | Unchanged; prior 33-test/no-migration evidence reused |
| Studio and production appearance | Ready bilingual handoff; studio checks passed. Production English wide Light/Dark and Persian 390px phone Light/Dark screenshots passed; the Dark surface computed as `#1b2b29`. The earlier mismatch came from stale development CSS. |
| Frontend / independent review | Docker lint, TypeScript and all 57 tests passed on final source; independent review found no blockers |
| Actual browser interactions | Exact OS clipboard paste matched the reviewed preview; changed source required review and a second copy; clipboard denial showed selectable fallback; injected share cancellation retained state; finance expiry blocked copy and removed report text. EN/FA states and date boundaries passed in the recorded bounded cases. |
| Android release build | `scripts/build-android-release-docker.sh` passed: Next production build, Capacitor sync and Gradle `assembleRelease` (`BUILD SUCCESSFUL`) |
| Signed APK / packaged assets | `apksigner` passed; code25/name2026.10.8 and stable certificate verified. All 136 exported web files byte-match APK assets; the APK also contains two zero-byte Capacitor-generated Cordova bridge shims. |
| npm install output | `npm ci` reported 21 advisories (1 low, 4 moderate, 14 high, 2 critical); this is not a clean audit. Dependency locks were unchanged. |
| Physical Android / TalkBack / recipient delivery | Unverified follow-ups; no claim of Android clipboard, chooser, ChatGPT routing, recipient acceptance or TalkBack verification |

See the [implementation task](../tasks/2026-10-07-ai-report-chatgpt-handoff.md), [Product brief](../design/2026-10-08-ai-report-handoff-product.md), [ready design handoff](../design/2026-10-08-ai-report-handoff-design.md), and [QA record](../design/2026-10-08-ai-report-handoff-qa.md) for exact scope and evidence limits.

## Boundaries And Follow-Ups

- Android/ChatGPT versions remain unrecorded. ChatGPT app presence is maintainer-reported, but exact app-to-site routing was not independently reproduced.
- No external recipient app received a report during QA. Actual Android clipboard permission/paste, chooser return/cancel, native cache-file handling, recipient acceptance and TalkBack remain unverified.
- A browser chooser return, native file delivery, and long-report limits in ChatGPT are not certified by the executed checks.
- The generated npm install advisory count is recorded as install output; no clean security audit or dependency remediation is claimed.
