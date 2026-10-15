# Design: Trustworthy JSON import feedback — product brief

Status: accepted and shipped in Android 2026.10.28
Updated: 2026-10-16
Owning frontend route/component: `/export`, `smart-paper-front/src/components/export-view.tsx`
Local studio story links: Designer to supply in interaction handoff
Optional Figma file and frame links: Not required
Design type: proposed change

## Problem and evidence

- User job: restore a known backup and understand which file and mode completed, without mistaking incoming records for newly created records.
- User direction: Product and Designer should choose a bounded improvement after review found offscreen import feedback, a reset filename, and incomplete/ambiguous counts; implement if warranted.
- Observed source: `handleImport` immediately clears the native file input, then reports only weeks and income entries through the shared status above the overview. The import control is below that overview. Source supports the review finding that feedback can be outside the visible import area; this is not a claim of measured user failure.
- Observed contract: `importLocalExportPayload` returns incoming week/income array lengths, not record differences. Merge upserts by identity; unrelated week templates survive absent/empty incoming templates. Local backups also carry Idea Space notes and week templates, both omitted from the current success text. Replace confirmation includes Ideas but omits templates. Older optional collections may be absent.
- Additional observed access defect: `getLocalWeeks(8)` constructs only the current +/-8 week window; Planner obtains that list and exposes no arbitrary-date picker. Imported weeks outside the window remain stored but are absent from the selection rail. A receipt alone cannot fulfill the restore-and-use job for those weeks.
- Source evidence: `PRODUCT.md` backup boundaries; `src/lib/local-store.ts` import implementation; `src/lib/local-import-safety.ts` validation/rollback; `src/lib/smart-paper-types.ts` payload/result contracts; prior [export/import baseline](2026-10-01-export-report-import-baseline.md).
- Needs confirmation: frequency of repeated imports or uncertainty among real users. This cycle addresses reproducible interaction ambiguity without an adoption claim.

## Outcome and scope

- Desired outcome: immediately after an import, the person can identify its outcome, file, mode, and the incoming collections without searching elsewhere or inferring that every record was added.
- Success signals: EN/FA phone QA can observe the result from the import interaction; a repeated Merge gives truthful incoming counts; Ideas-only and templates-only backup fixtures no longer appear to have done nothing.
- In scope: import progress/result discoverability, in-session filename/mode context, accurately labelled incoming collection counts, equivalent Replace confirmation coverage where supported, and making existing stored local weeks available in Planner's existing week selector.
- Non-goals: new import preview step, record-by-record difference calculations, duplicate-resolution controls, new import modes, changing storage/schema/rollback, backend changes, persistent import history, automatic retries, or redesigning exports/AI reports.

## Acceptance criteria

1. After local Merge or confirmed Replace succeeds, a discoverable receipt identifies success, the selected filename, and the mode actually used. It is available at the import interaction on phone and wide views and announced accessibly. Designer chooses the interaction; unnecessary focus jumps should be avoided.
2. The local receipt labels counts as records **in the backup** for weeks, income entries, ideas, and week templates. It must not say these are newly added records or derive incoming counts from merged device totals. Zero remains explicit; optional Ideas/templates omitted by older backups count as zero incoming records.
3. Reimporting the same file using Merge reports the same incoming collection counts without claiming new additions. The receipt may explain that Merge can update matching saved records; this does not introduce difference counts.
4. Local Replace confirmation retains an explicit destructive warning and filename and covers all four incoming collections before committing. Cancel leaves saved data unchanged and never produces success feedback. Existing default Merge and deliberate Replace confirmation remain.
5. Invalid JSON, invalid/unsupported backups, authorization expiry, and storage failures never produce success receipts. Progress, failure and successful outcomes remain distinct. A new attempt clears or clearly supersedes the prior receipt; choosing no file must not fabricate an attempt. Selecting the same file again remains possible.
6. Current data safety contracts remain intact: validation precedes mutation; Finance authorization is required and stale results remain suppressed; Merge/Replace, hidden Finance recovery guidance, PIN/visibility exclusions and rollback behavior remain unchanged. No filename or backup content is added to diagnostics or network traffic.
7. EN and FA receipts and confirmation use translated labels and localized numerals, remain correct after a language switch, and support RTL, long/mixed-script filenames, phone width and readable wrapping. Preserve the existing unencrypted-backup warning. Check accessible status/error announcements and keyboard operation; physical TalkBack remains an explicit follow-up if unavailable.
8. Django mode continues to report only supported backend results. It must not imply that unsupported local-only Ideas/templates were imported. The local-data contract is primary; no backend expansion is required.
9. After import, Planner's existing local week selector includes every saved week outside the normal current +/-8 week window, retaining that normal window, chronological order, unique dates and the current-week marker/default. Selecting an old or future imported week displays its saved content. Use the union of stored week dates and the existing window; do not generate every empty week between distant dates. Replace must remove obsolete stored-only choices when the page next loads; Merge retains unrelated saved choices.
10. When an incoming backup contains weeks, its receipt gives a truthful incoming date range and a plain Open Planner action plus concise guidance to choose the imported week. A range must not imply that every intervening week exists. No automatic selected-week change, new route/deep-link contract or date picker is required. Zero-week imports do not show a misleading planner recovery hint. Designer supplies equivalent EN/FA navigation guidance.

