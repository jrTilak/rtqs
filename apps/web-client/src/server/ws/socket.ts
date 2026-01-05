import { io } from "socket.io-client";
import { socketHandlers } from "./play-quiz/socket-handler";

const socketClient = io(
  (import.meta.env.VITE_PUBLIC_SERVER_URL as string) + "/play-quiz",
  {
    autoConnect: false,
    withCredentials: true,
    retries: 0,
  }
);

export const socket = {
  client: socketClient,
  handlers: socketHandlers,
  commands: {},
};
