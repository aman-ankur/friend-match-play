import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player, GameStyle } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';
import AnswerSelection from './AnswerSelection';

interface HotTakesProps {
  roomId: string;
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  gameStyle: GameStyle;
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
  gameStyle,
  currentPlayerId
}) => {
  console.log(`[HotTakes] Rendering. Round: ${currentRound}`);

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
    getPlayerNameMap
  } = useGameLogic({
    roomId: roomId,
    players,
    questions,
    currentRound,
    totalRounds,
    onComplete,
    onUpdateScore,
    gameStyle,
    currentPlayerId
  });

  console.log(`[HotTakes] Phase: ${currentPhase}, SubmittedAnswer: ${hasSubmittedAnswer}, SubmittedPrediction: ${hasSubmittedPrediction}`);

  const showWaitingAfterAnswer = currentPhase === 'waiting' && !roundResult && !hasSubmittedPrediction;
  const showWaitingAfterPrediction = currentPhase === 'waiting' && hasSubmittedPrediction && !roundResult;

  if (!currentQuestion || !currentPlayer || (players.length > 1 && !otherPlayer)) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <GameCard title={`Round ${currentRound}/${totalRounds}`}>
          <div className="text-center py-8">
            <p className="text-gray-600">Loading game state...</p>
          </div>
        </GameCard>
      </div>
    );
  }

  const cardTitle = `Round ${currentRound}/${totalRounds}`;
  const predictionPrompt = `Predict what ${otherPlayer.nickname} thinks:`;

  if (showWaitingAfterAnswer) {
    return (
      <GameCard
        title={cardTitle}
        className="w-full max-w-2xl"
      >
        <div className="text-center p-8">
          <p className="text-lg text-gray-600 animate-pulse">
            {otherPlayer ? `Waiting for ${otherPlayer.nickname} to answer...` : 'Waiting for your friend...'}
          </p>
        </div>
      </GameCard>
    );
  }

  if (showWaitingAfterPrediction) {
    return (
      <GameCard
        title={cardTitle}
        className="w-full max-w-2xl"
      >
        <div className="text-center p-8">
          <p className="text-lg text-gray-600 animate-pulse">
            Waiting for results...
          </p>
        </div>
      </GameCard>
    );
  }

  if (currentPhase === 'results' && roundResult) {
    return (
      <GameCard
        title={cardTitle}
        className="w-full max-w-2xl"
      >
        <ResultComparison
          result={roundResult}
          questionText={currentQuestion.text}
          playerNames={getPlayerNameMap()}
          onContinue={handleContinue}
          showPredictions={gameStyle === 'predict-score'}
          hasClickedContinue={hasClickedContinue}
        />
      </GameCard>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <GameCard
        title={cardTitle}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-6 px-4">
          {(currentPhase === 'answer' || (currentPhase === 'prediction' && gameStyle === 'reveal-only')) && (
             <p className="text-xl md:text-2xl font-semibold text-gray-800 whitespace-normal break-words">{currentQuestion?.text ?? 'Loading...'}</p>
          )}
           {currentPhase === 'prediction' && gameStyle === 'predict-score' && (
             <p className="text-xl md:text-2xl font-semibold text-indigo-700 whitespace-normal break-words">{predictionPrompt}</p>
           )}
        </div>

        {currentPhase === 'answer' && !hasSubmittedAnswer && (
           <AnswerSelection
             options={currentQuestion.options}
             onSelect={handleAnswerSelect}
             layout="column"
           />
        )}

        {currentPhase === 'prediction' && gameStyle === 'predict-score' && !hasSubmittedPrediction && (
          <AnswerSelection
            options={currentQuestion.options}
            onSelect={handlePredictionSelect}
            layout="column"
          />
        )}
      </GameCard>
    </div>
  );
};

export default HotTakes;
