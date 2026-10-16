# Design: Preserve saved values during local Merge

Status: implemented — bounded comparison accepted
Updated: 2026-10-16
Owning frontend: Android/local `/export`, `export-view.tsx`, `local-store.ts`, `idea-notes.ts`
Design type: correction to existing behavior

## Problem and decision

The user exported, added a Thursday day note, and merged the older backup; the note disappeared. Source replaces entire matching days arrays. The previous receipt design preserved that unsafe contract. [Revised Product brief](2026-10-16-safe-merge-product.md) now owns the precise preservation rules and acceptance cases.

Recommend deterministic keep-device conflict handling, filling empty planner text/duration and adding distinct records. No recency claim: no trustworthy edit chronology exists. Automatic recovery copy/export, history, conflict wizard and difference counters are deferred under lead scope decision. This fix cannot reconstruct previously overwritten writing without an existing source containing it.

## Implementation contract

- Preserve the current chooser/receipt structure and all previous [feedback handoff](2026-10-15-import-feedback.md) focus, locale, authorization, dates, filename/mode, counts, links and hidden-Finance behavior. No new step or confirmation for Merge.
- Local mode label **Merge · keep saved values / ادغام · حفظ مقدارهای ذخیره‌شده**. Explanation: **Merge keeps saved values when they differ, fills empty planner fields and adds missing records. / ادغام، مقدارهای ذخیره‌شدهٔ متفاوت را نگه می‌دارد، بخش‌های خالی برنامه‌ریز را پر می‌کند و رکوردهای موجودنبوده را اضافه می‌کند.** Follow with **It does not apply deletions; a cleared planner field may receive backup content again. / حذف‌ها اعمال نمی‌شوند؛ ممکن است بخشی از برنامه‌ریز که پاک کرده‌اید، دوباره با محتوای پشتیبان پر شود.** Existing shorter established translations may be retained if meaning matches. Remove local promises of matching-record/Finance-goal updates; keep Django's supported behavior separate.
- Keep **Import complete / ورود اطلاعات انجام شد** and **Saved on this device / در این دستگاه ذخیره شد** after a committed success. When genuine differing meaningful values were retained, place a compact attention paragraph before incoming counts: **Saved values kept / مقدارهای ذخیره‌شده حفظ شد**; **Some backup values were not applied because saved values were kept. / بعضی مقدارهای نسخهٔ پشتیبان اعمال نشد، چون اطلاعات ذخیره‌شده حفظ شد.** Do not imply full application or label this data loss/error.
- Below that, summarize only affected categories, with optional planner calendar dates when their meaning can be stated precisely: Planner, scheduled events, templates, Ideas, income, Finance goal, planner sections. Translate names and use existing date helpers and numerals. Exclude note bodies, titles, amounts, filenames beyond the receipt and any diagnostics content. Category-only summary is accepted for this correction. If dates are shown, distinguish affected days from weekly-field start dates; never label every week start as an affected day. For long date sets use a bounded date range rather than an unbounded list. No mixed-unit numeric conflict counter. Blank incoming values preserving saved content and equal values are ordinary no-ops, not conflicts. Do not show conflict attention when there are none.
- **Keep the original backup to review unapplied content. / برای بررسی محتوای اعمال‌نشده، فایل پشتیبان اصلی را نگه دارید.** Never advise Replace as a shortcut to resolving one retained value. If section configuration is retained and content may be hidden, show **Imported content in hidden sections remains saved; use section settings to show it. / محتوای واردشده در بخش‌های پنهان ذخیره می‌ماند؛ از تنظیمات بخش‌ها آن را نمایش دهید.** Existing Settings route is sufficient; no new viewer or section workflow.
- Incoming counts remain **Records in this backup**, including zeros and optional local collections; never newly added records or conflicts. Example multi-category receipt: 1 week, 3 income records, 2 Ideas, 1 template; its kept-values summary is separate. Empty backup still reports four explicit zeros and no fabricated conflict.
- Product's per-field/per-record policy remains authoritative: keep meaningful device planner values and fill blank/zero; retain complete conflicting schedule/template/Idea/income records; preserve saved Finance goal including zero and existing section configuration; initialize unsaved goal/config only; add distinct records and deduplicate equal repeat imports. No concatenation/summing, relinking, new IDs for conflicts or timestamp winner logic.
- Keep Replace deliberate and destructive with current filename/four-category confirmation and existing manual external-backup/unencrypted warning. Cancel says no changes saved. Storage/validation failures retain translated error title and retry instruction; never claim safe rollback succeeded unless authoritative. Authorization expiry clears receipt and exposes the existing generic PIN error. No new snapshot, recovery export or stale-plan screen.

