import { useState, useEffect, useCallback } from 'react';
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
    hasClickedContinue: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    console.log(`[useGameLogic] Round changed to ${currentRound}. Resetting local state.`);
    setState(prev => ({
      ...prev,
      currentPhase: prev.currentPhase === 'results' ? 'results' : 'answer',
      answers: {},
      predictions: {},
      hasSubmittedAnswer: false,
      hasClickedContinue: false,
    }));
    if (state.currentPhase === 'results') {
        const timer = setTimeout(() => {
            setState(prev => ({ ...prev, roundResult: null, currentPhase: 'answer' }));
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [currentRound]);

  const currentQuestion = questions[currentRound - 1];

  useEffect(() => {
    if (!socket) return;

    const handleRoundResults = (data: { round: number; answers: Record<string, string>; }) => {
      if (data.round === currentRound) {
        console.log(`[useGameLogic] Received roundResults for round ${data.round}:`, data.answers);
        
        const formattedResult: RoundResult = {
          questionId: currentQuestion?.id ?? 'unknown',
          players: players.map(p => ({
            playerId: p.id,
            answer: data.answers[p.id] || '',
            prediction: '',
            isCorrect: false,
            pointsEarned: 0
          }))
        };

        setState(prev => ({
          ...prev,
          roundResult: formattedResult,
          currentPhase: 'results',
          hasClickedContinue: false
        }));
      }
    };

    const handleNewRound = (data: { currentRound: number }) => {
      console.log(`[useGameLogic] Received newRound event: ${data.currentRound}`);
    };

    const handleGameOver = (data: { finalScores: Record<string, number> }) => {
      console.log('[useGameLogic] Received gameOver event:', data.finalScores);
      onComplete(data.finalScores);
    };

    socket.on('roundResults', handleRoundResults);
    socket.on('newRound', handleNewRound);
    socket.on('gameOver', handleGameOver);

    return () => {
      socket.off('roundResults', handleRoundResults);
      socket.off('newRound', handleNewRound);
      socket.off('gameOver', handleGameOver);
    };
  }, [socket, currentRound, currentQuestion?.id, players, onComplete]);

  const handleAnswerSelect = useCallback((option: string) => {
    if (!socket || !currentQuestion || !currentPlayerId || state.hasSubmittedAnswer) {
      return;
    }

    console.log(`[useGameLogic] Emitting submitAnswer: ${option}`);
    socket.emit('submitAnswer', { roomId, answer: option });

    setState(prev => ({
      ...prev,
      hasSubmittedAnswer: true,
      currentPhase: 'waiting'
    }));
  }, [socket, roomId, currentQuestion, currentPlayerId, state.hasSubmittedAnswer]);

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
    currentPlayer: players.find(p => p.id === currentPlayerId),
    currentQuestion,
    roundResult: state.roundResult,
    hasSubmittedAnswer: state.hasSubmittedAnswer,
    hasClickedContinue: state.hasClickedContinue,
    handleAnswerSelect,
    handleContinue,
    getPlayerNameMap,
    answers: state.answers,
  };
};

export default useGameLogic;
