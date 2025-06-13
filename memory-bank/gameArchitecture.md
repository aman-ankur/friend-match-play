# Game Architecture & State Management

This document outlines the architecture and state management of the Friend Match Play game system, with a focus on how the client and server components interact, how state is managed, and the event-driven communication patterns.

## Core Architecture

The game uses a client-server architecture with:
- **Server (Node.js + Socket.IO)**: Manages rooms, game state, and broadcasts events
- **Client (React + Socket.IO)**: Renders UI and sends player actions to server

### State Management Hierarchy

```
Server (source of truth)
  ↓ emits events ↓  ↑ receives actions ↑
GameRoom Component (parent container)
  ↓ passes props ↓  ↑ receives callbacks ↑
Game-Specific Components (ThisOrThat, GuessWhoIAm, etc.)
  ↓ uses hooks ↓    ↑ calls handlers ↑
useGameLogic Hook (manages game-specific logic)
```

## Room Management

Each game session exists within a "Room" that has:

```typescript
interface Room {
  id: string;                 // Unique room identifier (e.g., "ABC123")
  players: Player[];          // List of players in the room
  gameMode: AppGameMode;      // '2player' or 'solo'
  status: RoomStatus;         // 'waiting', 'selecting', 'playing', 'completed'
  selectedGameMode?: SpecificGameMode;  // 'this-or-that', 'guess-who-i-am', etc.
  selectedGameStyle?: GameStyle;        // 'reveal-only', 'prediction'
  questions: GameQuestion[];  // List of questions for the game
  totalRounds: number;        // Total number of rounds (default: 5)
  currentRound: number;       // Current round number
  nsfwLevel: number;          // Content filter level
  timerDuration: number;      // Round timer in seconds (0 = no timer)
  currentAnswers: Record<string, string>;    // Player answers for current round
  readyForNextRound: Set<string>;            // Players ready for next round
  currentPredictions?: Record<string, { predictedPlayerId: string, prediction: string }>;
  isExclusiveModeActive?: boolean;           // Exclusive mode flag
  exclusiveQuestionQueue?: GameQuestion[];   // Queue of exclusive questions
}
```

### Room Status Transitions

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

- **waiting**: Room created, waiting for player 2 (2player mode only)
- **selecting**: Players are selecting game mode/settings
- **playing**: Game in progress, players answering questions
- **results**: Showing round results before proceeding to next round
- **completed**: Game over, showing final scores

*(Note: When transitioning from 'completed' back to 'selecting' via the reset flow, it's crucial that client-side event handlers for server events like `roomReset` ensure *all* relevant client-side state is reset, including UI interaction flags like `hasClickedContinueThisRound`, not just the core game state provided by the server payload.)*

## Event Flow

The system uses a bidirectional event-driven architecture:

### Server → Client Events:
- `roomCreated`: Confirms room creation
- `roomReady`: All players have joined, ready to select game
- `gameStarted`: Game has started, includes first question(s)
- `newRound`: New round started, includes question
- `roundComplete`: Both players have answered
- `roundResults`: Results of the round with answers
- `gameOver`: Game has ended, includes final scores
- `exclusiveModeActivated`: Exclusive mode was turned on
- `exclusiveModeFailed`: Failed to activate exclusive mode
- `exclusiveModeSuccess`: Exclusive mode activated successfully
- `roomReset`: Room has been reset for a new game *(Client handler must ensure full state reset, including UI flags)*

### Client → Server Events:
- `createRoom`: Create a new room
- `joinRoom`: Join an existing room
- `startGame`: Start the game with selected settings
- `submitAnswer`: Submit answer for current question
- `submitPrediction`: Submit prediction (prediction mode)
- `playerReady`: Player is ready for next round
- `roundTimerExpired`: Round timer has expired
- `attemptExclusiveMode`: Request to activate exclusive mode
- `endExclusiveMode`: End exclusive mode round
- `resetRoom`: Reset room after game completion
- `currentRound`: Current round number
- `isExclusiveModeActive`: Whether exclusive mode is active
- `hasClickedContinueThisRound`: Client-side flag to manage the 'Continue' button interaction after results are shown. *Needs careful resetting via `handleNewRound` and `handleRoomReset` event handlers to prevent state bugs between games.*

## GameRoom Component

The `GameRoom` component is the main container that:
1. Maintains the client-side game state
2. Handles socket event listeners
3. Renders appropriate UI based on game status
4. Manages game lifecycle (setup, gameplay, results, completion)

The component uses several state variables to track:
- `status`: Current room status
- `players`: List of players
- `selectedGameMode`: Type of game being played
- `selectedGameStyle`: Style of game (reveal or prediction)
- `questions`: List of questions for the game
- `currentRound`: Current round number
- `isExclusiveModeActive`: Whether exclusive mode is active

## Game Logic Hook

The `useGameLogic` hook encapsulates game-specific logic:

1. Tracks phase within a round (answer, prediction, waiting, results)
2. Handles answer/prediction submission
3. Stores player answers and predictions
4. Processes round results
5. Manages continue/next round flow

This separation allows the same game logic to be reused across different game components.

## Special Mode Implementation

Special mode is a special feature for "This or That" games with enhanced content:

1. **Activation**
   - Can happen during setup or gameplay
   - Protected by PIN
   - Only available to room creator
   - Only works with "This or That" game mode

2. **Question Flow**
   - Loads special questions with `nsfwRating: 11`
   - On game start, sends first question, stores rest in queue
   - For each round, shifts next question from queue
   - Game continues until queue is empty or creator ends it

3. **State Management**
   - Server tracks `isExclusiveModeActive` and `exclusiveQuestionQueue`
   - Client shows indicators and special UI for special mode
   - Round counter shows "Unlimited" instead of round numbers
   - Game continues indefinitely until questions exhausted

4. **Deactivation**
   - Creator can end the round at any time
   - Game automatically ends when all questions are used
   - Room transitions to 'completed' status

## Error Handling and Recovery

The system implements several recovery mechanisms:

1. **Disconnection Handling**
   - If creator leaves during game, game ends
   - If non-creator leaves, game also ends
   - Game state is cleaned up appropriately

2. **Timer Expiry**
   - If timer expires, default answers are submitted
   - Process continues to results screen

3. **Room Reset**
   - After game completion, room can be reset
   - Resets all state for a fresh game
   - Synchronizes server and client state

## Client/Server State Synchronization

The system follows these principles for state management:
1. Server is source of truth for game state
2. Client renders based on events from server
3. Client actions trigger server state changes
4. Server broadcasts state changes to all clients

This ensures all players see the same game state regardless of connection timing or issues. 