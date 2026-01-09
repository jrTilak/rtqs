import { Migration } from '@mikro-orm/migrations';

export class Migration20260109052830 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" add column "current_question_started_at" timestamptz null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop column "current_question_started_at";`);
  }

}
