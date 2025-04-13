import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface NSFWSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
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

const NSFWSlider: React.FC<NSFWSliderProps> = ({ value, onValueChange, disabled = false }) => {
  const currentSegment = getSegmentForLevel(value);

  const handleSliderChange = (value: number[]) => {
    if (!disabled && value && value.length > 0) {
      onValueChange(value[0]);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto mb-6 px-4", disabled && "opacity-50 cursor-not-allowed")}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Spice Level:</span>
        <span className={cn(
          "font-semibold px-2 py-0.5 rounded text-sm",
          value <= 2 && "text-green-700 bg-green-100",
          value > 2 && value <= 6 && "text-yellow-700 bg-yellow-100",
          value > 6 && value <= 8 && "text-orange-700 bg-orange-100",
          value > 8 && "text-red-700 bg-red-100"
        )}>
          {currentSegment.label}
        </span>
      </div>
      
      <Slider
        defaultValue={[value]}
        value={[value]}
        min={1}
        max={10}
        step={1}
        disabled={disabled}
        className={cn(
          "w-full h-2 rounded-full",
          !disabled && "cursor-pointer",
          "[&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-green-400 [&>span:first-child]:via-yellow-400 [&>span:first-child]:to-red-500",
          "[&>span:last-child]:appearance-none [&>span:last-child]:bg-transparent [&>span:last-child]:border-none",
          "[&>span:last-child]:w-6 [&>span:last-child]:h-6 [&>span:last-child]:rounded-full",
          "[&>span:last-child]:relative [&>span:last-child]:-top-2",
          "before:[&>span:last-child]:content-['🔥'] before:[&>span:last-child]:text-xl",
          "before:[&>span:last-child]:absolute before:[&>span:last-child]:inset-0",
          "before:[&>span:last-child]:flex before:[&>span:last-child]:items-center before:[&>span:last-child]:justify-center"
        )}
        onValueChange={handleSliderChange}
        aria-label="NSFW Level Slider"
        aria-disabled={disabled}
      />
      
      <p className="text-sm text-muted-foreground text-center mt-2 h-4">
        {currentSegment.description}
      </p>
    </div>
  );
};

export default NSFWSlider; 