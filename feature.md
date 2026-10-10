# Smart Paper Features

Updated: 2026-10-10. Keep this file short and update it when user-visible features change.

## In the Android app

- Plan Saturday-to-Friday weeks with goals and notes that save automatically on the device, with Retry if saving fails.
- Track ten configurable sections and timed day events.
- Open one compact section at a time, edit its minutes, goal, and note, and use a full writing view for longer text.
- Save and reuse full-week templates.
- Review multi-week summaries.
- Track a finance goal and income entries, with confirmation before deletion.
- Use English or Persian.
- Choose a saved Light or Dark appearance across every app page, including summaries and reports.
- Export JSON backups and readable CSV, Excel, or Markdown files.
- Create a selective Markdown AI report by field and date range, preview its text, then copy it for manual pasting or share its file using the phone's app chooser. Manual text selection is available when copying fails; changed source data requires reviewing the refreshed preview. The file explains itself and asks the AI for a grounded first response.
- Import a JSON backup by merge or replace.
- Set an optional morning plan notification and explicitly save validated Settings from the header or end of the form.
- Run focus and rest countdowns with configurable lengths and an hourglass display; a session stays accurate after navigation or app suspension.
- Capture freeform ideas, expand optional writing sparks when wanted, revisit an older thought each day, branch from notes, and search or edit them. Notes are included in JSON backups. Contextual new/edit/branch drafts recover separately, protect dirty writing, and retain missing/changed-source writing with Keep as new thought. Drafts are excluded from backups.

## Recent completed work

- Implemented explicit Android cloud-backup exclusion and supported device transfer, with bilingual Export recovery guidance. Finance authorization stays in memory and relocks after full reload/restart while saved records remain intact. Automated, browser and compiled APK checks passed; publication is tracked in [Android 2026.10.14](releases/smart-paper-v2026.10.14.md). Actual device/OEM migration remains unverified.

- Corrected the Planner event editor for short landscape screens: its fields and actions scroll inside a viewport-bounded sheet. Bilingual browser QA passed; shipped in [Android 2026.10.13](releases/smart-paper-v2026.10.13.md).

- Simplified the local Planner bottom area: removed the fixed bar and reserved gap, kept Next day reachable in the week overview and active day, and moved save status/Retry inline. Django's manual-save footer is unchanged. Shipped in [Android 2026.10.12](releases/smart-paper-v2026.10.12.md); see the [task](tasks/2026-10-09-planner-bottom-area.md).

- Finance now rechecks unlock expiry with bounded active polling and focus/resume checks, clears displayed data and unsaved edits, and rejects stale responses. PIN naming and focus recovery improve the lock screen; saved records remain intact. Shipped in [Android 2026.10.11](releases/smart-paper-v2026.10.11.md); see the [task](tasks/2026-10-09-finance-session-expiry.md).

- Replaced the report's misleading Open ChatGPT URL with explicit Copy report text, Share report file and manual selection. Transfers recheck source/finance access and preserve the reviewed content; recipient delivery remains a phone follow-up. [Handoff task](tasks/2026-10-07-ai-report-chatgpt-handoff.md) tracks validation and publication.

- Corrected local JSON Merge import to preserve unrelated saved week templates, including empty/partial incoming collections; matching IDs update from the backup. Actual-adapter and five-key rollback tests cover the fix; Android release verification is tracked in [template merge safety](tasks/2026-10-08-template-merge-safety.md).

- Implemented Ideas writing protection/contextual recovery, safe retry after note-save cleanup failure, end-of-form Settings Save, and Finance deletion confirmation/larger commit targets for [Android2026.10.6 / code23](releases/smart-paper-v2026.10.6.md). Runtime QA and publication status are tracked in that record.

- Replaced routine Planner Save buttons with automatic local saving, compact device-save status and navigation-only Next day; schedule actions now say Add event / Apply changes. Explicit commands on other pages remain deliberate.

- Aligned Planner dark colors with the shared green palette used on the other pages, including nested editors and the mobile save bar.

- Implemented individual day minimization and “Minimize all days” in Android2026.10.3, preserving drafts and keeping the week overview visible.
- Fixed the remaining white hover surfaces in Idea Space and pale Timer hourglass glass in dark mode after Designer coverage review.
- Extended the Planner's dark appearance to all routes and kept the choice across navigation and reloads.
- Made Planner sections compact and scroll the opened section into view; goals and notes grow as written, with a full writing view and clearer save/retry feedback.
- Refined Idea Space's bilingual phone layout so writing and saving stay prominent; optional sparks expand on demand and return focus to the editor after selection.
- Added Idea Space as a separate, bilingual writing area without required titles or categories.
- Added a self-explanatory introduction and AI response request to selective reports, with scope limits and a reminder that omitted fields are unknown.
- Download the selected AI report when browser sharing is denied after the browser claims it is available.
- Added field and date selection to the AI report; finance is off by default and a filtered report cannot be restored as a backup.
- Gave each Android JSON backup a dated filename and showed the selected backup's week and income counts before replacing saved data.
- Checked local backup structure before showing the replace confirmation, so invalid files fail without a destructive prompt.
- Kept the planner and mobile save bar at the phone viewport origin on launch; contained week/day scrolling within their rows.
- Fixed phone-width planner overflow and the overlapping language selector; the save bar remains in the visible viewport.
- Aligned planner, finance, summaries, export, and settings around a calmer paper-and-teal palette.
- Improved primary-action contrast, selection cues, and Persian RTL week/day navigation.
- Made backup import validate data before changing saved records.
- Added rollback if an import storage write fails.
- Added confirmation before replacing all saved data.
- Added reminders to keep a backup outside the app.
- Clarified that the Android finance PIN does not encrypt data.

## Still needed before sharing

- Test backup and restore on a physical phone.
- Test an APK upgrade without losing data.
- Check English/Persian layouts and notifications on a phone.
