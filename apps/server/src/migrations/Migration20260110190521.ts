import { Migration } from '@mikro-orm/migrations';

export class Migration20260110190521 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "account" alter column "access_token" type text using ("access_token"::text);`);
    this.addSql(`alter table "account" alter column "refresh_token" type text using ("refresh_token"::text);`);
    this.addSql(`alter table "account" alter column "id_token" type text using ("id_token"::text);`);

    this.addSql(`alter table "quiz_entity" alter column "description" type text using ("description"::text);`);

    this.addSql(`alter table "quiz_question_entity" alter column "question" type text using ("question"::text);`);
    this.addSql(`alter table "quiz_question_entity" alter column "answer" type text using ("answer"::text);`);

    this.addSql(`alter table "session" alter column "token" type text using ("token"::text);`);

    this.addSql(`alter table "lobby_player_response_entity" alter column "answer" type text using ("answer"::text);`);

    this.addSql(`alter table "verification" alter column "value" type text using ("value"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "account" alter column "access_token" type varchar(255) using ("access_token"::varchar(255));`);
    this.addSql(`alter table "account" alter column "refresh_token" type varchar(255) using ("refresh_token"::varchar(255));`);
    this.addSql(`alter table "account" alter column "id_token" type varchar(255) using ("id_token"::varchar(255));`);

    this.addSql(`alter table "quiz_entity" alter column "description" type varchar(255) using ("description"::varchar(255));`);

    this.addSql(`alter table "quiz_question_entity" alter column "question" type varchar(255) using ("question"::varchar(255));`);
    this.addSql(`alter table "quiz_question_entity" alter column "answer" type varchar(255) using ("answer"::varchar(255));`);

    this.addSql(`alter table "session" alter column "token" type varchar(255) using ("token"::varchar(255));`);

    this.addSql(`alter table "lobby_player_response_entity" alter column "answer" type varchar(255) using ("answer"::varchar(255));`);

    this.addSql(`alter table "verification" alter column "value" type varchar(255) using ("value"::varchar(255));`);
  }

}
