import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameStageToList1539815138928 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE stage RENAME TO list')
    await queryRunner.query('ALTER SEQUENCE stage_id_seq RENAME TO list_id_seq')
    await queryRunner.query('ALTER TABLE task RENAME COLUMN "stageId" TO "listId"')
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE list RENAME TO stage')
    await queryRunner.query('ALTER SEQUENCE list_id_seq RENAME TO stage_id_seq')
    await queryRunner.query('ALTER TABLE task RENAME COLUMN "listId" TO "stageId"')
  }

}
