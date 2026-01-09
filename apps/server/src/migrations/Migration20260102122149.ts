import { Migration } from '@mikro-orm/migrations';

export class Migration20260102122149 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "base_entity" alter column "id" drop default;`);
    this.addSql(
      `alter table "base_entity" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "base_entity" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(`alter table "quiz_entity" alter column "id" drop default;`);
    this.addSql(
      `alter table "quiz_entity" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "quiz_entity" alter column "id" set default gen_random_uuid();`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "base_entity" alter column "id" drop default;`);
    this.addSql(`alter table "base_entity" alter column "id" drop default;`);
    this.addSql(
      `alter table "base_entity" alter column "id" type uuid using ("id"::text::uuid);`,
    );

    this.addSql(`alter table "quiz_entity" alter column "id" drop default;`);
    this.addSql(`alter table "quiz_entity" alter column "id" drop default;`);
    this.addSql(
      `alter table "quiz_entity" alter column "id" type uuid using ("id"::text::uuid);`,
    );
  }
}
