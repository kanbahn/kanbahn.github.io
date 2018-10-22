import { createConnection } from 'typeorm'

export const connectToDatabase = async () => {
  const connection = await createConnection('default')

  if (!process.env.DATABASE_URL) {
    const queryRunner = connection.createQueryRunner()
    await queryRunner.createDatabase('kanbahn_test')
  }

  return connection
}
