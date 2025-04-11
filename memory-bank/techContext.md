# Tech Context: Card Connection

## 1. Core Technologies

- **Language:** TypeScript (`tsconfig.json`, `.ts`, `.tsx` files)
- **Framework:** React (`package.json`, `.tsx` files)
- **Build Tool / Dev Server:** Vite (`vite.config.ts`)
- **Package Manager:** Likely npm (due to `package-lock.json`) or Bun (due to `bun.lockb`). Need to confirm primary usage, but both lockfiles exist. `package.json` will list scripts runnable by either.
- **Styling:**
    - Tailwind CSS (`tailwind.config.ts`, `postcss.config.js`, `src/index.css`)
    - CSS Modules or standard CSS (`src/App.css`) might be used for component-specific styles not covered by Tailwind.
- **UI Component Library:** Shadcn/ui (Strongly inferred from `src/components/ui/` structure, `components.json`, and common Shadcn component names like `button.tsx`, `card.tsx`, etc.)
- **Linting/Formatting:** ESLint (`eslint.config.js`), Prettier (often used with Tailwind/React, though no explicit config file listed, might be in `package.json` or integrated via ESLint).

## 2. Development Environment

- **Setup:** Standard Node.js environment required. Clone repository, install dependencies using `npm install` or `bun install`.
- **Running Locally:** Use `npm run dev` or `bun run dev` (defined in `package.json` scripts, powered by Vite) to start the development server.
- **Building for Production:** Use `npm run build` or `bun run build` (defined in `package.json` scripts, powered by Vite and `tsc`).

## 3. Key Dependencies (Inferred/Confirmed)

- `react`, `react-dom`: Core React libraries.
- `typescript`: Language support.
- `vite`: Build tool and development server.
- `tailwindcss`: Utility-first CSS framework.
- `@radix-ui/*`: Underlying primitives for Shadcn/ui components.
- `clsx`, `tailwind-merge`: Utilities for conditional and merged Tailwind classes (common with Shadcn/ui, likely via `src/lib/utils.ts`).
- `lucide-react`: Icon library often used with Shadcn/ui.
- *Potential Routing Library:* `react-router-dom` (Needs confirmation by inspecting `package.json` or code usage).
- *Potential State Management Library:* Zustand, Redux Toolkit, etc. (Needs confirmation).
- *Potential Real-time Communication Library:* `socket.io-client`, Firebase SDK, etc. (Needs implementation and confirmation).

## 4. Technical Constraints & Considerations

- **Browser Compatibility:** Primarily targets modern web browsers supporting ES Modules and modern CSS. Specific targets might be defined in Vite/Babel/PostCSS configs if needed.
- **Responsiveness:** Must work effectively on both desktop and mobile viewports (as per PRD). Tailwind and responsive design practices are crucial.
- **Real-time Backend:** **CRITICAL MISSING PIECE.** A backend service with real-time capabilities (e.g., WebSockets) is required for multi-player functionality (sharing game state, answers, presence). This needs to be designed and implemented. Options include Node.js + Socket.IO, Firebase, Supabase Realtime, or other BaaS/WebSocket solutions.
- **State Synchronization:** Complex state (game progress, player answers, scores, timers) needs reliable synchronization between the two players via the backend.
- **Unique Room Links:** Requires a mechanism (likely backend) to generate unique room IDs and associate them with game sessions.

## 5. Code Structure Conventions

- **Components:** Located in `src/components/`, with reusable UI elements in `src/components/ui/`. Game-specific components are at the top level of `src/components/`.
- **Pages/Views:** Located in `src/pages/`.
- **Hooks:** Custom React hooks in `src/hooks/`.
- **Utilities:** General helper functions in `src/lib/` and potentially `src/utils/`.
- **Types:** TypeScript type definitions in `src/types/`.
- **Static Assets:** Public assets in `public/`.
- **Styling:** Global styles in `src/index.css`, potentially component-specific styles alongside components or in `src/`.
