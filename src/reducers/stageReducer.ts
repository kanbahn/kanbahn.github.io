import { Omit } from 'ramda'
import { Dispatch } from 'redux'
import { deleteJSON, postJSON } from '../fetch'
import { Stage } from '../../src-common/entity/Stage'

interface NewStage {
  type: 'NEW-STAGE'
  newStage: Stage
}

interface DeleteStage {
  type: 'DELETE-STAGE'
  stage: Stage
}

interface ReceiveStages {
  type: 'RECEIVE-STAGES'
  stages: Stage[]
}

type StageAction = NewStage | DeleteStage | ReceiveStages
export type StagesState = Stage[]

const stageReducer = (state: StagesState = [], action: StageAction) => {
  switch (action.type) {
    case 'NEW-STAGE':
      return state.concat(action.newStage)

    case 'DELETE-STAGE':
      return state.filter(stage => stage.id !== action.stage.id)

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

export const deleteStage = (stage: Stage) => {
  return async (dispatch: Dispatch<StageAction>) => {
    await deleteJSON(`/api/stages/${stage.id}`)
    return dispatch({
      type: 'DELETE-STAGE',
      stage
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
