const initalState = {
  featureX: {
    todoTasks: [
      { title: 'Task 7b', id: 7123895348954 },
      { title: 'Task 8', id: 9487319478394 },
      { title: 'Task 9', id: 7584923593475 },
      { title: 'Task 10', id: 4237876189231 },
      { title: 'Task 11', id: 42384723894523 },
      { title: 'Task 12', id: 8742317834 }
    ],
    inprogressTasks: [
      { title: 'Task 6', id: 74829763420 }
    ],
    doneTasks: [
      { title: 'Task 1', id: 14789489 },
      { title: 'Task 2', id: 1478230597923 },
      { title: 'Task 3', id: 1543784728 },
      { title: 'Task 4 has a very long text to demonstate how different heights behave', id: 1 },
      { title: 'Task 5', id: 7482793204 }
    ]
  },
  featureY: {
    todoTasks: [
      { title: 'Task 8', id: 12347904 },
      { title: 'Task 9', id: 4327689421 },
      { title: 'Task 10', id: 748923789472 }
    ],
    inprogressTasks: [
      { title: 'Task 6', id: 8942793424 },
      { title: 'Task 7', id: 7489237842 }
    ],
    doneTasks: [
      { title: 'Task 1 has some loooong text', id: 78592347592 },
      { title: 'Task 2', id: 235782034 },
      { title: 'Task 3', id: 52387903482 },
      { title: 'Task 4', id: 9472083957 },
      { title: 'Task 5', id: 17048923942 }
    ]
  }
}

const taskReducer = (state = initalState, action) => {
  console.log('in taskReducer. ACTION: ', action)
  const newState = state
  const newTask = { title: 'empty task', id: generateId() }
  switch (action.type) {
    case 'NEW-TODO-TASK':
      newState.featureX.todoTasks.push(newTask)
      return newState
    case 'NEW-INPROGRESS-TASK':
      newState.featureX.inprogressTasks.push(newTask)
      return newState
    case 'NEW-DONE-TASK':
      newState.featureX.doneTasks.push(newTask)
      return newState
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const taskCreation = (taskContext) => {
  console.log('hello from taskCreation')
  console.log('content:', taskContext)
  taskContext = taskContext.toUpperCase();
  console.log(taskContext)
  return {
    type: taskContext
  }
}

export default taskReducer