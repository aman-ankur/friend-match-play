import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player, GameStyle } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';
import TimerWidget from './TimerWidget';

interface GuessWhoIAmProps {
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

const GuessWhoIAm: React.FC<GuessWhoIAmProps> = ({
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
  console.log(`[GuessWhoIAm] Rendering. Received round prop: ${currentRound}`);

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
    getPlayerNameMap,
    hasSubmittedAnswer,
    hasSubmittedPrediction
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

  // Determine if the current player is waiting after submitting in the current phase
  const isWaitingAfterSubmission = 
    (currentPhase === 'answer' && hasSubmittedAnswer) || 
    (currentPhase === 'prediction' && hasSubmittedPrediction);

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
        {timerDuration > 0 && (
          <div className="flex justify-center">
            <TimerWidget duration={timerDuration} />
          </div>
        )}
        <div className="text-sm font-medium text-connection-secondary mb-1">
          Round {currentRound} of {totalRounds}
        </div>
        {/* Show header only when player names are available */}
        {currentPlayer?.nickname && otherPlayer?.nickname ? (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-connection-tertiary">
              {currentPhase === 'answer' 
                ? "Answer Honestly"
                : (currentPhase === 'prediction' 
                    // Use actual nickname 
                    ? `Predict ${otherPlayer.nickname}'s Answer` 
                    : "Waiting...") // Should ideally not hit this if results phase is handled
              }
            </h2>
            <p className="text-gray-600 mt-1">
              {currentPhase === 'answer' && !hasSubmittedAnswer
                // Use actual nickname
                ? `${currentPlayer.nickname}, what's your answer?` 
                : (currentPhase === 'prediction' && !hasSubmittedPrediction
                    // Use actual nicknames
                    ? `${currentPlayer.nickname}, what do you think ${otherPlayer.nickname} answered?`
                    : (isWaitingAfterSubmission 
                        // Use actual nickname
                        ? `Waiting for ${otherPlayer.nickname}...` 
                        : "Loading phase...") // Fallback if somehow waiting but not after submission
                )
              }
            </p>
          </>
        ) : (
          // Show loading state if names are not yet available
          <h2 className="text-xl md:text-2xl font-bold text-connection-tertiary animate-pulse">Loading names...</h2>
        )}
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
              disabled={isWaitingAfterSubmission}
            >
              <span className="text-md">{option}</span>
            </Button>
          ))}
        </div>
      </GameCard>

      {isWaitingAfterSubmission && (
        <div className="mt-4 text-center text-sm text-gray-500 animate-pulse">
          Waiting for other player...
        </div>
      )}
    </div>
  );
};

export default GuessWhoIAm;
