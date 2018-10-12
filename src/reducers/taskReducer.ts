import { Omit } from 'ramda'
import { Dispatch, Reducer } from 'redux'
import { Task } from '../../src-common/entity/Task'
import { postJSON } from '../fetch'

export interface StoreState {
  tasks: Task[]
}

const initialState: StoreState = {
  tasks: []
}

const taskReducer: Reducer<StoreState> = (state = initialState, action) => {
  console.log('in taskReducer. ACTION: ', action)

  switch (action.type) {
    case 'NEW-TASK':
      return { ...state, tasks: state.tasks.concat(action.newTask) }
    case 'EDIT-TASK':
      console.log('task edit reducer')
      const taskToEdit = state.tasks.find(task => task.id === action.id)
      if (!taskToEdit) return state
      const editedTask: Task = { ...taskToEdit, title: action.title }
      return { ...state, tasks: state.tasks.map(task => task.id !== action.id ? task : editedTask) }
    case 'MOVE-TASK':
      const taskToMove = state.tasks.find(task => task.id === action.id)
      if (!taskToMove) return state
      const movedTask: Task = { ...taskToMove, column: action.column }
      return { ...state, tasks: state.tasks.map(task => task.id !== action.id ? task : movedTask) }
    case 'RECEIVE-TASKS':
      return { ...state, tasks: action.tasks }
    default:
      return state
  }
}

export const taskCreation = (laneName: string, columnName: string) => {
  console.log('hello from taskCreation')
  laneName = laneName.toLowerCase()
  columnName = columnName.toLowerCase()
  const newTaskObject: Omit<Task, 'id'> = { title: 'empty task', lane: laneName, column: columnName }

  return async (dispatch: Dispatch) => {
    const newTask: Task = await postJSON('/tasks', newTaskObject)
    return dispatch({
      type: 'NEW-TASK',
      newTask
    })
  }
}

export const taskEdit = (taskObj: { id: number, title: string }) => {
  console.log(taskObj)
  return {
    type: 'EDIT-TASK',
    id: taskObj.id,
    title: taskObj.title
  }
}

export const moveTask = (taskId: number, column: string) => {
  console.log('hello from moveTaskReducer')
  return {
    type: 'MOVE-TASK',
    id: taskId,
    column
  }
}

export default taskReducer
