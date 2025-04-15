# Debug Log & Lessons Learned - April 2024 Deployment & State Sync

This document summarizes the debugging process undertaken in April 2024, covering issues related to deployment (Vercel/Render), state synchronization in `GameRoom.tsx`, and component interactions.

## 1. Initial Problem: Text Wrapping in Game Selection Cards (`GameRoom.tsx`)

- **Issue:** Text (titles and descriptions) in the game selection buttons wasn't wrapping correctly, causing overflow, especially on smaller screens.
- **Analysis:** The root cause was multifaceted:
    - Flexbox/Grid constraints preventing child elements from shrinking.
    - Lack of explicit width constraints or overflow handling on intermediate containers.
    - Initial attempts (`overflow-hidden`, `min-w-0` on text) were insufficient because parent containers didn't allow shrinking.
- **Fix:** A comprehensive approach was needed:
    - Added `min-w-0` and `overflow-hidden` to the `Button` component (the grid item).
    - Added `min-w-0` and `overflow-hidden` to the inner `div` (flex container) within the button.
    - Added `break-words` / `break-all` to both `h3` and `p` elements.
    - Added `max-w-full` and `w-full` where appropriate to enforce width constraints.
    - Used inline styles (`wordWrap: 'break-word', hyphens: 'auto'`) on the paragraph for robust breaking.
- **Lesson:** Complex layout issues often require addressing constraints at multiple levels of the DOM hierarchy. `min-w-0` is crucial for flex/grid items containing wrapping text.

## 2. Deployment Issues (Vercel/Render)

### 2.1. Frontend Connection Error (`ERR_CONNECTION_REFUSED`)

- **Issue:** Deployed frontend on Vercel couldn't connect to the backend (WebSocket `localhost:3001` error).
- **Analysis:** Frontend code running on Vercel was still trying to connect to `localhost`, not the deployed backend.
- **Fix:**
    - Deployed backend Node.js server separately (to Render).
    - Used `VITE_SOCKET_URL` environment variable in frontend (`SocketContext.tsx`) to dynamically get the backend URL.
    - Set `VITE_SOCKET_URL` on Vercel to the public Render backend URL.
    - Configured CORS on the Render backend (`server.ts`) to allow connections from the Vercel frontend URL (using `process.env.VITE_SOCKET_URL` set on Render).
- **Lesson:** Deployed applications need explicit URLs and cross-origin policies (CORS). Environment variables are essential for managing different URLs (local dev, production).

### 2.2. Backend Build Failure on Render (TS6059 `rootDir` Error)

- **Issue:** Render build failed with `error TS6059: File '.../src/types/game.ts' is not under 'rootDir' '.../server/src'`.
- **Analysis:** The backend build process (`tsc`) running within `server/` enforced the `rootDir` specified in `server/tsconfig.json`. Imports from outside this directory (`../src/types/game.ts`) violated this constraint.
- **Fix:**
    - Modified the backend `build` script (`server/package.json`) to: `rm -rf dist src/types && cp -R ../src/types ./src/types && tsc`. This copies the shared types *into* the build context before compiling.
    - Changed the import path in `server/src/gameUtils.ts` to `./types/game`.
    - Added `src/types` to `server/.gitignore`.
- **Lesson:** Production build tools (`tsc`) can be stricter than development tools (`ts-node-dev`). Build processes might need steps to prepare the context (like copying shared files) before compilation. `rootDir` in `tsconfig.json` affects allowed import paths.

## 3. `GameRoom.tsx` State Synchronization Issues

### 3.1. Game Not Starting ("Error: Game mode not set")

- **Issue:** After selecting game settings, the game component wouldn't render, showing an error. Logs showed `selectedGameMode` was `undefined` during render, despite the `gameStarted` event containing the correct mode.
- **Analysis:** The `handleGameStarted` function was receiving the event data correctly but wasn't using the right keys. The server sent `gameMode` and `gameStyle`, but the client handler initially tried to use `data.selectedGameMode` and `data.selectedGameStyle`.
- **Fix:** Corrected the property names accessed in `handleGameStarted` to match the event payload (`data.gameMode`, `data.gameStyle`).
- **Lesson:** Ensure client-side event handlers precisely match the data structure (property names) emitted by the server. Debug logs are crucial for verifying received payloads vs. expected state updates.

### 3.2. Question Data Mismatch (`TypeError: Cannot read properties of undefined (reading '0')`)

- **Issue:** After fixing the game mode state, a runtime error occurred when trying to render the game component (`ThisOrThat`).
- **Analysis:** The server's `gameStarted` event was sending only the *first* question object under the key `question` (singular). The client's `handleGameStarted` expected the *full array* of questions under the key `questions` (plural). This resulted in the `questions` state being `undefined` or empty, causing an error when accessing `questions[0]`.
- **Fix:** Modified the server (`server.ts`) to emit the full `room.questions` array under the key `questions` in the `gameStarted` event.
- **Lesson:** Verify the entire data contract (payload structure) between client and server for events. Small naming differences (singular vs. plural) can cause runtime errors.

### 3.3. Stuck on "Waiting for other player..." (Results Screen)

- **Issue:** After both players answered, the results screen showed, but clicking "Continue" didn't advance the game; it remained stuck showing "Waiting for opponent...".
- **Analysis:** The client logs showed the `roundResults` event was received, but the component never transitioned to the next round. The initial assumption was that the `roundResults` listener was missing. After adding it, a `ReferenceError` occurred.
- **Fix (Part 1 - ReferenceError):** Added the missing `import ResultComparison from './ResultComparison';` statement to `GameRoom.tsx`.
- **Lesson:** Ensure all components used within JSX are correctly imported.

