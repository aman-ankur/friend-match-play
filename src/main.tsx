//import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/toast.css' // Import custom toast styles
import { SocketProvider } from './context/SocketContext'

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  // </React.StrictMode>,
)
