import React, { Component } from 'react';
import Task from './Task'

class TaskColumn extends Component {
  addNew = () => {
    console.log('new added! ' + this.props.columnName)
  }

  render() {
    const columnType = "flex-column " + this.props.columnType
    const columnName = this.props.columnName
    const tasks = this.props.tasks
    const addNewTask = this.props.addNewTask
    const buttonName = this.props.columnName

    return (
      <div className={ columnType } >
        <p className="column-header">{columnName}</p>
        <div className="flex-card-wrapper">
          {tasks
            .map(task =>
              <Task key={task.id} content={task.title} />
            )
          }
          <button name={buttonName} onClick={addNewTask} className="task placeholder">Add new</button>
        </div>
      </div>
    )
  }
}

export default TaskColumn;