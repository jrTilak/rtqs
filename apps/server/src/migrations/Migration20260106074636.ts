import { Migration } from '@mikro-orm/migrations';

export class Migration20260106074636 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "quiz_participant_entity" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "quiz_id" uuid not null, constraint "quiz_participant_entity_pkey" primary key ("id"));`);

    this.addSql(`alter table "quiz_participant_entity" add constraint "quiz_participant_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "quiz_participant_entity" cascade;`);
  }

}
