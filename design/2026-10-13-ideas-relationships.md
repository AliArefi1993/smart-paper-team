# Design: Read a thought’s origin and branches

Status: ready for implementation
Updated: 2026-10-13
Owning frontend: `/ideas`, `IdeaSpace`, existing note/draft helpers
Editable studio: [IdeasRelationships.stories.tsx](studio/src/stories/IdeasRelationships.stories.tsx), `Proposals/Ideas relationships`
Optional Figma: not required
Design type: proposed bounded change

## Problem and evidence

The maintainer finds the relationship between connected thoughts hard to find and explicitly chose **improve existing branches first**. [Product brief](2026-10-13-ideas-relationships-product.md) and [task](../tasks/2026-10-07-idea-space-connected-thoughts-refactor.md) define direct origin/child lineage using the existing `parent_id`; this does not add arbitrary links between independently saved notes. Product incorporates the required read-only personal-systems consultation. No user research or inferred independent-link requirement is claimed.

Source at frontend `4a6736d` shows freeform notes, one optional parent ID, daily rediscovery, body-only trimmed search with daily scatter order, and a noninteractive 70-character “From” excerpt. It has no full saved-note reading surface or direct-child list. Explicit Grow/Edit guard dirty drafts before changing the composer; missing/conflicting sources and cleanup failures already have recovery states. Deleting a note retains surviving notes and their parent references.

Designer compared narrow `idea-space.tsx`, `idea-notes.ts`, `idea-draft.ts` and current Product contract with the [saved actual EN/FA editor baseline](evidence/2026-10-06-app-dark/). These historical screenshots establish the existing composer treatment; current source is authoritative for relationship/draft behavior. A fresh parent-supported synthetic baseline comparison and rendered proposal checks are recorded below.

## Outcome and scope

Open a saved thought, read its full current saved wording, open its direct origin or any direct branch and return without losing unfinished writing or the search/collection entry context. All reading works offline and performs no storage mutation.

In scope: one read-only saved-thought reader, directional origin/branch controls, direct-hop viewing history, stable return/focus and truthful missing states. Existing capture, sparks, Grow/Edit/Delete, search, daily selection, draft recovery, notes/schema and backup contracts remain authoritative. No graph/tree, recursive expansion, linking/reparenting authoring, similarity, new persistence or cross-feature routine is added.

Needs confirmation: discoverability in actual use and native Android/TalkBack/keyboard/Back/lifecycle behavior. The separately deferred independent-link question does not block this explicitly chosen lineage improvement.

## Flow and hierarchy

Add **Open thought / باز کردن فکر** to each saved collection card and the daily-return card. This clearly opens reading and does not imply Edit or Grow. Keep current card body, date and existing Grow/Edit/Delete actions; do not turn the entire card into a nested interactive button. The current “From” excerpt becomes a secondary **Original thought / فکر اصلی** action with its excerpt when resolvable. A missing/self origin shows unavailable text instead. Independent notes may carry a quiet **Independent thought / فکر مستقل** label; do not infer links from similar wording.

Reading uses a full-viewport overlay/dialog in the same mounted IdeaSpace component. Keep the active composer/draft and collection DOM mounted, make the underlying content inert and hidden from assistive navigation while the reader is open, and lock its scrolling. This avoids route remounts, accidental keyboard activation and the composer being used as a reading field. A saved thought’s body is a noneditable paragraph with preserved whitespace and `dir=auto`, not a textarea.

Reader hierarchy:

1. Header: **Return to collection / بازگشت به مجموعه**, or **Return to daily thought / بازگشت به فکر روز** for daily entry. After a hop, also show **Back to previous thought / بازگشت به فکر قبلی**. Both remain reachable above the scrolling content.
2. Focusable **Saved thought / فکر ذخیره‌شده** heading and existing formatted creation date. Associate saved-body excerpt/date context for accessible identity, without raw IDs or an invented note title.
3. Full saved body, readable paragraphs and mixed-direction text.
4. Optional quiet reassurance when a draft exists: **Your unfinished writing is unchanged. / نوشتهٔ ناتمام شما تغییر نکرده است.** Existing draft errors/receipt state stay intact; this sentence does not promise failed recovery was persisted.
5. **Original thought / فکر اصلی**: one excerpt/date button, independent state, or unavailable text.
6. **Thoughts grown from this / فکرهایی که از این فکر رشد کرده‌اند**: only direct children, ordered oldest creation first then ID tie-breaker. Each item opens its full saved text; it never grows a new note.
7. Existing explicit **Grow this idea / پرورش این ایده** and **Edit saved thought / ویرایش فکر ذخیره‌شده** actions. They reuse current replacement guards; no new Delete action is added to the reader.

