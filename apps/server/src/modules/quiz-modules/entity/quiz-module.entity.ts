import { quizQuestionTable } from '../../quiz-questions/entity/quiz-question.entity';
import { quizTable } from '../../quizzes/entity/quizzes.entity';
import { baseTable } from '@/db/utils';
import { relations } from 'drizzle-orm';
import { integer, text, uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const quizModuleTable = pgTable('quiz_module', {
  ...baseTable,

  name: text('name').notNull(),
  index: integer('index').notNull(),

  quizId: uuid('quiz_id')
    .notNull()
    .references(() => quizTable.id, { onDelete: 'cascade' }),
});

export const quizModuleRelations = relations(
  quizModuleTable,
  ({ one, many }) => ({
    quiz: one(quizTable, {
      fields: [quizModuleTable.quizId],
      references: [quizTable.id],
    }),
    questions: many(quizQuestionTable),
  }),
);
