import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760913282684 implements MigrationInterface {
    name = 'Migration1760913282684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client" character varying NOT NULL, "provider" character varying NOT NULL, "establishment" character varying NOT NULL, "services" json NOT NULL, "priority" integer NOT NULL, "bill_value" numeric NOT NULL, "accepted_in" TIMESTAMP, "check_in" TIMESTAMP, "check_out" TIMESTAMP, "devices_location" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "lat" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "lng" character varying(10)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "lat"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
