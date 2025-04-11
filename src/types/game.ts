
export type GameMode = 'guess-who-i-am' | 'hot-takes' | 'this-or-that';

export interface GameQuestion {
  id: string;
  text: string;
  options: string[];
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
  currentRound: number;
  totalRounds: number;
  questions: GameQuestion[];
  status: 'waiting' | 'playing' | 'completed';
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
