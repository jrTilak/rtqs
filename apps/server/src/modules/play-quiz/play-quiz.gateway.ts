import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PlayQuizService } from './play-quiz.service';
import { UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  Roles,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import { GATEWAY_MESSAGES } from './constants/gateway-messages';
import { Server, Socket } from 'socket.io';
import { ROLES } from '@/lib/auth';
import {
  JoinLobbyRoomDto,
  NextQuestionDto,
  UpdateLobbyDto,
} from './dto/request/lobby.dto';
import { getWsRoomId } from '@/lib/get-ws-room-id';
import { WsResponse } from '@/common/dto/response/ws-response-dto';
import { QuizLobbyStatsEnum } from './entities';
import { omitObj } from '@/lib/omit-obj';
import { sleep } from '@/lib/sleep';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || '*',
    credentials: true,
  },
  namespace: 'play-quiz',
})
@UseGuards(AuthGuard)
@Roles([ROLES.ADMIN])
export class PlayQuizGateway {
  @WebSocketServer()
  private readonly _server: Server;

  constructor(private readonly _playQuizService: PlayQuizService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @Roles([ROLES.USER, ROLES.ADMIN])
  @SubscribeMessage(GATEWAY_MESSAGES.JOIN_LOBBY_ROOM)
  async onJoinLobby(
    @MessageBody() payload: JoinLobbyRoomDto,
    @ConnectedSocket() client: Socket,
    @Session() session: UserSession,
  ) {
    await this._playQuizService.joinLobbyRoom(payload, session.user, client);

    const adminRoom = getWsRoomId({
      role: ROLES.ADMIN,
      scope: 'lobby',
      scopeId: payload.lobbyId,
    });

    if (session.user.role === ROLES.USER) {
      this._server.to(adminRoom).emit(
        GATEWAY_MESSAGES.LOBBY_ROOM_JOINED,
        new WsResponse({
          lobby: payload.lobbyId,
          user: session.user,
        }),
      );
      console.log('emit admin room', adminRoom);
    }

    console.log(client.rooms, session.user.email);

    return new WsResponse();
  }

  @SubscribeMessage(GATEWAY_MESSAGES.UPDATE_LOBBY)
  async onUpdateLobby(
    @MessageBody() payload: UpdateLobbyDto,
    @ConnectedSocket() _client: Socket,
  ) {
    const lobby = await this._playQuizService.updateLobby(payload);

    const adminRoom = getWsRoomId({
      role: ROLES.ADMIN,
      scope: 'lobby',
      scopeId: payload.id,
    });

    this._server
      .to(adminRoom)
      .emit(GATEWAY_MESSAGES.LOBBY_UPDATED, new WsResponse(lobby));

    const userRoom = getWsRoomId({
      role: ROLES.USER,
      scope: 'lobby',
      scopeId: payload.id,
    });

    this._server
      .to(userRoom)
      .emit(
        GATEWAY_MESSAGES.LOBBY_UPDATED,
        new WsResponse(omitObj(lobby, ['participants'])),
      );

    return new WsResponse(lobby);
  }

  @SubscribeMessage(GATEWAY_MESSAGES.NEXT_QUESTION)
  async onNextQuestion(
    @MessageBody() payload: NextQuestionDto,
    @ConnectedSocket() _client: Socket,
  ) {
    try {
      const { lobby, newLobby } =
        await this._playQuizService.computeNextQuestion(payload);

      const adminRoom = getWsRoomId({
        role: ROLES.ADMIN,
        scope: 'lobby',
        scopeId: payload.lobbyId,
      });

      this._server
        .to(adminRoom)
        .emit(GATEWAY_MESSAGES.LOBBY_UPDATED, new WsResponse(lobby));

      const userRoom = getWsRoomId({
        role: ROLES.USER,
        scope: 'lobby',
        scopeId: payload.lobbyId,
      });

      this._server
        .to(userRoom)
        .emit(
          GATEWAY_MESSAGES.LOBBY_UPDATED,
          new WsResponse(omitObj(lobby, ['participants'])),
        );

      // wait for 5 seconds
      await sleep(5);

      const startedLobby = await this._playQuizService.saveNextQuestion({
        id: newLobby.id,
        currentModuleId: newLobby.currentModuleId!,
        currentQuestionId: newLobby.currentQuestionId,
      });

      if (startedLobby) {
        const startedRes = new WsResponse(startedLobby);
        this._server
          .to(userRoom)
          .to(adminRoom)
          .emit(GATEWAY_MESSAGES.LOBBY_UPDATED, startedRes);

        return startedRes;
      }

      return new WsResponse();
    } catch (error) {
      console.log(error);
    }
  }
}
