import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAddressEntity1758328122237 implements MigrationInterface {
    name = 'FixAddressEntity1758328122237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "inUse" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "inUse" SET NOT NULL`);
    }

}