Every relationship action appends only the target ID to an in-memory user navigation stack. Back removes exactly one user viewing step and focuses that thought’s heading; each hop/back resets the reader’s own body scroll to its beginning. Exit clears only viewing state and restores the original collection/daily scroll and entry control focus. At the first viewed thought, Escape exits; after a hop, Escape returns one viewing step. The initial entry target and original entry control are separate: opening an origin directly from a card returns to that card’s origin control, without fabricating an unseen child viewing step.

Resolve targets from the entire current saved collection, even when outside search results. Keep the search query byte-for-byte, the current daily scatter ordering and daily-return algorithm unchanged. Preserve the captured entry day through reading and immediate return; the next ordinary writing/search/save/retry/delete action or successful composer selection resumes current-day discovery. A declined reader action retains its entry context. Do not clear a search, inject matching results, reorder collection items around the reader, change selected daily note or force a save/discard confirmation for pure viewing.

## Content and states

| State | Presentation and behavior |
| --- | --- |
| Connected thought | Full body with separate directional origin and direct-child groups. No generic “related” claim or inferred tree. |
| Independent | **Independent thought · no original thought / فکر مستقل · فکر اصلی ندارد**; omit origin-opening control. Children may still exist. |
| No direct children | **No thoughts have grown from this yet. / هنوز فکری از این فکر رشد نکرده است.** No placeholder branch or disabled dead action. |
| Missing origin | **Original thought unavailable / فکر اصلی در دسترس نیست**. Keep body readable and direct children available; do not relink or clear the saved parent reference. |
| Self-parent | Same unavailable-origin presentation, no self-opening control; exclude the viewed ID from its own child list. No data repair. |
| Viewed target disappears | **Saved thought unavailable / فکر ذخیره‌شده در دسترس نیست**; **This saved thought is no longer available. Your writing is unchanged. / این فکر ذخیره‌شده دیگر در دسترس نیست. نوشتهٔ شما تغییر نکرده است.** Keep Back/Return available; no stale body, date, Grow or Edit action. |
| Duplicate prose, distinct IDs | Keep both saved records distinct. Display their existing creation dates. Accessible open names include ordered branch/collection position and excerpt/date, e.g. “Open grown thought 1 of 2: …”; never expose IDs or deduplicate prose. If body and timestamp both match, position still distinguishes buttons. |
| Imported cycles | Render direct origin/children only; allow deliberate single-hop navigation. Never recurse, auto-open or claim a valid tree. User-step Back still works, including repeated IDs in the navigation stack. |
| Empty collection/no matches | Retain distinct existing empty/no-search-match meaning. No relationship reader opens without a current saved target. |
| Loading/damaged notes | Reuse existing load/retry protection. Do not show a guessed note or change a retained draft; Open actions appear only for valid loaded records. |
| Dirty/recovered/new/edit/branch draft | Pure viewing, hops and return leave the full draft object byte-for-byte intact: body whitespace, mode, source snapshot, receipt and error/session-only fallback. No draft write, save, cleanup or normalization is invoked by viewing. |
| Draft recovery write failure | Keep existing warning and Retry. Reading does not clear that warning or upgrade it into a saved/durable draft claim. |
| Cleanup pending after saved thought | Reading remains allowed; explicit Grow/Edit remains blocked by the existing cleanup rule. Keep existing “retry cleanup; do not save again” meaning. |
| Explicit Grow/Edit | Invoke existing guard against the current active draft. Decline stays in the reader with exact writing intact. Successful selection closes the reader, reveals/focuses the existing composer and follows its existing draft workflow; do not also restore collection focus or silently preserve/replace a second draft. Recheck that the target still exists before selecting it. |
| Edit/delete/refresh/import | Reader resolves ID against current valid saved data rather than cached body snapshots. Existing edit preserves lineage; deletion removes only the selected note and surviving children show unavailable origin. Active-source deletion keeps existing explicit Keep as new thought recovery. |
| Entry control removed | On exit focus the collection heading (or remaining daily section heading when appropriate) rather than a detached element. Preserve search/context; no forced jump to the composer. |

