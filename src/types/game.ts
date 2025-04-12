export type GameMode = 'guess-who-i-am' | 'hot-takes' | 'this-or-that';
export type GameStyle = 'prediction' | 'reveal-only';

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
  }
};

