import * as React from 'react'
import Card from './Card'
import { deleteStage } from '../reducers/stageReducer'
import { taskEdit, moveTask, deleteTask, taskCreation } from '../reducers/taskReducer'
import { DropTarget, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd'
import { Task } from '../../src-common/entity/Task'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Plus } from 'react-feather'
import { Container as CardContainer } from './Card'
import { borderRadius, boxShadow, defaultMargin, lightGrayBackground, Title, transparentButtonStyles } from './common'
import MenuButton, { MenuIcon } from './MenuButton'
import Menu, { MenuItem } from './Menu'
import { Stage } from '../../src-common/entity/Stage'

const columnTarget: DropTargetSpec<OwnProps> = {
  drop(props, monitor) {
    if (!monitor) return
    const task = monitor.getItem() as { taskId: number }
    props.moveTask(task.taskId, props.stage)
  }
}

function collect(connector: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver()
  }
}

interface OwnProps {
  stage: Stage
  laneName: string
  columnSpan: number
  tasks: Task[]
  moveTask: typeof moveTask
}

interface DispatchProps {
  taskCreation: typeof taskCreation
  taskEdit: typeof taskEdit
  deleteTask: typeof deleteTask
  deleteStage: typeof deleteStage
}

interface TaskColumnDropTargetProps {
  connectDropTarget: ConnectDropTarget
  isOver: boolean
}

type Props = OwnProps & DispatchProps & TaskColumnDropTargetProps

class TaskColumn extends React.Component<Props> {
  addTask = () => {
    this.props.taskCreation(this.props.stage)
  }

  handleChangedText = (taskId: number): React.ChangeEventHandler<HTMLTextAreaElement> => {
    return event => {
      event.preventDefault()
      this.props.taskEdit({ id: taskId, title: event.target.value })
    }
  }

  deleteTask = (id: number) => () => {
    this.props.deleteTask(id)
  }

  deleteStage = () => {
    this.props.deleteStage(this.props.stage)
  }

  render() {
    const { stage, columnSpan, tasks, connectDropTarget } = this.props

    return (
      <Container columnSpan={columnSpan} ref={(ref: any) => connectDropTarget(ref)}>
        <ColumnHeader>
          <Title>{stage.name}</Title>
          <MenuButton>
            <Menu>
              <MenuItem onClick={this.deleteStage}>Delete</MenuItem>
            </Menu>
          </MenuButton>
        </ColumnHeader>

        <FlexCardWrapper>
          {tasks
            .map(task =>
              <Card
                handleChange={this.handleChangedText(task.id)}
                deleteTask={this.deleteTask(task.id)}
                key={task.id}
                content={task.title}
                taskId={task.id}
                columnSpan={columnSpan}
              />
            )
          }
          <CardPlaceholder columnSpan={columnSpan} onClick={this.addTask}>
            <Plus/>
          </CardPlaceholder>
        </FlexCardWrapper>
      </Container>
    )
  }
}

interface ContainerProps {
  columnSpan: number
}

export const columnMargin = css`
  margin: ${defaultMargin};
`

const Container = styled.div<ContainerProps>`
  ${columnMargin};
  box-shadow: ${boxShadow};
  background: ${lightGrayBackground};
  border-radius: ${borderRadius};
  flex: ${props => props.columnSpan} 1 0;

  &:not(:hover) ${MenuIcon} {
    opacity: 0;
  }
`

const ColumnHeader = styled.div`
  display: block;
  position: relative;
  padding: 8px;
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

const CardPlaceholder = styled(CardContainer)`
  ${transparentButtonStyles}
`

const mapDispatchToProps: DispatchProps = {
  taskCreation,
  taskEdit,
  deleteTask,
  deleteStage,
}

const ConnectedTaskColumn = connect(undefined, mapDispatchToProps)(TaskColumn)

export default DropTarget<OwnProps>('Card', columnTarget, collect)(ConnectedTaskColumn as any)
