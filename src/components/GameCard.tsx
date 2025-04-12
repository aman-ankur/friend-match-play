import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GameCardProps {
  title?: string;
  description?: string;
  className?: string;
  isFlipped?: boolean;
  onClick?: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
  colorScheme?: 'default' | 'purple' | 'orange' | 'blue';
}

const GameCard = ({ 
  title, 
  description, 
  className, 
  isFlipped = false,
  onClick,
  footer,
  children,
  colorScheme = 'default'
}: GameCardProps) => {
  const getHeaderClass = () => {
    switch (colorScheme) {
      case 'purple':
        return 'bg-purple-50';
      case 'orange':
        return 'bg-orange-50';
      case 'blue':
        return 'bg-blue-50';
      default:
        return 'bg-connection-light bg-opacity-50';
    }
  };

  const getTitleClass = () => {
    switch (colorScheme) {
      case 'purple':
        return 'text-purple-600';
      case 'orange':
        return 'text-orange-600';
      case 'blue':
        return 'text-blue-600';
      default:
        return 'text-connection-tertiary';
    }
  };

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-lg', 
        isFlipped && 'animate-card-flip',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {(title || description) && (
        <CardHeader className={getHeaderClass()}>
          {title && <CardTitle className={getTitleClass()}>{title}</CardTitle>}
          {description && <CardDescription className="whitespace-normal break-words">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t border-connection-light bg-connection-light bg-opacity-20 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
