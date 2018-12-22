import { Omit } from 'ramda'
import { Dispatch } from 'redux'
import { postJSON } from '../fetch'
import { Lane } from '../../src-common/entity/Lane'

interface ReceiveLanes {
  type: 'RECEIVE-LANES'
  lanes: Lane[]
}

interface AddLane {
  type: 'ADD-LANE'
  lane: Lane
}

type LaneAction = ReceiveLanes | AddLane
export type LanesState = Lane[]

const laneReducer = (state: LanesState = [], action: LaneAction) => {
  switch (action.type) {

    case 'RECEIVE-LANES':
      return action.lanes

    case 'ADD-LANE':
      return state.concat(action.lane)

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

export const addLane = (laneName: string) => {
  const body: Omit<Lane, 'id'> = { name: laneName, lists: [] }

  return async (dispatch: Dispatch<LaneAction>) => {
    const lane: Lane = await postJSON('/api/lanes', body)
    return dispatch({
      type: 'ADD-LANE',
      lane
    })
  }
}
export default laneReducer
