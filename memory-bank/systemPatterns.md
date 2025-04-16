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
- **State Synchronization Issues (Client):** Recent timer fixes highlighted complexities in managing client-side state derived from server events, especially involving `useEffect` dependencies and state updates (`isTimerRunning`, `timeLeft`). Required careful management of dependencies and state reset logic. Debugging the 'Play Again' flow further revealed that client-side UI state (like button readiness flags - e.g., `hasClickedContinueThisRound`) must also be explicitly reset in response to server-driven state changes (like `roomReset` or `newRound`) to prevent desynchronization, even when core game state seems correct.
- **State Machine Pattern:** Room status transitions follow a finite state machine model: waiting → selecting → playing → results → (back to playing or to completed) → selecting (after reset).
- **Feature Flagging:** The exclusive mode feature is implemented as a flag in the Room interface, allowing dynamic enabling/disabling of the feature.
- **PIN Protection:** Access to sensitive content (exclusive mode) is protected by a PIN code, implementing a simple authentication mechanism.
- **Temporary Disconnect Handling (Planned):** A grace period approach using `setTimeout` within the server's disconnect handler will allow players to reconnect to in-progress games without data loss.
- **Content Classification System:** A group-based naming system for content appropriateness levels replaces the numeric "spiciness" scale, improving user understanding and experience.
- **Rules Overlay Pattern:** A dedicated UI state and flow for displaying game information before gameplay begins, especially for the second player.
- **Form Validation Pattern:** Comprehensive client and server-side validation for content levels and other game settings.
- **Enhanced Event Propagation:** Game sessions pass through more discrete event phases (e.g., rules display, prediction phase) with dedicated events and handlers.

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
4.  **Rules Display (for Joiner):**
    - After `gameStarted` event, joiner enters 'rules-display' state
    - `RulesOverlay` component shows comprehensive game information
    - Player clicks "Continue" -> emits `playerReady` -> server transitions to gameplay
5.  **Gameplay (`ThisOrThat.tsx` + `useGameLogic.ts`):
    - Receives game state props (`currentRound`, `questions`) from `GameRoom`.
    - Player selects answer -> `handleAnswerSelect` emits `submitAnswer` -> Sets local `hasSubmittedAnswer` state.
    - Listens for `roundResults` -> updates local state to show results (`ResultComparison.tsx`).
    - Player clicks continue -> `handleContinue` emits `playerReady` -> sets local `hasClickedContinue`.
    - Listens for `newRound` -> `GameRoom` updates `currentRound` prop -> `useGameLogic` resets local state via `useEffect`.
    - Listens for `gameOver` -> Calls `onComplete` prop.
6.  **Exclusive Mode Flow:**
    - Creator clicks exclusive mode button -> Opens PIN modal (`PinEntryModal.tsx`)
    - Creator enters PIN -> Emits `attemptExclusiveMode` with PIN
    - Server validates PIN -> Emits `exclusiveModeActivated` (success) or `exclusiveModeFailed` (wrong PIN)
    - On success, server loads exclusive questions (filtered by `nsfwRating: 11`)
    - During gameplay, questions are drawn from exclusive queue instead of regular questions
    - Game continues indefinitely until queue is empty or creator ends mode
    - Creator can end mode at any time by clicking "End Round" button -> Emits `endExclusiveMode`
7.  **Room Reset Flow:**
    - After game completion, creator clicks "Play Again" -> Emits `resetRoom`
    - Server resets room state (status, questions, scores, etc.) -> Emits `roomReset`
    - All clients update their state to show game selection UI
8.  **Temporary Disconnect Handling (Planned):**
    - Player disconnects (socket `disconnect` event)
    - Server identifies disconnect during active game, starts grace period timer
    - Server emits `playerDisconnected` to remaining players
    - If player reconnects within grace period, they emit `attemptReconnection` with original player ID
    - Server matches the reconnection request, clears the timeout, updates socket ID
    - Server emits `playerReconnected` and game continues
    - If grace period expires, server follows original disconnect logic (remove player, end game)
9.  **Disconnection:** `disconnect` event on server removes player, emits `playerLeft`, clients show toast/update UI.

## 5. Room Status State Machine

The game implements a state machine for room status management:

```
                             ┌───────────┐
                             │           │
                             ▼           │
  ┌────────┐         ┌───────────┐       │
  │waiting │ ──────► │ selecting │ ──────┘
  └────────┘         └───────────┘
      ▲                   │
      │                   ▼
  ┌─────────┐       ┌─────────┐
  │completed│ ◄───── │ playing │
  └─────────┘       └─────────┘
      ▲                │   ▲
      │                ▼   │
      └────────── ┌─────────┐
                  │ results │
                  └─────────┘
```

Each state has specific UI components and allowed actions:
- **waiting**: Shows room code for sharing, waiting for player 2 to join
- **selecting**: Shows game mode selection options (This or That, etc.)
- **style-selecting**: Shows game style, timer, NSFW settings 
- **rules-display**: (For Player 2) Shows game rules and settings before gameplay
- **playing**: Shows active game UI with current question
- **results**: Shows round results with player answers/predictions
- **completed**: Shows final scores and "Play Again" button

## 6. Future Considerations / Refinements

- **Database Integration:** Replace in-memory `rooms` storage.
- **Error Handling:** More specific error events and client-side handling.
- **Round Summary Feature:** Implement dedicated screen for round summaries with animation and sharing.
- **Temporary Disconnect Handling:** Implement the grace period approach for reconnections.
- **Scalability:** Consider stateless server design if scaling becomes necessary (storing session state externally, e.g., Redis).
- **Security:** Input validation, rate limiting, authentication (if users are added).
- **Testing:** Unit/Integration tests for backend logic, E2E tests for frontend flows.
- **Enhanced PIN Protection:** Consider stronger authentication or encryption for protecting sensitive content.
- **Question Management:** Implementation of an admin interface for adding or removing questions.
- **Session Resumption:** Allow players to reconnect to an in-progress game if disconnected.
- **Better Error Recovery:** Implement additional mechanisms for recovering from server-client state mismatches.
