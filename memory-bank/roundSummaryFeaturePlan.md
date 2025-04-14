# Round Summary Feature Plan

## Goal
Add a feature where after every round ends, a summary screen shows the question asked and the answers of both players. This screen should have a visually appealing entrance animation and include options to save/share the summary as an image.

## Design & Approach Comparison

1.  **Modal Dialog:**
    *   **Description:** A modal window over the current game screen.
    *   **Pros:** Simple implementation using existing components. Clear separation.
    *   **Cons:** Can feel interruptive. Animation might be less impactful. May not fit screen-to-screen flow.
2.  **Dedicated Summary Screen/View:**
    *   **Description:** Transition to a new, full screen dedicated to the summary.
    *   **Pros:** Best flexibility for design/animation. Integrates well with game stages. Ample space for future buttons.
    *   **Cons:** Requires state/navigation management. More complex than a modal.
3.  **Integrated Summary Panel:**
    *   **Description:** A panel slides/fades into view on the existing game screen.
    *   **Pros:** Keeps player in context. Animation can be effective.
    *   **Cons:** Can clutter UI. Requires careful layout. Might feel less distinct.

## Recommendation: Dedicated Summary Screen/View

*   **Reasoning:** Provides the best canvas for the desired "coming out of screen" animation and a distinct feel. Aligns well with game state transitions (round play -> summary -> next). Offers clean separation and space for future functionality. Leads to a more polished UX despite slightly higher complexity.

## Proposed Implementation Steps

1.  **State Management:**
    *   Modify game state to include the last completed round's question and player answers.
    *   Add state variable for view control (e.g., `currentView: 'ROUND_SUMMARY'`).
2.  **Create `RoundSummary` Component:**
    *   Develop a new UI component accepting round data as props.
    *   Style consistently with the game's design. Include question, player answers, maybe avatars/names.
3.  **Implement Animation:**
    *   Use CSS (transitions/keyframes) on the main summary card within `RoundSummary`.
    *   Trigger animation on component mount (e.g., `useEffect`) for the "coming out of screen" effect (scale/translate).
4.  **Integrate into Game Flow:**
    *   Modify round-end logic.
    *   Update state to store round data and set view to `ROUND_SUMMARY`.
    *   Add mechanism (button/timer) to transition *from* summary to the next game phase.
5.  **Save/Share Functionality (Later Phase):**
    *   Add "Save as Image" / "Share" buttons.
    *   Use `html2canvas` or similar to capture the summary card DOM element.
    *   Implement download logic ("Save") and Web Share API/linking ("Share").
6.  **Testing:**
    *   Unit tests for `RoundSummary`.
    *   Integration tests for transitions and data display accuracy.

## Next Steps
*   Identify current game state management and round progression logic.
*   Begin implementing Step 1 (State Management) based on the existing architecture. 