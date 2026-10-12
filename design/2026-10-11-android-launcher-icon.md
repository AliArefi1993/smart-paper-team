# Design: Android launcher icon

Status: ready for implementation
Updated: 2026-10-11
Owning component: Android launcher resources in `smart-paper-front/android/app/src/main/res/`
Design type: proposed change
Task: [Android launcher icon](../tasks/2026-10-11-android-launcher-icon.md)
Editable studio: [Phone](http://localhost:6006/?path=/story/proposals-android-launcher-icon--phone), [Themed](http://localhost:6006/?path=/story/proposals-android-launcher-icon--themed), [Wide](http://localhost:6006/?path=/story/proposals-android-launcher-icon--wide)
Sources: [108-unit SVG](assets/android-launcher-icon.svg), [mask preview PNG](assets/android-launcher-icon-preview.png), [editable story](studio/src/stories/AndroidLauncherIcon.stories.tsx)

## Problem and outcome

The user requested replacement of the installed Android icon. Current raster launcher resources use generic Capacitor art; the unused vector contains Android robot starter art. Adaptive XML references the generic mipmap foreground. The app primary is teal `#0f766e`; PRODUCT.md establishes personal planning/writing/local Android use. Proposed mark: folded paper and a completed-plan check on teal. Launcher artwork only; label, package, screens, splash and notification artwork remain outside scope.

Acceptance: adaptive, round and legacy resources show the same text-free symbol; Android 13 monochrome retains its paper/check silhouette; no starter art remains on launcher paths. No language-specific artwork or RTL mirroring.

## Exact vector geometry

108×108 canvas centered at (54,54). All foreground points fit the central 66-unit safe circle. Flat shapes, no gradients.

| Element | Geometry / style |
| --- | --- |
| Background | Full canvas `#0f766e` |
| Paper | `M41 29H61L73 41V73Q73 79 67 79H41Q35 79 35 73V35Q35 29 41 29Z`, fill `#fffdf5` |
| Fold | `M61 29V37Q61 41 65 41H73Z`, fill `#b6ddd0` |
| Writing | `M44 47H59M44 53H54`, no fill, teal stroke 3, round caps |
| Check | `M45 64L51 70L64 57`, no fill, teal stroke 4, round caps/joins |

Studio displays viewBox `18 18 72 72` to simulate the nominal adaptive mask crop. Foreground is transparent outside the sheet; background covers the full overscan area.

## Implementation handoff

Create a 108dp Android vector foreground and reference it directly from both adaptive icon XMLs. Replace all conflicting density/background resources consistently. Add Android 13+ version-qualified monochrome adaptive resources. Monochrome deliberately omits the colored fold and uses one opaque page with transparent writing/check holes. Android tints its alpha: background-colored strokes are unsuitable.

For exact monochrome geometry, concatenate the paper path with these holes using black fill and `fillType="evenOdd"`:

```text
M44 45.5H59A1.5 1.5 0 0 1 59 48.5H44A1.5 1.5 0 0 1 44 45.5Z
M44 51.5H54A1.5 1.5 0 0 1 54 54.5H44A1.5 1.5 0 0 1 44 51.5Z
M43.5858 65.4142L49.5858 71.4142A2 2 0 0 0 52.4142 71.4142L65.4142 58.4142A2 2 0 0 0 62.5858 55.5858L51 67.1716L46.4142 62.5858A2 2 0 0 0 43.5858 65.4142Z
```

Legacy PNGs render from the nominal 72-unit viewport, cropping 18 units from each side of the source. Sizes mdpi through xxxhdpi: 48/72/96/144/192px. Standard resource has a rounded-square background with 20% corner radius; round resource uses a circle, both transparent outside. If raster adaptive foreground resources are retained, use full 108-unit transparent foreground at 108/162/216/324/432px. Do not shrink the page again for legacy composition.

Designer recommends this replacement and marks it ready; no unresolved design decision. Frontend should continue implementation, validation and release. Maintain launcher label/package identity.

## States, layout and accessibility

Normal and themed are the relevant states. Phone covers EN/FA, LTR/RTL labels at 48/36/24px; Wide repeats artwork. Circle, rounded-square and squircle are simulations. Page/check give non-color recognition; writing is secondary at small size. Strong paper/teal contrast. OS supplies themed colors; preview tint is illustrative. Artwork is unaffected by in-app Light/Dark preference. Launcher supplies app label/accessibility behavior. Keyboard, touch-target, loading/error/destructive states are not applicable to artwork.

## Verification

| Check | Evidence | Result |
| --- | --- | --- |
| Studio typecheck/build | `npm run typecheck` / `npm run build` in studio | Passed; existing chunk-size warning |
| Running preview | Phone, Themed and Wide visually inspected in running localhost:6006 Storybook | Passed: exact source paths; EN/FA labels, masks and small sizes checked |
| Current behavior | Adaptive XML, old vector and lead's legacy PNG inspection | Generic starter art confirmed |
| Native/compiled output | Frontend/release owners to check resource resolution/rendered assets | Pending; no native validation claimed |

No Figma supplement required.
