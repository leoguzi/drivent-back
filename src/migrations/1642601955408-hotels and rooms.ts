import { MigrationInterface, QueryRunner } from "typeorm";

export class hotelsAndRooms1642601955408 implements MigrationInterface {
    name = "hotelsAndRooms1642601955408"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"vacancies\" integer NOT NULL, \"hotelId\" integer NOT NULL, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"image\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\" UNIQUE (\"enrollmentId\")");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
    }
}