### 3.4. Stuck on Results (Post-ReferenceError Fix) / "Waiting..." Not Showing

- **Issue:** After fixing the `ReferenceError`, clicking "Continue" immediately snapped the UI back to the *same* round's question input, bypassing the results screen / "Waiting..." state. Then, after the *second* player clicked continue, the `newRound` event was received, but the component *still* rendered the results screen.
- **Analysis (Combined):**
    1.  The `onContinue` prop passed to `ResultComparison` was initially an inline function that incorrectly set `status` back to `'playing'` immediately, causing the snap-back.
    2.  After fixing that to use the correct `handleContinueClick` handler, the component correctly showed "Waiting...", but the subsequent `newRound` event failed to trigger the status update back to `'playing'`. This was traced to the `handleNewRound` function not correctly updating the `status` state and clearing `roundResults`. Potential stale closures related to the `useEffect` dependency array were also considered.
- **Fix (Combined):**
    1.  Corrected the `onContinue` prop passed to `ResultComparison` to use the `handleContinueClick` function defined within `GameRoom`.
    2.  Ensured `handleContinueClick` *only* emitted `playerReady` and set the local `hasClickedContinueThisRound` state (it does *not* change the overall `status`).
    3.  Corrected the `handleNewRound` function to explicitly set `setStatus('playing')`, clear `setRoundResults(null)`, and reset `setHasClickedContinueThisRound(false)`.
    4.  Adjusted the main `useEffect` dependency array (ultimately adding `status` back) to ensure listeners had the correct scope when state updates occurred.
- **Lesson:** State transitions driven by asynchronous events (like socket messages) require careful handling. Ensure event handlers update the correct state variables. Be mindful of `useEffect` dependencies and potential stale closures. Inline functions passed as props can sometimes obscure state management logic; dedicated handlers are often clearer.

### 3.5. Prediction Mode Not Working (GameStyle Type Mismatch)

- **Issue:** Even when starting the game with Prediction Mode selected, the game would only operate in Reveal Mode. The prediction phase never triggered, and prediction UI was never displayed, despite logs showing the setting was correctly applied.
- **Analysis:** The root issue was a type mismatch between UI selections and backend code:
    1. In the UI, the selection value for prediction mode was set as `'predict-score'`, but the `GameStyle` type was defined as `'prediction' | 'reveal-only'`.
    2. The game components (GuessWhoIAm, ThisOrThat, HotTakes) were checking for `gameStyle === 'predict-score'` in their conditional rendering logic.
    3. The server code was checking for `room.selectedGameStyle === 'prediction'` when determining if it should emit the `predictionPhase` event.
    4. The `useGameLogic` hook was listening for `predictionPhase` events but only handling them if `gameStyle === 'prediction'`.
- **Fix:**
    1. Updated the `GameStyle` type definition in both client and server code to use `'predict-score' | 'reveal-only'`.
    2. Updated all server-side code to check for `room.selectedGameStyle === 'predict-score'`.
    3. Fixed the `submitAnswer` handler to emit a `predictionPhase` event when appropriate instead of immediately processing results.
    4. Added extensive logging to trace the event flow from answer submission through prediction phase to results.
    5. Enhanced the prediction UI with distinctive styling to make it more obvious when in prediction mode.
    6. Fixed state transitions in the `useGameLogic` hook to properly handle the prediction phase.
- **Lesson:** Type consistency is critical across the client-server boundary. When dealing with enums or string literals, ensure they match exactly throughout the codebase. Thorough testing of different game modes is necessary, as bugs may only surface in specific combinations of settings. Socket event tracing with detailed logs is invaluable for debugging asynchronous workflows.

### 3.6. Content Level Display Issues in Rules Overlay

- **Issue:** When Player 2 joined a game with a high content level (level 10) selected by the creator, the rules overlay showed incorrect information for the content level.
- **Analysis:** The issue had multiple root causes:
    1. The `nsfwLevel` value was being passed through the system without proper validation at various stages.
    2. There was no robust error handling for edge cases (invalid or extreme values).
    3. The groups-based approach for content levels had inconsistent implementation across components.
    4. The server was sending the raw `nsfwLevel` value in some cases but not in the `gameStarted` event.
- **Fix:**
    1. **Client-side validation (NSFWSlider component)**:
       - Added proper validation to ensure values are always within 1-10 range
       - Added better error handling for non-numeric or invalid inputs
       - Improved display to show the actual numeric level alongside the descriptive name
    2. **Rules display (RulesOverlay component)**:
       - Added comprehensive validation for content level values
       - Created a utility function to handle all edge cases
       - Improved the UI to clearly show both the level name and numeric value
       - Added detailed logging to track values through the system
    3. **Game start logic (GameRoom component)**:
       - Added validation before sending nsfwLevel to the server
       - Added debugging to track the value through the system
       - Ensured correct validation in the handleCreatorStartGame function
    4. **Server-side validation (server.ts)**:
       - Added validation of nsfwLevel in the startGame handler
       - Made sure the validated value is used throughout the server code
       - Added the validated nsfwLevel to the gameStarted event sent to clients
- **Lesson:** Validation should happen at every level of the stack (client input, client-to-server transmission, server processing, server-to-client transmission, and client display). Fun, descriptive names for content levels need consistent implementation across all components. Proper logging throughout the system helps trace values and identify where inconsistencies are introduced. 