---
description: Design Instruction: Glassmorphism and Reflect.app Glow System
---
# EldWorkStudio: High-End Glassmorphism & Diffuse Glow System

> **IMPORTANT:** This file instructs the AI on exactly how to achieve the specific, premium "Reflect.app style" visual direction for layout components, backgrounds, and cards across the workspace.

## 1. The "Aura" Background (Reflect Style)
Instead of a flat dark background, our sections utilize deep, colorful, and heavily blurred "glows" or "auras" that emanate from behind main elements to add depth and life.
- **The Technique:** Create absolutely positioned `div` elements behind your main content container.
- **Colors:** Bind the glow color to our three main CSS variable themes (`var(--brand)`).
- **Diffusion:** The glow MUST be heavily blurred. Use Tailwind's `blur-[100px]` or `blur-[120px]` classes on the background element, and typically `opacity-20` to `opacity-40` for subtlety.
- *Example Implementation:*
  ```tsx
  {/* Positioned inside a relative container, behind the content relative layer (z-0 vs z-10) */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/30 blur-[120px] rounded-full pointer-events-none z-0" />
  ```

## 2. Premium Glassmorphism (The "Lens" Effect)
To ensure the colorful background auras don't ruin text readability, any card or content block sitting *on top* of the aura must use glassmorphism.
- **The Technique:** Instead of solid `bg-zinc-900`, use a semi-transparent black or white combined with a strong backdrop blur.
- **Classes to Use:** `bg-black/40` or `bg-white/[0.02]`, paired with `backdrop-blur-md` or `backdrop-blur-xl`.
- **Borders:** Glass looks best with a razor-thin, subtle border to define its shape against the darkness. Use `border border-white/10` or `border border-white/5`.
- *Example Implementation:*
  ```tsx
  <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
     {/* Content goes here */}
  </div>
  ```

## 3. High-Contrast, Crisp Typography
Because the background is now a mix of dark space, bright diffuse glows, and frosted glass, the text hierarchy must cut through perfectly.
- **Headings:** Solid white (`text-white` or `text-zinc-100`). Keep tracking tight (`tracking-tight` or `tracking-tighter`).
- **Body Text:** Use `text-white/60` or `text-zinc-400`. The contrast ratio must remain high enough over the blurred glass.
- **Accents:** Use the `--brand` color or a bright `bg-white/[0.05]` for secondary pills/badges, but never purely solid dark gray where it might blend into the glass.

## 4. The "Technical/Lab" Overlay
A hallmark of this style is a very faint structural grid or dot pattern that gives a precise, engineered feel to the empty dark space.
- Use CSS background patterns (e.g., `bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px)]`) over the base black background, but *under* the glow and glass layers.

## The Mental Check before coding:
1. Is there an aura/glow anchored behind the primary visual focal point?
2. Is the content resting on a glassmorphism layer to protect it from the glow?
3. Is there a faint 1px border around the glass layer to define its edge?
4. Does the aura adapt to whether the theme is Blue (`--brand`), Green, or Red?
