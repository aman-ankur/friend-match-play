# Tech Context: Card Connection

## 1. Core Technologies

- **Language:** TypeScript (`tsconfig.json`, `.ts`, `.tsx` files)
- **Framework:** 
    - Frontend: React (`friend-match-play/package.json`, `.tsx` files)
    - Backend: Node.js with Express (`server/package.json`, `server/src/server.ts`)
- **Build Tool / Dev Server:** 
    - Frontend: Vite (`friend-match-play/vite.config.ts`)
    - Backend: `ts-node-dev` for development (`server/package.json`)
- **Real-time Communication:** Socket.IO (`server/src/server.ts`, `friend-match-play/src/context/SocketContext.tsx`)
- **Package Manager:** npm (`package-lock.json` in both `/` and `server/`)
- **Styling:**
    - Tailwind CSS (`friend-match-play/tailwind.config.ts`, `friend-match-play/postcss.config.js`, `friend-match-play/src/index.css`)
    - CSS Modules or standard CSS (`friend-match-play/src/App.css`) might be used.
- **UI Component Library:** Shadcn/ui (`friend-match-play/src/components/ui/`, `friend-match-play/components.json`)
- **Linting/Formatting:** ESLint (`friend-match-play/eslint.config.js`), Prettier likely used.

## 2. Development Environment

- **Setup:** Standard Node.js environment. Clone repo, run `npm install` in root (`friend-match-play/`) and in `server/`.
- **Running Locally:** 
    - Start Backend: `cd server && npm run dev` (runs on port 3001 by default)
    - Start Frontend: `npm run dev` in root (`friend-match-play/`) (runs on port 5173 by default)
- **Building for Production:** 
    - Frontend: `npm run build` in root (`friend-match-play/`)
    - Backend: `npm run build` (requires adding a build script to `server/package.json` using `tsc`) and then run with `node dist/server.js`.

## 3. Key Dependencies (Confirmed)

- **Frontend:**
    - `react`, `react-dom`, `typescript`, `vite`
    - `tailwindcss`, `@radix-ui/*`, `clsx`, `tailwind-merge`
    - `lucide-react` (icons)
    - `socket.io-client` (WebSocket communication)
    - `react-router-dom` (Likely, needs final check in App.tsx/main.tsx)
- **Backend:**
    - `express`, `socket.io`, `cors`, `typescript`
    - `@types/*` for corresponding libraries
    - `ts-node-dev` (dev dependency)

## 4. Technical Constraints & Considerations

- **Browser Compatibility:** Modern browsers.
- **Responsiveness:** Required.
- **Real-time Backend:** Implemented using Node.js + Socket.IO. State is currently **in-memory** on the server (`server/src/server.ts`), meaning rooms and game state are lost on server restart. **For production persistence, a database (e.g., Redis for session data, Postgres/Mongo for user data) is recommended.**
- **State Synchronization:** Managed via Socket.IO events between clients and the server. The server is the source of truth for game state.
- **Unique Room Links:** Room IDs are generated on the server. Frontend needs to handle sharing/using these (e.g., copy-to-clipboard button, URL parameters).

## 5. Code Structure Conventions

- **Frontend (`friend-match-play/src/`):**
    - `components/`: React components (`ui/` for Shadcn).
    - `pages/`: Top-level view components.
    - `hooks/`: Custom React hooks (e.g., `useGameLogic`).
    - `context/`: React Context providers (e.g., `SocketContext`).
    - `lib/`, `utils/`: Helper functions.
    - `types/`: Shared TypeScript types.
    - `main.tsx`: Application entry point.
    - `App.tsx`: Root component, likely includes routing.
- **Backend (`server/src/`):**
    - `server.ts`: Main server setup, Socket.IO logic.
    - `gameUtils.ts`: Game-specific logic (e.g., question data).
    - (Potentially add more structure later, e.g., routes, controllers, services).
