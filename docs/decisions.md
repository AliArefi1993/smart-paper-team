# Smart Paper Decision Log

This file records durable choices that constrain future work. It is intentionally short. Feature history belongs in `releases/` and implementation detail belongs in code and Git.

## Active Decisions

### D-001 — Keep three repository histories separate

- **Decision:** The team root stores coordination memory and releases; `smart-paper/` owns backend code; `smart-paper-front/` owns frontend and Android code.
- **Why:** Each application already has an independent lifecycle and Git history.
- **Consequence:** Run status, tests, commits, and tags from the repository that owns the files. The root tracks application revisions as Git links.

### D-002 — Optimize for private single-user use

- **Decision:** Treat Smart Paper as personal/private software until the maintainer explicitly chooses a multi-user direction.
- **Why:** Current planner APIs, global section settings, and shared finance PIN do not provide per-user isolation.
- **Consequence:** Do not imply multi-user security. Internet-facing deployment requires a new authentication and authorization design.

### D-003 — Maintain backend and local-data parity (superseded by D-007)

- **Decision:** User-facing planner, finance, export/import, and template behavior should work through both Django API adapters and local browser storage unless a requirement explicitly says otherwise.
- **Why:** Web/backend use and static Capacitor Android use are both supported product modes.
- **Consequence:** Contract changes normally require backend serialization, frontend types/adapters, local-store normalization, and import/export review.
- **Status:** Superseded by D-007 for Android-first development.

### D-004 — Preserve stable planner slot identities

- **Decision:** Planner sections use stable IDs `slot_1` through `slot_10`; labels and active state are configurable.
- **Why:** Stable IDs keep persisted data and exports compatible when users rename or hide sections.
- **Consequence:** Never use a display label as a persistence key. Legacy Main, Second, Learning, and Exercise fields map to slots 1-4.

### D-005 — Preserve Saturday-based weeks

- **Decision:** A Smart Paper week runs Saturday through Friday.
- **Why:** This is the product's established calendar model.
- **Consequence:** Date calculations, summaries, templates, imports, and tests must retain this boundary unless the product contract changes.

### D-006 — Release Android updates from the team repository

- **Decision:** Stable Android releases use the established private signing material; the APK, release record, app revisions, and `smart-paper-v*` tag are coordinated from the team root.
- **Why:** Matching signatures preserve update compatibility, and one release record ties all three repositories together.
- **Consequence:** Follow `docs/release-workflow.md`; never replace or expose signing secrets.

### D-007 — Make the downloadable Android APK the primary product

- **Decision:** Focus new product work on the local-data Capacitor Android app in `smart-paper-front/`. Keep Django and backend-mode web code available but pause their feature roadmap.
- **Why:** The current product runs on a phone without a server, and the first distribution goal is a signed APK for others to download. Reconfirmed on 2026-10-12: no server is available and the current focus is app use without internet.
- **Consequence:** Android changes do not require parallel backend features. Revisit backend parity when a server, sync, or web use case is chosen. Prioritize local data safety, phone usability, and signed upgrade testing.

### D-008 — Use semantic, low-noise visual cues

- **Decision:** Use a light paper canvas, dark ink, and deep teal for primary actions across screens; retain the planner's optional dark mode. Reserve amber for attention, rose for errors or destructive actions, and green for success. Keep labels and selection indicators alongside color.
- **Why:** Consistent roles and readable contrast make dense weekly and finance screens easier to scan in English and Persian. A hue alone has no guaranteed psychological effect.
- **Consequence:** New screens should reuse these roles and meet text contrast requirements. Do not encode planner categories, status, or selection through color alone.

### D-009 — Keep design handoffs in the team repository and use Figma for editable screens

- **Decision:** Store product briefs, design decisions, implementation handoffs, and verification in `design/`. Use Figma as the preferred editable canvas when connected, with links to relevant frames in the repo record.
- **Why:** The repo record keeps design intent available to every agent and tied to implementation; Figma supports editable frames and structured design context for code handoff.
- **Consequence:** A Figma frame alone is not a complete specification. Frontend and QA compare the running English/Persian Android UI with the handoff. If Figma is unavailable, save a reviewable repo artifact and mark the editable frame pending.

### D-010 — Automatically persist Android Planner edits, retain deliberate record commands

