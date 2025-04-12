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

const app = express();
const httpServer = http.createServer(app);

// --- CORS Configuration --- 
const allowedOrigins = [
    process.env.VITE_SOCKET_URL, // Dynamically read Vercel Frontend URL from env var set on Render
    'http://localhost:5173'     // Local development frontend
].filter(Boolean); // Filter out undefined/null if VITE_SOCKET_URL isn't set

const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        // Allow requests with no origin (like mobile apps, curl) or from allowed origins
        if (!origin || allowedOrigins.includes(origin)) { // Type assertion no longer needed
            callback(null, true);
        } else {
            console.warn(`CORS blocked for origin: ${origin}`); // Log blocked origins
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'], // Adjust methods if needed
    credentials: true // Important if your frontend needs to send cookies
};

app.use(cors(corsOptions)); // Use CORS for Express routes

const io = new SocketIOServer(httpServer, {
  cors: corsOptions, // Use the same CORS options for Socket.IO
});

// --- PORT Configuration --- 
const PORT = process.env.PORT || 3001; // Use Render's port or 3001 locally

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

    console.log(`Starting game in room ${roomId}: Mode=${gameMode}, Style=${gameStyle}, Rounds=${totalRounds}, Timer=${timerDuration ?? 'None'}`);

    // Emit 'gameStarted' to all clients in the room
    io.to(roomId).emit('gameStarted', {
      gameMode: room.selectedGameMode,
      gameStyle: room.selectedGameStyle,
      currentRound: room.currentRound,
      totalRounds: room.totalRounds,
      players: room.players,
      questions: room.questions,
      timerDuration: room.timerDuration
    });
    console.log(`[${roomId}] Emitted gameStarted with ${room.questions.length} questions.`);
  });

  // --- Submit Answer Handler ---
  socket.on('submitAnswer', (data: { roomId: string; answer: string }) => {
    const { roomId, answer } = data;
    const room = rooms[roomId];
    if (!room || room.status !== 'playing') {
      socket.emit('error', { message: `Cannot submit answer for room ${roomId}.` });
      return;
    }
    if (room.currentAnswers[socket.id]) {
      socket.emit('error', { message: `You have already submitted an answer for this round.` });
      return; // Prevent overwriting answer
    }

    console.log(`[${roomId}] Player ${socket.id} submitted answer.`);
    room.currentAnswers[socket.id] = answer;

    // Check if all players have answered
    const allPlayersAnswered = room.players.every(player => room.currentAnswers[player.id]);
    
    if (allPlayersAnswered) {
      console.log(`[${roomId}] All players answered for round ${room.currentRound}. Emitting roundComplete.`);
      io.to(roomId).emit('roundComplete', { roundNumber: room.currentRound }); // Notify clients round is complete (stop timers)
      
      // Process results immediately (or could add a slight delay)
      processRoundResults(room);
    }
  });

  // --- Submit Prediction Handler (Prediction Mode Only) ---
  socket.on('submitPrediction', (data: { roomId: string; predictedPlayerId: string; prediction: string }) => {
    const { roomId, predictedPlayerId, prediction } = data;
    const room = rooms[roomId];
    if (!room || room.status !== 'playing' || room.selectedGameStyle !== 'prediction') {
      socket.emit('error', { message: `Cannot submit prediction for room ${roomId}.` });
      return;
    }
    if (!room.currentPredictions) room.currentPredictions = {}; // Ensure structure exists
    if (room.currentPredictions[socket.id]) {
      socket.emit('error', { message: `You have already submitted a prediction for this round.` });
      return; // Prevent overwriting prediction
    }
    // Validate predictedPlayerId exists in the room and is not the predictor
    if (!room.players.some(p => p.id === predictedPlayerId) || predictedPlayerId === socket.id) {
        socket.emit('error', { message: 'Invalid player selected for prediction.' });
        return;
    }

    console.log(`[${roomId}] Player ${socket.id} submitted prediction for ${predictedPlayerId}.`);
    room.currentPredictions[socket.id] = { predictedPlayerId, prediction };

    // Check if all players have submitted *both* answer and prediction
    const allPlayersSubmitted = room.players.every(
      player => room.currentAnswers[player.id] && room.currentPredictions![player.id]
    );

    if (allPlayersSubmitted) {
      console.log(`[${roomId}] All players answered and predicted for round ${room.currentRound}. Emitting roundComplete.`);
      io.to(roomId).emit('roundComplete', { roundNumber: room.currentRound }); // Notify clients round is complete (stop timers)
      
      // Process results immediately
      processRoundResults(room); // This function now handles both modes
    }
  });

  // --- Player Ready for Next Round Handler ---
  socket.on('playerReady', (data: { roomId: string }) => {
    const { roomId } = data;
    const room = rooms[roomId];
    if (!room) return; // Room might have been cleaned up

    room.readyForNextRound.add(socket.id);
    console.log(`[${roomId}] Player ${socket.id} is ready for next round.`);

    // Check if all players are ready
    const allPlayersReady = room.players.every(player => room.readyForNextRound.has(player.id));

    if (allPlayersReady) {
      console.log(`[${roomId}] All players ready. Proceeding to next round or game over.`);
      // Move to the next round or end the game
      room.currentRound++;
      if (room.currentRound > room.totalRounds) {
        // Game Over
        endGame(room);
      } else {
        // Start Next Round
        startNextRound(room);
      }
    }
  });

  // --- Round Timer Expired Handler --- 
  socket.on('roundTimerExpired', (data: { roomId: string }) => {
      const { roomId } = data;
      const room = rooms[roomId];
      if (!room || room.status !== 'playing') return;

      console.log(`[${roomId}] Round timer expired for round ${room.currentRound}.`);

      // Determine which players did *not* submit an answer/prediction in time
      const playersWhoDidNotSubmit = room.players.filter(p => !room.currentAnswers[p.id]);
      // In prediction mode, also check predictions
      const playersWhoDidNotPredict = room.selectedGameStyle === 'prediction' ? room.players.filter(p => !room.currentPredictions?.[p.id]) : [];

      if (playersWhoDidNotSubmit.length > 0) {
          console.log(`[${roomId}] Players who didn't answer:`, playersWhoDidNotSubmit.map(p => p.id));
          // Assign default/empty answers for scoring purposes
          playersWhoDidNotSubmit.forEach(p => {
              if (!room.currentAnswers[p.id]) room.currentAnswers[p.id] = "[Time Expired]";
          });
      }
      if (playersWhoDidNotPredict.length > 0) {
           console.log(`[${roomId}] Players who didn't predict:`, playersWhoDidNotPredict.map(p => p.id));
           playersWhoDidNotPredict.forEach(p => {
               if (!room.currentPredictions) room.currentPredictions = {};
               if (!room.currentPredictions[p.id]) {
                   // Find the other player to predict for
                   const otherPlayer = room.players.find(op => op.id !== p.id);
                   room.currentPredictions[p.id] = { 
                       predictedPlayerId: otherPlayer?.id || 'unknown', // Predict for the other player by default
                       prediction: "[Time Expired]" 
                   };
               }
           });
      }
      
      // Check if everyone has now effectively submitted (even if by timeout)
      const allConsideredSubmitted = room.players.every(p => 
          room.currentAnswers[p.id] && 
          (room.selectedGameStyle !== 'prediction' || room.currentPredictions?.[p.id])
      );
      
      if (allConsideredSubmitted) {
          console.log(`[${roomId}] Processing results after timer expiry.`);
          // Emit round complete if not already done (should have been handled by submit events ideally)
          // io.to(roomId).emit('roundComplete', { roundNumber: room.currentRound });
          processRoundResults(room);
      } else {
          console.error(`[${roomId}] Timer expired, but not all players have answers/predictions accounted for. State:`, room.currentAnswers, room.currentPredictions);
          // Potentially force results processing anyway or handle error
          // For now, let's try processing anyway
          processRoundResults(room);
      }
  });

  // --- Disconnect Handler --- 
  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
    // Find which room the player was in
    let roomIdToRemoveFrom: string | null = null;
    let disconnectedPlayerName: string | null = null;
    for (const roomId in rooms) {
      const room = rooms[roomId];
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        roomIdToRemoveFrom = roomId;
        disconnectedPlayerName = room.players[playerIndex].nickname;
        room.players.splice(playerIndex, 1);
        
        // Check if room is now empty or if the game should end
        if (room.players.length === 0) {
          console.log(`Room ${roomId} is empty, deleting.`);
          delete rooms[roomId];
        } else if (room.gameMode === '2player' && room.status !== 'waiting' && room.status !== 'selecting') {
          // If game was in progress and a player left
          console.log(`Player left ongoing game in room ${roomId}. Ending game.`);
          // Notify remaining player
          io.to(roomId).emit('playerLeft', { playerId: socket.id, playerName: disconnectedPlayerName || 'Player' });
          // Reset room state or end game
          // Option 1: End the game immediately
           endGame(room, true); // Pass flag indicating abrupt end
          
          // Option 2: Reset to selecting state (if you want the remaining player to wait/restart)
          // room.status = 'selecting';
          // room.currentRound = 0;
          // room.questions = [];
          // room.currentAnswers = {};
          // room.readyForNextRound.clear();
          // // Notify remaining player about the reset
          // io.to(roomId).emit('roomStateReset', { players: room.players, status: room.status });
        } else {
           // If waiting or selecting, just notify others player left
            io.to(roomId).emit('playerLeft', { playerId: socket.id, playerName: disconnectedPlayerName || 'Player' });
            console.log(`Player left room ${roomId} (Status: ${room.status}). Notifying others.`);
        }
        break; // Found the room, no need to check others
      }
    }
  });
});

