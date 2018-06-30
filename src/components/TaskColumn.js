import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import { taskEdit } from '../reducers/taskReducer'
import { DropTarget } from 'react-dnd'

const columnTarget = {
  drop(props, monitor) {
    const task = monitor.getItem()
    console.log('task droped to', props.columnName)
    props.moveTask(task.taskId)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class TaskColumn extends Component {

  handleChangedText = (taskId) => {
    return (event) => {
      event.preventDefault()
      this.context.store.dispatch(
        taskEdit({ id: taskId, title: event.target.value, lane: this.props.laneName, column: this.props.columnName.toLowerCase() })
      )
    }
  }

  handleTaskMoving = (taskId) => {
    return (event) => {
      event.preventDefault()
      this.context.store.dispatch(
        taskEdit({ id: taskId, title: 'Someone tried to move this!', lane: this.props.laneName, column: this.props.columnName.toLowerCase() })
      )
    }
  }

  render() {
    const columnType = 'flex-column ' + this.props.columnType
    const columnName = this.props.columnName
    const tasks = this.props.tasks
    const addNewTask = this.props.addNewTask
    const buttonName = this.props.columnName

    const connectDropTarget = this.props.connectDropTarget
    const isOver = this.props.isOver

    if (isOver) {
      console.log('task over', columnName)
    }

    return connectDropTarget(
      <div className={columnType} >
        <p className='column-header'>{columnName}</p>
        <div className='flex-card-wrapper'>
          {tasks
            .map(task =>
              <Task
                handleChange={this.handleChangedText(task.id)}
                key={task.id}
                content={task.title}
                taskId={task.id}
              />
            )
          }
          <button name={buttonName} onClick={addNewTask} className='task placeholder'>Add new</button>
        </div>
      </div>
    )
  }
}

TaskColumn.contextTypes = {
  store: PropTypes.object
}

export default DropTarget('task', columnTarget, collect)(TaskColumn)
