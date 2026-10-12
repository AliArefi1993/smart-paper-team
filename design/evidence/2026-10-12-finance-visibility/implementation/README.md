# Finance implementation review

Reviewed 2026-10-12 against the built local-data frontend. Synthetic QA records only.

- Fresh `localhost:8890` origin started hidden; old code35 assets at `127.0.0.1:8890` created goal 1000 and income 28 with note `Legacy QA income`, then the same origin upgraded to the new build and retained visible Finance behind PIN.
- The independent immediate checkbox saved while `QA unsaved label` remained in Settings. The maintainer pressed Cancel on the native leave confirmation; `settings-cancel-preserves-draft.jpg` records the unchanged draft. The synthetic label was restored and explicitly saved before further navigation.
- Hidden preference survived reload. Planner, Summaries and Export omitted Finance links; enabling restored them. Hidden direct access showed recovery guidance, and its Settings link focused `finance-visibility-checkbox`. Enabling retained the existing PIN screen.
- Hidden Export unlocked through the existing PIN and downloaded JSON schema 5 with goal 1000 and income 28, without a visibility field. Merge import preserved the hidden preference. Its successful-import hint disappeared/reappeared with cross-tab enable/hide.
- [Expiry witness](expiry-no-flash.md) counted zero post-expiry saved-income appearances after cross-tab hide, controlled-clock advance by 61 minutes and re-enable. Deliberate PIN unlock restored unchanged records. This controlled browser test does not certify native lifecycle behavior.
- Final Designer review accepted `final-settings-en-light.jpg`, `final-settings-fa-dark.jpg`, `final-hidden-fa-dark.jpg` and `final-settings-fa-dark-wide.jpg`. The final wide image is 1280×900; phone images are 390×844. Narrow 360px hidden/PIN states were checked before the copy correction. DOM reflow checks found no horizontal overflow.
- `final-*` images supersede earlier copy/layout captures. Earlier images retain interaction evidence only; `settings-fa-dark-wide.jpg` is a clipped intermediate capture and is not wide-layout acceptance evidence.
- All 102 tests, ESLint, TypeScript and local build passed before copy review. Copy-only correction passed ESLint, TypeScript and local build; exact-source hosted checks and signed artifact gates remain separate.

Actual Android installation/upgrade, TalkBack, enlarged fonts and native lifecycle remain unverified follow-ups. Preview tabs were closed and viewport overrides reset.
