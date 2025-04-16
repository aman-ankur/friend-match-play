import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home, User, Users, Settings, Clock, ShieldQuestion, UsersRound, Zap, Hourglass } from 'lucide-react';
import { GameQuestion, GameMode as SpecificGameMode, GameStyle, Player } from '@/types/game';
import GuessWhoIAm from './GuessWhoIAm';
import HotTakes from './HotTakes';
import ThisOrThat from './ThisOrThat';
import ResultComparison from './ResultComparison';
import GameCard from './GameCard';
import NSFWSlider from './NSFWSlider';
import { useToast } from '@/components/ui/use-toast';
import TimerWidget from './TimerWidget';
import { cn } from '@/lib/utils';
import { useSocket } from '@/context/SocketContext';
import PinEntryModal from './PinEntryModal';
import ConfirmationModal from './ConfirmationModal';
import RulesOverlay from './RulesOverlay';

// Game descriptions for each mode, moved from the deleted file
const GAME_DESCRIPTIONS: Record<SpecificGameMode, { title: string; description: string }> = {
  "guess-who-i-am": {
    title: "Guess Who I Am",
    description: "Reveal hidden aspects of your personality! Answer personal questions about yourself and discover how well you and your friend truly know each other."
  },
  "hot-takes": {
    title: "Hot Takes",
    description: "Share your stance on controversial topics and see where you stand compared to your friend on hot button issues."
  },
  "this-or-that": {
    title: "This or That",
    description: "Make tough choices between impossible dilemmas and discover how your preferences align (or don't) with your friend's."
  }
};

// Funny content level groups (pairs of numbers share the same description)
const CONTENT_GROUPS = [
  { range: [1, 2], name: "Church Mouse", description: "Won't raise any eyebrows" },
  { range: [3, 4], name: "Slightly Saucy", description: "Might make your aunt blush" },
  { range: [5, 6], name: "Comedy Club", description: "Things your friends say after midnight" },
  { range: [7, 8], name: "Let's Get Weird", description: "Not for the faint of heart" },
  { range: [9, 10], name: "Therapy Material", description: "You might need to talk about this later" }
];

// Define the game mode type locally or import if defined globally
type AppGameMode = 'solo' | '2player';
type RoundTimeLimit = 10 | 20 | 30 | null; // Add type

// Define comprehensive status type
type GameRoomStatus = 'waiting' | 'selecting' | 'style-selecting' | 'rules-display' | 'playing' | 'results' | 'completed';

// Define PlayerResult if not already present (adjust based on actual server structure if needed)
interface PlayerResult {
  playerId: string;
  answer: string;
  prediction?: string;
  predictedPlayerId?: string;
  isCorrect?: boolean;
  pointsEarned: number;
}

// Add a type for the results data
interface ResultsData {
  questionId: string;
  players: PlayerResult[];
  questionText: string;
}

interface GameRoomProps {
  roomId: string;
  playerName: string;
  gameMode: AppGameMode;
  initialPlayersData: Player[] | null; // Receive initial players
  onExitRoom: () => void;
}

