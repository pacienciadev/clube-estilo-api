import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAddressEntity1759015636303 implements MigrationInterface {
    name = 'FixAddressEntity1759015636303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying(11)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" date`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'OTHER'`);
        await queryRunner.query(`CREATE TYPE "public"."users_affiliation_enum" AS ENUM('USER', 'CE_ADMIN', 'SERVICE_PROVIDER', 'SUPER_ADMIN', 'SERVICE_PROVIDER_MANAGER')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "affiliation" "public"."users_affiliation_enum" NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "affiliation"`);
        await queryRunner.query(`DROP TYPE "public"."users_affiliation_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    }

}
