# Export, AI report, and import — shipped behavior baseline

Status: brief; Figma coverage and visual validation pending
Updated: 2026-10-01
Owning route/components: `/export`, `smart-paper-front/src/components/export-view.tsx`, `ai-report-panel.tsx`
Figma frames: Pending

## Problem and evidence

- User job: keep a restorable copy of phone data, move it safely between installations, and choose a limited report to share for AI review.
- User direction: cover implemented features in design before future frontend work.
- Evidence: the two route components, `src/lib/i18n.ts`, `PRODUCT.md`, and `design/screen-inventory.md`. This records code behavior; rendered and Android behavior remain to be checked.
- Friction or new design hypothesis: Needs confirmation. The existing backup safety and finance opt-in text are constraints, not proposals.

## Outcome and scope

- Desired outcome: Designer can map every existing export, selective report, and restore decision in editable EN/FA frames. A successful baseline review makes the distinction between a restorable JSON backup and a separate AI Markdown report clear.
- In scope: finance unlock, overview counts, file actions, import modes, destructive confirmation, AI field/date selection, preview and share feedback.
- Non-goals: a new cloud sync service, automatic upload to ChatGPT, encrypted backup, or changing import semantics.
- Acceptance criteria for coverage: show the locked/available route, JSON backup and other exports, merge and replace import, selected file counts and confirmation, report selection/preview/disabled/share/error states, in both languages on phone and wide layouts.

## Baseline of shipped behavior

1. On Android/local mode, the route shows a warning that JSON backups are not encrypted and should be saved outside the app. Its general export/import overview requires the finance PIN. Once unlocked, it shows week count, income entry count, and total income. Export buttons create JSON backup, Excel, and CSV files through the device share/download path. The generic full Markdown **Export For AI** button is backend mode only.
2. The AI report panel is available in local mode above the locked overview. It begins with weekly goals and daily section activity selected; other planner fields and all finance fields start off. A finance goal or income selection needs the finance unlock. Income notes cannot be selected unless income entries are selected.
3. The report uses both dates as an inclusive range or both blank for all dates. **All dates** clears the range. The preview shows overlapping weeks, days, and income entry counts, a no-selection/no-data or invalid-range message when relevant, and expandable report text when available. Share is disabled when the selection cannot produce a report. **Share report file** uses the device share/download path; cancellation, failure, and successful handoff show feedback. **Open ChatGPT** is a separate external link. Smart Paper itself does not upload the report.
4. JSON import starts in **Merge / upsert** mode; **Delete old data first** selects replace. A selected file is parsed and, in local mode, validated before import. Replace first opens a confirmation showing filename and, when available, week, income entry, and idea counts; the warning says planner, idea, and finance data will be replaced and cannot be undone. Cancel stops the import. Invalid JSON and operation failures show errors; success reports imported week and income counts.
5. If finance authorization expires, the overview relocks; selecting finance report fields prompts an unlock. The AI report without finance fields can still use its planner source in local mode.

## Designer constraints and states

- Preserve the backup safety warning, the distinction between report and restorable backup, inclusive date rule, finance opt-in, and destructive replacement warning. Use exact EN/FA copy from `src/lib/i18n.ts`; do not shorten warnings in final designs.
- EN LTR and FA RTL must keep ISO date inputs readable left-to-right (`dir="ltr"` in code), and handle long translated warnings, filenames, numerals, and mixed-script report text. Account for mobile keyboard/date picker, scrolling, touch targets, focus, and screen-reader names.
- Show loading, locked/wrong PIN, empty counts, export/share progress, invalid date or file, no selection/no data, report text, file-ready feedback, merge, replace confirmation/cancel, import progress/success/error, and authorization expiry where applicable.
- Proposed changes to layout or copy must be marked separately and reviewed before frontend implementation. This file only describes shipped behavior.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Shipped behavior inventory | Source and translations above | Recorded |
| Editable EN/FA frames | Figma | Pending |
| Comparison with running phone/wide UI | Screenshots or browser/device review | Pending |
| Native share, backup restore, and accessibility | Physical Android | Pending |
