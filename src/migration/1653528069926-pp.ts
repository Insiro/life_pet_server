import { MigrationInterface, QueryRunner } from "typeorm";

export class pp1653528069926 implements MigrationInterface {
    name = 'pp1653528069926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`habbit\` ADD \`userUserId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`habbit\` ADD CONSTRAINT \`FK_1bfd44e556896ed21b34d0f23ec\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`habbit\` DROP FOREIGN KEY \`FK_1bfd44e556896ed21b34d0f23ec\``);
        await queryRunner.query(`ALTER TABLE \`habbit\` DROP COLUMN \`userUserId\``);
    }

}
