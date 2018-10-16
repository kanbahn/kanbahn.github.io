const development = process.env.NODE_ENV !== 'production'

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [development ? 'src-common/entity/**/*.ts' : 'build-backend/src-common/entity/**/*.js'],
  migrations: [development ? 'src-backend/migration/**/*.ts' : 'build-backend/src-backend/migration/**/*.js'],
  subscribers: [development ? 'src-backend/subscriber/**/*.ts' : 'build-backend/src-backend/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src-common/entity',
    migrationsDir: 'src-backend/migration',
    subscribersDir: 'src-backend/subscriber'
  }
}
