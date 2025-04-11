import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home, User, Users } from 'lucide-react';
import { GameQuestion, GameMode as SpecificGameMode, GameStyle, Player } from '@/types/game';
import getQuestionsByMode from '@/utils/gameQuestions';
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
  currentPlayerId: string | null; // Allow null initially
  playerName: string;
  gameMode: AppGameMode;
  initialPlayersData: Player[] | null; // Receive initial players
  onExitRoom: () => void;
}

const GameRoom: React.FC<GameRoomProps> = ({
  roomId,
  currentPlayerId,
  playerName,
  gameMode,
  initialPlayersData, // Destructure prop
  onExitRoom
}) => {
  const { socket } = useSocket();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false); // Add state for Start Game button

  // Determine initial state based on gameMode AND initialPlayersData
  const getInitialState = () => {
    if (initialPlayersData && initialPlayersData.length > 0) {
      return {
        status: 'selecting' as const, 
        players: initialPlayersData 
      };
    } else if (gameMode === 'solo') {
      // Use passed playerName for solo, ID can be null initially or socket.id
      return {
         status: 'selecting' as const,
         players: [{ id: currentPlayerId ?? 'solo-player', nickname: playerName, score: 0 }] 
      };
    } else {
      return {
        status: 'waiting' as const,
        players: [
          // Use passed playerName for creator, ID can be null initially or socket.id
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

  // Determine if the current player is the creator
  // Now compares the potentially null currentPlayerId prop with the ID of the first player in state
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

    // --- Add Listener for New Round --- 
    const handleNewRound = (data: { currentRound: number }) => {
        console.log(`[GameRoom] Received newRound event for round: ${data.currentRound}`);
        setCurrentRound(data.currentRound);
        // The useGameLogic hook's useEffect [currentRound] dependency will handle resetting its internal state.
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
            setPlayers(prev => prev.filter(p => p.id === currentPlayerId));
            setStatus('selecting'); 
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
    // Re-evaluate if socket, gameMode, status, or currentPlayerId changes
  }, [socket, gameMode, status, currentPlayerId, toast]); // Add toast to dependencies

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
  
  const handleNextRound = () => {
    console.log('[GameRoom] handleNextRound called. Incrementing round.');
    setCurrentRound(prev => {
      console.log(`[GameRoom] setCurrentRound updater. Prev: ${prev}, Next: ${prev + 1}`);
      return prev + 1;
    });
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

  return (
    <div className="container mx-auto flex flex-col min-h-screen"> 
      {renderHeader()}
      <div className="flex-grow p-4 flex flex-col items-center"> 
        {gameMode === '2player' && status === 'waiting' && (
           <div className="w-full max-w-sm text-center animate-fade-in">
            <GameCard title="Waiting for Friend">
               <p className="mb-4">Room Code: <strong className="text-xl tracking-wider font-mono">{roomId}</strong></p>
               <p className="text-gray-600 mb-6">Share this code with your friend to join.</p>
               <div className="animate-pulse text-connection-secondary">Waiting for player 2...</div>
            </GameCard>
          </div>
        )}
        {status === 'selecting' && (
          <div className="w-full max-w-3xl animate-fade-in">
            <h1 className="text-3xl font-bold text-center text-connection-tertiary mb-8">
              Choose a Game Mode
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameCard 
                title="Guess Who I Am" 
                description="Reveal how well you understand each other"
                className="hover:border-connection-primary hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleGameModeSelect('guess-who-i-am')}
              >
                <div className="h-24 flex items-center justify-center">
                  <p className="text-center">Answer personality questions and predict your friend's responses</p>
                </div>
              </GameCard>
              <GameCard
                title="Hot Takes"
                description="Test your opinion prediction skills"
                className="hover:border-connection-primary hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleGameModeSelect('hot-takes')}
              >
                <div className="h-24 flex items-center justify-center">
                  <p className="text-center">Share your opinions and predict each other's stances</p>
                </div>
              </GameCard>
              <GameCard
                title="This or That"
                description="Forced choices with a twist"
                className="hover:border-connection-primary hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleGameModeSelect('this-or-that')}
              >
                <div className="h-24 flex items-center justify-center">
                  <p className="text-center">Make binary choices and predict your friend's preferences</p>
                </div>
              </GameCard>
            </div>
          </div>
        )}
        {status === 'style-selecting' && selectedGameMode && (
          <div className="w-full max-w-md animate-fade-in">
            <GameCard title={isCreator ? "Customize Your Game" : "Waiting for Host"}>
              {isCreator ? (
                <>
                  {/* Style Options (Prediction / Reveal) */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Game Style</h3>
                    <RadioGroup 
                      value={selectedGameStyle} 
                      onValueChange={(value) => setSelectedGameStyle(value as GameStyle)}
                      className="space-y-3"
                    >
                       <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="prediction" id="prediction" disabled={gameMode === 'solo'} />
                        <div className="space-y-1">
                          <Label htmlFor="prediction" className={cn("font-medium", gameMode === 'solo' && "text-gray-400")}>Prediction</Label>
                          <p className={cn("text-xs text-gray-500", gameMode === 'solo' && "text-gray-400")}>(Unavailable in Solo)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="reveal-only" id="reveal-only" />
                         <div className="space-y-1">
                           <Label htmlFor="reveal-only" className="font-medium">Reveal Only</Label>
                           <p className="text-xs text-gray-500">Just answer and compare.</p>
                         </div>
                      </div>
                    </RadioGroup>
                  </div>
                  {/* NSFW Slider */}
                  <div className="mb-6">
                     <h3 className="text-lg font-medium mb-2">NSFW Content</h3>
                     <NSFWSlider value={nsfwLevel} onChange={handleNsfwLevelChange} minimal />
                  </div>
                  {/* Timer Slider */}
                  <div className="mb-6">
                     <h3 className="text-lg font-medium mb-2">Answer Timer</h3>
                     <RadioGroup 
                        value={String(selectedTimerDuration)} 
                        onValueChange={(value) => setSelectedTimerDuration(Number(value))}
                        className="flex gap-2"
                      >
                        {[0, 15, 30, 45].map(duration => (
                           <div key={duration} className="flex-1">
                            <RadioGroupItem value={String(duration)} id={`timer-${duration}`} className="sr-only" />
                            <Label 
                              htmlFor={`timer-${duration}`}
                              className={cn(
                                "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                                selectedTimerDuration === duration && "border-primary"
                              )}
                            >
                               {duration === 0 ? "None" : `${duration}s`}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                  </div>
                  {/* Action Buttons (Creator) */}
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => setStatus('selecting')} disabled={isProcessing}>Back</Button>
                    <Button onClick={handleCreatorStartGame} className="bg-connection-primary hover:bg-connection-secondary" disabled={isProcessing}>
                        {isProcessing ? "Starting..." : "Start Game"}
                    </Button>
                  </div>
                </>
              ) : (
                // Non-creator view 
                <div className="text-center p-8">
                   <p className="text-lg text-gray-600 animate-pulse">Waiting for {creatorName} to start the game...</p>
                   <p className="text-sm text-gray-500 mt-2">Selected Mode: {selectedGameMode}</p> 
                </div>
              )}
            </GameCard>
          </div>
        )}
        {status === 'completed' && finalScores && (
          <div className="w-full max-w-lg text-center animate-scale-in">
            <GameCard title="Game Complete">
              {gameMode === 'solo' ? (
                <h2 className="text-2xl font-bold mb-6">You finished!</h2>
              ) : (
                 <h2 className="text-2xl font-bold mb-6">
                  {(players.length > 1 && Object.values(finalScores).length === players.length && Object.values(finalScores).every((score, i, arr) => i === 0 || score === arr[i-1]))
                    ? "It's a tie!"
                    : `${players.find(p => p.id === Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0]?.[0])?.nickname || 'Someone'} wins!`}
                </h2>
              )}
              <div className="space-y-4 mb-8">
                 {players.map((player) => (
                   player.id !== 'player2_placeholder' && (
                     <div key={player.id} className={`p-4 rounded-lg ${gameMode === '2player' && players.length > 1 && Object.values(finalScores).length === players.length && player.id === Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0]?.[0] && !Object.values(finalScores).every((score, i, arr) => i === 0 || score === arr[i-1]) ? 'bg-connection-light' : 'bg-gray-100'}`}>
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
          </div>
        )}
        {status === 'playing' && selectedGameMode && (
           <div className="w-full flex flex-col items-center"> 
            <NSFWSlider value={nsfwLevel} onChange={handleNsfwLevelChange} />
            {selectedGameMode === 'guess-who-i-am' && (
              <GuessWhoIAm
                roomId={roomId}
                currentPlayerId={currentPlayerId}
                players={players.filter(p => p.id !== 'player2_placeholder')}
                questions={questions}
                currentRound={currentRound}
                totalRounds={totalRounds}
                onComplete={handleGameComplete}
                onUpdateScore={handleUpdateScore}
                onNextRound={handleNextRound}
                gameStyle={selectedGameStyle}
                timerDuration={selectedTimerDuration}
                gameMode={gameMode}
              />
            )}
            {selectedGameMode === 'hot-takes' && (
              <HotTakes
                roomId={roomId}
                currentPlayerId={currentPlayerId}
                players={players.filter(p => p.id !== 'player2_placeholder')}
                questions={questions}
                currentRound={currentRound}
                totalRounds={totalRounds}
                onComplete={handleGameComplete}
                onUpdateScore={handleUpdateScore}
                onNextRound={handleNextRound}
                gameStyle={selectedGameStyle}
                timerDuration={selectedTimerDuration}
                gameMode={gameMode}
              />
            )}
            {selectedGameMode === 'this-or-that' && (
              <ThisOrThat
                roomId={roomId}
                currentPlayerId={currentPlayerId}
                players={players.filter(p => p.id !== 'player2_placeholder')}
                questions={questions}
                currentRound={currentRound}
                totalRounds={totalRounds}
                onComplete={handleGameComplete}
                onUpdateScore={handleUpdateScore}
                onNextRound={handleNextRound}
                gameStyle={selectedGameStyle}
                timerDuration={selectedTimerDuration}
                gameMode={gameMode}
              />
            )}
          </div>
        )}
        {!['waiting', 'selecting', 'style-selecting', 'playing', 'completed'].includes(status) && (
          <div>Loading game or error...</div>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
