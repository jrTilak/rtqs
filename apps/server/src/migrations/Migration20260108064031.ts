import { Migration } from '@mikro-orm/migrations';

export class Migration20260108064031 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" add column "current_module_id" uuid null, add column "current_question_id" uuid null;`);
    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_current_module_id_foreign" foreign key ("current_module_id") references "quiz_module_entity" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_current_question_id_foreign" foreign key ("current_question_id") references "quiz_question_entity" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_current_module_id_unique" unique ("current_module_id");`);
    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_current_question_id_unique" unique ("current_question_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop constraint "quiz_lobby_entity_current_module_id_foreign";`);
    this.addSql(`alter table "quiz_lobby_entity" drop constraint "quiz_lobby_entity_current_question_id_foreign";`);

    this.addSql(`alter table "quiz_lobby_entity" drop constraint "quiz_lobby_entity_current_module_id_unique";`);
    this.addSql(`alter table "quiz_lobby_entity" drop constraint "quiz_lobby_entity_current_question_id_unique";`);
    this.addSql(`alter table "quiz_lobby_entity" drop column "current_module_id", drop column "current_question_id";`);
  }

}
