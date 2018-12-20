import { Omit } from 'ramda'
import { Dispatch } from 'redux'
import { deleteJSON, patchJSON, postJSON } from '../fetch'
import { List } from '../../src-common/entity/List'

interface NewList {
  type: 'NEW-LIST'
  list: List
}

interface EditList {
  type: 'EDIT-LIST'
  list: List
  edits: Partial<List>
}

interface EditLane {
  type: 'EDIT-LANE'
  oldName: string
  newName: string
}

interface DeleteList {
  type: 'DELETE-LIST'
  list: List
}

interface DeleteLane {
  type: 'DELETE-LANE'
  laneName: string
}

interface ReceiveLists {
  type: 'RECEIVE-LISTS'
  lists: List[]
}

type ListAction = NewList | EditList | EditLane | DeleteList | DeleteLane | ReceiveLists
export type ListsState = List[]

const listReducer = (state: ListsState = [], action: ListAction) => {
  switch (action.type) {
    case 'NEW-LIST':
      return state.concat(action.list)

    case 'EDIT-LIST':
      return state.map(list => list.id !== action.list.id ? list : { ...list, ...action.edits })

    case 'EDIT-LANE':
      return state.map(list => list.lane !== action.oldName ? list : { ...list, lane: action.newName })

    case 'DELETE-LIST':
      return state.filter(list => list.id !== action.list.id)

    case 'DELETE-LANE':
      return state.filter(list => list.lane !== action.laneName)

    case 'RECEIVE-LISTS':
      return action.lists

    default:
      return state
  }
}

export const addList = (lane: string) => {
  const body: Omit<List, 'id'> = { name: 'To do', lane, tasks: [] }

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

export const editLane = (oldName: string, newName: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    const updates = { lane: newName }
    await patchJSON(`/api/lane/${oldName}`, updates)
    return dispatch({
      type: 'EDIT-LANE',
      oldName,
      newName
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

export const deleteLane = (laneName: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    await deleteJSON(`/api/lane/${laneName}`)
    return dispatch({
      type: 'DELETE-LANE',
      laneName
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
