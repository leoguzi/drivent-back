import { MigrationInterface, QueryRunner } from "typeorm";

export class addActivityEntity1643155490283 implements MigrationInterface {
    name = "addActivityEntity1643155490283"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"startDate\" TIMESTAMP NOT NULL, \"endDate\" TIMESTAMP NOT NULL, \"vacancies\" integer NOT NULL, \"location\" character varying NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities_enrollment_enrollments\" (\"activitiesId\" integer NOT NULL, \"enrollmentsId\" integer NOT NULL, CONSTRAINT \"PK_0c0906243680ace34c22d635258\" PRIMARY KEY (\"activitiesId\", \"enrollmentsId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_61174648c7ac97c82ac5b41f1b\" ON \"activities_enrollment_enrollments\" (\"activitiesId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_7bba10dfd57ca987245cf58783\" ON \"activities_enrollment_enrollments\" (\"enrollmentsId\") ");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"paymentDate\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"paymentDate\" TIMESTAMP");
      await queryRunner.query("ALTER TABLE \"activities_enrollment_enrollments\" ADD CONSTRAINT \"FK_61174648c7ac97c82ac5b41f1b6\" FOREIGN KEY (\"activitiesId\") REFERENCES \"activities\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"activities_enrollment_enrollments\" ADD CONSTRAINT \"FK_7bba10dfd57ca987245cf587836\" FOREIGN KEY (\"enrollmentsId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities_enrollment_enrollments\" DROP CONSTRAINT \"FK_7bba10dfd57ca987245cf587836\"");
      await queryRunner.query("ALTER TABLE \"activities_enrollment_enrollments\" DROP CONSTRAINT \"FK_61174648c7ac97c82ac5b41f1b6\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"paymentDate\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"paymentDate\" character varying");
      await queryRunner.query("DROP INDEX \"IDX_7bba10dfd57ca987245cf58783\"");
      await queryRunner.query("DROP INDEX \"IDX_61174648c7ac97c82ac5b41f1b\"");
      await queryRunner.query("DROP TABLE \"activities_enrollment_enrollments\"");
      await queryRunner.query("DROP TABLE \"activities\"");
    }
}
