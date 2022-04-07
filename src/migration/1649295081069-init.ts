import { MigrationInterface, QueryRunner } from "typeorm";

export class init1649295081069 implements MigrationInterface {
    name = 'init1649295081069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" character varying NOT NULL, "user_name" character varying NOT NULL, "email" character varying NOT NULL, "call" character varying NOT NULL, "certificate" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "achievement_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_30f4d54eadf4e20329ba50a9c49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" SERIAL NOT NULL, "achive_time" integer NOT NULL, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend" ("id" SERIAL NOT NULL, "user1UserId" character varying, "user2UserId" character varying, CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "structed_habbit" ("id" SERIAL NOT NULL, "sleep" TIME NOT NULL, "sleep_target" TIME NOT NULL, "awake" TIME NOT NULL, "awake_target" TIME NOT NULL, "steps" integer NOT NULL, "steps_target" integer NOT NULL, "health_time" TIME NOT NULL, "health_time_target" TIME NOT NULL, "study_time" TIME NOT NULL, "study_time_target" TIME NOT NULL, "morning_time" TIME NOT NULL, "morning_time_target" TIME NOT NULL, "launch_time" TIME NOT NULL, "launch_time_target" TIME NOT NULL, "dinner_time" TIME NOT NULL, "dinner_time_target" TIME NOT NULL, "date" date NOT NULL, CONSTRAINT "PK_ef2f5363b8d9e13d3131fcdac1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image1" character varying NOT NULL, "image2" character varying NOT NULL, "image3" character varying NOT NULL, "interaction1" character varying NOT NULL, "interaction2" character varying NOT NULL, "interaction3" character varying NOT NULL, CONSTRAINT "PK_7f05d9fb355f0e41429bef399b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" SERIAL NOT NULL, "intimacy" integer NOT NULL, "exp" integer NOT NULL, "level" integer NOT NULL, "complexity" integer NOT NULL, "categoryId" integer, "ownerUserId" character varying, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_38dae157ec4f96a2ec79b8f3745" FOREIGN KEY ("user1UserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_6d4e03553da342bfcb00f20cd01" FOREIGN KEY ("user2UserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab" FOREIGN KEY ("categoryId") REFERENCES "pet_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_68c696b2c1dc7a78a5fa5e8bc79" FOREIGN KEY ("ownerUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_68c696b2c1dc7a78a5fa5e8bc79"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_6d4e03553da342bfcb00f20cd01"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_38dae157ec4f96a2ec79b8f3745"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "pet_category"`);
        await queryRunner.query(`DROP TABLE "structed_habbit"`);
        await queryRunner.query(`DROP TABLE "friend"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "achievement_category"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
