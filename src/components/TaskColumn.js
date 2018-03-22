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

    return (
      <div className={ columnType } >
        <p className="column-header">{columnName}</p>
        <div className="flex-card-wrapper">
          {tasks
            .map(task =>
              <Task key={task} content={task} />
            )
          }
          <button onClick={addNewTask} className="task placeholder">Add new</button>
        </div>
      </div>
    )
  }
}

export default TaskColumn;