const GameRoom: React.FC<GameRoomProps> = ({
  roomId,
  playerName,
  gameMode,
  initialPlayersData,
  onExitRoom
}) => {
  const { socket } = useSocket();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID
  const timerInitializedRef = useRef<boolean>(false);

  // Use socket.id as the source of truth for the current player's ID
  const currentPlayerId = socket?.id || null;

  // Determine initial state based on gameMode AND initialPlayersData
  const getInitialState = () => {
    if (initialPlayersData && initialPlayersData.length > 0) {
      return {
        status: 'selecting' as const, // Use status type
        players: initialPlayersData 
      };
    } else if (gameMode === 'solo') {
      // Use derived currentPlayerId for solo
      return {
         status: 'selecting' as const,
         players: [{ id: currentPlayerId ?? 'solo-player', nickname: playerName, score: 0 }] 
      };
    } else {
      // Use derived currentPlayerId for creator
      return {
        status: 'waiting' as const,
        players: [
          { id: currentPlayerId ?? 'creator-loading', nickname: playerName, score: 0 },
          { id: 'player2_placeholder', nickname: 'Waiting...', score: 0 } 
        ]
      };
    }
  };

  const initialState = getInitialState();
  const [status, setStatus] = useState<GameRoomStatus>(initialState.status); // Use status type
  const [players, setPlayers] = useState<Player[]>(initialState.players);
  const [selectedGameMode, setSelectedGameMode] = useState<SpecificGameMode | null>(null);
  const [selectedGameStyle, setSelectedGameStyle] = useState<GameStyle>('reveal-only'); // Default to reveal-only
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(5);
  const [finalScores, setFinalScores] = useState<Record<string, number> | null>(null);
  const [nsfwLevel, setNsfwLevel] = useState(1);
  // State for the actual duration set by the server
  const [selectedTimerDuration, setSelectedTimerDuration] = useState<number>(0); 
  // State for countdown
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  // Add state for creator's selection before starting
  const [roundTimeLimitSelection, setRoundTimeLimitSelection] = useState<RoundTimeLimit>(null); 
  const [roundResults, setRoundResults] = useState<ResultsData | null>(null);
  const [hasClickedContinueThisRound, setHasClickedContinueThisRound] = useState(false);
  // Add state for exclusive mode
  const [isExclusiveModeActive, setIsExclusiveModeActive] = useState(false);
  // Add state for PIN entry modal
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinEntryMode, setPinEntryMode] = useState<'activate' | 'config'>('activate');
  // Add state for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Determine if the current player is the creator using the derived currentPlayerId
  const isCreator = gameMode === 'solo' || 
                   (players.length > 0 && !!currentPlayerId && players[0]?.id === currentPlayerId);

  const creatorName = isCreator ? 'You' : players[0]?.nickname || 'The Creator';

  // Function to stop the timer safely
  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
      console.log('[GameRoom] Timer interval cleared in stopTimer');
    }
    // Reset timer state completely
    setIsTimerRunning(false);
    timerInitializedRef.current = false;
    // Don't reset timeLeft here, it might be needed for display briefly
  };

  // Effect for handling socket events within the GameRoom
  useEffect(() => {
    if (!socket) return;

    // Listener for when the room is ready (e.g., 2nd player joined)
    const handleRoomReady = (data: { players: Player[] }) => {
      console.log('[GameRoom] Received roomReady event:', data);
      // Update state only if we are currently waiting (prevents overwriting joiner's initial state)
      if (gameMode === '2player' && status === 'waiting') {
          console.log("[GameRoom] Updating state from roomReady event.");
          setPlayers(data.players);
          setStatus('selecting');
          // Optional toast for the creator
          if (data.players[0]?.id === currentPlayerId) { 
              toast({ 
                  title: "Player Joined!", 
                  description: `${data.players[1]?.nickname || 'Someone'} has joined the room.`,
                  duration: 2500,
                  className: "compact-toast"
              });
          }
      } else {
          console.log("[GameRoom] Ignoring roomReady event (already joined or solo).");
      }
    };

    // Listener for when the game actually starts
    const handleGameStarted = (data: { 
        players: Player[];
        gameMode: SpecificGameMode;
        gameStyle: GameStyle;
        nsfwLevel: number;
        timerDuration: number; // This comes from the server
        totalRounds: number;
        questions: GameQuestion[];
        currentRound: number;
        isExclusiveModeActive?: boolean; // Add this field
    }) => {
        console.log('[GameRoom] Received gameStarted event:', data);
        // Log nsfwLevel specifically for debugging
        console.log(`[GameRoom] Received nsfwLevel: ${data.nsfwLevel} (type: ${typeof data.nsfwLevel})`);
        
        stopTimer(); // Stop any previous timer
        setPlayers(data.players);
        setSelectedGameMode(data.gameMode);
        setSelectedGameStyle(data.gameStyle);
        setNsfwLevel(data.nsfwLevel);
        setSelectedTimerDuration(data.timerDuration); // Store the duration
        setTotalRounds(data.totalRounds);
        setQuestions(data.questions);
        setCurrentRound(data.currentRound);
        setIsProcessing(false);
        
        // Set exclusive mode state if it's included in the data
        if (data.isExclusiveModeActive !== undefined) {
          setIsExclusiveModeActive(data.isExclusiveModeActive);
        }
        
        // Show rules overlay to Player 2, but not to the Creator or in solo mode
        if (!isCreator && gameMode as string !== 'solo') {
          setStatus('rules-display');
        } else {
          setStatus('playing');
        }
        
        // --- Debugging Log --- 
        console.log(`[GameRoom] State AFTER set in handleGameStarted:`, { 
            status: isCreator || gameMode as string === 'solo' ? 'playing' : 'rules-display',
            selectedGameMode: data.gameMode,
            selectedGameStyle: data.gameStyle,
            currentRound: data.currentRound,
            isExclusiveModeActive: data.isExclusiveModeActive,
            nsfwLevel: data.nsfwLevel
        });
        // --- End Debugging Log ---
        
        // Start timer only if we're going directly to playing state
        if (data.timerDuration > 0 && (isCreator || gameMode as string === 'solo')) {
          // Reset initialization for clean start
          timerInitializedRef.current = false;
          
          // Set timer state
          setTimeLeft(data.timerDuration);
          setIsTimerRunning(true);
          console.log(`[GameRoom] Timer started with duration: ${data.timerDuration}, isTimerRunning=true`);
        } else {
          setTimeLeft(null);
          setIsTimerRunning(false);
        }
        
        toast({ 
            title: "Game Started!", 
            description: `Mode: ${data.gameMode}`,
            duration: 2000,
            className: "compact-toast"
        });
    };

    // --- Listener for New Round --- 
    const handleNewRound = (data: { currentRound: number; question: GameQuestion; timerDuration: number; isExclusiveModeActive?: boolean }) => {
        console.log(`[GameRoom] Received newRound event for round: ${data.currentRound}. Setting state.`);
        stopTimer(); // Stop timer for the previous round
        setCurrentRound(data.currentRound);
        setRoundResults(null); // <<< Clear previous results
        setHasClickedContinueThisRound(false); // Reset continue button state
        setStatus('playing'); // <<< Set status back to playing

        // In exclusive mode, we need to update the questions array with the new question
        if (data.isExclusiveModeActive && data.question) {
            // Add the new question to the questions array at the current round index
            setQuestions(prevQuestions => {
                const newQuestions = [...prevQuestions];
                newQuestions[data.currentRound - 1] = data.question;
                return newQuestions;
            });
            console.log(`[GameRoom] Updated questions array with new exclusive question: ${data.question.id}`);
        }

        // Restart timer if a duration is set for the game
        // Use timerDuration from the event data if provided, otherwise fallback to selectedTimerDuration
        const roundDuration = data.timerDuration ?? selectedTimerDuration;
        if (roundDuration > 0) {
            console.log(`[GameRoom] Restarting timer for round ${data.currentRound} with duration ${roundDuration}`);
            setTimeLeft(roundDuration);
            timerInitializedRef.current = false;
            setIsTimerRunning(true); // Ensure timer starts running
        } else {
            setTimeLeft(null); // Ensure timer is explicitly off if duration is 0
            setIsTimerRunning(false);
        }
    };

    // --- Add Listener for Round Complete (both players answered) ---
    const handleRoundComplete = (data: { roundNumber: number }) => {
        console.log(`[GameRoom] Received roundComplete event for round: ${data.roundNumber}. Stopping timer.`);
        stopTimer(); // Stop timer when both players have answered
        setIsTimerRunning(false);
        // Keeping timeLeft value for display purposes, but freezing countdown
        console.log(`[GameRoom] Timer stopped after both players answered`);
    };

    // --- Add Listener for Game Over --- 
    const handleGameOver = (data: { finalScores: Record<string, number> }) => {
        console.log('[GameRoom] Received gameOver event:', data.finalScores);
        stopTimer(); // Stop timer on game over
        setTimeLeft(null); // Clear time left
        setFinalScores(data.finalScores);
        setStatus('completed'); 
    };

    // --- Add Listener for Round Results --- 
    const handleRoundResults = (data: ResultsData) => {
        console.log('[GameRoom] Received roundResults event:', data);
        stopTimer(); // Ensure timer is stopped
        
        // Store the current question's text before we lose it
        const currentQuestionText = 
          questions[currentRound - 1]?.text || 
          "Question text unavailable";
        
        // Store both the results and current question text
        setRoundResults({
          ...data,
          questionText: currentQuestionText // Add the text directly to results
        });
        
        setStatus('results'); // Change status to show results
    };

    // General Error Listener
    const handleErrorEvent = (data: { message: string }) => {
        console.error('[GameRoom] Server error:', data.message);
        toast({
            title: "Error",
            description: data.message || "An server error occurred.",
            variant: "destructive",
            duration: 3500
        });
        setIsProcessing(false); // Reset processing state on ANY error from server
    };

    // Listener for when the other player leaves
    const handlePlayerLeft = (data: { playerId: string; playerName: string }) => {
      console.log('[GameRoom] Received playerLeft event:', data);
       if (gameMode === '2player') {
           stopTimer(); // Stop timer if opponent leaves
           setTimeLeft(null);
           toast({
            title: "Opponent Left",
            description: `${data.playerName} has left the room.`,
            variant: "destructive",
            duration: 3000
          });
          // Update player list, remove the leaving player
          setPlayers(prev => prev.filter(p => p.id !== data.playerId));
          // Reset to selecting state if game was playing
          if (status === 'playing') {
              setStatus('selecting');
              // Reset game-specific states
              setSelectedGameMode(null);
              setSelectedGameStyle('reveal-only');
              setQuestions([]);
              setCurrentRound(1);
              setFinalScores(null);
          }
       }
    };

    socket.on('roomReady', handleRoomReady);
    socket.on('gameStarted', handleGameStarted);
    socket.on('playerLeft', handlePlayerLeft);
    socket.on('error', handleErrorEvent); // Ensure general error listener is active
    socket.on('newRound', handleNewRound); // Add listener
    socket.on('roundComplete', handleRoundComplete); // Add listener for round completion
    socket.on('gameOver', handleGameOver); // Add listener
    socket.on('roundResults', handleRoundResults); // <<< Add listener here

    // Add exclusive mode event listeners
    const handleExclusiveModeActivated = (data: { isExclusiveModeActive: boolean }) => {
      console.log('[GameRoom] Exclusive mode activated');
      setIsExclusiveModeActive(data.isExclusiveModeActive);
      
      // Show toast for all players
      toast({
        title: "Exclusive Mode Activated",
        description: "Exclusive questions mode is now active!",
        duration: 3000
      });
    };
    
    const handleExclusiveModeSuccess = (data: { message: string }) => {
      // Additional feedback just for the creator
      console.log('[GameRoom] Exclusive mode success:', data.message);
      toast({
        title: "PIN Accepted",
        description: data.message,
        variant: "default",
        duration: 2000
      });
    };
    
    const handleExclusiveModeFailed = (data: { message: string }) => {
      console.log('[GameRoom] Exclusive mode failed:', data.message);
      toast({
        title: "PIN Incorrect",
        description: data.message,
        variant: "destructive",
        duration: 3000
      });
    };
    
    socket.on('exclusiveModeActivated', handleExclusiveModeActivated);
    socket.on('exclusiveModeSuccess', handleExclusiveModeSuccess);
    socket.on('exclusiveModeFailed', handleExclusiveModeFailed);

    // Add handler for room reset
    const handleRoomReset = (data: { status: GameRoomStatus, players: Player[] }) => {
      console.log('[GameRoom] Received roomReset event');
      // Only update state if not already in selecting state
      if (status !== 'selecting') {
        setStatus(data.status);
        setPlayers(data.players);
        setSelectedGameMode(null);
        setSelectedGameStyle('reveal-only');
        setQuestions([]);
        setCurrentRound(1);
        setFinalScores(null);
        setIsExclusiveModeActive(false);
        setHasClickedContinueThisRound(false);
        
        toast({
          title: "Room Reset",
          description: "The game room has been reset.",
          duration: 2000
        });
      }
    };
    
    socket.on('roomReset', handleRoomReset);

    // Add listener for player ready event (after rules display)
    const handlePlayerReady = () => {
      console.log('[GameRoom] Player is ready to start after viewing rules');
      setStatus('playing');
      
      // Start timer if it was set for the game
      if (selectedTimerDuration > 0) {
        console.log(`[GameRoom] Starting timer after rules with duration: ${selectedTimerDuration}`);
        setTimeLeft(selectedTimerDuration);
        setIsTimerRunning(true);
      }
    };
    
    socket.on('playerReady', handlePlayerReady);

    // Cleanup listeners and timer interval
    return () => {
      socket.off('roomReady', handleRoomReady);
      socket.off('gameStarted', handleGameStarted);
      socket.off('playerLeft', handlePlayerLeft);
      socket.off('error', handleErrorEvent); // Cleanup general error listener
      socket.off('newRound', handleNewRound); // Cleanup listener
      socket.off('roundComplete', handleRoundComplete); // Cleanup listener
      socket.off('gameOver', handleGameOver); // Cleanup listener
      socket.off('roundResults', handleRoundResults); // <<< Add cleanup here
      
      // Cleanup exclusive mode event listeners
      socket.off('exclusiveModeActivated', handleExclusiveModeActivated);
      socket.off('exclusiveModeSuccess', handleExclusiveModeSuccess);
      socket.off('exclusiveModeFailed', handleExclusiveModeFailed);
      
      // Cleanup room reset listener
      socket.off('roomReset', handleRoomReset);
      socket.off('playerReady', handlePlayerReady);
      
      stopTimer(); // Ensure timer stops on component unmount or effect re-run
    };
    // Add 'status' back to dependency array
  }, [socket, gameMode, status, currentPlayerId, toast, selectedTimerDuration, isCreator]);

  // Effect for Timer Countdown Logic
  useEffect(() => {
    // Log entering timer effect
    console.log(`[GameRoom] Timer effect triggered: isTimerRunning=${isTimerRunning}, timeLeft=${timeLeft}, initialized=${timerInitializedRef.current}`);
    
    // Only start timer if we have time left and timer should be running
    if (timeLeft !== null && timeLeft > 0 && socket) {
      // Always clear any existing timer to prevent duplicates
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      
      console.log(`[GameRoom] Starting timer interval, timeLeft=${timeLeft}`);
      // Mark as initialized
      timerInitializedRef.current = true;
      
      // Force timer to running state when we have valid time
      if (!isTimerRunning && status === 'playing') {
        console.log('[GameRoom] Force setting isTimerRunning to true');
        setIsTimerRunning(true);
      }
      
      // Set up countdown interval
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null || prevTime <= 1) {
            // Clear only the interval, but keep isTimerRunning true for rendering
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            console.log('[GameRoom] Timer expired! Emitting roundTimerExpired.');
            toast({ 
                title: "Time's Up!", 
                description: "Moving to the next round.", 
                duration: 2000,
                className: "compact-toast"
            });
            // Emit event to server indicating time ran out
            socket.emit('roundTimerExpired', { roomId }); 
            return 0; // Set display to 0
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === null || timeLeft <= 0) {
      // Stop the timer if we have no time left
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        console.log('[GameRoom] Timer stopped due to timeLeft being null or 0');
      }
    }

    // Cleanup - only clear the actual interval, not the state
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        console.log('[GameRoom] Timer interval cleared in cleanup');
      }
    };
  }, [socket, roomId, status, timeLeft, toast]);
  
  // Add a separate effect just to handle the timeLeft updates
  // This separates the interval creation from the state updates
  useEffect(() => {
    // Log when timeLeft changes for debugging
    if (timeLeft !== null) {
      console.log(`[GameRoom] timeLeft updated: ${timeLeft}`);
    }
  }, [timeLeft]);

  const handleGameModeSelect = (mode: SpecificGameMode) => {
    // Allow anyone to select the mode visually, but only creator can *start* it
    setSelectedGameMode(mode);
    setSelectedGameStyle('reveal-only');
    setRoundTimeLimitSelection(null);
    setStatus('style-selecting');
  };
  
  // Renamed to reflect it's the creator action
  const handleCreatorStartGame = () => {
    console.log('[GameRoom] handleCreatorStartGame called');
    
    if (!socket) {
        console.error('[GameRoom] Cannot start game: Socket not connected');
        toast({ 
            title: "Error", 
            description: "Not connected to server.", 
            variant: "destructive",
            duration: 3000
        });
        return;
    }
    if (!selectedGameMode) {
        console.error('[GameRoom] Cannot start game: No game mode selected');
        toast({ 
            title: "Error", 
            description: "Please select a game mode.", 
            variant: "destructive",
            duration: 3000 
        });
        return;
    }
    // Validation - Only creator can start
    // Server also validates, but good to prevent unnecessary emits
    if (gameMode === '2player' && !isCreator) {
        console.error('[GameRoom] Cannot start game: Not the creator');
        toast({ 
            title: "Wait", 
            description: "Only the room creator can start the game.", 
            variant: "default",
            duration: 2500
        });
        return;
    }
    
    setIsProcessing(true); // Show loading state on button

    const finalTimerDuration = gameMode === 'solo' ? null : roundTimeLimitSelection;
    
    // Validate nsfwLevel to ensure it's a proper number
    const validatedNsfwLevel = typeof nsfwLevel === 'number' && !isNaN(nsfwLevel)
      ? Math.min(Math.max(Math.round(nsfwLevel), 1), 10) // Clamp between 1-10 and round
      : 1; // Default to level 1 if invalid
    
    console.log(`[GameRoom] Validated nsfwLevel: ${nsfwLevel} → ${validatedNsfwLevel}`);

    const gameSettings = { 
        roomId, 
        gameMode: selectedGameMode, 
        gameStyle: selectedGameStyle, 
        nsfwLevel: validatedNsfwLevel, // Use validated value
        timerDuration: finalTimerDuration, // Send the selected time limit 
        totalRounds,
        isExclusiveModeActive // Include exclusive mode status
    };
    
    console.log('[GameRoom] Emitting startGame with settings:', gameSettings);
    
    socket.emit('startGame', gameSettings);

    // --- Remove client-side state setting - wait for server 'gameStarted' event --- 
    // Server is responsible for question generation and game state management
    // setStatus('playing'); 
  };
  
  const handleGameComplete = (scores: Record<string, number>) => {
    console.log('Game complete! Final scores:', scores);
    // Game completion logic might already be handled by `gameOver` event
    // Ensure timer is stopped if not already
    stopTimer();
    setTimeLeft(null);
    // setFinalScores(scores); // Server should send final scores via gameOver
    // setStatus('completed');
  };
  
  const handlePlayAgain = () => {
    stopTimer(); // Stop timer
    setTimeLeft(null); // Reset time left
    
    // First, send event to server to reset room status from 'completed' to 'selecting'
    if (socket) {
      console.log('[GameRoom] Emitting resetRoom to server');
      socket.emit('resetRoom', { roomId });
      
      // Show feedback to user
      toast({ 
        title: "Setting up new game", 
        description: "Resetting game room...",
        duration: 2000
      });
    }
    
    // Reset client state for a new game selection phase
    setStatus('selecting');
    setSelectedGameMode(null);
    setSelectedGameStyle('reveal-only');
    setRoundTimeLimitSelection(null); // Reset time limit selection
    setQuestions([]);
    setCurrentRound(1);
    setFinalScores(null);
    setIsExclusiveModeActive(false); // Reset exclusive mode state
    setHasClickedContinueThisRound(false);
    
    console.log('[GameRoom] Resetting game state for play again...');
    
    // If joiner, they wait for creator
    if (!isCreator && socket) {
      toast({ 
        title: "Play Again?", 
        description: `Waiting for ${creatorName} to start a new game.`,
        duration: 3000,
        className: "compact-toast"
      });
    }
  };
  
  const handleUpdateScore = (playerId: string, pointsAdded: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, score: player.score + pointsAdded }
          : player
      )
    );
  };
  
  const handleGoHome = () => {
    // Stop any active timer before exiting
    stopTimer(); 
    
    // Simply call the exit callback provided by the parent (Index.tsx)
    // Index.tsx's handleExitRoom is responsible for resetting the necessary state 
    // (roomId, playerName, gameMode, initialPlayersState) which causes GameRoom to unmount.
    console.log('[GameRoom] Exiting room, calling onExitRoom.');
    onExitRoom(); 
    
    // Removed premature state resets from here:
    // setSelectedGameMode(null);
    // setSelectedGameStyle('reveal-only');
    // setQuestions([]);
    // setCurrentRound(1);
    // setPlayers(...);
    // setFinalScores(null);
    // setNsfwLevel(1);
    // setStatus(...);
    // toast(...);
  };

  console.log(`[GameRoom] Rendering. User: ${currentPlayerId}, Creator: ${isCreator}, Status: ${status}, Players:`, players);

  const handleNsfwLevelChange = (level: number) => {
    setNsfwLevel(level);
    // Questions are now fetched from the server when starting the game
  };

  const handleContinueClick = () => {
    // Only emit and set state if the player hasn't already clicked
    if (socket && !hasClickedContinueThisRound) { 
      console.log('[GameRoom] Emitting playerReady');
      socket.emit('playerReady', { roomId });
      setHasClickedContinueThisRound(true); // Set state to true for button display
      // REMOVED: setRoundResults(null); 
      // REMOVED: setStatus('playing');
    }
  };
  
  // Function to handle activating exclusive mode
  const handleActivateExclusiveMode = () => {
    // Check if socket exists
    if (!socket) {
      toast({
        title: "Error",
        description: "Not connected to server.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    // Open the PIN entry modal
    setPinEntryMode(status === 'playing' ? 'activate' : 'config');
    setIsPinModalOpen(true);
  };
  
  // Function to handle PIN submission
  const handlePinSubmit = (pin: string) => {
    console.log('[GameRoom] Attempting to activate exclusive mode');
    setIsPinModalOpen(false);
    
    // If we're in configuration mode, we need to pass the selected game mode
    if (status === 'style-selecting') {
      socket.emit('attemptExclusiveMode', { 
        roomId, 
        pin,
        selectedGameMode: 'this-or-that' // Explicitly set for configuration phase
      });
    } else {
      // During gameplay, the server already knows the game mode
      socket.emit('attemptExclusiveMode', { roomId, pin });
    }
  };

  // Function to handle ending exclusive mode
  const handleEndExclusiveMode = () => {
    if (!socket) {
      toast({
        title: "Error",
        description: "Not connected to server.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    // Open confirmation modal
    setIsConfirmModalOpen(true);
  };
  
  // Function to confirm ending exclusive mode
  const confirmEndExclusiveMode = () => {
    socket.emit('endExclusiveMode', { roomId });
  };

  // Function to handle player continuing after rules display
  const handleRulesContinue = () => {
    if (!socket) return;
    
    console.log('[GameRoom] Player continuing after rules display');
    socket.emit('playerReady', { roomId });
    setStatus('playing');
    
    // Start timer if it was set for the game
    if (selectedTimerDuration > 0) {
      console.log(`[GameRoom] Starting timer after rules with duration: ${selectedTimerDuration}`);
      setTimeLeft(selectedTimerDuration);
      setIsTimerRunning(true);
    }
  };

  const renderHeader = () => {
    const player1 = players[0];
    const player2 = players.length > 1 ? players[1] : null;

    // Add diagnostic log for timer state during render
    console.log(`[GameRoom] renderHeader check: isTimerRunning=${isTimerRunning}, timeLeft=${timeLeft}, selectedTimerDuration=${selectedTimerDuration}`);

    return (
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-connection-light via-white to-connection-light p-4 rounded-lg shadow-sm border border-connection-border">
        <Button variant="outline" size="sm" onClick={handleGoHome} className="border-connection-secondary text-connection-secondary hover:bg-connection-light">
          <Home className="mr-2 h-4 w-4" /> Exit Room
        </Button>
        <div className="flex flex-col items-center">
          <img 
            src="/images/Logo Redesign Image Apr 16 2025.jpeg" 
            alt="Cards Against Maturity Logo" 
            className="h-10 w-auto object-contain mb-1"
          />
          <div className="text-xs text-gray-500">Room Code</div>
          <div className="font-mono text-lg font-semibold tracking-widest text-connection-tertiary">{roomId}</div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Show timer whenever we have valid time, regardless of isTimerRunning */}
          {timeLeft !== null && timeLeft > 0 && selectedTimerDuration > 0 && (
            <TimerWidget 
                timeLeft={timeLeft} 
                totalDuration={selectedTimerDuration} 
            />
          )}
          <div className="flex items-center space-x-2 text-sm text-connection-tertiary">
            <User className="h-4 w-4" />
            <span>{player1?.nickname} ({player1?.score ?? 0})</span>
          </div>
          {gameMode === '2player' && player2 && (
            <div className="flex items-center space-x-2 text-sm text-connection-tertiary">
              <Users className="h-4 w-4" />
              <span>{player2.nickname} ({player2.score ?? 0})</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Game Rendering Logic ---
  // Log state just before rendering game components
  if (status === 'playing') {
    console.log('[GameRoom] Rendering PLAYING state:', {
      roomId,
      currentPlayerId,
      players,
      selectedGameMode,
      currentRound
    });
  }

  const renderGameSelection = () => {
    if (!isCreator && gameMode === '2player') {
      return (
        <GameCard 
          title={`Waiting for ${creatorName} to Choose Game Mode`} 
          description="Hang tight! The game will start soon."
          showLogo={true}
        >
          <p className="text-center text-gray-600 mt-4">Room Code: <span className="font-mono font-semibold">{roomId}</span></p>
        </GameCard>
      );
    }

    return (
      <div className="space-y-8 animate-fade-in">
        <GameCard 
          title="Choose Your Game" 
          description="Select a game mode to play."
          showLogo={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full">
            {(Object.keys(GAME_DESCRIPTIONS) as SpecificGameMode[]).map((mode) => (
              <Button
                key={mode}
                variant={selectedGameMode === mode ? "default" : "outline"}
                onClick={() => handleGameModeSelect(mode)}
                className={cn(
                  "h-auto p-4 flex flex-col items-start text-left transition-all min-w-0 max-w-full overflow-hidden",
                  selectedGameMode === mode ? "bg-connection-primary text-white" : "hover:border-connection-primary hover:bg-connection-light"
                )}
              >
                <div className="w-full flex flex-col h-full min-w-0 max-w-full overflow-hidden">
                  <h3 className="font-semibold text-lg mb-2 whitespace-normal break-words">{GAME_DESCRIPTIONS[mode].title}</h3>
                  <p style={{ wordWrap: 'break-word', hyphens: 'auto' }} className="text-sm text-muted-foreground whitespace-normal w-full">{GAME_DESCRIPTIONS[mode].description}</p>
                </div>
              </Button>
            ))}
          </div>
        </GameCard>
      </div>
    );
  };
  
  const renderStyleAndSettingsSelection = () => {
      if (!selectedGameMode) return null; // Should not happen if status is 'style-selecting'

      if (!isCreator && gameMode === '2player') {
          return (
              <GameCard 
                  title={`Waiting for ${creatorName} to Configure ${GAME_DESCRIPTIONS[selectedGameMode]?.title || 'Game'}`} 
                  description="They are selecting the game style and settings."
                  showLogo={true}
              >
                  <p className="text-center text-gray-600 mt-4">Almost there!</p>
              </GameCard>
          );
      }
      
      // Creator's view
      return (
          <div className="space-y-8 animate-fade-in">
              <GameCard 
                  title={`Configure: ${GAME_DESCRIPTIONS[selectedGameMode]?.title || 'Game'}`} 
                  description="Choose how you want to play."
                  showLogo={true}
              >
                  <div className="space-y-6">
                      {/* Game Style (Prediction Mode) */}
                      <div className="space-y-3">
                          <Label className="text-lg font-medium flex items-center">
                              <ShieldQuestion className="mr-2 h-5 w-5 text-connection-secondary" /> Prediction Mode
                          </Label>
                          <RadioGroup
                              value={selectedGameStyle}
                              onValueChange={(value) => setSelectedGameStyle(value as GameStyle)}
                              className="flex flex-col sm:flex-row gap-4"
                          >
                              <Label htmlFor="style-reveal" className="flex items-center space-x-2 p-4 border rounded-md cursor-pointer hover:border-connection-primary has-[:checked]:border-connection-primary has-[:checked]:bg-connection-light flex-1">
                                  <RadioGroupItem value="reveal-only" id="style-reveal" />
                                  <div>
                                      <span className="font-medium">Reveal Only</span>
                                      <p className="text-sm text-muted-foreground">See answers after both respond. No points.</p>
                                  </div>
                              </Label>
                              <Label htmlFor="style-predict" className="flex items-center space-x-2 p-4 border rounded-md cursor-pointer hover:border-connection-primary has-[:checked]:border-connection-primary has-[:checked]:bg-connection-light flex-1">
                                  <RadioGroupItem value="predict-score" id="style-predict" />
                                  <div>
                                      <span className="font-medium">Predict & Score</span>
                                      <p className="text-sm text-muted-foreground">Guess your friend's answer to score points.</p>
                                  </div>
                              </Label>
                          </RadioGroup>
                      </div>

                      {/* NSFW Level */}
                      <div className="space-y-3">
                         <Label className="text-lg font-medium flex items-center">
                             <Zap className="mr-2 h-5 w-5 text-connection-secondary" /> Spiciness Level
                         </Label>
                          <NSFWSlider value={nsfwLevel} onValueChange={handleNsfwLevelChange} />
                      </div>

                      {/* Exclusive Mode Option - Only for This or That */}
                      {selectedGameMode === 'this-or-that' && (
                          <div className="space-y-3 mt-4 p-4 border border-pink-200 rounded-md bg-pink-50">
                              <Label className="text-lg font-medium flex items-center text-pink-800">
                                  <Zap className="mr-2 h-5 w-5 text-pink-600" /> Exclusive Mode
                              </Label>
                              <div className="flex items-center">
                                  {!isExclusiveModeActive ? (
                                      <Button
                                          variant="outline"
                                          onClick={handleActivateExclusiveMode}
                                          className="bg-white border-pink-300 text-pink-800 hover:bg-pink-100"
                                      >
                                          🔥 Activate Exclusive Mode
                                      </Button>
                                  ) : (
                                      <div className="flex items-center space-x-3">
                                          <div className="flex items-center">
                                              <div className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></div>
                                              <span className="text-pink-800 font-medium">Exclusive Mode Active</span>
                                          </div>
                                          <Button
                                              variant="outline"
                                              onClick={handleEndExclusiveMode}
                                              className="bg-white border-pink-300 text-pink-800 hover:bg-pink-100 ml-2"
                                              size="sm"
                                          >
                                              Deactivate
                                          </Button>
                                      </div>
                                  )}
                              </div>
                              <p className="text-sm text-pink-700">
                                  Activate exclusive mode for spicier questions. Requires a PIN.
                              </p>
                          </div>
                      )}

                      {/* Round Time Limit - Only for 2 Player */}
                      {gameMode === '2player' && (
                          <div className="space-y-3">
                              <Label className="text-lg font-medium flex items-center">
                                  <Hourglass className="mr-2 h-5 w-5 text-connection-secondary" /> Round Time Limit
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                  {[null, 10, 20, 30].map((limit) => (
                                      <Button
                                          key={limit ?? 'none'}
                                          variant={roundTimeLimitSelection === limit ? "default" : "outline"}
                                          onClick={() => setRoundTimeLimitSelection(limit as RoundTimeLimit)}
                                          className={cn(
                                              "flex-1 min-w-[80px] transition-all",
                                              roundTimeLimitSelection === limit
                                                  ? "bg-connection-primary text-white hover:bg-connection-secondary"
                                                  : "border-connection-light text-gray-600 hover:border-connection-primary hover:bg-connection-light"
                                          )}
                                      >
                                          {limit === null ? 'None' : `${limit}s`}
                                      </Button>
                                  ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                  Set a time limit per round for answering. Choose 'None' for unlimited time.
                              </p>
                          </div>
                      )}

                      {/* Start Game Button */}
                      <div className="pt-4">
                          <Button
                              size="lg"
                              onClick={handleCreatorStartGame}
                              disabled={isProcessing}
                              className="w-full bg-connection-primary hover:bg-connection-secondary"
                          >
                              {isProcessing ? 'Starting Game...' : 'Start Game'}
                          </Button>
                      </div>
                  </div>
              </GameCard>
              
              {/* Button to go back to mode selection */}
               <div className="text-center">
                  <Button variant="link" onClick={() => setStatus('selecting')}>Back to Game Modes</Button>
              </div>
          </div>
      );
  };

  const renderGameComponent = () => {
    // --- Debugging Log ---
    console.log(`[GameRoom] Rendering game component. selectedGameMode:`, selectedGameMode);
    // --- End Debugging Log ---

    // Define dummy onComplete function
    const handleGameComplete = () => { /* console.log("Game component reported complete."); */ };

    switch (selectedGameMode) {
      case 'guess-who-i-am':
        return (
          <GuessWhoIAm
            roomId={roomId}
            players={players}
            currentPlayerId={currentPlayerId!} 
            questions={questions}
            currentRound={currentRound}
            totalRounds={totalRounds}
            gameStyle={selectedGameStyle}
            onUpdateScore={handleUpdateScore}
            onComplete={handleGameComplete} // Pass dummy prop
          />
        );
      case 'hot-takes':
        return (
          <HotTakes
            roomId={roomId}
            players={players}
            currentPlayerId={currentPlayerId!} 
            questions={questions}
            currentRound={currentRound}
            totalRounds={totalRounds}
            gameStyle={selectedGameStyle}
            onUpdateScore={handleUpdateScore}
            onComplete={handleGameComplete} // Pass dummy prop
          />
        );
      case 'this-or-that':
        return (
          <div className="relative w-full">
            {/* Exclusive Mode Indicator */}
            {isExclusiveModeActive && (
              <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  Exclusive Mode Active
                </div>
              </div>
            )}
            
            {/* Activate Exclusive Mode Button (only for creator during this-or-that games) */}
            {isCreator && 
             selectedGameMode === 'this-or-that' && 
             status === 'playing' && 
             !isExclusiveModeActive && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleActivateExclusiveMode}
                className="absolute top-2 right-2 z-10 bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200 font-medium"
              >
                🔥 Exclusive Mode
              </Button>
            )}
            
            {/* End Exclusive Mode Button (only for creator when exclusive mode is active) */}
            {isCreator && 
             isExclusiveModeActive && (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleEndExclusiveMode}
                className="absolute top-2 right-2 z-10"
              >
                End Round
              </Button>
            )}
            
            <ThisOrThat
              roomId={roomId}
              players={players}
              currentPlayerId={currentPlayerId!} 
              questions={questions}
              currentRound={currentRound}
              totalRounds={totalRounds}
              gameStyle={selectedGameStyle}
              onUpdateScore={handleUpdateScore}
              onComplete={handleGameComplete}
              isExclusiveModeActive={isExclusiveModeActive}
            />
          </div>
        );
      default:
        return <div>Error: Game mode not recognized.</div>; 
    }
  };

  const renderResults = () => {
    if (!roundResults) return <div>Loading results...</div>; // Should be brief

    // Create playerNames map
    const playerNamesMap: Record<string, string> = players.reduce((acc, player) => {
        acc[player.id] = player.nickname;
        return acc;
    }, {} as Record<string, string>);

    return (
      <ResultComparison 
         result={roundResults} 
         playerNames={playerNamesMap}
         questionText={roundResults.questionText || "Question not available"}
         showPredictions={selectedGameStyle === 'predict-score'}
         hasClickedContinue={hasClickedContinueThisRound}
         onContinue={handleContinueClick}
      />
    );
  };

  const renderGameComplete = () => {
    return (
      <GameCard 
        title="Game Over!" 
        description="Here are the final scores:"
        showLogo={true}
      >
        <ul className="space-y-2 text-center">
          {players.map((player) => (
            <li key={player.id} className="text-lg">
              <span className="font-semibold">{player.nickname}:</span> {finalScores?.[player.id] ?? player.score ?? 0} points
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center space-x-4">
          {isCreator && (
            <Button onClick={handlePlayAgain}>Play Again</Button>
          )}
          {!isCreator && (
            <p className="text-gray-600">Waiting for {creatorName} to start a new game...</p>
            // Alternatively, allow joiner to request play again:
            // <Button onClick={() => socket?.emit('requestPlayAgain', { roomId })}>Request Play Again</Button>
          )}
          <Button variant="outline" onClick={handleGoHome}>Go Home</Button>
        </div>
      </GameCard>
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'waiting':
        return (
          <div className="text-center p-8 animate-fade-in">
            <div className="mb-6">
              <div className="inline-block p-4 bg-connection-light rounded-full mb-4">
                <img 
                  src="/images/Logo Redesign Image Apr 16 2025.jpeg" 
                  alt="Cards Against Maturity Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Waiting for Player 2</h2>
              <p className="text-gray-600 mb-6">Share this room code with your friend to start playing.</p>
              
              <div className="flex justify-center">
                <div className="bg-connection-light rounded-md p-4 flex items-center justify-center mb-4">
                  <span className="text-3xl font-mono font-bold tracking-widest text-connection-tertiary">{roomId}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'selecting':
        return renderGameSelection();
      case 'style-selecting':
        return renderStyleAndSettingsSelection();

      case 'rules-display':
        if (!selectedGameMode) return <div>Loading game settings...</div>;
        return (
          <RulesOverlay 
            gameMode={selectedGameMode}
            gameStyle={selectedGameStyle}
            nsfwLevel={nsfwLevel}
            totalRounds={totalRounds}
            timerDuration={selectedTimerDuration || null}
            creatorName={creatorName}
            onContinue={handleRulesContinue}
          />
        );
      
      case 'playing':
        return renderGameComponent();
      
      case 'results':
        return renderResults();
      
      case 'completed':
        return renderGameComplete();
        
      default:
        return <div>Unknown game state</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      {renderHeader()}
      {renderContent()}
      
      {/* PIN Entry Modal */}
      <PinEntryModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSubmit={handlePinSubmit}
        title="Enter Exclusive Mode PIN"
        message={pinEntryMode === 'activate' 
          ? "Enter the 4-digit PIN to activate exclusive mode"
          : "Enter the 4-digit PIN to configure exclusive mode"}
      />
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmEndExclusiveMode}
        title="End Exclusive Mode"
        message="Are you sure you want to end the exclusive questions round? This will end the current game."
        confirmText="End Mode"
        cancelText="Cancel"
      />
    </div>
  );
};

export default GameRoom;
