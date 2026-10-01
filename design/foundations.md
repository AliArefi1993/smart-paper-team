# Interface foundations

Updated: 2026-10-01. This is a map of the current interface, not a claim that every screen has been visually audited.

Editable reference: [Figma foundations board](https://www.figma.com/design/QM23WOITohVqGMZCdSRc3n?node-id=1-2). Its colors were checked against `smart-paper-front/src/app/globals.css` and its rendered screenshot was inspected on 2026-10-01. It is a starting board, not a finished screen design.

## Product context

Smart Paper is an Android-first personal planner with local storage. The planner is dense; quick scanning and safe data entry matter more than ornament. English and Persian are first-class UI languages. The planner has an optional dark mode; other routes use the light paper palette. See `PRODUCT.md` and decisions D-007/D-008.

## Current implementation anchors

- Global light colors in `smart-paper-front/src/app/globals.css`: background `#f7f8f5`, ink `#172b29`, surface `#ffffff`, muted surface `#f1f5f2`, border `#d9e4de`, muted ink `#536660`, primary `#0f766e`, primary soft `#e7f4ef`.
- Focus-visible outlines are defined globally. RTL uses Vazirmatn; LTR uses Geist. The language state updates document language, and major screens set `dir` according to language.
- Existing screens often encode colors and shapes directly in Tailwind classes. Before proposing new tokens, inspect actual components and avoid assuming there is a shared component library.
- Primary roles: deep teal for action, amber for attention, rose for error/destructive, green for success. Pair color with words or icons and programmatic state.

## Design checks for new work

- Start with content and hierarchy: one clear primary action per flow, direct labels, readable density, and clear saved/error feedback.
- Cover 360–390px phone width, safe areas, and a wider layout. Verify touch targets, focus visibility, keyboard reachability, long translated labels, and text enlargement.
- Show real English and Persian examples. Mirror directional navigation and alignment intentionally; keep numbers, dates, and user text legible in mixed-direction content.
- Include relevant empty, loading, error, success, offline, and destructive states. Avoid promising sync or cloud behavior that the local-data app does not have.
- Inspect contrast in each actual state and dark mode where applicable. The existing palette is a starting point, not a substitute for checking the rendered screen.
