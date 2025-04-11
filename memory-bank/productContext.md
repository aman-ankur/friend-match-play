# Product Context: Cards Against Maturity

## Core Concept

Cards Against Maturity is a web-based party game designed for two players to test how well they know each other's personalities, opinions, and preferences through various question-based game modes.

## Target Audience

*   Friends, couples, or pairs looking for a fun, interactive way to connect and learn more about each other.
*   Users seeking simple, engaging online games for two players.

## Key Features

1.  **Multiple Game Modes:**
    *   **Guess Who I Am:** Players answer personal questions and predict their friend's answers.
    *   **Hot Takes:** Players share opinions on controversial topics and predict their friend's stance.
    *   **This or That:** Players choose between two options in dilemma-style questions and predict their friend's choice.
2.  **Gameplay Styles:**
    *   **Prediction Mode:** Players earn points by correctly predicting their friend's answers (and potentially for matching answers, depending on the mode). Competitive.
    *   **Reveal-only Mode:** Players answer questions, and answers are simply revealed for comparison and discussion. No scoring.
3.  **NSFW/Spice Level Control:**
    *   Users can adjust the "spice level" of questions using a segmented button control (Mild, Medium, Spicy, Hot, Wild) before starting.
    *   This filters the question pool to match the desired intensity.
4.  **Answer Timer (Optional):**
    *   Players can optionally select a timer duration (15s, 30s, 45s) for answering each question.
    *   A visual timer widget is displayed during the answering phase if a duration is chosen.
5.  **Real-time (Planned):** The ultimate goal is a real-time experience where players join a room and see updates instantly.
6.  **Simple Room Joining:** Players join via a shared room code (currently simulated).
7.  **Clear Results Display:** Shows each player's answer and, in prediction mode, the predictions made and points earned.
8.  **Easy Navigation:** Includes a persistent "Home" button to return to the game selection screen and an "Exit" button.

## User Flow

1.  Player 1 creates/joins a room, gets a room code.
2.  Player 2 joins using the room code (currently simulated auto-join).
3.  Players select a Game Mode (Guess Who I Am, Hot Takes, This or That).
4.  Players select a Game Style (Prediction or Reveal-only) and optionally an Answer Timer duration.
5.  Players adjust the NSFW/Spice Level.
6.  Game starts.
7.  **Round Loop (Repeats `totalRounds` times):**
    *   **Answer Phase:** Each player answers the current question (timer shown if selected).
    *   **Prediction Phase (Prediction Mode Only):** Each player predicts the other's answer (timer shown if selected).
    *   **Results Phase:** Answers (and predictions/scores if applicable) are revealed.
    *   Players click "Continue".
8.  **Game End:** Final scores (if applicable) are displayed. Options to "Play Again" or "Exit".
9.  Players can use the "Home" button at any point after joining to return to the game selection screen.
