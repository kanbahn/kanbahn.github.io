import { Omit, assoc, dissoc } from 'ramda'
import { Dispatch } from 'redux'
import { Task } from '../../src-common/entity/Task'
import { debouncedPatchJSON, deleteJSON, getJSON, patchJSON, postJSON } from '../fetch'
import { List } from '../../src-common/entity/List'
import { arrayToByIdObject } from '../helpers/helpers'

interface TaskById {
  [key: string]: Task
}

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

export type TasksState = TaskById

const taskReducer = (state: TasksState = {}, action: TaskAction) => {
  switch (action.type) {
    case 'NEW-TASK':
      const newId: string = action.newTask.id.toString()
      return assoc( newId, action.newTask, state )

    case 'EDIT-TASK':
      const editId: string = action.id.toString()
      const editTask: Task = state[editId]
      return { ...state, editId: { ...editTask, title: action.title } }

    case 'DELETE-TASK':
      const deleteId: string = action.id.toString()
      const deletedState: TaskById = dissoc( deleteId, state )
      return deletedState

    case 'RECEIVE-TASKS':
      return arrayToByIdObject( action.tasks )

    default:
      return state
  }
}

export const taskCreation = (list: List) => {
  const newTaskObject: Omit<Task, 'id' | 'index'> = { title: '', list: list.id }

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

export const moveTask = (task: Task, list: List) => {
  return async (dispatch: Dispatch<TaskAction>) => {
    await patchJSON(`/api/tasks/${task.id}`, { list })
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