## Layout, interaction and accessibility

Reuse existing soft receipt, teal links, borders, success text and amber attention border; pair color with heading/text. The attention paragraph participates in the same polite success announcement; no separate alert or focus jump. Terminal receipt is focused once and scrolled as previously specified. Language switching keeps identity, does not refocus, and retranslates all labels. Navigation stays outside live content.

One count column on 390px phone; two on wide. Category/date sentences wrap normally, mixed-script filenames use `bdi`/anywhere wrapping. Preserve RTL order, Vazirmatn, 48px controls, visible focus and dark tokens. At 150% text flow grows vertically; no fixed-height warning or sideways page scrolling. The editable states are illustrative and do not mutate data.

## Editable stories

[SafeMerge source](studio/src/stories/SafeMerge.stories.tsx), base `http://localhost:6017/?path=/story/proposals-safe-merge--`:

- [EN phone](http://localhost:6017/?path=/story/proposals-safe-merge--english-phone), [FA phone](http://localhost:6017/?path=/story/proposals-safe-merge--persian-phone), [EN wide](http://localhost:6017/?path=/story/proposals-safe-merge--english-wide), [FA wide](http://localhost:6017/?path=/story/proposals-safe-merge--persian-wide).
- Ready, NoConflicts, EmptyBackup, PersianStorageFailure, ReplaceCancelled and AuthorizationExpired cover meaningful outcomes.
- [FA large dark](http://localhost:6017/?path=/story/proposals-safe-merge--persian-large-dark) covers long mixed-script filename, all categories, date and 150% copy.

## Verification and readiness

| Check | Evidence | Result |
| --- | --- | --- |
| Source/product review | User Thursday-note report, prior handoff/current import source and revised Product policy | Complete |
| Studio typecheck/build | Docker Node24 isolated `sp-import-design-deps`: typecheck and production Storybook build passed | Passed |
| Rendered review | Native Chrome Guest screenshots: EN390 phone conflict receipt, FA390 150% dark long mixed filename, EN/FA896 wide, FA390 storage failure. Empty/no-conflict/cancel/lock source states checked. No clipping found; bilingual content and attention text readable | Passed (studio width containers; physical phone unverified) |
| Actual corrected frontend comparison | Native Chrome Guest `localhost:3192`: typed and autosaved Thursday day note `Current Thursday note محفوظ`; imported synthetic older backup `safe-merge-review.json` with a conflicting Thursday note; EN receipt focused with category-only saved-values warning and separate incoming counts. Switched to Persian: labels/numerals retranslated and focus remained on language selector. Reopened Planner: exact Thursday note retained and previously empty weekly note became `Incoming missing weekly note` | Passed in wide native browser |
| Physical Android/TalkBack | No device check in this design pass | Follow-up, no native claim |

No open product interaction decision. Designer recommends this bounded correction and marks the handoff ready; no unresolved design choice blocks implementation. Studio checks passed; implementation acceptance requires exact note preservation plus same-week missing content import, repeated-import truthfulness and independent correctness/security review.

## Implemented comparison acceptance

Designer accepts the corrected implementation after the bounded native Chrome flow above. EN/FA screenshots show the attention summary before incoming counts, no note bodies or mixed conflict counter, and readable RTL. Local policy explanation and refill-cleared-field limitation are visible before choosing a file. A normal Settings link accompanies hidden-section guidance. Category-only disclosure is an approved bounded alternative to potentially ambiguous weekly/day dates.

Approved P2 correction: hidden-section guidance is driven by separate retained-hidden-content metadata and may appear even without a conflict; this truthfully explains discoverability independently of saved-values disagreement. Its placement outside the amber conflict panel is appropriate. Existing rounded amber attention panel differs from the studio border stripe but retains clear hierarchy, contrast and text cue; accepted.

The actual Thursday note remained exact after leaving Planner, importing and reopening; nonconflicting incoming weekly content restored in that same week. This bounded browser check supplements the owning regression suite and independent correctness/security review; it does not certify every data class or native Android picker/TalkBack. Actual phone assertions remain the exact-source browser suite; studio phone/dark screenshots are separate evidence. The already lost original user note is not claimed recovered.
