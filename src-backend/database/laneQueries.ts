import { getRepository, getConnection } from 'typeorm'
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

export async function deleteLane(id: number) {
  const laneRepository = getRepository(Lane)
  await laneRepository.delete({ id })
}

export async function editLane(id: number, updates: Partial<Lane>) {
  return await getConnection()
    .createQueryBuilder()
      .update(Lane)
      .set(updates)
      .where('id = :laneId', { laneId: id })
      .execute()
}
