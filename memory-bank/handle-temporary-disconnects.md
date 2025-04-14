# Handling Temporary Player Disconnections

## Problem

When a player disconnects during an active game (e.g., locks mobile screen, switches tabs), the server currently treats this as a permanent "leave" event. If this happens in a 2-player game, the remaining player is immediately notified (`playerLeft`), and the game ends (`gameOver`), preventing the disconnected player from rejoining.

**Observed Behavior:**
- Player 2 (mobile web) locks screen.
- Server `disconnect` event fires for Player 2's socket.
- Server's `disconnect` handler identifies the game is in progress (`status: 'playing'`).
- Handler immediately removes Player 2 from the room and calls `endGame()`.
- Player 1 receives `playerLeft` and `gameOver` events, ending their session prematurely.

## Root Cause

The server-side Socket.IO `disconnect` event handler in `server/src/server.ts` lacks a mechanism to differentiate between temporary interruptions and permanent departures. It immediately processes a disconnect during active gameplay as a player leaving, triggering game termination logic if the minimum player count is no longer met.

## Proposed Solution (Least Coding Effort)

Implement a grace period using `setTimeout` within the server's `disconnect` handler.

**Server-Side Changes:**

1.  **Modify `Room` Interface:** Add a structure to track temporarily disconnected players and their associated timeouts, e.g., `disconnectedPlayers: Map<string, NodeJS.Timeout>;`.
2.  **Modify `disconnect` Handler (`server/src/server.ts`):**
    *   When a socket disconnects, find the room.
    *   **If** `room.gameMode === '2player'` and `room.status === 'playing'`:
        *   **Instead of immediate removal:**
            *   Log the temporary disconnect.
            *   Emit a *new* event to remaining players: `playerDisconnected` (or similar) with the disconnected player's ID/name.
            *   Start a `setTimeout` (e.g., 30-60 seconds).
            *   Store the `playerId` (disconnected socket ID) and the `timeoutId` in the `room.disconnectedPlayers` map.
        *   The callback function for the `setTimeout` will contain the **original logic**:
            *   Remove the player ID from `disconnectedPlayers`.
            *   Remove the player from `room.players`.
            *   Clean up player's answers/readiness state.
            *   Emit the original `playerLeft` event (signifying permanent departure).
            *   Call `endGame(room, true)`.
    *   **Else (if status is `waiting`, `selecting`, or solo mode):** Keep the existing immediate removal logic.
3.  **Add Reconnection Handler:**
    *   Create a new server-side event listener, e.g., `socket.on('attemptReconnection', (data) => { ... })`.
    *   The client must send its `roomId` and its previous `playerId` (the disconnected socket ID) in the `data`.
    *   In the handler:
        *   Find the `room`.
        *   Check if `data.previousPlayerId` exists as a key in `room.disconnectedPlayers`.
        *   If yes:
            *   Clear the associated timeout using `clearTimeout(room.disconnectedPlayers.get(data.previousPlayerId));`.
            *   Remove the entry from `room.disconnectedPlayers`.
            *   Find the player object in `room.players` that still holds the `data.previousPlayerId`. **Update this player object's `id` property to the *new* `socket.id`**.
            *   Join the new socket to the Socket.IO room: `socket.join(roomId);`.
            *   Emit a `playerReconnected` event to all players in the room, possibly sending the full game state to the rejoining player.

**Client-Side Changes:**

1.  Listen for `playerDisconnected` event: Show a "Waiting for [PlayerName] to reconnect..." message or indicator.
2.  Listen for `playerReconnected` event: Hide the waiting message, update player list/status if necessary.
3.  Listen for the original `playerLeft` event: Handle the permanent departure as currently implemented (show opponent left message, potentially reset state).
4.  Implement logic for sending `attemptReconnection`: When the socket connection is re-established (e.g., in the `'connect'` event handler), check if the disconnection happened during an active game. If so, emit `attemptReconnection` with the room ID and the *previous* socket ID (which needs to be stored before disconnection).

## Alternatives Considered

*   **Dedicated Player State:** Add `status: 'connected' | 'disconnected'` to the `Player` object. Cleaner state but requires modifying many game logic checks across the server.
*   **Session/Token-Based:** Most robust but requires significant architectural changes (likely not minimal effort).

This approach focuses changes primarily on the connect/disconnect handlers, minimizing modifications to existing game progression logic.

**Related Note on State Resets:** Debugging the 'Play Again' flow highlighted that robust state reset logic is crucial even *without* disconnections. Client-side handlers for server events like `roomReset` and `newRound` must ensure *all* relevant state is cleared (including UI interaction flags like `hasClickedContinueThisRound`) to prevent bugs during normal game transitions.