// --- Game Logic Functions ---

function calculateScore(room: Room): Record<string, number> {
  const playerScores: Record<string, number> = {};
  room.players.forEach(p => playerScores[p.id] = 0); // Initialize scores for this round

  if (room.selectedGameStyle === 'prediction' && room.currentPredictions) {
    // Prediction Mode Scoring:
    // Award points for correct predictions
    for (const predictorId in room.currentPredictions) {
      const predictionData = room.currentPredictions[predictorId];
      const actualAnswer = room.currentAnswers[predictionData.predictedPlayerId];
      
      console.log(`[${room.id}] Scoring P${predictorId}: Predicted ${predictionData.predictedPlayerId}'s answer was "${predictionData.prediction}", actual was "${actualAnswer}"`);
      
      // Simple exact match scoring (case-insensitive)
      if (actualAnswer && predictionData.prediction.toLowerCase() === actualAnswer.toLowerCase()) {
        playerScores[predictorId] = (playerScores[predictorId] || 0) + 1; // Award 1 point for correct prediction
        console.log(`[${room.id}] P${predictorId} CORRECT prediction. Score +1.`);
      } else {
          console.log(`[${room.id}] P${predictorId} INCORRECT prediction.`);
      }
    }
  } else if (room.selectedGameStyle === 'reveal-only') {
    // Reveal-Only Mode Scoring (if any - currently just reveals answers)
    // You could add scoring based on matching answers, votes, etc. if desired
    // For now, no points awarded in this mode.
    console.log(`[${room.id}] Reveal-only mode, no points awarded this round.`);
  } else {
      // Solo mode or other styles - define scoring if needed
       console.log(`[${room.id}] Scoring not defined for gameStyle: ${room.selectedGameStyle}`);
  }

  return playerScores;
}

