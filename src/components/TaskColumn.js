import React, { Component } from 'react';
import Task from './Task'

class TaskColumn extends Component {
  render() {
    const columnType = "flex-column " + this.props.columnType
    const columnName = this.props.columnName
    const tasks = this.props.tasks

    return (
      <div className={ columnType } >
        <p className="column-header">{columnName}</p>
        <div className="flex-card-wrapper">
          {tasks
            .map(task =>
              <Task key={task} content={task} />
            )
          }
          <p className="task placeholder">Add new</p>
        </div>
      </div>
    )
  }
}

export default TaskColumn;