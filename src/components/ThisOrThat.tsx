
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player, GameStyle } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';

interface ThisOrThatProps {
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  gameStyle: GameStyle;
}

const ThisOrThat: React.FC<ThisOrThatProps> = ({
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore,
  gameStyle
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
    answerSubmittedMessage: "Choices made!",
    scorePerCorrectPrediction: gameStyle === 'prediction' ? 2 : 0,
    scorePerMatchingAnswer: 0, // This or That doesn't award points for matching answers
    gameStyle
  });

  // Render different phases
  if (currentPhase === 'results' && roundResult) {
    return (
      <ResultComparison 
        result={roundResult} 
        playerNames={getPlayerNameMap()} 
        onContinue={handleContinue}
        showPredictions={gameStyle === 'prediction'}
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
          {currentPhase === 'answer' ? "This or That?" : "Predict their choice"}
        </h2>
        <p className="text-gray-600 mt-1">
          {currentPhase === 'answer' 
            ? `${currentPlayer.nickname}, make your choice` 
            : `${currentPlayer.nickname}, predict what ${otherPlayer.nickname} chose`}
        </p>
      </div>

      <GameCard>
        <div className="text-xl font-medium text-center mb-6">
          {currentQuestion.text}
        </div>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-6 h-auto text-left justify-center text-center hover:bg-connection-light hover:text-connection-tertiary transition-all border-connection-light"
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

export default ThisOrThat;
