import type { Lobby } from "@/server/apis/play-quiz/types";
import { socket } from "../socket";
import type { WsAckResponse } from "../types";
import { MESSAGES } from "./messages";
import type { JoinLobbyRoomPayload, UpdateLobbyPayload } from "./types";

export const updateLobby = async (payload: UpdateLobbyPayload) => {
  const res = (await socket.client.emitWithAck(
    MESSAGES.UPDATE_LOBBY,
    payload
  )) as WsAckResponse<Lobby>;
  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};

export const joinLobbyRoom = async (payload: JoinLobbyRoomPayload) => {
  const res = (await socket.client.emitWithAck(
    MESSAGES.JOIN_LOBBY_ROOM,
    payload
  )) as WsAckResponse<Lobby>;
  if (!res.success) {
    throw new Error(res.message);
  }
  return res.data;
};
