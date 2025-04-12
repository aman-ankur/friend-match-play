import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface PinEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  title?: string;
  message?: string;
}

const PinEntryModal: React.FC<PinEntryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Enter verification code",
  message = "Enter the PIN to activate exclusive mode"
}) => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Setup input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  // Reset PIN when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPin(['', '', '', '']);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePinChange = (index: number, value: string) => {
    // Only allow one character
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }
    
    // Removed digit-only validation to allow alphanumeric PIN

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (pin[index] === '') {
        // Move to previous input if current is empty
        if (index > 0 && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        // Clear current input
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      }
    }
    
    // Handle left arrow
    if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    
    // Handle right arrow
    if (e.key === 'ArrowRight' && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    const fullPin = pin.join('');
    if (fullPin.length === 4) {
      onSubmit(fullPin);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 rounded-full p-4 mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <p className="text-gray-600 text-center mt-2">{message}</p>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={el => inputRefs.current[index] = el}
              value={digit}
              onChange={e => handlePinChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              maxLength={1}
              className="w-16 h-16 text-center text-2xl border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            disabled={pin.some(digit => digit === '')}
            onClick={handleSubmit}
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PinEntryModal; 