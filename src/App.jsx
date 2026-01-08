import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Dashboard from './components/Dashboard';
import ChatWindow from './components/ChatWindow';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    // Conectar ao servidor via Socket.IO
    const newSocket = io(SOCKET_URL);
    
    newSocket.on('connect', () => {
      console.log('Conectado ao servidor');
      setIsConnected(true);
    });
    
    newSocket.on('disconnect', () => {
      console.log('Desconectado do servidor');
      setIsConnected(false);
    });
    
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <Dashboard socket={socket} onSelectChat={setActiveChat} />
        {activeChat && <ChatWindow chat={activeChat} socket={socket} />}
      </div>
    </div>
  );
}

export default App;
