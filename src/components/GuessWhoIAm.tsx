import React from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Player, GameStyle } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import useGameLogic from '@/hooks/useGameLogic';
import AnswerSelection from './AnswerSelection';

// Helper for detecting if we're in development mode (works in Vite)
const isDevelopment = import.meta.env.DEV || (typeof import.meta.env === 'undefined' && window.location.hostname === 'localhost');

interface GuessWhoIAmProps {
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

const GuessWhoIAm: React.FC<GuessWhoIAmProps> = ({
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
  console.log(`[GuessWhoIAm] Rendering. Round: ${currentRound}`);

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
    answers
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

  console.log(`[GuessWhoIAm] Phase: ${currentPhase}, SubmittedAnswer: ${hasSubmittedAnswer}, SubmittedPrediction: ${hasSubmittedPrediction}, GameStyle: ${gameStyle}`);

  // Determine if we should show the waiting state
  const showWaitingAfterAnswer = currentPhase === 'waiting' && !roundResult && !hasSubmittedPrediction;
  const showWaitingAfterPrediction = currentPhase === 'waiting' && hasSubmittedPrediction && !roundResult;
  
  console.log(`[GuessWhoIAm] Show states: waitingAfterAnswer=${showWaitingAfterAnswer}, waitingAfterPrediction=${showWaitingAfterPrediction}, prediction phase=${currentPhase === 'prediction'}`);

  // Determine if we should disable buttons while waiting (generally handled by phase logic now)
  // const isWaitingAfterSubmission = currentPhase === 'waiting' && !roundResult;

  // --- Loading State ---
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
  const predictionPrompt = `Predict ${otherPlayer.nickname}'s Answer`;

  // --- Render Waiting State (After Answer Submission) ---
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
          
          {/* Development-only test button */}
          {isDevelopment && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Developer Testing: Simulate Round Results</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Manually trigger a simulated round results event via socket
                  const socket = (window as any).socket;
                  if (socket) {
                    console.log('[DEV] Sending test roundResults event');
                    // Create a test result with current players
                    const testResult = {
                      questionId: currentQuestion.id,
                      players: players.map(p => ({
                        playerId: p.id,
                        answer: p.id === currentPlayerId ? answers[currentQuestion.id] || 'Test Answer' : 'Their Answer',
                        prediction: gameStyle === 'predict-score' ? 'Test Prediction' : undefined,
                        isCorrect: Math.random() > 0.5,
                        pointsEarned: Math.floor(Math.random() * 10)
                      })),
                      questionText: currentQuestion.text
                    };
                    // Emit to local handlers
                    socket.emit('__test_roundResults', testResult);
                    // Also manually trigger the handler
                    socket.onevent({
                      data: ['roundResults', testResult]
                    });
                  }
                }}
              >
                Test Round Summary
              </Button>
            </div>
          )}
        </div>
      </GameCard>
    );
  }

  // --- Render Waiting State (After Prediction Submission) ---
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

  // --- Render Results Phase ---
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
          showPredictions={gameStyle === 'predict-score'} // Use correct value
          hasClickedContinue={hasClickedContinue}
        />
      </GameCard>
    );
  }

  // --- Render Answer/Prediction Phase ---
  
  // Special case for prediction phase
  if (currentPhase === 'prediction' && gameStyle === 'predict-score' && !hasSubmittedPrediction) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <GameCard
          title={`Round ${currentRound}/${totalRounds} - Prediction Phase`}
          className="w-full max-w-2xl bg-indigo-50 border-indigo-200"
        >
          <div className="text-center mb-4">
            <p className="text-xl md:text-2xl font-semibold text-indigo-700 whitespace-normal break-words">
              {predictionPrompt}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md mb-4 border border-indigo-100">
            <p className="text-gray-700 mb-2"><span className="font-semibold">Question:</span> {currentQuestion?.text}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Your answer:</span> {answers[currentPlayerId!] || "Not available"}</p>
            <p className="text-sm text-indigo-600 font-medium mb-3">Now predict what {otherPlayer.nickname} answered:</p>
          </div>

          <AnswerSelection
            options={currentQuestion.options}
            onSelect={handlePredictionSelect}
            layout="column"
          />
        </GameCard>
      </div>
    );
  }
  
  // Regular answer phase
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <GameCard
        title={cardTitle}
        className="w-full max-w-2xl"
      >
         {/* Header */}
         <div className="text-center mb-6 px-4">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 whitespace-normal break-words">
            {currentQuestion?.text ?? 'Loading...'}
          </p>
        </div>

        {/* Options Grid - Use AnswerSelection Component */}
        {currentPhase === 'answer' && !hasSubmittedAnswer && (
          <AnswerSelection
            options={currentQuestion.options}
            onSelect={handleAnswerSelect}
            layout="column"
          />
        )}
      </GameCard>
    </div>
  );
};

export default GuessWhoIAm;
