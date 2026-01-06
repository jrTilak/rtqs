import { Migration } from '@mikro-orm/migrations';

export class Migration20260106074912 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "quiz_participant_entity" drop column "name";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_participant_entity" add column "name" varchar(255) not null;`);
  }

}
