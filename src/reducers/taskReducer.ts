import { Omit } from 'ramda'
import { Dispatch } from 'redux'
import { Task } from '../../src-common/entity/Task'
import { debouncedPatchJSON, deleteJSON, getJSON, patchJSON, postJSON } from '../fetch'
import { Stage } from '../../src-common/entity/Stage'

interface NewTask {
  type: 'NEW-TASK'
  newTask: Task
}

interface EditTask {
  type: 'EDIT-TASK'
  id: number
  title: string
}

interface DeleteTask {
  type: 'DELETE-TASK'
  id: number
}

interface ReceiveTasks {
  type: 'RECEIVE-TASKS'
  tasks: Task[]
}

type TaskAction = NewTask | EditTask | DeleteTask | ReceiveTasks
export type TasksState = Task[]

const taskReducer = (state: TasksState = [], action: TaskAction) => {
  switch (action.type) {
    case 'NEW-TASK':
      return state.concat(action.newTask)

    case 'EDIT-TASK':
      const taskToEdit = state.find(task => task.id === action.id)
      if (!taskToEdit) return state
      const editedTask: Task = { ...taskToEdit, title: action.title }
      return state.map(task => task.id !== action.id ? task : editedTask)

    case 'DELETE-TASK':
      return state.filter(task => task.id !== action.id)

    case 'RECEIVE-TASKS':
      return action.tasks

    default:
      return state
  }
}

export const taskCreation = (stage: Stage) => {
  const newTaskObject: Omit<Task, 'id' | 'index'> = { title: '', stage }

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

export const moveTask = (task: Task, stage: Stage) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    await patchJSON(`/api/tasks/${task.id}`, { stage })
    // Need to re-fetch tasks because their indices might have been modified.
    const { tasks } = await getJSON('/api/tasks')
    return dispatch({
      type: 'RECEIVE-TASKS',
      tasks
    })
  }
}

export const deleteTask = (id: number) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    await deleteJSON(`/api/tasks/${id}`)
    return dispatch({
      type: 'DELETE-TASK',
      id
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
