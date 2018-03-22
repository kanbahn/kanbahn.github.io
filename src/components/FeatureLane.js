import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TaskColumn from './TaskColumn'
import { taskCreation } from '../reducers/taskReducer'

class FeatureLane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks,
      featureName: this.props.featureName
    }

  }

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
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

  addTaskToRedux = (event) => {
    event.preventDefault()
    this.context.store.dispatch(
      taskCreation('fooTaskValue')
    )
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
      <button onClick={this.addTaskToRedux}>New task to redux</button>
      </div>
    )
  }
}

FeatureLane.contextTypes = {
  store: PropTypes.object
}

export default FeatureLane