import * as React from 'react'
import TaskColumn from './TaskColumn'
import { taskCreation, moveTask, StoreState } from '../reducers/taskReducer'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Task } from '../../src-common/entity/Task'
import { defaultMargin, Title } from './common'

interface FeatureLaneOwnProps {
  featureName: string
}

interface FeatureLaneDispatchProps {
  taskCreation(laneName: string, columnName: string): void
  moveTask(taskId: number, columnName: string): void
}

interface FeatureLaneStoreProps {
  tasks: Task[]
}

type FeatureLaneProps = FeatureLaneOwnProps & FeatureLaneDispatchProps & FeatureLaneStoreProps

class FeatureLane extends React.Component<FeatureLaneProps> {
  addTaskToRedux = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const columnName = (event.target as any).name as string
    const laneName = this.props.featureName
    this.props.taskCreation(laneName, columnName)
  }

  moveTask = (toColumn: string) => {
    return (taskId: number) => {
      this.props.moveTask(taskId, toColumn)
    }
  }

  render() {
    const { featureName, tasks } = this.props
    const lanesTasks = tasks.filter(task => task.lane === featureName.toLowerCase())

    return (
      <Container>
        <Title>{featureName}</Title>

        <FlexContainer>
          <TaskColumn
            columnSpan={2}
            laneName={featureName}
            columnName='Todo'
            tasks={lanesTasks.filter(task => task.column === 'todo')}
            addNewTask={this.addTaskToRedux}
            moveTask={this.moveTask('todo')}
          />
          <TaskColumn
            columnSpan={1}
            laneName={featureName}
            columnName='InProgress'
            tasks={lanesTasks.filter(task => task.column === 'inprogress')}
            addNewTask={this.addTaskToRedux}
            moveTask={this.moveTask('inprogress')}
          />
          <TaskColumn
            columnSpan={2}
            laneName={featureName}
            columnName='Done'
            tasks={lanesTasks.filter(task => task.column === 'done')}
            addNewTask={this.addTaskToRedux}
            moveTask={this.moveTask('done')}
          />
        </FlexContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  background: linear-gradient(to top left, rgb(221, 221, 221), rgb(250, 250, 250));
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
  padding: ${defaultMargin};
  border-radius: 2px;
  margin-bottom: calc(2 * ${defaultMargin});
`

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
`

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  taskCreation,
  moveTask
}

const ConnectedFeatureLane = connect(mapStateToProps, mapDispatchToProps)(FeatureLane)

export default DragDropContext<FeatureLaneOwnProps>(HTML5Backend)(ConnectedFeatureLane)
