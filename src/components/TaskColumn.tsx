import * as React from 'react'
import * as PropTypes from 'prop-types'
import Task from './Task'
import { taskEdit } from '../reducers/taskReducer'
import { DropTarget, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd'
import { TaskData } from '../../src-common/model'

const columnTarget: DropTargetSpec<TaskColumnProps> = {
  drop(props, monitor) {
    if (!monitor) return
    const task = monitor.getItem() as { taskId: number }
    console.log('task droped to', props.columnName)
    props.moveTask(task.taskId)
  }
}

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

interface TaskColumnProps {
  laneName: string
  columnName: string
  columnType: string
  tasks: TaskData[]
  addNewTask: React.EventHandler<any>
  moveTask(taskId: number): void
}

interface TaskColumnDropTargetProps {
  connectDropTarget: ConnectDropTarget
  isOver: boolean
}

class TaskColumn extends React.Component<TaskColumnProps & TaskColumnDropTargetProps> {
  static contextTypes = {
    store: PropTypes.object
  }

  handleChangedText = (taskId: number): React.ChangeEventHandler<HTMLTextAreaElement> => {
    return event => {
      event.preventDefault()
      this.context.store.dispatch(
        taskEdit({ id: taskId, title: event.target.value })
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

export default DropTarget<TaskColumnProps>('task', columnTarget, collect)(TaskColumn as any)
