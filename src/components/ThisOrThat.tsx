import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player, GameStyle } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';
import TimerWidget from './TimerWidget';
import AnswerSelection from '@/components/AnswerSelection';
import { useSocket } from '@/context/SocketContext';

interface ThisOrThatProps {
  roomId: string;
  currentPlayerId: string | null;
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  onNextRound: () => void;
  gameStyle: GameStyle;
  timerDuration: number;
  gameMode: 'solo' | '2player';
}

const ThisOrThat: React.FC<ThisOrThatProps> = ({
  roomId,
  currentPlayerId,
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore,
  onNextRound,
  gameStyle,
  timerDuration,
  gameMode,
}) => {
  const {
    currentPhase,
    currentPlayer,
    currentQuestion,
    roundResult,
    hasSubmittedAnswer,
    hasClickedContinue,
    handleAnswerSelect,
    handleContinue,
    getPlayerNameMap,
    state,
  } = useGameLogic({
    roomId,
    players,
    questions,
    currentRound,
    totalRounds,
    onComplete,
    onUpdateScore,
    onNextRound,
    gameStyle,
    currentPlayerId,
  });

  console.log(`[ThisOrThat] Rendering. Phase: ${currentPhase}, Round: ${currentRound}, HasSubmitted: ${hasSubmittedAnswer}`);

  if (!currentQuestion) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <GameCard title={`Round ${currentRound}/${totalRounds}`}>
          <div className="text-center py-8">
            <p className="text-gray-600">Loading question...</p>
          </div>
        </GameCard>
      </div>
    );
  }

  // Determine if we should show the waiting state
  // Show waiting if phase is 'waiting' OR if in 'answer' phase but already submitted
  const showWaiting = currentPhase === 'waiting' || (currentPhase === 'answer' && hasSubmittedAnswer);

  return (
    <GameCard 
      title={`Round ${currentRound}/${totalRounds}: This or That`}
      description={currentQuestion.text}
      className="w-full max-w-2xl"
    >
      {timerDuration > 0 && currentPhase === 'answer' && !hasSubmittedAnswer && (
        <TimerWidget 
          duration={timerDuration} 
          key={`${currentQuestion.id}-${currentPhase}`} 
          onTimeout={() => {
              if (!hasSubmittedAnswer) handleAnswerSelect(currentQuestion.options[0]);
          }}
        />
      )}

      {/* Answer Phase - Show only if in answer phase and haven't submitted */} 
      {currentPhase === 'answer' && !hasSubmittedAnswer && (
        <AnswerSelection 
          options={currentQuestion.options}
          onSelect={handleAnswerSelect}
        />
      )}

      {/* Waiting Phase (after submitting answer or before results) */} 
      {showWaiting && (
          <div className="text-center p-8">
            <p className="text-lg text-gray-600 animate-pulse">Waiting for opponent...</p>
          </div>
      )}

      {/* Results Phase */} 
      {currentPhase === 'results' && roundResult && (
        <ResultComparison 
          result={roundResult}
          questionText={currentQuestion.text}
          playerNames={getPlayerNameMap()}
          showPredictions={false} // Reveal only mode
          onContinue={handleContinue} // Server will trigger next round via event
          hasClickedContinue={hasClickedContinue}
        />
      )}
    </GameCard>
  );
};

export default ThisOrThat;
