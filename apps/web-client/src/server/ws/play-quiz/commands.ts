import { socket } from "..";
import { MESSAGES } from "./messages";
import type { CreateLobbyPayload } from "./types";

export const createLobby = (payload: CreateLobbyPayload) => {
  socket.client.emit(MESSAGES.CREATE_LOBBY, payload);
};
