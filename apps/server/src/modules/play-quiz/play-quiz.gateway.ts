import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PlayQuizService } from './play-quiz.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, Roles } from '@thallesp/nestjs-better-auth';
import { GATEWAY_MESSAGES } from './constants/gateway-messages';
import { OnCreateLobbyDto } from './dto/requests/play-quiz.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || '*',
    credentials: true,
  },
  namespace: 'play-quiz',
})
@UseGuards(AuthGuard)
export class PlayQuizGateway {
  public static readonly MESSAGES = GATEWAY_MESSAGES;

  constructor(private readonly _playQuizService: PlayQuizService) {}

  @SubscribeMessage(PlayQuizGateway.MESSAGES.CREATE_LOBBY)
  @Roles(['admin'])
  onCreateLobby(@MessageBody() payload: OnCreateLobbyDto) {
    return this._playQuizService.onCreateLobby(payload);
  }
}
