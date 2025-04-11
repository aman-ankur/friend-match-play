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
        <p className="text-center text-gray-600 mb-6 text-lg italic">
          {questionText}
        </p>
        <div className="space-y-6">
          {result.players.map((playerResult) => {
            const playerName = playerNames?.[playerResult.playerId] || playerResult.playerId;
            
            const otherPlayerResult = result.players.find(p => p.playerId !== playerResult.playerId);
            
            const otherPlayerName = otherPlayerResult ? (playerNames?.[otherPlayerResult.playerId] || otherPlayerResult.playerId) : "Unknown";
            
            return (
              <div key={playerResult.playerId} className="border-b border-connection-light pb-6 last:border-b-0">
                <div className="mb-4">
                  <h3 className="font-medium text-lg">
                    {playerName}'s Answer:
                  </h3>
                  <p className="text-xl mt-1 font-bold text-connection-tertiary">
                    {playerResult.answer || <span className="text-gray-400 italic">No answer</span>}
                  </p>
                </div>
                
                {showPredictions && otherPlayerResult && (
                  <div className="mt-4 flex items-start gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {`${otherPlayerName}'s prediction:`}
                      </p>
                      <p className="font-medium">
                        {otherPlayerResult.prediction || <span className="text-gray-400 italic">No prediction</span>}
                      </p>
                    </div>
                    
                    <div className="flex-1 text-right">
                       {otherPlayerResult.isCorrect !== undefined ? (
                         otherPlayerResult.isCorrect ? (
                           <div className="inline-flex items-center gap-1 bg-green-100 px-2 py-1 rounded-md text-green-700">
                             <Check size={16} />
                             <span className="font-medium">Predicted Correctly!</span> 
                           </div>
                         ) : (
                           <div className="inline-flex items-center gap-1 bg-red-100 px-2 py-1 rounded-md text-red-700">
                             <X size={16} />
                             <span>Predicted Incorrectly</span>
                           </div>
                         )
                       ) : ( <span className="text-xs text-gray-400">Prediction N/A</span> )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-6">
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
