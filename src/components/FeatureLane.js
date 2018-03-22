import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TaskColumn from './TaskColumn'
import { taskCreation } from '../reducers/taskReducer'

class FeatureLane extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  addTaskToRedux = (event) => {
    event.preventDefault()
    //console.log(event.target.name)
    const columnName = event.target.name
    const laneName = this.props.featureName
    this.context.store.dispatch(
      taskCreation(laneName, columnName)
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
            tasks={reduxTasks.todo}
            addNewTask={this.addTaskToRedux}
          />
          <TaskColumn
            columnType='single'
            columnName='InProgress'
            tasks={reduxTasks.inprogress}
            addNewTask={this.addTaskToRedux}
          />
          <TaskColumn
            columnType='double'
            columnName='Done'
            tasks={reduxTasks.done}
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