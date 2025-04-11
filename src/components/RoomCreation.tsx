
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GameCard from './GameCard';
import { useToast } from '@/components/ui/use-toast';

interface RoomCreationProps {
  onRoomCreated: (roomId: string, playerName: string) => void;
}

const RoomCreation: React.FC<RoomCreationProps> = ({ onRoomCreated }) => {
  const [playerName, setPlayerName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const generateRoomId = () => {
    // Generate a simple 6-character alphanumeric room ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      toast({
        title: "Nickname Required",
        description: "Please enter a nickname to create a room.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    // In a real app, we'd create the room on a server
    // For now, we'll simulate it with a timeout
    setTimeout(() => {
      const roomId = generateRoomId();
      onRoomCreated(roomId, playerName);
      setIsCreating(false);
    }, 800);
  };

  const handleJoinRoom = (roomId: string) => {
    if (!playerName.trim()) {
      toast({
        title: "Nickname Required",
        description: "Please enter a nickname to join a room.",
        variant: "destructive"
      });
      return;
    }
    
    if (!roomId || roomId.length !== 6) {
      toast({
        title: "Invalid Room Code",
        description: "Please enter a valid 6-character room code.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreating(true);
    
    // In a real app, we'd verify the room on a server
    // For now, we'll simulate it with a timeout
    setTimeout(() => {
      onRoomCreated(roomId, playerName);
      setIsCreating(false);
    }, 800);
  };

  return (
    <div className="max-w-md w-full mx-auto animate-fade-in">
      <GameCard 
        title="Create or Join a Room" 
        description="Start by entering your nickname below"
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
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="bg-connection-primary hover:bg-connection-secondary"
            >
              {isCreating ? "Creating..." : "Create Room"}
            </Button>
            
            <JoinRoomDialog 
              playerName={playerName}
              onJoinRoom={handleJoinRoom}
              isJoining={isCreating}
            />
          </div>
        </div>
      </GameCard>
    </div>
  );
};

interface JoinRoomDialogProps {
  playerName: string;
  onJoinRoom: (roomId: string) => void;
  isJoining: boolean;
}

const JoinRoomDialog: React.FC<JoinRoomDialogProps> = ({ playerName, onJoinRoom, isJoining }) => {
  const [roomId, setRoomId] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinRoom(roomId.toUpperCase());
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowDialog(true)}
        className="border-connection-primary text-connection-primary hover:bg-connection-light"
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
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isJoining}
                    className="bg-connection-primary hover:bg-connection-secondary"
                  >
                    {isJoining ? "Joining..." : "Join"}
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
