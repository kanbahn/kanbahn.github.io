import { Omit } from 'ramda'
import { Dispatch, Reducer } from 'redux'
import { Task } from '../../src-common/entity/Task'
import { debouncedPatchJSON, patchJSON, postJSON } from '../fetch'

interface NewTask {
  type: 'NEW-TASK'
  newTask: Task
}

interface EditTask {
  type: 'EDIT-TASK'
  id: number
  title: string
}

interface MoveTask {
  type: 'MOVE-TASK'
  id: number
  column: string
}

interface ReceiveTasks {
  type: 'RECEIVE-TASKS'
  tasks: Task[]
}

type TaskAction = NewTask | EditTask | MoveTask | ReceiveTasks

export interface StoreState {
  tasks: Task[]
}

const initialState: StoreState = {
  tasks: []
}

const taskReducer: Reducer<StoreState, TaskAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW-TASK':
      return { ...state, tasks: state.tasks.concat(action.newTask) }

    case 'EDIT-TASK':
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
  laneName = laneName.toLowerCase()
  columnName = columnName.toLowerCase()
  const newTaskObject: Omit<Task, 'id'> = { title: 'empty task', lane: laneName, column: columnName }

  return async (dispatch: Dispatch<TaskAction>) => {
    const newTask: Task = await postJSON('/api/tasks', newTaskObject)
    return dispatch({
      type: 'NEW-TASK',
      newTask
    })
  }
}

export const taskEdit = (taskObj: { id: number, title: string }) => {
  const { id, title } = taskObj

  return async (dispatch: Dispatch<TaskAction>) => {
    await debouncedPatchJSON(`/api/tasks/${id}`, { title })
    return dispatch({
      type: 'EDIT-TASK',
      id,
      title
    })
  }
}

export const moveTask = (taskId: number, column: string) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    await patchJSON(`/api/tasks/${taskId}`, { column })
    return dispatch({
      type: 'MOVE-TASK',
      id: taskId,
      column
    })
  }
}

export const receiveTasks = (tasks: Task[]): TaskAction => {
  return {
    type: 'RECEIVE-TASKS',
    tasks
  }
}

export default taskReducer
