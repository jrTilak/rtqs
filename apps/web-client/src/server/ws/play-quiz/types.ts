import type {
  JoinLobbyRoomDto,
  NextQuestionDto,
  UpdateLobbyDto,
  EvaluateQuestionDto,
} from "@/server/apis/sdk/generated";

export interface SubmitAnswerDto {
  lobbyId: string;
  answer: string;
}

export type UpdateLobbyPayload = UpdateLobbyDto;
export type JoinLobbyRoomPayload = JoinLobbyRoomDto;
export type NextQuestionPayload = NextQuestionDto;
export type SubmitAnswerPayload = SubmitAnswerDto;
export type EvaluateQuestionPayload = EvaluateQuestionDto;
