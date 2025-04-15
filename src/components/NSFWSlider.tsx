import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface NSFWSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

// Funny level groups (pairs of numbers share the same description)
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
    
  console.log(`[NSFWSlider] Getting content group for level: ${level}, normalized to: ${validLevel}`);
  
  // Find the matching group
  const group = CONTENT_GROUPS.find(group => 
    validLevel >= group.range[0] && validLevel <= group.range[1]
  ) || CONTENT_GROUPS[0];
  
  return group;
};

// Get color based on level
const getColorForLevel = (level: number) => {
  if (level <= 2) return "text-green-700 bg-green-100";
  if (level <= 4) return "text-blue-700 bg-blue-100";
  if (level <= 6) return "text-yellow-700 bg-yellow-100";
  if (level <= 8) return "text-orange-700 bg-orange-100";
  return "text-red-700 bg-red-100";
};

const NSFWSlider: React.FC<NSFWSliderProps> = ({ value, onValueChange }) => {
  // Log the incoming value for debugging
  console.log(`[NSFWSlider] Rendering with value: ${value} (type: ${typeof value})`);
  
  // Ensure value is a valid number
  const safeValue = typeof value === 'number' && !isNaN(value) 
    ? Math.min(Math.max(Math.round(value), 1), 10) // Clamp between 1-10 and round
    : 1; // Default to 1 if invalid
    
  const handleSliderChange = (newValue: number[]) => {
    if (newValue && newValue.length > 0) {
      // Ensure the value sent back is valid
      const validValue = Math.min(Math.max(Math.round(newValue[0]), 1), 10);
      console.log(`[NSFWSlider] Slider changed to: ${validValue}`);
      onValueChange(validValue);
    }
  };

  const currentGroup = getGroupForLevel(safeValue);

  return (
    <div className="w-full max-w-md mx-auto mb-6 px-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Content Level:</span>
        <span className={cn(
          "font-semibold px-2 py-0.5 rounded text-sm",
          getColorForLevel(safeValue)
        )}>
          {currentGroup.name} ({safeValue}/10)
        </span>
      </div>
      
      <Slider
        defaultValue={[safeValue]}
        value={[safeValue]}
        min={1}
        max={10}
        step={1}
        className={cn("w-full h-2 rounded-full cursor-pointer",
          "[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-green-400 [&>span:first-child]:via-yellow-400 [&>span:first-child]:to-red-500"
        )}
        onValueChange={handleSliderChange}
        aria-label="Content Level Slider"
      />
      
      <p className="text-sm text-muted-foreground text-center mt-2 h-4">
        {currentGroup.description}
      </p>
    </div>
  );
};

export default NSFWSlider; 