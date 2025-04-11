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
