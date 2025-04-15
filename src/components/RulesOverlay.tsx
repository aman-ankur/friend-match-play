import React from 'react';
import { Button } from '@/components/ui/button';
import { GameMode, GameStyle } from '@/types/game';
import { cn } from '@/lib/utils';

// Game descriptions for each mode
const GAME_DESCRIPTIONS: Record<GameMode, { title: string; description: string }> = {
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

// Game style descriptions
const STYLE_DESCRIPTIONS: Record<GameStyle, string> = {
  "reveal-only": "In this mode, you'll see each other's answers after each round.",
  "predict-score": "In this mode, you'll guess how your friend will answer and earn points for correct predictions."
};

// Funny content level groups (pairs of numbers share the same description)
const CONTENT_GROUPS = [
  { range: [1, 2], name: "Church Mouse", description: "Won't raise any eyebrows" },
  { range: [3, 4], name: "Slightly Saucy", description: "Might make your aunt blush" },
  { range: [5, 6], name: "Comedy Club", description: "Things your friends say after midnight" },
  { range: [7, 8], name: "Let's Get Weird", description: "Not for the faint of heart" },
  { range: [9, 10], name: "Therapy Material", description: "You might need to talk about this later" }
];

// Helper function to get the group for a specific level
const getGroupForLevel = (level: number) => {
  // Ensure level is a valid number
  const validLevel = typeof level === 'number' && !isNaN(level) 
    ? Math.min(Math.max(Math.round(level), 1), 10) // Clamp between 1-10 and round
    : 1; // Default to 1 if invalid
    
  console.log(`[RulesOverlay] Getting content group for level: ${level}, normalized to: ${validLevel}`);
  
  // Find the matching group
  const group = CONTENT_GROUPS.find(group => 
    validLevel >= group.range[0] && validLevel <= group.range[1]
  ) || CONTENT_GROUPS[0];
  
  console.log(`[RulesOverlay] Selected group: ${group.name}`);
  return group;
};

// Add a utility function to get a proper display of the content level
const getContentLevelDisplay = (level: number) => {
  // Ensure level is a valid number
  const validLevel = typeof level === 'number' && !isNaN(level) 
    ? Math.min(Math.max(Math.round(level), 1), 10) // Clamp between 1-10 and round
    : 1; // Default to 1 if invalid
    
  const group = getGroupForLevel(validLevel);
  
  return {
    name: group.name,
    description: group.description,
    level: validLevel,
    display: `${group.name} (Level ${validLevel}/10)`
  };
};

interface RulesOverlayProps {
  gameMode: GameMode;
  gameStyle: GameStyle;
  nsfwLevel: number;
  totalRounds: number;
  timerDuration: number | null;
  creatorName: string;
  onContinue: () => void;
}

const RulesOverlay: React.FC<RulesOverlayProps> = ({
  gameMode,
  gameStyle,
  nsfwLevel,
  totalRounds,
  timerDuration,
  creatorName,
  onContinue
}) => {
  // Log all props for debugging
  console.log('[RulesOverlay] Rendering with props:', { 
    gameMode, gameStyle, nsfwLevel, totalRounds, timerDuration, creatorName 
  });
  
  const contentLevel = getContentLevelDisplay(nsfwLevel);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-connection-tertiary mb-2">
            Game Rules &amp; Settings
          </h2>
          <p className="text-gray-600">Review before you start playing</p>
        </div>
        
        <div className="space-y-6">
          <div className={cn("p-5 rounded-lg shadow-sm border-l-4", 
            gameMode === "guess-who-i-am" ? "bg-purple-50 border-purple-400" : 
            gameMode === "hot-takes" ? "bg-orange-50 border-orange-400" : 
            "bg-blue-50 border-blue-400"
          )}>
            <h3 className="text-xl font-bold mb-2">
              {GAME_DESCRIPTIONS[gameMode].title}
            </h3>
            <p className="text-gray-700">
              {GAME_DESCRIPTIONS[gameMode].description}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b pb-2">Game Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="font-medium text-connection-tertiary block mb-1">Game Style</span>
                <span>{STYLE_DESCRIPTIONS[gameStyle]}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="font-medium text-connection-tertiary block mb-1">Round Count</span>
                <span>{totalRounds} rounds</span>
              </div>
              {timerDuration !== null && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="font-medium text-connection-tertiary block mb-1">Time Limit</span>
                  <span>{timerDuration} seconds per round</span>
                </div>
              )}
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="font-medium text-connection-tertiary block mb-1">Content Level</span>
                <span>{contentLevel.name}</span>
                <span className="block text-sm text-gray-600 mt-1">{contentLevel.description}</span>
                <span className="text-xs text-gray-500 block mt-1">Level {contentLevel.level}/10</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-md col-span-full">
                <span className="font-medium text-connection-tertiary block mb-1">Room Created By</span>
                <span>{creatorName}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-connection-light p-5 rounded-lg border border-connection-light">
            <h3 className="text-lg font-bold mb-3">How to Play</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Each round presents a question with multiple options</li>
              <li>Select your own answer</li>
              {gameStyle === "predict-score" && (
                <li>Predict how your friend will answer the same question</li>
              )}
              <li>View results and compare answers</li>
              <li>Continue through all rounds to see final scores</li>
            </ol>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={onContinue}
            className="bg-connection-primary hover:bg-connection-secondary transition-colors text-white py-3 px-8 rounded-md text-lg font-medium"
          >
            I'm Ready to Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesOverlay; 