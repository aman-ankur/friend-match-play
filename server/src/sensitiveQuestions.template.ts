// server/src/sensitiveQuestions.template.ts
// TEMPLATE FILE - Copy this to sensitiveQuestions.ts and populate with actual questions
import { GameQuestion } from './types/game';

// This is a template file for sensitive questions
// To use this project:
// 1. Copy this file to: server/src/sensitiveQuestions.ts  
// 2. Populate the array below with your actual sensitive questions
// 3. The questions should have nsfwRating: 11

export const sensitiveThisOrThatQuestions: GameQuestion[] = [
  // Example structure - replace with your actual questions
  // {
  //   id: "tot-sensitive-1",
  //   text: "Your sensitive question here?",
  //   options: ["Option A", "Option B"],
  //   score: 1,
  //   nsfwRating: 11,
  //   categories: ["appropriate", "categories"]
  // },
  
  // Add your sensitive questions here...
  // All questions should have nsfwRating: 11 to work with exclusive mode
]; 