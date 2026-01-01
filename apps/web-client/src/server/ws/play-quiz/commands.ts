import { socket } from "../socket";
import type { WsAckResponse } from "../types";
import { MESSAGES } from "./messages";
import type { CreateLobbyPayload, Lobby } from "./types";

export const createLobby = async (payload: CreateLobbyPayload) => {
  console.log("Creating lobby with payload:", payload);
  const res = (await socket.client.emitWithAck(
    MESSAGES.CREATE_LOBBY,
    payload
  )) as WsAckResponse<Lobby>;
  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};
