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
    otherPlayer,
    currentQuestion,
    roundResult,
    hasSubmittedAnswer,
    hasSubmittedPrediction,
    hasClickedContinue,
    handleAnswerSelect,
    handlePredictionSelect,
    handleContinue,
    getPlayerNameMap,
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

  // Determine if we should show the waiting state after answering
  const showWaitingAfterAnswer = currentPhase === 'waiting' || (currentPhase === 'answer' && hasSubmittedAnswer);

  // Determine prediction prompt
  const predictionPrompt = otherPlayer ? `Predict what ${otherPlayer.nickname} chose:` : `Predict the other player's answer:`;
  const cardTitle = `Round ${currentRound}/${totalRounds}`;

  return (
    <GameCard 
      title={cardTitle}
      className="w-full max-w-2xl"
    >
      {/* Display Question or Prediction Prompt prominently */}
      <div className="text-center mb-6 px-4">
        {currentPhase === 'answer' && (
          <p className="text-xl md:text-2xl font-semibold text-gray-800">{currentQuestion?.text ?? 'Loading...'}</p>
        )}
        {currentPhase === 'prediction' && (
          <p className="text-xl md:text-2xl font-semibold text-indigo-700">{predictionPrompt}</p>
        )}
      </div>

      {/* Timer Widget - Moved slightly down */}
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

      {/* Prediction Phase - Show prediction options */} 
      {currentPhase === 'prediction' && !hasSubmittedPrediction && (
        <AnswerSelection 
          options={currentQuestion.options}
          onSelect={handlePredictionSelect}
        />
      )}

      {/* Waiting Phase (after submitting answer) */} 
      {showWaitingAfterAnswer && (
          <div className="text-center p-8">
            <p className="text-lg text-gray-600 animate-pulse">
              {otherPlayer ? `Waiting for ${otherPlayer.nickname}...` : 'Waiting for your friend...'}
            </p>
          </div>
      )}

      {/* Waiting Phase (after submitting prediction) */} 
      {currentPhase === 'prediction' && hasSubmittedPrediction && (
        <div className="text-center p-8">
          <p className="text-lg text-gray-600 animate-pulse">Waiting for results...</p>
        </div>
      )}

      {/* Results Phase */} 
      {currentPhase === 'results' && roundResult && (
        <ResultComparison 
          result={roundResult}
          questionText={currentQuestion.text}
          playerNames={getPlayerNameMap()}
          showPredictions={gameStyle === 'prediction'}
          onContinue={handleContinue}
          hasClickedContinue={hasClickedContinue}
        />
      )}
    </GameCard>
  );
};

export default ThisOrThat;
