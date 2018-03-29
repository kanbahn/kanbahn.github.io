import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TaskColumn from './TaskColumn'
import { taskCreation } from '../reducers/taskReducer'

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { connect } from 'react-redux'

class FeatureLane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      featureName: this.props.featureName
    }

  }


  addTaskToRedux = (event) => {
    event.preventDefault()
    const columnName = event.target.name
    const laneName = this.props.featureName
    this.props.taskCreation(laneName, columnName)
  }

  render() {
    console.log(this.props)

    const lanesTasks = this.props.tasks
      .filter(task => task.position.lane === this.state.featureName.toLowerCase())
      
    return (
      <div className="feature-lane">
        <h1 className="text-box">{this.state.featureName}</h1>

        <div className="flex-container">
          <TaskColumn
            columnType='double'
            laneName={this.props.featureName}
            columnName='Todo'
            tasks={lanesTasks.filter(task => task.position.column === 'todo')}
            addNewTask={this.addTaskToRedux}
          />
          <TaskColumn
            columnType='single'
            laneName={this.props.featureName}
            columnName='InProgress'
            tasks={lanesTasks.filter(task => task.position.column === 'inprogress')}
            addNewTask={this.addTaskToRedux}
          />
          <TaskColumn
            columnType='double'
            laneName={this.props.featureName}
            columnName='Done'
            tasks={lanesTasks.filter(task => task.position.column === 'done')}
            addNewTask={this.addTaskToRedux}
          />
        </div>
      <button onClick={this.addTaskToRedux}>Mock button, new task to redux</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}
const mapDispatchToProps = {
  taskCreation
}

const ConnectedFeatureLane = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureLane)


export default DragDropContext(HTML5Backend)(ConnectedFeatureLane)