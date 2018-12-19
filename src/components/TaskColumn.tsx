import React, { useState } from 'react'
import Card, { Container as CardContainer } from './Card'
import { deleteList, editList } from '../store/listReducer'
import { deleteTask, moveTask, taskCreation, taskEdit } from '../store/taskReducer'
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from 'react-dnd'
import { Task } from '../../src-common/entity/Task'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Plus } from 'react-feather'
import { defaultMargin, Title, transparentButtonStyles } from './common'
import MenuButton, { menuButtonSize, MenuIcon } from './MenuButton'
import Menu, { MenuItem } from './Menu'
import { List } from '../../src-common/entity/List'
import EditableText from './EditableText'
import { sortBy } from 'lodash'

const columnTarget: DropTargetSpec<OwnProps> = {
  drop(props, monitor) {
    if (!monitor) return
    const task = monitor.getItem() as Task
    if (task.list.id === props.list.id) return
    props.moveTask(task, props.list)
  }
}

function collect(connector: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver()
  }
}

interface OwnProps {
  list: List
  laneName: string
  columnSpan: number
  tasks: Task[]
  moveTask: typeof moveTask
}

interface DispatchProps {
  taskCreation: typeof taskCreation
  taskEdit: typeof taskEdit
  deleteTask: typeof deleteTask
  editList: typeof editList
  deleteList: typeof deleteList
}

interface TaskColumnDropTargetProps {
  connectDropTarget: ConnectDropTarget
  isOver: boolean
}

type Props = OwnProps & DispatchProps & TaskColumnDropTargetProps

const TaskColumn = (props: Props) => {
  const [renaming, setRenaming] = useState(false)

  const addTask = () => {
    props.taskCreation(props.list)
  }

  const handleChangedText = (taskId: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    props.taskEdit({ id: taskId, title: event.target.value })
  }

  const deleteTask = (id: number) => () => {
    props.deleteTask(id)
  }

  const startRenaming = () => {
    setRenaming(true)
  }

  const renameList = async (newName: string) => {
    await props.editList(props.list, { name: newName })
    setRenaming(false)
  }

  const deleteList = () => {
    props.deleteList(props.list)
  }

  const { list, columnSpan, tasks, connectDropTarget } = props

  return (
    <Container columnSpan={columnSpan} ref={(ref: any) => connectDropTarget(ref)}>
      <ColumnHeader>
        <ColumnTitle><EditableText text={list.name} editing={renaming} done={renameList}/></ColumnTitle>
        <MenuButton>
          <Menu>
            <MenuItem onClick={startRenaming}>Rename</MenuItem>
            <MenuItem onClick={deleteList}>Delete</MenuItem>
          </Menu>
        </MenuButton>
      </ColumnHeader>

      <FlexCardWrapper>
        {sortBy(tasks, 'index')
          .map(task =>
            <Card
              key={task.id}
              task={task}
              handleChange={handleChangedText(task.id)}
              deleteTask={deleteTask(task.id)}
              columnSpan={columnSpan}
            />
          )
        }
        <AddCardButton columnSpan={columnSpan} onClick={addTask}>
          <Plus/>
        </AddCardButton>
      </FlexCardWrapper>
    </Container>
  )
}

interface ContainerProps {
  columnSpan: number
}

export const columnMargin = css`
  margin: ${defaultMargin};
`

const Container = styled.div<ContainerProps>`
  ${columnMargin};
  flex: ${props => props.columnSpan} 1 0;

  &:not(:hover) ${MenuIcon} {
    opacity: 0;
  }

  ${props => props.theme.column}
`

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
`

const ColumnTitle = styled(Title)`
  width: 100%;
  margin: 0 ${menuButtonSize};
  text-align: center;
`

const FlexCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;
  padding: ${defaultMargin};
`

export const AddCardButton = styled(CardContainer.withComponent('button'))`
  ${transparentButtonStyles}
`

const mapDispatchToProps: DispatchProps = {
  taskCreation,
  taskEdit,
  deleteTask,
  editList,
  deleteList,
}

const ConnectedTaskColumn = connect(undefined, mapDispatchToProps)(TaskColumn)

export default DropTarget<OwnProps>('Card', columnTarget, collect)(ConnectedTaskColumn as any)
