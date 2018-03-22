import React, { Component } from 'react';
import TaskColumn from './TaskColumn'

class FeatureLane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks,
      featureName: this.props.featureName
    }

  }

  addNewTodoTask = (newTask) => {
    return () => {
      const newState = { ...this.state.tasks }
      newState.todoTasks.push(newTask)
      this.setState({ tasks: newState })
    }
  }

  addNewInprogressTask = (newTask) => {
    return () => {
      const newState = { ...this.state.tasks }
      newState.inprogressTasks.push(newTask)
      this.setState({ tasks: newState })
    }
  }

  addNewDoneTask = (newTask) => {
    return () => {
      const newState = { ...this.state.tasks }
      newState.doneTasks.push(newTask)
      this.setState({ tasks: newState })
    }
  }

  render() {
    return (
      <div className="feature-lane">
        <h1 className="text-box">{this.state.featureName}</h1>

        <div className="flex-container">
          <TaskColumn
            columnType='double'
            columnName='Todo'
            tasks={this.state.tasks.todoTasks}
            addNewTask={this.addNewTodoTask('foocontent')}
          />
          <TaskColumn
            columnType='single'
            columnName='In Progress'
            tasks={this.state.tasks.inprogressTasks}
            addNewTask={this.addNewInprogressTask('foocontent')}
          />
          <TaskColumn
            columnType='double'
            columnName='Done'
            tasks={this.state.tasks.doneTasks}
            addNewTask={this.addNewDoneTask('foocontent')}
          />
        </div>

      </div>
    )
  }
}

export default FeatureLane