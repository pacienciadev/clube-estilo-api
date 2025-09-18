import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758175203862 implements MigrationInterface {
    name = 'Migration1758175203862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(255), "street" character varying(255) NOT NULL, "number" character varying(10) NOT NULL, "complement" character varying(255), "city" character varying(100) NOT NULL, "state" character varying(100) NOT NULL, "zip_code" character varying(10) NOT NULL, "country" character varying(100) NOT NULL, "userId" uuid, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
