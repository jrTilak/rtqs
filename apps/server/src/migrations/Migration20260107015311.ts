import { Migration } from '@mikro-orm/migrations';

export class Migration20260107015311 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "lobby_player_entity" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "lobby_id" uuid not null, "player_id" uuid not null, constraint "lobby_player_entity_pkey" primary key ("id"));`);

    this.addSql(`create table "lobby_player_response_entity" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "answer" varchar(255) not null, "question_id" uuid not null, "player_id" uuid not null, "is_correct" boolean not null default false, constraint "lobby_player_response_entity_pkey" primary key ("id"));`);

    this.addSql(`alter table "lobby_player_entity" add constraint "lobby_player_entity_lobby_id_foreign" foreign key ("lobby_id") references "quiz_lobby_entity" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "lobby_player_entity" add constraint "lobby_player_entity_player_id_foreign" foreign key ("player_id") references "user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "lobby_player_response_entity" add constraint "lobby_player_response_entity_question_id_foreign" foreign key ("question_id") references "quiz_question_entity" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "lobby_player_response_entity" add constraint "lobby_player_response_entity_player_id_foreign" foreign key ("player_id") references "lobby_player_entity" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "lobby_player_response_entity" drop constraint "lobby_player_response_entity_player_id_foreign";`);

    this.addSql(`drop table if exists "lobby_player_entity" cascade;`);

    this.addSql(`drop table if exists "lobby_player_response_entity" cascade;`);
  }

}
