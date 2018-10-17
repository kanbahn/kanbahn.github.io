import * as React from 'react'
import Card, { Container as CardContainer } from './Card'
import { deleteStage, editStage } from '../reducers/stageReducer'
import { deleteTask, moveTask, taskCreation, taskEdit } from '../reducers/taskReducer'
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor, DropTargetSpec } from 'react-dnd'
import { Task } from '../../src-common/entity/Task'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Plus } from 'react-feather'
import {
  borderRadius,
  boxShadow,
  defaultMargin,
  lightGrayBackground,
  Title,
  transparentButtonStyles
} from './common'
import MenuButton, { menuButtonSize, MenuIcon } from './MenuButton'
import Menu, { MenuItem } from './Menu'
import { Stage } from '../../src-common/entity/Stage'
import EditableText from './EditableText'
import { sortBy } from 'lodash'

const columnTarget: DropTargetSpec<OwnProps> = {
  drop(props, monitor) {
    if (!monitor) return
    const task = monitor.getItem() as Task
    if (task.stage.id === props.stage.id) return
    props.moveTask(task, props.stage)
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
  editStage: typeof editStage
  deleteStage: typeof deleteStage
}

interface TaskColumnDropTargetProps {
  connectDropTarget: ConnectDropTarget
  isOver: boolean
}

type Props = OwnProps & DispatchProps & TaskColumnDropTargetProps

interface State {
  renaming: boolean
}

class TaskColumn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      renaming: false
    }
  }

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

  startRenaming = () => {
    this.setState({ renaming: true })
  }

  renameStage = async (newName: string) => {
    await this.props.editStage(this.props.stage, { name: newName })
    this.setState({ renaming: false })
  }

  deleteStage = () => {
    this.props.deleteStage(this.props.stage)
  }

  render() {
    const { stage, columnSpan, tasks, connectDropTarget } = this.props
    const { renaming } = this.state

    return (
      <Container columnSpan={columnSpan} ref={(ref: any) => connectDropTarget(ref)}>
        <ColumnHeader>
          <ColumnTitle><EditableText text={stage.name} editing={renaming} done={this.renameStage}/></ColumnTitle>
          <MenuButton>
            <Menu>
              <MenuItem onClick={this.startRenaming}>Rename</MenuItem>
              <MenuItem onClick={this.deleteStage}>Delete</MenuItem>
            </Menu>
          </MenuButton>
        </ColumnHeader>

        <FlexCardWrapper>
          {sortBy(tasks, 'index')
            .map(task =>
              <Card
                key={task.id}
                task={task}
                handleChange={this.handleChangedText(task.id)}
                deleteTask={this.deleteTask(task.id)}
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

const CardPlaceholder = styled(CardContainer)`
  ${transparentButtonStyles}
`

const mapDispatchToProps: DispatchProps = {
  taskCreation,
  taskEdit,
  deleteTask,
  editStage,
  deleteStage,
}

const ConnectedTaskColumn = connect(undefined, mapDispatchToProps)(TaskColumn)

export default DropTarget<OwnProps>('Card', columnTarget, collect)(ConnectedTaskColumn as any)
