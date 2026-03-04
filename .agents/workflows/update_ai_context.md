---
description: How to maintain the project context wiki and ensure AI instructions are always up-to-date.
---

# Update AI Context Workflow

This workflow ensures that Antigravity (and any AI) retains a perfect map of the `studio` project to save tokens, prevent context-window bloat, and maintain accuracy.

## Instructions for the AI

1. **Before Starting Any Work:**
   - You MUST read the `AI_CONTEXT.md` file located at the root of the project to understand the system architecture, file structure, styling guidelines, and routing.
   - Do NOT run full repository scans or read `repomix-output.xml` directly unless you need to reconstruct a lost `AI_CONTEXT.md`.

2. **During the Work:**
   - Keep track of any major structural changes you make, such as:
     - Creating, renaming, or deleting new pages inside `src/app/`.
     - Adding new core components in `src/components/`.
     - Altering database rules, auth flows, or integrations in `src/firebase/` or `src/utils/supabase/`.
     - Changing the design system configuration (like `tailwind.config.ts`).

3. **At the End of the Prompt/Task:**
   - Once you have completed the user's request and verified that everything works, you MUST update `AI_CONTEXT.md`.
   - Add new routes to the "Project Structure Map" section.
   - Update any architectural notes (e.g., if a new service or API was added).
   - Ensure the updated `AI_CONTEXT.md` remains concise. Do not paste full code blocks; just note the existence, purpose, and location of the new features.
