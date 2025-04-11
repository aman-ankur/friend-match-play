
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GameQuestion, GameMode, Player } from '@/types/game';
import getQuestionsByMode from '@/utils/gameQuestions';
import GuessWhoIAm from './GuessWhoIAm';
import GameCard from './GameCard';
import { toast } from '@/components/ui/use-toast';

interface GameRoomProps {
  roomId: string;
  currentPlayerId: string;
  playerName: string;
  onExitRoom: () => void;
}

const GameRoom: React.FC<GameRoomProps> = ({
  roomId,
  currentPlayerId,
  playerName,
  onExitRoom
}) => {
  // In a real app, most of this state would be managed on the server
  const [status, setStatus] = useState<'waiting' | 'selecting' | 'playing' | 'completed'>('waiting');
  const [players, setPlayers] = useState<Player[]>([
    { id: currentPlayerId, nickname: playerName, score: 0 },
    // In a real app, the second player would join dynamically
    { id: 'player2', nickname: 'Friend', score: 0 }
  ]);
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(5);
  const [finalScores, setFinalScores] = useState<Record<string, number> | null>(null);

  // For demo purposes, we'll automatically "join" the second player after a delay
  useEffect(() => {
    if (status === 'waiting') {
      const timer = setTimeout(() => {
        setStatus('selecting');
        toast({
          title: "Player joined!",
          description: "Your friend has joined the room."
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleGameModeSelect = (mode: GameMode) => {
    setSelectedGameMode(mode);
    const selectedQuestions = getQuestionsByMode(mode, totalRounds);
    setQuestions(selectedQuestions);
    setStatus('playing');
  };
  
  const handleGameComplete = (scores: Record<string, number>) => {
    setFinalScores(scores);
    setStatus('completed');
  };
  
  const handlePlayAgain = () => {
    setSelectedGameMode(null);
    setQuestions([]);
    setCurrentRound(1);
    setPlayers(players.map(p => ({ ...p, score: 0 })));
    setFinalScores(null);
    setStatus('selecting');
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
    setCurrentRound(prev => prev + 1);
  };

  // Waiting for players to join
  if (status === 'waiting') {
    return (
      <div className="max-w-md mx-auto text-center animate-fade-in">
        <GameCard
          title="Waiting for players"
          description="Share this room code with your friend"
        >
          <div className="mb-6 flex flex-col items-center">
            <div className="text-4xl font-bold tracking-wider text-connection-primary mb-2">{roomId}</div>
            <p className="text-sm text-gray-500">1/2 players have joined</p>
          </div>
          
          <div className="animate-pulse flex justify-center mb-4">
            <div className="h-2 w-2 bg-connection-primary rounded-full mx-1"></div>
            <div className="h-2 w-2 bg-connection-primary rounded-full mx-1 animation-delay-200"></div>
            <div className="h-2 w-2 bg-connection-primary rounded-full mx-1 animation-delay-400"></div>
          </div>
          
          <Button variant="outline" onClick={onExitRoom}>
            Cancel
          </Button>
        </GameCard>
      </div>
    );
  }

  // Game mode selection
  if (status === 'selecting') {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-connection-tertiary mb-8">
          Choose a Game Mode
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GameCard 
            title="Guess Who I Am" 
            description="Reveal how well you understand each other"
            className="hover:border-connection-primary hover:scale-105 transition-all duration-300"
            onClick={() => handleGameModeSelect('guess-who-i-am')}
          >
            <div className="h-24 flex items-center justify-center">
              <p className="text-center">Answer personality questions and predict your friend's responses</p>
            </div>
          </GameCard>
          
          <GameCard
            title="Hot Takes"
            description="Test your opinion prediction skills"
            className="hover:border-connection-primary hover:scale-105 transition-all duration-300"
            onClick={() => handleGameModeSelect('hot-takes')}
          >
            <div className="h-24 flex items-center justify-center">
              <p className="text-center">Share your opinions and predict each other's stances</p>
            </div>
          </GameCard>
          
          <GameCard
            title="This or That"
            description="Forced choices with a twist"
            className="hover:border-connection-primary hover:scale-105 transition-all duration-300"
            onClick={() => handleGameModeSelect('this-or-that')}
          >
            <div className="h-24 flex items-center justify-center">
              <p className="text-center">Make binary choices and predict your friend's preferences</p>
            </div>
          </GameCard>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={onExitRoom}>
            Exit Room
          </Button>
        </div>
      </div>
    );
  }

  // Game completed, show results
  if (status === 'completed' && finalScores) {
    const playerEntries = Object.entries(finalScores);
    // Sort by score (highest first)
    playerEntries.sort((a, b) => b[1] - a[1]);
    
    const winner = playerEntries[0][0];
    const isATie = playerEntries[0][1] === playerEntries[1]?.[1];
    
    return (
      <div className="max-w-lg mx-auto text-center animate-scale-in">
        <GameCard title="Game Complete">
          <h2 className="text-2xl font-bold mb-6">
            {isATie ? "It's a tie!" : `${players.find(p => p.id === winner)?.nickname} wins!`}
          </h2>
          
          <div className="space-y-4 mb-8">
            {players.map((player) => (
              <div 
                key={player.id} 
                className={`p-4 rounded-lg ${player.id === winner && !isATie ? 'bg-connection-light' : 'bg-gray-100'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{player.nickname}</span>
                  <span className="text-lg font-bold text-connection-tertiary">
                    {finalScores[player.id]} points
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handlePlayAgain} className="bg-connection-primary hover:bg-connection-secondary">
              Play Again
            </Button>
            <Button variant="outline" onClick={onExitRoom}>
              Exit Room
            </Button>
          </div>
        </GameCard>
      </div>
    );
  }

  // Main gameplay
  if (status === 'playing' && selectedGameMode === 'guess-who-i-am') {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm">Room code: <span className="font-medium">{roomId}</span></div>
          
          <div className="flex gap-4">
            {players.map((player) => (
              <div key={player.id} className="text-sm">
                <span className="font-medium">{player.nickname}</span>: {player.score} pts
              </div>
            ))}
          </div>
        </div>
        
        <GuessWhoIAm
          players={players}
          questions={questions}
          currentRound={currentRound}
          totalRounds={totalRounds}
          onComplete={handleGameComplete}
          onUpdateScore={handleUpdateScore}
        />
      </div>
    );
  }

  // Fallback (should not reach here)
  return <div>Loading game...</div>;
};

export default GameRoom;
