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
    const client = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
    console.log("socket hear", client);

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
