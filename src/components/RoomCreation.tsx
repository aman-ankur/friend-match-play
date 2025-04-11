import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GameCard from './GameCard';
import { useToast } from '@/components/ui/use-toast';
import { useSocket } from '@/context/SocketContext';

type GameMode = 'solo' | '2player';

interface Player {
  id: string;
  nickname: string;
  score: number;
}

interface RoomCreationProps {
  onRoomCreated: (roomId: string, playerName: string, gameMode: GameMode, players: Player[]) => void;
}

const RoomCreation: React.FC<RoomCreationProps> = ({ onRoomCreated }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameMode, setGameMode] = useState<GameMode>('2player');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handleRoomCreatedEvent = (data: { roomId: string }) => {
      console.log('[Creator] Received roomCreated event:', data);
      onRoomCreated(data.roomId, playerName, gameMode, []);
      setIsProcessing(false);
    };
    socket.on('roomCreated', handleRoomCreatedEvent);
    return () => { socket.off('roomCreated', handleRoomCreatedEvent); };
  }, [socket, onRoomCreated, playerName, gameMode]);

  useEffect(() => {
    if (!socket) return;

    const handleErrorEvent = (data: { message: string }) => {
        console.error('Server error:', data.message);
        toast({
            title: "Error",
            description: data.message || "An error occurred.",
            variant: "destructive"
        });
        setIsProcessing(false);
    };

    socket.on('error', handleErrorEvent);

    return () => {
        socket.off('error', handleErrorEvent);
    };

  }, [socket, toast]);

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      toast({
        title: "Nickname Required",
        description: "Please enter a nickname to create a room.",
        variant: "destructive"
      });
      return;
    }

    if (!socket || !isConnected) {
      toast({
        title: "Not Connected",
        description: "Cannot connect to the server. Please wait or refresh.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    console.log('Emitting createRoom:', { playerName, gameMode });
    socket.emit('createRoom', { 
      playerName: playerName.trim(), 
      gameMode
    });
  };

  return (
    <div className="max-w-md w-full mx-auto animate-fade-in">
      <GameCard 
        title="Create or Join a Room" 
        description="Start by entering your nickname and choosing a mode"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="playerName">Your Nickname</Label>
            <Input
              id="playerName"
              placeholder="Enter your nickname"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="border-connection-light focus:border-connection-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Game Mode</Label>
            <RadioGroup
              value={gameMode}
              onValueChange={(value) => setGameMode(value as GameMode)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2player" id="mode-2player" />
                <Label htmlFor="mode-2player">2 Player</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solo" id="mode-solo" />
                <Label htmlFor="mode-solo">Solo</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              onClick={handleCreateRoom}
              disabled={isProcessing}
              className="bg-connection-primary hover:bg-connection-secondary"
            >
              {isProcessing ? (gameMode === 'solo' ? 'Starting...' : 'Creating...') : (gameMode === 'solo' ? 'Start Solo' : 'Create Room')}
            </Button>
            
            <JoinRoomDialog 
              playerName={playerName}
              onRoomJoined={(roomId, players) => onRoomCreated(roomId, playerName, '2player', players)}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              disabled={gameMode === 'solo'}
              socket={socket}
              isConnected={isConnected}
            />
          </div>
        </div>
      </GameCard>
    </div>
  );
};

interface JoinRoomDialogProps {
  playerName: string;
  onRoomJoined: (roomId: string, players: Player[]) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  disabled?: boolean;
  socket: any;
  isConnected: boolean;
}

const JoinRoomDialog: React.FC<JoinRoomDialogProps> = ({ 
    playerName, 
    onRoomJoined,
    isProcessing, 
    setIsProcessing,
    disabled, 
    socket, 
    isConnected 
}) => {
  const [roomId, setRoomId] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!socket) return;

    const handleJoinSuccess = (data: { roomId: string; players: Player[] }) => {
      console.log('[Joiner] Received joinSuccess:', data);
      const opponent = data.players.find(p => p.id !== socket?.id);
      toast({ 
          title: "Joined Room!", 
          description: `You joined ${data.roomId}. Opponent: ${opponent?.nickname || 'Unknown'}` 
      });
      onRoomJoined(data.roomId, data.players);
      setIsProcessing(false);
      setShowDialog(false);
    };

    socket.on('joinSuccess', handleJoinSuccess);

    return () => {
      socket.off('joinSuccess', handleJoinSuccess);
    };
  }, [socket, onRoomJoined, setIsProcessing, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim()) {
      toast({ title: "Nickname Required", description: "Please enter a nickname before joining.", variant: "destructive" });
      return;
    }
    if (!roomId || roomId.length !== 6) {
      toast({ title: "Invalid Room Code", description: "Please enter a valid 6-character room code.", variant: "destructive" });
      return;
    }
    if (!socket || !isConnected) {
      toast({ title: "Not Connected", description: "Cannot connect to the server. Please wait or refresh.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    console.log('Emitting joinRoom:', { playerName, roomId });
    socket.emit('joinRoom', { playerName: playerName.trim(), roomId: roomId.toUpperCase() });
  };

  const handleOpenDialog = () => {
    if (!playerName.trim()) {
      toast({ title: "Nickname Required", description: "Please enter a nickname before joining.", variant: "destructive" });
      return;
    }
    setShowDialog(true);
    setRoomId('');
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleOpenDialog}
        className="border-connection-primary text-connection-primary hover:bg-connection-light"
        disabled={disabled || !playerName.trim() || isProcessing}
      >
        Join Room
      </Button>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-connection-tertiary">Join Room</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roomId">Room Code</Label>
                  <Input
                    id="roomId"
                    placeholder="Enter 6-character code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="border-connection-light focus:border-connection-primary"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDialog(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing || !roomId || roomId.length !== 6}
                    className="bg-connection-primary hover:bg-connection-secondary"
                  >
                    {isProcessing ? "Joining..." : "Join"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCreation;
