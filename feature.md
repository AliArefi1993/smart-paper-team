# Smart Paper Features

Updated: 2026-10-06. Keep this file short and update it when user-visible features change.

## In the Android app

- Plan Saturday-to-Friday weeks with goals and notes.
- Track ten configurable sections and timed day events.
- Open one compact section at a time, edit its minutes, goal, and note, and use a full writing view for longer text.
- Save and reuse full-week templates.
- Review multi-week summaries.
- Track a finance goal and income entries.
- Use English or Persian.
- Choose a saved Light or Dark appearance across every app page, including summaries and reports.
- Export JSON backups and readable CSV, Excel, or Markdown files.
- Create a selective Markdown AI report by field and date range, preview its text, and share it using the phone's app chooser. The file explains itself and asks the AI for a grounded first response.
- Import a JSON backup by merge or replace.
- Set an optional morning plan notification.
- Run focus and rest countdowns with configurable lengths and an hourglass display; a session stays accurate after navigation or app suspension.
- Capture freeform ideas, expand optional writing sparks when wanted, revisit an older thought each day, branch from notes, and search or edit them. Notes are included in JSON backups.

## Recent completed work

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
