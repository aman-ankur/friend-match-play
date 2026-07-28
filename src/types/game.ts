export type GameMode =
  | 'guess-who-i-am'
  | 'hot-takes'
  | 'this-or-that'
  | 'how-would-i-react'
  | 'most-likely-to'
  | 'dealbreaker-draft'
  | 'red-flag-radar';
export type GameStyle = 'predict-score' | 'reveal-only';

export interface GameQuestion {
  id: string;
  text: string;
  options: string[];
  score: number;
  nsfwRating: number; // 1-10, where 10 is "unhinged"
  categories: string[]; // e.g. ["life", "romance", "sex", "career", "friends", "hobby"]
}

export interface Player {
  id: string;
  nickname: string;
  avatar?: string;
  score: number;
}

export interface GameRoom {
  id: string;
  players: Player[];
  gameMode: GameMode;
  gameStyle: GameStyle;
  currentRound: number;
  totalRounds: number;
  questions: GameQuestion[];
  status: 'waiting' | 'playing' | 'completed';
  isExclusiveModeActive: boolean;
}

export interface Answer {
  questionId: string;
  playerId: string;
  selectedOption: string;
}

export interface Prediction {
  questionId: string;
  predictorId: string;
  predictedForId: string;
  predictedOption: string;
}

export interface RoundResult {
  questionId: string;
  players: {
    playerId: string;
    answer: string;
    prediction?: string;
    isCorrect?: boolean;
    pointsEarned: number;
  }[];
}

// Game mode styles and configuration
export const gameModeConfig: Record<GameMode, {
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  'guess-who-i-am': {
    title: 'Guess Who I Am',
    description: 'Reveal how well you understand each other',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  'hot-takes': {
    title: 'Hot Takes',
    description: 'Test your opinion prediction skills',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  'this-or-that': {
    title: 'This or That',
    description: 'Forced choices with a twist',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  'how-would-i-react': {
    title: 'How Would I React?',
    description: 'Predict each other under pressure',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50'
  },
  'most-likely-to': {
    title: 'Most Likely To',
    description: 'Decide who would actually do it',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  'dealbreaker-draft': {
    title: 'Dealbreaker Draft',
    description: 'Draft the best dangerously flawed option',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  'red-flag-radar': {
    title: 'Red Flag Radar',
    description: 'Rate the warning signs before they become a plot',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
};
