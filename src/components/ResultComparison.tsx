
import React from 'react';
import { Card } from '@/components/ui/card';
import { RoundResult } from '@/types/game';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultComparisonProps {
  result: RoundResult;
  playerNames: Record<string, string>;
  onContinue: () => void;
}

const ResultComparison: React.FC<ResultComparisonProps> = ({ 
  result, 
  playerNames,
  onContinue 
}) => {
  return (
    <div className="w-full max-w-lg mx-auto animate-scale-in">
      <Card className="p-6 border-connection-light">
        <h2 className="text-2xl font-bold text-center text-connection-tertiary mb-6">Round Results</h2>
        
        <div className="space-y-6">
          {result.players.map((playerResult) => (
            <div key={playerResult.playerId} className="bg-connection-light bg-opacity-30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">{playerNames[playerResult.playerId]}</h3>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-connection-primary">
                    +{playerResult.pointsEarned} points
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Their answer:</p>
                  <p className="bg-white p-3 rounded border border-connection-light">
                    {playerResult.answer}
                  </p>
                </div>
                
                {playerResult.prediction && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Their prediction:</p>
                    <div className="relative">
                      <p className="bg-white p-3 rounded border border-connection-light">
                        {playerResult.prediction}
                      </p>
                      {playerResult.isCorrect !== undefined && (
                        <div className="absolute -top-2 -right-2">
                          {playerResult.isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-connection-correct" />
                          ) : (
                            <XCircle className="h-6 w-6 text-connection-incorrect" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={onContinue}
            className="bg-connection-primary hover:bg-connection-secondary"
          >
            Continue to Next Round
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResultComparison;
