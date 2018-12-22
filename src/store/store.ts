import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'
import listReducer, { ListsState } from './listReducer'
import taskReducer, { TasksState } from './taskReducer'
import laneReducer, { LanesState } from './laneReducer'
import thunk from 'redux-thunk'

export interface StoreState {
  lists: ListsState
  tasks: TasksState
  lanes: LanesState
}

const rootReducer: Reducer<StoreState> = combineReducers({
  lists: listReducer,
  tasks: taskReducer,
  lanes: laneReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
