import { getRepository } from 'typeorm'
import { Project } from '../../src-common/entity/Project'

export async function getProjects() {
  return getRepository(Project).find({ relations: ['owners'] })
}

export async function getUsersProjectsNested(userId: string) {
  return getRepository(Project).find() // todo: filter by user
}

export async function getUsersProjects(userId: string) {
  return await getRepository(Project)
    .query(
      'SELECT p.id, p.name ' +
      'FROM project as p, project_owners_user AS o ' +
      'WHERE p.id = o."projectId" ' +
      'AND "userGoogleId" = $1', [userId])
}

export async function createProject(project: Project) {
  const repository = getRepository(Project)
  const entity = repository.create(project)
  await repository.save(entity)
  return entity
}
