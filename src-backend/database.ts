import { ConnectionOptions, createConnection } from 'typeorm'

const isDevelopment = process.env.NODE_ENV !== 'production'

const options: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: isDevelopment,
  entities: [isDevelopment ? 'src-common/entity/**/*.ts' : 'build-backend/src-common/entity/**/*.js'],
  migrations: [isDevelopment ? 'src-backend/migration/**/*.ts' : 'build-backend/src-common/migration/**/*.js'],
  subscribers: [isDevelopment ? 'src-backend/subscriber/**/*.ts' : 'build-backend/src-common/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src-common/entity',
    migrationsDir: 'src-backend/migration',
    subscribersDir: 'src-backend/subscriber'
  }
}

export const connectToDatabase = async () => {
  const connection = await createConnection(options)

  if (process.env.DATABASE_URL) {
    await connection.synchronize()
  } else {
    const queryRunner = connection.createQueryRunner()
    await queryRunner.createDatabase('kanbahn_test')
  }

  return connection
}
