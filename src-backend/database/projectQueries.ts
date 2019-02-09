import { getRepository, getConnection } from 'typeorm'
import { Project } from '../../src-common/entity/Project'
const sql = require('yesql')('./src-backend/database/sql/',  {type: 'pg'})

export async function getProjects() {
  return getRepository(Project).find({ relations: ['owners'] })
}

export async function getUsersProjectsNested(userId: string) {
  console.log("User id", userId)
  return getRepository(Project).find() // todo: filter by user
}

export async function getUsersProjects(userId: string) {
  return await getConnection()
    .query(
      sql.getProjectsByUser().text,
      [userId])
}

export async function createProject(project: Project) {
  const repository = getRepository(Project)
  const entity = repository.create(project)
  await repository.save(entity)
  return entity
}
