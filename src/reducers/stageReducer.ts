import { Omit } from 'ramda'
import { Dispatch } from 'redux'
import { postJSON } from '../fetch'
import { Stage } from '../../src-common/entity/Stage'

interface NewStage {
  type: 'NEW-STAGE'
  newStage: Stage
}

interface ReceiveStages {
  type: 'RECEIVE-STAGES'
  stages: Stage[]
}

type StageAction = NewStage | ReceiveStages
export type StagesState = Stage[]

const stageReducer = (state: StagesState = [], action: StageAction) => {
  switch (action.type) {
    case 'NEW-STAGE':
      return state.concat(action.newStage)

    case 'RECEIVE-STAGES':
      return action.stages

    default:
      return state
  }
}

export const addStage = (lane: string) => {
  const newStageObject: Omit<Stage, 'id'> = { name: 'To do', lane, tasks: [] }

  return async (dispatch: Dispatch<StageAction>) => {
    const newStage: Stage = await postJSON('/api/stages', newStageObject)
    return dispatch({
      type: 'NEW-STAGE',
      newStage
    })
  }
}

export const receiveStages = (stages: Stage[]): StageAction => {
  return {
    type: 'RECEIVE-STAGES',
    stages
  }
}

export default stageReducer
