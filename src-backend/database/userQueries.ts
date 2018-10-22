import { getRepository } from 'typeorm'
import { User } from '../../src-common/entity/User'

export async function createUser(googleId: string) {
  const userRepository = getRepository(User)
  await userRepository.save({ googleId })
}
