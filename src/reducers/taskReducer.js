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
  const newState = {...state}
  
  switch (action.type) {
    case 'NEW-TASK':
      newState.tasks.push(action.newTask)
      return newState
    case 'EDIT-TASK':
      console.log('task edit reducer')
      const taskToEdit = state.tasks.find(task => task.id === action.id)
      const editedTask = { ...taskToEdit, title: action.title }

      newState.tasks = newState.tasks.map(task => task.id !== action.id ? task : editedTask)
      console.log(newState.tasks)
      return newState
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

export default taskReducer