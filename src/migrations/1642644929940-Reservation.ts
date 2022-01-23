import { MigrationInterface, QueryRunner } from "typeorm";

export class Reservation1642644929940 implements MigrationInterface {
    name = "Reservation1642644929940"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"reservations\" (\"id\" SERIAL NOT NULL, \"roomId\" integer NOT NULL, \"enrollmentId\" integer NOT NULL, CONSTRAINT \"REL_de78c2bc4d6caa58635c4d2be1\" UNIQUE (\"enrollmentId\"), CONSTRAINT \"PK_da95cef71b617ac35dc5bcda243\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"reservations\" ADD CONSTRAINT \"FK_de78c2bc4d6caa58635c4d2be1e\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_de78c2bc4d6caa58635c4d2be1e\"");
      await queryRunner.query("ALTER TABLE \"reservations\" DROP CONSTRAINT \"FK_73fa8fb7243b56914e00f8a0b14\"");
      await queryRunner.query("DROP TABLE \"reservations\"");
    }
}
