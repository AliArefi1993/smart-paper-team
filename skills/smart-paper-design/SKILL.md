---
name: smart-paper-design
description: Create or review a Smart Paper screen design and handoff for Android-first English/Persian UI. Use for user-facing flows or substantial visual changes, not text-only or backend changes.
---

# Smart Paper design workflow

Read the product brief in `design/` or the relevant task, `design/foundations.md`, and the owning frontend screen. Design for the user's task and actual content before styling. Keep proposed behavior separate from shipped behavior.

Use Figma as the editable canvas when its connection is available. Create frames for a phone size, relevant wide layout, English LTR and Persian RTL, and the states that change the flow. Link the file and important frames from a repo design record. When Figma is unavailable, create a reviewable repo-native artifact in `design/` (for example SVG or a concise layout specification) and mark the Figma artifact pending; do not invent a link.

Save one handoff under `design/` using `design/TEMPLATE.md`. Include flow and hierarchy, content examples, component and token reuse, interaction and feedback states, keyboard and screen-reader behavior, responsive behavior, bilingual/RTL behavior, and any deliberate divergence from current UI. Identify implementation constraints and unresolved decisions. Avoid decorative changes that reduce readability or make the dense planner harder to scan.

Before calling a design ready, inspect it at phone width, with realistic long English and Persian text, and check empty, loading, error, success, and destructive states when applicable. Check contrast, visible focus, labels, touch targets, and non-color state cues. Compare the implemented screen with the handoff in a running preview or screenshots; record differences and actual verification in the design record. Figma-generated code is design context; frontend code and tests remain authoritative.
