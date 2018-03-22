const initalState = {
  featureX: {
    todoTasks: [
      'Task 7b',
      'Task 8',
      'Task 9',
      'Task 10',
      'Task 11',
      'Task 12'
    ],
    inprogressTasks: [
      'Task 6'
    ],
    doneTasks: [
      'Task 1',
      'Task 2',
      'Task 3',
      'Task 4 has a very long text to demonstate how different heights behave',
      'Task 5'
    ]
  },
  featureY: {
    todoTasks: [
      'Task 8',
      'Task 9',
      'Task 10'
    ],
    inprogressTasks: [
      'Task 6',
      'Task 7'
    ],
    doneTasks: [
      'Task 1 has some longer text',
      'Task 2',
      'Task 3',
      'Task 4',
      'Task 5'
    ]
  }
}

const taskReducer = (state = initalState, action) => {
  console.log('in taskReducer. ACTION: ', action)
  switch (action.type) {
  case 'NEW_TASK':
    const newState = state
    //newState.featureX.todoTasks.push(action.content)
    newState.featureX.todoTasks.push('Task New')
    console.log('New state: ', newState)
    return newState
  default:
    return state
  }
}

//const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const taskCreation = (content) => {
  console.log('hello from taskCreation')
  return {
    type: 'NEW_TASK',
    content
  }
}

export default taskReducer