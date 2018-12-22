import { getRepository } from 'typeorm'
import { Lane } from '../../src-common/entity/Lane'

export async function getLanes() {
  const laneRepository = getRepository(Lane)
  return laneRepository.find()
}

export async function createLane(newLane: Lane) {
  const laneRepository = getRepository(Lane)
  const entity = laneRepository.create(newLane)
  await laneRepository.insert(entity)
  return entity
}
