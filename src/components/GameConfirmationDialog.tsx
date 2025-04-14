import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { GameMode as SpecificGameMode, GameStyle, Player } from "@/types/game";
import { Badge } from "./ui/badge";
import { Clock, Shield, Gamepad2 } from "lucide-react";

// Define game descriptions (mirroring the definition in GameRoom.tsx)
const GAME_DESCRIPTIONS: Record<SpecificGameMode, { title: string; description: string }> = {
  'this-or-that': {
    title: 'This or That',
    description: 'Choose between two options and see if your friend picks the same one.'
  },
  'guess-who-i-am': {
    title: 'Guess Who I Am',
    description: 'Describe yourself in a specific situation and see if your friend can guess who you are.'
  },
  'hot-takes': {
    title: 'Hot Takes',
    description: 'Share your opinions on controversial topics and see if your friend agrees.'
  }
};

interface GameConfirmationDialogProps {
  open: boolean;
  gameMode: SpecificGameMode;
  gameStyle: GameStyle;
  nsfwLevel: number;
  totalRounds: number;
  timerDuration: number | null;
  isExclusiveModeActive: boolean;
  creatorName: string;
  onConfirm: () => void;
}

const GameConfirmationDialog: React.FC<GameConfirmationDialogProps> = ({
  open,
  gameMode,
  gameStyle,
  nsfwLevel,
  totalRounds,
  timerDuration,
  isExclusiveModeActive,
  creatorName,
  onConfirm,
}) => {
  const gameTitle = GAME_DESCRIPTIONS[gameMode]?.title || "Game";
  const gameDescription = GAME_DESCRIPTIONS[gameMode]?.description || "";
  
  // Format NSFW level as text
  const nsfwText = nsfwLevel === 0 
    ? "Family Friendly" 
    : nsfwLevel === 1 
    ? "Mild" 
    : nsfwLevel === 2 
    ? "Spicy" 
    : "Very Spicy";

  // Format timer duration as text
  const timerText = !timerDuration 
    ? "No Time Limit" 
    : `${timerDuration} seconds`;

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900 border-connection-primary animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-connection-primary">
            {creatorName}'s Game Invite
          </DialogTitle>
          <DialogDescription className="text-lg">
            Ready to play <span className="font-semibold">{gameTitle}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-connection-primary" />
              Game Mode
            </h3>
            <p className="text-sm text-muted-foreground mb-1">{gameTitle}</p>
            <p className="text-sm">{gameDescription}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="font-medium mb-1 flex items-center gap-1">
                <Shield className="h-4 w-4 text-connection-primary" />
                Content Level
              </h4>
              <Badge variant={nsfwLevel > 1 ? "destructive" : "secondary"} className="mt-1">
                {nsfwText}
              </Badge>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="font-medium mb-1 flex items-center gap-1">
                <Clock className="h-4 w-4 text-connection-primary" />
                Time Limit
              </h4>
              <Badge variant="outline" className="mt-1">
                {timerText}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="font-medium">Game Style</h4>
              <p className="text-sm text-muted-foreground">
                {gameStyle === "prediction" 
                  ? "Prediction (guess others' answers)" 
                  : "Reveal Only (see answers after)"}
              </p>
            </div>
            <Badge variant="outline" className="capitalize">
              {gameStyle}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div>
              <h4 className="font-medium">Number of Rounds</h4>
              <p className="text-sm text-muted-foreground">
                Total game rounds
              </p>
            </div>
            <Badge className="bg-connection-primary hover:bg-connection-primary">
              {totalRounds}
            </Badge>
          </div>
          
          {isExclusiveModeActive && (
            <div className="bg-connection-light dark:bg-slate-800/60 rounded-lg p-3 border border-connection-primary">
              <h4 className="font-medium text-connection-primary">Exclusive Mode Active</h4>
              <p className="text-sm">Special questions will be used!</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button 
            onClick={onConfirm}
            className="w-full bg-connection-primary hover:bg-connection-secondary text-lg py-6"
          >
            Let's Play!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameConfirmationDialog; 