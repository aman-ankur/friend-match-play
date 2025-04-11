import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import { getQuestionsByMode, GameQuestion, GameMode as SpecificGameMode } from './gameUtils';

// --- Basic Types (Updated: Use nickname) ---
interface Player {
  id: string; // Socket ID
  nickname: string; // Changed from name
  score: number;
}

type AppGameMode = 'solo' | '2player';
type GameStyle = 'prediction' | 'reveal-only';
type RoomStatus = 'waiting' | 'selecting' | 'playing' | 'completed';

interface PlayerResult {
  playerId: string;
  answer: string;
  prediction?: string; // Prediction made BY this player
  predictedPlayerId?: string; // Player ID this player predicted FOR
  isCorrect?: boolean; // Was the prediction correct?
  pointsEarned: number;
}

interface RoundResult {
  questionId: string;
  players: PlayerResult[];
}

interface Room {
  id: string;
  players: Player[];
  gameMode: AppGameMode;
  status: RoomStatus; // Track room status
  // Game specific settings (set when game starts)
  selectedGameMode?: SpecificGameMode;
  selectedGameStyle?: GameStyle;
  questions: GameQuestion[];
  totalRounds: number;
  currentRound: number;
  nsfwLevel: number;
  timerDuration: number;
  currentAnswers: Record<string, string>; // Store answers { playerId: answer }
  readyForNextRound: Set<string>; // Track players ready for next round
  // Add state for answers/predictions per round if needed
  // roundData: Record<number, { answers: Record<string, string>, predictions?: Record<string, string> }>;
  // Store predictions for the current round in prediction mode
  currentPredictions?: Record<string, { predictedPlayerId: string, prediction: string }>; // { predictorId: { predictedPlayerId, prediction } }
}

// --- In-Memory Room Storage --- 
// !! IMPORTANT: This is lost when the server restarts.
// !! For persistence, use a database (Redis, PostgreSQL, MongoDB, etc.)
const rooms: Record<string, Room> = {};

// --- Helper Function ---
const generateRoomId = (length = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Ensure uniqueness (rare collision chance, but good practice)
  if (rooms[result]) {
    return generateRoomId(length);
  }
  return result;
};

const PORT = process.env.PORT || 3001; // Use port 3001 for the backend

const app = express();

