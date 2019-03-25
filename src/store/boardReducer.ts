import { Dispatch } from 'redux'
import { Board } from '../../src-common/entity/Board'
import { postJSON } from '../fetch'
import { Omit, assoc } from 'ramda'
import { Project } from '../../src-common/entity/Project'
import { arrayToByIdObject } from '../helpers/helpers';

interface BoardById {
  [key: string]: Board
}

interface ReceiveBoards {
  type: 'RECEIVE-BOARDS'
  boards: Board[]
}

interface AddBoard {
  type: 'ADD-BOARD'
  board: Board
}

type BoardAction = ReceiveBoards | AddBoard

export type BoardsState = BoardById

const boardReducer = (state: BoardsState = {}, action: BoardAction) => {
  switch (action.type) {

    case 'RECEIVE-BOARDS':
      return arrayToByIdObject( action.boards )

    case 'ADD-BOARD':
      const id: string = action.board.id.toString()
      return assoc(id, action.board, state)

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
