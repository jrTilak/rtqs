import { Migration } from '@mikro-orm/migrations';

export class Migration20260106073003 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop constraint "quiz_lobby_entity_quiz_id_foreign";`);

    this.addSql(`alter table "quiz_module_entity" drop constraint "quiz_module_entity_quiz_id_foreign";`);

    this.addSql(`alter table "quiz_question_entity" drop constraint "quiz_question_entity_module_id_foreign";`);

    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "quiz_module_entity" add constraint "quiz_module_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "quiz_question_entity" add constraint "quiz_question_entity_module_id_foreign" foreign key ("module_id") references "quiz_module_entity" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "quiz_lobby_entity" drop constraint "quiz_lobby_entity_quiz_id_foreign";`);

    this.addSql(`alter table "quiz_module_entity" drop constraint "quiz_module_entity_quiz_id_foreign";`);

    this.addSql(`alter table "quiz_question_entity" drop constraint "quiz_question_entity_module_id_foreign";`);

    this.addSql(`alter table "quiz_lobby_entity" add constraint "quiz_lobby_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade;`);

    this.addSql(`alter table "quiz_module_entity" add constraint "quiz_module_entity_quiz_id_foreign" foreign key ("quiz_id") references "quiz_entity" ("id") on update cascade;`);

    this.addSql(`alter table "quiz_question_entity" add constraint "quiz_question_entity_module_id_foreign" foreign key ("module_id") references "quiz_module_entity" ("id") on update cascade;`);
  }

}
