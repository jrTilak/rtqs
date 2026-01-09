import { Migration } from '@mikro-orm/migrations';

export class Migration20260103061000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "quiz_question_entity" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "question" varchar(255) not null, "answer" varchar(255) not null, "index" int not null, "module_id" uuid not null, constraint "quiz_question_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "quiz_question_entity" add constraint "quiz_question_entity_module_id_foreign" foreign key ("module_id") references "quiz_module_entity" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "quiz_question_entity" cascade;`);
  }
}