- **Decision:** Android/local-data Planner accepted edits save synchronously with truthful saved/failure feedback and explicit Retry. Django remains manual. Schedule drafts, templates, Ideas, Finance, timer duration application, Settings batches and file/restore commands remain deliberate. The local Finance visibility checkbox is a separately approved immediate-save preference (D-015).
- **Why:** The maintainer requested fewer poorly placed Save controls; Planner has ordinary editable state and duplicate routine Save affordances. Other commands create records, reset sessions, validate batches or affect privacy/permissions.
- **Consequence:** Keep week identity and latest edits safe; failure must not claim saved or silently discard text. Retain failed text across SPA return, without promising recovery from reload/process termination when storage fails. New autosave proposals require their own scope and design. See [handoff](../design/2026-10-06-save-controls-design.md).

### D-011 — Use standing maintainer authorization for eligible Android releases

- **Decision (2026-10-09):** During the current pre-user phase, the agent may complete eligible validated Android releases without requesting per-run user permission: dispatch and verify the exact hosted source, submit the required protected-environment approval with the existing authenticated review identity, verify and commit the exact APK/provenance, publish annotated tags in frontend/backend/team order, and verify the public download.
- **Why:** The maintainer explicitly authorized this agent-operated release flow to avoid repeated approval requests while preserving the existing signed-release process.
- **Consequence:** Lead acceptance, specialist review, release go/no-go, exact-SHA/build/provenance checks, and GitHub reviewer/main-only/no-bypass protections remain required. This is not unattended signing or a scheduled job. Documentation-only work does not create an APK release. Revisit when real users begin using the app or the maintainer revokes authorization; there is no date-triggered expiry. Destructive Git, production deployment/data, and credential safety boundaries remain unchanged.

### D-012 — Exclude Android cloud backup while permitting supported device transfer

- **Decision (2026-10-10):** The maintainer selected explicit cloud-backup exclusion and supported Android device-to-device migration. API 24–27 excludes OS backup because it lacks the selective transfer flag; later versions use applicable legacy/current rules. Finance authorization lives only in runtime memory and resets after full reload/restart, including migrated installations.
- **Why:** Preserve a phone replacement path while narrowing cloud eligibility and preventing restored unlock deadlines from granting Finance access.
- **Consequence:** Keep verified external JSON backups as the deliberate recovery path. Do not promise OEM migration success, encryption or deletion of historical cloud snapshots. Persisting authorization across restarts requires a separately reviewed non-backup-bound identity mechanism. See [policy](android-backup-policy.md) and [task](../tasks/2026-10-10-android-backup-policy.md).

### D-013 — Use risk-based local checks and reuse exact-commit CI evidence

- **Decision (2026-10-12):** Follow the [CI/local-test policy](ci-local-test-policy.md): check documentation paths without app tests, use focused local checks for early feedback, and reuse successful named hosted checks on the exact final commit instead of repeating identical local suites.
- **Why:** Hosted frontend verification already runs clean install, lint, types, tests and the local-data build; repeated checks on unchanged source add little evidence. Concurrent installs can invalidate shared-checkout results.
- **Consequence:** Record exact source and run identity. Dirty source, failures, offline work and uncovered behavior need their own checks; security review/audits, Designer/studio QA, physical-device follow-ups, protected signing and independent artifact/public-download verification remain separate. Workflow coverage and release gates are unchanged.

### D-014 — Keep Timer available by default

- **Decision (2026-10-12):** Keep Focus Timer in default navigation; cancel the proposal to make it optional and hidden by default.
- **Why:** The maintainer considers the existing Timer useful to keep in the app.
- **Consequence:** Remove Timer visibility work from the active backlog. This does not add Timer-to-Planner integration. See the [cancelled task](../tasks/2026-10-07-timer-optional-default-hidden.md).

### D-015 — Keep Finance visibility separate from records and authorization

The initial-default portion is superseded by D-016 on 2026-10-13; the independent preference/authorization contract remains.

- **Decision (2026-10-12):** New Android installations start with Finance hidden. Explicit device-local choice wins; existing installations without a choice retain visible Finance when the Finance storage key exists, even if its contents are empty or damaged. Persist the initial choice before import can alter key presence.
- **Why:** Preserve existing users' access while keeping Finance optional for new users, without treating hidden data as deleted or changing the PIN boundary.
- **Consequence:** Settings saves this preference immediately and independently of its other drafts. Hide never deletes Finance or changes backup inclusion; enabling grants no authorization. JSON schema 5 excludes the preference and import preserves it. Read/write failures retain a recoverable effective state without claiming durable success. Backend parity stays paused. See the [Finance handoff](../design/2026-10-12-finance-visibility.md).

### D-016 — Show Finance by default while retaining saved choices

