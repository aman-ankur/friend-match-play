import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the shape of the context value
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Create the context with a default value
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Custom hook to use the SocketContext
export const useSocket = () => {
  return useContext(SocketContext);
};

// Define the props for the provider component
interface SocketProviderProps {
  children: React.ReactNode;
}

// Helper for detecting if we're in development mode (works in Vite)
const isDevelopment = import.meta.env.DEV || (typeof import.meta.env === 'undefined' && window.location.hostname === 'localhost');

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Determine server URL based on environment
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    
    // Create socket connection
    const socketInstance = io(serverUrl, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    // Set socket in state
    setSocket(socketInstance);
    
    // For development testing only - expose socket globally
    if (isDevelopment) {
      (window as any).socket = socketInstance;
      console.log('[SocketContext] Socket exposed globally for development');
    }

    // Handle connect event
    socketInstance.on('connect', () => {
      console.log('[SocketContext] Connected to server with ID:', socketInstance.id);
      setIsConnected(true);
    });

    // Handle disconnect event
    socketInstance.on('disconnect', (reason) => {
      console.log('[SocketContext] Disconnected from server. Reason:', reason);
      setIsConnected(false);
    });

    // Handle connect error
    socketInstance.on('connect_error', (error) => {
      console.error('[SocketContext] Connection error:', error);
      setIsConnected(false);
    });

    // Clean up on unmount
    return () => {
      console.log('[SocketContext] Cleaning up socket connection');
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('connect_error');
      socketInstance.disconnect();
    };
  }, []);

  const value = { socket, isConnected };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}; 