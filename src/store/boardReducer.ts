import { Dispatch } from 'redux'
import { Board } from '../../src-common/entity/Board'
import { postJSON } from '../fetch'

interface ReceiveBoards {
  type: 'RECEIVE-BOARDS'
  boards: Board[]
}

interface AddBoard {
  type: 'ADD-BOARD'
  board: Board
}

type BoardAction = ReceiveBoards | AddBoard

export type BoardsState = Board[]

const boardReducer = (state: BoardsState = [], action: BoardAction) => {
  switch (action.type) {

    case 'RECEIVE-BOARDS':
      return action.boards

    case 'ADD-BOARD':
      return state.concat(action.board)

    default:
      return state
  }
}

export const receiveBoards = (boards: Board[]): ReceiveBoards => {
  return {
    type: 'RECEIVE-BOARDS',
    boards
  }
}

export const addBoard = () => {
  return async (dispatch: Dispatch<BoardAction>) => {
    const board: Board = await postJSON('/api/boards', {})
    return dispatch({
      type: 'ADD-BOARD',
      board
    })
  }
}

export default boardReducer
