import { Dispatch } from 'redux'
import { Board } from '../../src-common/entity/Board'

interface SetActiveBoard {
  type: 'SET-ACTIVE-BOARD'
  boardId: number
}

interface AddBoard {
  type: 'ADD-BOARD'
  board: Board
}

type UiAction = SetActiveBoard | AddBoard

export interface UiState {
  activeBoard: number
  activeProject: number
}

const initialState = {
  activeBoard: 0,
  activeProject: 1
}

const uiReducer = (state: UiState = initialState, action: UiAction) => {
  switch (action.type) {
    case 'SET-ACTIVE-BOARD':
      return { ...state, activeBoard: action.boardId }

    case 'ADD-BOARD':
      return { ...state, activeBoard: action.board.id }

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

export default uiReducer
