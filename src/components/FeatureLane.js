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
      const newState = this.context.store.getState()[this.props.featureName]
      newState.todoTasks.push(newTask)
      this.setState({ tasks: newState })
    }
  }

  addNewInprogressTask = (newTask) => {
    return () => {
      const newState = this.context.store.getState()[this.props.featureName]
      newState.inprogressTasks.push(newTask)
      this.setState({ tasks: newState })
    }
  }

  addNewDoneTask = (newTask) => {
    return () => {
      const newState = this.context.store.getState()[this.props.featureName]
      newState.doneTasks.push(newTask)
      this.setState({ tasks: newState })
    }
  }

  addTaskToRedux = (event) => {
    event.preventDefault()
    //console.log(event.target.name)
    
    this.context.store.dispatch(
      taskCreation(event.target.name)
    )
  }

  render() {
    const reduxTasks = this.context.store.getState()[this.props.featureName]
    return (
      <div className="feature-lane">
        <h1 className="text-box">{this.state.featureName}</h1>

        <div className="flex-container">
          <TaskColumn
            columnType='double'
            columnName='Todo'
            tasks={reduxTasks.todoTasks}
            addNewTask={this.addTaskToRedux}
          />
          <TaskColumn
            columnType='single'
            columnName='InProgress'
            tasks={reduxTasks.inprogressTasks}
            addNewTask={this.addTaskToRedux}
          />
          <TaskColumn
            columnType='double'
            columnName='Done'
            tasks={reduxTasks.doneTasks}
            addNewTask={this.addTaskToRedux}
          />
        </div>
      <button onClick={this.addTaskToRedux}>Mock button, new task to redux</button>
      </div>
    )
  }
}

FeatureLane.contextTypes = {
  store: PropTypes.object
}

export default FeatureLane