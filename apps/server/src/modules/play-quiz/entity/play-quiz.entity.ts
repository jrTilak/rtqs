import { quizTable } from '@/db/schema';
import { baseTable } from '@/db/utils';
import { pgEnum } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export enum QuizLobbyEnum {
  IN_LOBBY = 'IN_LOBBY',
  ENDED = 'ENDED',
}

export const quizLobbyPgEnum = pgEnum('quiz_lobby_enum', QuizLobbyEnum);

export const quizLobbyTable = pgTable('quiz_lobby', {
  ...baseTable,

  quizId: uuid('quiz_id')
    .notNull()
    .references(() => quizTable.id, { onDelete: 'cascade' }),

  participantsCount: integer('participants_count').notNull().default(0),
  waitInLobbyUntill: timestamp('wait_in_lobby_until').notNull(),

  status: quizLobbyPgEnum().notNull().default(QuizLobbyEnum.IN_LOBBY),

  code: text('code').unique().notNull(),
});
