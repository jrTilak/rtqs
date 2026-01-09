import { Migration } from '@mikro-orm/migrations';

export class Migration20260108012324 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop constraint if exists "quiz_lobby_entity_status_check";`);

    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_status_check" check("status" in ('IN_LOBBY', 'WAITING_FOR_NEXT_QUESTION', 'MODULE_BREAK', 'IN_QUIZ', 'QUESTION_RESPONSE_SUMMARY', 'QUIZ_SUMMARY', 'ENDED'));`);
    this.addSql(`alter table "quiz_lobby_entity" rename column "wait_in_lobby_until" to "wait_until";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop constraint if exists "quiz_lobby_entity_status_check";`);

    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_status_check" check("status" in ('IN_LOBBY', 'ENDED'));`);
    this.addSql(`alter table "quiz_lobby_entity" rename column "wait_until" to "wait_in_lobby_until";`);
  }

}
