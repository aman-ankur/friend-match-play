import React, { useState } from 'react';
import RoomCreation from '@/components/RoomCreation';
import GameRoom from '@/components/GameRoom';
import { useSocket } from '@/context/SocketContext';

// Need Player type definition if not globally available
interface Player {
  id: string;
  nickname: string;
  score: number;
}

type GameMode = 'solo' | '2player';

const Index = () => {
  const { socket } = useSocket();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [initialPlayersState, setInitialPlayersState] = useState<Player[] | null>(null);

  const handleRoomCreated = (
    newRoomId: string,
    name: string,
    mode: GameMode,
    initialPlayers: Player[]
  ) => {
    setRoomId(newRoomId);
    setPlayerName(name);
    setGameMode(mode);
    setInitialPlayersState(initialPlayers.length > 0 ? initialPlayers : null);
  };

  const handleExitRoom = () => {
    setRoomId(null);
    setPlayerName('');
    setGameMode(null);
    setInitialPlayersState(null);
  };

  const currentUserId = socket?.id;

  if (roomId && currentUserId && gameMode) {
    return (
      <GameRoom
        roomId={roomId}
        currentPlayerId={currentUserId}
        playerName={playerName}
        gameMode={gameMode}
        initialPlayersData={initialPlayersState}
        onExitRoom={handleExitRoom}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-connection-tertiary mb-4">
              Welcome to <span className="font-bold font-sans">Cards Against Maturity</span>
            </h1>
            <p className="text-lg text-gray-600">
              How well do you *really* know your friends?
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
              <p className="text-gray-600 mb-6">
                Create a room or join an existing one to start having meaningful conversations with friends through our engaging card games.
              </p>
              
              <RoomCreation onRoomCreated={handleRoomCreated} />
            </div>
            
            <div className="bg-connection-light rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-connection-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                  <p>Create a room and share the code with a friend</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-connection-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                  <p>Select from three different game modes designed to foster meaningful connections</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-connection-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                  <p>Answer questions about yourself and engage with thought-provoking content</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-connection-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                  <p>Compare answers with your friend and discover new insights about each other</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Game Modes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-connection-light hover:border-connection-primary transition-all">
                <h3 className="text-xl font-bold mb-2">Guess Who I Am</h3>
                <p className="text-gray-600">
                  Reveal hidden aspects of your personality and discover how well you and your friend truly know each other.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-connection-light hover:border-connection-primary transition-all">
                <h3 className="text-xl font-bold mb-2">Hot Takes</h3>
                <p className="text-gray-600">
                  Share your stance on controversial topics and see where you stand compared to your friend on hot button issues.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-connection-light hover:border-connection-primary transition-all">
                <h3 className="text-xl font-bold mb-2">This or That</h3>
                <p className="text-gray-600">
                  Make tough choices between impossible dilemmas and discover how your preferences align with your friend's.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6 px-4 md:px-6">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 <span className="font-bold font-sans">Cards Against Maturity</span>. Designed for interesting conversations.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
