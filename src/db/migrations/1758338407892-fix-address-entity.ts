import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAddressEntity1758338407892 implements MigrationInterface {
    name = 'FixAddressEntity1758338407892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "inUse" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "inUse" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