function processRoundResults(room: Room) {
  console.log(`[${room.id}] Processing results for round ${room.currentRound}. Style: ${room.selectedGameStyle}`);
  // Calculate scores for the round
  const roundScores = calculateScore(room);
  const playerResults: PlayerResult[] = [];

  // Update total scores and prepare results payload
  room.players.forEach(player => {
    const pointsEarned = roundScores[player.id] || 0;
    player.score += pointsEarned; // Update player's total score

    const result: PlayerResult = {
      playerId: player.id,
      answer: room.currentAnswers[player.id] || '[No Answer]',
      pointsEarned: pointsEarned,
    };

    // Add prediction info if applicable
    if (room.selectedGameStyle === 'prediction' && room.currentPredictions && room.currentPredictions[player.id]) {
      const predictionData = room.currentPredictions[player.id];
      result.prediction = predictionData.prediction;
      result.predictedPlayerId = predictionData.predictedPlayerId;
      // Determine if prediction was correct (ensure boolean or undefined)
      const actualAnswer = room.currentAnswers[predictionData.predictedPlayerId];
      result.isCorrect = actualAnswer ? predictionData.prediction.toLowerCase() === actualAnswer.toLowerCase() : undefined;
    }

    playerResults.push(result);
  });

  // Emit results to all players
  const roundResultPayload: RoundResult = {
    questionId: room.questions[room.currentRound - 1].id, // Use currentRound - 1 for index
    players: playerResults,
  };
  io.to(room.id).emit('roundResults', roundResultPayload);
  console.log(`[${room.id}] Emitted roundResults:`, JSON.stringify(roundResultPayload));

  // Reset for next round (or game over)
  room.currentAnswers = {};
  if (room.currentPredictions) room.currentPredictions = {};
  room.readyForNextRound.clear();
}

function startNextRound(room: Room) {
  // Reset round-specific state
  room.currentAnswers = {};
  if (room.currentPredictions) room.currentPredictions = {};
  room.readyForNextRound.clear();

  const nextQuestion = room.questions[room.currentRound - 1]; // currentRound is already incremented

  console.log(`[${room.id}] Starting round ${room.currentRound} / ${room.totalRounds}`);
  io.to(room.id).emit('newRound', {
    currentRound: room.currentRound,
    question: nextQuestion,
    timerDuration: room.timerDuration // Send timer duration again for the new round
  });
   console.log(`[${room.id}] Emitted newRound with Q: ${nextQuestion?.id}`);
}

function endGame(room: Room, playerLeft = false) {
  console.log(`[${room.id}] Ending game. Player Left: ${playerLeft}`);
  room.status = 'completed';

  const finalScores: Record<string, number> = {};
  room.players.forEach(player => {
    finalScores[player.id] = player.score;
  });

  io.to(room.id).emit('gameOver', { 
      finalScores, 
      message: playerLeft ? "A player left the game." : "Game Over!" 
  });

  // Optional: Clean up room after a delay?
  // setTimeout(() => {
  //   if (rooms[room.id] && rooms[room.id].status === 'completed') {
  //     console.log(`[${room.id}] Cleaning up completed game room.`);
  //     delete rooms[room.id];
  //   }
  // }, 60000); // Clean up after 1 minute
}

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 