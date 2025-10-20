import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1760917631734 implements MigrationInterface {
    name = 'Migration1760917631734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "establishments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "establishment_name" character varying NOT NULL, "establishment_email" character varying NOT NULL, "establishment_address" character varying NOT NULL, "establishment_document" character varying NOT NULL, "membership_type" character varying NOT NULL, "monthly_fee" numeric NOT NULL, "establishment_description" character varying NOT NULL, "establishment_services" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "establishments"`);
    }

}
