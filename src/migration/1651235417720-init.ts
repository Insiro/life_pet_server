import { MigrationInterface, QueryRunner } from "typeorm";

export class init1651235417720 implements MigrationInterface {
    name = 'init1651235417720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`achievement_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`user_id\` varchar(255) NOT NULL, \`user_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`call\` varchar(255) NOT NULL, \`certificate\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`achievement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`achive_time\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friend\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user1UserId\` varchar(255) NULL, \`user2UserId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`habbit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`target\` int NOT NULL, \`achieve\` int NOT NULL, \`desc\` varchar(255) NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`structed_habbit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sleep\` time NOT NULL, \`sleep_target\` time NOT NULL, \`awake\` time NOT NULL, \`awake_target\` time NOT NULL, \`steps\` int NOT NULL, \`steps_target\` int NOT NULL, \`health_time\` time NOT NULL, \`health_time_target\` time NOT NULL, \`study_time\` time NOT NULL, \`study_time_target\` time NOT NULL, \`morning_time\` time NOT NULL, \`morning_time_target\` time NOT NULL, \`launch_time\` time NOT NULL, \`launch_time_target\` time NOT NULL, \`dinner_time\` time NOT NULL, \`dinner_time_target\` time NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pet_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image1\` varchar(255) NOT NULL, \`image2\` varchar(255) NOT NULL, \`image3\` varchar(255) NOT NULL, \`interaction1\` varchar(255) NOT NULL, \`interaction2\` varchar(255) NOT NULL, \`interaction3\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`intimacy\` int NOT NULL, \`exp\` int NOT NULL, \`level\` int NOT NULL, \`complexity\` int NOT NULL, \`categoryId\` int NULL, \`ownerUserId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`friend\` ADD CONSTRAINT \`FK_38dae157ec4f96a2ec79b8f3745\` FOREIGN KEY (\`user1UserId\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`friend\` ADD CONSTRAINT \`FK_6d4e03553da342bfcb00f20cd01\` FOREIGN KEY (\`user2UserId\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_c46f17a55aefa4484cf6bcbe3ab\` FOREIGN KEY (\`categoryId\`) REFERENCES \`pet_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_68c696b2c1dc7a78a5fa5e8bc79\` FOREIGN KEY (\`ownerUserId\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_68c696b2c1dc7a78a5fa5e8bc79\``);
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_c46f17a55aefa4484cf6bcbe3ab\``);
        await queryRunner.query(`ALTER TABLE \`friend\` DROP FOREIGN KEY \`FK_6d4e03553da342bfcb00f20cd01\``);
        await queryRunner.query(`ALTER TABLE \`friend\` DROP FOREIGN KEY \`FK_38dae157ec4f96a2ec79b8f3745\``);
        await queryRunner.query(`DROP TABLE \`pet\``);
        await queryRunner.query(`DROP TABLE \`pet_category\``);
        await queryRunner.query(`DROP TABLE \`structed_habbit\``);
        await queryRunner.query(`DROP TABLE \`habbit\``);
        await queryRunner.query(`DROP TABLE \`friend\``);
        await queryRunner.query(`DROP TABLE \`achievement\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`achievement_category\``);
    }

}
