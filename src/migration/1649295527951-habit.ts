import { MigrationInterface, QueryRunner } from "typeorm";

export class habit1649295527951 implements MigrationInterface {
    name = 'habit1649295527951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "habbit" ("id" SERIAL NOT NULL, "target" integer NOT NULL, "achieve" integer NOT NULL, "desc" character varying NOT NULL, "date" date NOT NULL, CONSTRAINT "PK_e0864d663d6c62079851649bced" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "habbit"`);
    }

}
