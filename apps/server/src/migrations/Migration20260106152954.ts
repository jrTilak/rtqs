import { Migration } from '@mikro-orm/migrations';

export class Migration20260106152954 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "quiz_lobby_entity" add column "name" varchar(255) not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop column "name";`);
  }
}