- **Decision (2026-10-13):** The maintainer considers Finance useful to keep available. Unset visibility now defaults visible, independently of records; existing saved visible/hidden values remain authoritative.
- **Consequence:** Retain the independent Settings toggle, records, PIN and backup contract. Finance report fields still start excluded. This changes the fresh default, without silently overriding a previous stored hidden choice. See the [ready addendum](../design/2026-10-13-finance-default-visible.md) and [task](../tasks/2026-10-13-finance-default-visible.md).

### D-017 — Replace a known local Finance PIN without migrating it through JSON

- **Decision (2026-10-13):** Store a dedicated salted verifier; only an absent credential uses the legacy PIN. Current-PIN verification, serialized atomic replacement and immediate protected-session revocation are required. Malformed/unreadable credentials fail closed.
- **Consequence:** JSON contains records, never the credential; import preserves the destination PIN. No forgotten-PIN default bypass or destructive reset is offered. The existing full JSON backup/import remains PIN-gated and the limitation is disclosed before change. Supported OS transfer may copy the verifier but cannot restore a memory unlock. This remains a screen lock, not encryption. See [scope](../design/2026-10-13-finance-pin-product.md) and [implementation task](../tasks/2026-10-09-finance-change-pin.md).

### D-018 — Reject automatic hosted Android diagnostics

- **Decision (2026-10-13):** Reject automatic hosted telemetry or session replay for the Android diagnostic/reporting scope under the current offline/local-only reporting boundary. Any separately scoped diagnostic capture stays on-device, and sharing a reviewed report requires deliberate user action. The Clarity SDK/pilot is not adopted.
- **Why:** There is no evidence that hosted replay is needed to address the current reporting problem, and automatic upload conflicts with the intended local-first diagnostic flow.
- **Consequence:** This decision is specific to app diagnostics; it is not a general prohibition on unrelated hosted services. Reconsider hosted diagnostics only through an explicit Product decision with reviewed privacy, consent, retention, security and offline behavior. The conditional Clarity pilot remains unexecuted. See [evaluation](clarity-evaluation.md) and [local reporting task](../tasks/2026-10-07-local-feedback-diagnostics.md).

### D-019 — Disclosed local recording defaults ON; reports remain voluntary

- **Decision (2026-10-13):** Following explicit maintainer direction and Product/Designer review, separate local error and feature-count switches default ON only when preferences are absent, after visible bilingual disclosure and successful initialization. Saved OFF choices remain authoritative; unreadable, malformed or failed preference persistence fails closed. This supersedes the earlier OFF-default planning brief, without changing D-018's hosted-upload boundary.
- **Why:** Limited local evidence can exist before a reported failure, while independent switches, bounded retention, inspection and deletion keep control on the device.
- **Consequence:** Automatic evidence uses static codes/daily aggregates, never personal writing, Finance records, PINs, raw error prose or identifiers. Each report starts with both evidence choices unchecked and a voluntary ephemeral description; users review the exact snapshot before deliberate email or clipboard handoff. Email drafts target the maintainer-confirmed support address, with final Send controlled by the receiving app. Native/startup failures may leave no record. See the [Product brief](../design/2026-10-13-local-diagnostics-product.md) and [task](../tasks/2026-10-07-local-feedback-diagnostics.md).

### D-020 — Local Merge preserves device values on conflict

- **Decision (2026-10-16):** Android/local Merge keeps meaningful saved Planner values, fills blank text/zero minutes and adds distinct records. Conflicting matching-ID schedule/template/Idea/income records remain whole saved records; saved Finance goal (including zero) and existing section configuration remain authoritative. Affected categories are disclosed; incoming backup counts are not counts of new records. Replace remains separate destructive restoration.
- **Why:** A real export → add Thursday day note → Merge older backup sequence erased the new writing because matching weeks were replaced wholesale. There is no reliable per-field edit chronology; export times and clock-based IDs cannot choose newer content safely. Skipping entire weeks would also prevent independent missing fields from being restored.
- **Consequence:** This supersedes local incoming-wins/upsert documentation. Empty/omitted collections delete nothing; intentionally cleared Planner fields may regain backup content. Identical schedule content and repeated legacy income imports are deduplicated without summing durations or money. Import preparation reads current state without primary writes, then uses the existing rollback-managed synchronous commit. No cross-tab atomicity claim, persistent history, automatic recovery copy or conflict wizard is added; the fix cannot retroactively reconstruct overwritten writing. Backend behavior stays paused and unchanged. See [Product contract](../design/2026-10-16-safe-merge-product.md) and [task](../tasks/2026-10-16-safe-merge.md).

## Adding Or Changing A Decision

Add an entry only when the choice is costly to reverse, crosses repository boundaries, defines a product constraint, or is likely to be debated again. Include the decision, reason, and practical consequence. If superseded, keep the old entry and point it to the replacement.
