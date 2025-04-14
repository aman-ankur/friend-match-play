import React from 'react';
import { Button } from '@/components/ui/button';
import GameCard from './GameCard';
import { RoundResult } from '@/types/game';
import { Check, X } from 'lucide-react';

interface ResultComparisonProps {
  result: RoundResult;
  playerNames: Record<string, string>;
  onContinue: () => void;
  showPredictions?: boolean;
  hasClickedContinue?: boolean;
  questionText: string;
}

const ResultComparison: React.FC<ResultComparisonProps> = ({ 
  result, 
  playerNames,
  onContinue,
  showPredictions = true,
  hasClickedContinue = false,
  questionText
}) => {

  // Safety check
  if (!result || !result.players || result.players.length === 0) {
    console.error('[ResultComparison] Received invalid result prop:', result);
    return (
      <div className="w-full max-w-2xl mx-auto">
        <GameCard title="Results">
           <p className="text-center text-red-500">Error loading results.</p>
        </GameCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      <GameCard title={showPredictions ? "Round Results & Predictions" : "Answer Reveal"}>
        <p className="text-center text-gray-700 mb-6 text-lg font-medium italic border-b pb-3 whitespace-normal break-words">
          {questionText}
        </p>
        <div className="space-y-4">
          {result.players.map((playerResult) => {
            const playerName = playerNames?.[playerResult.playerId] || `Player ${playerResult.playerId.substring(0, 4)}`;
            const otherPlayerResult = result.players.find(p => p.playerId !== playerResult.playerId);
            const otherPlayerName = otherPlayerResult ? (playerNames?.[otherPlayerResult.playerId] || `Player ${otherPlayerResult.playerId.substring(0, 4)}`) : "Opponent";

            return (
              <div key={playerResult.playerId} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h3 className="font-semibold text-lg text-connection-primary mb-3 border-b pb-2">
                  {playerName}'s Results
                </h3>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500">Answer:</p>
                  <p className="text-xl font-semibold text-connection-tertiary ml-2 mt-1">
                    {playerResult.answer || <span className="text-gray-400 italic text-base">No answer</span>}
                  </p>
                </div>

                {showPredictions && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500">
                      Prediction (for {otherPlayerName}):
                    </p>
                    <div className="flex justify-between items-center mt-1 ml-2">
                      <p className="text-lg font-semibold text-gray-700">
                        {playerResult.prediction || <span className="text-gray-400 italic text-base">No prediction</span>}
                      </p>
                      {playerResult.isCorrect !== undefined ? (
                        playerResult.isCorrect ? (
                          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                            <Check size={14} strokeWidth={3} /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">
                            <X size={14} strokeWidth={3} /> Incorrect
                          </span>
                        )
                      ) : (
                        <span className="text-xs text-gray-400 italic">N/A</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={onContinue} 
            className="bg-connection-primary hover:bg-connection-secondary"
            disabled={hasClickedContinue}
          >
            {hasClickedContinue ? "Waiting for opponent..." : "Continue"}
          </Button>
        </div>
      </GameCard>
    </div>
  );
};

export default ResultComparison;
