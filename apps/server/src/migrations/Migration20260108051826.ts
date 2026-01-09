import { Migration } from '@mikro-orm/migrations';

export class Migration20260108051826 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop column "participants_count";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" add column "participants_count" int not null default 0;`);
  }

}
