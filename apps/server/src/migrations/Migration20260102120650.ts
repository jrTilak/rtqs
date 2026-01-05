import { Migration } from '@mikro-orm/migrations';

export class Migration20260102120650 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "base_entity" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "base_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "quiz_entity" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(255) null, constraint "quiz_entity_pkey" primary key ("id"));`,
    );

    this.addSql(
      `drop table if exists "drizzle"."__drizzle_migrations" cascade;`,
    );

    this.addSql(`drop type "quiz_lobby_enum";`);
    this.addSql(`drop schema if exists "drizzle";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create schema if not exists "drizzle";`);
    this.addSql(`create type "quiz_lobby_enum" as enum ('IN_LOBBY', 'ENDED');`);
    this.addSql(
      `create table "drizzle"."__drizzle_migrations" ("id" serial primary key, "hash" text not null, "created_at" int8 null);`,
    );

    this.addSql(`drop table if exists "base_entity" cascade;`);

    this.addSql(`drop table if exists "quiz_entity" cascade;`);
  }
}
