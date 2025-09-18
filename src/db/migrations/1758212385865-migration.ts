import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758212385865 implements MigrationInterface {
    name = 'Migration1758212385865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "inUse" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "inUse"`);
    }

}