The studio fixtures use a/b/c/d lineage, an independent identical-prose e, orphan o, self s and cycle x↔y, with valid ISO timestamps. New/edit/branch sample writing is exactly `"  فکر ناتمام\nMixed writing  "`. Studio collection order is illustrative; production keeps its existing daily scatter implementation. Sample bodies switch between EN/FA examples for design review; production must never translate or replace saved user prose when the UI language changes.

## Layout, tokens and accessibility

Phone portrait: one full-width reader with a compact header, independent scrolling body, clear relationship sections and wrapping controls. Wide: same hierarchy with a readable maximum body width around the existing `max-w-5xl`; avoid a graph, new sidebar or wide prose lines. Short landscape: header controls wrap naturally, body uses remaining height with `min-height:0` and overflow, and nothing relies on a fixed bottom position. Large text expands vertically; no fixed relation row height or truncated action label. Long body content wraps and preserves line breaks; excerpts alone are shortened.

EN LTR/FA RTL reuse current fonts, logical alignment/spacing and directional isolation for user prose/dates. Use mapped shared ink/muted/surface/border/teal/amber/error/focus roles; never introduce a light-only hardcoded status color into Dark mode. Relationships are native buttons/links with text and dates, not color-only lines.

All opening/return/relationship/action targets at least 48px. Dialog uses `role=dialog`, `aria-modal`, heading association and focus management. On open/hop/back focus the saved-thought heading and announce identifying excerpt/date; keyboard Tab is confined to the reader including its scrolling region. The background composer and page navigation cannot receive focus while open. Exit restores the connected original trigger with `preventScroll` after restoring original scroll, or its heading fallback. A focus outline stays visible in Light/Dark; each relationship name distinguishes opening a saved thought from Grow/Edit. Do not announce raw storage IDs or include draft contents in unrelated live announcements.

The existing native discard confirmation remains the production interaction for Grow/Edit; the studio’s inline choice scene illustrates its meaning and is not a new modal specification. Native Android Back/keyboard/IME/TalkBack behavior remains unverified until actual device evidence; browser Escape/UI Back behavior is the bounded implementation requirement here.

## Implementation handoff

- Extend `IdeaSpace` view state only: saved-note ID path, entry control/section and entry scroll. Keep current composer state/component mounted; do not route pure reading through `selectNote`, `updateDraft`, `saveWriting`, cleanup, draft restore or note writes.
- Reader resolves current ID, origin and direct children from all loaded/validated notes. Child ordering is `created_at` ascending then ID; filter out self. Editing/import refresh updates the saved body; missing target removes stale actions. Duplicate IDs continue to fail existing validation with saved data untouched.
- Capture entry query/current collection ordering/daily entry/scroll/focus on open without modifying them. After close render the same collection and restore scroll/focus. Current saved data may legitimately remove an entry; use heading fallback without inventing its record or clearing a filter.
- Preserve exact `IdeaNote`, draft prefix/version/context/source/receipt, storage keys, merge/replace behavior and backup schema 5. Orphan/cycle acceptance stays unchanged; no mutation or repair while viewing. Existing schema 1–4 backup support remains.
- Keep current dirty/committed/missing/conflict guards for explicit Grow/Edit/Delete and all recovery states. No arbitrary linking/reparenting action, graph traversal, new serializer or raw-ID product UI.
- Frontend must test ID-based hops outside search, return paths, focus/scroll restoration, distinct same-prose records, missing/deleted/self/cyclic references and full draft-object equality for each mode/error/receipt case. The studio is an editable interaction reference, not credential/store/draft implementation code.

## Stories and verification

Base URL: `http://localhost:6006/?path=/story/proposals-ideas-relationships--`.

| Coverage | Editable story exports |
| --- | --- |
| EN phone Light/Dark | `EnglishPhone`, `EnglishPhoneDark` |
| FA phone Light/Dark | `PersianPhone`, `PersianPhoneDark` |
| EN wide Light/Dark | `EnglishWide`, `EnglishWideDark` |
| FA wide Light/Dark | `PersianWide`, `PersianWideDark` |
| Entry, search and content | `Collection`, `SearchReader`, `DailyReader`, `SameProse`, `Empty`, `NoMatches` |
| Missing/invalid relationships | `MissingOrigin`, `MissingTarget`, `SelfReference`, `Cycle` |
| Preserved draft states | `RecoveredDraft`, `WriteFailure`, `CleanupPending`, `PersianLarge`; draft mode remains an editable control |

