import { Dispatch } from 'redux'
import { postJSON } from '../fetch'
import { Omit } from 'ramda'
import { Project } from '../../src-common/entity/Project'

interface ReceiveProjects {
  type: 'RECEIVE-PROJECTS'
  projects: Project[]
}

interface AddProject {
  type: 'ADD-PROJECT'
  project: Project
}

type ProjectAction = ReceiveProjects | AddProject

export type ProjectsState = Project[]

const projectReducer = (state: ProjectsState = [], action: ProjectAction) => {
  switch (action.type) {

    case 'RECEIVE-PROJECTS':
      return action.projects

    case 'ADD-PROJECT':
      return state.concat(action.project)

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
