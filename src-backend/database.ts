import { ConnectionOptions, createConnection } from 'typeorm'

const database = 'kanbahn_test'
const isDevelopment = process.env.NODE_ENV !== 'production'

const options: ConnectionOptions = {
  type: 'postgres',
  synchronize: isDevelopment,
  entities: ['src-common/entity/**/*.ts'],
  migrations: ['src-backend/migration/**/*.ts'],
  subscribers: ['src-backend/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src-common/entity',
    migrationsDir: 'src-backend/migration',
    subscribersDir: 'src-backend/subscriber'
  }
}

export const connectToDatabase = async () => {
  const connection = await createConnection(options)
  const queryRunner = connection.createQueryRunner()
  await queryRunner.createDatabase(database)
  return connection
}
