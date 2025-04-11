
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';

interface HotTakesProps {
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
}

const HotTakes: React.FC<HotTakesProps> = ({
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore
}) => {
  const {
    currentPhase,
    currentPlayerIndex,
    currentPlayer,
    otherPlayer,
    currentQuestion,
    roundResult,
    handleAnswerSelect,
    handlePredictionSelect,
    handleContinue,
    getPlayerNameMap
  } = useGameLogic({
    players,
    questions,
    currentRound,
    totalRounds,
    onComplete,
    onUpdateScore,
    answerSubmittedMessage: "All opinions submitted!",
    scorePerCorrectPrediction: 2,
    scorePerMatchingAnswer: 0 // Hot Takes doesn't award points for matching answers
  });

  // Render different phases
  if (currentPhase === 'results' && roundResult) {
    return (
      <ResultComparison 
        result={roundResult} 
        playerNames={getPlayerNameMap()} 
        onContinue={handleContinue} 
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 text-center">
        <div className="text-sm font-medium text-connection-secondary mb-1">
          Round {currentRound} of {totalRounds}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-connection-tertiary">
          {currentPhase === 'answer' ? "What's your take?" : "Predict their take"}
        </h2>
        <p className="text-gray-600 mt-1">
          {currentPhase === 'answer' 
            ? `${currentPlayer.nickname}, share your opinion` 
            : `${currentPlayer.nickname}, predict what ${otherPlayer.nickname} thinks`}
        </p>
      </div>

      <GameCard>
        <div className="text-xl font-medium text-center mb-6">
          {currentQuestion.text}
        </div>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-4 h-auto text-left justify-start hover:bg-connection-light hover:text-connection-tertiary transition-all border-connection-light"
              onClick={() => 
                currentPhase === 'answer' 
                  ? handleAnswerSelect(option) 
                  : handlePredictionSelect(option)
              }
            >
              <span className="text-md">{option}</span>
            </Button>
          ))}
        </div>
      </GameCard>
    </div>
  );
};

export default HotTakes;
