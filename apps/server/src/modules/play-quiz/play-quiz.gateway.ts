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
import { JoinLobbyRoomDto, UpdateLobbyDto } from './dto/request/lobby.dto';
import { getWsRoomId } from '@/lib/get-ws-room-id';
import { WsResponse } from '@/common/dto/response/ws-response-dto';

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

    const res = new WsResponse();

    return res;
  }

  @SubscribeMessage(GATEWAY_MESSAGES.UPDATE_LOBBY)
  async onUpdateLobby(
    @MessageBody() payload: UpdateLobbyDto,
    @ConnectedSocket() _client: Socket,
  ) {
    const lobby = await this._playQuizService.updateLobby(payload);

    const res = new WsResponse(lobby);

    const userRoom = getWsRoomId({
      role: ROLES.USER,
      scope: 'lobby',
      scopeId: payload.id,
    });
    const adminRoom = getWsRoomId({
      role: ROLES.ADMIN,
      scope: 'lobby',
      scopeId: payload.id,
    });

    this._server
      .to(userRoom)
      .to(adminRoom)
      .emit(GATEWAY_MESSAGES.LOBBY_UPDATED, res);

    return res;
  }
}
