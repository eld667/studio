---
description: Design & Development Standards Addon
---
# EldWorkStudio Design & Development Intelligence

> **IMPORTANT:** This document serves as the core "addon" configuring AI behavior for this project. Always read and apply these principles before generating or modifying code for the frontend.

## 1. Mobile-First Foundation
- **Mandatory Starting Point:** Design and build the mobile experience (`base` classes in Tailwind) first.
- Only apply desktop layouts (`md:`, `lg:`) after the mobile hierarchy is perfect and verified.
- Ensure touch targets are at least `44px` on mobile, and font sizes are legible.

## 2. Defensive Engineering (Anticipating Glitches)
- **Think Before Generating:** Before writing code, actively brainstorm "how could this break?"
  - *Example:* If an animation fires on scroll, what happens if the user scrolls very fast? (Use `requestAnimationFrame` or proper throttling).
  - *Example:* If an image loads slowly, does the layout shift? (Always define aspect ratios or fixed dimensions).
  - *Example:* Are there edge cases on very small screens (e.g., iPhone SE) where text will wrap awkwardly and break the grid?
- **React Hydration Mismatches:** NEVER use browser-only APIs (`window`, `document`, `navigator`) or random/date functions during the initial render phase in Next.js Server/Client components without proper `useEffect` or `hasMounted` guards.
  - *Rule:* If a component needs to check window size or use `window.location`, it MUST render a skeleton or fallback null until `useEffect` sets a mounted state.
- Address these potential failures *in the initial implementation*, not as an afterthought.

## 3. Empathy-Driven UX (The "What Will They Think?" Rule)
- Before creating a component, perform a mental walk-through of the user journey:
  - *"The user has just scrolled past the hero section. They are now looking at the CTA. Is the primary action blindingly obvious?"*
  - *"If they are reading this dense text block on a phone, will they lose interest? Should we break it up or use progressive disclosure?"*
  - *"Is the contrast high enough that they can immediately read the button text while walking outside in sunlight?"*
- Code must reflect these UX decisions (e.g., using sticky elements for crucial info that might scroll out of view).

## 4. Self-Correction & Evolution
- The AI is instructed to actively monitor the success or failure of its own implementations.
- If a pattern results in bugs or requires multiple revisions, the AI must proactively suggest updates to this document to prevent repeating the mistake.
- This is a living "memory." If we discover a new best practice for this specific site, it gets added here.
