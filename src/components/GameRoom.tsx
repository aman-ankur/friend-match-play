import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home, User, Users, Settings, Clock, ShieldQuestion, UsersRound, Zap, Hourglass } from 'lucide-react';
import { GameQuestion, GameMode as SpecificGameMode, GameStyle, Player } from '@/types/game';
import getQuestionsByMode, { GAME_DESCRIPTIONS } from '@/utils/gameQuestions';
import GuessWhoIAm from './GuessWhoIAm';
import HotTakes from './HotTakes';
import ThisOrThat from './ThisOrThat';
import GameCard from './GameCard';
import NSFWSlider from './NSFWSlider';
import { useToast } from '@/components/ui/use-toast';
import TimerWidget from './TimerWidget';
import { cn } from '@/lib/utils';
import { useSocket } from '@/context/SocketContext';

// Define the game mode type locally or import if defined globally
type AppGameMode = 'solo' | '2player';
type RoundTimeLimit = 10 | 20 | 30 | null; // Add type

// Define Player type if not imported globally
interface Player {
  id: string;
  nickname: string;
  score: number;
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
        status: 'selecting' as const, 
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
  const [status, setStatus] = useState(initialState.status);
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
                  description: `${data.players[1]?.nickname || 'Someone'} has joined the room.` 
              });
          }
      } else {
          console.log("[GameRoom] Ignoring roomReady event (already joined or solo).");
      }
    };

    // Listener for when the game actually starts
    const handleGameStarted = (data: { 
        players: Player[];
        selectedGameMode: SpecificGameMode;
        selectedGameStyle: GameStyle;
        nsfwLevel: number;
        timerDuration: number; // This comes from the server
        totalRounds: number;
        questions: GameQuestion[];
        currentRound: number;
    }) => {
        console.log('[GameRoom] Received gameStarted event:', data);
        stopTimer(); // Stop any previous timer
        setPlayers(data.players);
        setSelectedGameMode(data.selectedGameMode);
        setSelectedGameStyle(data.selectedGameStyle);
        setNsfwLevel(data.nsfwLevel);
        setSelectedTimerDuration(data.timerDuration); // Store the duration
        setTotalRounds(data.totalRounds);
        setQuestions(data.questions);
        setCurrentRound(data.currentRound);
        setStatus('playing'); 
        setIsProcessing(false);
        
        // Start timer if duration is set
        if (data.timerDuration > 0) {
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
        
        toast({ title: "Game Started!", description: `Mode: ${data.selectedGameMode}` });
    };

    // --- Listener for New Round --- 
    const handleNewRound = (data: { currentRound: number }) => {
        console.log(`[GameRoom] Received newRound event for round: ${data.currentRound}. Setting state.`);
        stopTimer(); // Stop timer for the previous round
        setCurrentRound(data.currentRound);
        
        // Restart timer if a duration is set for the game
        if (selectedTimerDuration > 0) {
            console.log(`[GameRoom] Restarting timer for round ${data.currentRound} with duration ${selectedTimerDuration}`);
            
            // Set the time left directly - don't use setTimeout which can cause issues
            setTimeLeft(selectedTimerDuration);
            
            // The timer effect will handle the actual interval creation
            // Force reset initialization state to ensure clean start
            timerInitializedRef.current = false;
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

    // General Error Listener
    const handleErrorEvent = (data: { message: string }) => {
        console.error('[GameRoom] Server error:', data.message);
        toast({
            title: "Error",
            description: data.message || "An server error occurred.",
            variant: "destructive"
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
            variant: "destructive"
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

    // Cleanup listeners and timer interval
    return () => {
      socket.off('roomReady', handleRoomReady);
      socket.off('gameStarted', handleGameStarted);
      socket.off('playerLeft', handlePlayerLeft);
      socket.off('error', handleErrorEvent); // Cleanup general error listener
      socket.off('newRound', handleNewRound); // Cleanup listener
      socket.off('roundComplete', handleRoundComplete); // Cleanup listener
      socket.off('gameOver', handleGameOver); // Cleanup listener
      stopTimer(); // Ensure timer stops on component unmount or effect re-run
    };
    // Re-evaluate if socket, gameMode, status, or currentPlayerId (derived) changes
  }, [socket, gameMode, status, currentPlayerId, toast, selectedTimerDuration]); // Add selectedTimerDuration dependency

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
            toast({ title: "Time's Up!", description: "Moving to the next round.", duration: 2000 });
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
    if (!socket) {
        toast({ title: "Error", description: "Not connected to server.", variant: "destructive" });
        return;
    }
    if (!selectedGameMode) {
        toast({ title: "Error", description: "Please select a game mode.", variant: "destructive" });
        return;
    }
    // Validation - Only creator can start
    // Server also validates, but good to prevent unnecessary emits
    if (gameMode === '2player' && !isCreator) {
        toast({ title: "Wait", description: "Only the room creator can start the game.", variant: "default" });
        return;
    }
    
    setIsProcessing(true); // Show loading state on button

    const finalTimerDuration = gameMode === 'solo' ? null : roundTimeLimitSelection;

    console.log('Emitting startGame with settings:', { 
        roomId, 
        gameMode: selectedGameMode, 
        gameStyle: selectedGameStyle, 
        nsfwLevel, 
        timerDuration: finalTimerDuration, // Send the selected time limit 
        totalRounds 
    });
    
    socket.emit('startGame', { 
        roomId,
        gameMode: selectedGameMode, 
        gameStyle: selectedGameStyle,
        nsfwLevel: nsfwLevel,
        timerDuration: finalTimerDuration, // Send the CREATOR'S chosen time limit 
        totalRounds: totalRounds,
    });

    // --- Remove client-side state setting - wait for server 'gameStarted' event --- 
    // const selectedQuestions = getQuestionsByMode(selectedGameMode!, totalRounds, nsfwLevel);
    // ... (removed question fetching and state setting here) ...
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
    // Reset state for a new game selection phase
    setStatus('selecting');
    setSelectedGameMode(null);
    setSelectedGameStyle('reveal-only');
    setRoundTimeLimitSelection(null); // Reset time limit selection
    setQuestions([]);
    setCurrentRound(1);
    setFinalScores(null);
    // Maybe emit an event? Or wait for creator to start again?
    // For now, just resetting client state
    console.log('Resetting game state for play again...');
    // If creator, they can re-initiate startGame
    // If joiner, they wait for creator
     if (!isCreator && socket) {
         // Perhaps notify server player wants to play again?
         // socket.emit('requestPlayAgain', { roomId });
         toast({ title: "Play Again?", description: `Waiting for ${creatorName} to start a new game.` });
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
    // Question fetching logic might need adjustment depending on server interaction
    // Consider if questions should be fetched *only* when starting the game
    // const newQuestions = getQuestionsByMode(selectedGameMode!, totalRounds, level);
    // setQuestions(newQuestions);
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
        <div className="text-center">
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
        <GameCard title={`Waiting for ${creatorName} to Choose Game Mode`} description="Hang tight! The game will start soon.">
          <p className="text-center text-gray-600 mt-4">Room Code: <span className="font-mono font-semibold">{roomId}</span></p>
        </GameCard>
      );
    }

    return (
      <div className="space-y-8 animate-fade-in">
        <GameCard title="Choose Your Game" description="Select a game mode to play.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(GAME_DESCRIPTIONS) as SpecificGameMode[]).map((mode) => (
              <Button
                key={mode}
                variant={selectedGameMode === mode ? "default" : "outline"}
                onClick={() => handleGameModeSelect(mode)}
                className={cn(
                  "h-auto p-4 flex flex-col items-start text-left transition-all",
                  selectedGameMode === mode ? "bg-connection-primary text-white" : "hover:border-connection-primary hover:bg-connection-light"
                )}
              >
                <h3 className="font-semibold text-lg mb-1">{GAME_DESCRIPTIONS[mode].title}</h3>
                <p className="text-sm text-muted-foreground">{GAME_DESCRIPTIONS[mode].description}</p>
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
                             <Zap className="mr-2 h-5 w-5 text-connection-secondary" /> Spicy Level
                         </Label>
                          <NSFWSlider value={nsfwLevel} onValueChange={handleNsfwLevelChange} />
                      </div>

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

  const renderContent = () => {
    switch (status) {
      case 'waiting':
        return (
          <GameCard title="Waiting for Player 2" description="Share the room code with your friend!">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-2">Room Code:</p>
              <p className="text-4xl font-mono font-bold tracking-widest text-connection-tertiary select-all cursor-pointer" onClick={() => navigator.clipboard.writeText(roomId).then(() => toast({ title: "Copied!", description: "Room code copied to clipboard." })) }>
                {roomId}
              </p>
              <p className="text-sm text-gray-500 mt-2">Click to copy</p>
            </div>
          </GameCard>
        );
      case 'selecting':
        return renderGameSelection();
      case 'style-selecting': // New status for selecting style/settings
        return renderStyleAndSettingsSelection(); 
      case 'playing':
        if (!selectedGameMode) return <div>Error: Game mode not set.</div>;
        
        // Use kebab-case keys to match the selectedGameMode state value
        const CurrentGameComponent = {
          'guess-who-i-am': GuessWhoIAm, // Kebab-case key
          'hot-takes': HotTakes,         // Kebab-case key
          'this-or-that': ThisOrThat,    // Kebab-case key
        }[selectedGameMode];

        // Add a check in case the component lookup fails unexpectedly
        if (!CurrentGameComponent) {
            console.error(`[GameRoom] Error: Could not find component for game mode: ${selectedGameMode}`);
            // Provide feedback to the user and potentially allow resetting
            return (
                <GameCard title="Game Error" description={`Failed to load the selected game mode (${selectedGameMode}).`}>
                    <div className="text-center mt-4">
                        <Button variant="destructive" onClick={handleGoHome}>Exit Room</Button>
                    </div>
                </GameCard>
            );
        }

        return (
          <CurrentGameComponent
            roomId={roomId}
            players={players}
            currentPlayerId={currentPlayerId!} // Assert non-null as game is playing
            questions={questions}
            currentRound={currentRound}
            totalRounds={totalRounds}
            gameStyle={selectedGameStyle}
            // Pass timer info if needed by specific game components
            // timerDuration={selectedTimerDuration} 
            // timeLeft={timeLeft}
            onUpdateScore={handleUpdateScore} // Pass score updater
            // Removed onGameComplete, server handles via gameOver event
          />
        );
      case 'completed':
        return (
          <GameCard title="Game Over!" description="Here are the final scores:">
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
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
      {renderHeader()}
      {renderContent()}
    </div>
  );
};

export default GameRoom;
