# Product Context: Cards Against Maturity

## Core Concept

Cards Against Maturity is a web-based party game where players connect and test how well they know each other's personalities, opinions, and preferences through various question-based game modes. Supports Solo and 2-Player modes.

## Target Audience

*   Individuals looking for self-reflection or casual solo play.
*   Friends, couples, or pairs seeking a fun, interactive way to connect.
*   Users seeking simple, engaging online games.

## Key Features

1.  **Game Modes:**
    *   **Solo Play:** Play against yourself or answer prompts for reflection.
    *   **2-Player Mode:** Real-time gameplay with a friend.
2.  **Multiple Question Sets:**
    *   **Guess Who I Am:** Personal questions & prediction.
    *   **Hot Takes:** Opinions & prediction.
    *   **This or That:** Dilemmas & prediction.
3.  **Gameplay Styles (2-Player):**
    *   **Prediction Mode:** (Future) Earn points by predicting answers.
    *   **Reveal-only Mode:** Answer and compare for discussion.
4.  **Intensity Level Control:** Filter question pool by desired engagement level.
5.  **Answer Timer (Optional):** Add time pressure to rounds.
6.  **Real-time Communication (2-Player):** Uses a Node.js backend with Socket.IO for instant updates on player joins, game start, answers, results, and disconnects.
7.  **Room Creation/Joining (2-Player):** Simple code-based room system managed by the server.
8.  **Synchronized Gameplay:** Server ensures both players see the same game state (question, results, next round) simultaneously.
9.  **Clear Results Display:** Shows answers side-by-side after each round.
10. **Easy Navigation:** Exit/Home options.

## User Flow (2-Player Mode)

1.  **Player 1 (Creator):**
    *   Visits the site.
    *   Enters nickname, selects "2 Player".
    *   Clicks "Create Room".
    *   Frontend sends `createRoom` event to backend.
    *   Backend creates room, stores creator, joins creator's socket to room.
    *   Backend sends `roomCreated` event back to Player 1 with `roomId`.
    *   Player 1 enters `GameRoom` component, sees "Waiting for Friend..." screen with `roomId`.
2.  **Player 2 (Joiner):**
    *   Gets `roomId` from Player 1.
    *   Visits the site.
    *   Enters nickname.
    *   Clicks "Join Room", enters `roomId`.
    *   Clicks "Join" in dialog.
    *   Frontend sends `joinRoom` event to backend.
    *   Backend validates, adds Player 2 to room, joins socket to room.
    *   Backend sends `joinSuccess` event to Player 2 (with player list).
    *   Backend sends `roomReady` event to *both* players (with player list).
3.  **Game Setup:**
    *   Player 2 receives `joinSuccess`, enters `GameRoom` configured with initial player list (status `'selecting'`).
    *   Player 1 receives `roomReady`, updates players list, sets status to `'selecting'`. 
    *   Both players see the "Choose a Game Mode" screen.
    *   Player 1 selects a game mode (e.g., "This or That"). UI updates locally to `'style-selecting'`. 
    *   Player 1 sees customization options (Style, Intensity, Timer). Player 2 sees "Waiting for Host...".
    *   Player 1 configures options, clicks "Start Game".
    *   Frontend sends `startGame` event to backend with settings.
    *   Backend validates, generates questions, updates room state (`status='playing'`, `currentRound=1`, etc.).
    *   Backend sends `gameStarted` event to *both* players with initial game state.
4.  **Gameplay Loop (Repeats `totalRounds` times):**
    *   Both players receive `gameStarted` or `newRound`, update state, see current question.
    *   Player A selects answer -> emits `submitAnswer` -> UI shows "Waiting...".
    *   Player B selects answer -> emits `submitAnswer` -> UI shows "Waiting...".
    *   Backend receives second answer -> emits `roundResults` to *both* players with all answers.
    *   Both players receive `roundResults`, update state, see the results comparison.
    *   Player A clicks "Continue" -> emits `playerReady`.
    *   Player B clicks "Continue" -> emits `playerReady`.
    *   Backend receives second `playerReady` -> increments round, clears answers/ready set -> emits `newRound` (or `gameOver`) to *both* players.
5.  **Game End:**
    *   Backend emits `gameOver` with final scores.
    *   Both players receive `gameOver`, update state, see final results screen.
    *   Option to "Play Again" (TODO: Implement) or "Exit".
6.  **Disconnection:** If a player disconnects, server removes them, emits `playerLeft` to the remaining player, who sees a notification and might be returned to game selection.
