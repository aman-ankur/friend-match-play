import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NSFWSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const NSFWSlider: React.FC<NSFWSliderProps> = ({ value, onChange }) => {
  const nsfwLabels = [
    "PG - Family Friendly",
    "PG-13 - Mildly Spicy",
    "R - Getting Steamy",
    "NC-17 - Hot & Heavy",
    "XXX - Wild Side",
    "XXX+ - No Holds Barred",
    "XXX++ - Danger Zone",
    "XXX+++ - Edge of Sanity",
    "XXX++++ - Unhinged",
    "XXX+++++ - Absolute Chaos"
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Question Spice Level 🌶️</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Slider
            min={1}
            max={10}
            step={1}
            value={[value]}
            onValueChange={(value) => onChange(value[0])}
            className="w-full"
          />
          <div className="text-center">
            <p className="text-lg font-semibold">{nsfwLabels[value - 1]}</p>
            <p className="text-sm text-muted-foreground">
              {value === 1 ? "Safe for grandma" : 
               value === 5 ? "Things are heating up" :
               value === 10 ? "Buckle up, it's about to get wild" :
               "Choose your adventure"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NSFWSlider; 