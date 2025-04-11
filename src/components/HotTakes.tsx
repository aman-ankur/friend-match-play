import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player, GameStyle } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';
import TimerWidget from './TimerWidget';

interface HotTakesProps {
  roomId: string;
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  onNextRound: () => void;
  gameStyle: GameStyle;
  timerDuration: number;
  currentPlayerId: string | null;
}

const HotTakes: React.FC<HotTakesProps> = ({
  roomId,
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore,
  onNextRound,
  gameStyle,
  timerDuration,
  currentPlayerId
}) => {
  console.log(`[HotTakes] Rendering. Received round prop: ${currentRound}`);

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
    roomId: roomId,
    players,
    questions,
    currentRound,
    totalRounds,
    onComplete,
    onUpdateScore,
    onNextRound,
    gameStyle,
    currentPlayerId
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

  // Add loading state
  if (!currentQuestion || !currentPlayer || !otherPlayer) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <GameCard>
          <div className="text-center py-8">
            <p className="text-gray-600">Loading question...</p>
          </div>
        </GameCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 text-center">
        {timerDuration > 0 && (
          <div className="flex justify-center">
            <TimerWidget duration={timerDuration} />
          </div>
        )}
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
