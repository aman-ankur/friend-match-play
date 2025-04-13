import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import { getQuestionsByMode, GameQuestion, GameMode as SpecificGameMode } from './gameUtils';

// Fixed constants
const EXCLUSIVE_MODE_PIN = "1234"; // Static PIN for exclusive mode access (numeric only)

// --- Basic Types (Updated: Use nickname) ---
interface Player {
  id: string; // Socket ID
  nickname: string; // Changed from name
  score: number;
}

// Define the game mode type locally or import if defined globally
type AppGameMode = 'solo' | '2player';
type RoundTimeLimit = 10 | 20 | 30 | null; // Add type

// Define comprehensive status type
// This type is used client-side and might differ slightly
type GameRoomStatus = 'waiting' | 'selecting' | 'style-selecting' | 'playing' | 'results' | 'waiting-next-round' | 'completed';

// -- SERVER SPECIFIC TYPES -- 
type GameStyle = 'prediction' | 'reveal-only';
// Ensure this type includes all states the server actually uses
type RoomStatus = 'waiting' | 'selecting' | 'style-selecting' | 'playing' | 'results' | 'completed';

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
  // Added for exclusive question mode
  isExclusiveModeActive?: boolean;
  exclusiveQuestionQueue?: GameQuestion[];
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
    'http://localhost:5173',     // Local development frontend
    'http://localhost:8081'      // Adding additional local development frontend
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
    mode: SpecificGameMode; 
    style: GameStyle; 
    nsfwLevel: number; 
    timerDuration: number; // Use number from client
  }) => {
    const { roomId, mode, style, nsfwLevel, timerDuration } = data;
    const room = rooms[roomId];
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} not found.` });
      return;
    }
    if (room.players[0]?.id !== socket.id) {
      socket.emit('error', { message: 'Only the room creator can start the game.' });
      return;
    }
    if (room.status !== 'selecting' && room.status !== 'style-selecting') {
      socket.emit('error', { message: `Game cannot be started from current status: ${room.status}` });
      return;
    }
    
    // Update room state based on creator's selections
    room.selectedGameMode = mode;
    room.selectedGameStyle = style;
    room.nsfwLevel = nsfwLevel;
    room.timerDuration = timerDuration || 0; // Store duration (0 if null/undefined)
    room.currentRound = 1;
    room.isExclusiveModeActive = false; // Ensure exclusive mode is off unless explicitly activated later
    room.exclusiveQuestionQueue = undefined;

    // Fetch questions based on mode and NSFW level
    // Default to 5 questions if not otherwise specified (e.g., for solo mode potentially)
    const questionCount = room.gameMode === 'solo' ? 10 : 5; // Example: 10 for solo, 5 for 2player
    room.questions = getQuestionsByMode(mode, questionCount, nsfwLevel);
    room.totalRounds = room.questions.length; // Base total rounds on fetched questions
    
    // ---> ADD LOGGING HERE <---
    console.log(`[${roomId}] startGame: Fetched ${room.questions.length} questions for mode=${mode}, nsfwLevel=${nsfwLevel}. First question ID: ${room.questions[0]?.id}`);

    if (room.questions.length === 0) {
        console.error(`[${roomId}] No questions found for mode=${mode}, nsfwLevel=${nsfwLevel}. Aborting game start.`);
        socket.emit('error', { message: `No suitable questions found for the selected mode and spice level. Try adjusting the spice level.` });
        // Optional: Reset room status back?
        // room.status = 'selecting'; 
        // io.to(roomId).emit('roomReset', { status: room.status, players: room.players });
        return; // Prevent starting game with no questions
    }

    room.status = 'playing';
    
    console.log(`[${roomId}] Emitting gameStarted. Mode: ${mode}, Style: ${style}, Rounds: ${room.totalRounds}`);
    
    // Notify all players in the room that the game has started
    io.to(roomId).emit('gameStarted', {
      players: room.players,
      // ---> ENSURE THESE ARE INCLUDED <---
      gameMode: mode, 
      gameStyle: style,
      // ------------------------------------
      nsfwLevel: room.nsfwLevel, // Send the actual level used
      timerDuration: room.timerDuration, // Send the timer duration
      totalRounds: room.totalRounds,
      questions: room.questions, // Send the fetched questions
      currentRound: room.currentRound,
      isExclusiveModeActive: room.isExclusiveModeActive // Send initial state
    });
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

  // --- Attempt Exclusive Mode Handler ---
  socket.on('attemptExclusiveMode', (data: { roomId: string; pin: string; selectedGameMode?: SpecificGameMode }) => {
    const { roomId, pin, selectedGameMode } = data;
    const room = rooms[roomId];

    // Validation
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} not found.` });
      return;
    }
    
    // Only creator can activate exclusive mode
    if (room.players[0]?.id !== socket.id) {
      socket.emit('error', { message: 'Only the room creator can activate exclusive mode.' });
      return;
    }
    
    // Determine if we're activating during setup or gameplay
    const isConfigPhase = room.status === 'selecting';
    const isGamePlay = room.status === 'playing';
    
    // During setup, check if This or That is selected
    if (isConfigPhase) {
      // For configuration phase, we rely on the data provided in the call
      if (selectedGameMode !== 'this-or-that') {
        socket.emit('error', { message: 'Exclusive mode is only available in This or That.' });
        return;
      }
    } else if (isGamePlay) {
      // During gameplay, check the room's selected mode
      if (room.selectedGameMode !== 'this-or-that') {
        socket.emit('error', { message: 'Exclusive mode is only available in This or That.' });
        return;
      }
    } else {
      // Neither in config nor playing
      socket.emit('error', { message: 'Game must be in setup or playing to activate exclusive mode.' });
      return;
    }
    
    // Not already active
    if (room.isExclusiveModeActive) {
      socket.emit('error', { message: 'Exclusive mode is already active.' });
      return;
    }
    
    // Check PIN
    if (pin !== EXCLUSIVE_MODE_PIN) {
      socket.emit('exclusiveModeFailed', { message: 'Incorrect PIN. Try again.' });
      return;
    }
    
    // Load exclusive questions (nsfwRating = 11)
    const exclusiveQuestions = getQuestionsByMode('this-or-that', 0, 0, true);
    
    // If no exclusive questions available
    if (!exclusiveQuestions || exclusiveQuestions.length === 0) {
      socket.emit('exclusiveModeFailed', { message: 'No exclusive questions are available.' });
      return;
    }
    
    // Activate exclusive mode
    room.isExclusiveModeActive = true;
    room.exclusiveQuestionQueue = exclusiveQuestions;
    console.log(`[${roomId}] Exclusive mode activated with ${exclusiveQuestions.length} questions.`);
    
    // Notify the room
    io.to(roomId).emit('exclusiveModeActivated', { isExclusiveModeActive: true });
    // Notify the creator specifically (for UI feedback)
    socket.emit('exclusiveModeSuccess', { message: 'Exclusive mode activated!' });
  });

  // --- End Exclusive Mode Handler ---
  socket.on('endExclusiveMode', (data: { roomId: string }) => {
    const { roomId } = data;
    const room = rooms[roomId];
    
    // Validation
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} not found.` });
      return;
    }
    
    // Only creator can end exclusive mode
    if (room.players[0]?.id !== socket.id) {
      socket.emit('error', { message: 'Only the room creator can end exclusive mode.' });
      return;
    }
    
    // Only if exclusive mode is active
    if (!room.isExclusiveModeActive) {
      socket.emit('error', { message: 'Exclusive mode is not active.' });
      return;
    }
    
    console.log(`[${roomId}] Creator ended exclusive mode. Ending game.`);
    // End the game
    endGame(room);
  });

  // --- Reset Room Handler ---
  socket.on('resetRoom', (data: { roomId: string }) => {
    const { roomId } = data;
    const room = rooms[roomId];
    
    // Validation
    if (!room) {
      socket.emit('error', { message: `Room ${roomId} not found.` });
      return;
    }
    
    // Only creator can reset room
    if (room.players[0]?.id !== socket.id) {
      socket.emit('error', { message: 'Only the room creator can reset the room.' });
      return;
    }

    // Check that the room is in a state that can be reset
    if (room.status !== 'completed') {
      console.log(`[${roomId}] Room reset requested but room is not completed (status: ${room.status}). Proceeding anyway.`);
    }
    
    // Reset the room state
    room.status = 'selecting';
    room.selectedGameMode = undefined;
    room.isExclusiveModeActive = false;
    room.exclusiveQuestionQueue = undefined;
    room.currentRound = 0;
    room.questions = [];
    room.currentAnswers = {};
    room.readyForNextRound.clear();
    if (room.currentPredictions) {
      room.currentPredictions = {};
    }
    
    // Reset player scores
    room.players.forEach(p => p.score = 0);
    
    console.log(`[${roomId}] Room reset to 'selecting' state.`);
    
    // Notify all clients in the room
    io.to(roomId).emit('roomReset', {
      status: 'selecting',
      players: room.players
    });
  });

  // ---> RESTORE playerReady HANDLER <---
  socket.on('playerReady', (data: { roomId: string }) => {
    const { roomId } = data;
    const room = rooms[roomId];
    // Basic validation: Check if room exists and is in a state where players can be ready
    if (!room || (room.status !== 'results' && room.status !== 'playing')) { 
        console.warn(`[${roomId}] Received playerReady from ${socket.id} but room not found or in invalid state (${room?.status}).`);
        return; 
    }

    // Add player to the set of ready players for the *next* round
    room.readyForNextRound.add(socket.id);
    console.log(`[${roomId}] Player ${socket.id} is ready. Ready count: ${room.readyForNextRound.size}/${room.players.length}`);

    // Check if all *currently connected* players in the room are ready
    // Important: Compare against the current players array length
    const allPlayersReady = room.players.every(player => room.readyForNextRound.has(player.id));
    
    console.log(`[${roomId}] Checking if all players ready: ${allPlayersReady} (Set: ${[...room.readyForNextRound]}, Players: ${room.players.map(p=>p.id)})`);

    if (allPlayersReady && room.players.length >= (room.gameMode === 'solo' ? 1 : 2)) { // Ensure enough players are still present
      console.log(`[${roomId}] All players ready. Proceeding to next round or game over.`);
      
      // Move to the next round number *before* checking if it exceeds totalRounds
      room.currentRound++; 
      
      // Check if the *new* currentRound exceeds the total rounds (for non-exclusive mode)
      if (!room.isExclusiveModeActive && room.currentRound > room.totalRounds) {
        // Game Over
        console.log(`[${roomId}] Reached end of standard rounds (${room.currentRound - 1}/${room.totalRounds}). Ending game.`);
        endGame(room);
      } else {
        // Start Next Round (or handle exclusive mode queue)
        console.log(`[${roomId}] Starting next round: ${room.currentRound}`);
        startNextRound(room);
      }
    } else {
      console.log(`[${roomId}] Not all players ready yet.`);
      // Optionally, notify others that this player is waiting?
      // socket.to(roomId).emit('playerWaiting', { playerId: socket.id });
    }
  });
  // -------------------------------------

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
    
    // Find the room this socket was in (if any)
    for (let roomId in rooms) {
      const room = rooms[roomId];
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      
      if (playerIndex !== -1) {
        // Player found in this room
        const isCreator = playerIndex === 0; // First player is the creator
        const disconnectedPlayerName = room.players[playerIndex].nickname;
        
        // Remove player from room
        room.players.splice(playerIndex, 1);
        
        // Remove player from ready set and answers
        room.readyForNextRound.delete(socket.id);
        delete room.currentAnswers[socket.id];
        if (room.currentPredictions) {
          delete room.currentPredictions[socket.id];
        }
        
        console.log(`Removed player ${socket.id} from room ${roomId}`);
        
        // If room is now empty, clean it up
        if (room.players.length === 0) {
          console.log(`Room ${roomId} is now empty, deleting it.`);
          delete rooms[roomId];
        }
        else if (isCreator && room.isExclusiveModeActive) {
          // If creator disconnects during exclusive mode, end the game
          console.log(`[${roomId}] Creator left during exclusive mode. Ending game.`);
          endGame(room, true); // true indicates player disconnect
        }
        else if (room.gameMode === '2player' && room.status !== 'waiting' && room.status !== 'selecting') {
          // If game was in progress and a player left
          console.log(`Player left ongoing game in room ${roomId}. Ending game.`);
          // Notify remaining player
          io.to(roomId).emit('playerLeft', { playerId: socket.id, playerName: disconnectedPlayerName || 'Player' });
          // Reset room state or end game
          // Option 1: End the game immediately
           endGame(room, true); // Pass flag indicating abrupt end
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
    console.log(`[${room.id}] Reveal-only mode, no points awarded this round.`);
  } else {
       console.log(`[${room.id}] Scoring not defined for gameStyle: ${room.selectedGameStyle}`);
  }

  return playerScores;
}

function processRoundResults(room: Room) {
  console.log(`[${room.id}] Processing results for round ${room.currentRound}. Style: ${room.selectedGameStyle}`);
  const roundScores = calculateScore(room);
  const playerResults: PlayerResult[] = [];

  room.players.forEach(player => {
    const pointsEarned = roundScores[player.id] || 0;
    player.score += pointsEarned;
    const result: PlayerResult = {
      playerId: player.id,
      answer: room.currentAnswers[player.id] || '[No Answer]',
      pointsEarned: pointsEarned,
    };
    if (room.selectedGameStyle === 'prediction' && room.currentPredictions && room.currentPredictions[player.id]) {
      const predictionData = room.currentPredictions[player.id];
      result.prediction = predictionData.prediction;
      result.predictedPlayerId = predictionData.predictedPlayerId;
      const actualAnswer = room.currentAnswers[predictionData.predictedPlayerId];
      result.isCorrect = actualAnswer ? predictionData.prediction.toLowerCase() === actualAnswer.toLowerCase() : undefined;
    }
    playerResults.push(result);
  });

  const roundResultPayload: RoundResult = {
    questionId: room.questions[room.currentRound - 1]?.id || 'unknown-question',
    players: playerResults,
  };
  io.to(room.id).emit('roundResults', roundResultPayload);
  console.log(`[${room.id}] Emitted roundResults:`, JSON.stringify(roundResultPayload));

  room.currentAnswers = {};
  if (room.currentPredictions) room.currentPredictions = {};
  room.readyForNextRound.clear();
}

function startNextRound(room: Room) {
  room.currentAnswers = {};
  if (room.currentPredictions) room.currentPredictions = {};
  room.readyForNextRound.clear();

  let nextQuestion: GameQuestion | undefined;
  console.log(`[${room.id}] Starting round ${room.currentRound}. isExclusiveModeActive=${room.isExclusiveModeActive}`);
  
  if (room.isExclusiveModeActive && room.exclusiveQuestionQueue && room.exclusiveQuestionQueue.length > 0) {
    nextQuestion = room.exclusiveQuestionQueue.shift();
    console.log(`[${room.id}] Using exclusive question: ${nextQuestion?.id}`);
  } else if (room.isExclusiveModeActive) {
    console.log(`[${room.id}] No more exclusive questions. Ending game.`);
    endGame(room);
    return;
  } else {
    nextQuestion = room.questions[room.currentRound - 1];
    console.log(`[${room.id}] Using standard question: ${nextQuestion?.id}`);
  }

  if (!nextQuestion) {
    console.error(`[${room.id}] ERROR: No question found for round ${room.currentRound}. Ending game.`);
    endGame(room); // End game if no question is found
    return;
  }

  console.log(`[${room.id}] Emitting newRound ${room.currentRound} / ${room.totalRounds}`);
  io.to(room.id).emit('newRound', {
    currentRound: room.currentRound,
    question: nextQuestion,
    timerDuration: room.timerDuration,
    isExclusiveModeActive: room.isExclusiveModeActive
  });
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
  // Optional: Clean up room? Consider implications.
}

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});