# Friend Match Play

A real-time multiplayer web game where friends test how well they know each other by answering questions and predicting each other's responses.

## Features

*   **Real-time Multiplayer:** Engage in live gameplay sessions with friends using WebSocket technology.
*   **Multiple Game Modes:** Choose from "This or That," "Guess Who I Am," and "Hot Takes" games.
*   **Game Styles:** Play in reveal-only mode or prediction mode where you guess your friends' answers.
*   **Engaging Question Sets:** Answer a variety of questions designed to spark conversation and reveal interesting insights.
*   **Customizable Content:** Adjust intensity level with fun, group-based descriptive categories.
*   **Special Mode:** Access enhanced questions with PIN protection for premium content.
*   **Dynamic Round Flow:** Progress through multiple rounds with distinct phases for answering, predicting, and viewing results.
*   **Rules Overlay:** View comprehensive game rules and settings before starting gameplay.
*   **Room Management:** Create and join game rooms with unique codes for private sessions.
*   **Timer Options:** Add time pressure with configurable round timers.
*   **Play Again:** Reset rooms after game completion to play another round with the same players.
*   **Enhanced Result Display:** View answers and predictions with clear correctness indicators.

## Architecture

Friend Match Play uses a client-server architecture:

*   **Server (Node.js):** Manages game state, rooms, and real-time events.
*   **Client (React):** Renders UI and communicates with server via WebSockets.
*   **State Management:** Server is the authoritative source of truth for game state.
*   **Event-Driven:** Communication flows through bidirectional Socket.IO events.

## Technology Stack

This project is built with modern web technologies:

*   **Frontend Framework:** React
*   **Backend:** Node.js with Express
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn-ui
*   **Real-time Communication:** Socket.IO

## Getting Started / Local Development

To run this project locally, follow these steps:

**Prerequisites:**

*   Node.js (v18 or later recommended)
*   npm or yarn

**Setup:**

```sh
# 1. Clone the repository
git clone <YOUR_GIT_REPOSITORY_URL>
cd friend-match-play

# 2. Install dependencies for both client and server
npm install
cd server
npm install
cd ..

# 3. Start the development server
# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend)
npm run dev
```

The frontend application will typically be available at `http://localhost:5173` while the backend server runs on `http://localhost:3001`.

## Code Structure

*   `/src` - Frontend React application
    *   `/components` - UI components
    *   `/hooks` - Custom React hooks
    *   `/context` - React context providers
    *   `/utils` - Utility functions and game questions
    *   `/types` - TypeScript type definitions
*   `/server` - Backend Node.js server
    *   `/src` - Server source code
        *   `server.ts` - Main server file with Socket.IO handlers
        *   `gameUtils.ts` - Game utilities and questions

## Key Implementation Details

*   **Room Management:** Each game session exists in a "Room" with unique ID
*   **Game State Flow:** Rooms transition through states (waiting → selecting → playing → results → completed)
*   **Event System:** Client actions trigger server events, which broadcast updates to all players
*   **Special Mode:** PIN-protected enhanced content with special question queue
*   **Reset Functionality:** Rooms can be reset after game completion for continuous play
*   **Intensity Levels:** Fun, group-based naming system for customizable content engagement
*   **Rules Display:** Comprehensive game information displayed to Player 2 before gameplay begins
*   **Prediction Mechanics:** Enhanced prediction flow with clear scoring and result indicators

## Recent Updates

*   **Enhanced Question Sets:** Added new questions across all game modes for improved engagement
*   **Rules Overlay System:** Added comprehensive game rules display for better player experience
*   **Intensity Level Improvements:** Replaced numeric levels with fun, descriptive categories
*   **GameRoom Enhancements:** Improved user interface and gameplay experience
*   **Prediction Mode Refinements:** Better handling of prediction phase for smoother gameplay

## Contributing

Contributions are welcome! Please refer to the contributing guidelines (if available) or open an issue to discuss potential changes.