## Design direction

- Information priorities: outcome, file/mode identity, then precisely labelled incoming counts and relevant existing recovery guidance. Designer owns layout, focus/scroll policy, hierarchy and final copy.
- Content intent EN: “Import complete”; “File”; “Mode”; “Records in this backup”; “Weeks”, “Income entries”, “Ideas”, “Week templates”.
- Content intent FA: «ورود اطلاعات انجام شد»؛ «فایل»؛ «روش ورود»؛ «رکوردهای موجود در این نسخهٔ پشتیبان»؛ «هفته‌ها»، «درآمدها»، «ایده‌ها»، «الگوهای هفتگی». Designer should reconcile terminology with existing translations.

| Option | User value | Risk | Size | Decision |
| --- | --- | --- | --- | --- |
| Only relocate the existing success string | Makes result easier to find | Filename/mode and incomplete/ambiguous counts remain | Small | Insufficient |
| Contextual receipt with file, mode and truthful incoming counts | Resolves all observed ambiguities with existing data | Must distinguish payload counts from net changes and local/backend support | Small–medium | Recommended |
| Include saved local dates in existing Planner rail | Makes older/future restored data usable through the existing interaction | Larger saved histories require checking rail usability and current-week initial positioning | Small | Required alongside receipt after access defect found |
| Add preview and a computed add/update/conflict report | More detail before mutation | New interaction and difference semantics exceed evidence | Large | Deferred |

## States and implementation handoff

- Cover ready, importing, successful Merge, successful Replace, Replace cancelled, invalid file, storage failure, expired authorization, older missing optional collections, repeated same-file selection, and opening an imported week outside the normal window.
- Designer must review current rendered behavior and save bilingual editable studio stories and a ready-for-implementation handoff before frontend changes. Include long filenames, zero/nonzero counts, and success/error phone views.
- Product decision: implementation is warranted after Designer acceptance. This brief is ready for Designer; it is not the final interaction handoff.
- Product scope decision: include saved dates in the existing rail. Deferring would leave genuinely imported data inaccessible through the supported Planner UI. This fixes access to existing records; it does not add a personal-routine integration or a navigation feature.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product contract and source review | Paths listed above | Complete |
| Current rendered comparison; EN/FA studio handoff | [Designer handoff](2026-10-15-import-feedback.md); native Chrome wide + studio phone/wide | Accepted |
| Receipt truthfulness and unchanged import semantics | 179 local tests; exact-source hosted browser integration on `baf05da` | Passed; no product blocker |
| Phone/wide and accessibility behavior | Hosted EN/FA phone receipt/focus/overflow and archived-content assertions; Designer comparison | Bounded browser/studio checks passed; physical chooser/TalkBack unverified |

Product accepted release: this corrects misleading restore feedback and previously inaccessible restored weeks. Exact-source CI, independent unsigned/final artifact reviews and public APK verification passed; see [release record](../releases/smart-paper-v2026.10.28.md).
