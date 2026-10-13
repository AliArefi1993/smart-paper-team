# Microsoft Clarity evaluation

Assessed: 2026-10-13. Status: current adoption rejected after Product, independent QA/Security and lead acceptance. Conditional runtime pilot remains deferred and unexecuted. [Task](../tasks/2026-10-10-microsoft-clarity-evaluation.md).

## Recommendation and problem

Reject automatic hosted replay for the current Android diagnostic/reporting scope. Any separately scoped diagnostic capture stays local; require deliberate user action to share a reviewed report. This decision is specific to diagnostics, not a general prohibition on unrelated hosted services. See [decision D-018](decisions.md). A technical pilot is deferred, not failed or approved. This decision follows the explicit [local diagnostics boundary](../tasks/2026-10-07-local-feedback-diagnostics.md): no automatic hosted telemetry or network upload in the diagnostic/reporting scope; a user may deliberately share a reviewed report. Personal text, screenshots and replay are excluded from automatic collection. Clarity's buffered automatic transfer after reconnect does not satisfy that boundary; a user-initiated sharing flow is separate.

The user problem is obtaining enough reproducible evidence about blocked Android flows and failures without exporting private Planner, Idea Space or Finance content automatically. Desired outcome: voluntary reports with useful technical context while everyday use, saving and reporting preparation remain offline. There is no observed evidence that Clarity is required to solve this problem. Replay improving diagnosis enough to justify hosted collection is **Needs confirmation**.

## Evidence and applicability