// Configure CORS
// Allow requests from your frontend development server (assuming Vite default port 5173)
// TODO: In production, restrict this to your actual frontend domain
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'YOUR_FRONTEND_URL' : 'http://localhost:5173',
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: corsOptions, // Also configure CORS for Socket.IO
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`);

  // --- Create Room Handler ---
  socket.on('createRoom', (data: { playerName: string; gameMode: AppGameMode }) => {
    const { playerName, gameMode } = data;
    if (!playerName || !gameMode) {
      socket.emit('error', { message: 'Missing player name or game mode' });
      console.error(`[${socket.id}] createRoom failed: Missing data`);
      return;
    }
    const roomId = generateRoomId();
    const creator: Player = { id: socket.id, nickname: playerName, score: 0 };
    const newRoom: Room = {
      id: roomId,
      players: [creator],
      gameMode: gameMode,
      status: gameMode === 'solo' ? 'selecting' : 'waiting',
      currentAnswers: {},
      readyForNextRound: new Set<string>(),
      questions: [],
      totalRounds: 5,
      currentRound: 0,
      nsfwLevel: 1,
      timerDuration: 0,
    };
    rooms[roomId] = newRoom;
    socket.join(roomId);
    console.log(`[${socket.id}] created room ${roomId} (Mode: ${gameMode}) - Creator: ${playerName}`);
    socket.emit('roomCreated', { roomId });
    
    if (gameMode === 'solo') {
        socket.emit('roomReady', { players: newRoom.players });
        console.log(`Emitted 'roomReady' to solo room ${roomId}`);
    }
  });

  // --- Join Room Handler ---
  socket.on('joinRoom', (data: { playerName: string; roomId: string }) => {
    const { playerName, roomId } = data;
    if (!playerName || !roomId) {
      socket.emit('error', { message: 'Missing player name or room ID' });
      console.error(`[${socket.id}] joinRoom failed: Missing data`);
      return;
    }

    const room = rooms[roomId];

    // Validation
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} not found.` });
      console.warn(`[${socket.id}] joinRoom failed: Room ${roomId} not found`);
      return;
    }

    if (room.gameMode !== '2player') {
      socket.emit('error', { message: `Room ${roomId} is a solo game.` });
      console.warn(`[${socket.id}] joinRoom failed: Room ${roomId} is not 2player mode`);
      return;
    }

    if (room.players.length >= 2) {
      socket.emit('error', { message: `Room ${roomId} is already full.` });
      console.warn(`[${socket.id}] joinRoom failed: Room ${roomId} is full`);
      return;
    }

    if (room.players.some(p => p.id === socket.id)) {
        // Should not happen if UI prevents joining own room, but good sanity check
        socket.emit('error', { message: `You are already in room ${roomId}.` });
        console.warn(`[${socket.id}] joinRoom failed: Already in room ${roomId}`);
        return;
    }

    // Add player to room (Use nickname here)
    const newPlayer: Player = { id: socket.id, nickname: playerName, score: 0 };
    room.players.push(newPlayer);
    socket.join(roomId);
    room.status = 'selecting';

    console.log(`[${socket.id}] player ${playerName} joined room ${roomId}`);

    // Notify the joining player ONLY (Confirmation)
    socket.emit('joinSuccess', { 
        roomId: room.id, 
        players: room.players 
    });

    // Notify EVERYONE in the room that it's ready
    io.to(roomId).emit('roomReady', { 
        players: room.players 
    });
    console.log(`Emitted 'roomReady' to room ${roomId}`);
  });

  // --- Start Game Handler ---
  socket.on('startGame', (data: { 
      roomId: string; 
      gameMode: SpecificGameMode; 
      gameStyle: GameStyle;
      nsfwLevel: number;
      timerDuration: number;
      totalRounds: number;
  }) => {
    const { roomId, gameMode, gameStyle, nsfwLevel, timerDuration, totalRounds } = data;
    const room = rooms[roomId];

    // Validation
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} not found for startGame.` });
      return;
    }
    if (room.players.length < (room.gameMode === 'solo' ? 1 : 2)) {
        socket.emit('error', { message: `Not enough players in room ${roomId} to start.` });
        return;
    }
    // Only allow creator (first player) to start the game in 2p mode
    if (room.gameMode === '2player' && room.players[0]?.id !== socket.id) {
        socket.emit('error', { message: `Only the room creator can start the game.` });
        return;
    }
    if (room.status !== 'selecting') {
        socket.emit('error', { message: `Game in room ${roomId} cannot be started (current status: ${room.status}).` });
        return;
    }

    // Generate Questions
    const questions = getQuestionsByMode(gameMode, totalRounds, nsfwLevel);
    if (!questions || questions.length < totalRounds) {
        socket.emit('error', { message: `Could not generate enough questions for the selected settings.` });
        console.error(`Failed to get enough questions for room ${roomId}, mode ${gameMode}, count ${totalRounds}, nsfw ${nsfwLevel}`);
        return;
    }

    // Update Room State
    room.status = 'playing';
    room.selectedGameMode = gameMode;
    room.selectedGameStyle = gameStyle;
    room.nsfwLevel = nsfwLevel;
    room.timerDuration = timerDuration;
    room.totalRounds = totalRounds;
    room.questions = questions;
    room.currentRound = 1;
    room.currentAnswers = {};
    room.readyForNextRound = new Set<string>();
    room.players.forEach(p => p.score = 0);
    // Initialize predictions structure if in prediction mode
    if (room.selectedGameStyle === 'prediction') {
      room.currentPredictions = {};
    } else {
      // Ensure it's not present otherwise, making checks easier later
      delete room.currentPredictions;
    }

    console.log(`Game starting in room ${roomId}. Mode: ${gameMode}, Style: ${gameStyle}, Rounds: ${totalRounds}`);

    // Broadcast game start to all players in the room
    io.to(roomId).emit('gameStarted', { 
        players: room.players,
        selectedGameMode: room.selectedGameMode,
        selectedGameStyle: room.selectedGameStyle,
        nsfwLevel: room.nsfwLevel,
        timerDuration: room.timerDuration,
        totalRounds: room.totalRounds,
        questions: room.questions,
        currentRound: room.currentRound
    });
  });

  // --- Submit Answer Handler ---
  socket.on('submitAnswer', (data: { roomId: string; answer: string }) => {
    const { roomId, answer } = data;
    const room = rooms[roomId];
    const playerId = socket.id;

    // Validation
    if (!room) return;
    if (room.status !== 'playing') return;
    if (!room.players.some(p => p.id === playerId)) return;
    if (room.currentAnswers[playerId]) return;
    // Optional: Validate answer against question options?

    room.currentAnswers[playerId] = answer;
    console.log(`[${playerId}] submitted answer for round ${room.currentRound} in room ${roomId}`);

    const activePlayers = room.players;
    // Check if all players have submitted answers
    if (Object.keys(room.currentAnswers).length === activePlayers.length) {
      console.log(`All answers received for round ${room.currentRound} in room ${roomId}.`);

      // --- Prediction Mode Logic ---
      if (room.selectedGameStyle === 'prediction') {
        // Reset predictions structure for this round's prediction phase
        room.currentPredictions = {}; 
        // Emit event to tell clients to switch to prediction phase
        io.to(roomId).emit('predictionPhase', { round: room.currentRound });
        console.log(`Emitted 'predictionPhase' for round ${room.currentRound} to room ${roomId}`);
        // DO NOT proceed to results yet, wait for predictions
      } else {
        // --- Reveal-Only Mode Logic ---
        // Calculate basic results (no scoring in this example for reveal-only)
        const results: RoundResult = {
          questionId: room.questions[room.currentRound - 1]?.id || 'unknown',
          players: room.players.map(p => ({
            playerId: p.id,
            answer: room.currentAnswers[p.id] || '',
            pointsEarned: 0 
            // No prediction data needed
          }))
        };

        // Emit results
        io.to(roomId).emit('roundResults', {
          round: room.currentRound,
          results: results
        });
        console.log(`Emitted 'roundResults' (Reveal) for round ${room.currentRound} to room ${roomId}`);
        room.readyForNextRound.clear(); // Prepare for player ready signals
      }
    } else {
      console.log(`Waiting for more answers in round ${room.currentRound} in room ${roomId} (${Object.keys(room.currentAnswers).length}/${activePlayers.length})`);
    }
  });

  // --- Submit Prediction Handler (NEW) ---
  socket.on('submitPrediction', (data: { roomId: string; prediction: string; predictedPlayerId: string }) => {
    const { roomId, prediction, predictedPlayerId } = data;
    const room = rooms[roomId];
    const predictorId = socket.id;

    // Validation
    if (!room) return socket.emit('error', { message: `Room ${roomId} not found.` });
    if (room.status !== 'playing') return socket.emit('error', { message: `Game not active.` });
    if (room.selectedGameStyle !== 'prediction') return socket.emit('error', { message: `Game is not in prediction mode.` });
    // Ensure currentPredictions exists (should have been initialized)
    if (!room.currentPredictions) return socket.emit('error', { message: `Internal server error: Predictions not ready.` });
    if (!room.players.some(p => p.id === predictorId)) return socket.emit('error', { message: `You are not in this game.` });
    // Prevent double submission
    if (room.currentPredictions[predictorId]) return socket.emit('error', { message: `You have already submitted your prediction for this round.` });
    // Ensure the predicted player is actually in the room
    if (!room.players.some(p => p.id === predictedPlayerId)) return socket.emit('error', { message: `Predicted player (${predictedPlayerId}) not found.` });
    // Prevent predicting self
    if (predictorId === predictedPlayerId) return socket.emit('error', { message: `You cannot predict your own answer.` });

    // Store the prediction
    room.currentPredictions[predictorId] = { predictedPlayerId, prediction };
    console.log(`[${predictorId}] submitted prediction for ${predictedPlayerId} in round ${room.currentRound} in room ${roomId}`);

    const activePlayers = room.players;
    // Check if all players have submitted predictions
    if (Object.keys(room.currentPredictions).length === activePlayers.length) {
      console.log(`All predictions received for round ${room.currentRound} in room ${roomId}. Calculating results...`);

      // --- Calculate Scores for Prediction Mode ---
      const pointsForCorrectPrediction = 2; // Points for guessing the other player's answer correctly
      // const pointsForMatchingAnswer = 1; // Optional: Points if your answer matched the other player's answer (independent of prediction)

      const playerResults: PlayerResult[] = room.players.map(player => {
        const playerId = player.id;
        const answer = room.currentAnswers[playerId] || ''; // Player's own answer
        const predictionData = room.currentPredictions![playerId]; // Prediction made *by* this player
        
        let pointsEarned = 0;
        let isPredictionCorrect: boolean | undefined = undefined;

        // Calculate points based on prediction
        if (predictionData) {
          const predictedPlayerId = predictionData.predictedPlayerId;
          const predictedAnswer = predictionData.prediction;
          const actualAnswerOfPredictedPlayer = room.currentAnswers[predictedPlayerId];

          // Check if the prediction matches the predicted player's actual answer
          if (actualAnswerOfPredictedPlayer !== undefined && predictedAnswer === actualAnswerOfPredictedPlayer) {
            isPredictionCorrect = true;
            pointsEarned += pointsForCorrectPrediction;
            console.log(`[${playerId}] correctly predicted [${predictedPlayerId}]'s answer (${predictedAnswer}). +${pointsForCorrectPrediction} points.`);
          } else {
            isPredictionCorrect = false;
            console.log(`[${playerId}] incorrectly predicted [${predictedPlayerId}]'s answer (Predicted: ${predictedAnswer}, Actual: ${actualAnswerOfPredictedPlayer}).`);
          }
        } else {
           console.warn(`[${playerId}] missing prediction data for round ${room.currentRound}`);
        }
        
        // Optional: Award points if players' *answers* match
        // const otherPlayerId = room.players.find(p => p.id !== playerId)?.id;
        // if (otherPlayerId && room.currentAnswers[playerId] === room.currentAnswers[otherPlayerId]) {
            // console.log(`[${playerId}] and [${otherPlayerId}] had matching answers (${room.currentAnswers[playerId]}). +${pointsForMatchingAnswer} points (optional).`);
            // pointsEarned += pointsForMatchingAnswer; 
        // }

        // Update player's total score in the room state
        player.score += pointsEarned;

        // Structure the result for this player
        return {
          playerId: playerId,
          answer: answer,
          prediction: predictionData ? predictionData.prediction : undefined,
          predictedPlayerId: predictionData ? predictionData.predictedPlayerId : undefined,
          isCorrect: isPredictionCorrect,
          pointsEarned: pointsEarned
        };
      });

      // Structure the overall round result
      const results: RoundResult = {
        questionId: room.questions[room.currentRound - 1]?.id || 'unknown',
        players: playerResults
      };

      // Emit results including predictions and scores
      io.to(roomId).emit('roundResults', {
        round: room.currentRound,
        results: results
      });
      console.log(`Emitted 'roundResults' (Prediction) for round ${room.currentRound} to room ${roomId}`);
      // Reset ready state for the next round confirmation
      room.readyForNextRound.clear(); 
    } else {
      // Wait for more predictions
      console.log(`Waiting for more predictions in round ${room.currentRound} in room ${roomId} (${Object.keys(room.currentPredictions).length}/${activePlayers.length})`);
    }
  });

  // --- Player Ready Handler ---
  socket.on('playerReady', (data: { roomId: string }) => {
    const { roomId } = data;
    const room = rooms[roomId];
    const playerId = socket.id;

    // Validation
    if (!room) return socket.emit('error', { message: `Room ${roomId} not found.` });
    if (room.status !== 'playing') return socket.emit('error', { message: `Game not active.` });
    if (!room.players.some(p => p.id === playerId)) return socket.emit('error', { message: `You are not in room ${roomId}.` });
    
    // --- Check if results have been sent for the current round ---
    // This implies that answers (and predictions if applicable) have been processed.
    const answersComplete = Object.keys(room.currentAnswers).length === room.players.length;
    const predictionsComplete = room.selectedGameStyle === 'prediction' 
        ? (room.currentPredictions && Object.keys(room.currentPredictions).length === room.players.length) 
        : true; // Predictions are always considered "complete" in reveal mode
    
    // We should only allow 'playerReady' *after* the 'roundResults' for the current round have been emitted.
    // The client UI should disable the 'Continue' button until results are shown.
    // The check for answers/predictions completion prevents advancing *before* results are calculated/sent.
    if (!answersComplete || !predictionsComplete) {
      console.warn(`[${playerId}] tried to ready up in room ${roomId} before round results were processed (Answers: ${answersComplete}, Predictions: ${predictionsComplete})`);
      return socket.emit('error', { message: `Round results are not yet available. Please wait.` });
    }

    if (room.readyForNextRound.has(playerId)) {
        console.log(`[${playerId}] already marked as ready in room ${roomId}`);
        return; // Already marked ready
    }

    console.log(`[${playerId}] marked as ready for next round in room ${roomId}`);
    room.readyForNextRound.add(playerId);

    // Check if all players are ready
    if (room.readyForNextRound.size === room.players.length) {
        console.log(`All players ready in room ${roomId}. Proceeding...`);
        
        // --- Advance Round Logic ---
        room.currentRound++;
        // Clear data for the new round
        room.currentAnswers = {}; 
        if (room.selectedGameStyle === 'prediction') {
          // Reset predictions structure for the new round
          room.currentPredictions = {}; 
        }
        // Clear ready set for the new round
        room.readyForNextRound.clear(); 

        if (room.currentRound > room.totalRounds) {
            // --- Game Over --- 
            console.log(`Game ended in room ${roomId}`);
            room.status = 'completed';
            io.to(roomId).emit('gameOver', { 
                finalScores: room.players.reduce((acc, p) => { acc[p.id] = p.score; return acc; }, {} as Record<string, number>)
            }); 
            console.log(`Emitted 'gameOver' to room ${roomId}`);
        } else {
            console.log(`Starting next round (${room.currentRound}) in room ${roomId}`);
            io.to(roomId).emit('newRound', { 
                currentRound: room.currentRound 
            });
            console.log(`Emitted 'newRound' (${room.currentRound}) to room ${roomId}`);
        }
    } else {
        console.log(`Waiting for other players to be ready in room ${roomId} (${room.readyForNextRound.size}/${room.players.length})`);
        // Optionally notify others that this player is ready
        // socket.to(roomId).emit('playerIsReady', { playerId });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        const leavingPlayer = room.players.splice(playerIndex, 1)[0];
        console.log(`Player ${leavingPlayer.nickname} (${socket.id}) removed from room ${roomId}`);
        
        if (room.players.length > 0 && room.status !== 'waiting') {
            io.to(roomId).emit('playerLeft', { playerId: socket.id, playerName: leavingPlayer.nickname });
            console.log(`Notified room ${roomId} that player ${leavingPlayer.nickname} left`);
        } else if (room.players.length === 0) {
            console.log(`Room ${roomId} is empty, deleting.`);
            delete rooms[roomId];
        }
        break; 
      }
    }
  });

  // TODO: Add handlers for game events ('selectAnswer', 'predictAnswer', etc.)
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 