import * as React from 'react'
import TaskColumn, { columnMargin } from './TaskColumn'
import { addStage } from '../reducers/stageReducer'
import { taskCreation, moveTask, deleteTask } from '../reducers/taskReducer'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Task } from '../../src-common/entity/Task'
import { Stage } from '../../src-common/entity/Stage'
import { borderRadius, boxShadow, defaultMargin, Title, transparentButtonStyles } from './common'
import { Plus } from 'react-feather'
import { StoreState } from '../index'

interface FeatureLaneOwnProps {
  featureName: string
}

interface FeatureLaneDispatchProps {
  deleteTask: typeof deleteTask
  addStage: typeof addStage
  taskCreation(stage: Stage): void
  moveTask(taskId: number, stage: Stage): void
}

interface FeatureLaneStoreProps {
  stages: Stage[]
  tasks: Task[]
}

type FeatureLaneProps = FeatureLaneOwnProps & FeatureLaneDispatchProps & FeatureLaneStoreProps

class FeatureLane extends React.Component<FeatureLaneProps> {
  addTask = (stage: Stage) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    this.props.taskCreation(stage)
  }

  moveTask = (stage: Stage) => {
    return (taskId: number) => {
      this.props.moveTask(taskId, stage)
    }
  }

  addStage = () => {
    this.props.addStage(this.props.featureName)
  }

  render() {
    const { featureName, stages, tasks } = this.props
    // TODO: FeatureLane should receive only its own tasks in the props.
    const lanesTasks = tasks.filter(task => task.stage.lane === featureName)

    return (
      <Container>
        <Title>{featureName}</Title>

        <FlexContainer>
          {stages.map(stage => (
            <TaskColumn
              key={stage.id}
              columnSpan={1}
              laneName={featureName}
              columnName={stage.name}
              tasks={lanesTasks.filter(task => task.stage.id === stage.id)}
              addNewTask={this.addTask(stage)}
              moveTask={this.moveTask(stage)}
              deleteTask={this.props.deleteTask}
            />
          ))}

          <AddColumnButton onClick={this.addStage}>
            <Plus/>
          </AddColumnButton>
        </FlexContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  background: linear-gradient(to top left, rgb(221, 221, 221), rgb(250, 250, 250));
  box-shadow: ${boxShadow};
  padding: ${defaultMargin};
  border-radius: ${borderRadius};
  margin-bottom: calc(2 * ${defaultMargin});
`

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
`

const AddColumnButton = styled.button`
  ${transparentButtonStyles}
  ${columnMargin};
`

const mapStateToProps = (state: StoreState) => {
  return {
    stages: state.stages,
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  taskCreation,
  moveTask,
  deleteTask,
  addStage
}

const ConnectedFeatureLane = connect(mapStateToProps, mapDispatchToProps)(FeatureLane)

export default DragDropContext<FeatureLaneOwnProps>(HTML5Backend)(ConnectedFeatureLane)
