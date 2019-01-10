import { Dispatch } from 'redux'
import { Board } from '../../src-common/entity/Board'
import { postJSON } from '../fetch'
import { Omit } from 'ramda'
import { Project } from '../../src-common/entity/Project'

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

export const addBoard = (boardName: string, project: Project) => {
  const body: Omit<Board, 'id'> = { name: boardName, project, lanes: [] }
  return async (dispatch: Dispatch<BoardAction>) => {
    const board: Board = await postJSON('/api/boards', body)
    return dispatch({
      type: 'ADD-BOARD',
      board
    })
  }
}

export default boardReducer
