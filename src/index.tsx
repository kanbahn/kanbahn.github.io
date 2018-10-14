import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'
import stageReducer, { StagesState } from './reducers/stageReducer'
import taskReducer, { TasksState } from './reducers/taskReducer'

export interface StoreState {
  stages: StagesState
  tasks: TasksState
}

const reducer: Reducer<StoreState> = combineReducers({
  stages: stageReducer,
  tasks: taskReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
