import { createConnection } from 'typeorm'

export const connectToDatabase = async () => {
  const connection = await createConnection('default')
  return connection
}
