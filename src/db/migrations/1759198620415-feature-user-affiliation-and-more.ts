import { MigrationInterface, QueryRunner } from "typeorm";

export class FeatureUserAffiliationAndMore1759198620415 implements MigrationInterface {
    name = 'FeatureUserAffiliationAndMore1759198620415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" SET DEFAULT 'OTHER'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "gender" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
    }

}
