# EldWorkStudio - AI Context Map

> **AI INSTRUCTION:** Read this file *first* before making changes. After completing any prompt that alters the architecture, routing, or state of the application, you **MUST** update this file to reflect the new truth.

## 🏗 High-Level Architecture
- **Framework:** Next.js (App Router) with React Server Components (`src/app`).
- **Styling:** Vanilla CSS & TailwindCSS (`globals.css`, `tailwind.config.ts`), `shadcn/ui` components (`src/components/ui`).
- **Animations:** Framer Motion (`framer-motion`) heavily used. Keep interfaces dynamic (micro-animations, staggered delays).
- **Backend (Hybrid):** 
  - **Auth/Profiles:** Supabase (`src/utils/supabase/`, VIP clients logic in `src/app/auth/callback`).
  - **Data/Leads:** Firebase/Firestore (`src/firebase/`, `firestore.rules` validates the `leads` collection).

## 🎨 Design System (Premium & Dynamic)
- **Theme:** Dark mode by default (`slate-950` / `#0F172A`).
- **Typography:** `Inter` (sans-serif) for all text.
- **Accent Colors:** Vibrant iridescent gradients. Standard Tailwind gradient: `bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400`.
- **UI Elements:** Use glassmorphism (semi-transparent backgrounds + `backdrop-blur`) and smooth hover effects.

## 📂 Project Structure Map

### `src/app/` (Routing)
- `/` (Home): Main landing page.
- `/about`, `/contact`, `/services`, `/portfolio`, `/legal`: Core website sections.
- `/dashboard`: Protected client portal (Overview, Billing, Vault, Preview).
- `/login`: Public login route.
- `/auth/callback` & `/auth/signout`: Supabase auth handler routes.
- `/cv`: Interactive command bridge/resume.
- **Demos / Landing pages:** Includes many one-off pages (`/agency-accelerator`, `/ai-summit`, `/lumina-desk`, etc.).

### `src/components/` (UI & Layout)
- `layout/`: `header.tsx` (sticky backdrop-blur nav), `footer.tsx`, `hero.tsx`, `CTASection.tsx`, `EldworkStandard.tsx`.
- `dashboard/`: Dashboard tabs (`VaultTab`, `OverviewTab`, `BillingTab`, `DashboardShell`).
- `services/`, `contact/`: Specific section components like `MultiStepForm.tsx`, `PricingTable.tsx`.
- `ui/`: Standard reusable shadcn components (Buttons, Inputs, Cards, etc.).

### `src/utils/` & `src/firebase/`
- `supabase/`: `client.ts`, `server.ts`, `middleware.ts`.
- `firebase/`: Hooks (`use-collection`, `use-doc`), providers, and error handlers.

## 🔄 Rules of Engagement
1. **Never use generic designs**; always prioritize "WOW" aesthetics (glassmorphism, modern typography, animations).
2. **Absolute paths:** For any image imports, use absolute paths (`/images/...`) from the `public` folder.
3. **Database Rules:** Remember leads go to Firestore, auth/sessions go through Supabase.

---
*Last Updated: 2026-02-25*
*Context: Created from repomix-output.xml to minimize context window usage and improve AI accuracy.*
