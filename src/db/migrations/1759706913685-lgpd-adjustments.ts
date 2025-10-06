import { MigrationInterface, QueryRunner } from "typeorm";

export class LgpdAdjustments1759706913685 implements MigrationInterface {
    name = 'LgpdAdjustments1759706913685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "encrypted_cpf" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf_hash" character(64)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "encrypted_email" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email_hash" character(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "encrypted_phone" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_hash" character(64)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "encrypted_birthDate" character varying(512)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "encrypted_gender" character varying(512)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8c24ae4a674eac6ecab1d58fed" ON "users" ("cpf_hash") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_73c6d38fdf47c60c087e985769" ON "users" ("email_hash") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0e438a8460e5816e07aeb6b334" ON "users" ("phone_hash") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0e438a8460e5816e07aeb6b334"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73c6d38fdf47c60c087e985769"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c24ae4a674eac6ecab1d58fed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "encrypted_gender"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "encrypted_birthDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_hash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "encrypted_phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_hash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "encrypted_email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf_hash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "encrypted_cpf"`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" date`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying(11)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(70) NOT NULL`);
    }

}
