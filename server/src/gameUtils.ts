// server/src/gameUtils.ts
// Import types from the single source of truth (expected to be copied locally during build)
import { GameQuestion as ImportedGameQuestion, GameMode as ImportedGameMode } from './types/game';

// Re-export the types for use by other server modules
export type GameQuestion = ImportedGameQuestion;
export type GameMode = ImportedGameMode;

// Import sensitive questions from separate file (with fallback if file doesn't exist)
let sensitiveQuestions: GameQuestion[] = [];
let sensitiveAllModeQuestions: GameQuestion[] = [];

// Try to load from file first
try {
  const { sensitiveThisOrThatQuestions, sensitiveAllModeQuestions: allModeQuestions } = require('./sensitiveQuestions');
  sensitiveQuestions = sensitiveThisOrThatQuestions || [];
  sensitiveAllModeQuestions = allModeQuestions || [];
  console.log(`[gameUtils] Loaded ${sensitiveQuestions.length} ultra-sensitive questions`);
  console.log(`[gameUtils] Loaded ${sensitiveAllModeQuestions.length} sensitive questions (rating 7+)`);
} catch (error) {
  // Alternative: Try to load from environment variables (for production deployment)
  try {
    if (process.env.SENSITIVE_QUESTIONS_DATA) {
      const envData = JSON.parse(process.env.SENSITIVE_QUESTIONS_DATA);
      sensitiveQuestions = envData.sensitiveThisOrThatQuestions || [];
      sensitiveAllModeQuestions = envData.sensitiveAllModeQuestions || [];
      console.log(`[gameUtils] Loaded ${sensitiveQuestions.length} ultra-sensitive questions from env`);
      console.log(`[gameUtils] Loaded ${sensitiveAllModeQuestions.length} sensitive questions from env (rating 7+)`);
    } else {
      console.log('[gameUtils] Sensitive questions file not found - adult content modes will be disabled');
      sensitiveQuestions = [];
      sensitiveAllModeQuestions = [];
    }
  } catch (envError) {
    console.log('[gameUtils] Failed to load sensitive questions from environment - adult content modes will be disabled');
    sensitiveQuestions = [];
    sensitiveAllModeQuestions = [];
  }
}

// Question data and function will be added in the next step

// Define basic types here or import from a shared types file
// Removed duplicate type definitions (GameQuestion, GameMode) - Now imported from ./types/game

// --- Question Data (Duplicated from src/utils/gameQuestions.ts to avoid CJS/ESM issues) --- 
const guessWhoIAmQuestions: GameQuestion[] = [
  // Only safe questions (rating 1-6) remain here
  // Rating 7+ questions are now in sensitiveQuestions.ts
];

const hotTakesQuestions: GameQuestion[] = [
  // Only safe questions (rating 1-6) remain here  
  // Rating 7+ questions are now in sensitiveQuestions.ts
];

const thisOrThatQuestions: GameQuestion[] = [
  // Only safe questions (rating 1-6) remain here
  // Rating 7+ questions are now in sensitiveQuestions.ts
];

const allQuestions: Record<GameMode, GameQuestion[]> = {
  "guess-who-i-am": guessWhoIAmQuestions,
  "hot-takes": hotTakesQuestions,
  "this-or-that": thisOrThatQuestions
};

// --- Function to get questions (Exported for server use) ---
export const getQuestionsByMode = (mode: GameMode, count: number = 5, nsfwLevel: number = 1, includeExclusive: boolean = false): GameQuestion[] => {
  let questionsPool = allQuestions[mode] || [];
  
  // Add sensitive questions based on nsfwLevel
  if (nsfwLevel >= 7 && sensitiveAllModeQuestions.length > 0) {
    questionsPool = [...questionsPool, ...sensitiveAllModeQuestions];
  }
  
  console.log(`[getQuestionsByMode] Called with: mode=${mode}, count=${count}, nsfwLevel=${nsfwLevel}, includeExclusive=${includeExclusive}`);
  console.log(`[getQuestionsByMode] Total questions in pool for ${mode}: ${questionsPool.length}`);

  // Filter questions by NSFW level
  const filteredQuestions = includeExclusive
    ? sensitiveQuestions // Use the ultra-sensitive questions for exclusive mode (rating 11)
    : questionsPool.filter(q => q.nsfwRating <= nsfwLevel); // Standard filtering (up to specified level)
    
  console.log(`[getQuestionsByMode] Filtered questions: ${filteredQuestions.length} (includeExclusive=${includeExclusive})`);
  if (includeExclusive) {
    console.log(`[getQuestionsByMode] NSFW Rating 11 questions found: ${filteredQuestions.length}`);
    // Log the first 3 questions to verify they're correct
    if (filteredQuestions.length > 0) {
      console.log(`[getQuestionsByMode] First exclusive question: ${filteredQuestions[0].id} - ${filteredQuestions[0].text.substring(0, 40)}...`);
    }
  }

  // Shuffle and pick the first 'count' questions
  // Basic Fisher-Yates shuffle
  const shuffled = [...filteredQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // For exclusive mode, return all questions (or up to count if specified)
  if (includeExclusive && count === 0) {
    console.log(`[getQuestionsByMode] Returning all ${shuffled.length} exclusive questions`);
    return shuffled;
  }

  const result = shuffled.slice(0, count);
  console.log(`[getQuestionsByMode] Returning ${result.length} questions`);
  return result;
};
