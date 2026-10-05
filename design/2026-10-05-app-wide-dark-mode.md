# Design: App-wide dark mode

Status: ready for implementation
Updated: 2026-10-05
Owning frontend routes/components: `/`, `/ideas`, `/timer`, `/summaries`, `/finance`, `/export` (including AI report), `/settings`; shared appearance state and `LanguageToggle`
Local studio story links: [all dark proposals](studio/src/stories/DarkMode.stories.tsx); [summaries populated](studio/src/stories/DarkMode.stories.tsx#L26), [summaries empty](studio/src/stories/DarkMode.stories.tsx#L27), [report selection](studio/src/stories/DarkMode.stories.tsx#L29), [import replace](studio/src/stories/DarkMode.stories.tsx#L31), [finance locked](studio/src/stories/DarkMode.stories.tsx#L33), [ideas empty](studio/src/stories/DarkMode.stories.tsx#L35), [timer running](studio/src/stories/DarkMode.stories.tsx#L36), [settings](studio/src/stories/DarkMode.stories.tsx#L37), [wide examples](studio/src/stories/DarkMode.stories.tsx#L39)
Design type: proposed change

## Problem and evidence

- User report: Dark Mode appears only in Planner; Summaries and reports stay light. This is direct usability feedback, not a completed device audit.
- Current source confirms Planner owns `themeMode` locally in `weekly-planner.tsx`; each other route renders a `sp-page` root. `globals.css` defines `sp-page` as light and has no app-wide dark palette. AI report lives within Export. Planner's dark choice is lost on navigation/remount.
- The prior product contract described “optional dark planner mode”; this request expands the behavior to all seven routes. The dark story is a proposal, while existing light stories remain baselines.

## Outcome and scope

- A dark choice applies immediately across every route and survives navigation and app restart. The same choice is visible and operable from every route. Light remains the first-run default; no automatic device-theme switching is implied.
- Scope includes page canvas, navigation, cards, nested sheets and dialogs, form controls, report field/date selection and preview, status messages, loading, empty, error, locked, success, and destructive states. Downloaded JSON/CSV/XLSX/Markdown content is unaffected by visual theme.
- Acceptance: select Dark in Planner, then navigate to Summaries, Export/AI report, Finance, Ideas, Timer, and Settings; no light page or embedded white surface appears. Set Light on any route and verify the same continuity. Repeat in English LTR and Persian RTL at 360–390px and wide viewport, including reload.

## Design direction

- Retain each route's current content hierarchy, interactions, and language. Place one labeled, two-option appearance control in a consistent top navigation/header position, exposing the active option with `aria-pressed` and a visible filled treatment. Planner's current Focus/Dark wording can remain as localized label only if the light option's scope is made clear to users; recommended copy is **Light / Dark** and **روشن / تیره**. Do not add separate per-screen theme settings.
- Proposed dark roles in the studio: canvas `#101b1b`, panel `#1b2b29`, muted panel `#243532`, primary ink `#eef5f1`, secondary ink `#b6c8c2`, border `#3b5550`, action `#72dbcb` with dark text `#092522`, attention `#453922`, error `#472a2b`. These are review targets, not a mandate to duplicate colors in components. Reuse shared tokens/semantic roles where possible.
- Pair status colors with clear text and icons. Keep financial amounts, dates, report content and long notes readable; preserve the user's writing and existing data. Distinguish selected filters and disabled controls beyond color.

## States and layouts

- Phone stories show bilingual populated and empty Summaries, selected AI report, locked Export, destructive import decision, Finance populated/locked, Ideas populated/empty, running Timer, Settings and Planner continuity. Wide stories cover Summaries and report. Existing route stories supply the rest of the light structural states; apply the same semantic dark roles to their loading/error/success variants during implementation QA.
- At 360–390px, keep controls at least 44px high and let translated labels wrap. Wide layouts preserve current grouping and reading order. RTL mirrors layout and focus traversal; isolate mixed-direction dates, numbers, file names, and report text as needed.
- Keyboard focus must remain obvious on all surfaces; dark proposal uses a 3px amber outline. Native inputs, selects, date controls, selection markers, sheets, scrims, and browser color scheme need dark treatment. Screen readers announce theme choice and existing status/error text. Respect text enlargement and Android safe areas.

## Implementation handoff

- Centralize one persisted appearance preference above routes. Route roots and nested panels should consume the same state. Avoid Planner-only toggling or multiple sources of truth. Apply a theme class/attribute high enough for dialogs, route changes, and browser controls; set `color-scheme` accordingly. Keep first paint consistent with saved preference to avoid a light flash.
- Map the proposal stories to current route components; `AiReportPanel` inherits Export's theme. Existing functional state and data flow remain unchanged. Use semantic theme tokens for hard-coded Tailwind color surfaces. The studio is illustrative, and actual frontend copy and behavior come from the application.
- No product decision remains unresolved for implementation. Review owner: Designer. Frontend/QA should compare the implemented route states to these stories and log material deviations before release.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Story type check and build | `npm run typecheck` and `npm run build` in `design/studio` | Passed 2026-10-05 |
| Source comparison | Planner local theme and six `sp-page` roots inspected; AI report nested in Export | Confirmed current mismatch |
| Running UI comparison | Local Next preview attempted; native SWC and `lightningcss.darwin-arm64.node` are missing in this checkout | Pending; design is source-backed, visual QA must follow implementation |
| Phone/wide EN/FA and interaction states | Dedicated bilingual phone stories and wide Summaries/report stories added | Structural coverage; visual/device review pending |
