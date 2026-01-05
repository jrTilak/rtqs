import { Migration } from '@mikro-orm/migrations';

export class Migration20260105104510 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "quiz_lobby_entity" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "participants_count" int not null default 0, "wait_in_lobby_until" timestamptz not null, "status" text check ("status" in ('IN_LOBBY', 'ENDED')) not null default 'IN_LOBBY', "quiz_id" uuid not null, constraint "quiz_lobby_entity_pkey" primary key ("id"));`);
    this.addSql(`create index "quiz_lobby_entity_code_index" on "quiz_lobby_entity" ("code");`);

    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "quiz_lobby_entity" cascade;`);
  }

}
