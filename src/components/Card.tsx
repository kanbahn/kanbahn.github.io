import React from 'react'
import { ConnectDragSource, DragSource, DragSourceSpec, DragSourceCollector } from 'react-dnd'
import TextAreaAutoSize from 'react-textarea-autosize'
import styled from 'styled-components'
import { cardPadding, defaultMargin } from './common'
import MenuButton, { menuButtonSize, MenuIcon } from './MenuButton'
import Menu, { MenuItem } from './Menu'
import { Task } from '../../src-common/entity/Task'

const cardSource: DragSourceSpec<CardProps> = {
  beginDrag(props) {
    return props.task
  }
}

const collect: DragSourceCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

interface CardProps {
  task: Task
  columnSpan: number
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
  deleteTask: () => void
}

interface CardDragSourceProps {
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

const Card = (props: CardProps & CardDragSourceProps) => {
  const { task, columnSpan, handleChange, deleteTask, connectDragSource } = props

  return (
    <Container columnSpan={columnSpan} ref={(ref: any) => connectDragSource(ref)}>
      <TextArea
        value={task.title}
        onChange={handleChange}
        wrap='soft'
        minRows={2}
      />
      <MenuButton>
        <Menu>
          <MenuItem onClick={deleteTask}>Delete</MenuItem>
        </Menu>
      </MenuButton>
    </Container>
  )
}

interface ContainerProps {
  columnSpan: number
}

export const Container = styled.div<ContainerProps>`
  margin: ${defaultMargin};
  padding: ${cardPadding};
  width: calc(${props => 100 / props.columnSpan}% - calc(2 * ${defaultMargin}));
  min-width: 175px;
  box-sizing: border-box;
  overflow-wrap: break-word;
  display: flex;
  position: relative;

  &:not(:hover) ${MenuIcon} {
    opacity: 0;
  }

  ${props => props.theme.card}
`

const TextArea = styled(TextAreaAutoSize)`
  background: rgba(255, 255, 255, 0);
  border-width: 0;
  font: inherit;
  color: inherit;
  width: 100%;
  padding: 0;
  margin-right: calc(${menuButtonSize} - ${cardPadding});
  resize: none;
  outline: none;
`

export default DragSource<CardProps>('Card', cardSource, collect)(Card as any)
