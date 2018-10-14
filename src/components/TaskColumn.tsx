import * as React from 'react'
import Card from './Card'
import { taskEdit } from '../reducers/taskReducer'
import { DropTarget, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd'
import { Task } from '../../src-common/entity/Task'
import { connect } from 'react-redux'

const columnTarget: DropTargetSpec<OwnProps> = {
  drop(props, monitor) {
    if (!monitor) return
    const task = monitor.getItem() as { taskId: number }
    props.moveTask(task.taskId)
  }
}

function collect(connector: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver()
  }
}

interface OwnProps {
  laneName: string
  columnName: string
  columnType: string
  tasks: Task[]
  addNewTask: React.EventHandler<any>
  moveTask(taskId: number): void
}

interface DispatchProps {
  taskEdit: typeof taskEdit
}

interface TaskColumnDropTargetProps {
  connectDropTarget: ConnectDropTarget
  isOver: boolean
}

type Props = OwnProps & DispatchProps & TaskColumnDropTargetProps

class TaskColumn extends React.Component<Props> {
  handleChangedText = (taskId: number): React.ChangeEventHandler<HTMLTextAreaElement> => {
    return event => {
      event.preventDefault()
      this.props.taskEdit({ id: taskId, title: event.target.value })
    }
  }

  render() {
    const columnType = 'flex-column ' + this.props.columnType
    const columnName = this.props.columnName
    const tasks = this.props.tasks
    const addNewTask = this.props.addNewTask
    const buttonName = this.props.columnName
    const connectDropTarget = this.props.connectDropTarget

    return connectDropTarget(
      <div className={columnType} >
        <p className='column-header'>{columnName}</p>
        <div className='flex-card-wrapper'>
          {tasks
            .map(task =>
              <Card
                handleChange={this.handleChangedText(task.id)}
                key={task.id}
                content={task.title}
                taskId={task.id}
              />
            )
          }
          <button name={buttonName} onClick={addNewTask} className='card placeholder'>Add new</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  taskEdit
}

const ConnectedTaskColumn = connect<{}, DispatchProps>(
  undefined,
  mapDispatchToProps
)(TaskColumn)

export default DropTarget<OwnProps>('Card', columnTarget, collect)(ConnectedTaskColumn as any)
