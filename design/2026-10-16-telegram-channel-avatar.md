# Design: Telegram channel avatar

Status: published and visually verified on channel
Updated: 2026-10-16
Owning surface: @smart_paper_app channel photo
Design type: adaptation of approved app branding

## Problem and scope

The channel needs a clear standalone profile image. The existing launcher mask-preview strip is a comparison image, unsuitable as a channel photo. Use the approved Smart Paper mark for recognition at small sizes. No application screen, interaction, product scope or code changes are involved.

## Assets and provenance

- Upload: [1024×1024 PNG](assets/telegram-channel-avatar.png), opaque RGB, full teal background.
- Editable source: [SVG](assets/telegram-channel-avatar.svg), 1024×1024, viewBox `18 18 72 72`.
- Source artwork: [Android launcher SVG](assets/android-launcher-icon.svg) and [approved launcher design](2026-10-11-android-launcher-icon.md).
- The source paths are unchanged: cream paper `#fffdf5`, pale fold `#b6ddd0`, teal writing/check and background `#0f766e`. Only canvas dimensions and viewport change to the existing nominal 72-unit crop. No text, new logo or generated illustration.

## Crop and accessibility

Upload the complete square without further zoom. Telegram can circle-mask the full teal square. Paper bounds x35–73, y29–79 lie wholly inside the center (54,54), radius36 circle: even the bounding-box corners are within radius31.41. The paper and check remain recognizable in small previews; writing/fold are secondary details. The check provides a non-color recognition cue.

English/Persian and LTR/RTL use the same text-free mark; no mirroring. Keyboard, focus, touch targets, translated content length, loading, error and destructive states are not applicable to this static photo. Telegram supplies channel name and interaction accessibility.

## Handoff

Designer recommends the PNG and marks it ready for channel upload. Lead owns upload and live channel acceptance. No new Storybook story or studio build is needed: this task adapts a static brand asset and changes no app UI. The existing approved launcher story remains the brand reference (`proposals-android-launcher-icon--phone`). No Figma supplement needed. No credentials or Telegram APIs were accessed by Designer.

## Verification

- Rendered the exact SVG to PNG with the bundled Sharp runtime; no dependency installation or background process.
- Inspected the actual 1024px render and circle-masked 256px, 64px and 40px previews. Paper stays fully visible; silhouette, check, colors and spacing remain clear. Temporary crop preview: `/private/tmp/smart-paper-avatar-crop-preview.png`.
- PNG metadata verified: 1024×1024, three RGB channels, no alpha; corner pixel is RGB(15,118,110).
- Compared with the source vector and approved launcher handoff. No running app comparison needed because no application behavior changes; live Telegram rendering remains for lead verification after upload.
- No background process was started. App/backend/frontend files untouched.

## Live channel acceptance

Lead accepted the asset and uploaded this exact PNG to @smart_paper_app on 2026-10-16. Telegram confirmed a new profile-photo identity while retaining the Persian title/description and pinned guide2. Lead inspected the actual public channel in the in-app browser: the circular avatar remains clear in the profile/sidebar and small post/header icons. No extra app/release change was made.
