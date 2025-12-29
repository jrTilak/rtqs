import { MESSAGES } from "./messages";

export const socketHandlers: Record<string, (e: unknown) => void> = {
  [MESSAGES.CONNECT]: () => {
    console.log("Connected to the server");
  },
  [MESSAGES.DISCONNECT]: () => {
    console.log("Disconnected from the server");
  },
  [MESSAGES.ERROR]: (error) => {
    console.error("Socket error:", error);
  },
};
