import { Dispatch } from 'redux'
import { Board } from '../../src-common/entity/Board'
import { Project } from '../../src-common/entity/Project'

interface SetActiveBoard {
  type: 'SET-ACTIVE-BOARD'
  boardId: number
}

interface SetActiveProject {
  type: 'SET-ACTIVE-PROJECT'
  projectId: number
}

interface AddBoard {
  type: 'ADD-BOARD'
  board: Board
}

interface AddProject {
  type: 'ADD-PROJECT'
  project: Project
}

type UiAction = SetActiveBoard | SetActiveProject | AddBoard | AddProject

export interface UiState {
  activeBoard: number
  activeProject: number
}

const initialState = {
  activeBoard: 0,
  activeProject: 0
}

const uiReducer = (state: UiState = initialState, action: UiAction) => {
  switch (action.type) {
    case 'SET-ACTIVE-BOARD':
      return { ...state, activeBoard: action.boardId }

    case 'ADD-BOARD':
      return { ...state, activeBoard: action.board.id }

    case 'SET-ACTIVE-PROJECT':
      return { ...state, activeProject: action.projectId }

    case 'ADD-PROJECT':
      return { ...state, activeProject: action.project.id }

    default:
      return state
  }
}

export const setActiveBoard = (chosenBoard: number) => {
  return async (dispatch: Dispatch<UiAction>) => {
    return dispatch({
      type: 'SET-ACTIVE-BOARD',
      boardId: chosenBoard
    })
  }
}

export const setActiveProject = (chosenProject: number) => {
  return async (dispatch: Dispatch<UiAction>) => {
    return dispatch({
      type: 'SET-ACTIVE-PROJECT',
      projectId: chosenProject
    })
  }
}

export default uiReducer
