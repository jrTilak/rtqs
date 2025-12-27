import { baseTable } from '@/db/utils';
import { InferSelectModel, relations } from 'drizzle-orm';
import { integer } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const quizTable = pgTable('quiz', {
  ...baseTable,
  name: text('name').notNull(),
  description: text('description').default(''),
});

export type Quiz = InferSelectModel<typeof quizTable>;

export const quizModuleTable = pgTable('quiz_module', {
  ...baseTable,

  name: text('name').notNull(),
  index: integer('index').notNull(),

  quizId: uuid('quiz_id')
    .notNull()
    .references(() => quizTable.id, { onDelete: 'cascade' }),
});

export const quizQuestionTable = pgTable('quiz_question', {
  ...baseTable,

  question: text('question').notNull(),
  answer: text('answer').notNull(),
  index: integer('index').notNull(),

  moduleId: uuid('module_id')
    .notNull()
    .references(() => quizModuleTable.id, { onDelete: 'cascade' }),
});

export const quizRelations = relations(quizTable, ({ many }) => ({
  modules: many(quizModuleTable),
}));

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

export const quizQuestionRelations = relations(
  quizQuestionTable,
  ({ one }) => ({
    module: one(quizModuleTable, {
      fields: [quizQuestionTable.moduleId],
      references: [quizModuleTable.id],
    }),
  }),
);
