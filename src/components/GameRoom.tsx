import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home, User, Users } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false); // Add state for Start Game button

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
  const [selectedTimerDuration, setSelectedTimerDuration] = useState<number>(0);

  // Determine if the current player is the creator using the derived currentPlayerId
  const isCreator = gameMode === 'solo' || 
                   (players.length > 0 && !!currentPlayerId && players[0]?.id === currentPlayerId);

  const creatorName = isCreator ? 'You' : players[0]?.nickname || 'The Creator';

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
        timerDuration: number;
        totalRounds: number;
        questions: GameQuestion[];
        currentRound: number;
    }) => {
        console.log('[GameRoom] Received gameStarted event:', data);
        setPlayers(data.players); // Sync player list (e.g., scores reset)
        setSelectedGameMode(data.selectedGameMode);
        setSelectedGameStyle(data.selectedGameStyle);
        setNsfwLevel(data.nsfwLevel);
        setSelectedTimerDuration(data.timerDuration);
        setTotalRounds(data.totalRounds);
        setQuestions(data.questions);
        setCurrentRound(data.currentRound);
        setStatus('playing'); // Set status to playing for everyone
        setIsProcessing(false); // Reset processing state on successful start
        toast({ title: "Game Started!", description: `Mode: ${data.selectedGameMode}` });
    };

    // --- Listener for New Round (directly updates state) --- 
    const handleNewRound = (data: { currentRound: number }) => {
        console.log(`[GameRoom] Received newRound event for round: ${data.currentRound}. Setting state.`);
        // Directly set the round state based on the server event
        setCurrentRound(data.currentRound);
    };

    // --- Add Listener for Game Over --- 
    const handleGameOver = (data: { finalScores: Record<string, number> }) => {
        console.log('[GameRoom] Received gameOver event:', data.finalScores);
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
    socket.on('gameOver', handleGameOver); // Add listener

    // Cleanup listeners
    return () => {
      socket.off('roomReady', handleRoomReady);
      socket.off('gameStarted', handleGameStarted);
      socket.off('playerLeft', handlePlayerLeft);
      socket.off('error', handleErrorEvent); // Cleanup general error listener
      socket.off('newRound', handleNewRound); // Cleanup listener
      socket.off('gameOver', handleGameOver); // Cleanup listener
    };
    // Re-evaluate if socket, gameMode, status, or currentPlayerId (derived) changes
  }, [socket, gameMode, status, currentPlayerId, toast]); // Add currentPlayerId to dependencies

  const handleGameModeSelect = (mode: SpecificGameMode) => {
    // Allow anyone to select the mode visually, but only creator can *start* it
    setSelectedGameMode(mode);
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

    console.log('Emitting startGame with settings:', { roomId, gameMode: selectedGameMode, gameStyle: selectedGameStyle, nsfwLevel, timerDuration: selectedTimerDuration, totalRounds });
    
    // Emit the startGame event to the server
    socket.emit('startGame', { 
        roomId,
        gameMode: selectedGameMode, 
        gameStyle: selectedGameStyle,
        nsfwLevel: nsfwLevel,
        timerDuration: selectedTimerDuration,
        totalRounds: totalRounds, // Assuming 5 rounds for now, maybe make configurable?
    });

    // --- Remove client-side state setting - wait for server 'gameStarted' event --- 
    // const selectedQuestions = getQuestionsByMode(selectedGameMode!, totalRounds, nsfwLevel);
    // ... (removed question fetching and state setting here) ...
    // setStatus('playing'); 
  };
  
  const handleGameComplete = (scores: Record<string, number>) => {
    setFinalScores(scores);
    setStatus('completed');
  };
  
  const handlePlayAgain = () => {
    setSelectedGameMode(null);
    setSelectedGameStyle('reveal-only');
    setQuestions([]);
    setCurrentRound(1);
    setPlayers(gameMode === 'solo'
      ? [{ id: currentPlayerId ?? 'solo-player', nickname: playerName, score: 0 }]
      : [
          { id: currentPlayerId ?? 'creator-loading', nickname: playerName, score: 0 },
          { id: 'player2_placeholder', nickname: 'Waiting...', score: 0 } // Reset placeholder
        ]
    );
    setFinalScores(null);
    setStatus(gameMode === 'solo' ? 'selecting' : 'waiting'); // Go back to waiting for 2p
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
    setSelectedGameMode(null);
    setSelectedGameStyle('reveal-only');
    setQuestions([]);
    setCurrentRound(1);
    setPlayers(gameMode === 'solo'
      ? [{ id: currentPlayerId ?? 'solo-player', nickname: playerName, score: 0 }]
      : [
          { id: currentPlayerId ?? 'creator-loading', nickname: playerName, score: 0 },
          { id: 'player2_placeholder', nickname: 'Waiting...', score: 0 }
        ]
    );
    setFinalScores(null);
    setNsfwLevel(1);
    setStatus(gameMode === 'solo' ? 'selecting' : 'waiting');
    toast({
      title: "Returned to Game Selection",
      description: "Choose a new game mode to play.",
    });
  };

  console.log(`[GameRoom] Rendering. User: ${currentPlayerId}, Creator: ${isCreator}, Status: ${status}, Players:`, players);

  const handleNsfwLevelChange = (level: number) => {
    setNsfwLevel(level);
    const newQuestions = getQuestionsByMode(selectedGameMode!, totalRounds, level);
    setQuestions(newQuestions);
  };

  const renderHeader = () => {
    if (gameMode === '2player' && status === 'waiting') return null;
    return (
      <div className="flex justify-between items-center mb-4 px-4 pt-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {status !== 'waiting' && (
            <Button variant="ghost" size="icon" onClick={handleGoHome} title="Go to Game Selection">
              <Home size={20} />
            </Button>
          )}
          <div className="text-xs sm:text-sm flex items-center gap-1">
            Room: <span className="font-medium">{roomId}</span>
            {gameMode === 'solo' ? <User size={14} title="Solo Mode"/> : <Users size={14} title="2 Player Mode"/>}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {status === 'playing' && selectedGameStyle === 'reveal-only' && players.length > 1 && (
            <div className="hidden sm:flex gap-4 text-sm">
              {players.map((player) => (
                player.id !== 'player2_placeholder' && (
                    <div key={player.id}>
                    <span className="font-medium">{player.nickname}</span>: {player.score} pts
                    </div>
                )
              ))}
            </div>
          )}
          <Button variant="outline" size="sm" onClick={onExitRoom}>
            Exit
          </Button>
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

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      {renderHeader()}

      <div className="flex-grow flex flex-col items-center justify-center overflow-auto p-4 md:p-6">
        {status === 'waiting' && (
          <GameCard className="text-center animate-fade-in w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-connection-tertiary">Waiting for Player 2...</h2>
            <p className="text-gray-600 mb-2">Room ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{roomId}</span></p>
            <p className="text-gray-600 mb-6">Share this ID with your friend!</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-connection-secondary"></div>
            </div>
          </GameCard>
        )}

        {status === 'selecting' && isCreator && (
          <div className="w-full max-w-3xl animate-fade-in">
            <h1 className="text-3xl font-bold text-center text-connection-tertiary mb-8">
              Choose a Game Mode
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameCard 
                title="Guess Who I Am" 
                description="Reveal how well you understand each other"
                className={cn(
                  "hover:border-connection-primary hover:scale-105 transition-all duration-300 cursor-pointer text-center",
                  selectedGameMode === 'guess-who-i-am' && "border-2 border-connection-primary scale-105"
                )}
                onClick={() => handleGameModeSelect('guess-who-i-am')}
              >
                <p className="text-sm text-gray-600 mt-2">
                  Answer personality questions and predict your friend's responses.
                </p>
              </GameCard>
              <GameCard
                title="Hot Takes"
                description="Test your opinion prediction skills"
                className={cn(
                  "hover:border-connection-primary hover:scale-105 transition-all duration-300 cursor-pointer text-center",
                  selectedGameMode === 'hot-takes' && "border-2 border-connection-primary scale-105"
                )}
                onClick={() => handleGameModeSelect('hot-takes')}
              >
                 <p className="text-sm text-gray-600 mt-2">
                   Share your opinions and predict each other's stances.
                 </p>
              </GameCard>
              <GameCard
                title="This or That"
                description="Forced choices with a twist"
                className={cn(
                  "hover:border-connection-primary hover:scale-105 transition-all duration-300 cursor-pointer text-center",
                  selectedGameMode === 'this-or-that' && "border-2 border-connection-primary scale-105"
                )}
                onClick={() => handleGameModeSelect('this-or-that')}
              >
                 <p className="text-sm text-gray-600 mt-2">
                   Make binary choices and predict your friend's preferences.
                 </p>
              </GameCard>
            </div>
             {/* Adjusted text below cards */}
            {selectedGameMode && (
               <p className="text-sm text-gray-600 mt-6 text-center">Selected: <span className='font-semibold'>{selectedGameMode}</span>. Click below to configure style & options.</p>
            )}
          </div>
        )}
        
        {status === 'selecting' && !isCreator && (
           <GameCard className="text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-connection-tertiary">Waiting for Host</h2>
            <p className="text-gray-600">{players[0]?.nickname || 'The host'} is selecting the game settings.</p>
          </GameCard>
        )}

        {status === 'style-selecting' && isCreator && (
          <div 
            className="w-full max-w-md text-center animate-fade-in relative rounded-lg p-6 transition-colors duration-300 ease-in-out" 
            style={{
              // Calculate background alpha based on NSFW level (1=0, 10=0.25)
              // Adjust the max alpha (0.25 here) for desired intensity
              backgroundColor: `rgba(239, 68, 68, ${(Math.max(0, nsfwLevel - 1) / 9) * 0.25})` 
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-connection-tertiary">Select Game Style for {selectedGameMode}</h3>
            <RadioGroup 
              value={selectedGameStyle}
              className="flex justify-center space-x-4 mb-6"
              onValueChange={(value: string) => setSelectedGameStyle(value as GameStyle)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reveal-only" id="style-reveal" className="border-gray-400 text-connection-primary" />
                <Label htmlFor="style-reveal">Reveal Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prediction" id="style-prediction" className="border-gray-400 text-connection-primary" disabled={gameMode === 'solo'} />
                <Label htmlFor="style-prediction" className={cn(gameMode === 'solo' && "text-gray-400 cursor-not-allowed")}>Prediction {gameMode === 'solo' && "(2P Only)"}</Label>
              </div>
            </RadioGroup>
            
            <h3 className="text-xl font-semibold mb-4 text-connection-tertiary">NSFW Level</h3>
            <NSFWSlider onLevelChange={handleNsfwLevelChange} initialLevel={nsfwLevel} />

            <Button onClick={handleCreatorStartGame} className="mt-6 w-full bg-connection-primary hover:bg-connection-secondary" disabled={isProcessing}>
              {isProcessing ? "Starting..." : "Start Game"}
            </Button>
            <Button variant="link" onClick={() => { setSelectedGameMode(null); setStatus('selecting'); }} className="mt-2 text-connection-secondary">Back to Mode Select</Button>
          </div>
        )}

        {status === 'playing' && selectedGameMode === 'guess-who-i-am' && (
          <GuessWhoIAm 
            roomId={roomId} // Pass roomId
            players={players}
            questions={questions}
            currentRound={currentRound}
            totalRounds={totalRounds}
            onComplete={handleGameComplete}
            onUpdateScore={handleUpdateScore}
            onNextRound={() => {}} // Pass empty function, no longer needed
            gameStyle={selectedGameStyle}
            timerDuration={selectedTimerDuration}
            currentPlayerId={currentPlayerId} // Pass the derived ID
          />
        )}
        
        {status === 'playing' && selectedGameMode === 'hot-takes' && (
          <HotTakes 
            roomId={roomId} // Pass roomId
            players={players}
            questions={questions}
            currentRound={currentRound}
            totalRounds={totalRounds}
            onComplete={handleGameComplete}
            onUpdateScore={handleUpdateScore}
            onNextRound={() => {}} // Pass empty function, no longer needed
            gameStyle={selectedGameStyle}
            timerDuration={selectedTimerDuration}
            currentPlayerId={currentPlayerId} // Pass the derived ID
          />
        )}

        {status === 'playing' && selectedGameMode === 'this-or-that' && (
          <ThisOrThat 
            roomId={roomId} // Pass roomId
            players={players}
            questions={questions}
            currentRound={currentRound}
            totalRounds={totalRounds}
            onComplete={handleGameComplete}
            onUpdateScore={handleUpdateScore}
            onNextRound={() => {}} // Pass empty function, no longer needed
            gameStyle={selectedGameStyle}
            timerDuration={selectedTimerDuration}
            currentPlayerId={currentPlayerId} // Pass the derived ID
          />
        )}

        {status === 'completed' && finalScores && (
          <GameCard className="text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-connection-tertiary">Game Complete</h2>
            <div className="space-y-4 mb-6">
              {players.map((player) => (
                player.id !== 'player2_placeholder' && (
                  <div key={player.id} className="p-4 rounded-lg bg-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{player.nickname}</span>
                      <span className="text-lg font-bold text-connection-tertiary">{finalScores[player.id] ?? 0} points</span>
                    </div>
                  </div>
                )
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handlePlayAgain} className="bg-connection-primary hover:bg-connection-secondary">Play Again</Button>
            </div>
          </GameCard>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
