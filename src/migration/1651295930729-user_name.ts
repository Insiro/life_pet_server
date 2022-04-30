import { MigrationInterface, QueryRunner } from "typeorm";

export class userName1651295930729 implements MigrationInterface {
    name = 'userName1651295930729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`nick_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nick_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`nick_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nick_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`nick_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nick_name\` \`name\` varchar(255) NOT NULL`);
    }

}
