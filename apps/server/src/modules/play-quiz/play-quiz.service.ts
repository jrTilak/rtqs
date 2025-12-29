import { Injectable } from '@nestjs/common';
import { OnCreateLobbyDto } from './dto/requests/play-quiz.dto';
import { db } from '@/db';
import { quizLobbyTable } from './entity';
import { eq } from 'drizzle-orm';
import { quizTable } from '../quizzes/entity';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class PlayQuizService {
  async onCreateLobby(payload: OnCreateLobbyDto) {
    const [quizExists] = await db.select({ id: quizTable.id }).from(quizTable);

    if (!quizExists?.id) {
      throw new WsException('Quiz doesnot exists with that id.');
    }

    await db.insert(quizLobbyTable).values({
      quizId: payload.quizId,
      code: payload.code,
      waitInLobbyUntill: new Date(payload.waitUntill),
    });
  }
}
