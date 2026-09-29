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
- **Why:** The current product runs on a phone without a server, and the first distribution goal is a signed APK for others to download.
- **Consequence:** Android changes do not require parallel backend features. Revisit backend parity when a server, sync, or web use case is chosen. Prioritize local data safety, phone usability, and signed upgrade testing.

### D-008 — Use semantic, low-noise visual cues

- **Decision:** Use a light paper canvas, dark ink, and deep teal for primary actions across screens; retain the planner's optional dark mode. Reserve amber for attention, rose for errors or destructive actions, and green for success. Keep labels and selection indicators alongside color.
- **Why:** Consistent roles and readable contrast make dense weekly and finance screens easier to scan in English and Persian. A hue alone has no guaranteed psychological effect.
- **Consequence:** New screens should reuse these roles and meet text contrast requirements. Do not encode planner categories, status, or selection through color alone.

## Adding Or Changing A Decision

Add an entry only when the choice is costly to reverse, crosses repository boundaries, defines a product constraint, or is likely to be debated again. Include the decision, reason, and practical consequence. If superseded, keep the old entry and point it to the replacement.
