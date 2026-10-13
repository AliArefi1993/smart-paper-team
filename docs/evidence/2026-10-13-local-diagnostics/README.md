# Local diagnostics runtime evidence

Synthetic Docker browser QA on 2026-10-13, against the local-data static preview before the release-only Android version bump. Playwright 1.58.2 / Chromium Headless Shell 145 ran in a fresh task-owned Linux container; no personal Chrome profile, actual email handoff or system clipboard was used. `qa.cjs`, `rapid.cjs`, `recovery.cjs` and `scroll.cjs` exited successfully. The isolated runner used `http://host.docker.internal:3000`; scripts write evidence/screenshots to `/qa`.

- `evidence.json`: disclosure precedes automatic writes, defaults/independent OFF/restart, missing preferences with existing acknowledgement, unchecked evidence, exact preview/copy/edit, primary draft and focus retention, category deletion/preview invalidation, unavailable diagnostics and primary read failure, runtime privacy canaries, and bilingual viewport measurements.
- `rapid.cjs`: ten rapid double-Escape cycles after the CloseWatcher fix.
- `recovery.json`: unexpected native dialog closing preserves the description; deliberate discard and empty closing stay closed.
- `scroll.json`: all actions remain reachable in Persian 740×360 landscape.
- Selected EN/Persian phone and landscape screenshots preserve the independent Designer visual review. Eleven original runtime screenshots were reviewed; representative images are saved here.

Fixture strings and dates are synthetic, not user reports. The browser email action was not exercised against a real email app; unit tests establish fixed-recipient URI encoding, and APK review separately checks packaged native/configuration behavior. Physical Android delivery, lifecycle and TalkBack remain unverified.
