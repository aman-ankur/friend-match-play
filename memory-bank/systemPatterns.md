# System Patterns: Card Connection

## 1. Architecture Overview

Card Connection is architected as a **Client-Server application**. 

- The **Frontend** is a Single Page Application (SPA) built using React and TypeScript, served by Vite.
- The **Backend** is a Node.js server using Express and TypeScript, responsible for managing game state and facilitating real-time communication via Socket.IO.

```mermaid
graph TD
    subgraph Frontend Application (Browser 1)
        direction LR
        User1[User 1] --> C1_SPA[React SPA]
        C1_SPA --> C1_UI[UI Components]
        C1_UI --> C1_SocketContext[Socket Context]
        C1_SocketContext -->|WebSocket| Backend
    end

    subgraph Frontend Application (Browser 2)
        direction LR
        User2[User 2] --> C2_SPA[React SPA]
        C2_SPA --> C2_UI[UI Components]
        C2_UI --> C2_SocketContext[Socket Context]
        C2_SocketContext -->|WebSocket| Backend
    end
    
    subgraph Backend Server (Node.js)
        direction TB
        Backend[Express + Socket.IO Server]
        Backend -->|Manages| GameState[In-Memory Game State (Rooms)]
        GameState -->|Updates/Reads| GameUtils[Game Utilities]
    end

    Backend -->|Emits Events| C1_SocketContext
    Backend -->|Emits Events| C2_SocketContext

```

## 2. Key Technical Decisions

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn/ui.
- **Backend:** Node.js, Express, TypeScript, Socket.IO.
- **Communication:** WebSockets managed by Socket.IO for real-time client-server interaction.
- **State Management:** 
    - **Frontend:** React Context (`SocketContext`) for socket connection, component-local state (`useState`) for UI, and props for passing game state received from the server. `useGameLogic` hook encapsulates client-side *reaction* to server events during gameplay.
    - **Backend:** Server holds the **authoritative game state** (rooms, players, scores, current round, answers) in-memory (`server.ts`). This is the single source of truth.
- **Routing (Client):** Likely React Router for frontend page navigation.
- **Data Persistence:** **None currently.** Game state is lost on server restart. Requires a database (e.g., Redis, Postgres) for production.

## 3. Design Patterns

- **Client-Server Architecture:** Clear separation between frontend presentation/interaction and backend logic/state management.
- **Event-Driven (via WebSockets):** Client actions (create/join room, submit answer, ready) trigger events sent to the server. The server processes these, updates state, and emits events back to relevant clients (`roomCreated`, `roomReady`, `gameStarted`, `roundResults`, `newRound`, `gameOver`, `playerLeft`, `error`) to synchronize UI.
- **Component-Based Architecture (Frontend):** Standard React practice.
- **Custom Hooks (Frontend):** `useSocket` for context access, `useGameLogic` for managing the client-side response to server game events.
- **Context API (Frontend):** `SocketContext` provides global access to the WebSocket connection.
- **In-Memory Database (Backend):** Simple object (`rooms`) used for storing server state during development. **Needs replacement for production.**
- **Single Source of Truth (Backend):** The server maintains the definitive game state.
- **State Synchronization Issues (Client):** Recent timer fixes highlighted complexities in managing client-side state derived from server events, especially involving `useEffect` dependencies and state updates (`isTimerRunning`, `timeLeft`). Required careful management of dependencies and state reset logic.

## 4. Component Relationships & Data Flow (Simplified)

1.  **Connection:** `SocketProvider` establishes connection. `useSocket` provides access.
2.  **Create/Join (`RoomCreation.tsx`):** 
    - User enters info -> emits `createRoom` or `joinRoom` event.
    - Listens for `roomCreated` or `joinSuccess` -> calls `onRoomCreated` prop (in `Index.tsx`).
3.  **Game Setup (`GameRoom.tsx`):**
    - Renders based on props from `Index.tsx` (including `initialPlayersData` for joiners).
    - Creator: Renders game selection UI.
    - Joiner: Initially renders game selection UI (state set by `initialPlayersData`).
    - Listens for `roomReady` (for creator waiting).
    - Creator selects game mode -> UI changes locally (`style-selecting` status).
    - Creator configures style/timer/NSFW -> emits `startGame`.
    - Listens for `gameStarted` -> updates local state (questions, round, etc.) from server data -> Renders specific game component (e.g., `ThisOrThat.tsx`).
4.  **Gameplay (`ThisOrThat.tsx` + `useGameLogic.ts`):
    - Receives game state props (`currentRound`, `questions`) from `GameRoom`.
    - Player selects answer -> `handleAnswerSelect` emits `submitAnswer` -> Sets local `hasSubmittedAnswer` state.
    - Listens for `roundResults` -> updates local state to show results (`ResultComparison.tsx`).
    - Player clicks continue -> `handleContinue` emits `playerReady` -> sets local `hasClickedContinue`.
    - Listens for `newRound` -> `GameRoom` updates `currentRound` prop -> `useGameLogic` resets local state via `useEffect`.
    - Listens for `gameOver` -> Calls `onComplete` prop.
5.  **Disconnection:** `disconnect` event on server removes player, emits `playerLeft`, clients show toast/update UI.

## 5. Future Considerations / Refinements

- **Database Integration:** Replace in-memory `rooms` storage.
- **Error Handling:** More specific error events and client-side handling.
- **Prediction Mode:** Implement server-side logic and client-side UI/state for predictions.
- **Scalability:** Consider stateless server design if scaling becomes necessary (storing session state externally, e.g., Redis).
- **Security:** Input validation, rate limiting, authentication (if users are added).
- **Testing:** Unit/Integration tests for backend logic, E2E tests for frontend flows.
