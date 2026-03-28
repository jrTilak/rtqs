import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuizFoldersEntity1773025105345 implements MigrationInterface {
    name = 'AddQuizFoldersEntity1773025105345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz_folder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "color" character varying(7), "organizationId" uuid NOT NULL, "parentId" uuid, "pinned" boolean NOT NULL DEFAULT false, "starred" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2d71116714af8f0c2d70ce8e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quiz_folder" ADD CONSTRAINT "FK_98227dd07378f0135526132bf49" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_folder" ADD CONSTRAINT "FK_303061b1777c364c9b35499141e" FOREIGN KEY ("parentId") REFERENCES "quiz_folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_folder" DROP CONSTRAINT "FK_303061b1777c364c9b35499141e"`);
        await queryRunner.query(`ALTER TABLE "quiz_folder" DROP CONSTRAINT "FK_98227dd07378f0135526132bf49"`);
        await queryRunner.query(`DROP TABLE "quiz_folder"`);
    }

}
