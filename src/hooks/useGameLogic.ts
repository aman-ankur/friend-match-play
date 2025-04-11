import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameQuestion, Answer, Prediction, RoundResult, Player, GameStyle } from '@/types/game';
import { useToast } from '@/components/ui/use-toast';
import { useSocket } from '@/context/SocketContext';

interface UseGameLogicProps {
  roomId: string;
  players: Player[];
  questions: GameQuestion[];
  currentRound: number;
  totalRounds: number;
  onComplete: (finalScores: Record<string, number>) => void;
  onUpdateScore: (playerId: string, pointsAdded: number) => void;
  onNextRound: () => void;
  gameStyle: GameStyle;
  currentPlayerId: string | null;
}

interface GameLogicState {
  currentPhase: 'answer' | 'prediction' | 'results' | 'waiting';
  answers: Record<string, string>;
  predictions: Record<string, string>;
  roundResult: RoundResult | null;
  hasSubmittedAnswer: boolean;
  hasSubmittedPrediction: boolean;
  hasClickedContinue: boolean;
}

const useGameLogic = ({
  roomId,
  players,
  questions,
  currentRound,
  totalRounds,
  onComplete,
  onUpdateScore,
  onNextRound,
  gameStyle,
  currentPlayerId
}: UseGameLogicProps) => {
  const { socket } = useSocket();
  const [state, setState] = useState<GameLogicState>({
    currentPhase: 'answer',
    answers: {},
    predictions: {},
    roundResult: null,
    hasSubmittedAnswer: false,
    hasSubmittedPrediction: false,
    hasClickedContinue: false,
  });
  const { toast } = useToast();

  const { currentPlayer, otherPlayer } = useMemo(() => {
    const current = players.find(p => p.id === currentPlayerId);
    const other = players.length === 2 ? players.find(p => p.id !== currentPlayerId) : undefined;
    console.log('[useGameLogic] Recalculated players:', { currentPlayerId, current, other });
    return { currentPlayer: current, otherPlayer: other };
  }, [players, currentPlayerId]);

  useEffect(() => {
    console.log(`[useGameLogic] Round changed to ${currentRound}. Resetting local state.`);
    setState(prev => ({
      ...prev,
      currentPhase: prev.currentPhase === 'results' ? 'answer' : prev.currentPhase,
      answers: {},
      predictions: {},
      roundResult: null,
      hasSubmittedAnswer: false,
      hasSubmittedPrediction: false,
      hasClickedContinue: false,
    }));
  }, [currentRound]);

  const currentQuestion = questions[currentRound - 1];

  useEffect(() => {
    if (!socket || !currentQuestion) return;

    const handleRoundResults = (data: {
      round: number;
      results: RoundResult;
    }) => {
      if (data.round === currentRound) {
        console.log(`[useGameLogic] Received roundResults for round ${data.round}:`, data.results);
        setState(prev => ({
          ...prev,
          roundResult: data.results,
          currentPhase: 'results',
          hasClickedContinue: false
        }));
        data.results.players.forEach(playerResult => {
          if (playerResult.pointsEarned > 0) {
            onUpdateScore(playerResult.playerId, playerResult.pointsEarned);
          }
        });
      }
    };
    
    const handlePredictionPhase = (data: { round: number }) => {
        if (data.round === currentRound && gameStyle === 'prediction') {
            console.log(`[useGameLogic] Received predictionPhase for round ${data.round}`);
            setState(prev => ({
                ...prev,
                currentPhase: 'prediction',
                hasSubmittedAnswer: false,
                hasSubmittedPrediction: false
            }));
        }
    };

    const handleNewRound = (data: { currentRound: number }) => {
      console.log(`[useGameLogic] Received newRound event: ${data.currentRound}`);
      onNextRound();
    };

    const handleGameOver = (data: { finalScores: Record<string, number> }) => {
      console.log('[useGameLogic] Received gameOver event:', data.finalScores);
      onComplete(data.finalScores);
    };

    socket.on('roundResults', handleRoundResults);
    socket.on('predictionPhase', handlePredictionPhase);
    socket.on('newRound', handleNewRound);
    socket.on('gameOver', handleGameOver);

    return () => {
      socket.off('roundResults', handleRoundResults);
      socket.off('predictionPhase', handlePredictionPhase);
      socket.off('newRound', handleNewRound);
      socket.off('gameOver', handleGameOver);
    };
  }, [socket, currentRound, currentQuestion, players, onComplete, onUpdateScore, onNextRound, gameStyle]);

  const handleAnswerSelect = useCallback((option: string) => {
    if (!socket || !currentQuestion || !currentPlayerId || state.hasSubmittedAnswer || state.currentPhase !== 'answer') {
      return;
    }

    console.log(`[useGameLogic] Emitting submitAnswer: ${option}`);
    socket.emit('submitAnswer', { roomId, answer: option });

    setState(prev => ({
      ...prev,
      hasSubmittedAnswer: true,
      answers: { ...prev.answers, [currentPlayerId]: option },
      currentPhase: 'waiting'
    }));
  }, [socket, roomId, currentQuestion, currentPlayerId, state.hasSubmittedAnswer, state.currentPhase]);
  
  const handlePredictionSelect = useCallback((option: string) => {
    console.log('[useGameLogic] handlePredictionSelect called. Current State:', {
      phase: state.currentPhase,
      submittedAnswer: state.hasSubmittedAnswer,
      submittedPrediction: state.hasSubmittedPrediction,
      currentQ: !!currentQuestion,
      socket: !!socket,
      cpId: currentPlayerId,
      op: !!otherPlayer
    });
    
    if (!socket || !currentQuestion || !currentPlayerId || !otherPlayer || state.hasSubmittedPrediction) {
      console.warn('[useGameLogic] Prediction blocked:', { 
        socket: !!socket, 
        currentQuestion: !!currentQuestion, 
        currentPlayerId, 
        otherPlayer: !!otherPlayer, 
        submittedPrediction: state.hasSubmittedPrediction,
        phase: state.currentPhase 
      });
      return;
    }

    console.log(`[useGameLogic] Emitting submitPrediction for ${otherPlayer.id}: ${option}`);
    socket.emit('submitPrediction', { 
        roomId, 
        prediction: option,
        predictedPlayerId: otherPlayer.id
    });

    setState(prev => ({
      ...prev,
      hasSubmittedPrediction: true,
      predictions: { ...prev.predictions, [currentPlayerId]: option },
    }));
  }, [socket, roomId, currentQuestion, currentPlayerId, otherPlayer, state.hasSubmittedPrediction]);

  const handleContinue = useCallback(() => {
    if (state.currentPhase === 'results' && !state.hasClickedContinue && socket) {
      console.log('[useGameLogic] handleContinue emitting playerReady...');
      socket.emit('playerReady', { roomId });
      setState(prev => ({
        ...prev,
        hasClickedContinue: true,
      }));
    }
  }, [state.currentPhase, state.hasClickedContinue, socket, roomId]);

  const getPlayerNameMap = useCallback((): Record<string, string> => {
    return players.reduce((acc, player) => {
      acc[player.id] = player.nickname;
      return acc;
    }, {} as Record<string, string>);
  }, [players]);

  return {
    currentPhase: state.currentPhase,
    currentPlayer,
    otherPlayer,
    currentQuestion,
    roundResult: state.roundResult,
    hasSubmittedAnswer: state.hasSubmittedAnswer,
    hasSubmittedPrediction: state.hasSubmittedPrediction,
    hasClickedContinue: state.hasClickedContinue,
    handleAnswerSelect,
    handlePredictionSelect,
    handleContinue,
    getPlayerNameMap,
    answers: state.answers,
    predictions: state.predictions,
  };
};

export default useGameLogic;
