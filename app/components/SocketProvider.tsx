"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export interface SocketProviderProps {
  children: React.ReactNode;
}

import { createContext, useState } from "react";

const SocketContext = createContext<any>(null);
export { SocketContext };

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    if (socket) return;
    const client = io(`http://localhost`, {
      path: "/api/socket.io", // Specify the path to match the location defined in Nginx
      transports: ["websocket"], // Use the 'websocket' transport
    });
    console.log("connecting now", client);
    const clientPromise = new Promise((resolve) => {
      client.on("connect", () => {
        resolve(client);
        setSocket(client);
      });
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
