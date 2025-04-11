
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, Answer, Prediction, RoundResult, Player } from '@/types/game';
import GameCard from './GameCard';
import ResultComparison from './ResultComparison';
import { useToast } from '@/components/ui/use-toast';

interface ThisOrThatProps {
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
}

const ThisOrThat: React.FC<ThisOrThatProps> = ({
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore
}) => {
  const [currentPhase, setCurrentPhase] = useState<'answer' | 'prediction' | 'results'>('answer');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const { toast } = useToast();

  const currentPlayer = players[currentPlayerIndex];
  const otherPlayer = players[1 - currentPlayerIndex]; // Assuming 2 players
  const currentQuestion = questions[currentRound - 1];

  // Handle answer selection
  const handleAnswerSelect = (option: string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      playerId: currentPlayer.id,
      selectedOption: option
    };

    setAnswers((prev) => [...prev, newAnswer]);

    if (currentPlayerIndex === players.length - 1) {
      // All players have answered, move to prediction phase
      setCurrentPlayerIndex(0);
      setCurrentPhase('prediction');
      toast({
        title: "Choices made!",
        description: "Now guess what your friend chose."
      });
    } else {
      // Move to next player
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  // Handle prediction selection
  const handlePredictionSelect = (option: string) => {
    const newPrediction: Prediction = {
      questionId: currentQuestion.id,
      predictorId: currentPlayer.id,
      predictedForId: otherPlayer.id,
      predictedOption: option
    };

    setPredictions((prev) => [...prev, newPrediction]);

    if (currentPlayerIndex === players.length - 1) {
      // All players have made predictions, calculate results
      calculateResults();
    } else {
      // Move to next player
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  // Calculate round results
  const calculateResults = () => {
    const result: RoundResult = {
      questionId: currentQuestion.id,
      players: []
    };

    for (const player of players) {
      const playerAnswer = answers.find(a => a.playerId === player.id)?.selectedOption || '';
      const prediction = predictions.find(p => p.predictedForId === player.id)?.predictedOption || '';
      const predictor = players.find(p => p.id !== player.id)!; // For 2 player game

      // Calculate points - 2 for correct prediction
      let pointsEarned = 0;
      const isCorrect = prediction === playerAnswer;
      
      if (isCorrect) {
        pointsEarned += 2;
        // Update predictor's score
        onUpdateScore(predictor.id, 2);
      }

      result.players.push({
        playerId: player.id,
        answer: playerAnswer,
        prediction: prediction,
        isCorrect: isCorrect,
        pointsEarned: pointsEarned
      });
    }

    setRoundResult(result);
    setCurrentPhase('results');
  };

  // Handle continuing to next round
  const handleContinue = () => {
    if (currentRound === totalRounds) {
      // Game is complete
      const finalScores = players.reduce((acc, player) => {
        acc[player.id] = player.score;
        return acc;
      }, {} as Record<string, number>);
      
      onComplete(finalScores);
    } else {
      // Reset for next round
      setCurrentPhase('answer');
      setCurrentPlayerIndex(0);
    }
  };

  // Return player names by ID for the result component
  const getPlayerNameMap = (): Record<string, string> => {
    return players.reduce((acc, player) => {
      acc[player.id] = player.nickname;
      return acc;
    }, {} as Record<string, string>);
  };

  // Render different phases
  if (currentPhase === 'results' && roundResult) {
    return (
      <ResultComparison 
        result={roundResult} 
        playerNames={getPlayerNameMap()} 
        onContinue={handleContinue} 
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 text-center">
        <div className="text-sm font-medium text-connection-secondary mb-1">
          Round {currentRound} of {totalRounds}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-connection-tertiary">
          {currentPhase === 'answer' ? "This or That?" : "Predict their choice"}
        </h2>
        <p className="text-gray-600 mt-1">
          {currentPhase === 'answer' 
            ? `${currentPlayer.nickname}, make your choice` 
            : `${currentPlayer.nickname}, predict what ${otherPlayer.nickname} chose`}
        </p>
      </div>

      <GameCard>
        <div className="text-xl font-medium text-center mb-6">
          {currentQuestion.text}
        </div>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-6 h-auto text-left justify-center text-center hover:bg-connection-light hover:text-connection-tertiary transition-all border-connection-light"
              onClick={() => 
                currentPhase === 'answer' 
                  ? handleAnswerSelect(option) 
                  : handlePredictionSelect(option)
              }
            >
              <span className="text-md">{option}</span>
            </Button>
          ))}
        </div>
      </GameCard>
    </div>
  );
};

export default ThisOrThat;
