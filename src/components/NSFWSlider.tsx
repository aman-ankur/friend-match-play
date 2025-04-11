import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NSFWSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const nsfwSegments = [
  { label: "Mild", range: [1, 2], representativeValue: 1, description: "Safe for most" },
  { label: "Medium", range: [3, 4], representativeValue: 3, description: "Getting warmer" },
  { label: "Spicy", range: [5, 6], representativeValue: 5, description: "Things are heating up" },
  { label: "Hot", range: [7, 8], representativeValue: 7, description: "Getting steamy" },
  { label: "Wild", range: [9, 10], representativeValue: 9, description: "Buckle up!" }
];

const NSFWSlider: React.FC<NSFWSliderProps> = ({ value, onChange }) => {
  const selectedSegment = nsfwSegments.find(seg => value >= seg.range[0] && value <= seg.range[1]) || nsfwSegments[0];

  return (
    <Card className="w-full max-w-lg mx-auto mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg">Question Spice Level 🌶️</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-1 mb-3">
          {nsfwSegments.map((segment) => (
            <Button
              key={segment.label}
              variant={selectedSegment.label === segment.label ? "default" : "outline"}
              className={cn(
                "flex-1 transition-all duration-200 ease-in-out",
                selectedSegment.label === segment.label 
                  ? "bg-connection-primary hover:bg-connection-secondary text-white"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              )}
              onClick={() => onChange(segment.representativeValue)}
            >
              {segment.label}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center h-4">
          {selectedSegment.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default NSFWSlider; 