"use client"

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const socketIo = io('http://localhost:5000');
    const socketIo = io('https://book-review-backend-node.onrender.com');
    
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;