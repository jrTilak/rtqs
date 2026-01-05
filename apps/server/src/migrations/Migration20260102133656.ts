import { Migration } from '@mikro-orm/migrations';

export class Migration20260102133656 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "account" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(255) not null, "account_id" varchar(255) not null, "provider_id" varchar(255) not null, "access_token" varchar(255) null, "refresh_token" varchar(255) null, "access_token_expires_at" timestamptz null, "refresh_token_expires_at" timestamptz null, "scope" varchar(255) null, "id_token" varchar(255) null, "password" varchar(255) null, constraint "account_pkey" primary key ("id"));`);

    this.addSql(`create table "session" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(255) not null, "token" varchar(255) not null, "expires_at" timestamptz not null, "ip_address" varchar(255) null, "user_agent" varchar(255) null, "impersonated_by" varchar(255) null, constraint "session_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "email_verified" boolean not null, "image" varchar(255) null, "role" varchar(255) null, "banned" boolean null, "ban_reason" varchar(255) null, "ban_expires" timestamptz null, constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "verification" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "identifier" varchar(255) not null, "value" varchar(255) not null, "expires_at" timestamptz not null, constraint "verification_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "account" cascade;`);

    this.addSql(`drop table if exists "session" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "verification" cascade;`);
  }

}
