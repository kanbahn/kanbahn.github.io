const initialState = {
  tasks: []
}

const taskReducer = (state = initialState, action) => {
  console.log('in taskReducer. ACTION: ', action)

  switch (action.type) {
    case 'NEW-TASK':
      return { ...state, tasks: state.tasks.concat(action.newTask) }
    case 'EDIT-TASK':
      console.log('task edit reducer')
      const taskToEdit = state.tasks.find(task => task.id === action.id)
      const editedTask = { ...taskToEdit, title: action.title }
      return { ...state, tasks: state.tasks.map(task => task.id !== action.id ? task : editedTask) }
    case 'MOVE-TASK':
      const taskToMove = state.tasks.find(task => task.id === action.id)
      const newPosition = { ...taskToMove.position, column: action.column }
      const movedTask = { ...taskToMove, position: newPosition }
      return { ...state, tasks: state.tasks.map(task => task.id !== action.id ? task : movedTask) }
    case 'RECEIVE-TASKS':
      return { ...state, tasks: action.tasks }
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const taskCreation = (laneName, columnName) => {
  console.log('hello from taskCreation')
  laneName = laneName.toLowerCase()
  columnName = columnName.toLowerCase()
  const newTaskObject = { title: 'empty task', id: generateId(), position: { lane: laneName, column: columnName } }

  return {
    type: 'NEW-TASK',
    newTask: newTaskObject
  }
}

export const taskEdit = (taskObj) => {
  console.log(taskObj)
  return {
    type: 'EDIT-TASK',
    id: taskObj.id,
    title: taskObj.title
  }
}

export const moveTask = (taskId, column) => {
  console.log('hello from moveTaskReducer')
  return {
    type: 'MOVE-TASK',
    id: taskId,
    column: column
  }
}

export default taskReducer
