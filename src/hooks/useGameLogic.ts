
import { useState } from 'react';
import { GameQuestion, Answer, Prediction, RoundResult, Player, GameStyle } from '@/types/game';
import { useToast } from '@/components/ui/use-toast';

interface UseGameLogicProps {
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  answerSubmittedMessage?: string;
  scorePerCorrectPrediction?: number;
  scorePerMatchingAnswer?: number;
  gameStyle: GameStyle;
}

interface GameLogicState {
  currentPhase: 'answer' | 'prediction' | 'results';
  currentPlayerIndex: number;
  answers: Answer[];
  predictions: Prediction[];
  roundResult: RoundResult | null;
}

const useGameLogic = ({
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore,
  answerSubmittedMessage = "All answers submitted!",
  scorePerCorrectPrediction = 2,
  scorePerMatchingAnswer = 1,
  gameStyle = 'prediction'
}: UseGameLogicProps) => {
  const [state, setState] = useState<GameLogicState>({
    currentPhase: 'answer',
    currentPlayerIndex: 0,
    answers: [],
    predictions: [],
    roundResult: null
  });
  const { toast } = useToast();

  const currentPlayer = players[state.currentPlayerIndex];
  const otherPlayer = players[1 - state.currentPlayerIndex]; // Assuming 2 players
  const currentQuestion = questions[currentRound - 1];

  // Handle answer selection
  const handleAnswerSelect = (option: string) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      playerId: currentPlayer.id,
      selectedOption: option
    };

    setState(prev => ({
      ...prev,
      answers: [...prev.answers, newAnswer]
    }));

    if (state.currentPlayerIndex === players.length - 1) {
      // All players have answered
      if (gameStyle === 'reveal-only') {
        // In reveal-only mode, skip prediction phase and go straight to results
        calculateResults(true);
        return;
      }
      
      // In prediction mode, move to prediction phase
      setState(prev => ({
        ...prev,
        currentPlayerIndex: 0,
        currentPhase: 'prediction'
      }));
      toast({
        title: answerSubmittedMessage,
        description: "Now predict what your friend thinks."
      });
    } else {
      // Move to next player
      setState(prev => ({
        ...prev,
        currentPlayerIndex: prev.currentPlayerIndex + 1
      }));
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

    setState(prev => ({
      ...prev,
      predictions: [...prev.predictions, newPrediction]
    }));

    if (state.currentPlayerIndex === players.length - 1) {
      // All players have made predictions, calculate results
      calculateResults();
    } else {
      // Move to next player
      setState(prev => ({
        ...prev,
        currentPlayerIndex: prev.currentPlayerIndex + 1
      }));
    }
  };

  // Calculate round results
  const calculateResults = (skipPredictions: boolean = false) => {
    const result: RoundResult = {
      questionId: currentQuestion.id,
      players: []
    };

    for (const player of players) {
      const playerAnswer = state.answers.find(a => a.playerId === player.id)?.selectedOption || '';
      const prediction = skipPredictions ? '' : state.predictions.find(p => p.predictedForId === player.id)?.predictedOption || '';
      const predictor = players.find(p => p.id !== player.id)!; // For 2 player game

      // Calculate points for correct prediction
      let pointsEarned = 0;
      let isCorrect = false;
      
      if (!skipPredictions) {
        isCorrect = prediction === playerAnswer;
        
        if (isCorrect) {
          pointsEarned += scorePerCorrectPrediction;
          // Update predictor's score
          onUpdateScore(predictor.id, scorePerCorrectPrediction);
        }
      }
      
      // Check if both players gave the same answer (bonus point for both)
      // Only applicable if scorePerMatchingAnswer > 0
      if (scorePerMatchingAnswer > 0) {
        const otherPlayerAnswer = state.answers.find(a => a.playerId !== player.id)?.selectedOption;
        if (playerAnswer === otherPlayerAnswer) {
          pointsEarned += scorePerMatchingAnswer;
          // Add bonus point for matching answers
          onUpdateScore(player.id, scorePerMatchingAnswer);
        }
      }

      result.players.push({
        playerId: player.id,
        answer: playerAnswer,
        prediction: prediction,
        isCorrect: isCorrect,
        pointsEarned: pointsEarned
      });
    }

    setState(prev => ({
      ...prev,
      roundResult: result,
      currentPhase: 'results'
    }));
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
      setState({
        currentPhase: 'answer',
        currentPlayerIndex: 0,
        answers: [],
        predictions: [],
        roundResult: null
      });
    }
  };

  // Return player names by ID for the result component
  const getPlayerNameMap = (): Record<string, string> => {
    return players.reduce((acc, player) => {
      acc[player.id] = player.nickname;
      return acc;
    }, {} as Record<string, string>);
  };

  return {
    currentPhase: state.currentPhase,
    currentPlayerIndex: state.currentPlayerIndex,
    currentPlayer,
    otherPlayer,
    currentQuestion,
    roundResult: state.roundResult,
    handleAnswerSelect,
    handlePredictionSelect,
    handleContinue,
    getPlayerNameMap
  };
};

export default useGameLogic;
