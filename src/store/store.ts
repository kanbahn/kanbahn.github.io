import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'
import listReducer, { ListsState } from './listReducer'
import taskReducer, { TasksState } from './taskReducer'
import thunk from 'redux-thunk'

export interface StoreState {
  lists: ListsState
  tasks: TasksState
}

const rootReducer: Reducer<StoreState> = combineReducers({
  lists: listReducer,
  tasks: taskReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
