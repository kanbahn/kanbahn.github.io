import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { createStore, combineReducers } from 'redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import taskReducer from './reducers/taskReducer'

const reducer = taskReducer // later combined reducer

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