| Check | Evidence | Result |
| --- | --- | --- |
| Current behavior | Narrow current source, historical EN/FA editor and [fresh release21 synthetic baseline](evidence/2026-10-13-ideas-relationships/current-baseline.png) | Compared; noninteractive From excerpt and missing direct navigation confirmed |
| Studio source | Final story `npm run typecheck`, `npm run build`, `git diff --check` after secondary-role fix | Passed; existing bundle-size warning only |
| Phone/wide/themes and realistic text | [Actual studio evidence](evidence/2026-10-13-ideas-relationships/): EN/FA phone390×844 and wide1280×900, Light/Dark, long mixed writing | Designer inspected all eight main scenes; clear full text, origin/branches, readable date roles after correction |
| Search/draft/direct-hop/Back/return | Parent-operated Collection→breakfast result b→origin a→direct child c→Back→Return; [return witness](evidence/2026-10-13-ideas-relationships/return-search-draft.png) | Parent verified exact query/raw draft unchanged and focus returned to original Open saved thought1; Designer inspected witness |
| Short landscape/large text/focus/contrast | Actual844×390 short viewport, phone lower body/actions, 22px FA text, visible heading/return focus; source shared roles | Inspected; independent body scroll, readable controls, header return remains available. Parent verified Tab from final action wraps to header Return |
| Implemented frontend visual review | [Actual app captures](evidence/2026-10-13-ideas-relationships/): EN/FA phone and wide in Light/Dark; FA Dark direct-origin/direct-branch phone states and short landscape lower state | Designer compared the running app screenshots with the ready studio handoff. Full saved prose, bilingual direction, readable relationship rows/dates, 48px-class controls, visible heading/action focus and scrollable short layout align with the handoff. No actionable visual finding in these captured states. Browser interaction/data assertions and native Android/TalkBack remain separate checks. |

Readiness: **Designer recommends this change and marks the handoff ready for implementation.** Interaction/data scope is resolved and explicitly chosen by the maintainer; no required design choice or finding remains. Continue frontend implementation and remaining tests/independent reviews/actual UI verification/release workflow under lead acceptance. No independent-link discovery or device answer blocks this supported lineage change.

Final app visual review used `gpt-6-sol` at medium effort after the routed `gpt-6.1-sol` Designer follow-up was unavailable due to capacity. Original ready handoff and Product scope remain authoritative.

Direct review links: [EN phone](http://localhost:6006/?path=/story/proposals-ideas-relationships--english-phone), [EN phone Dark](http://localhost:6006/?path=/story/proposals-ideas-relationships--english-phone-dark), [FA phone](http://localhost:6006/?path=/story/proposals-ideas-relationships--persian-phone), [FA phone Dark](http://localhost:6006/?path=/story/proposals-ideas-relationships--persian-phone-dark), [EN wide](http://localhost:6006/?path=/story/proposals-ideas-relationships--english-wide), [EN wide Dark](http://localhost:6006/?path=/story/proposals-ideas-relationships--english-wide-dark), [FA wide](http://localhost:6006/?path=/story/proposals-ideas-relationships--persian-wide), [FA wide Dark](http://localhost:6006/?path=/story/proposals-ideas-relationships--persian-wide-dark), and [collection entry](http://localhost:6006/?path=/story/proposals-ideas-relationships--collection).

The first Dark render exposed pale muted dates on an unintended mint action fill. All three relationship-button sites now use the existing secondary `alt` role, matching the intended muted surface; final Dark main four were recaptured and inspected. Dates are readable alongside the excerpts. Earlier edge captures establish edge-state semantics; the recaptured main matrix establishes final role colors. No global palette or application code was changed by Designer.

Designer also inspected missing origin/target, self-reference, cycle, same-prose fixture, empty/no matches, recovered/write-failure/cleanup-pending reader states, daily entry, enlarged Persian and phone lower relationships/actions. These are editable synthetic prototypes, not proof of production draft/store/session behavior. The fresh current baseline contains only parent-created synthetic notes. Production full-object equality, timestamps/ID child ordering, deleted/imported target freshness, no storage writes, exact scroll/focus restoration and every existing explicit replacement guard remain implementation/QA gates. Native Android/TalkBack/keyboard/Back/upgrade and physical device pairing remain unverified.

Process inventory for routine closeout: task-owned `npm run storybook -- --host 127.0.0.1`, listener PID `931`, tool session `86792`, loopback port `6006`, cwd `design/studio`. No longer needed by Designer after parent captures; stop only when parent consumers are done. Parent owns the separate synthetic current-build baseline server and its inventory. Designer changed only this handoff and the new story; Product/task/memory and application files were not edited.
