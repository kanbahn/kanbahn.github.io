import * as React from 'react'
import { ConnectDragSource, DragSource, DragSourceSpec, DragSourceCollector } from 'react-dnd'

const cardSource: DragSourceSpec<TaskProps> = {
  beginDrag(props) {
    console.log('Begin drag!')
    return { taskId: props.taskId }
  }
}

const collect: DragSourceCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

interface TaskProps {
  taskId: number
  content: string
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

interface TaskDragSourceProps {
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

class Task extends React.Component<TaskProps & TaskDragSourceProps> {
  render() {
    const { isDragging, connectDragSource } = this.props

    const content = this.props.content
    return connectDragSource(
      <div
        className='task'
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
        }}
      >
        <textarea
          value={content}
          onChange={this.props.handleChange}
          autoFocus={true}
          wrap='soft'
        />
      </div>
    )
  }
}

export default DragSource<TaskProps>('task', cardSource, collect)(Task as any)
