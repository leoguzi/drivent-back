import { MigrationInterface, QueryRunner } from "typeorm";

export class updatesActivityTimestamp1643205137661 implements MigrationInterface {
    name = "updatesActivityTimestamp1643205137661"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"startDate\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"startDate\" TIMESTAMP WITH TIME ZONE NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"endDate\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"endDate\" TIMESTAMP WITH TIME ZONE NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"endDate\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"endDate\" TIMESTAMP NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"startDate\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"startDate\" TIMESTAMP NOT NULL");
    }
}
