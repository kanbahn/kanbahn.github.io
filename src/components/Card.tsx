import * as React from 'react'
import { ConnectDragSource, DragSource, DragSourceSpec, DragSourceCollector } from 'react-dnd'

const cardSource: DragSourceSpec<CardProps> = {
  beginDrag(props) {
    return { taskId: props.taskId }
  }
}

const collect: DragSourceCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

interface CardProps {
  taskId: number
  content: string
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

interface CardDragSourceProps {
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

class Card extends React.Component<CardProps & CardDragSourceProps> {
  render() {
    const { isDragging, connectDragSource } = this.props

    const content = this.props.content
    return connectDragSource(
      <div
        className='card'
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

export default DragSource<CardProps>('Card', cardSource, collect)(Card as any)
