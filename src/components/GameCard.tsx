
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
}

const GameCard = ({ 
  title, 
  description, 
  className, 
  isFlipped = false,
  onClick,
  footer,
  children 
}: GameCardProps) => {
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
        <CardHeader className="bg-connection-light bg-opacity-50">
          {title && <CardTitle className="text-connection-tertiary">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
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
