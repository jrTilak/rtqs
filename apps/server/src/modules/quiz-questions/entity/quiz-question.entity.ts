import { quizModuleTable } from '../../quiz-modules/entity/quiz-module.entity';
import { baseTable } from '@/db/utils';
import { relations } from 'drizzle-orm';
import { integer, uuid } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const quizQuestionTable = pgTable('quiz_question', {
  ...baseTable,

  question: text('question').notNull(),
  answer: text('answer').notNull(),
  index: integer('index').notNull(),

  moduleId: uuid('module_id')
    .notNull()
    .references(() => quizModuleTable.id, { onDelete: 'cascade' }),
});

export const quizQuestionRelations = relations(
  quizQuestionTable,
  ({ one }) => ({
    module: one(quizModuleTable, {
      fields: [quizQuestionTable.moduleId],
      references: [quizModuleTable.id],
    }),
  }),
);
