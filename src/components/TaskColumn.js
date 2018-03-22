import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Task from './Task'
import { taskEdit } from '../reducers/taskReducer'

class TaskColumn extends Component {
  addNew = () => {
    console.log('new added! ' + this.props.columnName)
  }

  handleChangedText = (taskId) => {
    return (event) => {
      event.preventDefault()
      console.log(this.props.columnName)
      console.log(this.props.laneName)
      this.context.store.dispatch(
        taskEdit({ id: taskId, title: event.target.value, lane: this.props.laneName, column: this.props.columnName.toLowerCase() })
      )
    }
  }

  render() {
    const columnType = "flex-column " + this.props.columnType
    const columnName = this.props.columnName
    const tasks = this.props.tasks
    const addNewTask = this.props.addNewTask
    const buttonName = this.props.columnName

    return (
      <div className={columnType} >
        <p className="column-header">{columnName}</p>
        <div className="flex-card-wrapper">
          {tasks
            .map(task =>
              <Task handleChange={this.handleChangedText(task.id)} key={task.id} content={task.title} />
            )
          }
          <button name={buttonName} onClick={addNewTask} className="task placeholder">Add new</button>
        </div>
      </div>
    )
  }
}

TaskColumn.contextTypes = {
  store: PropTypes.object
}

export default TaskColumn;