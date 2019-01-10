import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'
import listReducer, { ListsState } from './listReducer'
import taskReducer, { TasksState } from './taskReducer'
import laneReducer, { LanesState } from './laneReducer'
import boardReducer, { BoardsState } from './boardReducer'
import thunk from 'redux-thunk'
import uiReducer, { UiState } from './uiReducer'

export interface StoreState {
  lists: ListsState
  tasks: TasksState
  lanes: LanesState
  boards: BoardsState
  ui: UiState
}

const rootReducer: Reducer<StoreState> = combineReducers({
  lists: listReducer,
  tasks: taskReducer,
  lanes: laneReducer,
  boards: boardReducer,
  ui: uiReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
