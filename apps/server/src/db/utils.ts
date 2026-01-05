import { timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const baseTable = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
};
