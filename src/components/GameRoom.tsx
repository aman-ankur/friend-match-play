import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home } from 'lucide-react';
import { GameQuestion, GameMode, GameStyle, Player } from '@/types/game';
import getQuestionsByMode from '@/utils/gameQuestions';
import GuessWhoIAm from './GuessWhoIAm';
import HotTakes from './HotTakes';
import ThisOrThat from './ThisOrThat';
import GameCard from './GameCard';
import NSFWSlider from './NSFWSlider';
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
  const [status, setStatus] = useState<'waiting' | 'selecting' | 'style-selecting' | 'playing' | 'completed'>('waiting');
  const [players, setPlayers] = useState<Player[]>([
    { id: currentPlayerId, nickname: playerName, score: 0 },
    // In a real app, the second player would join dynamically
    { id: 'player2', nickname: 'Friend', score: 0 }
  ]);
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null);
  const [selectedGameStyle, setSelectedGameStyle] = useState<GameStyle>('prediction');
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(5);
  const [finalScores, setFinalScores] = useState<Record<string, number> | null>(null);
  const [nsfwLevel, setNsfwLevel] = useState(1);

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
    setStatus('style-selecting');
  };
  
  const handleGameStyleSelect = () => {
    // Get questions based on the selected game mode and NSFW level
    const selectedQuestions = getQuestionsByMode(selectedGameMode!, totalRounds, nsfwLevel);
    
    // For reveal-only mode, we still need questions but with different scoring
    if (selectedGameStyle === 'reveal-only') {
      // Filter out any questions that don't have options
      const validQuestions = selectedQuestions.filter(q => q.options && q.options.length > 0);
      
      // If we don't have enough valid questions, log an error and use the original questions
      if (validQuestions.length < totalRounds) {
        console.error('Not enough valid questions for reveal-only mode');
        setQuestions(selectedQuestions);
      } else {
        setQuestions(validQuestions);
      }
    } else {
      setQuestions(selectedQuestions);
    }
    
    setStatus('playing');
  };
  
  const handleGameComplete = (scores: Record<string, number>) => {
    setFinalScores(scores);
    setStatus('completed');
  };
  
  const handlePlayAgain = () => {
    setSelectedGameMode(null);
    setSelectedGameStyle('prediction');
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
    console.log('[GameRoom] handleNextRound called. Incrementing round.');
    setCurrentRound(prev => {
      console.log(`[GameRoom] setCurrentRound updater. Prev: ${prev}, Next: ${prev + 1}`);
      return prev + 1;
    });
  };

  // Add function to return to game selection
  const handleGoHome = () => {
    setSelectedGameMode(null);
    setSelectedGameStyle('prediction'); // Reset to default
    setQuestions([]);
    setCurrentRound(1);
    setPlayers(prevPlayers => prevPlayers.map(p => ({ ...p, score: 0 }))); // Reset scores
    setFinalScores(null);
    setNsfwLevel(1); // Reset NSFW level
    setStatus('selecting'); // Go back to game mode selection
    toast({
      title: "Returned to Game Selection",
      description: "Choose a new game mode to play.",
    });
  };

  // Add this log inside the component body to see renders
  console.log(`[GameRoom] Rendering. Current round state: ${currentRound}`);

  const handleNsfwLevelChange = (level: number) => {
    setNsfwLevel(level);
    // Regenerate questions with new NSFW level
    const newQuestions = getQuestionsByMode(selectedGameMode!, totalRounds, level);
    setQuestions(newQuestions);
  };

  // Helper to render the common header
  const renderHeader = () => {
    if (status === 'waiting') return null; // No header on initial waiting screen

    return (
      <div className="flex justify-between items-center mb-4 px-4 pt-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={handleGoHome} title="Go to Game Selection">
            <Home size={20} />
          </Button>
          <div className="text-xs sm:text-sm">Room: <span className="font-medium">{roomId}</span></div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Show scores only during playing state in prediction mode */}
          {status === 'playing' && selectedGameStyle === 'prediction' && (
            <div className="hidden sm:flex gap-4 text-sm">
              {players.map((player) => (
                <div key={player.id}>
                  <span className="font-medium">{player.nickname}</span>: {player.score} pts
                </div>
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

  // Main return structure using the header
  return (
    <div className="container mx-auto flex flex-col min-h-screen"> {/* Ensure container takes height */}
      {renderHeader()} 
      
      <div className="flex-grow p-4 flex flex-col items-center"> {/* Content area */} 
        {/* Game mode selection */} 
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

        {/* Game style selection */} 
        {status === 'style-selecting' && selectedGameMode && (
          <div className="w-full max-w-md animate-fade-in">
            <GameCard title="Choose Game Style">
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-2">How do you want to play?</h2>
                <p className="text-gray-600 text-sm mb-4">Select your preferred gameplay style</p>
                <RadioGroup 
                  value={selectedGameStyle} 
                  onValueChange={(value) => setSelectedGameStyle(value as GameStyle)}
                  className="space-y-4 mt-4"
                >
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="prediction" id="prediction" />
                    <div className="space-y-1.5">
                      <Label htmlFor="prediction" className="font-medium">Prediction Mode</Label>
                      <p className="text-sm text-gray-600">Predict your friend's answers and earn points for correct predictions. The classic competitive game.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="reveal-only" id="reveal-only" />
                    <div className="space-y-1.5">
                      <Label htmlFor="reveal-only" className="font-medium">Reveal-only Mode</Label>
                      <p className="text-sm text-gray-600">Both players answer questions and then review each other's responses. No predictions or scoring.</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setStatus('selecting')}>Back</Button>
                <Button onClick={handleGameStyleSelect} className="bg-connection-primary hover:bg-connection-secondary">Start Game</Button>
              </div>
            </GameCard>
          </div>
        )}

        {/* Game completed */} 
        {status === 'completed' && finalScores && (
          <div className="w-full max-w-lg text-center animate-scale-in">
            <GameCard title="Game Complete">
              <h2 className="text-2xl font-bold mb-6">
                {Object.values(finalScores).every((score, i, arr) => i === 0 || score === arr[i-1]) ? "It's a tie!" : `${players.find(p => p.id === Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0][0])?.nickname} wins!`}
              </h2>
              <div className="space-y-4 mb-8">
                {players.map((player) => (
                  <div key={player.id} className={`p-4 rounded-lg ${player.id === Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0][0] && !Object.values(finalScores).every((score, i, arr) => i === 0 || score === arr[i-1]) ? 'bg-connection-light' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{player.nickname}</span>
                      <span className="text-lg font-bold text-connection-tertiary">{finalScores[player.id]} points</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={handlePlayAgain} className="bg-connection-primary hover:bg-connection-secondary">Play Again</Button>
              </div>
            </GameCard>
          </div>
        )}

        {/* Main gameplay */} 
        {status === 'playing' && selectedGameMode && (
           <div className="w-full flex flex-col items-center"> {/* Ensure game area takes width */} 
            <NSFWSlider value={nsfwLevel} onChange={handleNsfwLevelChange} />
            {/* Render the appropriate game component based on selected mode */}
            {selectedGameMode === 'guess-who-i-am' && (
              <GuessWhoIAm
                players={players}
                questions={questions}
                currentRound={currentRound}
                totalRounds={totalRounds}
                onComplete={handleGameComplete}
                onUpdateScore={handleUpdateScore}
                onNextRound={handleNextRound}
                gameStyle={selectedGameStyle}
              />
            )}
            {selectedGameMode === 'hot-takes' && (
              <HotTakes
                players={players}
                questions={questions}
                currentRound={currentRound}
                totalRounds={totalRounds}
                onComplete={handleGameComplete}
                onUpdateScore={handleUpdateScore}
                onNextRound={handleNextRound}
                gameStyle={selectedGameStyle}
              />
            )}
            {selectedGameMode === 'this-or-that' && (
              <ThisOrThat
                players={players}
                questions={questions}
                currentRound={currentRound}
                totalRounds={totalRounds}
                onComplete={handleGameComplete}
                onUpdateScore={handleUpdateScore}
                onNextRound={handleNextRound}
                gameStyle={selectedGameStyle}
              />
            )}
          </div>
        )}

        {/* Fallback for unexpected status */}
        {!['waiting', 'selecting', 'style-selecting', 'playing', 'completed'].includes(status) && (
          <div>Loading game or error...</div>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
