import { InferSelectModel, relations } from 'drizzle-orm';
import { integer } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const quizTable = pgTable('quiz', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export type Quiz = InferSelectModel<typeof quizTable>;

export const quizModuleTable = pgTable('quiz_module', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  index: integer('index').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),

  quizId: uuid('quiz_id')
    .notNull()
    .references(() => quizTable.id, { onDelete: 'cascade' }),
});

export const quizQuestionTable = pgTable('quiz_question', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  index: integer('index').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),

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
