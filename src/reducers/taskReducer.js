const initalState = {
  tasks: [
    { title: 'Task 7', id: 7123895348954, position: { lane: 'featurex', column: 'todo'} },
    { title: 'Task 8', id: 9487319478394, position: { lane: 'featurex', column: 'todo'} },
    { title: 'Task 9', id: 7584923593475, position: { lane: 'featurex', column: 'todo'} },
    { title: 'Task 10', id: 4237876189251, position: { lane: 'featurex', column: 'todo'} },
    { title: 'Task 11', id: 4238472368945, position: { lane: 'featurex', column: 'todo'} },
    { title: 'Task 12', id: 8742317834736, position: { lane: 'featurex', column: 'todo'} },
    { title: 'Task 6', id: 7482976342078, position: { lane: 'featurex', column: 'inprogress'} },
    { title: 'Task 8', id: 1234790456454, position: { lane: 'featurey', column: 'todo'} }
  ]
}
const taskReducer = (state = initalState, action) => {
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
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const taskCreation = (laneName, columnName) => {
  console.log('hello from taskCreation')
  laneName = laneName.toLowerCase()
  columnName = columnName.toLowerCase()
  const newTaskObject = { title: 'empty task', id: generateId(), position: { lane: laneName, column: columnName } }

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
