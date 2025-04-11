import { useState, useEffect } from 'react';
import { GameQuestion, Answer, Prediction, RoundResult, Player, GameStyle } from '@/types/game';
import { useToast } from '@/components/ui/use-toast';

interface UseGameLogicProps {
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  onNextRound: () => void;
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
  onNextRound,
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

  // Validate inputs
  useEffect(() => {
    if (!questions || questions.length === 0) {
      console.error('No questions provided to useGameLogic');
      return;
    }
    if (!players || players.length === 0) {
      console.error('No players provided to useGameLogic');
      return;
    }
    if (currentRound < 1 || currentRound > totalRounds) {
      console.error('Invalid currentRound or totalRounds');
      return;
    }
  }, [questions, players, currentRound, totalRounds]);

  const currentPlayer = players[state.currentPlayerIndex];
  const otherPlayer = players[1 - state.currentPlayerIndex]; // Assuming 2 players
  const currentQuestion = questions[currentRound - 1];

  // Handle answer selection
  const handleAnswerSelect = (option: string) => {
    if (!currentQuestion || !currentPlayer) {
      console.error('Cannot handle answer selection: currentQuestion or currentPlayer is undefined');
      return;
    }

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
    if (!currentQuestion || !currentPlayer || !otherPlayer) {
      console.error('Cannot handle prediction selection: currentQuestion, currentPlayer, or otherPlayer is undefined');
      return;
    }

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
    if (!currentQuestion) {
      console.error('Cannot calculate results: currentQuestion is undefined');
      return;
    }

    const result: RoundResult = {
      questionId: currentQuestion.id,
      players: []
    };

    // First, collect all answers
    const allAnswers = state.answers;
    
    // Process each player's results
    for (const player of players) {
      const playerAnswer = allAnswers.find(a => a.playerId === player.id)?.selectedOption || '';
      
      // In reveal-only mode, we don't need predictions
      if (skipPredictions || gameStyle === 'reveal-only') {
        result.players.push({
          playerId: player.id,
          answer: playerAnswer,
          prediction: '',
          isCorrect: false,
          pointsEarned: 0
        });
        continue;
      }
      
      // Handle prediction mode
      const prediction = state.predictions.find(p => p.predictedForId === player.id)?.predictedOption || '';
      const predictor = players.find(p => p.id !== player.id)!; // For 2 player game

      // Calculate points for correct prediction
      let pointsEarned = 0;
      const isCorrect = prediction === playerAnswer;
      
      if (isCorrect) {
        pointsEarned = scorePerCorrectPrediction;
        onUpdateScore(predictor.id, scorePerCorrectPrediction);
      }
      
      // Check if both players gave the same answer (bonus point for both)
      if (scorePerMatchingAnswer > 0) {
        const otherPlayerAnswer = allAnswers.find(a => a.playerId !== player.id)?.selectedOption;
        if (playerAnswer === otherPlayerAnswer) {
          pointsEarned += scorePerMatchingAnswer;
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
    console.log(`[useGameLogic] handleContinue called. Current round prop: ${currentRound}, Total rounds: ${totalRounds}`);
    if (currentRound === totalRounds) {
      console.log('[useGameLogic] Game complete.');
      // Game is complete
      const finalScores = players.reduce((acc, player) => {
        acc[player.id] = player.score;
        return acc;
      }, {} as Record<string, number>);
      
      onComplete(finalScores);
    } else {
      console.log('[useGameLogic] Resetting state for next round.');
      // Reset for next round
      setState({
        currentPhase: 'answer',
        currentPlayerIndex: 0,
        answers: [],
        predictions: [],
        roundResult: null
      });
      console.log('[useGameLogic] Calling onNextRound...');
      onNextRound();
      console.log('[useGameLogic] onNextRound called.');
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
