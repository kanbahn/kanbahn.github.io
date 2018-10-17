import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class TaskOrder1539784923685 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('task')
    await queryRunner.addColumn('task', new TableColumn({
      name: 'index',
      type: 'int'
    }))
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('task', 'index')
  }

}
