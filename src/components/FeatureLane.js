import React, { Component } from 'react';
import TaskColumn from './TaskColumn'

class FeatureLane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: {
        todoTasks: [
          'Task 7a',
          'Task 8',
          'Task 9',
          'Task 10',
          'Task 11',
          'Task 12'
        ],
        inprogressTask: [
          'Task 6'
        ],
        doneTasks: [
          'Task 1',
          'Task 2',
          'Task 3',
          'Task 4 has a very long text to demonstate how different heights behave',
          'Task 5'
        ]
      }
    }
  }

  handleClick = () => {
    const newState = {...this.state.tasks}
    newState.todoTasks.push('Task 13')
    this.setState({ tasks: newState })
  }

  render() {
    return (
      <div className="feature-lane">
        <h1 className="text-box">Feature X</h1>
        
        <div className="flex-container">          
          <TaskColumn 
            columnType = 'double'
            columnName = 'Todo'
            tasks = {this.state.tasks.todoTasks}
          />
          <TaskColumn 
            columnType = 'single'
            columnName = 'In Progress'
            tasks = {this.state.tasks.inprogressTask}
          />
          <TaskColumn 
            columnType = 'double'
            columnName = 'Done'
            tasks = {this.state.tasks.doneTasks}
          />
        </div>
        <button onClick={this.handleClick}>Add task</button>
      </div>
    )
  }
}

export default FeatureLane