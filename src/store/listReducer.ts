import { Omit, assoc, dissoc } from 'ramda'
import { Dispatch } from 'redux'
import { deleteJSON, patchJSON, postJSON } from '../fetch'
import { List } from '../../src-common/entity/List'
import { Lane } from '../../src-common/entity/Lane'
import { arrayToByIdObject } from '../helpers/helpers'

interface ListById {
  [key: string]: List
}

interface NewList {
  type: 'NEW-LIST'
  list: List
}

interface EditList {
  type: 'EDIT-LIST'
  list: List
  edits: Partial<List>
}

interface DeleteList {
  type: 'DELETE-LIST'
  list: List
}

interface ReceiveLists {
  type: 'RECEIVE-LISTS'
  lists: List[]
}

type ListAction = NewList | EditList | DeleteList | ReceiveLists

export type ListsState = ListById

const listReducer = (state: ListsState = {}, action: ListAction) => {
  switch (action.type) {
    case 'NEW-LIST':
      const newId: string = action.list.id.toString()
      const newState: ListById = assoc(newId, action.list, state)
      return newState

    case 'EDIT-LIST':
      const editId = action.list.id.toString()
      const editList = state[editId]
      return { ...state, editId: { ...editList, ...action.edits } }

    case 'DELETE-LIST':
      const deleteId: string = action.list.id.toString()
      const deletedState: ListById = dissoc(deleteId, state)
      return deletedState

    case 'RECEIVE-LISTS':
      return arrayToByIdObject( action.lists )

    default:
      return state
  }
}

export const addList = (lane: string, laneId: Lane ) => {
  const body: Omit<List, 'id'> = { name: 'To do', lane, laneId, tasks: [] }

  return async (dispatch: Dispatch<ListAction>) => {
    const list: List = await postJSON('/api/lists', body)
    return dispatch({
      type: 'NEW-LIST',
      list
    })
  }
}

export const editList = (list: List, edits: Partial<List>) => {
  return async (dispatch: Dispatch<ListAction>) => {
    await patchJSON(`/api/lists/${list.id}`, edits)
    return dispatch({
      type: 'EDIT-LIST',
      list,
      edits
    })
  }
}

export const deleteList = (list: List) => {
  return async (dispatch: Dispatch<ListAction>) => {
    await deleteJSON(`/api/lists/${list.id}`)
    return dispatch({
      type: 'DELETE-LIST',
      list
    })
  }
}

export const receiveLists = (lists: List[]): ListAction => {
  return {
    type: 'RECEIVE-LISTS',
    lists
  }
}

export default listReducer
