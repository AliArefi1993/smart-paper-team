# Product brief: Understandable AI report handoff

Status: brief
Updated: 2026-10-08
Owning frontend route/component: Export / `AiReportPanel`
Local studio story links: Designer to provide bilingual handoff
Design type: proposed change

## Problem and evidence

The user wants to take a deliberately selected planner report into ChatGPT for review, understand what has transferred, and recover when their device cannot share the file to that app.

- User direction: the maintainer reports that **Open ChatGPT** “doesn't work well.” They authorized this backlog task after Android 2026.10.7. Follow-up confirms: “chat gpt app opens and then it redirected to the chatgpt link site and nothings will be attached.” The app/site bounce and absent attachment are reported user evidence. Android/ChatGPT versions and independent reproduction remain **Needs confirmation**; do not infer an OS-level root cause.
- [Product contract](../PRODUCT.md): inclusive date/field selection, review before sharing, and finance off by default with unlock. Android local-data is primary.
- [Current panel](../smart-paper-front/src/components/ai-report-panel.tsx): Open ChatGPT is an external `https://chatgpt.com/` link. It passes no report. Share reloads selected source data, formats Markdown and invokes a generic file helper.
- [Current helper](../smart-paper-front/src/lib/file-share.ts): Android writes a Markdown file into `Directory.Cache` and invokes the device chooser. A successful helper return is not evidence that ChatGPT attached or sent it. Browser fallback can download a file; native cache creation is not a guaranteed user-visible download.
- [Current EN/FA copy](../smart-paper-front/src/lib/i18n.ts) suggests saving and attaching if ChatGPT is absent, but the Android panel offers no independently verified save action.
- Supporting external evidence supplied by the lead: [ChatGPT usage guidance](https://learn.chatgpt.com/docs/use-chatgpt) supports deliberate manual attachment generally. It does not establish that Android ChatGPT accepts this app's shared `.md` file or any app-specific deep link.

## Outcome and scope

Users can distinguish opening a website, handing a file to the device chooser, copying text, and personally sending their report. If the chooser cannot provide a usable recipient, the same report remains accessible for manual transfer. Success is observable in action labels, honest operation feedback, intact selections and an available fallback; recipient delivery requires separate phone evidence.

In scope: handoff actions, instructional and result copy, recoverable errors/cancellation, and a small explicit manual-text fallback. Preserve the existing report content and privacy controls. Do not require an unknown launching root cause to be resolved before correcting the evidenced expectation and fallback gaps.

Non-goals: Planner shortcut; backend work; AI integration/accounts; automatic sending or attachment; an app-specific deep link; changing report scope, formatting, or storage schema; general export redesign; promising ChatGPT availability or acceptance of every report length.

## Options and recommendation

| Option | User value | Risk / uncertainty | Size |
| --- | --- | --- | --- |
| Clarify link and chooser copy only | Removes false expectations | Native save-and-attach gap remains | Small |
| Clarify actions and add explicit Copy report text, retaining selectable text on copy failure | Gives a manual route independent of ChatGPT appearing in the chooser | Clipboard capability must be verified in packaged Android; recipient may impose text limits | Small–medium; recommended |
| Add a persistent Android Save report action | Supports file attachment from a known user-accessible location | Requires storage/location behavior and Android validation beyond the existing cache helper | Medium; defer unless text fallback is unsuitable |
| Target ChatGPT using a custom link or package-specific intent | Could reduce steps | No verified contract or reproduced cause; installation/version dependent | Unbounded risk for this cycle; reject |

Recommend the second option, with the lead's confirmed scope: remove the confusing Open ChatGPT shortcut from report actions. Instructions explain manually opening the ChatGPT app after copying. The confirmed app/site bounce makes a website shortcut unsuitable for this cycle. Designer decides how to present file sharing and the fallback. If clipboard implementation cannot support Android reliably, retain selectable report text with clear manual-copy guidance and document the limitation; do not claim copying succeeded.

## Acceptance criteria

1. Remove the Open ChatGPT shortcut from report actions. English and Persian labels/instructions distinguish file sharing, text copying and manually opening ChatGPT. No text implies that opening an app transfers a report or that a chooser result proves attachment/sending.
2. For a valid report, users can deliberately copy the report text, then open their chosen AI app/site and paste/send it themselves. Success is announced only after a successful clipboard operation. Failure leaves usable selectable text and manual-copy guidance. Clipboard is never written automatically.
3. The transferred text/file matches the content presented for that handoff. If refreshing source data changes content, the user can review the refreshed content before transfer; a stale preview must not silently describe different transmitted data. Do not broaden selected dates or fields.
4. Share cancellation, sharing failure, missing ChatGPT in the chooser and clipboard failure leave selections and report access intact, with an understandable next step. Result text distinguishes browser download from native chooser completion and does not call a native cache file a download.
5. No automatic upload/send or planner mutation occurs. Finance fields remain off by default and require the existing authorization. Copy/file sharing must not bypass expired finance access; any refreshed report remains restricted to selected fields.
6. Empty data, invalid dates, no fields, loading and locked finance cannot transfer an invalid or unauthorized report. User-facing errors do not expose raw platform exception details when a clear localized recovery instruction is available.
7. Designer provides English/Persian studio states covering ready report, chooser return/cancellation/failure and copy success/failure, with RTL, long text, large text, keyboard focus, announced feedback and accessible action names. Frontend begins after the handoff is marked ready.
8. Automated checks cover content/scope preservation and truthful handoff outcomes. Record physical Android opening, chooser/recipient behavior, copying/pasting and TalkBack checks as passed or unexecuted; physical-device checks remain follow-ups under standing release policy, not fabricated evidence or publication gates.

## Design constraints and handoff

Use existing Export/report conventions and shared appearance tokens. Keep preview review available and preserve meaningful EN/FA instructions. Do not prescribe visual layout. Suggested semantic wording: “Copy report text” / «کپی متن گزارش». Guidance explains: copy, manually open ChatGPT, paste, review and send / «متن گزارش را کپی کنید، ChatGPT را باز کنید، متن را جای‌گذاری و بررسی کنید و سپس بفرستید.» File sharing guidance describes selecting ChatGPT only if available and checking the receiving app before sending.

Open evidence: independent reproduction and platform versions; clipboard behavior in the packaged Android WebView; ChatGPT Android file acceptance and text limits. All are **Needs confirmation**. No claim of a verified recipient-specific fix is authorized by this brief.

Product recommendation: ready for Designer review, not yet ready for frontend implementation. Lead retains scope and final acceptance. [Task](../tasks/2026-10-07-ai-report-chatgpt-handoff.md) owns execution and release evidence.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Product/source review | STATUS, PRODUCT report contract, task, panel, helper, EN/FA translations | Completed; deficiencies above are observable in code |
| Phone reproduction / receiving ChatGPT behavior | Maintainer confirms app opens, redirects to site and attaches nothing | User symptom recorded; independent reproduction and platform cause remain Needs confirmation |
| Designer and studio review | Subsequent design handoff | Pending |
