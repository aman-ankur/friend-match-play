import React, { useEffect, useState } from 'react';
import { Clock, Hourglass, Timer, Bomb } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TimerWidgetProps {
  timeLeft: number;      // Current seconds remaining (controlled by parent)
  totalDuration: number; // Initial duration for percentage calculation
}

const TimerWidget: React.FC<TimerWidgetProps> = ({ timeLeft, totalDuration }) => {
  // Prevent rendering or calculation issues if totalDuration is invalid
  if (totalDuration <= 0) {
    return null;
  }

  // Animation state for the time number
  const [animatePop, setAnimatePop] = useState(false);
  
  // Trigger pop animation when timeLeft changes
  useEffect(() => {
    setAnimatePop(true);
    const timer = setTimeout(() => setAnimatePop(false), 300);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Ensure timeLeft doesn't go below 0 for calculations
  const displayTime = Math.max(0, timeLeft);
  
  // Calculate percentage, handle potential division by zero (though already checked)
  const percentage = totalDuration > 0 ? (displayTime / totalDuration) * 100 : 0;
  
  // Dynamic styling based on time remaining
  const isLow = displayTime <= 5 && displayTime > 0;
  const isMedium = displayTime <= totalDuration * 0.5 && displayTime > totalDuration * 0.25;
  const isCritical = displayTime <= totalDuration * 0.25;
  
  // Select icon based on time remaining
  const TimerIcon = isLow ? Bomb : (isCritical ? Hourglass : Clock);
  
  // Calculate gradient rotation based on time remaining
  const gradientRotation = 90 + (360 * (1 - percentage / 100));
  
  // Background style
  const bgStyle = {
    background: isLow 
      ? `conic-gradient(from ${gradientRotation}deg at 50% 50%, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.8) ${percentage}%, rgba(239, 68, 68, 0.05) ${percentage}%)`
      : isCritical
      ? `conic-gradient(from ${gradientRotation}deg at 50% 50%, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.8) ${percentage}%, rgba(234, 179, 8, 0.05) ${percentage}%)`
      : `conic-gradient(from ${gradientRotation}deg at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.8) ${percentage}%, rgba(59, 130, 246, 0.05) ${percentage}%)`,
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center w-16 h-16 rounded-full overflow-hidden",
        "transition-all duration-150 ease-out transform",
        isLow && "animate-bounce shadow-neon-red",
        isCritical && !isLow && "animate-pulse shadow-neon-yellow",
        !isLow && !isCritical && "shadow-neon"
      )}
      style={bgStyle}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-1 rounded-full bg-white/20 backdrop-blur-xs"></div>
      
      {/* Timer content */}
      <div className={cn(
        "relative z-10 flex flex-col items-center justify-center w-full h-full rounded-full bg-white/80 backdrop-blur-sm",
        isLow ? "text-red-600" : isCritical ? "text-amber-600" : "text-blue-600",
        animatePop && "animate-scale-in"
      )}>
        {/* Icon */}
        <TimerIcon 
          size={16} 
          className={cn(
            "mb-0.5",
            isLow && "animate-spin text-red-600"
          )} 
        />
        
        {/* Time number */}
        <span className={cn(
          "text-xl font-bold tracking-tight",
          animatePop && "scale-110 transition-transform duration-300"
        )}>
          {displayTime}
        </span>
      </div>
    </div>
  );
};

export default TimerWidget; 