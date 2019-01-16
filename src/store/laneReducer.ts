import { Omit } from 'ramda'
import { Dispatch } from 'redux'
import { postJSON, deleteJSON, patchJSON } from '../fetch'
import { Lane } from '../../src-common/entity/Lane'
import { Board } from '../../src-common/entity/Board'

interface ReceiveLanes {
  type: 'RECEIVE-LANES'
  lanes: Lane[]
}

interface AddLane {
  type: 'ADD-LANE'
  lane: Lane
}

interface DeleteLane {
  type: 'DELETE-LANE'
  laneId: number
}

interface EditLane {
  type: 'EDIT-LANE'
  laneId: number
  newName: string
}

type LaneAction = ReceiveLanes | AddLane | DeleteLane | EditLane

export type LanesState = Lane[]

const laneReducer = (state: LanesState = [], action: LaneAction) => {
  switch (action.type) {

    case 'RECEIVE-LANES':
      return action.lanes

    case 'ADD-LANE':
      return state.concat(action.lane)

    case 'DELETE-LANE':
      return state.filter(lane => lane.id !== action.laneId)

    case 'EDIT-LANE':
      return state.map(lane => lane.id !== action.laneId ? lane : { ...lane, name: action.newName })

    default:
      return state
  }
}

export const receiveLanes = (lanes: Lane[]): ReceiveLanes => {
  return {
    type: 'RECEIVE-LANES',
    lanes
  }
}

export const addLane = (laneName: string, board: Board) => {
  const body: Omit<Lane, 'id'> = { name: laneName, board, lists: [] }

  return async (dispatch: Dispatch<LaneAction>) => {
    const lane: Lane = await postJSON('/api/lanes', body)
    console.log(lane)
    return dispatch({
      type: 'ADD-LANE',
      lane
    })
  }
}

export const deleteLane = (laneId: number) => {
  return async (dispatch: Dispatch<LaneAction>) => {
    await deleteJSON(`/api/lane/${laneId}`)
    return dispatch({
      type: 'DELETE-LANE',
      laneId
    })
  }
}

export const editLane = (laneId: number, newName: string) => {
  return async (dispatch: Dispatch<LaneAction>) => {
    const updates = { name: newName }
    await patchJSON(`/api/lane/${laneId}`, updates)
    return dispatch({
      type: 'EDIT-LANE',
      laneId,
      newName
    })
  }
}

export default laneReducer
