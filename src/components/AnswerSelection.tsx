import React from 'react';
import { Button } from '@/components/ui/button';

interface AnswerSelectionProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  disabled?: boolean; // Optional disabled state
  getOptionLabel?: (option: string) => string;
  layout?: 'column' | 'grid';
}

const AnswerSelection: React.FC<AnswerSelectionProps> = ({ 
    options, 
    onSelect,
    disabled = false,
    getOptionLabel = (option) => option
}) => {
  return (
    <div className="grid gap-4">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className="p-6 h-auto justify-center text-center hover:bg-connection-light hover:text-connection-tertiary transition-all border-connection-light disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onSelect(option)}
          disabled={disabled}
        >
          <span className="text-md whitespace-normal break-words">{getOptionLabel(option)}</span>
        </Button>
      ))}
    </div>
  );
};

export default AnswerSelection;
