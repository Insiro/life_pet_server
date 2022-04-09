import { MigrationInterface, QueryRunner } from "typeorm";

export class fixName1649479721766 implements MigrationInterface {
    name = 'fixName1649479721766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    }

}
