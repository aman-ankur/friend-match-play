# System Patterns: Card Connection

## 1. Architecture Overview

Card Connection is architected as a **Single Page Application (SPA)** built using **React** and **TypeScript**. It leverages a component-based architecture, likely facilitated by **Vite** for development and bundling.

```mermaid
graph TD
    User[User Browser] --> SPA[React SPA]
    SPA -->|Renders| UI[UI Components]
    UI -->|Uses| Hooks[Custom Hooks (e.g., useGameLogic)]
    UI -->|Uses| Utils[Utility Functions (e.g., gameQuestions)]
    UI -->|Interacts With| State[Component/Global State]

    subgraph Frontend Application
        direction LR
        SPA
        UI
        Hooks
        Utils
        State
    end

    %% Potentially a backend for real-time communication, not yet confirmed
    %% SPA -->|WebSocket?| Backend[Signaling/Game State Server]
    %% Backend --> SPA
```

## 2. Key Technical Decisions (Inferred)

- **Frontend Framework:** React with TypeScript for type safety and modern JavaScript features.
- **Build Tool:** Vite for fast development server and optimized builds.
- **Styling:** Tailwind CSS (indicated by `tailwind.config.ts`, `postcss.config.js`, `src/index.css`) for utility-first CSS. Likely combined with a UI component library (`src/components/ui` suggests Shadcn/ui or similar).
- **State Management:** Currently unclear. Could be using React Context, Zustand, Redux Toolkit, or component-local state. The `useGameLogic` hook suggests encapsulating game state logic.
- **Routing:** Likely using a client-side router (e.g., React Router) to handle navigation between views like room creation, game lobby, and game modes, although specific routing files aren't immediately obvious in the top level. `src/pages/Index.tsx` and `src/pages/NotFound.tsx` suggest page-based routing.
- **Real-time Communication:** For a two-player remote game, a real-time communication mechanism (e.g., WebSockets via libraries like Socket.IO or a BaaS like Firebase Realtime Database/Firestore) will be necessary for sharing game state, answers, and predictions. *This aspect is not yet evident in the file structure and needs implementation.*

## 3. Design Patterns

- **Component-Based Architecture:** UI is broken down into reusable components (e.g., `GameCard`, `GameRoom`, UI elements).
- **Container/Presentational Components (Likely):** Pages (`src/pages`) likely act as containers fetching data and managing state, while components (`src/components`) handle presentation.
- **Custom Hooks:** Encapsulating reusable logic and stateful behavior (e.g., `useGameLogic`, `use-mobile`).
- **Utility Functions:** Separating pure functions for tasks like fetching questions (`src/utils/gameQuestions.ts`) or general utilities (`src/lib/utils.ts`).
- **Type Safety:** Using TypeScript (`src/types/game.ts`) to define data structures and ensure consistency.

## 4. Component Relationships (High-Level)

- `App.tsx`: Likely the root component, setting up routing and global layout.
- `main.tsx`: Entry point, rendering the `App` component into the DOM.
- `src/pages/Index.tsx`: Main landing page or entry point for game creation/joining.
- `src/components/RoomCreation.tsx`: Handles the UI for creating a new game room.
- `src/components/GameRoom.tsx`: Represents the lobby or active game area once players are connected.
- `src/components/[GameMode].tsx` (e.g., `GuessWhoIAm.tsx`): Specific components rendering the UI and logic for each game mode.
- `src/components/ResultComparison.tsx`: Displays the comparison of answers/predictions.
- `src/components/ui/`: Reusable low-level UI elements (buttons, cards, etc.).
- `src/hooks/useGameLogic.ts`: Centralizes core game state management and actions.

*(Note: This is based on initial analysis. Deeper code review is needed to confirm state management, routing details, and the absence/presence of backend communication.)*

# System Design Patterns & Architecture

This document outlines key architectural patterns and design choices used in the FriendMatch Play application.

## Frontend Architecture

*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with Shadcn UI components.
*   **State Management:** Primarily React component state (`useState`) and prop drilling. Global state management (like Zustand or Redux) is not yet implemented but will be necessary for real-time features.
*   **Component Structure:** Organized by feature/view (e.g., `GameRoom`, `GuessWhoIAm`) within the `src/components` directory.
*   **Routing:** Handled by Next.js file-based routing (though currently minimal).

## Key Design Patterns

1.  **Custom Hooks (`useGameLogic`):**
    *   **Purpose:** Encapsulates reusable game state logic (handling answers, predictions, results, phase transitions) shared across different game mode components (`GuessWhoIAm`, `HotTakes`, `ThisOrThat`).
    *   **Benefits:** Promotes code reuse, separates concerns (logic vs. presentation), makes game components simpler.
    *   **Considerations:** Assumes a two-player game structure currently. Might need adaptation for more players or complex state interactions.

2.  **Component Composition:**
    *   Standard React pattern. Components like `GameCard`, `ResultComparison`, `NSFWSlider`, `TimerWidget` are used within larger view components (`GameRoom`, game modes).
    *   **Benefits:** Reusability, maintainability.

3.  **Conditional Rendering:**
    *   Used extensively in `GameRoom` to display different UI sections based on the game `status` (waiting, selecting, playing, completed).
    *   Also used within game components to show answer/prediction phases and results.
    *   **Benefits:** Manages complex UI flows within a single component structure.

4.  **Centralized Game Settings (`GameRoom`):**
    *   The `GameRoom` component holds the state for core game settings like the selected game mode, game style, NSFW level, and timer duration.
    *   These settings are configured before the main gameplay loop begins and passed down as props.
    *   **Benefits:** Single source of truth for game configuration during a session.

5.  **Asynchronous State Updates & Effects (`useEffect`):**
    *   **Pattern:** When an action depends on the result of an asynchronous state update (e.g., calculating results *after* the final prediction is saved), use `useEffect` hooked to the state variable being updated.
    *   **Example:** In `useGameLogic`, the results calculation is triggered by a `useEffect` watching the `predictions` array, ensuring it runs only after the state reflects all submitted predictions.
    *   **Benefits:** Avoids race conditions and ensures calculations use the latest state.
    *   **Caution:** Be mindful of dependency arrays to prevent infinite loops or unnecessary executions.

## Data Flow

*   **Game Setup:** User selects game mode, style, timer duration in `GameRoom`. Questions are loaded via `getQuestionsByMode`.
*   **Gameplay:** State managed largely within `useGameLogic` based on props from `GameRoom` (players, questions, round, settings). User interactions (button clicks) call handlers in the hook (`handleAnswerSelect`, `handlePredictionSelect`).
*   **Results:** `useGameLogic` calculates `RoundResult`, sets it in state. `ResultComparison` component displays this.
*   **Progression:** `handleContinue` in `useGameLogic` calls `onNextRound` (passed from `GameRoom`) to update the parent `currentRound` state.
*   **Navigation:** `handleGoHome` in `GameRoom` resets state variables to return to the selection view.

## Future Considerations

*   **Real-time State Sync:** Transitioning from client-side state in `GameRoom` to a server-authoritative model using WebSockets is the highest priority for multiplayer.
*   **State Management Library:** Introduce Zustand or similar for managing global UI state and potentially caching server data.
*   **API Layer:** Define a clear API for communication between frontend and a potential backend.
