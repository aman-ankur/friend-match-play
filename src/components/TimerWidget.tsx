import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

interface TimerWidgetProps {
  duration: number; // Duration in seconds
  onTimeout?: () => void; // Optional callback when timer hits 0
}

const TimerWidget: React.FC<TimerWidgetProps> = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval when duration changes or component unmounts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only start interval if duration is positive
    if (duration > 0) {
      setTimeLeft(duration); // Reset time left when duration changes

      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            if (onTimeout) {
              onTimeout();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration, onTimeout]);

  // Don't render anything if duration is 0
  if (duration <= 0) {
    return null;
  }

  const percentage = (timeLeft / duration) * 100;
  const strokeDashoffset = 283 * (1 - percentage / 100); // 283 is approx circumference (2 * pi * 45)

  // Determine color based on time left
  let colorClass = 'text-green-500';
  if (percentage <= 50) colorClass = 'text-yellow-500';
  if (percentage <= 25) colorClass = 'text-red-500';

  return (
    <div className="relative flex flex-col items-center justify-center w-20 h-20 mb-4">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        ></circle>
        {/* Progress circle */}
        <circle
          className={`${colorClass} stroke-current transition-all duration-500 ease-linear`}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeDasharray="283"
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)" // Start from the top
        ></circle>
      </svg>
      {/* Time left text */}
      <div className="absolute flex flex-col items-center">
         <Clock size={20} className={`mb-0.5 ${colorClass}`} />
         <span className={`text-lg font-semibold ${colorClass}`}>{timeLeft}</span>
      </div>
    </div>
  );
};

export default TimerWidget; 