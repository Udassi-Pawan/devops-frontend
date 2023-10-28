"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContext } from "./SocketProvider";

export interface OnlineProps {}

export default function WhoOnline({}: OnlineProps) {
  const urlRef = useRef<any>(null);
  let { socket } = useContext(SocketContext);
  const [users, setUsers] = useState<string[]>();
  const checkHandler = useCallback(async () => {
    socket?.emit("whoOnline", {}, (socketToUser: string[]) => {
      console.log(socketToUser);
      setUsers(socketToUser);
    });
  }, [socket]);
  useEffect(() => {
    checkHandler();
    if (!socket) return;
    console.log(socket);
    socket?.emit("joinSocket", {}, (clientId: string) => {
      console.log(clientId);
    });
  }, [socket, checkHandler]);
  const urlHandler = async function () {
    const res = await (await fetch(urlRef.current.value)).json();
    console.log("url res : ", res);
  };
  return (
    <div className="border-l border-gray-300 hidden md:block pl-2 mx-1 flex flex-col items-center">
      <input ref={urlRef} placeholder="url"></input>

      <button onClick={urlHandler}>Check url</button>
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
