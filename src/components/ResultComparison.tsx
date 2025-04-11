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
}

const ResultComparison: React.FC<ResultComparisonProps> = ({ 
  result, 
  playerNames, 
  onContinue,
  showPredictions = true
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-scale-in">
      <GameCard title={showPredictions ? "Round Results & Predictions" : "Answer Reveal"}>
        <div className="space-y-6">
          {result.players.map((playerResult, index) => {
            const playerName = playerNames[playerResult.playerId] || `Player ${index + 1}`;
            console.log(`[ResultComparison] Player ${index}:`, playerResult, `showPredictions: ${showPredictions}`);
            
            return (
              <div key={playerResult.playerId} className="border-b pb-6 last:border-b-0">
                <div className="mb-4">
                  <h3 className="font-medium text-lg">
                    {playerName}'s Answer:
                  </h3>
                  <p className="text-xl mt-1 font-bold text-connection-tertiary">
                    {playerResult.answer ? playerResult.answer : <span className="text-gray-400 italic">No answer recorded</span>}
                  </p>
                </div>
                
                {showPredictions && (
                  <div className="mt-4 flex items-start gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {Object.keys(playerNames).find(id => id !== playerResult.playerId) 
                          ? playerNames[Object.keys(playerNames).find(id => id !== playerResult.playerId)!] 
                          : 'Friend'}'s prediction:
                      </p>
                      <p className="font-medium">
                        {playerResult.prediction ? playerResult.prediction : <span className="text-gray-400 italic">No prediction</span>}
                      </p>
                    </div>
                    
                    <div className="flex-1 text-right">
                      {playerResult.isCorrect ? (
                        <div className="inline-flex items-center gap-1 bg-green-100 px-2 py-1 rounded-md text-green-700">
                          <Check size={16} />
                          <span className="font-medium">Correct! +{playerResult.pointsEarned ?? 0} pts</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 bg-red-100 px-2 py-1 rounded-md text-red-700">
                          <X size={16} />
                          <span>Incorrect</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-6">
          <Button onClick={onContinue} className="bg-connection-primary hover:bg-connection-secondary">
            Continue
          </Button>
        </div>
      </GameCard>
    </div>
  );
};

export default ResultComparison;
