import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface NSFWSliderProps {
  initialLevel: number;
  onLevelChange: (value: number) => void;
}

const nsfwSegments = [
  { label: "Mild", range: [1, 2], description: "Safe for most" },
  { label: "Medium", range: [3, 4], description: "Getting warmer" },
  { label: "Spicy", range: [5, 6], description: "Things are heating up" },
  { label: "Hot", range: [7, 8], description: "Getting steamy" },
  { label: "Wild", range: [9, 10], description: "Buckle up!" }
];

const getSegmentForLevel = (level: number) => {
  return nsfwSegments.find(seg => level >= seg.range[0] && level <= seg.range[1]) || nsfwSegments[0];
};

const NSFWSlider: React.FC<NSFWSliderProps> = ({ initialLevel, onLevelChange }) => {
  const currentSegment = getSegmentForLevel(initialLevel);

  const handleSliderChange = (value: number[]) => {
    if (value && value.length > 0) {
      onLevelChange(value[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 px-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Spice Level:</span>
        <span className={cn(
          "font-semibold px-2 py-0.5 rounded text-sm",
          initialLevel <= 2 && "text-green-700 bg-green-100",
          initialLevel > 2 && initialLevel <= 6 && "text-yellow-700 bg-yellow-100",
          initialLevel > 6 && initialLevel <= 8 && "text-orange-700 bg-orange-100",
          initialLevel > 8 && "text-red-700 bg-red-100"
        )}>
          {currentSegment.label}
        </span>
      </div>
      
      <Slider
        defaultValue={[initialLevel]}
        value={[initialLevel]}
        min={1}
        max={10}
        step={1}
        className={cn("w-full h-2 rounded-full cursor-pointer",
          "[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-green-400 [&>span:first-child]:via-yellow-400 [&>span:first-child]:to-red-500"
        )}
        onValueChange={handleSliderChange}
        aria-label="NSFW Level Slider"
      />
      
      <p className="text-sm text-muted-foreground text-center mt-2 h-4">
        {currentSegment.description}
      </p>
    </div>
  );
};

export default NSFWSlider; 