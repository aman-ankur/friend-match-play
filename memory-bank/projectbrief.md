
# Project Brief: Card Connection

## 1. Product Overview

"Card Connection" is a web-based card game platform designed for two remote players. It offers three distinct game modes focused on fostering personal connection, understanding, and discovery between friends. The platform prioritizes a lightweight, visually appealing experience and meaningful interactions.

## 2. Core Game Modes

### 2.1. "Guess Who I Am"
- **Concept:** A personality-based game revealing how well players understand each other through prediction.
- **Gameplay:** Players answer personal multiple-choice questions about themselves, then predict their friend's answers. Results are compared visually.
- **Scoring:** Points awarded for correct predictions and matching self-answers.

### 2.2. "Hot Takes"
- **Concept:** A game testing prediction of personal opinions on various topics.
- **Gameplay:** Players agree/disagree with statements, then predict their friend's stance. Stances are visually compared.
- **Scoring:** Running score tracks prediction accuracy.

### 2.3. "This or That: Prediction Edition"
- **Concept:** A forced-choice game focused on personal preferences and hypotheticals, with a prediction element.
- **Gameplay:** Players choose between two options for themselves, then predict their friend's choice. Uses a split-card design.
- **Scoring:** Based on prediction accuracy.

## 3. High-Level Requirements

- **Platform:** Web-based, accessible via unique room links.
- **Players:** Two remote players per game room.
- **User Experience:** Clean, minimalist, responsive (desktop/mobile), intuitive visual feedback, engaging animations.
- **Gameplay Features:** 
  - Configurable rounds (5-15)
  - Optional question skipping
  - Optional timed responses
  - Player avatars/nicknames
  - Potential for custom question decks
  - Two gameplay styles: prediction mode (with scoring) and reveal-only mode (no predictions or scoring)
- **Core Flow:** 
  1. Create Room
  2. Share Link
  3. Join Room
  4. Select Mode
  5. Select Gameplay Style (Prediction or Reveal-only)
  6. Play Rounds
  7. Game Summary
  8. Play Again/Change Mode

## 4. Content Rating

- **Question Library:** The question library contains a mix of casual, personal, and occasionally provocative questions.
- **Content Maturity:** Some questions touch on relationship dynamics, personal preferences, and intimate topics to foster deeper connections.
- **Customization:** Future versions may allow for filtering questions by content category or creating custom question decks.
