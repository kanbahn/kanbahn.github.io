import { Dispatch } from 'redux'

interface SetActiveBoard {
  type: 'SET-ACTIVE-BOARD'
  boardId: number
}

type UiAction = SetActiveBoard

export interface UiState { activeBoard: number }

const initialState = {
  activeBoard: 0
}

const uiReducer = (state: UiState = initialState, action: UiAction) => {
  switch (action.type) {
    case 'SET-ACTIVE-BOARD':
      const newState = { ...state, activeBoard: action.boardId }
      return newState

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
