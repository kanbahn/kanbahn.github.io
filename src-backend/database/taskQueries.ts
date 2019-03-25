import { getManager, getRepository, getConnection, MoreThan } from 'typeorm'
import { Task } from '../../src-common/entity/Task'
const sql = require('yesql')('./src-backend/database/sql/',  { type: 'pg' })

export async function getTasks() {
  const tasksRepository = getRepository(Task)
  return tasksRepository.find({ order: { list: 'ASC', index: 'ASC' } })
}

export async function getTasksByUser(userId: string) {
  return await getConnection()
    .query(
      sql.tasksByUser().text,
      [userId]
    )
}

export async function createTask(task: Task) {
  return getManager().transaction(async entityManager => {
    const tasksRepository = entityManager.getRepository(Task)
    const index = await tasksRepository.count({ where: { list: task.list } })
    const entity = tasksRepository.create({ ...task, index })
    await tasksRepository.insert(entity)
    return entity
  })
}

export async function updateTask(id: number, updates: Partial<Task>) {
  return getManager().transaction(async entityManager => {
    const tasksRepository = entityManager.getRepository(Task)

    if (updates.title !== undefined) {
      await tasksRepository.save({ id, title: updates.title })
    }

    if (updates.list !== undefined) {
      const entity = await tasksRepository.findOneOrFail({ id })
      await tasksRepository.decrement({ index: MoreThan(entity.index), list: entity.list }, 'index', 1)
      const index = await tasksRepository.count({ where: { list: updates.list } })
      await tasksRepository.save({ id, index, list: updates.list })
    }

    return await tasksRepository.findOneOrFail({ id })
  })
}

export async function deleteTask(id: number) {
  return getManager().transaction(async entityManager => {
    const tasksRepository = entityManager.getRepository(Task)
    const entity = await tasksRepository.findOneOrFail({ id })
    await tasksRepository.delete({ id })
    await tasksRepository.decrement({ index: MoreThan(entity.index), list: entity.list }, 'index', 1)
  })
}
