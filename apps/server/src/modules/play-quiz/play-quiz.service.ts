import { Injectable } from '@nestjs/common';
import {
  ListLobbiesDto,
  OnCreateLobbyDto,
  OnJoinLobbyDto,
} from './dto/requests/play-quiz.dto';
import { db } from '@/db';
import { quizLobbyTable } from './entity';
import { eq } from 'drizzle-orm';
import { quizTable } from '../quizzes/entity';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Socket } from 'socket.io';
import { WsError } from '@/common/dto/response/ws-error.dto';
import { WsResponse } from '@/common/dto/response/ws-response-dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';

@Injectable()
export class PlayQuizService {
  async onJoinLobby(
    user: UserSession['user'],
    payload: OnJoinLobbyDto,
    client: Socket,
  ) {
    const [lobby] = await db
      .select({ id: quizLobbyTable.id })
      .from(quizLobbyTable)
      .where(eq(quizLobbyTable.code, payload.code));

    if (!lobby?.id) {
      return new WsError('Lobby with that code does not exist.');
    }

    await client.join([`user:${user.id}`, `quiz-lobby:${lobby.id}`]);
  }

  /**
   * Check if quiz exists or not
   * Check if lobby with that code already exists
   * Create a new lobby
   * Emit event to all connected clients about the new lobby
   */
  async onCreateLobby(payload: OnCreateLobbyDto) {
    const [quizExists] = await db.select({ id: quizTable.id }).from(quizTable);

    if (!quizExists?.id) {
      return new WsError('Quiz does not exists with that id.');
    }
    console.log('here', payload);
    const [existingLobby] = await db
      .select({ id: quizLobbyTable.id })
      .from(quizLobbyTable)
      .where(eq(quizLobbyTable.code, payload.code));

    console.log('existingLobby', existingLobby);

    if (existingLobby?.id) {
      console.log('lobby exists');
      return new WsError('Lobby with that code already exists.');
    }

    console.log('creating lobby');

    const [lobby] = await db
      .insert(quizLobbyTable)
      .values({
        quizId: payload.quizId,
        code: payload.code,
        waitInLobbyUntil: new Date(payload.waitUntil),
        name: payload.name,
      })
      .returning();

    return new WsResponse(lobby);
  }

  async listLobbies(params: ListLobbiesDto) {
    const lobbies = await db
      .select()
      .from(quizLobbyTable)
      .where(eq(quizLobbyTable.quizId, params.quizId));
    return new ApiResponse(lobbies);
  }
}
