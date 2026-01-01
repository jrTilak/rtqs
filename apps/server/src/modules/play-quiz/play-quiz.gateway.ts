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
import { OnCreateLobbyDto, OnJoinLobbyDto } from './dto/requests/play-quiz.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || '*',
    credentials: true,
  },
  namespace: 'play-quiz',
})
@UseGuards(AuthGuard)
export class PlayQuizGateway {
  @WebSocketServer()
  private readonly _server: Server;

  constructor(private readonly _playQuizService: PlayQuizService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage(GATEWAY_MESSAGES.JOIN_LOBBY)
  @Roles(['user', 'admin'])
  onJoinLobby(
    @MessageBody() payload: OnJoinLobbyDto,
    @ConnectedSocket() client: Socket,
    @Session() session: UserSession,
  ) {
    return this._playQuizService.onJoinLobby(session.user, payload, client);
  }

  @SubscribeMessage(GATEWAY_MESSAGES.CREATE_LOBBY)
  @Roles(['admin'])
  async onCreateLobby(@MessageBody() payload: OnCreateLobbyDto) {
    return this._playQuizService.onCreateLobby(payload);
  }
}
