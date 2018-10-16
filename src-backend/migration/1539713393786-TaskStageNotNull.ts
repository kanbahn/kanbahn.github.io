import { MigrationInterface, QueryRunner } from 'typeorm'

export class TaskStageNotNull1539713393786 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "task" ALTER COLUMN "stageId" SET NOT NULL')
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE "task" ALTER COLUMN "stageId" DROP NOT NULL')
  }

}
