import { getConnection, getManager, getRepository } from 'typeorm'
import { List } from '../../src-common/entity/List'

export async function getLists() {
  const listRepository = getRepository(List)
  return listRepository.find()
}

export async function createList(list: List) {
  const listRepository = getRepository(List)
  const entity = listRepository.create(list)
  await listRepository.insert(entity)
  return entity
}

export async function updateList(id: number, updates: Partial<List>) {
  return getManager().transaction(async entityManager => {
    const listRepository = entityManager.getRepository(List)

    if (updates.name !== undefined) {
      await listRepository.save({ id, name: updates.name })
    }

    if (updates.lane !== undefined) {
      await listRepository.save({ id, lane: updates.lane })
    }

    return await listRepository.findOneOrFail({ id })
  })
}

export async function deleteList(id: number) {
  const listRepository = getRepository(List)
  console.log(listRepository)
  await listRepository.delete({ id })
}

export async function deleteLists(laneName: string) {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(List)
    .where('lane = :laneToDelete', { laneToDelete: laneName })
    .execute()
}

export async function editLists(laneName: string, updates: Partial<List>) {
  return await getConnection()
    .createQueryBuilder()
    .update(List)
    .set(updates)
    .where('lane = :laneToEdit', { laneToEdit: laneName })
    .execute()
}
