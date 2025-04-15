import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import GameCard from './GameCard';
import { RoundResult } from '@/types/game';
import { Check, X, Share2, Download } from 'lucide-react';

interface RoundSummaryProps {
  result: RoundResult;
  playerNames: Record<string, string>;
  onContinue: () => void;
  hasClickedContinue: boolean;
  questionText: string;
  showPredictions?: boolean;
}

const RoundSummary: React.FC<RoundSummaryProps> = ({
  result,
  playerNames,
  onContinue,
  hasClickedContinue,
  questionText,
  showPredictions = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  // Track whether continue was clicked in this component
  const continueBtnClicked = useRef(false);

  // Animation trigger on mount
  useEffect(() => {
    // Small delay to ensure the component is mounted before animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // If hasClickedContinue changes to true from parent, track it
  useEffect(() => {
    if (hasClickedContinue) {
      continueBtnClicked.current = true;
    }
  }, [hasClickedContinue]);

  // Safety check
  if (!result || !result.players || result.players.length === 0) {
    console.error('[RoundSummary] Received invalid result prop:', result);
    return (
      <div className="w-full max-w-2xl mx-auto">
        <GameCard title="Round Summary">
          <p className="text-center text-red-500">Error loading summary.</p>
        </GameCard>
      </div>
    );
  }

  const handleContinueClick = () => {
    // Only call onContinue if not already clicked
    if (!continueBtnClicked.current && !hasClickedContinue) {
      console.log('[RoundSummary] Continue button clicked, calling parent handler');
      continueBtnClicked.current = true; // Mark as clicked locally
      onContinue();
    } else {
      console.log('[RoundSummary] Continue already clicked, ignoring');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        id="round-summary-card"
        className={`
          transform transition-all duration-500 ease-out
          ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} 
        `}
      >
        <GameCard title="Round Summary">
          <div className="p-4">
            <h3 className="text-xl font-bold text-center text-connection-primary mb-4">Question</h3>
            <p className="text-center text-gray-700 mb-6 text-lg font-medium italic border-b pb-3 whitespace-normal break-words">
              {questionText}
            </p>
            
            <h3 className="text-xl font-bold text-center text-connection-primary mb-4 mt-6">Answers</h3>
            <div className="space-y-4">
              {result.players.map((playerResult) => {
                const playerName = playerNames?.[playerResult.playerId] || `Player ${playerResult.playerId.substring(0, 4)}`;
                const otherPlayerResult = result.players.find(p => p.playerId !== playerResult.playerId);
                const otherPlayerName = otherPlayerResult 
                  ? (playerNames?.[otherPlayerResult.playerId] || `Player ${otherPlayerResult.playerId.substring(0, 4)}`)
                  : "Opponent";

                return (
                  <div key={playerResult.playerId} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <h3 className="font-semibold text-lg text-connection-primary mb-3 border-b pb-2">
                      {playerName}
                    </h3>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-500">Answer:</p>
                      <p className="text-xl font-semibold text-connection-tertiary ml-2 mt-1">
                        {playerResult.answer || <span className="text-gray-400 italic text-base">No answer</span>}
                      </p>
                    </div>

                    {showPredictions && playerResult.prediction && (
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
            
            {/* Save/Share buttons - placeholder for future functionality */}
            <div className="flex justify-center space-x-4 mt-6 mb-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={true} // Will be implemented in future phase
                className="flex items-center gap-2"
              >
                <Download size={16} /> Save
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={true} // Will be implemented in future phase
                className="flex items-center gap-2"
              >
                <Share2 size={16} /> Share
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <Button 
                onClick={handleContinueClick} 
                className="bg-connection-primary hover:bg-connection-secondary"
                disabled={hasClickedContinue}
              >
                {hasClickedContinue ? "Waiting for opponent..." : "Continue"}
              </Button>
            </div>
          </div>
        </GameCard>
      </div>
    </div>
  );
};

export default RoundSummary; 