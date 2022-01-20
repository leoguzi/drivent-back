import { MigrationInterface, QueryRunner } from "typeorm";

export class addTicket1642639136715 implements MigrationInterface {
    name = "addTicket1642639136715"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"paymentDate\" character varying NOT NULL, \"withHotel\" boolean NOT NULL, \"enrollmentId\" integer, CONSTRAINT \"REL_dd4e2f30efd93e2ec78e33ce9d\" UNIQUE (\"enrollmentId\"), CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_dd4e2f30efd93e2ec78e33ce9df\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_dd4e2f30efd93e2ec78e33ce9df\"");
      await queryRunner.query("DROP TABLE \"tickets\"");
    }
}
