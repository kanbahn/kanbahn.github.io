import * as React from 'react'
import TaskColumn, { columnMargin } from './TaskColumn'
import { addList } from '../reducers/listReducer'
import { taskCreation, moveTask, deleteTask } from '../reducers/taskReducer'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Task } from '../../src-common/entity/Task'
import { List } from '../../src-common/entity/List'
import { borderRadius, boxShadow, defaultMargin, Title, transparentButtonStyles } from './common'
import { Plus } from 'react-feather'
import { StoreState } from '../index'

interface FeatureLaneOwnProps {
  featureName: string
}

interface FeatureLaneDispatchProps {
  addList: typeof addList
  taskCreation: typeof taskCreation
  moveTask: typeof moveTask
}

interface FeatureLaneStoreProps {
  lists: List[]
  tasks: Task[]
}

type FeatureLaneProps = FeatureLaneOwnProps & FeatureLaneDispatchProps & FeatureLaneStoreProps

class FeatureLane extends React.Component<FeatureLaneProps> {
  addList = () => {
    this.props.addList(this.props.featureName)
  }

  render() {
    const { featureName, lists, tasks } = this.props
    // TODO: FeatureLane should receive only its own tasks in the props.
    const lanesTasks = tasks.filter(task => task.list.lane === featureName)

    return (
      <Container>
        <Title>{featureName}</Title>

        <FlexContainer>
          {lists.map(list => (
            <TaskColumn
              key={list.id}
              list={list}
              columnSpan={1}
              laneName={featureName}
              tasks={lanesTasks.filter(task => task.list.id === list.id)}
              moveTask={this.props.moveTask}
            />
          ))}

          <AddColumnButton onClick={this.addList}>
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
    lists: state.lists,
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  taskCreation,
  moveTask,
  deleteTask,
  addList
}

const ConnectedFeatureLane = connect(mapStateToProps, mapDispatchToProps)(FeatureLane)

export default DragDropContext<FeatureLaneOwnProps>(HTML5Backend)(ConnectedFeatureLane)
