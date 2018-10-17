import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'
import listReducer, { ListsState } from './reducers/listReducer'
import taskReducer, { TasksState } from './reducers/taskReducer'

export interface StoreState {
  lists: ListsState
  tasks: TasksState
}

const reducer: Reducer<StoreState> = combineReducers({
  lists: listReducer,
  tasks: taskReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
