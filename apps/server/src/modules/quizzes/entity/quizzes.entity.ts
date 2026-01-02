import { quizModuleTable } from '../../quiz-modules/entity/quiz-module.entity';
import { baseTable } from '@/db/utils';
import { InferSelectModel, relations } from 'drizzle-orm';
import { text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const quizTable = pgTable('quiz', {
  ...baseTable,
  name: text('name').notNull(),
  description: text('description').default(''),
});

export type QuizTable = InferSelectModel<typeof quizTable>;

export const quizRelations = relations(quizTable, ({ many }) => ({
  modules: many(quizModuleTable),
}));
