import { Dispatch } from 'redux'
import { postJSON } from '../fetch'
import { Omit, assoc } from 'ramda'
import { Project } from '../../src-common/entity/Project'
import { arrayToByIdObject } from '../helpers/helpers'

interface ProjectById {
  [key: string]: Project
}

interface ReceiveProjects {
  type: 'RECEIVE-PROJECTS'
  projects: Project[]
}

interface AddProject {
  type: 'ADD-PROJECT'
  project: Project
}

type ProjectAction = ReceiveProjects | AddProject

export type ProjectsState = ProjectById

const projectReducer = (state: ProjectsState = {}, action: ProjectAction) => {
  switch (action.type) {

    case 'RECEIVE-PROJECTS':
      return arrayToByIdObject(action.projects)

    case 'ADD-PROJECT':
      return assoc(action.project.id.toString(), action.project, state)

    default:
      return state
  }
}

export const receiveProjects = (projects: Project[]): ReceiveProjects => {
  console.log('received:', projects)
  return {
    type: 'RECEIVE-PROJECTS',
    projects
  }
}

export const addProject = (projectName: string, ownerId: string) => {
  const body: Omit<Project, 'id'> = { name: projectName, boards: [], owners: [{ googleId: ownerId }] }
  return async (dispatch: Dispatch<ProjectAction>) => {
    const project: Project = await postJSON('/api/project', body)
    console.log(project)
    return dispatch({
      type: 'ADD-PROJECT',
      project
    })
  }
}

export default projectReducer
