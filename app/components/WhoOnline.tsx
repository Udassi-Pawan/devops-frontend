"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketProvider";

export interface OnlineProps {}

export default function WhoOnline({}: OnlineProps) {
  let { socket } = useContext(SocketContext);
  console.log(socket);
  const [users, setUsers] = useState<string[]>();
  const checkHandler = useCallback(async () => {
    socket?.emit("whoOnline", {}, (socketToUser: string[]) => {
      console.log(socketToUser);
      setUsers(socketToUser);
    });
  }, [socket]);
  useEffect(() => {
    checkHandler();
    socket?.emit("joinSocket", {}, (clientId: string) => {
      console.log(clientId);
    });
  }, [socket, checkHandler]);
  return (
    <div className="border-l border-gray-300 hidden md:block pl-2 mx-1 flex flex-col items-center">
      <button onClick={checkHandler}>Check Online</button>
      {users?.map((u: string) => (
        <p key={u + Math.random() * 10000} className="">
          {" "}
          {u}{" "}
        </p>
      ))}
    </div>
  );
}