- [Microsoft mobile overview](https://learn.microsoft.com/en-us/clarity/mobile-sdk/mobile-sdk-overview): Android SDK captures visuals and interactions, buffers on device, and periodically uploads to Clarity servers when connected; default upload uses unmetered networks. Replay, heatmaps, rage/dead taps, funnels and smart events are documented. Keyboard, notifications and navigation bars are excluded. Current supported Android range is API 29–37. Microsoft estimates about 10 KiB/second recording traffic, 400 KB APK growth and 3–5% P95 frame-time increase in representative testing; these are vendor estimates, not Smart Paper measurements. Disk buffering and periodic deletion are documented without a precise local bound in this overview. Battery cost is unmeasured.
- [Ionic/Capacitor installation](https://learn.microsoft.com/en-us/clarity/mobile-sdk/cordova-ionic-sdk) explicitly describes an Ionic (Capacitor) path using `cordova-clarity` and `cordova-plugin-device`. This is stronger evidence than general hybrid support, but does not prove this app's Capacitor 8.5.1, Next.js static-export, local-origin WebView combination works.
- Repository evidence: [Capacitor configuration](../smart-paper-front/capacitor.config.ts) packages `out`; [MainActivity](../smart-paper-front/android/app/src/main/java/com/aliarefi/smartpaper/MainActivity.java) extends `BridgeActivity`; [package manifest](../smart-paper-front/package.json) pins Capacitor 8.5.1; [Android variables](../smart-paper-front/android/variables.gradle) allow API 24 and target API 36. Thus Android API 24–28 are outside Microsoft's documented range even if newer devices work. No SDK integration or runtime proof was produced.
- [Android SDK reference](https://learn.microsoft.com/en-us/clarity/mobile-sdk/android-sdk): WebView DOM capture is configurable; SDK 3+ moves several capture/network controls into the dashboard. `pause()` pauses capturing until resumed, but its documented contract does not establish deletion of queued data or cancellation of pending upload. SDK Logcat log levels describe SDK debugging, not host-app crash reporting. A future opt-out must prove no later transmission, including offline backlog, rather than equating pause with erasure.
- [Capture rules](https://learn.microsoft.com/en-us/clarity/mobile-sdk/sdk-data-capture-rules): allowed URLs/screens default to all; WebView capture can include DOM content. A daily recording-network limit stops recording capture but still permits analytics capture. It is not a complete telemetry-off control. Rules do not retroactively change earlier recordings.

## Privacy and diagnostic limits

[Mobile masking](https://learn.microsoft.com/en-us/clarity/mobile-sdk/clarity-sdk-masking) defaults to Balanced: inputs, numbers and email addresses are treated as sensitive; this does not establish protection for ordinary saved prose. Strict masks text/images; WebView CSS selectors and activity masking are documented. Masking changes can take an hour and are not retroactive. Consequently saved Planner notes/titles, Ideas text/search/results/branches, Finance labels/amounts, PIN flows, backup filenames, import content and report/export previews need explicit scrutiny, alongside screen names, URLs, tags and event metadata. Do not put content into metadata or assume visual masking covers it. Fully masked writing may remove the very detail needed to diagnose a content-dependent issue; usefulness remains untested.

[Microsoft FAQ](https://learn.microsoft.com/en-us/clarity/faq) says data is stored in Azure and Microsoft/Clarity can access it. General recording guidance specifies 30 days, with favorites/random samples up to nine months; individual-user deletion requires project deletion. These general statements do not establish an exact mobile-specific deletion SLA or complete retention contract: **Needs confirmation** before any pilot. The FAQ prohibits use for apps targeting under-18s; Smart Paper audience eligibility is **Needs confirmation**. Website JavaScript error filters are documented, but their existence does not verify mobile WebView error coverage. No legal-compliance conclusion is made.

[Team access](https://learn.microsoft.com/en-us/clarity/setup-and-installation/team-management) permits admins full access and members viewing recordings/heatmaps; admins control membership/settings/deletion. A future pilot needs a restricted project, named reviewers and a reviewed deletion process, including guest recording/heatmap sharing links and export tokens. The FAQ permits guest recording sharing; team guidance recommends removing departed members' export tokens. Consent/disclosure, first-run collection prevention, revocation while offline, server access and deletion are unresolved. Any product consent/settings UI requires a ready bilingual Designer handoff.

| Evidence needed | Clarity evidence today | Planned local/manual path |
| --- | --- | --- |
| Confusing taps/navigation | Hosted replay/behavior features documented; Smart Paper accuracy untested | User description and minimal allowlisted flow outcomes; less visual context |
| JavaScript errors | Website filters exist; mobile coverage unverified | Scrubbed error codes/technical traces, subject to design and capture validation |
| Native crash/process death | No verified host crash coverage | Separate native feasibility assessment; may leave no record |
| Storage/import/export failures | Replay may show symptoms; cannot establish persistence, file contents or recipient delivery | Allowlisted failure code/outcome; manual reproduction and data-safety tests remain necessary |
| Privacy/control | Hosted transfer, masking and dashboard operations add review burden | Preview/include/exclude/delete and deliberate chooser sharing; implementation not yet shipped |

## Options and success signals

| Option | User value | Risk | Implementation size | Recommendation |
| --- | --- | --- | --- | --- |
| Adopt Clarity now | Potential replay context | Violates present transfer boundary; compatibility/privacy unknown | Integration plus consent, lifecycle, masking, QA and service operations | Reject |
| Isolated synthetic pilot | Could resolve compatibility and masked usefulness | Hosted synthetic/device metadata still transmitted; no production value yet | Medium separate build and controlled QA | Defer until explicitly selected |
| Local voluntary diagnostics/manual reports | Fits requested offline control and failure context | Incomplete/biased reports, storage/capture reliability still require tests | Bounded app cycle, already authorized separately | Prefer existing scope |

Success for this evaluation is a clear current decision without false runtime claims or a changed telemetry policy. Success for local reporting is the user preparing and reviewing a useful report offline, excluding personal content automatically, cancelling without transmission, and saving primary records despite diagnostic failure. See its task for implementation acceptance criteria. Design: not applicable to this assessment. No new feature, account, SDK, pilot, backend server or release is part of this change.

## Conditional pilot plan — not authorized or executed

1. Reopen only after explicit selection of hosted synthetic testing and lead/Product/QA/Security scope acceptance. Use a disposable emulator/profile and distinct application ID/build artifact; never install over the real-data app, restore personal backups or publish this build. Permit synthetic fixtures only; device/service metadata still requires review. Pin exact SDK/plugin versions and record source/build hashes.
2. Review account/project access, terms, audience eligibility, retention/deletion and first-run masking before initialization. Use Strict masking and a minimal static route/event allowlist. Block network during setup; test offline queue and masking/config fetch before permitting a reviewed controlled upload. No content-bearing identifiers, URLs, tags or exception strings. Stop on unexpected payload or access.
3. Compare baseline and pilot on Android API 29 and the available Android 16 device/emulator; explicitly leave API 24–28 unsupported. Record DOM/rendering/tap alignment, packaged local origin, storage and API initialization; successful setup alone does not prove useful replay.
4. Run the matrix below in English and Persian RTL, Light/Dark, portrait/landscape, keyboard open/close, background/resume, offline then reconnect. Use unique synthetic canaries in inputs, saved displayed content and metadata. Inspect capture/upload evidence and replay; absent replay text alone is insufficient proof that nothing was transmitted.
5. Measure frame timing, package size, disk/queue age/bytes, network bytes and battery against baseline; verify network limits and any remaining analytics. Test pre-initialization exclusion, disable while offline, reconnect, restart and queued upload. Document any inability to erase queued data.
6. Remove dependencies/initialization/config, rebuild and compare manifest/dependencies/assets; verify no Clarity network traffic in the clean build. Review/revoke guest sharing links and export tokens as well as project membership. Remove the isolated app/profile and request reviewed project deletion, recording confirmation and its limits. Do not treat uninstall or pause alone as server deletion.

| QA case | Required evidence before reopening adoption |
| --- | --- |
| Planner saved titles/notes and templates; Ideas capture/search/branch/read | Canary excluded from payload and replay; masked flow still understandable |
| Finance locked/unlocked, PIN entry/change, Settings | No credential/content/metadata exposure; offline revocation prevents queued transfer |
| Import malformed/valid synthetic JSON; export/report preview and chooser cancel | No file/content capture; distinguish flow symptom from actual file/recipient result |
| Keyboard, rotation, RTL, suspension/resume | Correct app viewport/taps/order; external keyboard limitation recorded |
| Forced JS/storage/file failure and process termination | Identify actual available signals; record missing crash/failure coverage |

Before any future pilot, define useful replay as an independent reviewer reproducing a specified blocked flow from masked evidence, compared with the same manual report. Canary exclusion requires observable capture/upload evidence; an absent dashboard string or unreadable encrypted payload does not prove exclusion.

All pilot cases are **not run**. Compatibility, masking safety, useful replay, performance/battery, mobile retention/deletion and disabling queued transfer remain unverified. They are blockers to future adoption, not unfinished work required to reject adoption under today's product boundary.

Independent Security and QA both recommend rejecting current adoption and deferring the pilot. Lead accepts that disposition on 2026-10-13 under the maintainer's offline/no-automatic-upload direction, recorded in [decision D-018](decisions.md). No SDK, account, service configuration, transmission or app change occurred. Reopen only after an explicit decision to evaluate hosted synthetic testing; current offline backlog work proceeds with voluntary local diagnostics instead.
