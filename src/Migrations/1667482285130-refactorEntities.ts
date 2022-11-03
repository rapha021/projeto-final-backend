import { MigrationInterface, QueryRunner } from "typeorm";

export class refactorEntities1667482285130 implements MigrationInterface {
    name = 'refactorEntities1667482285130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying NOT NULL, "city" character varying NOT NULL, "hood" character varying NOT NULL, "complement" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hospital" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "addressId" uuid, CONSTRAINT "UQ_d447d82c2fbee792301253d2f5d" UNIQUE ("cnpj"), CONSTRAINT "REL_40829aab552323dab29856e316" UNIQUE ("addressId"), CONSTRAINT "PK_10f19e0bf17ded693ea0da07d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL, "day" TIMESTAMP NOT NULL, "hour" TIME NOT NULL, "description" character varying(200) NOT NULL, "serviceTypeId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_type" ("id" uuid NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_0a11a8d444eff1346826caed987" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professional" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "crm" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, "hospitalId" uuid, "serviceTypeId" uuid, CONSTRAINT "PK_2846b0dcaac01f9983cb719f124" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL, "content" character varying NOT NULL, "userId" uuid, "professionalId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules_user_users" ("schedulesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_4ee244b7a8e60d4b5403a90aabc" PRIMARY KEY ("schedulesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2aae96c036b05d25146abd037" ON "schedules_user_users" ("schedulesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_291219b6e2c074f5d9d4c77de5" ON "schedules_user_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "schedules_professional_professional" ("schedulesId" uuid NOT NULL, "professionalId" uuid NOT NULL, CONSTRAINT "PK_725c5e331b8de87e08fb5ef0496" PRIMARY KEY ("schedulesId", "professionalId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9074d4b19a01f355c10da9464" ON "schedules_professional_professional" ("schedulesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17e6743939816527acac227e21" ON "schedules_professional_professional" ("professionalId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hospital" ADD CONSTRAINT "FK_40829aab552323dab29856e3166" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_654f2a3c4347d03fea2298bcd9a" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e6f3a9e465f6e7adf928c52bd0d" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" ADD CONSTRAINT "FK_f2aae96c036b05d25146abd0373" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" ADD CONSTRAINT "FK_291219b6e2c074f5d9d4c77de56" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" ADD CONSTRAINT "FK_b9074d4b19a01f355c10da94643" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" ADD CONSTRAINT "FK_17e6743939816527acac227e21d" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" DROP CONSTRAINT "FK_17e6743939816527acac227e21d"`);
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" DROP CONSTRAINT "FK_b9074d4b19a01f355c10da94643"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" DROP CONSTRAINT "FK_291219b6e2c074f5d9d4c77de56"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" DROP CONSTRAINT "FK_f2aae96c036b05d25146abd0373"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e6f3a9e465f6e7adf928c52bd0d"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_654f2a3c4347d03fea2298bcd9a"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646"`);
        await queryRunner.query(`ALTER TABLE "hospital" DROP CONSTRAINT "FK_40829aab552323dab29856e3166"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17e6743939816527acac227e21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9074d4b19a01f355c10da9464"`);
        await queryRunner.query(`DROP TABLE "schedules_professional_professional"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_291219b6e2c074f5d9d4c77de5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2aae96c036b05d25146abd037"`);
        await queryRunner.query(`DROP TABLE "schedules_user_users"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "professional"`);
        await queryRunner.query(`DROP TABLE "service_type"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "hospital"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}