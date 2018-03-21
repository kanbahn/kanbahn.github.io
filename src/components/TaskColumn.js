import React, { Component } from 'react';
import Task from './Task'

class TaskColumn extends Component {
  render() {
    const columnType = "flex-column " + this.props.columnType
    const columnName = this.props.columnName
    const tasks = this.props.tasks
    
    return (
      <div class={ columnType } >
        <p class="column-header">{columnName}</p>
        <div class="flex-card-wrapper">
          {tasks
            .map(task =>
              <Task content={task} />
            )
          }
        </div>
      </div>
    )
  }
}

export default TaskColumn;