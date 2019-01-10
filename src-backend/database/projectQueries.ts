import { getRepository } from 'typeorm'
import { Project } from '../../src-common/entity/Project'

export async function getProjects() {
  const repository = getRepository(Project)
  return repository.find()
}

export async function createProject(board: Project) {
  const repository = getRepository(Project)
  const entity = repository.create(board)
  await repository.insert(entity)
  return entity
}
